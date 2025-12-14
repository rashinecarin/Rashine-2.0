// script.js — FINAL, STABLE VERSION (no conflicts)

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     FOOTER YEAR
     ===================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* =====================
     GALLERY MODAL
     ===================== */
  const modal = document.getElementById("imageModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.querySelector(".modal-close");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");

  function openModal(img) {
    if (!modal) return;

    modalImage.src = img.src;
    modalTitle.textContent =
      img.closest("figure")?.querySelector("figcaption")?.textContent || "";
    modalText.textContent = img.dataset.description || "";

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    modalImage.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".image-card img").forEach(img => {
    img.addEventListener("click", () => openModal(img));
  });

  modalBackdrop?.addEventListener("click", closeModal);
  modalClose?.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal?.style.display === "flex") {
      closeModal();
    }
  });

  /* =====================
     JOURNAL ANIMATION
     ===================== */
  const journalEntries = document.querySelectorAll(".journal-entry");
  if ("IntersectionObserver" in window) {
    const journalObserver = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });

    journalEntries.forEach(j => journalObserver.observe(j));
  }

  /* =====================
     CERTIFICATE ANIMATION
     ===================== */
  const certCards = document.querySelectorAll(".certificate-card");
  if ("IntersectionObserver" in window) {
    const certObserver = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });

    certCards.forEach(c => certObserver.observe(c));
  }

  /* =====================
     ACTIVE NAV LINK
     ===================== */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });

  /* =====================
     CERTIFICATE LIGHTBOX
     ===================== */
  const certLightbox = document.getElementById("certLightbox");
  const certLightboxImg = document.getElementById("certLightboxImg");
  const certBackdrop = document.querySelector(".cert-backdrop");
  const certClose = document.querySelector(".cert-close");

  if (certLightbox && certLightboxImg) {
    document.querySelectorAll(".certificate-card img").forEach(img => {
      img.addEventListener("click", () => {
        certLightboxImg.src = img.src;
        certLightbox.classList.add("show");
        document.body.style.overflow = "hidden";
      });
    });

    function closeCertLightbox() {
      certLightbox.classList.remove("show");
      certLightboxImg.src = "";
      document.body.style.overflow = "";
    }

    certBackdrop?.addEventListener("click", closeCertLightbox);
    certClose?.addEventListener("click", closeCertLightbox);

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && certLightbox.classList.contains("show")) {
        closeCertLightbox();
      }
    });
  }

});
