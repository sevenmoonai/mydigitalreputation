"use client"

import { useStoreUser } from "@/hooks/use-store-user"

export function UserSync({ children }: { children: React.ReactNode }) {
  useStoreUser()
  return <>{children}</>
}
