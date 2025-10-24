"use client"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function ChatWidget() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/chat">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all z-40 group"
        aria-label="Open chat"
      >
        <MessageCircle className={`w-6 h-6 transition-transform ${isHovered ? "scale-110" : ""}`} />
      </button>
    </Link>
  )
}
