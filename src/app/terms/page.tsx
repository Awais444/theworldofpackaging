import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

// TODO: legal review. Template text only.
export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="TBC">
      <p>These terms cover use of this website and orders placed with {site.name}. Each project is also governed by its written quote.</p>
      <h2>Quotes and estimates</h2>
      <p>Configurator figures are estimates. Prices are confirmed only in a written quote.</p>
      <h2>Samples</h2>
      <p>Sample fees are credited to a bulk order placed on the same specification, as stated in your quote.</p>
      <h2>Artwork and approval</h2>
      <p>You are responsible for approving proofs, text and regulatory content. Production starts after written approval.</p>
      <h2>Intellectual property</h2>
      <p>Ownership of design work transfers on full payment, as set out in your proposal.</p>
      <h2>Shipping and duties</h2>
      <p>Delivery terms, freight and responsibility for duties are set out in each quote.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: {site.email}.</p>
    </LegalPage>
  );
}
