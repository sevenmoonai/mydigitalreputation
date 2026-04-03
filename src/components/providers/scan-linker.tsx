"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import type { Id } from "../../../convex/_generated/dataModel"

export function ScanLinker({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const linkScanToUser = useMutation(api.scans.linkScanToUser)
  const linked = useRef(false)

  useEffect(() => {
    const scanId = searchParams.get("linkScan")
    if (!scanId || linked.current) return
    linked.current = true

    linkScanToUser({ scanId: scanId as Id<"scans"> }).catch(() => {
      // Le scan est peut-etre deja lie ou invalide
    })
  }, [searchParams, linkScanToUser])

  return <>{children}</>
}
