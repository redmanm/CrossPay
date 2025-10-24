"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    transactionEmail: true,
    transactionPush: true,
    securityEmail: true,
    securityPush: true,
    promotionalEmail: false,
    promotionalPush: false,
    weeklyReport: true,
    monthlyReport: true,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] })
  }

  const NotificationToggle = ({ label, value, onChange }: any) => (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition">
      <p className="text-foreground font-medium">{label}</p>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition ${value ? "bg-primary" : "bg-foreground/20"}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${value ? "right-1" : "left-1"}`} />
      </button>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Transaction Notifications */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Transaction Notifications</h2>
        </div>

        <div className="space-y-3">
          <NotificationToggle
            label="Email notifications for transactions"
            value={notifications.transactionEmail}
            onChange={() => toggleNotification("transactionEmail")}
          />
          <NotificationToggle
            label="Push notifications for transactions"
            value={notifications.transactionPush}
            onChange={() => toggleNotification("transactionPush")}
          />
        </div>
      </div>

      {/* Security Notifications */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Security Notifications</h2>
        </div>

        <div className="space-y-3">
          <NotificationToggle
            label="Email notifications for security alerts"
            value={notifications.securityEmail}
            onChange={() => toggleNotification("securityEmail")}
          />
          <NotificationToggle
            label="Push notifications for security alerts"
            value={notifications.securityPush}
            onChange={() => toggleNotification("securityPush")}
          />
        </div>
      </div>

      {/* Marketing Notifications */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Marketing & Updates</h2>
        </div>

        <div className="space-y-3">
          <NotificationToggle
            label="Promotional emails and offers"
            value={notifications.promotionalEmail}
            onChange={() => toggleNotification("promotionalEmail")}
          />
          <NotificationToggle
            label="Promotional push notifications"
            value={notifications.promotionalPush}
            onChange={() => toggleNotification("promotionalPush")}
          />
        </div>
      </div>

      {/* Reports */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Reports</h2>

        <div className="space-y-3">
          <NotificationToggle
            label="Weekly activity report"
            value={notifications.weeklyReport}
            onChange={() => toggleNotification("weeklyReport")}
          />
          <NotificationToggle
            label="Monthly summary report"
            value={notifications.monthlyReport}
            onChange={() => toggleNotification("monthlyReport")}
          />
        </div>
      </div>
    </div>
  )
}
