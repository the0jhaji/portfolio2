// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);

  // Add a smooth transition effect
  body.style.transition = "background-color 0.5s ease, color 0.5s ease";
  setTimeout(() => {
    body.style.transition = "";
  }, 500);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${theme === "light" ? "dark" : "light"} mode`
  );
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const navLinks = document.getElementById("nav-links");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Enhanced scroll effect to navigation
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const scrolled = window.pageYOffset > 100;

  if (scrolled) {
    header.style.backgroundColor = "rgba(var(--nav-bg), 0.95)";
    header.style.backdropFilter = "blur(20px)";
    header.style.boxShadow = "0 5px 30px var(--shadow)";
  } else {
    header.style.backgroundColor = "var(--nav-bg)";
    header.style.backdropFilter = "blur(10px)";
    header.style.boxShadow = "0 2px 20px var(--shadow)";
  }
});

// Contact form submission with enhanced feedback
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = this.querySelector(".submit-button");
    const originalText = submitButton.textContent;

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simple validation
    if (name && email && message) {
      // Show loading state
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Simulate sending (replace with actual API call)
      setTimeout(() => {
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// Enhanced intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered animation delay
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) rotateX(0deg)";
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all sections and cards
document
  .querySelectorAll(
    "section, .skill-card, .project-card, .education-item, .certificate-item"
  )
  .forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px) rotateX(10deg)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(element);
  });

// Typing effect for hero subtitle with enhanced features
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add blinking cursor effect
      element.innerHTML += '<span class="cursor">|</span>';
      setInterval(() => {
        const cursor = element.querySelector(".cursor");
        if (cursor) {
          cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
        }
      }, 500);
    }
  }

  type();
}

// Apply typing effect to hero subtitle
const heroSubtitle = document.querySelector(".hero-subtitle");
if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = "";
  setTimeout(() => {
    typeWriter(heroSubtitle, originalText);
  }, 1000);
}

// Parallax effect for floating elements
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  document
    .querySelectorAll(".floating-cube, .floating-sphere")
    .forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      element.style.transform += ` translateY(${rate * speed}px)`;
    });
});

// Mouse movement parallax for hero section
document.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  document
    .querySelectorAll(".floating-cube, .floating-sphere")
    .forEach((element, index) => {
      const speed = (index + 1) * 2;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      element.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Add loading animation on page load
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Animate skill cards with progress bars (optional enhancement)
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = "bounceIn 0.8s ease-out";
    }, index * 200);
  });
});

// Add bounceIn animation
const style = document.createElement("style");
style.textContent = `
  @keyframes bounceIn {
    0% { transform: scale(0.3) rotateX(90deg); opacity: 0; }
    50% { transform: scale(1.05) rotateX(0deg); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1) rotateX(0deg); opacity: 1; }
  }

  .cursor {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  body.loaded {
    animation: fadeInBody 0.5s ease-out;
  }

  @keyframes fadeInBody {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

// Add particle effect to hero section (optional)
function createParticles() {
  const heroSection = document.getElementById("hero");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    heroSection.appendChild(particle);
  }
}

// Create particle styles
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    animation: floatParticle linear infinite;
    top: -10px;
  }

  @keyframes floatParticle {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Certificate Gallery Modal Functionality
const certificateItems = document.querySelectorAll(".certificate-item");
const modal = document.createElement("div");
modal.className = "certificate-modal";
modal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close">&times;</button>
    <img src="" alt="Certificate" id="modal-image">
  </div>
`;
document.body.appendChild(modal);

const modalImage = modal.querySelector("#modal-image");
const modalClose = modal.querySelector(".modal-close");

// Open modal when certificate is clicked
certificateItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector(".certificate-image");
    if (img && img.style.display !== "none") {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Gallery Slideshow Functionality
class GallerySlideshow {
  constructor() {
    this.slideshowContainer = document.querySelector(".slideshow-container");
    if (!this.slideshowContainer) return;

    // Gallery images data - dynamically managed via DOM
    this.galleryImages = [
      {
        src: "images/1.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/2.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/3.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/4.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/5.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/6.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/7.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/8.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/9.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/10.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/11.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/12.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/13.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/14.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/15.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/16.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
      {
        src: "images/17.jpg",
        title: "Photography",
        description: "A beautiful photo",
      },
    ];

    this.currentSlide = 0;
    this.slideCount = this.galleryImages.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.createSlides();
    this.createIndicators();
    this.init();
  }

  createSlides() {
    // Create slides container reference
    const indicatorsContainer =
      this.slideshowContainer.querySelector(".indicators");

    // Create slides dynamically
    this.galleryImages.forEach((imageData, index) => {
      const slideDiv = document.createElement("div");
      slideDiv.className = `slide${index === 0 ? " active" : ""}`;

      const img = document.createElement("img");
      img.src = imageData.src;
      img.alt = `Gallery Image ${index + 1}`;
      img.loading = "lazy";
      // Add error handling for missing images
      img.onerror = function () {
        this.style.display = "none";
        const placeholder = document.createElement("div");
        placeholder.className = "image-placeholder";
        placeholder.innerHTML = `
          <div class="placeholder-content">
            <span>📷</span>
            <p>Image ${index + 1}</p>
          </div>
        `;
        this.parentNode.insertBefore(placeholder, this.nextSibling);
      };

      img.onload = function () {
        // Remove any existing placeholder if image loads successfully
        const placeholder = this.parentNode.querySelector(".image-placeholder");
        if (placeholder) {
          placeholder.remove();
        }
      };
      const overlayDiv = document.createElement("div");
      overlayDiv.className = "slide-overlay";

      const title = document.createElement("h3");
      title.textContent = imageData.title;

      const description = document.createElement("p");
      description.textContent = imageData.description;

      overlayDiv.appendChild(title);
      overlayDiv.appendChild(description);

      slideDiv.appendChild(img);
      slideDiv.appendChild(overlayDiv);

      // Insert slide before the indicators container
      this.slideshowContainer.insertBefore(slideDiv, indicatorsContainer);
    });

    // Update DOM references after creating slides
    this.slides = document.querySelectorAll(".slide");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.indicators = document.querySelectorAll(".indicator");
  }

  createIndicators() {
    const indicatorsContainer =
      this.slideshowContainer.querySelector(".indicators");

    // Clear existing indicators
    indicatorsContainer.innerHTML = "";

    // Create indicators dynamically
    this.galleryImages.forEach((_, index) => {
      const indicator = document.createElement("span");
      indicator.className = `indicator${index === 0 ? " active" : ""}`;
      indicator.setAttribute("data-slide", index);
      indicatorsContainer.appendChild(indicator);
    });

    // Update indicators reference
    this.indicators = document.querySelectorAll(".indicator");
  }

  init() {
    this.showSlide(this.currentSlide);
    this.bindEvents();
    this.startAutoPlay();
  }

  bindEvents() {
    // Navigation buttons
    this.prevBtn.addEventListener("click", () => {
      this.prevSlide();
      this.resetAutoPlay();
    });

    this.nextBtn.addEventListener("click", () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    // Indicators - bind events to dynamically created indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });

    // Pause on hover
    this.slideshowContainer.addEventListener("mouseenter", () => {
      this.stopAutoPlay();
    });

    this.slideshowContainer.addEventListener("mouseleave", () => {
      this.startAutoPlay();
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    this.slideshowContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.slideshowContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        // Minimum swipe distance
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
        this.resetAutoPlay();
      }
    });
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.indicators.forEach((indicator) =>
      indicator.classList.remove("active")
    );

    // Show current slide
    this.slides[index].classList.add("active");
    this.indicators[index].classList.add("active");

    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slideCount;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // Method to update gallery images dynamically
  updateGallery(newImages) {
    this.galleryImages = newImages;
    this.slideCount = this.galleryImages.length;
    this.currentSlide = 0;

    // Remove existing slides and indicators
    this.slides.forEach((slide) => slide.remove());
    this.indicators.forEach((indicator) => indicator.remove());

    // Recreate slides and indicators
    this.createSlides();
    this.createIndicators();

    // Rebind events
    this.bindEvents();

    // Show first slide
    this.showSlide(0);

    // Restart autoplay
    this.resetAutoPlay();
  }

  // Method to add a single image to the gallery
  addImage(imageData) {
    this.galleryImages.push(imageData);
    this.slideCount = this.galleryImages.length;

    // Create new slide
    const indicatorsContainer =
      this.slideshowContainer.querySelector(".indicators");
    const newSlide = this.createSlideElement(imageData, this.slideCount - 1);

    // Insert slide before indicators
    this.slideshowContainer.insertBefore(newSlide, indicatorsContainer);

    // Create new indicator
    const newIndicator = document.createElement("span");
    newIndicator.className = "indicator";
    newIndicator.setAttribute("data-slide", this.slideCount - 1);
    indicatorsContainer.appendChild(newIndicator);

    // Update DOM references
    this.slides = document.querySelectorAll(".slide");
    this.indicators = document.querySelectorAll(".indicator");

    // Bind event to new indicator
    newIndicator.addEventListener("click", () => {
      this.goToSlide(this.slideCount - 1);
      this.resetAutoPlay();
    });
  }

  // Helper method to create slide element
  createSlideElement(imageData, index) {
    const slideDiv = document.createElement("div");
    slideDiv.className = "slide";

    const img = document.createElement("img");
    img.src = imageData.src;
    img.alt = `Gallery Image ${index + 1}`;
    img.loading = "lazy";

    // Add error handling for missing images
    img.onerror = function () {
      this.style.display = "none";
      const placeholder = document.createElement("div");
      placeholder.className = "image-placeholder";
      placeholder.innerHTML = `
        <div class="placeholder-content">
          <span>📷</span>
          <p>Image ${index + 1}</p>
        </div>
      `;
      this.parentNode.insertBefore(placeholder, this.nextSibling);
    };

    img.onload = function () {
      // Remove any existing placeholder if image loads successfully
      const placeholder = this.parentNode.querySelector(".image-placeholder");
      if (placeholder) {
        placeholder.remove();
      }
    };

    const overlayDiv = document.createElement("div");
    overlayDiv.className = "slide-overlay";

    const title = document.createElement("h3");
    title.textContent = imageData.title;

    const description = document.createElement("p");
    description.textContent = imageData.description;

    overlayDiv.appendChild(title);
    overlayDiv.appendChild(description);

    slideDiv.appendChild(img);
    slideDiv.appendChild(overlayDiv);

    return slideDiv;
  }
}

// Initialize slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GallerySlideshow();
});
