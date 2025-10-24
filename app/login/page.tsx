"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthForm } from "@/components/auth-form"
import { Send, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">CrossPay</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mt-6 mb-2">Welcome Back</h1>
          <p className="text-foreground/60">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-foreground/60">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold transition">
              Sign up
            </Link>
          </p>
          <Button variant="link" className="text-foreground/60 hover:text-foreground">
            Forgot password?
          </Button>
        </div>
      </div>
    </div>
  )
}
