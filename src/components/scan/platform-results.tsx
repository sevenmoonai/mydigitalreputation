import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PlatformResult } from "@/lib/scan-types"

export function PlatformResults({
  results,
}: {
  results: PlatformResult[]
}) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">
        Profils detectes ({results.filter((r) => r.found).length}/{results.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {results.map((result) => (
          <Badge
            key={result.platform}
            variant={result.found ? "default" : "secondary"}
            className="gap-1.5"
          >
            {result.found ? (
              <Check className="size-3" />
            ) : (
              <X className="size-3" />
            )}
            {result.platform}
          </Badge>
        ))}
      </div>
    </div>
  )
}
