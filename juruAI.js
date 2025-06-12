// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll) with improved settings
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    offset: 100,
    delay: 0,
    anchorPlacement: "top-bottom",
    disable: window.innerWidth < 768 ? true : false, // Disable animations on mobile
  });

  // Dark mode functionality
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const htmlElement = document.documentElement;

  // Check for saved user preference, if any
  const savedTheme = localStorage.getItem("theme");

  // If user previously enabled dark mode, check the toggle
  if (savedTheme === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    darkModeToggle.checked = true;
  }

  // Listen for toggle changes
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      htmlElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  });
  // Add parallax effect to hero section (modified to be more subtle)
  const heroSection = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const heroVisual = document.querySelector(".hero-visual");

  if (heroSection && heroContent && heroVisual) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 400) {
        // Reduced the scroll range
        const parallaxSpeed = scrollPosition * 0.08; // Reduced the speed
        // Only apply transform to the hero visual, not the content with buttons
        heroVisual.style.transform = `translateY(${parallaxSpeed * 0.6}px)`;
        // Don't transform the content to avoid button visibility issues
      }
    });
  }
  // Initialize the loader
  const loader = document.querySelector(".loader");
  const mainContent = document.querySelector("body");

  window.addEventListener("load", function () {
    // Ensure loader respects current theme
    if (
      loader &&
      document.documentElement.getAttribute("data-theme") === "dark"
    ) {
      loader.style.backgroundColor = "#1a202c";
    }

    // Hide loader and show content when page is fully loaded
    setTimeout(function () {
      if (loader) {
        loader.style.opacity = "0";
        loader.style.display = "none";
      }
      mainContent.classList.add("loaded");
    }, 800);
  });
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      // Change icon based on menu state
      const icon = mobileMenuToggle.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("active")) {
          icon.classList.remove("bx-menu");
          icon.classList.add("bx-x");
        } else {
          icon.classList.remove("bx-x");
          icon.classList.add("bx-menu");
        }
      }

      // Ensure dark mode toggle is visible in the mobile menu
      const themeToggle = document.querySelector(".theme-toggle");
      if (themeToggle && navLinks.classList.contains("active")) {
        themeToggle.style.visibility = "visible";
        themeToggle.style.opacity = "1";
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const headerOffset = 100; // Adjust based on header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navLinks = document.querySelector(".nav-links");
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  }); // Header scroll effect
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Animated stat counters
  const statSections = document.querySelector(".results");
  const statNumbers = document.querySelectorAll(".stat-number");
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;

    statNumbers.forEach((number) => {
      const dataTarget = number.getAttribute("data-target");

      // If there's no data-target attribute, keep the current content
      if (!dataTarget) {
        return;
      }

      const target = parseInt(dataTarget);
      const originalText = number.textContent.trim();
      const suffix = originalText.includes("%")
        ? "%"
        : originalText.includes("x")
        ? "x"
        : "";

      const duration = 2000; // 2 seconds
      const step = target / (duration / 30); // Update every 30ms
      let current = 0;
      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          number.textContent = target + suffix;
          clearInterval(counter);
        } else {
          number.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    });

    countersStarted = true;
  }

  // Start counter animation when scrolled into view
  function checkCounters() {
    if (!statSections) return;

    const sectionTop = statSections.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      startCounters();
      window.removeEventListener("scroll", checkCounters);
    }
  }

  if (statSections && statNumbers.length > 0) {
    window.addEventListener("scroll", checkCounters);
    // Also check on page load in case the section is already in view
    checkCounters();
  }
  // Add dynamic effects to integration items
  const integrationItems = document.querySelectorAll(".integration-item");
  const integrationSection = document.querySelector(".integrations");

  if (integrationItems.length > 0) {
    // Enhanced hover effects
    integrationItems.forEach((item, index) => {
      // Add staggered animation delay
      item.style.animationDelay = `${index * 100}ms`;

      item.addEventListener("mouseenter", () => {
        integrationItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.style.opacity = "0.6";
            otherItem.style.transform = "scale(0.95)";
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        integrationItems.forEach((otherItem) => {
          otherItem.style.opacity = "1";
          otherItem.style.transform = "";
        });
      });
    });

    // Create a dynamic mesh background effect for the integration section
    if (integrationSection) {
      const mesh = document.createElement("div");
      mesh.className = "integration-mesh";
      mesh.style.position = "absolute";
      mesh.style.top = "0";
      mesh.style.left = "0";
      mesh.style.width = "100%";
      mesh.style.height = "100%";
      mesh.style.zIndex = "0";
      mesh.style.opacity = "0.05";
      mesh.style.pointerEvents = "none";

      // Create SVG mesh pattern
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");

      // Create a pattern of connected dots
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const circle = document.createElementNS(svgNS, "circle");
          const x = (i + 1) * 100;
          const y = (j + 1) * 100;

          circle.setAttribute("cx", `${x}`);
          circle.setAttribute("cy", `${y}`);
          circle.setAttribute("r", "2");
          circle.setAttribute("fill", "#38a169");

          svg.appendChild(circle);

          // Connect some dots with lines
          if (i < 7) {
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", `${x}`);
            line.setAttribute("y1", `${y}`);
            line.setAttribute("x2", `${x + 100}`);
            line.setAttribute("y2", `${y}`);
            line.setAttribute("stroke", "#38a169");
            line.setAttribute("stroke-width", "1");
            line.setAttribute("stroke-opacity", "0.3");
            svg.appendChild(line);
          }

          if (j < 7) {
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", `${x}`);
            line.setAttribute("y1", `${y}`);
            line.setAttribute("x2", `${x}`);
            line.setAttribute("y2", `${y + 100}`);
            line.setAttribute("stroke", "#38a169");
            line.setAttribute("stroke-width", "1");
            line.setAttribute("stroke-opacity", "0.3");
            svg.appendChild(line);
          }
        }
      }

      mesh.appendChild(svg);
      integrationSection.style.position = "relative";
      integrationSection.insertBefore(mesh, integrationSection.firstChild);
    }
  }

  // Add special animations for Africa section
  const africaSection = document.querySelector(".africa-section");
  const africaFeatures = document.querySelectorAll(".africa-feature");

  if (africaSection) {
    // Create dynamic particles for the Africa map background
    createAfricaMapParticles();

    // Add hover interactions for Africa features
    africaFeatures.forEach((feature) => {
      feature.addEventListener("mouseenter", () => {
        feature.classList.add("feature-highlight");
        const icon = feature.querySelector("i");
        if (icon) {
          icon.classList.add("bounce-animation");
          setTimeout(() => {
            icon.classList.remove("bounce-animation");
          }, 1000);
        }
      });

      feature.addEventListener("mouseleave", () => {
        feature.classList.remove("feature-highlight");
      });
    });
  }

  // Function to create dynamic particles for Africa map background
  function createAfricaMapParticles() {
    if (!africaSection) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.className = "africa-particles";
    africaSection.appendChild(particlesContainer);

    // Create 15 particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "map-particle";

      // Random position, size and animation delay
      const size = Math.random() * 5 + 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particlesContainer.appendChild(particle);
    }
  }

  // Add toast notification for CTA buttons
  const ctaButtons = document.querySelectorAll(
    ".btn-hero, .main-cta, .btn-primary"
  );

  function createToast(message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      toastContainer.style.position = "fixed";
      toastContainer.style.bottom = "20px";
      toastContainer.style.right = "20px";
      toastContainer.style.zIndex = "1000";
      document.body.appendChild(toastContainer);
    }

    // Create toast notification
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.backgroundColor = "rgba(56, 161, 105, 0.9)";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "4px";
    toast.style.marginTop = "10px";
    toast.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.animation = "fadeInUp 0.3s ease-out forwards";
    toast.style.transition = "all 0.3s ease-in-out";

    // Add check icon
    const icon = document.createElement("i");
    icon.className = "bx bx-check-circle";
    icon.style.fontSize = "24px";
    icon.style.marginRight = "10px";

    const text = document.createElement("span");
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Add keyframe animation style for toast
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(style);
  // No event listeners for CTA buttons - allow direct redirects
  // Buttons will naturally navigate to their href destinations

  // Fix for CTA buttons visibility
  function ensureButtonsVisibility() {
    const heroCtaButtons = document.querySelectorAll(".hero-cta .btn");
    if (heroCtaButtons.length) {
      heroCtaButtons.forEach((button) => {
        button.style.display = "inline-block";
        button.style.opacity = "1";
        button.style.visibility = "visible";
      });
    }
  }

  // Run immediately
  ensureButtonsVisibility();

  // Also run after a short delay to ensure it works
  setTimeout(ensureButtonsVisibility, 500);
  setTimeout(ensureButtonsVisibility, 1000);

  // Ensure buttons visibility after window load
  window.addEventListener("load", ensureButtonsVisibility);
});
