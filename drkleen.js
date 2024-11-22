document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector("[data-collapse-toggle]");
  const menu = document.getElementById("navbar-sticky");

  toggleButton.addEventListener("click", function () {
    const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

    // Toggle the `aria-expanded` attribute
    toggleButton.setAttribute("aria-expanded", !isExpanded);

    // Toggle the visibility of the menu
    menu.classList.toggle("hidden");
  });
});

// DARK MODE
var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Debug initial theme setting
console.log(
  "Initial color-theme in localStorage:",
  localStorage.getItem("color-theme")
);

// Set initial theme based on local storage
if (localStorage.getItem("color-theme") === "dark") {
  document.documentElement.classList.add("dark");
  themeToggleLightIcon.classList.remove("hidden");
  themeToggleDarkIcon.classList.add("hidden");
} else {
  document.documentElement.classList.remove("dark");
  themeToggleDarkIcon.classList.remove("hidden");
  themeToggleLightIcon.classList.add("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  console.log("Toggle Button Clicked");

  // Toggle icons inside the button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // Toggle the dark class and save the preference in local storage
  if (localStorage.getItem("color-theme") === "light") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
    console.log("Switched to dark mode");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
    console.log("Switched to light mode");
  }

  console.log(
    "Current theme after toggle:",
    localStorage.getItem("color-theme")
  );
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize first Splide (Testimonials)
  new Splide("#carousel-testimonials", {
    type: "loop",
    perPage: 3,
    gap: "1rem",
    autoplay: true,
    breakpoints: {
      640: {
        perPage: 1,
      },
      1024: {
        perPage: 2,
      },
    },
  }).mount();

  // Initialize second Splide (Services)
  new Splide("#carousel-services", {
    type: "loop",
    perPage: 3,
    gap: "1rem",
    autoplay: true,
    breakpoints: {
      640: {
        perPage: 1,
      },
      1024: {
        perPage: 2,
      },
    },
  }).mount();
});

// document.addEventListener("DOMContentLoaded", function () {
//   new Splided("#carousel", {
//     type: "loop", // Carousel mode (loop)
//     perPage: 1, // Number of visible slides
//     autoplay: true, // Enable autoplay
//     pauseOnHover: true, // Pause when hovering
//     height: "18rem", // Set the height of the carousel if needed
//     gap: "1rem", // Gap between slides
//   }).mount();
// });
