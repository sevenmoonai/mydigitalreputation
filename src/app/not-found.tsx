import Link from "next/link";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Shield className="mb-6 size-16 text-zinc-600" />
      <h1 className="mb-2 text-4xl font-bold tracking-tight">404</h1>
      <p className="mb-8 text-zinc-400">
        Cette page n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-zinc-700 px-6 py-2 text-sm transition-colors hover:bg-zinc-900"
      >
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
