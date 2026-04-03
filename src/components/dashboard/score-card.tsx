"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreGauge } from "@/components/scan/score-gauge";
import { RefreshCw, Radar } from "lucide-react";
import Link from "next/link";

export function ScoreCard() {
  const scans = useQuery(api.scans.getUserScans);

  if (scans === undefined) {
    return (
      <Card className="col-span-1 row-span-2">
        <CardHeader>
          <CardTitle>Score e-reputation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Skeleton className="size-48 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    );
  }

  const latestScan = scans.find((s: Record<string, unknown>) => s.status === "completed" && s.score !== undefined);

  if (!latestScan) {
    return (
      <Card className="col-span-1 row-span-2">
        <CardHeader>
          <CardTitle>Score e-reputation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="bg-muted flex size-24 items-center justify-center rounded-full">
            <Radar className="text-muted-foreground size-10" />
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Aucun scan effectue
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Lancez votre premier scan pour obtenir votre score
            </p>
          </div>
          <Button render={<Link href="/dashboard/scans" />}>
            Lancer un scan
          </Button>
        </CardContent>
      </Card>
    );
  }

  const scanDate = new Date(latestScan.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="col-span-1 row-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Score e-reputation</CardTitle>
        <Button variant="ghost" size="icon" render={<Link href="/dashboard/scans" />}>
          <RefreshCw className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ScoreGauge score={latestScan.score!} />
        <p className="text-muted-foreground text-xs">
          Dernier scan : {scanDate}
        </p>
        <Button variant="outline" size="sm" render={<Link href="/dashboard/scans" />}>
          Relancer un scan
        </Button>
      </CardContent>
    </Card>
  );
}
