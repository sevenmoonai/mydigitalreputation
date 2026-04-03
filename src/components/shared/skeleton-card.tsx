import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  lines?: number
  showHeader?: boolean
  className?: string
}

export function SkeletonCard({
  lines = 3,
  showHeader = true,
  className,
}: SkeletonCardProps) {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-4"
            style={{ width: `${80 - i * 15}%` }}
          />
        ))}
      </CardContent>
    </Card>
  )
}
