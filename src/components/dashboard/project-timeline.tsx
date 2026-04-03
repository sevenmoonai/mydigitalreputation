"use client";

import { Check, Clock, Circle } from "lucide-react";

interface Step {
  title: string;
  status: string;
  completedAt?: number;
}

interface ProjectTimelineProps {
  steps: Step[];
}

function getStepIcon(status: string) {
  switch (status) {
    case "completed":
      return <Check className="size-4 text-green-600" />;
    case "in_progress":
      return <Clock className="text-primary size-4" />;
    default:
      return <Circle className="text-muted-foreground size-4" />;
  }
}

export function ProjectTimeline({ steps }: ProjectTimelineProps) {
  if (steps.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Les etapes apparaitront une fois le projet lance
      </p>
    );
  }

  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="flex size-8 items-center justify-center rounded-full border">
              {getStepIcon(step.status)}
            </div>
            {index < steps.length - 1 && (
              <div className="bg-border w-px flex-1" />
            )}
          </div>
          <div className="pb-6">
            <p className="text-sm font-medium">{step.title}</p>
            {step.completedAt && (
              <p className="text-muted-foreground text-xs">
                {new Date(step.completedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
