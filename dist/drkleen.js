const cartToggle = document.getElementById("cart-toggle");
const cartToggleDesktop = document.getElementById("cart-toggle-desktop");
const mobileMenu = document.getElementById("mobile-menu");
const cartPanel = document.getElementById("cart-panel");
const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");

// Show mobile menu
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
});

// Close mobile menu
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// Show cart panel
const openCart = () => {
  cartPanel.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
};
cartToggle.addEventListener("click", openCart);
cartToggleDesktop.addEventListener("click", openCart);

// Close cart panel
closeCart.addEventListener("click", () => {
  cartPanel.classList.add("translate-x-full");
  overlay.classList.add("hidden");
});

// Close both on overlay click
overlay.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
  cartPanel.classList.add("translate-x-full");
  overlay.classList.add("hidden");
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
