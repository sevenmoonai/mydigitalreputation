"use client"

import { motion } from "motion/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { InView } from "@/components/effects/in-view"

const faqs = [
  {
    question: "Qu'est-ce que l'e-reputation ?",
    answer:
      "L'e-reputation designe l'image que renvoie une personne ou une entreprise sur Internet. Elle se construit a partir des resultats de recherche Google, des profils sur les reseaux sociaux, des avis en ligne et de toute mention publique.",
  },
  {
    question: "Pourquoi est-ce important de surveiller sa reputation en ligne ?",
    answer:
      "85% des recruteurs et partenaires consultent Google avant une prise de decision. Un contenu negatif en premiere page peut impacter votre carriere, vos relations professionnelles ou votre activite commerciale.",
  },
  {
    question: "Comment fonctionne le scan ?",
    answer:
      "Notre moteur analyse plus de 437 plateformes (reseaux sociaux, annuaires, forums) et les resultats Google associes a votre nom. Vous obtenez un score de reputation, la liste de vos profils et les eventuels contenus problematiques — le tout en moins de 30 secondes.",
  },
  {
    question: "Le scan est-il vraiment gratuit ?",
    answer:
      "Oui, le scan est 100% gratuit et ne necessite aucune inscription. Vous pouvez creer un compte gratuit pour sauvegarder vos resultats et suivre l'evolution de votre score.",
  },
  {
    question: "Comment ameliorer mon score de reputation ?",
    answer:
      "Plusieurs leviers existent : creer des profils positifs sur des plateformes a forte autorite, optimiser vos profils existants, publier du contenu de qualite et, si necessaire, demander la suppression de contenus negatifs.",
  },
  {
    question: "En quoi consiste le service defensif ?",
    answer:
      "Le service defensif est un accompagnement sur-mesure pour les cas urgents : suppression de contenus diffamatoires, desindexation de pages genantes, creation de profils strategiques et suivi personnalise. Un diagnostic est realise lors d'un appel gratuit.",
  },
]

export function FAQ() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <InView>
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-500">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Questions frequentes
            </h2>
            <p className="mt-4 text-zinc-500">
              Tout ce que vous devez savoir sur l&apos;e-reputation.
            </p>
          </div>
        </InView>

        <InView transition={{ duration: 0.5, delay: 0.2 }}>
          <Accordion className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-zinc-800/50"
              >
                <AccordionTrigger className="text-left text-zinc-200 hover:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </InView>
      </div>
    </section>
  )
}
