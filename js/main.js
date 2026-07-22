document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const setLabel = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const label = isDark ? "Switch to light mode" : "Switch to dark mode";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    };

    setLabel();

    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setLabel();
    });
  }

  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.classList.toggle("active");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("active");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  const lightbox = document.querySelector("#lightbox");
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (lightbox && galleryItems.length) {
    const images = Array.from(galleryItems).map((item) => {
      const img = item.querySelector("img");
      return { src: img.src, alt: img.alt };
    });
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const counter = lightbox.querySelector(".lightbox-counter");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    let currentIndex = 0;
    let lastFocused = null;

    const render = () => {
      const item = images[currentIndex];
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    };

    const openLightbox = (index, trigger) => {
      currentIndex = index;
      lastFocused = trigger;
      render();
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      render();
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % images.length;
      render();
    };

    galleryItems.forEach((item, index) => {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", "View larger image");
      item.addEventListener("click", () => openLightbox(index, item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(index, item);
        }
      });
    });

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });
  }

  const quoteForm = document.querySelector("#quote-form");
  if (quoteForm) {
    const validators = {
      name: (v) => v.trim().length >= 2 || "Please enter your full name.",
      phone: (v) => /^\+?[0-9\s-]{7,15}$/.test(v.trim()) || "Enter a valid phone number.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
      product: (v) => v !== "" || "Please select a product.",
      quantity: (v) => v.trim().length > 0 || "Please tell us how much you need.",
    };

    const showError = (field, message) => {
      const errorEl = quoteForm.querySelector(`[data-error-for="${field.id}"]`);
      if (errorEl) errorEl.textContent = message || "";
      field.classList.toggle("invalid", Boolean(message));
    };

    const validateField = (field) => {
      const validator = validators[field.name];
      if (!validator) return true;
      const result = validator(field.value);
      if (result === true) {
        showError(field, "");
        return true;
      }
      showError(field, result);
      return false;
    };

    Object.keys(validators).forEach((name) => {
      const field = quoteForm.querySelector(`[name="${name}"]`);
      if (!field) return;
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("invalid")) validateField(field);
      });
      field.addEventListener("change", () => {
        if (field.classList.contains("invalid")) validateField(field);
      });
    });

    quoteForm.addEventListener("submit", (e) => {
      let isValid = true;
      let firstInvalid = null;
      Object.keys(validators).forEach((name) => {
        const field = quoteForm.querySelector(`[name="${name}"]`);
        if (field && !validateField(field)) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });
      if (!isValid) {
        e.preventDefault();
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  document.querySelectorAll(".faq-item").forEach((details) => {
    const summary = details.querySelector("summary");
    const content = details.querySelector(".faq-content");
    if (!summary || !content) return;

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      if (details.open) {
        const startHeight = content.scrollHeight;
        content.style.height = startHeight + "px";
        requestAnimationFrame(() => {
          content.style.height = "0px";
        });
        content.addEventListener(
          "transitionend",
          function handler() {
            details.open = false;
            content.style.height = "";
            content.removeEventListener("transitionend", handler);
          },
          { once: true }
        );
      } else {
        details.open = true;
        const endHeight = content.scrollHeight;
        content.style.height = "0px";
        requestAnimationFrame(() => {
          content.style.height = endHeight + "px";
        });
        content.addEventListener(
          "transitionend",
          function handler() {
            content.style.height = "";
            content.removeEventListener("transitionend", handler);
          },
          { once: true }
        );
      }
    });
  });
});
