"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createTransfer } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { useTransactions } from "@/components/transaction-context"
import { useUser } from "@/components/user-context"

const BANKS = [
  { id: "cbe", name: "CBE" },
  { id: "abyssinia", name: "Abyssinia" },
  { id: "dashin", name: "Dashin" },
  { id: "telebirr", name: "Telebirr" },
  { id: "mpesa", name: "M-Pesa" },
]

const COUNTRIES = [
  { id: "et", name: "Ethiopia", code: "+251" },
  { id: "us", name: "United States", code: "+1" },
  { id: "uk", name: "United Kingdom", code: "+44" },
  { id: "ca", name: "Canada", code: "+1" },
  { id: "au", name: "Australia", code: "+61" },
  { id: "de", name: "Germany", code: "+49" },
  { id: "fr", name: "France", code: "+33" },
  { id: "it", name: "Italy", code: "+39" },
  { id: "es", name: "Spain", code: "+34" },
  { id: "nl", name: "Netherlands", code: "+31" },
  { id: "be", name: "Belgium", code: "+32" },
  { id: "ch", name: "Switzerland", code: "+41" },
  { id: "se", name: "Sweden", code: "+46" },
  { id: "no", name: "Norway", code: "+47" },
  { id: "dk", name: "Denmark", code: "+45" },
  { id: "fi", name: "Finland", code: "+358" },
  { id: "pl", name: "Poland", code: "+48" },
  { id: "cz", name: "Czech Republic", code: "+420" },
  { id: "at", name: "Austria", code: "+43" },
  { id: "gr", name: "Greece", code: "+30" },
  { id: "pt", name: "Portugal", code: "+351" },
  { id: "ie", name: "Ireland", code: "+353" },
  { id: "jp", name: "Japan", code: "+81" },
  { id: "cn", name: "China", code: "+86" },
  { id: "in", name: "India", code: "+91" },
  { id: "br", name: "Brazil", code: "+55" },
  { id: "mx", name: "Mexico", code: "+52" },
  { id: "za", name: "South Africa", code: "+27" },
  { id: "eg", name: "Egypt", code: "+20" },
  { id: "ng", name: "Nigeria", code: "+234" },
  { id: "ke", name: "Kenya", code: "+254" },
  { id: "ug", name: "Uganda", code: "+256" },
  { id: "tz", name: "Tanzania", code: "+255" },
  { id: "gh", name: "Ghana", code: "+233" },
  { id: "sn", name: "Senegal", code: "+221" },
  { id: "ma", name: "Morocco", code: "+212" },
  { id: "dz", name: "Algeria", code: "+213" },
  { id: "tn", name: "Tunisia", code: "+216" },
  { id: "ae", name: "United Arab Emirates", code: "+971" },
  { id: "sa", name: "Saudi Arabia", code: "+966" },
  { id: "il", name: "Israel", code: "+972" },
  { id: "tr", name: "Turkey", code: "+90" },
  { id: "ru", name: "Russia", code: "+7" },
  { id: "kr", name: "South Korea", code: "+82" },
  { id: "sg", name: "Singapore", code: "+65" },
  { id: "my", name: "Malaysia", code: "+60" },
  { id: "th", name: "Thailand", code: "+66" },
  { id: "ph", name: "Philippines", code: "+63" },
  { id: "id", name: "Indonesia", code: "+62" },
  { id: "vn", name: "Vietnam", code: "+84" },
  { id: "nz", name: "New Zealand", code: "+64" },
]

const CURRENCIES = [
  { id: "usd", name: "USD", symbol: "$" },
  { id: "usdt", name: "USDT", symbol: "₮" },
  { id: "usdc", name: "USDC", symbol: "₵" },
]

const PAYMENT_METHODS = [
  { id: "crypto", name: "Cryptocurrency" },
  { id: "bank", name: "Bank Transfer" },
  { id: "card", name: "Debit Card" },
]

interface SendMoneyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipients?: any[]
  onSuccess?: (transfer: any) => void
  walletConnected?: boolean
  onAddRecipientClick?: () => void
}

