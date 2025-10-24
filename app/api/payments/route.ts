import { type NextRequest, NextResponse } from "next/server"

// Mock database
const payments: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    if (type === "create") {
      const payment = {
        id: `PAY-${Date.now()}`,
        ...data,
        status: "processing",
        createdAt: new Date().toISOString(),
      }
      payments.push(payment)
      return NextResponse.json(payment, { status: 201 })
    }

    if (type === "confirm") {
      const payment = payments.find((p) => p.id === data.id)
      if (payment) {
        payment.status = "completed"
        payment.completedAt = new Date().toISOString()
        return NextResponse.json(payment)
      }
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (id) {
      const payment = payments.find((p) => p.id === id)
      return NextResponse.json(payment || { error: "Not found" }, { status: payment ? 200 : 404 })
    }

    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
