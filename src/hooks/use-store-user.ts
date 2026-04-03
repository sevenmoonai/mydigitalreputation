"use client"

import { useEffect, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

export function useStoreUser() {
  const { user, isLoaded } = useUser()
  const createOrGetUser = useMutation(api.users.createOrGetUser)
  const stored = useRef(false)

  useEffect(() => {
    if (!isLoaded || !user || stored.current) return
    stored.current = true
    createOrGetUser({})
  }, [isLoaded, user, createOrGetUser])
}
