import { type NextRequest, NextResponse } from "next/server"

// Mock database
const recipients: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    if (type === "create") {
      const recipient = {
        id: `RCP-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      }
      recipients.push(recipient)
      return NextResponse.json(recipient, { status: 201 })
    }

    if (type === "update") {
      const index = recipients.findIndex((r) => r.id === data.id)
      if (index !== -1) {
        recipients[index] = { ...recipients[index], ...data, updatedAt: new Date().toISOString() }
        return NextResponse.json(recipients[index])
      }
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (type === "delete") {
      const index = recipients.findIndex((r) => r.id === data.id)
      if (index !== -1) {
        recipients.splice(index, 1)
        return NextResponse.json({ success: true })
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
    return NextResponse.json(recipients)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
