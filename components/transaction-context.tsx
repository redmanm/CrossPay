"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Transaction {
  id?: number
  userId: string
  recipient: string
  amount: string
  amountEtb: string
  date: string
  status: "completed" | "pending" | "failed"
  type: "sent" | "received"
  txHash: string
  fee: string
  exchangeRate: string
  senderName?: string
  senderEmail?: string
  senderPhone?: string
  receiverEmail?: string
  receiverPhone?: string
  receiverBankAccount?: string
  bank?: string
  paymentMethod?: string
}

interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  removeTransaction: (id: number) => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      userId: "redwan-mudasir",
      recipient: "Abebe Kebede",
      amount: "$500",
      amountEtb: "₿ 92,500",
      date: "Today 2:45 PM",
      status: "completed",
      type: "sent",
      txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1",
      fee: "$5",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 2,
      userId: "redwan-mudasir",
      recipient: "Almaz Tekle",
      amount: "$1,200",
      amountEtb: "₿ 222,000",
      date: "Yesterday 10:20 AM",
      status: "completed",
      type: "sent",
      txHash: "0x8a3f2Bb7234D1643826c4d955Ef8a2c6d53e9f2",
      fee: "$12",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 3,
      userId: "redwan-mudasir",
      recipient: "Yohannes Assefa",
      amount: "$750",
      amountEtb: "₿ 138,750",
      date: "2 days ago",
      status: "pending",
      type: "sent",
      txHash: "0x5c1e9Aa4567B8901234d5e6f7g8h9i0j1k2l3m4",
      fee: "$7.50",
      exchangeRate: "1 USD = 185 ETB",
    },
    {
      id: 5,
      userId: "redwan-mudasir",
      recipient: "Tekle Mariam",
      amount: "$320",
      amountEtb: "₿ 59,200",
      date: "1 week ago",
      status: "failed",
      type: "sent",
      txHash: "0x1a2b3Cc4567D8901234e5f6g7h8i9j0k1l2m3n",
      fee: "$0",
      exchangeRate: "1 USD = 185 ETB",
    },
  ])

  const addTransaction = (transaction: Transaction) => {
    const newTransaction = {
      ...transaction,
      id: Math.max(...transactions.map((t) => t.id || 0), 0) + 1,
    }
    setTransactions([newTransaction, ...transactions])
  }

  const removeTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider")
  }
  return context
}
