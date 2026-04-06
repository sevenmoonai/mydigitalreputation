"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function FooterBar() {
  const user = useQuery(api.users.getUser);

  const credits = user?.credits ?? 0;
  const plan = user?.plan ?? "free";
  const planLabel = plan === "preventive" ? "Plan Préventif" : "Plan Gratuit";

  return (
    <footer className="bg-background border-t px-4 py-2">
      <div className="flex items-center justify-between text-xs">
        <div className="text-muted-foreground flex items-center gap-2">
          <span>Crédits restants :</span>
          <span className="font-medium">{credits}</span>
        </div>
        <div className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          {planLabel}
        </div>
      </div>
    </footer>
  );
}
