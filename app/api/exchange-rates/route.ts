import { type NextRequest, NextResponse } from "next/server"

// Mock exchange rates - replace with real API
const rates: Record<string, number> = {
  USD: 1,
  USDT: 1,
  USDC: 1,
  ETB: 0.0054, // 1 ETB = 0.0054 USD (approximately)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const from = searchParams.get("from") || "USD"
    const to = searchParams.get("to") || "ETB"

    const fromRate = rates[from] || 1
    const toRate = rates[to] || 1
    const rate = toRate / fromRate

    return NextResponse.json({
      from,
      to,
      rate,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
