AOS.init({ once: true, duration: 800 });

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  root.setAttribute("data-theme", "dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  }
});

// Form Handler
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("https://formspree.io/f/mojlgzvl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      successMsg.style.display = "block";
      form.reset();
      setTimeout(() => (successMsg.style.display = "none"), 3000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    alert("Error sending message. Please try again or email directly.");
  }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation__link");

function updateActiveLink() {
  let current = "";
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && href.substring(1) === current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

const texts = [
  "Ahmed Hesham",
  "Front-End Developer",
];

const typingText = document.querySelector(".typing-text");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();