const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("https://formspree.io/f/mojlgzvl", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        successMessage.style.display = "block";
        form.reset();

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      } else {
        alert("Something went wrong, please try again.");
      }
    })
    .catch(() => {
      alert("Something went wrong, please try again.");
    });
});
