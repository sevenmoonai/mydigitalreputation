"use client"

import { AlertTriangle, AlertCircle, Info, ShieldAlert } from "lucide-react"
import { ShineBorder } from "@/components/effects/shine-border"
import type { Problem } from "@/lib/scan-types"

function severityConfig(severity: Problem["severity"]) {
  switch (severity) {
    case "critical":
      return {
        icon: ShieldAlert,
        colors: ["#ff0000", "#ff4400", "#ff0000"],
        label: "Critique",
        textColor: "text-red-400",
        bgColor: "bg-red-500/5",
        action: "Action immediate requise",
      }
    case "high":
      return {
        icon: AlertTriangle,
        colors: ["#ff6600", "#ff9900", "#ff6600"],
        label: "Important",
        textColor: "text-orange-400",
        bgColor: "bg-orange-500/5",
        action: "Intervention recommandee",
      }
    case "medium":
      return {
        icon: AlertCircle,
        colors: ["#ffc800", "#ffdd00", "#ffc800"],
        label: "Moyen",
        textColor: "text-yellow-400",
        bgColor: "bg-yellow-500/5",
        action: "A surveiller",
      }
    default:
      return {
        icon: Info,
        colors: ["#0099ff", "#00ccff", "#0099ff"],
        label: "Info",
        textColor: "text-blue-400",
        bgColor: "bg-blue-500/5",
        action: "Opportunite d'amelioration",
      }
  }
}

export function ProblemsList({ problems }: { problems: Problem[] }) {
  if (problems.length === 0) return null

  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3">
        <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-red-500/70">
          Menaces detectees
        </h3>
        <span className="ml-auto font-mono text-xs text-zinc-600">
          {problems.length} signaux
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {problems.map((problem, i) => {
          const config = severityConfig(problem.severity)
          const Icon = config.icon

          return (
            <ShineBorder
              key={i}
              color={config.colors}
              borderRadius={12}
              duration={10}
            >
              <div className={`p-5 ${config.bgColor}`}>
                <div className="mb-2 flex items-center gap-3">
                  <Icon className={`size-5 shrink-0 ${config.textColor}`} />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${config.textColor}`}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {problem.description}
                </p>
                <p className="mt-2 font-mono text-[10px] text-zinc-600">
                  Recommandation : {config.action}
                </p>
              </div>
            </ShineBorder>
          )
        })}
      </div>
    </div>
  )
}