export function SendMoneyModal({ open, onOpenChange, walletConnected = false, onSuccess }: SendMoneyModalProps) {
  const { toast } = useToast()
  const { addTransaction } = useTransactions()
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [confirmationChecked, setConfirmationChecked] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    senderFullName: "",
    senderEmail: "",
    senderPhoneNumber: "",
    senderCountry: "",
    amount: "",
    currency: "usd",
    selectedBank: "",
    receiverFullName: "",
    receiverEmail: "",
    receiverPhoneNumber: "",
    receiverBankAccount: "",
    paymentMethod: "crypto",
  })

  const exchangeRate = 50

  const formatPhoneNumber = (phoneNumber: string, countryId: string) => {
    const country = COUNTRIES.find((c) => c.id === countryId)
    if (!country) return phoneNumber

    // Remove any existing country code or special characters
    const cleanNumber = phoneNumber.replace(/^\+\d+/, "").replace(/\D/g, "")

    // Return formatted number with country code
    return cleanNumber ? `${country.code}${cleanNumber}` : ""
  }

  const getCountryCode = (countryId: string) => {
    return COUNTRIES.find((c) => c.id === countryId)?.code || ""
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.senderFullName) newErrors.senderFullName = "Full name is required"
      if (!formData.senderEmail) newErrors.senderEmail = "Email is required"
      if (!formData.senderPhoneNumber) newErrors.senderPhoneNumber = "Phone number is required"
      if (!formData.senderCountry) newErrors.senderCountry = "Country is required"
    }

    if (step === 2) {
      if (!formData.amount) newErrors.amount = "Amount is required"
      if (Number.parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0"
      if (!formData.currency) newErrors.currency = "Currency is required"
    }

    if (step === 3) {
      if (!formData.selectedBank) newErrors.selectedBank = "Please select a bank"
    }

    if (step === 4) {
      if (!formData.receiverFullName) newErrors.receiverFullName = "Receiver full name is required"
      if (!formData.receiverEmail) newErrors.receiverEmail = "Receiver email is required"
      if (!formData.receiverPhoneNumber) newErrors.receiverPhoneNumber = "Receiver phone number is required"
      if (!formData.receiverBankAccount) newErrors.receiverBankAccount = "Bank account number is required"
    }

    if (step === 5) {
      if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
      setErrors({})
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!confirmationChecked) {
      setErrors({ confirmation: "You must agree to the terms and conditions" })
      return
    }

    setLoading(true)
    try {
      const transfer = await createTransfer({
        senderFullName: formData.senderFullName,
        senderEmail: formData.senderEmail,
        senderPhoneNumber: formatPhoneNumber(formData.senderPhoneNumber, formData.senderCountry),
        senderCountry: formData.senderCountry,
        amount: Number.parseFloat(formData.amount),
        currency: formData.currency,
        amountInBirr: Number.parseFloat(formData.amount) * exchangeRate,
        paymentMethod: formData.paymentMethod,
        bank: formData.selectedBank,
        receiverFullName: formData.receiverFullName,
        receiverEmail: formData.receiverEmail,
        receiverPhoneNumber: formatPhoneNumber(formData.receiverPhoneNumber, formData.senderCountry),
        receiverBankAccount: formData.receiverBankAccount,
        status: "pending",
      })

      const newTransaction = {
        userId: "redwan-mudasir",
        recipient: formData.receiverFullName,
        amount: `$${formData.amount}`,
        amountEtb: `₿ ${(Number.parseFloat(formData.amount) * exchangeRate).toFixed(0)}`,
        date: new Date().toLocaleString(),
        status: "pending" as const,
        type: "sent" as const,
        txHash: `0x${Math.random().toString(16).slice(2)}`,
        fee: `$${(Number.parseFloat(formData.amount) * 0.01).toFixed(2)}`,
        exchangeRate: `1 ${formData.currency.toUpperCase()} = 185 ETB`,
        senderName: formData.senderFullName,
        senderEmail: formData.senderEmail,
        senderPhone: formatPhoneNumber(formData.senderPhoneNumber, formData.senderCountry),
        receiverEmail: formData.receiverEmail,
        receiverPhone: formatPhoneNumber(formData.receiverPhoneNumber, formData.senderCountry),
        receiverBankAccount: formData.receiverBankAccount,
        bank: formData.selectedBank,
        paymentMethod: formData.paymentMethod,
      }

      addTransaction(newTransaction)

      toast({
        title: "Transfer initiated",
        description: `Sending ${formData.amount} ${formData.currency.toUpperCase()} to ${formData.receiverFullName}`,
      })

      onSuccess?.(transfer)
      onOpenChange(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create transfer",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setConfirmationChecked(false)
    setFormData({
      senderFullName: "",
      senderEmail: "",
      senderPhoneNumber: "",
      senderCountry: "",
      amount: "",
      currency: "usd",
      selectedBank: "",
      receiverFullName: "",
      receiverEmail: "",
      receiverPhoneNumber: "",
      receiverBankAccount: "",
      paymentMethod: "crypto",
    })
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>Step {step} of 6 - Complete your transfer</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {/* Step 1: Sender Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="senderFullName" className="text-foreground font-semibold">
                  Full Name
                </Label>
                <Input
                  id="senderFullName"
                  placeholder="Enter your full name"
                  value={formData.senderFullName}
                  onChange={(e) => setFormData({ ...formData, senderFullName: e.target.value })}
                  className="mt-2"
                />
                {errors.senderFullName && <p className="text-red-500 text-sm mt-1">{errors.senderFullName}</p>}
              </div>

              <div>
                <Label htmlFor="senderEmail" className="text-foreground font-semibold">
                  Email
                </Label>
                <Input
                  id="senderEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.senderEmail}
                  onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                  className="mt-2"
                />
                {errors.senderEmail && <p className="text-red-500 text-sm mt-1">{errors.senderEmail}</p>}
              </div>

              <div>
                <Label htmlFor="senderCountry" className="text-foreground font-semibold">
                  Country
                </Label>
                <Select
                  value={formData.senderCountry}
                  onValueChange={(value) => setFormData({ ...formData, senderCountry: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.senderCountry && <p className="text-red-500 text-sm mt-1">{errors.senderCountry}</p>}
              </div>

              <div>
                <Label htmlFor="senderPhoneNumber" className="text-foreground font-semibold">
                  Phone Number{" "}
                  {formData.senderCountry && (
                    <span className="text-muted-foreground">({getCountryCode(formData.senderCountry)})</span>
                  )}
                </Label>
                <Input
                  id="senderPhoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.senderPhoneNumber}
                  onChange={(e) => setFormData({ ...formData, senderPhoneNumber: e.target.value })}
                  className="mt-2"
                />
                {errors.senderPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.senderPhoneNumber}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Amount */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-foreground font-semibold">
                  Amount to Send
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="mt-2"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <Label htmlFor="currency" className="text-foreground font-semibold">
                  Currency
                </Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.id} value={currency.id}>
                        {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
              </div>

              {formData.amount && (
                <Alert>
                  <AlertDescription>
                    ℹ️ Approximately {(Number.parseFloat(formData.amount) * exchangeRate).toFixed(2)} ETB
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step 3: Bank Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-foreground font-semibold">Select Bank</Label>
              <div className="space-y-2">
                {BANKS.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setFormData({ ...formData, selectedBank: bank.id })}
                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                      formData.selectedBank === bank.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{bank.name}</span>
                      {formData.selectedBank === bank.id && <span className="text-primary">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
              {errors.selectedBank && <p className="text-red-500 text-sm">{errors.selectedBank}</p>}
            </div>
          )}

          {/* Step 4: Receiver Details */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="receiverFullName" className="text-foreground font-semibold">
                  Receiver Full Name
                </Label>
                <Input
                  id="receiverFullName"
                  placeholder="Enter receiver's full name"
                  value={formData.receiverFullName}
                  onChange={(e) => setFormData({ ...formData, receiverFullName: e.target.value })}
                  className="mt-2"
                />
                {errors.receiverFullName && <p className="text-red-500 text-sm mt-1">{errors.receiverFullName}</p>}
              </div>

              <div>
                <Label htmlFor="receiverEmail" className="text-foreground font-semibold">
                  Receiver Email
                </Label>
                <Input
                  id="receiverEmail"
                  type="email"
                  placeholder="Enter receiver's email"
                  value={formData.receiverEmail}
                  onChange={(e) => setFormData({ ...formData, receiverEmail: e.target.value })}
                  className="mt-2"
                />
                {errors.receiverEmail && <p className="text-red-500 text-sm mt-1">{errors.receiverEmail}</p>}
              </div>

              <div>
                <Label htmlFor="receiverPhoneNumber" className="text-foreground font-semibold">
                  Receiver Phone Number{" "}
                  {formData.senderCountry && (
                    <span className="text-muted-foreground">({getCountryCode(formData.senderCountry)})</span>
                  )}
                </Label>
                <Input
                  id="receiverPhoneNumber"
                  placeholder="Enter receiver's phone number"
                  value={formData.receiverPhoneNumber}
                  onChange={(e) => setFormData({ ...formData, receiverPhoneNumber: e.target.value })}
                  className="mt-2"
                />
                {errors.receiverPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverPhoneNumber}</p>
                )}
              </div>

              <div>
                <Label htmlFor="receiverBankAccount" className="text-foreground font-semibold">
                  Bank Account Number
                </Label>
                <Input
                  id="receiverBankAccount"
                  placeholder="Enter receiver's bank account number"
                  value={formData.receiverBankAccount}
                  onChange={(e) => setFormData({ ...formData, receiverBankAccount: e.target.value })}
                  className="mt-2"
                />
                {errors.receiverBankAccount && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverBankAccount}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Payment Method */}
          {step === 5 && (
            <div className="space-y-4">
              <Label className="text-foreground font-semibold">Select Payment Method</Label>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                      formData.paymentMethod === method.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{method.name}</span>
                      {formData.paymentMethod === method.id && <span className="text-primary">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
            </div>
          )}

          {/* Step 6: Review & Confirm */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h3 className="font-semibold text-foreground mb-3">Sender Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Full Name</p>
                      <p className="font-medium">{formData.senderFullName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.senderEmail}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">
                        {formatPhoneNumber(formData.senderPhoneNumber, formData.senderCountry)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Country</p>
                      <p className="font-medium">{COUNTRIES.find((c) => c.id === formData.senderCountry)?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-muted/50">
                  <h3 className="font-semibold text-foreground mb-3">Receiver Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Full Name</p>
                      <p className="font-medium">{formData.receiverFullName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.receiverEmail}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">
                        {formatPhoneNumber(formData.receiverPhoneNumber, formData.senderCountry)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account</p>
                      <p className="font-medium">{formData.receiverBankAccount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-muted/50">
                <h3 className="font-semibold text-foreground mb-3">Transfer Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">
                      {formData.amount} {formData.currency.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bank</p>
                    <p className="font-medium">{BANKS.find((b) => b.id === formData.selectedBank)?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod)?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount in ETB</p>
                    <p className="font-medium">{(Number.parseFloat(formData.amount) * exchangeRate).toFixed(2)} ETB</p>
                  </div>
                </div>
              </div>

              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-yellow-800">
                  ⚠️ By confirming, you agree to our terms and conditions. This transfer cannot be reversed.
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirmation"
                  checked={confirmationChecked}
                  onCheckedChange={(checked) => setConfirmationChecked(checked as boolean)}
                />
                <Label htmlFor="confirmation" className="text-sm cursor-pointer">
                  I agree to the terms and conditions
                </Label>
              </div>
              {errors.confirmation && <p className="text-red-500 text-sm">{errors.confirmation}</p>}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || loading}
            className="flex-1 bg-transparent"
          >
            ← Back
          </Button>

          {step < 6 ? (
            <Button onClick={handleNext} disabled={loading} className="flex-1">
              Next →
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading || !confirmationChecked} className="flex-1">
              {loading ? "Processing..." : "Confirm Transfer"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
