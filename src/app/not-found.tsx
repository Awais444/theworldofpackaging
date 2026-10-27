import type { Metadata } from "next";
import { quoteHref } from "@/content/navigation";
import { MagneticBoxOpen } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
      <div>
        <p className="text-eyebrow text-blue-600">Error 404</p>
        <h1 className="text-h1 mt-4">
          This box is <Highlight>empty</Highlight>.
        </h1>
        <p className="text-lead mt-5 max-w-xl text-ink-500">The page you asked for does not exist or has moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg" arrow>
            Back to home
          </Button>
          <Button href="/boxes" size="lg" variant="secondary">
            Explore Boxes
          </Button>
          <Button href={quoteHref} size="lg" variant="ghost" arrow>
            Get a Quote
          </Button>
        </div>
      </div>
      <div className="aspect-[4/3] rounded-3xl bg-blue-50 p-[6%]" aria-hidden="true">
        <MagneticBoxOpen />
      </div>
    </section>
  );
}
