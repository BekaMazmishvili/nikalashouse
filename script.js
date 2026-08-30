// Nikala's House — static site scripts

// Mobile menu
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.querySelector(".menu-btn");
  var menu = document.querySelector(".mobile-nav");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  // Highlight active nav link
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .mobile-nav a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Reveal sections on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  // Gallery lightbox
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery img").forEach(function (img) {
      img.addEventListener("click", function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
