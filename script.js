// Mobile menu
const navbtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");

navbtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navbtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close menu on link click (mobile)
nav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navbtn?.setAttribute("aria-expanded", "false");
  });
});

// Flip cards: click + keyboard
document.querySelectorAll("[data-flip]").forEach((card) => {
  const toggle = () => card.classList.toggle("is-flipped");

  card.addEventListener("click", toggle);

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    if (e.key === "Escape") {
      card.classList.remove("is-flipped");
    }
  });
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const openLightbox = (src) => {
  lightboxImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
};
const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
};

document.querySelectorAll(".gitem").forEach((btn) => {
  btn.addEventListener("click", () => openLightbox(btn.dataset.full));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});