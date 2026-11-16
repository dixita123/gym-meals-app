# Gym-Fit Breakfast & Lunch Ordering Site

A free, zero-maintenance ordering website. Customers pick meals → fill name/address/slot → pay by UPI QR → the order opens in **WhatsApp** pre-written to your parents' number. They just press Send.

No server, no database, no monthly cost.

## 1. Try it
Double-click `index.html` (or run `python3 -m http.server` in this folder and open http://localhost:8000).

## 2. Personalise (only file to edit: `config.js`)
- `businessName`, `tagline`
- `whatsappNumber` – parents' number with country code, digits only
- `deliverySlots`, the `menu`, and UPI details (`upiId`, `upiName`, and the QR image `upi-qr.jpg` — replace that file if the QR changes). Payment is UPI only; there is no cash on delivery.

## 3. Put it online for free (pick one, ~5 minutes)
- **Netlify Drop** (easiest): go to https://app.netlify.com/drop and drag this whole folder in. You get a link to share.
- **GitHub Pages** or **Cloudflare Pages**: upload the folder to a repo and enable Pages.
Share the link on WhatsApp status / Instagram / gym notice boards. A QR code (free at qr-code-generator.com) works well at gyms.

## 4. Optional upgrades (both free)

### A. Edit the menu from a Google Sheet (no code)
1. Create a Google Sheet with these headers in row 1:
   `id | category | name | description | price | protein | calories | veg | available`
2. Fill rows (category = Breakfast/Lunch; veg/available = yes/no). Set `available` to `no` when something sells out.
3. File → Share → **Publish to web** → choose the sheet tab and **CSV** → Publish. Copy the link into `sheetCsvUrl` in `config.js`.
Menu changes appear on the site instantly — no re-upload.

### B. Keep a record of all orders in a Google Sheet
Follow the steps at the top of `google-sheet-orders.gs`, then paste the URL into `orderWebhookUrl`.

## Files
- `index.html`, `style.css`, `app.js` – the site (don't need editing)
- `config.js` – shop settings and default menu
- `google-sheet-orders.gs` – optional order log script
