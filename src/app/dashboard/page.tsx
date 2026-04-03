"use client";

import { ScoreCard } from "@/components/dashboard/score-card";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Vue d&apos;ensemble de votre e-reputation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ScoreCard />
        <RecentAlerts />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Actions rapides</h2>
        <QuickActions />
      </div>
    </div>
  );
}
