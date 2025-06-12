document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000, // duration of the animations in milliseconds
    easing: "ease-out", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
  });
});

/* menu */
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

/* form handling */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const thankYouMessage = document.getElementById("thank-you-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.style.display = "none"; // Hide the form
          thankYouMessage.style.display = "block"; // Show the thank you message

          setTimeout(() => {
            thankYouMessage.style.display = "none"; // Hide the thank you message
            form.reset(); // Reset the form fields
            form.style.display = "block"; // Show the form again with animation
            form.classList.add("fade-in");
          }, 4000);
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(
                "There was a problem with your submission: " +
                  data["errors"].map((error) => error["message"]).join(", ")
              );
            } else {
              alert("Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch((error) => {
        alert("Oops! There was a problem submitting your form");
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const mainContent = document.getElementById("main-content");

  // Hide the main content initially
  mainContent.style.visibility = "hidden";

  // After 10 seconds, hide the loader and show the main content
  setTimeout(function () {
    document.body.classList.add("loaded");
    mainContent.style.visibility = "visible";

    setTimeout(() => {
      loader.remove();
    }, 500); // Remove loader after fade out transition
  }, 10000); // Changed from 5000 to 10000 milliseconds (10 seconds)
});
