// ============================================================
//  EDIT THIS FILE to customise the shop. Nothing else needs touching.
// ============================================================
window.CONFIG = {
  businessName: "FitBite Kitchen",
  tagline: "100% vegetarian, high-protein breakfast & lunch — fresh, home-made, delivered.",

  // Delivery area (shown on the site and at checkout)
  city: "Udaipur",
  deliveryArea: "IT Park",

  // Parents' WhatsApp number with country code, digits only (e.g. India: 919876543210)
  whatsappNumber: "919680079769",

  currency: "₹",
  // Payment is UPI only (no cash on delivery). Customers see the QR + UPI ID at checkout.
  upiId: "seemamali2502@oksbi",
  upiName: "Seema's kitchen blog",   // name shown in the customer's UPI app
  upiQrImage: "upi-qr.jpg",          // QR image file in this folder

  // Delivery time slots customers can pick from
  deliverySlots: [
    "Breakfast 10:00 – 11:00 AM",
    "Lunch 12:00 – 1:00 PM",
  ],

  // Breakfast is next-day delivery: order before this hour (24h clock, shop time zone) the evening before.
  // e.g. 22 = 10 PM. After the cut-off, breakfast orders move to the day after tomorrow.
  breakfastCutoffHour: 22,
  timeZone: "Asia/Kolkata",

  // OPTIONAL (see README): edit the menu from a Google Sheet instead of this file.
  // Paste the "Publish to web → CSV" link here. Leave "" to use the menu below.
  sheetCsvUrl: "",

  // OPTIONAL (see README): Google Apps Script URL that logs every order into a Google Sheet.
  orderWebhookUrl: "https://script.google.com/macros/s/AKfycbzUv0kR2U2MoSXaI2Mz2Rs2MR9drj5TupGsJsjBTplM_9ImQPtqFlehvzBY79Z4TLE/exec",

  // Default menu (all vegetarian). PRICES ARE PLACEHOLDERS - set your own.
  // category: "Breakfast" or "Lunch". available: false shows "Sold out".
  // protein / calories are optional: add them only once you've worked out real numbers.
  menu: [
    // ---- Breakfast ----
    { id: "b1", category: "Breakfast", name: "Classic Oats Bowl (500 g)", description: "Oats, milk, banana, apple, pomegranate, peanut butter, chia seeds, nuts, honey", price: 49, veg: true, available: true },
    { id: "b2", category: "Breakfast", name: "Classic Oats Bowl (750 g)", description: "Same as above, bigger bowl", price: 69, veg: true, available: true },
    { id: "b3", category: "Breakfast", name: "High Protein Choco Oats (750 g)", description: "Chocolate oats, milk, banana, peanut butter, chia seeds, nuts, honey", price: 79, veg: true, available: true },
    { id: "b11", category: "Breakfast", name: "Oats Khichdi", description: "Savoury oats cooked with moong dal and mixed vegetables, lightly spiced", price: 70, veg: true, available: true },
    { id: "b4", category: "Breakfast", name: "Peanut Butter Brown Bread Sandwich", description: "Brown bread, peanut butter, banana, apple, honey, seeds", price: 39, veg: true, available: true },
    { id: "b5", category: "Breakfast", name: "Chocolate Brown Bread Sandwich", description: "Brown bread, chocolate, peanut butter, banana, honey, seeds", price: 49, veg: true, available: true },
    { id: "b6", category: "Breakfast", name: "Chia Seed Pudding", description: "Milk, chia seeds, banana, honey", price: 49, veg: true, available: true },
    { id: "b7", category: "Breakfast", name: "Super Muesli Bowl", description: "Muesli, nuts, seasonal fruits, milk or curd", price: 69, veg: true, available: true },
    { id: "b8", category: "Breakfast", name: "Brown Rice Cake with Peanut Butter", description: "Crisp brown rice cakes, peanut butter, banana", price: 40, veg: true, available: true },
    { id: "b9", category: "Breakfast", name: "Mixed Fruit & Nuts Cup", description: "Fresh seasonal fruits with almonds, cashews and raisins", price: 59, veg: true, available: true },
    { id: "b10", category: "Breakfast", name: "Detox Water (bottle)", description: "Lemon, cucumber, mint, ginger", price: 20, veg: true, available: true },

    // ---- Lunch ----
    { id: "l1", category: "Lunch", name: "Sprouts Paneer Bowl", description: "Sprouts, paneer cubes, tomato, onion, lemon", price: 90, veg: true, available: true },
    { id: "l2", category: "Lunch", name: "Soya Chunk Power Bowl", description: "Soya chunks, quinoa or brown rice, salad, mint dip", price: 110, veg: true, available: true },
    { id: "l3", category: "Lunch", name: "Paneer Brown Rice Bowl", description: "Grilled paneer, brown rice, steamed veggies", price: 120, veg: true, available: true },
    { id: "l4", category: "Lunch", name: "Dal Roti Protein Thali", description: "Dal, 2 multigrain rotis, sabzi, curd", price: 100, veg: true, available: true },
    { id: "l5", category: "Lunch", name: "Chana Salad Bowl", description: "Boiled chana, cucumber, tomato, onion, lemon, chaat masala", price: 70, veg: true, available: true },
  ],
};
