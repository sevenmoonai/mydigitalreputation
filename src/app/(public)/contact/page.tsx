import type { Metadata } from "next"
import { ContactForm } from "./contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact — MyDigitalReputation",
  description:
    "Contactez notre equipe pour discuter de vos besoins en e-reputation. Reservez un appel de diagnostic gratuit.",
}

export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Parlons de votre reputation
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Notre equipe vous repond sous 24h.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <Card className="flex flex-col items-center justify-center text-center">
            <CardHeader>
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-muted">
                <Calendar className="size-6 text-muted-foreground" />
              </div>
              <CardTitle>Reservez un appel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calendrier de reservation — a configurer
              </p>
              <p className="mt-2 text-xs text-muted-foreground/60">
                L&apos;integration Cal.com sera disponible prochainement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
