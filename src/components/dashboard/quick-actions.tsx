"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserCircle, Eraser } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Nouveau scan",
    description: "Analysez votre presence en ligne",
    href: "/dashboard/scans",
    icon: Search,
  },
  {
    title: "Creer un profil",
    description: "Renforcez votre identite numerique",
    href: "/dashboard/profiles",
    icon: UserCircle,
  },
  {
    title: "Nettoyage",
    description: "Supprimez les contenus negatifs",
    href: "/dashboard/projects",
    icon: Eraser,
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <div className="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
                <action.icon className="text-primary size-4" />
              </div>
              <CardTitle className="text-sm">{action.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                {action.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
