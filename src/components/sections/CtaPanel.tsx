import { Button } from "@/components/ui/Button";

/** The closing call to action used on every inner page: one message, one button. */
export function CtaPanel({
  title = "Ready to start?",
  body = "Tell us about your product and quantity. We reply within 24 hours on working days.",
  href = "/get-a-quote",
  label = "Get a Quote",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="section-y bg-silver-100">
      <div className="container-x flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h2">{title}</h2>
          <p className="mt-4 text-lg text-ink-500">{body}</p>
        </div>
        <Button href={href} size="lg">
          {label}
        </Button>
      </div>
    </section>
  );
}
