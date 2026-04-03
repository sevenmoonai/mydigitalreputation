"use client"

import { Search, BarChart3, Shield } from "lucide-react"
import { motion } from "motion/react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    icon: Search,
    title: "Scannez votre nom",
    description:
      "Entrez votre nom ou pseudo. Notre moteur analyse plus de 400 plateformes et les resultats Google en quelques secondes.",
  },
  {
    icon: BarChart3,
    title: "Analysez les resultats",
    description:
      "Obtenez un score de reputation, la liste de vos profils en ligne et les eventuels contenus problematiques.",
  },
  {
    icon: Shield,
    title: "Agissez pour ameliorer",
    description:
      "Suivez nos recommandations pour renforcer votre presence positive et supprimer les contenus genants.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Comment ca marche
          </h2>
          <p className="mt-3 text-muted-foreground">
            Trois etapes simples pour reprendre le controle.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
