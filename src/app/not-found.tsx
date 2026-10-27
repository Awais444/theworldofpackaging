import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { RegMark } from "@/components/ui/RegMark";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-x py-24 md:py-36">
      <SpecLabel items={["Error 404", "Off register"]} as="p" />
      <div className="mt-6 flex items-start gap-6">
        <h1 className="type-display text-display-xl">This sheet is misprinted.</h1>
        <RegMark className="mt-2 hidden h-14 w-14 shrink-0 translate-x-1 text-magenta md:block" />
      </div>
      <p className="measure mt-6 text-lg text-muted">
        The page you asked for does not exist, or has not been built yet. Head back to the start or tell us what you
        are working on.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" arrow>
          Back to home
        </Button>
        <Button href="/start-a-project" variant="secondary">
          Start a Project
        </Button>
      </div>
    </section>
  );
}
