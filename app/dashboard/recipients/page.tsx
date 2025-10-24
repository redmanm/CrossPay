"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit2, Trash2, Mail, Phone, Building2 } from "lucide-react"
import { getRecipients, deleteRecipient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { AddRecipientModal } from "@/components/add-recipient-modal"
import { EditRecipientModal } from "@/components/edit-recipient-modal"

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState<any[]>([])
  const [filteredRecipients, setFilteredRecipients] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadRecipients()
  }, [])

  useEffect(() => {
    const filtered = recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery),
    )
    setFilteredRecipients(filtered)
  }, [searchQuery, recipients])

  const loadRecipients = async () => {
    try {
      setLoading(true)
      const data = await getRecipients()
      setRecipients(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recipients",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipient?")) return

    try {
      await deleteRecipient(id)
      setRecipients(recipients.filter((r) => r.id !== id))
      toast({
        title: "Recipient deleted",
        description: "The recipient has been removed from your list.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete recipient",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (recipient: any) => {
    setSelectedRecipient(recipient)
    setEditModalOpen(true)
  }

  const handleAddSuccess = (newRecipient: any) => {
    setRecipients([...recipients, newRecipient])
  }

  const handleEditSuccess = (updatedRecipient: any) => {
    setRecipients(recipients.map((r) => (r.id === updatedRecipient.id ? updatedRecipient : r)))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recipients</h1>
            <p className="text-foreground/60 mt-1">Manage your money transfer recipients</p>
          </div>
          <Button
            onClick={() => setAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Recipient
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Recipients Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">Loading recipients...</p>
          </div>
        ) : filteredRecipients.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-foreground/60 mb-4">No recipients yet</p>
            <Button
              onClick={() => setAddModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Recipient
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredRecipients.map((recipient) => (
              <Card key={recipient.id} className="p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{recipient.name}</h3>
                    <p className="text-sm text-foreground/60 capitalize mt-1">{recipient.relationship}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{recipient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{recipient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span>{recipient.bankName}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                      <p className="text-xs text-foreground/60">Account Number</p>
                      <p className="font-mono font-semibold text-foreground">{recipient.accountNumber}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(recipient)}
                      className="text-foreground border-border hover:bg-secondary"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(recipient.id)}
                      className="text-destructive border-border hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddRecipientModal open={addModalOpen} onOpenChange={setAddModalOpen} onSuccess={handleAddSuccess} />
      {selectedRecipient && (
        <EditRecipientModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          recipient={selectedRecipient}
          onSuccess={handleEditSuccess}
        />
      )}
    </DashboardLayout>
  )
}
