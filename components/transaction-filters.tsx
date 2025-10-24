"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

export function TransactionFilters() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dateRange: "all",
    type: "all",
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <Input
            placeholder="Search by recipient, amount, or ID..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary bg-transparent"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "Hide" : "Show"} Filters
        </Button>
      </div>

      {showAdvanced && (
        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
              <option value="refund">Refund</option>
            </select>
          </div>
        </div>
      )}

      {(filters.search || filters.status !== "all" || filters.dateRange !== "all" || filters.type !== "all") && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-sm text-foreground/60">Active filters:</span>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground hover:bg-secondary bg-transparent flex items-center gap-1"
            onClick={() =>
              setFilters({
                search: "",
                status: "all",
                dateRange: "all",
                type: "all",
              })
            }
          >
            <X className="w-3 h-3" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
