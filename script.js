const visualSlides = Array.from(document.querySelectorAll(".visual-card"));
const visualDots = Array.from(document.querySelectorAll(".hero__visuals .visual-dot"));
const visualPrev = document.querySelector("#visualPrev");
const visualNext = document.querySelector("#visualNext");
const productSlides = Array.from(document.querySelectorAll(".product-track .product-card"));
const productDots = Array.from(document.querySelectorAll(".visual-dots--products .visual-dot"));
const productPrev = document.querySelector("#productPrev");
const productNext = document.querySelector("#productNext");
const fullscreenImages = Array.from(document.querySelectorAll("[data-fullscreen='true']"));
const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxPrev = document.querySelector("#lightboxPrev");
const lightboxNext = document.querySelector("#lightboxNext");

const setupCarousel = ({ slides, dots, prevButton, nextButton, intervalMs }) => {
  if (!slides.length) {
    return;
  }

  let activeIndex = 0;
  let timerId = 0;

  const render = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      if ("tabIndex" in slide) {
        slide.tabIndex = isActive ? 0 : -1;
      }
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  const startRotation = () => {
    if (slides.length < 2) {
      return;
    }

    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      render(activeIndex + 1);
      startRotation();
    }, intervalMs);
  };

  const stopRotation = () => {
    window.clearTimeout(timerId);
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
};
