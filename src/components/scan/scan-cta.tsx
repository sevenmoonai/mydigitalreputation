"use client"

import Link from "next/link"
import { UserPlus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ScanCTAProps {
  authenticated?: boolean
  scanId?: string
}

export function ScanCTA({ authenticated = false, scanId }: ScanCTAProps) {
  const signUpUrl = scanId
    ? `/sign-up?scanId=${scanId}`
    : "/sign-up"

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="text-center">
        <CardTitle>
          {authenticated
            ? "Consultez votre dashboard"
            : "Creez un compte gratuit pour sauvegarder ce rapport"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {authenticated ? (
          <Button size="lg" className="gap-2" render={<Link href="/dashboard" />}>
            Aller au dashboard
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button size="lg" className="gap-2" render={<Link href={signUpUrl} />}>
            <UserPlus className="size-4" />
            Creer un compte gratuit
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
