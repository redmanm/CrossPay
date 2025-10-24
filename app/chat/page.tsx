"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageCircle, ArrowLeft, Sparkles, AlertCircle } from "lucide-react"
import Link from "next/link"
import { ChatMessage } from "@/components/chat-message"
import { useChat } from "@ai-sdk/react"

export default function ChatPage() {
  const { messages, input, setInput, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("[v0] Chat error:", error)
    },
  })

  const [localError, setLocalError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSuggestionClick = (suggestion: string) => {
    setLocalError(null)
    setInput(suggestion)
    setTimeout(() => {
      const form = document.querySelector("form") as HTMLFormElement
      if (form) {
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))
      }
    }, 0)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError(null)

    if (!input?.trim()) {
      setLocalError("Please enter a message")
      return
    }

    handleSubmit(e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary/50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CrossPay Assistant
                </h1>
                <p className="text-xs text-foreground/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI-powered support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="pt-24 pb-32 px-4">
        <div className="max-w-2xl mx-auto">
          {(error || localError) && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-600 font-medium">Error</p>
                <p className="text-sm text-red-600/80">{error?.message || localError}</p>
              </div>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Welcome to CrossPay Assistant</h2>
              <p className="text-foreground/70 max-w-md mb-10 leading-relaxed">
                I'm here to help you with any questions about sending money to Ethiopia, exchange rates, fees, security,
                and more.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                {[
                  "How do I send money to Ethiopia?",
                  "What are your fees?",
                  "Is CrossPay secure?",
                  "What cryptocurrencies do you support?",
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                    className="text-left p-4 rounded-xl border border-border/50 bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all duration-200 text-sm text-foreground/80 hover:text-foreground shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <ChatMessage key={idx} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-none p-4 max-w-md backdrop-blur-sm border border-border/30">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full bg-gradient-to-t from-background via-background to-transparent backdrop-blur-xl border-t border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <form onSubmit={onSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setLocalError(null)
              }}
              placeholder="Ask me anything about CrossPay..."
              className="flex-1 bg-input border-border/50 text-foreground placeholder:text-foreground/50 rounded-xl shadow-md focus:shadow-lg transition-shadow"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
