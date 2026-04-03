import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Problem } from "@/lib/scan-types"

function severityConfig(severity: Problem["severity"]) {
  switch (severity) {
    case "critical":
      return {
        icon: AlertTriangle,
        className: "border-red-500/30 bg-red-50 dark:bg-red-950/20",
        label: "Critique",
      }
    case "high":
      return {
        icon: AlertTriangle,
        className: "border-orange-500/30 bg-orange-50 dark:bg-orange-950/20",
        label: "Important",
      }
    case "medium":
      return {
        icon: AlertCircle,
        className: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/20",
        label: "Moyen",
      }
    default:
      return {
        icon: Info,
        className: "border-blue-500/30 bg-blue-50 dark:bg-blue-950/20",
        label: "Info",
      }
  }
}

export function ProblemsList({ problems }: { problems: Problem[] }) {
  if (problems.length === 0) return null

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">
        Problemes detectes ({problems.length})
      </h3>
      <div className="flex flex-col gap-3">
        {problems.map((problem, i) => {
          const config = severityConfig(problem.severity)
          const Icon = config.icon
          return (
            <Card key={i} className={config.className}>
              <CardHeader className="flex-row items-center gap-3 space-y-0 pb-1">
                <Icon className="size-5 shrink-0" />
                <CardTitle className="text-sm font-medium">
                  {config.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{problem.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
