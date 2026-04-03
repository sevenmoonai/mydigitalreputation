import Link from "next/link"
import { Shield } from "lucide-react"

const productLinks = [
  { href: "/scan", label: "Scan gratuit" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
]

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions legales" },
  { href: "/confidentialite", label: "Confidentialite" },
  { href: "/cgu", label: "CGU" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="size-5" />
            <span>MyDigitalReputation</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Reprenez le controle de votre reputation en ligne.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Produit</h3>
          <ul className="flex flex-col gap-2">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Legal</h3>
          <ul className="flex flex-col gap-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Suivez-nous</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <span className="text-sm text-muted-foreground">
                LinkedIn (bientot)
              </span>
            </li>
            <li>
              <span className="text-sm text-muted-foreground">
                Twitter (bientot)
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 sm:px-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MyDigitalReputation. Tous droits
            reserves.
          </p>
        </div>
      </div>
    </footer>
  )
}
