/**
 * TAMARINDO FAST FOOD - FRONTEND UI INTERACTION & ORDER LOGIC
 * Senior Developer Standard: Clean, modular, CRO-driven, vanilla JS
 */

// =============================================================================
// CONFIGURATION (Editable business details & WhatsApp numbers)
// =============================================================================
const CONFIG = {
  // WhatsApp business number format: CountryCode + Number (no spaces or '+')
  whatsappNumber: "5215586400725", 
  brandName: "TAMARINDO",
  currency: "$",
  defaultOrderMsg: "¡Hola TAMARINDO! 🔥 Vi su página y quiero ordenar:",
  contactMsg: "¡Hola TAMARINDO! Quiero información sobre servicio a domicilio.",
  schedule: "Lunes a Domingo: 1:00 PM - 11:30 PM",
  address: "Av. Gastronómica 123, Zona Centro",
  phoneDisplay: "+52 1 55 8640 0725"
};

// =============================================================================
// MENU DATA (Easily editable demo items with real gastronomic copy)
// =============================================================================
const MENU_ITEMS = [
  {
    id: "tenders-supremos",
    name: "Tenders Tamarindo Supremos",
    category: "tenders",
    price: 159,
    badge: "favorito",
    image: "assets/images/tenders.jpg",
    spicy: "🌶️ Suave",
    desc: "4 tiras extra crujientes de pechuga 100% fresca, marinadas 12 horas. Acompañadas de aderezo honey mustard casero y papas sazonadas."
  },
  {
    id: "burger-doble-cheddar",
    name: "Smash Burger Doble Cheddar",
    category: "burgers",
    price: 189,
    badge: "popular",
    image: "assets/images/burger.jpg",
    spicy: "🧀 Extra Queso",
    desc: "Doble carne de res selecta (200g) aplastada al punto crisp, doble queso cheddar fundido, tocino ahumado, cebolla caramelizada y salsa secreta en pan brioche."
  },
  {
    id: "boneless-mango-chile",
    name: "Boneless Tamarindo Habanero",
    category: "boneless",
    price: 169,
    badge: "popular",
    image: "assets/images/boneless.jpg",
    spicy: "🌶️🌶️🌶️ Muy Picoso",
    desc: "Trocitos de pechuga crujiente bañados en nuestra salsa insignia de tamarindo con mango y toque habanero, ajonjolí tostado y dip ranch artesanal."
  },
  {
    id: "alitas-buffalo-crisp",
    name: "Alitas Buffalo & BBQ Smokey",
    category: "alitas",
    price: 179,
    badge: "favorito",
    image: "assets/images/alitas.jpg",
    spicy: "🌶️🌶️ Medio",
    desc: "10 piezas de alitas doradas y jugosas a elegir entre Buffalo Red Hot o BBQ Ahumada. Servidas con bastones de apio fresco y dip blue cheese."
  },
  {
    id: "dedos-queso-stretch",
    name: "Dedos de Queso Epic Stretch",
    category: "dedos",
    price: 129,
    badge: "favorito",
    image: "assets/images/dedos-queso.jpg",
    spicy: "🧀 Mozzarella Real",
    desc: "6 bastones de auténtico queso mozzarella empanizados con finas hierbas y migas crujientes. Acompañados de dip marinara casero con albahaca."
  },
  {
    id: "tenders-bufalo",
    name: "Tenders Glaseados Búfalo",
    category: "tenders",
    price: 169,
    badge: "nuevo",
    image: "assets/images/tenders.jpg",
    spicy: "🌶️🌶️ Picante",
    desc: "4 tenders colosales bañados en mantequilla clarificada y salsa búfalo roja. Servidos con dip de aderezo ranch frío."
  },
  {
    id: "burger-tamarindo-monster",
    name: "Monster Smash Tamarindo",
    category: "burgers",
    price: 219,
    badge: "popular",
    image: "assets/images/burger.jpg",
    spicy: "🌶️ Con Jalapeños",
    desc: "Triple carne smash (300g), triple queso, aros de cebolla rebozados, tiras de tocino crujiente y reducción BBQ al tamarindo."
  },
  {
    id: "boneless-parmesano",
    name: "Boneless Ajo Parmesano",
    category: "boneless",
    price: 169,
    badge: "nuevo",
    image: "assets/images/boneless.jpg",
    spicy: "🧄 Sin Picante",
    desc: "Bañados en mantequilla dorada de ajo asado, queso parmesano madurado recién rallado y perejil fresco. Deliciosamente cremosos."
  }
];

// Available sauces for customization
const SAUCE_OPTIONS = [
  "Tamarindo Habanero (Insignia)",
  "Mango Picoso Especial",
  "BBQ Ahumado al Fuego",
  "Búfalo Red Hot",
  "Ranch Cremoso con Eneldo",
  "Ajo Parmesano Madurado"
];

// =============================================================================
// DOM ELEMENTS & INITIALIZATION
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderProducts("todos");
  initCategoryFilters();
  initModal();
  initWhatsAppLinks();
  initSmoothScroll();
});

// =============================================================================
// NAVBAR & MOBILE DRAWER
// =============================================================================
function initNavbar() {
  const header = document.querySelector(".header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  // Sticky header with blur on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
    });

    // Close mobile drawer when clicking a link
    navLinkItems.forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }
}

