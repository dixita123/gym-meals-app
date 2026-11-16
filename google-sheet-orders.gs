// Paste this into a Google Sheet: Extensions → Apps Script → replace everything → Deploy → New deployment
// → type "Web app" → Execute as: Me → Who has access: Anyone → Deploy. Copy the URL into config.js (orderWebhookUrl).
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders") ||
                SpreadsheetApp.getActiveSpreadsheet().insertSheet("Orders");
  const o = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Time", "Order ID", "Name", "Phone", "Address", "Map link", "Slot", "Payment", "Items", "Total", "Notes", "Status"]);
  }
  sheet.appendRow([new Date(), o.orderId, o.name, o.phone, o.address, o.mapLink || "", o.slot, o.payment, o.items, o.total, o.notes || "", "New"]);
  return ContentService.createTextOutput("ok");
}
