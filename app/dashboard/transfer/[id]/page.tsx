"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, CheckCircle, Clock, AlertCircle, Copy } from "lucide-react"
import { getTransfer } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

export default function TransferDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [transfer, setTransfer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTransfer()
  }, [id])

  const loadTransfer = async () => {
    try {
      setLoading(true)
      const data = await getTransfer(id)
      setTransfer(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transfer details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />
      case "processing":
        return <Clock className="w-5 h-5" />
      case "failed":
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Transaction ID copied to clipboard",
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-foreground/60">Loading transfer details...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!transfer) {
    return (
      <DashboardLayout>
        <Card className="p-12 text-center">
          <p className="text-foreground/60">Transfer not found</p>
        </Card>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Transfer Receipt</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Status Card */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${getStatusColor(transfer.status)}`}>
                {getStatusIcon(transfer.status)}
              </div>
              <div>
                <p className="text-sm text-foreground/60">Transfer Status</p>
                <p className="text-2xl font-bold text-foreground capitalize">{transfer.status}</p>
              </div>
            </div>
            <Badge className={getStatusColor(transfer.status)}>{transfer.status.toUpperCase()}</Badge>
          </div>

          {transfer.status === "completed" && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-900 dark:text-green-100">
                Transfer completed successfully. Recipient should receive funds within 24 hours.
              </p>
            </div>
          )}

          {transfer.status === "processing" && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Your transfer is being processed. We'll notify you when it's completed.
              </p>
            </div>
          )}
        </Card>

        {/* Transfer Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* From */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-foreground/60 mb-4">FROM</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-foreground/60">Sender</p>
                <p className="font-semibold text-foreground">You</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Amount Sent</p>
                <p className="text-2xl font-bold text-foreground">
                  {transfer.amount} <span className="text-lg text-foreground/60">{transfer.currency}</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Payment Method</p>
                <p className="font-semibold text-foreground capitalize">{transfer.paymentMethod}</p>
              </div>
            </div>
          </Card>

          {/* To */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-foreground/60 mb-4">TO</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-foreground/60">Recipient</p>
                <p className="font-semibold text-foreground">{transfer.recipientName}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Amount Received</p>
                <p className="text-2xl font-bold text-primary">
                  {transfer.amountInBirr.toFixed(2)} <span className="text-lg text-foreground/60">ETB</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-foreground/60">Recipient Bank</p>
                <p className="font-semibold text-foreground">Commercial Bank of Ethiopia</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Transaction Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-foreground/70">Transaction ID</span>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm font-semibold text-foreground">{transfer.id}</code>
                <button
                  onClick={() => copyToClipboard(transfer.id)}
                  className="p-1 hover:bg-secondary rounded transition"
                >
                  <Copy className="w-4 h-4 text-foreground/60" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-foreground/70">Exchange Rate</span>
              <span className="font-semibold text-foreground">
                1 {transfer.currency} = {(transfer.amountInBirr / transfer.amount).toFixed(2)} ETB
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-foreground/70">Fee</span>
              <span className="font-semibold text-foreground">
                {(transfer.amount * 0.01).toFixed(2)} {transfer.currency}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-foreground/70">Date & Time</span>
              <span className="font-semibold text-foreground">{new Date(transfer.createdAt).toLocaleString()}</span>
            </div>

            {transfer.status === "completed" && (
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Completed At</span>
                <span className="font-semibold text-foreground">
                  {new Date(transfer.completedAt || transfer.createdAt).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Blockchain Info */}
        <Card className="p-6 bg-secondary/30">
          <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground/60 mb-1">Smart Contract Address</p>
              <code className="text-sm font-mono bg-background p-2 rounded block text-foreground/80 break-all">
                0x742d35Cc6634C0532925a3b844Bc9e7595f42e0e
              </code>
            </div>
            <div>
              <p className="text-xs text-foreground/60 mb-1">Transaction Hash</p>
              <code className="text-sm font-mono bg-background p-2 rounded block text-foreground/80 break-all">
                0x{Math.random().toString(16).slice(2)}
              </code>
            </div>
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary mt-4 bg-transparent"
            >
              View on Blockchain Explorer
            </Button>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent">
            Send Another Transfer
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Back to Dashboard</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
