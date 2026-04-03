"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SettingsPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const convexUser = useQuery(api.users.getUser);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Parametres</h1>
        <p className="text-muted-foreground text-sm">
          Gerez votre compte et vos preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoaded ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Nom</span>
                <span className="text-sm font-medium">
                  {clerkUser?.fullName ?? "Non renseigne"}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Email</span>
                <span className="text-sm font-medium">
                  {clerkUser?.primaryEmailAddress?.emailAddress ?? "Non renseigne"}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plan & Credits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {convexUser === undefined ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Plan actuel</span>
                <Badge variant={convexUser?.plan === "preventive" ? "default" : "secondary"}>
                  {convexUser?.plan === "preventive" ? "Preventif" : "Gratuit"}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Credits restants</span>
                <span className="text-sm font-medium">
                  {convexUser?.credits ?? 0}
                </span>
              </div>
              {convexUser?.plan !== "preventive" && (
                <>
                  <Separator />
                  <div className="flex justify-end">
                    <Button render={<Link href="/pricing" />}>
                      Passer au plan Preventif
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Alertes par email</p>
              <p className="text-muted-foreground text-xs">
                Recevez un email pour chaque nouvelle alerte
              </p>
            </div>
            <Switch disabled />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Rapport hebdomadaire</p>
              <p className="text-muted-foreground text-xs">
                Resume de votre e-reputation chaque semaine
              </p>
            </div>
            <Switch disabled />
          </div>
          <p className="text-muted-foreground text-xs italic">
            Les notifications seront disponibles prochainement
          </p>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Zone de danger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Supprimer mon compte</p>
              <p className="text-muted-foreground text-xs">
                Cette action est irreversible
              </p>
            </div>
            <Button variant="destructive" size="sm" disabled>
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
