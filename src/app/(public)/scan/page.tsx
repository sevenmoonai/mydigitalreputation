import type { Metadata } from "next"
import { ScanPageClient } from "./scan-page-client"

export const metadata: Metadata = {
  title: "Scan de reputation en ligne — MyDigitalReputation",
  description:
    "Scannez votre nom ou pseudo et decouvrez votre score de reputation en 30 secondes. 400+ plateformes analysees.",
}

export default async function ScanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { q } = await searchParams
  const query = typeof q === "string" ? q : ""

  return <ScanPageClient initialQuery={query} />
}
