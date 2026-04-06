"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
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

export function AlertBell() {
  const unreadCount = useQuery(api.alerts.getUnreadCount);
  const alerts = useQuery(api.alerts.getUserAlerts, { limit: 5 });
  const markRead = useMutation(api.alerts.markAlertRead);

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon" className="relative h-8 w-8" />}
      >
        <Bell className="size-4" />
        {unreadCount !== undefined && unreadCount > 0 && (
          <span className="bg-destructive text-destructive-foreground absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Alertes</p>
          <Link
            href="/dashboard/alerts"
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Tout voir
          </Link>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {alerts === undefined ? (
            <div className="px-4 py-6 text-center">
              <p className="text-muted-foreground text-xs">Chargement...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-muted-foreground text-xs">Aucune alerte</p>
            </div>
          ) : (
            <ul>
              {alerts.map((alert: { _id: string; severity: string; title: string; source: string; createdAt: number; read: boolean }) => (
                <li
                  key={alert._id}
                  className={`flex items-start gap-2 border-b px-4 py-3 last:border-0 ${
                    !alert.read
                      ? "bg-muted/50 cursor-pointer"
                      : ""
                  }`}
                  onClick={() => {
                    if (!alert.read) markRead({ alertId: alert._id as Id<"alerts"> });
                  }}
                >
                  <Badge
                    variant={severityVariant[alert.severity] ?? "outline"}
                    className="mt-0.5 shrink-0 text-[10px]"
                  >
                    {severityLabel[alert.severity] ?? alert.severity}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">
                      {alert.title}
                    </p>
                    <p className="text-muted-foreground text-[10px]">
                      {alert.source} &middot; {timeAgo(alert.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
