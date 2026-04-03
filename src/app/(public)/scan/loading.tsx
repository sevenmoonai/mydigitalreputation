import { Skeleton } from "@/components/ui/skeleton"

export default function ScanLoading() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <Skeleton className="h-9 w-80" />
          <Skeleton className="h-5 w-96" />
          <div className="flex w-full max-w-md gap-2">
            <Skeleton className="h-11 flex-1" />
            <Skeleton className="h-11 w-28" />
          </div>
        </div>
      </div>
    </section>
  )
}
