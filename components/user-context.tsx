"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  avatar?: string
}

interface UserContextType {
  user: UserData
  setUser: (user: UserData) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>({
    firstName: "Redwan",
    lastName: "Mudasir",
    email: "Redwan@gmail.com",
    phone: "+251940930471",
    country: "Ethiopia",
    city: "Addis Ababa",
  })

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
