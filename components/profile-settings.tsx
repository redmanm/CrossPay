"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Check } from "lucide-react"

export function ProfileSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    city: "New York",
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Profile Picture</h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div className="space-y-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Upload Photo
            </Button>
            <p className="text-sm text-foreground/60">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Country</label>
              <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">City</label>
            <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
