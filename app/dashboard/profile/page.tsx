"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileSettings } from "@/components/profile-settings"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-foreground/60 mt-2">Manage your profile information</p>
        </div>

        <ProfileSettings />
      </div>
    </DashboardLayout>
  )
}
