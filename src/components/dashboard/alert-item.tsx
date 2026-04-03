"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

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

interface AlertItemProps {
  id: string;
  severity: string;
  title: string;
  source: string;
  url?: string;
  read: boolean;
  createdAt: number;
}

export function AlertItem({ id, severity, title, source, url, read, createdAt }: AlertItemProps) {
  const markRead = useMutation(api.alerts.markAlertRead);

  function handleClick() {
    if (!read) {
      markRead({ alertId: id });
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
        !read
          ? "border-l-primary cursor-pointer border-l-2 bg-transparent"
          : "cursor-default"
      }`}
    >
      <Badge
        variant={severityVariant[severity] ?? "outline"}
        className="mt-0.5 shrink-0 text-[10px]"
      >
        {severityLabel[severity] ?? severity}
      </Badge>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-muted-foreground text-xs">
          {source} &middot; {timeAgo(createdAt)}
        </p>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="size-4" />
        </a>
      )}
    </div>
  );
}
