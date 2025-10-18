import Assets from "@/assets";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <img
            src={Assets.logo}
            alt="logo"
            className="mb-4 h-20 w-20 rounded"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, page not found!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for. Please check the
          URL in the address bar and try again.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
