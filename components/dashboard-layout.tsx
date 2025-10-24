"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Send, Home, SendIcon, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/send", label: "Send Money", icon: SendIcon },
    { href: "/dashboard/transactions", label: "Transactions", icon: SendIcon },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  const handleSignOut = () => {
    // Clear any stored auth data
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("authToken")
    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Send className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">CrossPay</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-30 transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:pt-0 pt-16`}
      >
        <div className="hidden md:flex items-center gap-2 p-6 border-b border-border">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Send className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">CrossPay</span>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-secondary"}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-foreground border-border hover:bg-secondary bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 px-4 md:px-8 py-8">{children}</main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
