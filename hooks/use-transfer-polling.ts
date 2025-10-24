"use client"

import { useEffect, useRef } from "react"

export function useTransferPolling(transferId: string, onUpdate: (data: any) => void, interval = 5000) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const poll = async () => {
      try {
        const response = await fetch(`/api/transfers?id=${transferId}`)
        const data = await response.json()
        onUpdate(data)
      } catch (error) {
        console.error("Failed to poll transfer status:", error)
      }
    }

    // Initial poll
    poll()

    // Set up interval
    intervalRef.current = setInterval(poll, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [transferId, onUpdate, interval])
}