// Active nav indicator
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) navLink.classList.add("active");
    } else {
      if (navLink) navLink.classList.remove("active");
    }
  });
}

// =============================================================================
// PRODUCTS RENDERING & CATEGORY FILTERING
// =============================================================================
function renderProducts(filterCategory = "todos") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = filterCategory === "todos" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === filterCategory);

  grid.innerHTML = filtered.map(item => `
    <article class="product-card" data-category="${item.category}" data-id="${item.id}">
      <span class="product-badge ${item.badge}">${item.badge.toUpperCase()}</span>
      <div class="product-img-wrap">
        <img src="${item.image}" alt="${item.name}" class="product-img" loading="lazy" />
      </div>
      <div class="product-meta">
        <span class="product-category-label">${item.category}</span>
        <span class="product-spicy">${item.spicy}</span>
      </div>
      <h3 class="product-name">${item.name}</h3>
      <p class="product-desc">${item.desc}</p>
      <div class="product-footer">
        <div class="product-price-box">
          <span class="price-label">Precio demo</span>
          <span class="product-price">${CONFIG.currency}${item.price}</span>
        </div>
        <button class="product-add-btn" onclick="openOrderModal('${item.id}')" aria-label="Pedir ${item.name}">
          <span>Pedir</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  `).join("");
}

function initCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderProducts(category);
    });
  });
}

// Global category switcher called by category cards in section 3
window.filterMenuCategory = function(category) {
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth" });
  }
  
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(b => {
    if (b.getAttribute("data-filter") === category) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  renderProducts(category);
  showToast(`Filtrando menú por: ${category.toUpperCase()}`);
};

// =============================================================================
// MODAL & CRO ORDER GENERATOR
// =============================================================================
let currentSelectedItem = null;

function initModal() {
  const modalOverlay = document.getElementById("orderModal");
  const modalClose = document.getElementById("modalClose");

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", closeOrderModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeOrderModal();
    });
  }

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOrderModal();
  });
}

window.openOrderModal = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  currentSelectedItem = item;

  document.getElementById("modalItemImg").src = item.image;
  document.getElementById("modalItemImg").alt = item.name;
  document.getElementById("modalItemTitle").innerText = item.name;
  document.getElementById("modalItemPrice").innerText = `${CONFIG.currency}${item.price}`;
  document.getElementById("modalItemDesc").innerText = item.desc;

  // Render sauce choices
  const sauceContainer = document.getElementById("modalSauces");
  if (sauceContainer) {
    sauceContainer.innerHTML = SAUCE_OPTIONS.map((sauce, idx) => `
      <label class="sauce-radio-label">
        <input type="radio" name="orderSauce" value="${sauce}" ${idx === 0 ? "checked" : ""}>
        <span>${sauce}</span>
      </label>
    `).join("");
  }

  const modalOverlay = document.getElementById("orderModal");
  if (modalOverlay) {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.closeOrderModal = function() {
  const modalOverlay = document.getElementById("orderModal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  currentSelectedItem = null;
};

// Sends customized order straight to WhatsApp
window.sendModalOrderToWhatsApp = function() {
  if (!currentSelectedItem) return;

  const selectedSauceInput = document.querySelector('input[name="orderSauce"]:checked');
  const selectedSauce = selectedSauceInput ? selectedSauceInput.value : "Original";
  const notes = document.getElementById("modalNotes")?.value.trim() || "Sin notas adicionales";

  const message = `${CONFIG.defaultOrderMsg}\n\n` +
    `🍗 *Producto:* ${currentSelectedItem.name}\n` +
    `💰 *Precio demo:* ${CONFIG.currency}${currentSelectedItem.price}\n` +
    `🌶️ *Salsa favorita:* ${selectedSauce}\n` +
    `📝 *Indicaciones:* ${notes}\n\n` +
    `📍 Favor de confirmar tiempo estimado de entrega.`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(encodedUrl, "_blank");
  closeOrderModal();
  showToast("¡Redirigiendo a WhatsApp para tu pedido!");
};

// Direct order for combos
window.orderComboWhatsApp = function(comboName, comboPrice) {
  const message = `${CONFIG.defaultOrderMsg}\n\n` +
    `🔥 *COMBO PROMOCIONAL:* ${comboName}\n` +
    `💰 *Precio especial:* ${CONFIG.currency}${comboPrice}\n\n` +
    `📍 ¿Cuál es el tiempo de entrega a mi zona?`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
  showToast(`¡Preparando WhatsApp para: ${comboName}!`);
};

// General WhatsApp link handler
function initWhatsAppLinks() {
  const waButtons = document.querySelectorAll("[data-wa-trigger]");
  waButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const customText = btn.getAttribute("data-wa-trigger") || CONFIG.contactMsg;
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(customText)}`;
      window.open(url, "_blank");
    });
  });
}

// =============================================================================
// TOAST NOTIFICATIONS
// =============================================================================
function showToast(message) {
  let toast = document.querySelector(".toast-notice");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notice";
    toast.innerHTML = `
      <span class="toast-icon">⚡</span>
      <span class="toast-msg"></span>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector(".toast-msg").innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// =============================================================================
// SMOOTH SCROLL
// =============================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
}
