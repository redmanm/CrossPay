import { Button } from "@/components/ui/button"
import { Send, Users, Target, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">CrossPay</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 sm:hidden" />
            <Button variant="ghost" className="hidden sm:flex text-foreground">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">About CrossPay</h1>
          <p className="text-base sm:text-xl text-foreground/70">Revolutionizing remittances through Web3 technology</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-base sm:text-lg text-foreground/70 mb-3 sm:mb-4">
                We're on a mission to make remittances faster, cheaper, and more accessible for the Ethiopian diaspora
                and visitors.
              </p>
              <p className="text-base sm:text-lg text-foreground/70">
                By leveraging Web3 technology and KRNL Labs infrastructure, we're eliminating intermediaries and
                reducing costs by up to 80%.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <Target className="w-12 sm:w-16 h-12 sm:h-16 text-primary mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">Our Vision</h3>
              <p className="text-sm sm:text-base text-foreground/70">
                To become the leading Web3-powered remittance platform connecting diaspora communities with their
                families and businesses globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-8 sm:mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Heart,
                title: "User First",
                description: "We prioritize user experience and financial inclusion above all else.",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "We build with and for our community, listening to feedback and iterating.",
              },
              {
                icon: Target,
                title: "Transparency",
                description: "We believe in complete transparency in fees, rates, and operations.",
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
                <value.icon className="w-10 sm:w-12 h-10 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">Join Our Team</h2>
          <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8">
            We're hiring talented individuals passionate about Web3 and financial inclusion.
          </p>
          <Link href="/company/careers">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              View Open Positions
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
