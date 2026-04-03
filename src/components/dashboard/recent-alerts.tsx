"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, BellOff } from "lucide-react";
import Link from "next/link";

const severityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  info: "secondary",
  warning: "default",
  critical: "destructive",
};

const severityLabel: Record<string, string> = {
  info: "Info",
  warning: "Avertissement",
  critical: "Critique",
};

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "A l'instant";
  if (minutes < 60) return `Il y a ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}

export function RecentAlerts() {
  const alerts = useQuery(api.alerts.getUserAlerts, { limit: 5 });

  if (alerts === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertes recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertes recentes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 py-6">
          <BellOff className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">Aucune alerte</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alertes recentes</CardTitle>
        <Link
          href="/dashboard/alerts"
          className="text-muted-foreground hover:text-foreground text-xs"
        >
          Tout voir
        </Link>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {alerts.map((alert: { _id: string; severity: string; title: string; source: string; createdAt: number; read: boolean }) => (
            <li
              key={alert._id}
              className="flex items-start gap-3"
            >
              <Badge variant={severityVariant[alert.severity] ?? "outline"} className="mt-0.5 shrink-0 text-[10px]">
                {severityLabel[alert.severity] ?? alert.severity}
              </Badge>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{alert.title}</p>
                <p className="text-muted-foreground text-xs">
                  {alert.source} &middot; {timeAgo(alert.createdAt)}
                </p>
              </div>
              {!alert.read && (
                <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
