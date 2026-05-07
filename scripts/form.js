const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the submit button and disable it
  const submitBtn = form.querySelector(".btn-submit");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "جاري الإرسال...";

  const formData = new FormData(form);

  fetch("https://formspree.io/f/mojlgzvl", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        // Show success message with animation
        successMessage.style.display = "block";
        successMessage.style.animation = "slideIn 0.5s ease-out";

        // Reset form
        form.reset();

        // Hide message after 4 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 4000);
      } else {
        throw new Error("Server error");
      }
    })
    .catch((error) => {
      console.error("Form error:", error);
      alert(
        "حدث خطأ في الإرسال. تحقق من بيانات البريد الإلكتروني وحاول مرة أخرى.",
      );
      successMessage.style.display = "none";
    })
    .finally(() => {
      // Re-enable the button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
});
