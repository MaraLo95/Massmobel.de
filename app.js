const projects = [
  {
    id: "grau",
    title: "Grau",
    category: "Küche",
    image: "kitchen.png",
    description:
      "Graue Shaker-Fronten bis zur Decke, Insel mit Marmorplatte und Messing-Pendelleuchten. Eine helle Küche mit klaren Linien und warmen Akzenten.",
  },
  {
    id: "walnut",
    title: "Walnut",
    category: "Küche",
    image: "kitchen1.png",
    description:
      "Warmes Nussholz, weiße Marmorinsel und goldene Griffe. Eine großzügige Küche, in der Material und Maß den Alltag tragen.",
  },
  {
    id: "horizon",
    title: "Horizon",
    category: "Küche",
    image: "kitchen2.png",
    description:
      "Mattes Anthrazit unten, weiße Oberschränke und Eichenarbeitsplatte — grifflos, mit LED-Lichtband. Kompakte Präzision mit Charakter.",
  },
  {
    id: "studio",
    title: "Studio",
    category: "Büro",
    image: "office.png",
    description:
      "Heller Holzschreibtisch, wandhohe Regale und botanische Ruhe. Ein Homeoffice, das fokussiert — und trotzdem warm bleibt.",
  },
  {
    id: "boardroom",
    title: "Boardroom",
    category: "Büro",
    image: "office1.png",
    description:
      "Konferenzraum mit Holzwand, Glasraster und langem Tisch. Corporate-Chic — maßgefertigt für Meetings, die Wirkung hinterlassen.",
  },
  {
    id: "executive",
    title: "Executive",
    category: "Büro",
    image: "office2.png",
    description:
      "Vertikale Holzlamellen, integriertes Regal mit LED und klarer Schreibtisch. Ein Chefbüro mit Ruhe, Tiefe und Präsenz.",
  },
  {
    id: "blanc",
    title: "Blanc",
    category: "Ankleide",
    image: "closet.png",
    description:
      "Weiße Walk-in-Ankleide mit Holzbügeln und offenen Fächern. Hell, luftig und bis ins Detail geplant — Ordnung als Architektur.",
  },
  {
    id: "graphite",
    title: "Graphite",
    category: "Ankleide",
    image: "closet1.png",
    description:
      "Grau-braunes Holz, grifflose Schubladen und dunkle Stangen. Eine begehbare Ankleide, die den Raum exakt ausfüllt.",
  },
];

const portfolioList = document.getElementById("portfolio-list");
const portfolioBg = document.getElementById("portfolio-bg");
const menuToggle = document.getElementById("menu-toggle");
const overlayMenu = document.getElementById("overlay-menu");
const searchToggle = document.getElementById("search-toggle");
const searchOverlay = document.getElementById("search-overlay");
const searchClose = document.getElementById("search-close");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const projectPanel = document.getElementById("project-panel");
const panelClose = document.getElementById("panel-close");
const panelImage = document.getElementById("panel-image");
const panelCat = document.getElementById("panel-cat");
const panelTitle = document.getElementById("panel-title");
const panelDesc = document.getElementById("panel-desc");
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
const yearEl = document.getElementById("year");

let activeIndex = 0;

yearEl.textContent = new Date().getFullYear();

/* Build portfolio */
projects.forEach((project, index) => {
  const slide = document.createElement("div");
  slide.className = `bg-slide${index === 0 ? " is-active" : ""}`;
  slide.style.backgroundImage = `url("${project.image}")`;
  slide.dataset.index = String(index);
  portfolioBg.appendChild(slide);

  const li = document.createElement("li");
  li.className = `portfolio-item${index === 0 ? " is-active" : ""}`;
  li.dataset.index = String(index);
  li.innerHTML = `
    <button type="button" data-id="${project.id}">
      <span class="title">${project.title}</span>
      <span class="cat">${project.category}</span>
    </button>
  `;
  portfolioList.appendChild(li);
});

