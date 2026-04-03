import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      "Notre moteur analyse plus de 400 plateformes (reseaux sociaux, annuaires, forums) et les resultats Google associes a votre nom. Vous obtenez un score de reputation, la liste de vos profils et les eventuels contenus problematiques — le tout en moins de 30 secondes.",
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
    <section className="border-t py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Questions frequentes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tout ce que vous devez savoir sur l&apos;e-reputation.
          </p>
        </div>
        <Accordion className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
