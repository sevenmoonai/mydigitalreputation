import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialite",
  description:
    "Politique de confidentialite et protection des donnees personnelles de MyDigitalReputation.",
}

export default function ConfidentialitePage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Politique de confidentialite
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          [A FAIRE VALIDER PAR UN JURISTE]
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Derniere mise a jour : avril 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Donnees collectees
            </h2>
            <p>Nous collectons les donnees suivantes :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground">Donnees d&apos;identification</strong> :
                nom, prenom, adresse email (via Clerk)
              </li>
              <li>
                <strong className="text-foreground">Donnees de scan</strong> :
                noms/pseudonymes recherches, resultats d&apos;analyse de reputation
              </li>
              <li>
                <strong className="text-foreground">Donnees de navigation</strong> :
                pages visitees, duree de session (via cookies analytiques)
              </li>
              <li>
                <strong className="text-foreground">Donnees de paiement</strong> :
                gerees par Stripe, nous ne stockons pas vos coordonnees bancaires
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Finalites du traitement
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Fourniture du service de scan et surveillance de reputation</li>
              <li>Gestion de votre compte utilisateur</li>
              <li>Envoi d&apos;alertes relatives a votre e-reputation</li>
              <li>Amelioration de nos services et statistiques d&apos;usage</li>
              <li>Communication commerciale (avec votre consentement)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Duree de conservation
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Donnees de compte : duree de vie du compte + 3 ans</li>
              <li>Resultats de scan : 24 mois apres creation</li>
              <li>Donnees de navigation : 13 mois</li>
              <li>Donnees de facturation : 10 ans (obligation legale)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Sous-traitants
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground">Clerk</strong> :
                authentification (donnees hebergees aux Etats-Unis, conforme aux
                clauses contractuelles types)
              </li>
              <li>
                <strong className="text-foreground">Convex</strong> : base de
                donnees (hebergement cloud)
              </li>
              <li>
                <strong className="text-foreground">Stripe</strong> : paiements
                (certifie PCI DSS)
              </li>
              <li>
                <strong className="text-foreground">Vercel</strong> : hebergement
                du site
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Vos droits
            </h2>
            <p>
              Conformement au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Droit d&apos;acces a vos donnees personnelles</li>
              <li>Droit de rectification</li>
              <li>Droit a l&apos;effacement (&laquo; droit a l&apos;oubli &raquo;)</li>
              <li>Droit a la limitation du traitement</li>
              <li>Droit a la portabilite de vos donnees</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p className="mt-2">
              Pour exercer vos droits, contactez-nous a :{" "}
              <strong className="text-foreground">
                privacy@mydigitalreputation.fr
              </strong>
            </p>
            <p className="mt-2">
              Vous pouvez egalement adresser une reclamation a la CNIL :
              www.cnil.fr
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Cookies
            </h2>
            <p>
              Ce site utilise des cookies essentiels au fonctionnement du service
              (authentification, preferences). Les cookies analytiques ne sont
              deposes qu&apos;avec votre consentement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
