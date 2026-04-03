"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending_call: { label: "Appel a planifier", variant: "outline" },
  quoted: { label: "Devis envoye", variant: "secondary" },
  in_progress: { label: "En cours", variant: "default" },
  completed: { label: "Termine", variant: "secondary" },
};

interface ProjectCardProps {
  id: string;
  status: string;
  contentsToRemove: { url: string; type: string; status: string }[];
  createdAt: number;
}

export function ProjectCard({ id, status, contentsToRemove, createdAt }: ProjectCardProps) {
  const config = statusConfig[status] ?? { label: status, variant: "outline" as const };
  const date = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/dashboard/projects/${id}`}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">
                Projet de nettoyage
              </p>
              <Badge variant={config.variant} className="text-[10px]">
                {config.label}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {contentsToRemove.length} contenu{contentsToRemove.length !== 1 ? "s" : ""} a supprimer &middot; {date}
            </p>
          </div>
          <ChevronRight className="text-muted-foreground size-5" />
        </CardContent>
      </Card>
    </Link>
  );
}
