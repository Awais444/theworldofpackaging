import Link from "next/link";
import { packages } from "@/content/packages";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

function priceLabel(price: number | null) {
  return price === null ? "Quoted per project" : `From $${price.toLocaleString("en-US")}`;
}

export function PackagesTeaser() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeader
        spec={["Packages", "Design + manufacturing"]}
        title="Bundles for the usual starting points."
        intro="Fixed scopes for common projects. Everything else is quoted from your brief."
      />
      <div className="mt-16 grid border-y border-line md:grid-cols-3">
        {packages.map((p, i) => (
          <article
            key={p.slug}
            className={cn(
              "flex flex-col py-10 md:px-8",
              i > 0 && "border-t border-line md:border-t-0 md:border-l",
              i === 0 && "md:pl-0",
              p.featured && "tone-kraft px-6 md:px-8",
            )}
          >
            <p className="spec text-muted">{p.featured ? "Most chosen" : "Package"}</p>
            <h3 className="type-display mt-3 text-display-md">{p.name}</h3>
            <p className="mt-3">{p.forWho}</p>
            <ul className="mt-6 space-y-1.5 text-sm">
              {p.includes.map((item) => (
                <li key={item} className="flex gap-3 before:mt-[0.7em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <p className="font-mono text-sm">{priceLabel(p.priceFrom)}</p>
              <Link href={`/packages#${p.slug}`} className="spec mt-3 inline-block underline underline-offset-4 hover:text-accent">
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Button href="/packages" variant="link" arrow className="mt-8">
        Compare packages
      </Button>
    </section>
  );
}
