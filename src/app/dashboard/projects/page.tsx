"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/dashboard/project-card";
import { FolderKanban } from "lucide-react";
import Link from "next/link";
import type { Id } from "../../../../convex/_generated/dataModel";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getUserProjects);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projets</h1>
          <p className="text-muted-foreground text-sm">
            Suivez vos projets de nettoyage de contenus
          </p>
        </div>
        <Button render={<Link href="/contact" />}>
          Nouveau projet
        </Button>
      </div>

      {projects === undefined ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="bg-muted flex size-16 items-center justify-center rounded-full">
            <FolderKanban className="text-muted-foreground size-7" />
          </div>
          <div className="text-center">
            <p className="font-medium">Aucun projet</p>
            <p className="text-muted-foreground text-sm">
              Contactez-nous pour lancer un projet de nettoyage
            </p>
          </div>
          <Button variant="outline" render={<Link href="/contact" />}>
            Nous contacter
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project: { _id: Id<"projects">; status: string; contentsToRemove: { url: string; type: string; status: string }[]; createdAt: number }) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              status={project.status}
              contentsToRemove={project.contentsToRemove}
              createdAt={project.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
