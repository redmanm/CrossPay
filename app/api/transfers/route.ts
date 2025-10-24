import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with real database
const transfers: any[] = []
const recipients: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    if (type === "create") {
      const transfer = {
        id: `TXN-${Date.now()}`,
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      transfers.push(transfer)
      return NextResponse.json(transfer, { status: 201 })
    }

    if (type === "list") {
      return NextResponse.json(transfers)
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
      const transfer = transfers.find((t) => t.id === id)
      return NextResponse.json(transfer || { error: "Not found" }, { status: transfer ? 200 : 404 })
    }

    return NextResponse.json(transfers)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
