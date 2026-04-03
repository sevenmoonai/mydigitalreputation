"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"
import type { Problem } from "@/lib/scan-types"

interface CreateProjectDialogProps {
  problems: Problem[]
  trigger?: React.ReactNode
}

export function CreateProjectDialog({
  problems,
  trigger,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(problems.map((_, i) => i))
  )
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const createProject = useMutation(api.projects.createProject)

  function toggleProblem(index: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  async function handleSubmit() {
    if (loading || selected.size === 0) return

    setLoading(true)
    try {
      const contentsToRemove = problems
        .filter((_, i) => selected.has(i))
        .map((p) => ({
          url: p.description,
          type: p.type,
          status: "pending",
        }))

      await createProject({ contentsToRemove })
      setOpen(false)
      router.push("/contact")
    } finally {
      setLoading(false)
    }
  }

  if (problems.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            <>{trigger}</>
          ) : (
            <Button variant="outline" className="gap-2" />
          )
        }
      >
        {!trigger && (
          <>
            <Trash2 className="size-4" />
            Demander un nettoyage
          </>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demander un nettoyage</DialogTitle>
          <DialogDescription>
            Selectionnez les problemes que vous souhaitez traiter. Notre equipe
            vous contactera pour etablir un devis.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-64 space-y-2 overflow-y-auto py-2">
          {problems.map((problem, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <input
                type="checkbox"
                checked={selected.has(i)}
                onChange={() => toggleProblem(i)}
                className="mt-0.5 size-4 shrink-0 rounded border-input"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{problem.type}</p>
                <p className="text-xs text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selected.size === 0 || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Envoi...
              </>
            ) : (
              `Demander un nettoyage (${selected.size})`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
