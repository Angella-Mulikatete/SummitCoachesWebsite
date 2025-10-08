export function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="h-8 w-48 rounded bg-muted" />
            </div>
            <div className="h-10 w-24 rounded bg-muted" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-12 rounded bg-muted" />
            <div className="h-12 rounded bg-muted" />
            <div className="h-12 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
