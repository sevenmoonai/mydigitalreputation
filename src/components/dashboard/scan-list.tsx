"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";
import Link from "next/link";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  running: { label: "En cours", variant: "default" },
  completed: { label: "Termine", variant: "secondary" },
  failed: { label: "Echoue", variant: "destructive" },
};

function getScoreBadgeClass(score: number): string {
  if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  if (score >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  if (score >= 40) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
}

export function ScanList() {
  const scans = useQuery(api.scans.getUserScans);

  if (scans === undefined) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (scans.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <div className="bg-muted flex size-16 items-center justify-center rounded-full">
          <Search className="text-muted-foreground size-7" />
        </div>
        <div className="text-center">
          <p className="font-medium">Aucun scan</p>
          <p className="text-muted-foreground text-sm">
            Lancez votre premier scan pour analyser votre e-reputation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Recherche</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scans.map((scan: { _id: string; createdAt: number; query: string; score?: number; status: string }) => {
            const date = new Date(scan.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const status = statusConfig[scan.status] ?? { label: scan.status, variant: "outline" as const };

            return (
              <TableRow key={scan._id}>
                <TableCell className="text-muted-foreground text-sm">
                  {date}
                </TableCell>
                <TableCell className="font-medium">{scan.query}</TableCell>
                <TableCell>
                  {scan.score !== undefined ? (
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getScoreBadgeClass(scan.score)}`}>
                      {scan.score}/100
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" render={<Link href={`/scan/${scan._id}`} />}>
                    <ExternalLink className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
