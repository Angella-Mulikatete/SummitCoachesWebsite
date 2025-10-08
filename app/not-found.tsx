import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-light/30 to-white p-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-secondary">Page Not Found</h2>
        <p className="mb-8 text-secondary-light">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline" size="lg">
              <Search className="mr-2 h-5 w-5" />
              Search Trips
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
