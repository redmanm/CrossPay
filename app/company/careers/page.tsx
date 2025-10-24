import { Button } from "@/components/ui/button"
import { Send, MapPin, Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const positions = [
    {
      title: "Senior Smart Contract Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Community Manager",
      department: "Community",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
    },
  ]

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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">Join Our Team</h1>
          <p className="text-base sm:text-xl text-foreground/70">
            Help us revolutionize remittances with Web3 technology
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center">
            Why Join CrossPay?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: "Impact", description: "Work on technology that changes lives and financial inclusion." },
              { title: "Growth", description: "Learn cutting-edge Web3 and blockchain technologies." },
              { title: "Culture", description: "Join a diverse, remote-first team passionate about our mission." },
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Open Positions</h2>
          <div className="space-y-3 sm:space-y-4">
            {positions.map((position, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-xl font-bold text-foreground mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-foreground/60">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">{position.type}</span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
