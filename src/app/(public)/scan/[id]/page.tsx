import type { Metadata } from "next"
import { ScanResultClient } from "./scan-result-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Rapport de scan #${id} — MyDigitalReputation`,
    description: "Consultez le rapport complet de votre scan de reputation en ligne.",
  }
}

export default async function ScanResultPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ScanResultClient scanId={id} />
}
