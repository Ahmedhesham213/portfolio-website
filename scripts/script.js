// ── AOS ───────────────────────────────────────
AOS.init({ once: true, duration: 800 });

// ── Theme ─────────────────────────────────────
const desktopToggle = document.getElementById("themeToggle");
const mobileToggle = document.getElementById("themeToggleMobile");

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  if (desktopToggle) desktopToggle.checked = dark;
  if (mobileToggle) mobileToggle.checked = dark;
  localStorage.setItem("theme", dark ? "dark" : "light");
}

if (desktopToggle)
  desktopToggle.addEventListener("change", () =>
    applyTheme(desktopToggle.checked),
  );
if (mobileToggle)
  mobileToggle.addEventListener("change", () =>
    applyTheme(mobileToggle.checked),
  );

const savedTheme = localStorage.getItem("theme");
if (savedTheme) applyTheme(savedTheme === "dark");

// ── Mobile Drawer ─────────────────────────────
const menuCheckbox = document.getElementById("menu");
const overlay = document.getElementById("nav-overlay");
const navLinks = document.querySelectorAll(".navigation__link");

if (overlay)
  overlay.addEventListener("click", () => {
    menuCheckbox.checked = false;
  });

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuCheckbox.checked = false;
  });
});

// ── Active Nav Link on Scroll ─────────────────
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  let current = "";
  const scrollY = window.scrollY + 150;

  sections.forEach((section) => {
    if (
      scrollY >= section.offsetTop &&
      scrollY < section.offsetTop + section.clientHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// ── Typing Effect ─────────────────────────────
const texts = [" Ahmed Hesham", "Front-End Developer"];
const typingEl = document.querySelector(".typing");
let textIndex = 0,
  charIndex = 0,
  isDeleting = false;

function typeEffect() {
  const current = texts[textIndex];
  typingEl.textContent = current.substring(
    0,
    isDeleting ? --charIndex : ++charIndex,
  );

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    return setTimeout(typeEffect, 1500);
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
