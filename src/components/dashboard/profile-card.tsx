"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  created: { label: "Cree", variant: "outline" },
  active: { label: "Actif", variant: "default" },
  optimized: { label: "Optimise", variant: "secondary" },
};

interface ProfileCardProps {
  platform: string;
  url: string;
  status: string;
}

export function ProfileCard({ platform, url, status }: ProfileCardProps) {
  const config = statusConfig[status] ?? { label: status, variant: "outline" as const };

  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{platform}</p>
            <Badge variant={config.variant} className="text-[10px]">
              {config.label}
            </Badge>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 text-xs"
          >
            <span className="truncate">{url}</span>
            <ExternalLink className="size-3 shrink-0" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
