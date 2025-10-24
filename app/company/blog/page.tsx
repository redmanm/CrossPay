import { Button } from "@/components/ui/button"
import { Send, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "How Web3 is Revolutionizing Remittances",
      excerpt: "Explore how blockchain technology is making international money transfers faster and cheaper.",
      date: "Mar 15, 2025",
      category: "Technology",
    },
    {
      title: "The Future of Cross-Border Payments",
      excerpt: "Understanding stablecoins, smart contracts, and their role in global finance.",
      date: "Mar 10, 2025",
      category: "Finance",
    },
    {
      title: "CrossPay Security: How We Protect Your Funds",
      excerpt: "Deep dive into our security infrastructure and why blockchain is safer than traditional banking.",
      date: "Mar 5, 2025",
      category: "Security",
    },
    {
      title: "Diaspora Stories: Sending Money Home",
      excerpt: "Real stories from our users about how CrossPay has changed their lives.",
      date: "Feb 28, 2025",
      category: "Community",
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6">CrossPay Blog</h1>
          <p className="text-base sm:text-xl text-foreground/70">
            Insights on Web3, remittances, and financial inclusion
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-8">
            {posts.map((post, idx) => (
              <article
                key={idx}
                className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition"
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs sm:text-sm text-foreground/60">{post.date}</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{post.title}</h2>
                <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">{post.excerpt}</p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 text-sm sm:text-base">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8">
            Get the latest updates on Web3, remittances, and CrossPay.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