function setActiveProject(index) {
  if (index === activeIndex) return;
  activeIndex = index;

  document.querySelectorAll(".bg-slide").forEach((el, i) => {
    el.classList.toggle("is-active", i === index);
  });
  document.querySelectorAll(".portfolio-item").forEach((el, i) => {
    el.classList.toggle("is-active", i === index);
  });
}

portfolioList.addEventListener("mouseover", (e) => {
  const item = e.target.closest(".portfolio-item");
  if (!item) return;
  setActiveProject(Number(item.dataset.index));
});

portfolioList.addEventListener("focusin", (e) => {
  const item = e.target.closest(".portfolio-item");
  if (!item) return;
  setActiveProject(Number(item.dataset.index));
});

portfolioList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  const project = projects.find((p) => p.id === btn.dataset.id);
  if (project) openProject(project);
});

function openProject(project) {
  panelImage.src = project.image;
  panelImage.alt = project.title;
  panelCat.textContent = project.category;
  panelTitle.textContent = project.title;
  panelDesc.textContent = project.description;
  projectPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
}

function closeProject() {
  projectPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
}

panelClose.addEventListener("click", closeProject);

projectPanel.addEventListener("click", (e) => {
  if (e.target === projectPanel) closeProject();
});

/* Navigation / views */
function showView(name) {
  closeMenu();
  closeSearch();
  closeProject();

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === name);
  });

  document.body.classList.toggle("view-home-active", name === "home");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showView(el.dataset.nav);
  });
});

/* Menu */
function openMenu() {
  overlayMenu.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open", "is-locked");
}

function closeMenu() {
  overlayMenu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  if (projectPanel.getAttribute("aria-hidden") !== "false") {
    document.body.classList.remove("is-locked");
  }
}

menuToggle.addEventListener("click", () => {
  const open = overlayMenu.getAttribute("aria-hidden") === "false";
  if (open) closeMenu();
  else {
    closeSearch();
    closeProject();
    openMenu();
  }
});

/* Search */
function openSearch() {
  searchOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  setTimeout(() => searchInput.focus(), 80);
  renderSearchResults("");
}

function closeSearch() {
  searchOverlay.setAttribute("aria-hidden", "true");
  searchInput.value = "";
  if (
    overlayMenu.getAttribute("aria-hidden") !== "false" &&
    projectPanel.getAttribute("aria-hidden") !== "false"
  ) {
    document.body.classList.remove("is-locked");
  }
}

searchToggle.addEventListener("click", () => {
  closeMenu();
  openSearch();
});

searchClose.addEventListener("click", closeSearch);

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const matches = projects.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );

  searchResults.innerHTML = matches.length
    ? matches
        .map(
          (p) => `
      <li>
        <button type="button" data-search-id="${p.id}">
          ${p.title}<span class="cat">${p.category}</span>
        </button>
      </li>`
        )
        .join("")
    : `<li><button type="button" disabled>Keine Ergebnisse</button></li>`;
}

searchInput.addEventListener("input", () => {
  renderSearchResults(searchInput.value);
});

searchResults.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-search-id]");
  if (!btn) return;
  const project = projects.find((p) => p.id === btn.dataset.searchId);
  if (!project) return;
  closeSearch();
  showView("home");
  const index = projects.indexOf(project);
  setActiveProject(index);
  openProject(project);
});

/* Contact form */
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.hidden = false;
  contactForm.reset();
});

/* Keyboard */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (projectPanel.getAttribute("aria-hidden") === "false") closeProject();
    else if (searchOverlay.getAttribute("aria-hidden") === "false") closeSearch();
    else if (overlayMenu.getAttribute("aria-hidden") === "false") closeMenu();
  }

  if (
    document.getElementById("home").classList.contains("is-active") &&
    projectPanel.getAttribute("aria-hidden") !== "false" &&
    overlayMenu.getAttribute("aria-hidden") !== "false"
  ) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveProject((activeIndex + 1) % projects.length);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveProject((activeIndex - 1 + projects.length) % projects.length);
    }
    if (e.key === "Enter") {
      openProject(projects[activeIndex]);
    }
  }
});

/* Init */
showView("home");
