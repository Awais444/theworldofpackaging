"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const KEY = "consent";
export const OPEN_CONSENT_EVENT = "open-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

type Choice = "granted" | "denied";

function read(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie banner + GA4. Analytics loads only after the visitor accepts, and only when
 * NEXT_PUBLIC_GA4_ID is set. Without an id the banner is shown in development only,
 * so the design can be reviewed; production visitors are not asked about nothing.
 */
export function ConsentAndAnalytics() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const relevant = Boolean(GA_ID) || process.env.NODE_ENV === "development";

  useEffect(() => {
    const stored = read();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(stored);
    setOpen(relevant && stored === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, [relevant]);

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      // Storage blocked: the choice applies to this page view only.
    }
    setChoice(c);
    setOpen(false);
  };

  return (
    <>
      {GA_ID && choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Cookie preferences"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-[70] max-w-md rounded-2xl border border-silver-300 bg-white p-5 shadow-[0_12px_32px_rgb(17_17_17/0.12)] md:left-auto md:right-6 md:bottom-6"
          >
            <p className="font-bold">Cookies</p>
            <p className="mt-2 text-sm text-ink-500">
              We use essential storage for your cart. With your permission we also use analytics to see which pages help
              people. See our <Link href="/privacy" className="text-blue-600 underline">privacy policy</Link>.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={() => decide("denied")} variant="secondary">
                Essential only
              </Button>
              <Button onClick={() => decide("granted")}>Accept analytics</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Footer link that reopens the cookie banner. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookie settings
    </button>
  );
}
