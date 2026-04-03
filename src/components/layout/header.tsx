"use client";

import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AlertBell } from "@/components/layout/alert-bell";

export function AppHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b backdrop-blur">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Input
          type="search"
          placeholder="Rechercher..."
          className="h-8 max-w-64"
        />
        <div className="ml-auto flex items-center gap-2">
          <AlertBell />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
