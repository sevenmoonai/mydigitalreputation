"use client";

import { ScanList } from "@/components/dashboard/scan-list";
import { NewScanDialog } from "@/components/dashboard/new-scan-dialog";

export default function ScansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Historique des scans
          </h1>
          <p className="text-muted-foreground text-sm">
            Retrouvez tous vos scans d&apos;e-reputation
          </p>
        </div>
        <NewScanDialog />
      </div>

      <ScanList />
    </div>
  );
}
