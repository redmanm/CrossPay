"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { updateRecipient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface EditRecipientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipient: any
  onSuccess?: (recipient: any) => void
}

export function EditRecipientModal({ open, onOpenChange, recipient, onSuccess }: EditRecipientModalProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: recipient?.name || "",
    email: recipient?.email || "",
    phone: recipient?.phone || "",
    accountNumber: recipient?.accountNumber || "",
    bankName: recipient?.bankName || "",
    accountType: recipient?.accountType || "checking",
    relationship: recipient?.relationship || "family",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required"
    if (!formData.bankName) newErrors.bankName = "Bank is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const updated = await updateRecipient(recipient.id, formData)
      toast({
        title: "Recipient updated",
        description: `${formData.name} has been updated.`,
      })
      onSuccess?.(updated)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update recipient. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Recipient</DialogTitle>
          <DialogDescription>Update recipient information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground font-semibold">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2"
            />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground font-semibold">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="+251 9XX XXX XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-2"
            />
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="accountNumber" className="text-foreground font-semibold">
              Bank Account Number
            </Label>
            <Input
              id="accountNumber"
              placeholder="1234567890"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="mt-2"
            />
            {errors.accountNumber && <p className="text-destructive text-sm mt-1">{errors.accountNumber}</p>}
          </div>

          <div>
            <Label htmlFor="bankName" className="text-foreground font-semibold">
              Bank Name
            </Label>
            <Select value={formData.bankName} onValueChange={(value) => setFormData({ ...formData, bankName: value })}>
              <SelectTrigger id="bankName" className="mt-2">
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbe">Commercial Bank of Ethiopia</SelectItem>
                <SelectItem value="dashen">Dashen Bank</SelectItem>
                <SelectItem value="awash">Awash Bank</SelectItem>
                <SelectItem value="telebirr">Telebirr</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.bankName && <p className="text-destructive text-sm mt-1">{errors.bankName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountType" className="text-foreground font-semibold">
                Account Type
              </Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) => setFormData({ ...formData, accountType: value })}
              >
                <SelectTrigger id="accountType" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="relationship" className="text-foreground font-semibold">
                Relationship
              </Label>
              <Select
                value={formData.relationship}
                onValueChange={(value) => setFormData({ ...formData, relationship: value })}
              >
                <SelectTrigger id="relationship" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Recipient"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
