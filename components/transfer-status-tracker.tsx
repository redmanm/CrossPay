"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TransferStatusTrackerProps {
  status: string
  createdAt: string
  completedAt?: string
}

export function TransferStatusTracker({ status, createdAt, completedAt }: TransferStatusTrackerProps) {
  const [steps, setSteps] = useState<any[]>([])

  useEffect(() => {
    const initSteps = [
      {
        id: 1,
        title: "Payment Initiated",
        description: "Your transfer has been created",
        completed: true,
        timestamp: createdAt,
      },
      {
        id: 2,
        title: "Funds Locked",
        description: "Crypto locked in smart contract",
        completed: status !== "pending",
        timestamp: status !== "pending" ? new Date().toISOString() : null,
      },
      {
        id: 3,
        title: "Partner Processing",
        description: "Converting to Ethiopian Birr",
        completed: status === "completed",
        timestamp: status === "completed" ? completedAt : null,
      },
      {
        id: 4,
        title: "Funds Delivered",
        description: "Recipient received payment",
        completed: status === "completed",
        timestamp: status === "completed" ? completedAt : null,
      },
    ]
    setSteps(initSteps)
  }, [status, createdAt, completedAt])

  const getStepIcon = (step: any, index: number) => {
    if (step.completed) {
      return <CheckCircle className="w-6 h-6 text-green-500" />
    }
    if (index === steps.findIndex((s) => !s.completed)) {
      return <Clock className="w-6 h-6 text-primary animate-spin" />
    }
    return <Clock className="w-6 h-6 text-foreground/30" />
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Transfer Progress</h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id}>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                {getStepIcon(step, index)}
                {index < steps.length - 1 && (
                  <div className={`w-1 h-12 mt-2 ${step.completed ? "bg-green-500" : "bg-foreground/10"}`}></div>
                )}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${step.completed ? "text-foreground" : "text-foreground/60"}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-foreground/60">{step.description}</p>
                  </div>
                  {step.timestamp && (
                    <span className="text-xs text-foreground/50 whitespace-nowrap ml-4">
                      {new Date(step.timestamp).toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {status === "failed" && (
        <div className="mt-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-100">Transfer Failed</p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">
              Your transfer could not be completed. Please contact support for assistance.
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
