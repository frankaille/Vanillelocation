/* ==========================================================
   Vanillelocation - JavaScript
   Deux petites fonctions :
   1. le menu burger sur mobile
   2. l'effet de parallaxe sur la photo d'accueil
   ========================================================== */

/* ---------- 1. Menu burger ---------- */

const boutonBurger = document.querySelector(".burger");
const menu__liens = document.querySelector("#menu__liens");

function ouvrirMenu(ouvrir) {
  menu__liens.classList.toggle("est-ouvert", ouvrir);
  boutonBurger.setAttribute("aria-expanded", String(ouvrir));
  boutonBurger.setAttribute(
    "aria-label",
    ouvrir ? "Fermer le menu" : "Ouvrir le menu"
  );
}

boutonBurger.addEventListener("click", () => {
  const dejaOuvert = boutonBurger.getAttribute("aria-expanded") === "true";
  ouvrirMenu(!dejaOuvert);
});

// Fermer le menu quand on clique sur un lien
menu.addEventListener("click", (evenement) => {
  if (evenement.target.closest("a")) {
    ouvrirMenu(false);
  }
});

// Fermer le menu avec la touche Échap
document.addEventListener("keydown", (evenement) => {
  if (evenement.key === "Escape") {
    ouvrirMenu(false);
    boutonBurger.focus();
  }
});

/* ---------- 2. Parallaxe de la photo d'accueil ---------- */

const fond = document.querySelector("[data-parallaxe]");
const hero = document.querySelector(".hero");
const moinsDAnimation = window.matchMedia("(prefers-reduced-motion: reduce)");

let enAttente = false; // évite de recalculer plus d'une fois par image affichée

function deplacerFond() {
  // La photo fait 130 % de la hauteur de la section : on peut la remonter
  // au maximum de 30 % de cette hauteur sans laisser apparaître de vide.
  const decalageMax = hero.offsetHeight * 0.3;
  const decalage = Math.min(window.scrollY * 0.2, decalageMax);

  fond.style.setProperty("--translateY", `-${decalage}px`);
  enAttente = false;
}

function auDefilement() {
  if (moinsDAnimation.matches || enAttente) return;
  enAttente = true;
  requestAnimationFrame(deplacerFond);
}

window.addEventListener("scroll", auDefilement, { passive: true });
window.addEventListener("resize", auDefilement);
