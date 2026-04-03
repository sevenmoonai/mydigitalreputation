import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GoogleResult, Sentiment } from "@/lib/scan-types"

function sentimentVariant(
  sentiment: Sentiment
): "default" | "secondary" | "destructive" {
  switch (sentiment) {
    case "positive":
      return "default"
    case "negative":
      return "destructive"
    default:
      return "secondary"
  }
}

function sentimentLabel(sentiment: Sentiment): string {
  switch (sentiment) {
    case "positive":
      return "Positif"
    case "negative":
      return "Negatif"
    default:
      return "Neutre"
  }
}

export function GoogleResults({ results }: { results: GoogleResult[] }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">
        Resultats Google ({results.length})
      </h3>
      <div className="flex flex-col gap-3">
        {results.map((result) => (
          <Card key={result.url}>
            <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-2">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-sm font-medium leading-tight">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {result.title}
                    <ExternalLink className="size-3 shrink-0" />
                  </a>
                </CardTitle>
              </div>
              <Badge variant={sentimentVariant(result.sentiment)} className="shrink-0">
                {sentimentLabel(result.sentiment)}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.snippet}</p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Position {result.position}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
