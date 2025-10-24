export async function createTransfer(data: any) {
  const response = await fetch("/api/transfers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "create", ...data }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to create transfer")
  }

  return response.json()
}

export async function getTransfers() {
  const response = await fetch("/api/transfers")
  return response.json()
}

export async function getTransfer(id: string) {
  const response = await fetch(`/api/transfers?id=${id}`)
  return response.json()
}

export async function createRecipient(data: any) {
  const response = await fetch("/api/recipients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "create", ...data }),
  })
  return response.json()
}

export async function getRecipients() {
  const response = await fetch("/api/recipients")
  return response.json()
}

export async function updateRecipient(id: string, data: any) {
  const response = await fetch("/api/recipients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "update", id, ...data }),
  })
  return response.json()
}

export async function deleteRecipient(id: string) {
  const response = await fetch("/api/recipients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "delete", id }),
  })
  return response.json()
}

export async function getExchangeRate(from: string, to: string) {
  const response = await fetch(`/api/exchange-rates?from=${from}&to=${to}`)
  return response.json()
}

export async function createPayment(data: any) {
  const response = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "create", ...data }),
  })
  return response.json()
}

export async function confirmPayment(id: string) {
  const response = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "confirm", id }),
  })
  return response.json()
}

export async function getPayment(id: string) {
  const response = await fetch(`/api/payments?id=${id}`)
  return response.json()
}
