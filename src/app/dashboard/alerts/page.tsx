"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertItem } from "@/components/dashboard/alert-item";
import { BellOff, CheckCheck } from "lucide-react";

type SeverityFilter = "all" | "info" | "warning" | "critical";

const filters: { label: string; value: SeverityFilter }[] = [
  { label: "Toutes", value: "all" },
  { label: "Info", value: "info" },
  { label: "Avertissement", value: "warning" },
  { label: "Critique", value: "critical" },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState<SeverityFilter>("all");
  const alerts = useQuery(api.alerts.getUserAlerts, {});
  const markAllRead = useMutation(api.alerts.markAllAlertsRead);

  const filteredAlerts =
    alerts && filter !== "all"
      ? alerts.filter((a: Record<string, unknown>) => a.severity === filter)
      : alerts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Centre d&apos;alertes
          </h1>
          <p className="text-muted-foreground text-sm">
            Suivez les changements de votre e-reputation
          </p>
        </div>
        {alerts && alerts.some((a: Record<string, unknown>) => !a.read) && (
          <Button variant="outline" size="sm" onClick={() => markAllRead({})}>
            <CheckCheck className="mr-2 size-4" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {filteredAlerts === undefined ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="bg-muted flex size-16 items-center justify-center rounded-full">
            <BellOff className="text-muted-foreground size-7" />
          </div>
          <div className="text-center">
            <p className="font-medium">Aucune alerte</p>
            <p className="text-muted-foreground text-sm">
              {filter !== "all"
                ? "Aucune alerte avec ce filtre"
                : "Vous n'avez aucune alerte pour le moment"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAlerts.map((alert: { _id: Id<"alerts">; severity: string; title: string; source: string; url?: string; read: boolean; createdAt: number }) => (
            <AlertItem
              key={alert._id}
              id={alert._id}
              severity={alert.severity}
              title={alert.title}
              source={alert.source}
              url={alert.url}
              read={alert.read}
              createdAt={alert.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
