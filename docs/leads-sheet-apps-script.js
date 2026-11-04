/* eslint-disable @typescript-eslint/no-unused-vars -- doPost is called by Google Apps Script, not by this repo. */
/**
 * Google Apps Script web app: appends website form submissions to this Google Sheet.
 * The site (src/lib/leads.ts) POSTs one JSON object per submission to the web app URL,
 * which is stored in the Vercel env var LEADS_SHEET_WEBHOOK.
 *
 * SETUP
 * 1. Create a Google Sheet, e.g. "TWOP website leads".
 * 2. Extensions → Apps Script. Delete the sample code and paste this whole file. Save.
 * 3. Project Settings (gear) → Script properties → Add property:
 *      SECRET = a long random string (optional but recommended; see step 6).
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as: Me.  Who has access: Anyone.  Deploy, then authorise with your Google account.
 * 5. Copy the Web app URL (ends in /exec).
 * 6. In Vercel set LEADS_SHEET_WEBHOOK to that URL. If you set SECRET in step 3, add it as a query
 *    parameter: https://script.google.com/macros/s/XXXX/exec?secret=YOUR_SECRET
 * 7. After editing this script later: Deploy → Manage deployments → Edit → Version: New version → Deploy.
 *    (The URL stays the same.)
 *
 * Tabs "leads" and "newsletter" are created with a header row on first use.
 */

const COLUMNS = ["timestamp", "form", "name", "email", "whatsapp", "company", "service", "product", "packaging", "quantity", "country", "message", "page"];
const TABS = ["leads", "newsletter"];

function doPost(e) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (secret && (!e.parameter || e.parameter.secret !== secret)) return json({ ok: false, error: "unauthorised" });

    const data = JSON.parse(e.postData.contents);
    const tabName = TABS.indexOf(data.tab) >= 0 ? data.tab : "leads";
    const sheet = getTab(tabName);
    // Leading "=", "+", "-" or "@" would make Sheets treat a value as a formula: prefix with an apostrophe.
    const row = COLUMNS.map(function (c) {
      const v = data[c] === undefined || data[c] === null ? "" : String(data[c]).slice(0, 5000);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    });
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getTab(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
