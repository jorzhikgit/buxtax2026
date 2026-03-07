import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="container text-center">
        <h1 className="font-display text-5xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page does not exist or may have moved.
        </p>
        <Link href="/" className="mt-8 inline-flex">
          <Button>Return home</Button>
        </Link>
      </div>
    </section>
  );
}
