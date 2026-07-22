document.addEventListener("DOMContentLoaded", () => {
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
