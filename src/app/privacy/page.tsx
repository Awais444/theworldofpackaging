import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import { site } from "@/config/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", description: metaDescription("How The World of Packaging collects, uses and protects personal data from quote requests, forms and this website."), alternates: { canonical: "/privacy" } };

// TODO: legal review. Template text only.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains what personal data {site.name} collects through this website and how it is used.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Details you send in forms: name, email, company, country, and project or order information.</li>
        <li>Delivery details you enter at checkout.</li>
        <li>Analytics data, only if you accept analytics cookies.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To reply to enquiries, prepare quotes, make and ship orders, and improve the website. We do not sell personal data.</p>
      <h2>Cookies and storage</h2>
      <p>Essential browser storage keeps your quote form progress and consent choice. Analytics cookies load only after you consent.</p>
      <h2>Your rights</h2>
      <p>You can ask for a copy of your data, ask us to correct or delete it, or withdraw consent at any time by emailing {site.email}.</p>
      <h2>Contact</h2>
      <p>
        {site.name}{site.address ? `, ${site.address}` : ""}. Email: {site.email}.
      </p>
    </LegalPage>
  );
}
