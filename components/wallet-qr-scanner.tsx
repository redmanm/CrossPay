"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Camera } from "lucide-react"

interface WalletQrScannerProps {
  onScanned: (data: string) => void
}

export function WalletQrScanner({ onScanned }: WalletQrScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartScan = async () => {
    setIsScanning(true)
    setError(null)

    try {
      // In a real implementation, this would use a QR code scanning library
      // For now, we'll simulate the scan
      setTimeout(() => {
        onScanned("wc:abc123@1")
        setIsScanning(false)
      }, 2000)
    } catch (err) {
      setError("Failed to access camera. Please check permissions.")
      setIsScanning(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        {isScanning ? (
          <div className="text-center space-y-3">
            <div className="inline-block p-4 bg-teal-100 rounded-full animate-pulse">
              <Camera className="w-8 h-8 text-teal-600" />
            </div>
            <p className="text-sm font-semibold text-foreground">Scanning...</p>
            <p className="text-xs text-foreground/60">Point camera at QR code</p>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <Camera className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-sm text-foreground/60">Ready to scan QR code</p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <Button
        onClick={handleStartScan}
        disabled={isScanning}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold"
      >
        {isScanning ? "Scanning..." : "Start Camera Scan"}
      </Button>

      <p className="text-xs text-foreground/60 text-center">Make sure to allow camera access when prompted</p>
    </div>
  )
}
