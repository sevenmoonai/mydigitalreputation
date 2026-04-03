"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectTimeline } from "@/components/dashboard/project-timeline";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending_call: { label: "Appel a planifier", variant: "outline" },
  quoted: { label: "Devis envoye", variant: "secondary" },
  in_progress: { label: "En cours", variant: "default" },
  completed: { label: "Termine", variant: "secondary" },
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = useQuery(api.projects.getProject, {
    projectId: id,
  });

  if (project === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="font-medium">Projet introuvable</p>
        <Button variant="outline" render={<Link href="/dashboard/projects" />}>
          Retour aux projets
        </Button>
      </div>
    );
  }

  const config = statusConfig[project.status] ?? { label: project.status, variant: "outline" as const };
  const date = new Date(project.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/dashboard/projects" />}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Projet de nettoyage
            </h1>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Cree le {date}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contenus a supprimer</CardTitle>
          </CardHeader>
          <CardContent>
            {project.contentsToRemove.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Aucun contenu cible
              </p>
            ) : (
              <ul className="space-y-2">
                {project.contentsToRemove.map((content: { url: string; type: string; status: string }, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div className="min-w-0 flex-1">
                      <Badge variant="outline" className="text-[10px]">
                        {content.type}
                      </Badge>
                      <a
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 text-xs"
                      >
                        <span className="truncate">{content.url}</span>
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                    </div>
                    <Badge
                      variant={
                        content.status === "removed"
                          ? "secondary"
                          : "outline"
                      }
                      className="ml-2 shrink-0 text-[10px]"
                    >
                      {content.status === "removed" ? "Supprime" : "En attente"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectTimeline steps={project.steps} />
          </CardContent>
        </Card>
      </div>

      {project.price > 0 && (
        <Card>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm font-medium">Montant du devis</span>
            <span className="text-lg font-bold">{project.price} &euro;</span>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
