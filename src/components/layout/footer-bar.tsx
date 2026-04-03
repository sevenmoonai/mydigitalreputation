"use client";

export function FooterBar() {
  return (
    <footer className="bg-background border-t px-4 py-2">
      <div className="flex items-center justify-between text-xs">
        <div className="text-muted-foreground flex items-center gap-2">
          <span>Crédits restants :</span>
          <span className="font-medium">0</span>
        </div>
        <div className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          Plan Gratuit
        </div>
      </div>
    </footer>
  );
}
