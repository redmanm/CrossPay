"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsHeader } from "@/components/settings-header"
import { WalletSettings } from "@/components/wallet-settings"
import { ProfileSettings } from "@/components/profile-settings"
import { SecuritySettings } from "@/components/security-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "wallet", label: "Wallet" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <SettingsHeader />

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-semibold transition ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "wallet" && <WalletSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </DashboardLayout>
  )
}
