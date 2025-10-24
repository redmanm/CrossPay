import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { UserProvider } from "@/components/user-context"
import { TransactionProvider } from "@/components/transaction-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "CrossPay - Fast Remittances to Ethiopia",
  description: "Send money to Ethiopia instantly with crypto. 80% lower fees, blockchain-verified, 24/7 available.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <UserProvider>
          <TransactionProvider>{children}</TransactionProvider>
        </UserProvider>
        <Analytics />
      </body>
    </html>
  )
}
