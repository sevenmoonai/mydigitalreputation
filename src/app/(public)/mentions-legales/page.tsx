import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions legales",
  description: "Mentions legales de MyDigitalReputation.",
}

export default function MentionsLegalesPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Mentions legales</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          [A FAIRE VALIDER PAR UN JURISTE]
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Editeur du site
            </h2>
            <p>
              MyDigitalReputation<br />
              [Forme juridique, capital social]<br />
              [Adresse du siege social]<br />
              [Numero SIRET / SIREN]<br />
              [Numero de TVA intracommunautaire]
            </p>
            <p className="mt-2">
              Directeur de la publication : [Nom du responsable]<br />
              Contact : contact@mydigitalreputation.fr
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Hebergement
            </h2>
            <p>
              Le site est heberge par :<br />
              [Nom de l&apos;hebergeur]<br />
              [Adresse de l&apos;hebergeur]<br />
              [Telephone de l&apos;hebergeur]
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Propriete intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes,
              icones, logiciels) est la propriete exclusive de MyDigitalReputation
              ou de ses partenaires. Toute reproduction, representation,
              modification, publication ou adaptation de tout ou partie des
              elements du site est interdite sans autorisation prealable ecrite.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Limitation de responsabilite
            </h2>
            <p>
              MyDigitalReputation s&apos;efforce de fournir des informations aussi
              precises que possible. Toutefois, il ne pourra etre tenu responsable
              des omissions, inexactitudes ou carences dans la mise a jour, qu&apos;elles
              soient de son fait ou du fait de tiers partenaires qui lui fournissent
              ces informations.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Droit applicable
            </h2>
            <p>
              Les presentes mentions legales sont soumises au droit francais. En
              cas de litige, les tribunaux francais seront seuls competents.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
