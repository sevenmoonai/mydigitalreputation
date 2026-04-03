"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { SuggestedPlatforms } from "@/components/dashboard/suggested-platforms";
import { UserCircle } from "lucide-react";

export default function ProfilesPage() {
  const profiles = useQuery(api.profiles.getUserProfiles);
  const user = useQuery(api.users.getUser);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profils</h1>
          <p className="text-muted-foreground text-sm">
            Gerez vos profils et decouvrez de nouvelles plateformes
          </p>
        </div>
        {user !== undefined && (
          <Badge variant="outline" className="text-sm">
            {user?.credits ?? 0} credit{(user?.credits ?? 0) !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="profiles">
        <TabsList>
          <TabsTrigger value="profiles">Mes profils</TabsTrigger>
          <TabsTrigger value="suggested">Plateformes suggerees</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="mt-4">
          {profiles === undefined ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : profiles.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="bg-muted flex size-16 items-center justify-center rounded-full">
                <UserCircle className="text-muted-foreground size-7" />
              </div>
              <div className="text-center">
                <p className="font-medium">Aucun profil</p>
                <p className="text-muted-foreground text-sm">
                  Creez vos premiers profils pour renforcer votre presence en
                  ligne
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {profiles.map((profile: { _id: string; platform: string; url: string; status: string }) => (
                <ProfileCard
                  key={profile._id}
                  platform={profile.platform}
                  url={profile.url}
                  status={profile.status}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggested" className="mt-4">
          <SuggestedPlatforms />
        </TabsContent>
      </Tabs>
    </div>
  );
}
