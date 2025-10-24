"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Shield, AlertCircle } from "lucide-react"
import { useState } from "react"

export function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Change Password</h2>
        </div>

        {!showPasswordForm ? (
          <Button
            onClick={() => setShowPasswordForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Update Password
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Current Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">New Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Save Password</Button>
              <Button
                onClick={() => setShowPasswordForm(false)}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Two-Factor Authentication</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-secondary/50 border border-border rounded-lg">
            <p className="text-sm text-foreground/70">
              Add an extra layer of security to your account. You'll need to enter a code from your authenticator app
              when you sign in.
            </p>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Enable 2FA</Button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Active Sessions</h2>

        <div className="space-y-4">
          {[
            { device: "Chrome on macOS", location: "New York, USA", lastActive: "Now", current: true },
            { device: "Safari on iPhone", location: "New York, USA", lastActive: "2 hours ago", current: false },
            { device: "Firefox on Windows", location: "San Francisco, USA", lastActive: "1 day ago", current: false },
          ].map((session, idx) => (
            <div key={idx} className="p-4 border border-border rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{session.device}</p>
                <p className="text-sm text-foreground/60">
                  {session.location} • Last active {session.lastActive}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {session.current && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Current</span>
                )}
                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive/30 text-destructive hover:bg-destructive/5 bg-transparent"
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Alert */}
      <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 flex gap-4">
        <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground mb-1">Keep Your Account Secure</p>
          <ul className="text-sm text-foreground/70 space-y-1">
            <li>• Use a strong, unique password</li>
            <li>• Enable two-factor authentication</li>
            <li>• Review active sessions regularly</li>
            <li>• Never share your recovery codes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
