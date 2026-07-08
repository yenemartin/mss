const visualSlides = Array.from(document.querySelectorAll(".visual-card"));
const visualDots = Array.from(document.querySelectorAll(".visual-dot"));
const fullscreenImages = Array.from(document.querySelectorAll("[data-fullscreen='true']"));
const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxPrev = document.querySelector("#lightboxPrev");
const lightboxNext = document.querySelector("#lightboxNext");

if (visualSlides.length && visualDots.length) {
  let activeVisualIndex = 0;
  let visualTimerId = null;

  const renderVisual = (index) => {
    activeVisualIndex = index;

    visualSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    visualDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  const startVisualRotation = () => {
    clearInterval(visualTimerId);
    visualTimerId = window.setInterval(() => {
      const nextIndex = (activeVisualIndex + 1) % visualSlides.length;
      renderVisual(nextIndex);
    }, 3600);
  };

  visualDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      renderVisual(index);
      startVisualRotation();
    });
  });

  renderVisual(0);
  startVisualRotation();
}

if (lightbox && lightboxImage && lightboxClose && lightboxPrev && lightboxNext && fullscreenImages.length) {
  let activeLightboxIndex = 0;
  let lightboxTimerId = null;

  const renderLightboxImage = (index) => {
    activeLightboxIndex = (index + fullscreenImages.length) % fullscreenImages.length;
    const image = fullscreenImages[activeLightboxIndex];
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
  };

  const startLightboxRotation = () => {
    clearInterval(lightboxTimerId);
    lightboxTimerId = window.setInterval(() => {
      renderLightboxImage(activeLightboxIndex + 1);
    }, 3200);
  };

  const closeLightbox = () => {
    clearInterval(lightboxTimerId);
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  };

  fullscreenImages.forEach((image) => {
    image.addEventListener("click", () => {
      activeLightboxIndex = fullscreenImages.indexOf(image);
      renderLightboxImage(activeLightboxIndex);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      startLightboxRotation();
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => {
    renderLightboxImage(activeLightboxIndex - 1);
    startLightboxRotation();
  });
  lightboxNext.addEventListener("click", () => {
    renderLightboxImage(activeLightboxIndex + 1);
    startLightboxRotation();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }

    if (event.key === "ArrowLeft" && !lightbox.hidden) {
      renderLightboxImage(activeLightboxIndex - 1);
      startLightboxRotation();
    }

    if (event.key === "ArrowRight" && !lightbox.hidden) {
      renderLightboxImage(activeLightboxIndex + 1);
      startLightboxRotation();
    }
  });
}
