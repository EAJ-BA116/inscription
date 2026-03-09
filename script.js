
// Mobile menu
const navbtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");

navbtn?.addEventListener("click", () => {
  const open = nav?.classList.toggle("is-open");
  navbtn.setAttribute("aria-expanded", open ? "true" : "false");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navbtn?.setAttribute("aria-expanded", "false");
  });
});

// Flip cards
document.querySelectorAll("[data-flip]").forEach((card) => {
  const toggle = () => card.classList.toggle("is-flipped");

  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
    if (event.key === "Escape") {
      card.classList.remove("is-flipped");
    }
  });
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const openLightbox = (src) => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
};

document.querySelectorAll(".gitem").forEach((btn) => {
  btn.addEventListener("click", () => openLightbox(btn.dataset.full));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});

// Inscription form
const form = document.getElementById("inscriptionForm");
const formWrapper = document.getElementById("formWrapper");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const classe = document.getElementById("classe");
const autreClasseField = document.getElementById("autreClasseField");
const autreClasse = document.getElementById("autreClasse");
const biaCheckbox = document.getElementById("hasBia");
const demarchesCheckbox = document.getElementById("demarches");
const formAlert = document.getElementById("formAlert");
const sendCombinedBtn = document.getElementById("sendCombinedBtn");

const setAlert = (message) => {
  if (!formAlert) return;
  formAlert.textContent = message || "";
};

const updateAutreClasse = () => {
  const isOther = classe?.value === "Autre";
  autreClasseField?.classList.toggle("hidden", !isOther);
  if (autreClasse) {
    autreClasse.required = isOther;
    if (!isOther) autreClasse.value = "";
  }
};

const getClasseLabel = () => {
  if (classe?.value === "Autre" && autreClasse?.value.trim()) {
    return autreClasse.value.trim();
  }
  return classe?.value || "";
};

const getBirthDateLabel = () => {
  const raw = document.getElementById("dateNaissance")?.value || "";
  if (!raw) return "";
  const [year, month, day] = raw.split("-");
  if (!year || !month || !day) return raw;
  return `${day}/${month}/${year}`;
};

const buildMessage = () => {
  const nom = document.getElementById("nom")?.value.trim() || "";
  const prenom = document.getElementById("prenom")?.value.trim() || "";
  const birthDate = getBirthDateLabel();
  const classeLabel = getClasseLabel();
  const etablissement = document.getElementById("etablissement")?.value.trim() || "";
  const hasBia = biaCheckbox?.checked === true;
  const biaSentence = hasBia ? "J'ai déjà le BIA." : "Je n'ai pas encore le BIA.";

  return [
    "Bonjour,",
    "",
    `Je m'appelle ${prenom} ${nom} et je suis intéressé(e) par l'Escadrille Air Jeunesse de la BA 116.`,
    birthDate ? `Je suis né(e) le ${birthDate}.` : "",
    `Je serai à la rentrée 2026 en classe de ${classeLabel} dans l'établissement ${etablissement}.`,
    biaSentence,
    demarchesCheckbox?.checked
      ? "J'ai déjà effectué l'inscription sur Démarche numérique et j'y ai déposé mon CV ainsi que ma lettre de motivation."
      : "Je vais finaliser l'inscription sur Démarche numérique avec mon CV et ma lettre de motivation.",
    "Je vous transmets mes bulletins scolaires de l'année en cours.",
    "",
    "Bonne journée à vous.",
    "Cordialement."
  ].filter(Boolean).join("\n");
};

const validateForm = () => {
  if (!form?.reportValidity()) return false;
  setAlert("");
  return true;
};

const openOrCloseForm = () => {
  const willOpen = formWrapper?.classList.contains("hidden");
  formWrapper?.classList.toggle("hidden");
  toggleFormBtn?.setAttribute("aria-expanded", willOpen ? "true" : "false");
  if (toggleFormBtn) {
    toggleFormBtn.textContent = willOpen ? "Masquer le formulaire d’envoi" : "Étape 2 : Envoi du formulaire";
  }
  if (willOpen) {
    document.getElementById("nom")?.focus();
  }
};

const launchEmail = () => {
  if (!validateForm()) return;

  const subject = "Candidature Escadrilles Air Jeunesse BA 116";
  const emailBody = `${buildMessage()}\n\nRappel : merci d'ajouter manuellement les bulletins scolaires en pièce jointe avant l'envoi.`;
  window.location.href = `mailto:eaj.ba116@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
};

toggleFormBtn?.addEventListener("click", openOrCloseForm);
sendCombinedBtn?.addEventListener("click", launchEmail);
classe?.addEventListener("change", updateAutreClasse);
demarchesCheckbox?.addEventListener("change", () => {
  setAlert("");
});

updateAutreClasse();
