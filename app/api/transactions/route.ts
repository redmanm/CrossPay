import { type NextRequest, NextResponse } from "next/server"

// Mock database for transactions
const transactions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    if (type === "create") {
      const transaction = {
        id: `TXN-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      }
      transactions.push(transaction)
      return NextResponse.json(transaction, { status: 201 })
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type")

    if (type) {
      const filtered = transactions.filter((t) => t.type === type)
      return NextResponse.json(filtered)
    }

    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
