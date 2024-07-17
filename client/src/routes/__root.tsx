import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Grid3x3 } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="flex h-[3.5rem] items-center pb-2 bg-primary/50 wave">
        <div className="container2 flex w-full items-center gap-2">
          <Link to="/" className="flex items-center">
            <Grid3x3 className="mr-3 h-6 w-6 text-primary-foreground" />
            <h1 className="text-2xl font-semibold">Sudoku</h1>
          </Link>
        </div>
      </nav>
      <main className="container2 py-2">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
