# Form leads: email (Resend) + Google Sheet backup

Every form (`/get-a-quote`, `/start-a-project`, `/contact`, footer newsletter) goes through
`src/lib/submission.ts` → `src/lib/leads.ts`:

1. **Lead email** to `LEADS_TO_EMAIL`, reply-to = the client's email. It contains every answer, the page, country, time, a WhatsApp link and a mailto link.
2. **Sheet row** via the Apps Script web app at `LEADS_SHEET_WEBHOOK`. Leads go to the `leads` tab, newsletter sign-ups to the `newsletter` tab.
3. **Auto-reply** to the client (quote, project and contact forms only), sent after 1 or 2 succeeds.

The visitor sees the success screen only if the email **or** the sheet row succeeded. If both fail, they see an error with a "Send on WhatsApp" button, and the full submission is written to the Vercel log as `[leads] NOT DELIVERED`.

In local development with no keys set, submissions are only logged. In production, missing keys count as a failure.

## 1. Resend: verify theworldofpackaging.com

1. Sign up at resend.com (free plan) → **Domains** → **Add domain** → `theworldofpackaging.com`. Pick the region closest to you (e.g. `us-east-1`).
2. Resend shows the exact records. Add them at the DNS provider for theworldofpackaging.com (where the domain is registered, or wherever its nameservers point). They look like this:

| Type | Name / Host | Value | Priority |
|---|---|---|---|
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` (region from Resend) | 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | |
| TXT | `resend._domainkey` | `p=MIGfMA0...` (long DKIM key: copy it from Resend) | |
| TXT (recommended) | `_dmarc` | `v=DMARC1; p=none;` | |

   - Copy the values from the Resend dashboard, not this table: the DKIM key is unique to your account, and the MX host depends on the region.
   - Some DNS panels want the full name (`send.theworldofpackaging.com`); others add the domain for you.
   - These records only affect sending mail from the `send` subdomain and signing. They don't change the website or any existing inbox (the root MX records stay as they are).
   - If a `_dmarc` record already exists, keep it instead of adding a second one.
3. Click **Verify** in Resend. DNS can take from a few minutes to a few hours.
4. **API Keys** → **Create API key** → permission "Sending access", domain `theworldofpackaging.com`. Copy the key (`re_...`); it is shown once.

Until the domain is verified, Resend rejects mail from `quotes@theworldofpackaging.com`.

## 2. Google Sheet

Follow the steps at the top of `docs/leads-sheet-apps-script.js`. The result is a web app URL ending in `/exec`, optionally with `?secret=...`.

## 3. Vercel environment variables

Vercel → project → **Settings** → **Environment Variables**. Add each one for **Production** (and Preview if you want to test there):

| Name | Value |
|---|---|
| `RESEND_API_KEY` | `re_...` from step 1.4 (mark as Sensitive) |
| `LEADS_TO_EMAIL` | `info@smartsolutionsinc.com` |
| `LEADS_FROM_EMAIL` | `The World of Packaging <quotes@theworldofpackaging.com>` |
| `LEADS_SHEET_WEBHOOK` | the Apps Script `/exec` URL (mark as Sensitive) |

Then **Deployments** → latest → **⋯** → **Redeploy**. Env changes only apply to new deployments.

Set the variables **before** deploying this code. Without them, production forms show the WhatsApp error instead of the success screen.

## 4. Test checklist (production)

Use a real address you can read as the "client" email, plus a WhatsApp number with country code.

- [ ] **Quote** (`/get-a-quote`): pick Design + printing → fill step 2 → send.
  - [ ] Success screen appears.
  - [ ] Email arrives at info@smartsolutionsinc.com. The subject is "New Quote request – {name} – {service}", the table lists every answer, and the WhatsApp and mailto links open correctly.
  - [ ] Clicking Reply addresses the client.
  - [ ] The client inbox gets the thank-you email.
  - [ ] A row appears in the `leads` tab.
- [ ] **Quote, brand identity only**: the logo answer appears in the email and the row.
- [ ] **Start a project** (`/start-a-project`): success, lead email, auto-reply, `leads` row.
- [ ] **Contact** (`/contact`): success, lead email, auto-reply, `leads` row.
- [ ] **Newsletter** (footer): "Thanks, you are on the list", lead email, a row in the `newsletter` tab, **no** auto-reply.
- [ ] **Spam folder**: if a lead email lands in spam, check the Resend domain is verified and DKIM shows green.
- [ ] **Failure path** (optional, on a Preview deployment): set `LEADS_SHEET_WEBHOOK` to a wrong URL and remove `RESEND_API_KEY`. The form shows the error with "Send on WhatsApp", and the Vercel log shows `[leads] NOT DELIVERED`.
- [ ] **Vercel → Logs**: no `[leads]` errors after the test submissions.
