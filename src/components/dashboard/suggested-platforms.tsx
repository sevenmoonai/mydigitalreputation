"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Globe } from "lucide-react";
import { useState } from "react";

export function SuggestedPlatforms() {
  const suggested = useQuery(api.profiles.getSuggestedProfiles);
  const user = useQuery(api.users.getUser);
  const createProfile = useMutation(api.profiles.createProfile);
  const [creating, setCreating] = useState<string | null>(null);

  if (suggested === undefined || user === undefined) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  if (suggested.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <Globe className="text-muted-foreground size-8" />
        <p className="text-muted-foreground text-sm">
          Toutes les plateformes sont couvertes
        </p>
      </div>
    );
  }

  const hasCredits = user && user.credits > 0;

  async function handleCreate(platform: string, url: string) {
    setCreating(platform);
    try {
      await createProfile({ platform, url });
    } finally {
      setCreating(null);
    }
  }

  return (
    <div className="space-y-4">
      {!hasCredits && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm dark:border-yellow-900 dark:bg-yellow-950">
          <p className="font-medium text-yellow-800 dark:text-yellow-200">
            Credits insuffisants
          </p>
          <p className="text-yellow-700 dark:text-yellow-300">
            Passez au plan Preventif pour creer des profils
          </p>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {suggested.map((platform: { _id: string; name: string; url: string; domainAuthority: number }) => (
          <Card key={platform._id}>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{platform.name}</p>
                  <Badge variant="outline" className="text-[10px]">
                    DA {platform.domainAuthority}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">{platform.url}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={!hasCredits || creating === platform.name}
                onClick={() => handleCreate(platform.name, platform.url)}
              >
                <Plus className="mr-1 size-3" />
                Creer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
