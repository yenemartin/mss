const visualSlides = Array.from(document.querySelectorAll(".visual-card"));
const visualDots = Array.from(document.querySelectorAll(".hero__visuals .visual-dot"));
const visualPrev = document.querySelector("#visualPrev");
const visualNext = document.querySelector("#visualNext");

const productSlides = Array.from(document.querySelectorAll(".product-track .product-card"));
const productDots = Array.from(document.querySelectorAll(".visual-dots--products .visual-dot"));
const productPrev = document.querySelector("#productPrev");
const productNext = document.querySelector("#productNext");
const siteMenu = document.querySelector(".site-menu");
const siteMenuLinks = Array.from(document.querySelectorAll(".site-menu__panel a"));

const fullscreenImages = Array.from(document.querySelectorAll("[data-fullscreen='true']"));
const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxPrev = document.querySelector("#lightboxPrev");
const lightboxNext = document.querySelector("#lightboxNext");

const setupCarousel = ({ slides, dots, prevButton, nextButton, intervalMs }) => {
  if (!slides.length) {
    return null;
  }

  let activeIndex = 0;
  let timerId = 0;

  const render = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-pressed", String(dotIndex === activeIndex));
    });
  };

  const stopRotation = () => {
    window.clearTimeout(timerId);
  };

  const startRotation = () => {
    if (slides.length < 2) {
      return;
    }

    stopRotation();
    timerId = window.setTimeout(() => {
      render(activeIndex + 1);
      startRotation();
    }, intervalMs);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      render(index);
      startRotation();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      render(activeIndex - 1);
      startRotation();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      render(activeIndex + 1);
      startRotation();
    });
  }

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", stopRotation);
    slide.addEventListener("mouseleave", startRotation);
  });

  render(0);
  startRotation();

  return {
    stopRotation,
    startRotation,
  };
};

setupCarousel({
  slides: visualSlides,
  dots: visualDots,
  prevButton: visualPrev,
  nextButton: visualNext,
  intervalMs: 3600,
});

setupCarousel({
  slides: productSlides,
  dots: productDots,
  prevButton: productPrev,
  nextButton: productNext,
  intervalMs: 4200,
});

if (siteMenu && siteMenuLinks.length) {
  siteMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.open = false;
    });
  });
}

if (lightbox && lightboxImage && lightboxClose && lightboxPrev && lightboxNext && fullscreenImages.length) {
  let activeLightboxIndex = 0;
  let lightboxTimerId = 0;

  const renderLightboxImage = (index) => {
    activeLightboxIndex = (index + fullscreenImages.length) % fullscreenImages.length;
    const image = fullscreenImages[activeLightboxIndex];
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
  };

  const stopLightboxRotation = () => {
    window.clearTimeout(lightboxTimerId);
  };

  const startLightboxRotation = () => {
    stopLightboxRotation();
    lightboxTimerId = window.setTimeout(() => {
      renderLightboxImage(activeLightboxIndex + 1);
      startLightboxRotation();
    }, 3200);
  };

  const closeLightbox = () => {
    stopLightboxRotation();
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  };

  fullscreenImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      renderLightboxImage(index);
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
