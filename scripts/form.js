// ── Contact Form ──────────────────────────────
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch("https://formspree.io/f/mojlgzvl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      successMsg.style.display = "block";
      form.reset();
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 3000);
    } else {
      throw new Error();
    }
  } catch {
    alert("Error sending message. Please try again or email directly.");
  }
});
