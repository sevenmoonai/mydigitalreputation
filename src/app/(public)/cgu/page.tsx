import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions generales d'utilisation",
  description:
    "Conditions generales d'utilisation de la plateforme MyDigitalReputation.",
}

export default function CGUPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Conditions generales d&apos;utilisation
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
              Article 1 — Objet
            </h2>
            <p>
              Les presentes Conditions Generales d&apos;Utilisation (CGU) regissent
              l&apos;acces et l&apos;utilisation de la plateforme MyDigitalReputation,
              accessible a l&apos;adresse mydigitalreputation.fr. En utilisant le
              service, vous acceptez sans reserve les presentes CGU.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 2 — Description du service
            </h2>
            <p>MyDigitalReputation propose :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Un scan gratuit de reputation en ligne (analyse de 400+
                plateformes)
              </li>
              <li>Un tableau de bord de suivi de votre e-reputation</li>
              <li>Des alertes en temps reel sur les changements detectes</li>
              <li>
                Un service de nettoyage de contenus negatifs (sur devis)
              </li>
              <li>La creation et l&apos;optimisation de profils positifs</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 3 — Inscription et compte
            </h2>
            <p>
              L&apos;acces au scan gratuit ne necessite pas de creation de compte.
              Pour acceder au tableau de bord et aux fonctionnalites avancees,
              la creation d&apos;un compte est requise. L&apos;utilisateur s&apos;engage a
              fournir des informations exactes et a maintenir la confidentialite
              de ses identifiants de connexion.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 4 — Offres et tarification
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-foreground">Plan Gratuit</strong> :
                1 scan, acces limite au dashboard
              </li>
              <li>
                <strong className="text-foreground">Plan Preventif</strong> :
                scans illimites, alertes, creation de profils (abonnement
                mensuel)
              </li>
              <li>
                <strong className="text-foreground">Nettoyage</strong> : service
                ponctuel sur devis, apres consultation
              </li>
            </ul>
            <p className="mt-2">
              Les prix sont indiques en euros TTC. MyDigitalReputation se
              reserve le droit de modifier ses tarifs a tout moment. Les
              modifications ne s&apos;appliquent pas aux services en cours.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 5 — Obligations de l&apos;utilisateur
            </h2>
            <p>L&apos;utilisateur s&apos;engage a :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                N&apos;utiliser le service que pour scanner sa propre identite ou
                celle pour laquelle il dispose d&apos;une autorisation
              </li>
              <li>
                Ne pas utiliser le service a des fins de harcelement,
                diffamation ou toute activite illegale
              </li>
              <li>
                Ne pas tenter de contourner les limitations techniques du
                service
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 6 — Limitation de responsabilite
            </h2>
            <p>
              MyDigitalReputation fournit un service d&apos;analyse et de
              recommandation. Les resultats de scan sont indicatifs et ne
              constituent pas un avis juridique. MyDigitalReputation ne
              garantit pas la suppression effective de tous les contenus
              negatifs, celle-ci dependant de tiers (plateformes, moteurs de
              recherche).
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 7 — Resiliation
            </h2>
            <p>
              L&apos;utilisateur peut supprimer son compte a tout moment depuis les
              parametres du dashboard. MyDigitalReputation se reserve le droit
              de suspendre ou supprimer un compte en cas de violation des
              presentes CGU.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Article 8 — Droit applicable
            </h2>
            <p>
              Les presentes CGU sont soumises au droit francais. Tout litige
              relatif a leur interpretation ou execution sera soumis aux
              tribunaux competents de [ville a preciser].
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
