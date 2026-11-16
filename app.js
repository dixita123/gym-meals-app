(() => {
  const C = window.CONFIG;
  const $ = (id) => document.getElementById(id);
  const money = (n) => C.currency + n;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let menu = C.menu;
  let category = "Breakfast";
  let cart = JSON.parse(localStorage.getItem("cart") || "{}"); // { itemId: qty }

  // ---------- Menu loading (optional Google Sheet) ----------
  function parseCSV(text) {
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); cell = ""; rows.push(row); row = [];
      } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  async function loadMenu() {
    if (!C.sheetCsvUrl) return;
    try {
      const res = await fetch(C.sheetCsvUrl, { cache: "no-store" });
      const rows = parseCSV(await res.text()).filter((r) => r.some((c) => c.trim()));
      const head = rows.shift().map((h) => h.trim().toLowerCase());
      const yes = (v) => /^(yes|y|true|1)$/i.test((v || "").trim());
      const items = rows.map((r, i) => {
        const o = Object.fromEntries(head.map((h, j) => [h, (r[j] || "").trim()]));
        return {
          id: o.id || "s" + i, category: o.category || "Lunch", name: o.name, description: o.description,
          price: Number(o.price) || 0, protein: o.protein, calories: o.calories,
          veg: yes(o.veg), available: o.available === "" ? true : yes(o.available),
        };
      }).filter((m) => m.name && m.price > 0);
      if (items.length) menu = items;
    } catch (e) { console.warn("Could not load sheet menu, using default.", e); }
  }

  // ---------- Rendering ----------
  function renderTabs() {
    const cats = [...new Set(menu.map((m) => m.category))];
    if (!cats.includes(category)) category = cats[0];
    $("tabs").innerHTML = cats.map((c) => `<button class="${c === category ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  }

  function renderMenu() {
    const items = menu.filter((m) => m.category === category);
    $("menu").innerHTML = items.length ? items.map((m) => {
      const q = cart[m.id] || 0;
      const action = !m.available ? `<button class="add" disabled>Sold out</button>`
        : q ? `<div class="qty"><button data-dec="${esc(m.id)}">−</button><b>${q}</b><button data-inc="${esc(m.id)}">+</button></div>`
        : `<button class="add" data-inc="${esc(m.id)}">Add</button>`;
      const macros = [m.protein && `<span>${esc(m.protein)}g protein</span>`, m.calories && `<span>${esc(m.calories)} kcal</span>`].filter(Boolean).join("");
      return `<div class="card">
        <h3><span class="badge ${m.veg ? "veg" : "nonveg"}"></span>${esc(m.name)}</h3>
        <p>${esc(m.description)}</p>
        <div class="macros">${macros}</div>
        <div class="row"><span class="price">${money(m.price)}</span>${action}</div>
      </div>`;
    }).join("") : `<p class="empty">Nothing here yet.</p>`;
  }

  const cartLines = () => Object.entries(cart).map(([id, qty]) => ({ item: menu.find((m) => m.id === id), qty })).filter((l) => l.item && l.item.available);
  const cartTotal = () => cartLines().reduce((s, l) => s + l.item.price * l.qty, 0);

  function renderCart() {
    const lines = cartLines();
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const bar = $("cartBar");
    bar.hidden = count === 0;
    bar.textContent = `View order · ${count} item${count > 1 ? "s" : ""} · ${money(cartTotal())}`;
    $("cartList").innerHTML = lines.map((l) => `<li><span>${esc(l.item.name)}</span>
      <span class="qty"><button data-dec="${esc(l.item.id)}">−</button><b>${l.qty}</b><button data-inc="${esc(l.item.id)}">+</button></span>
      <span>${money(l.item.price * l.qty)}</span></li>`).join("");
    $("cartTotal").textContent = money(cartTotal());
    renderPayBox();
    if (!count) $("overlay").hidden = true;
  }

  function refresh() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderMenu(); renderCart();
  }

  // ---------- Events ----------
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset.cat) { category = t.dataset.cat; renderTabs(); renderMenu(); }
    if (t.dataset.inc) { cart[t.dataset.inc] = (cart[t.dataset.inc] || 0) + 1; refresh(); }
    if (t.dataset.dec) { cart[t.dataset.dec] = (cart[t.dataset.dec] || 0) - 1; if (cart[t.dataset.dec] <= 0) delete cart[t.dataset.dec]; refresh(); }
  });
  $("cartBar").onclick = () => ($("overlay").hidden = false);
  $("closeBtn").onclick = () => ($("overlay").hidden = true);
  $("copyUpi").onclick = () => {
    navigator.clipboard?.writeText(C.upiId).then(() => toast("UPI ID copied"), () => toast("Copy failed — please type it"));
  };

  function renderPayBox() {
    const total = cartTotal();
    $("payAmount").textContent = money(total);
    $("upiIdText").textContent = C.upiId;
    $("upiQr").src = C.upiQrImage;
    $("upiLink").href = `upi://pay?pa=${encodeURIComponent(C.upiId)}&pn=${encodeURIComponent(C.upiName)}&am=${total}&cu=INR`;
  }

  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.hidden = false;
    setTimeout(() => (t.hidden = true), 3500);
  }

  $("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const lines = cartLines();
    if (!lines.length) return;
    const f = Object.fromEntries(new FormData(e.target));
    f.payment = "UPI (customer says paid — verify screenshot)";
    delete f.paid;
    const total = cartTotal();
    const orderId = "FB" + Date.now().toString().slice(-6);
    const itemsText = lines.map((l) => `• ${l.item.name} x${l.qty} = ${money(l.item.price * l.qty)}`).join("\n");
    const msg = `*New order ${orderId}*\n${itemsText}\n\n*Total: ${money(total)}*\nPayment: ${f.payment}\nSlot: ${f.slot}\n\nName: ${f.name}\nPhone: ${f.phone}\nAddress (${C.deliveryArea}, ${C.city}): ${f.address}${f.mapLink ? `\nMap: ${f.mapLink}` : ""}${f.notes ? `\nNotes: ${f.notes}` : ""}`;

    // Optional: log to Google Sheet (fire-and-forget)
    if (C.orderWebhookUrl) {
      fetch(C.orderWebhookUrl, {
        method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ orderId, ...f, items: itemsText, total }),
      }).catch(() => {});
    }

    window.open(`https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    cart = {}; e.target.reset(); refresh();
    toast("Order ready — just press Send in WhatsApp to confirm!");
  });

  // ---------- Init ----------
  document.title = C.businessName;
  $("shopName").textContent = C.businessName;
  $("tagline").textContent = `${C.tagline} Delivering within ${C.deliveryArea}, ${C.city}.`;
  $("areaNote").textContent = `We deliver only inside ${C.deliveryArea}, ${C.city}.`;
  $("addressInput").placeholder = `Company / building / floor / desk (inside ${C.deliveryArea})`;
  $("locBtn").onclick = () => {
    if (!navigator.geolocation) return toast("Location not supported — paste a Maps link instead");
    navigator.geolocation.getCurrentPosition(
      (p) => { $("mapLink").value = `https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`; toast("Location added"); },
      () => toast("Couldn't get location — paste a Maps link instead")
    );
  };
  $("slotSelect").innerHTML = `<option value="">Choose delivery slot</option>` + C.deliverySlots.map((s) => `<option>${esc(s)}</option>`).join("");
  loadMenu().then(() => { renderTabs(); refresh(); });
  renderTabs(); refresh();
})();
