/**
 * Aderoju Olaide — Portfolio
 * Main JavaScript
 * ================================================
 * Handles: navigation, theme toggle, typing effect,
 * portfolio rendering with unique links, isotope filtering,
 * portfolio details page dynamic loading, scroll animations,
 * and all interactive behaviors.
 */
(function () {
  "use strict";

  /* ========================================
     Utility Helpers
     ======================================== */
  const select = (el, all = false) => {
    el = el.trim();
    return all
      ? [...document.querySelectorAll(el)]
      : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /* ========================================
     Theme Toggle (Dark / Light)
     ======================================== */
  const themeToggle = select("#themeToggle");
  if (themeToggle) {
    // Restore saved preference
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ========================================
     Navbar Active State on Scroll
     ======================================== */
  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* ========================================
     Smooth Scroll
     ======================================== */
  const scrollto = (el) => {
    const target = select(el);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  };

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        const body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          const navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /* ========================================
     Back to Top Button
     ======================================== */
  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /* ========================================
     Mobile Nav Toggle
     ======================================== */
  on("click", ".mobile-nav-toggle", function () {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /* ========================================
     Preloader
     ======================================== */
  const preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 500);
    });
  }

  /* ========================================
     Hero Typing Effect
     ======================================== */
  const roleElement = select("#job-role");
  if (roleElement) {
    const roles = [
      "UI/UX Designer",
      "Web Developer",
      "Graphics Designer",
      "Motion Graphics Artist",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function typeRole() {
      const currentRole = roles[roleIndex];
      if (typing) {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          typing = false;
          setTimeout(typeRole, 2000);
          return;
        }
      } else {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          typing = true;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeRole, typing ? 80 : 40);
    }
    typeRole();
  }

  /* ========================================
     Skills Animation
     ======================================== */
  const skillsContent = select(".skills-content");
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: "80%",
      handler: function () {
        const bars = select(".progress-bar", true);
        bars.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /* ========================================
     Dynamic Portfolio Rendering
     Each project gets its own unique link:
     portfolio-details.html?id=<projectId>
     ======================================== */
  const portfolioGrid = select("#portfolioGrid");
  if (portfolioGrid && typeof PROJECTS_DATA !== "undefined") {
    let html = "";
    PROJECTS_DATA.forEach((project, index) => {
      const detailUrl = `portfolio-details.html?id=${project.id}`;
      const techBadges = project.technologies
        .slice(0, 3)
        .map((t) => `<span class="tech-badge">${t}</span>`)
        .join("");

      html += `
        <div class="col-lg-4 col-md-6 portfolio-item ${project.filterClass}" data-aos="fade-up" data-aos-delay="${(index % 3) * 100 + 100}">
          <div class="portfolio-card">
            <div class="portfolio-card-image">
              <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" />
              <div class="portfolio-card-overlay">
                <div class="portfolio-card-actions">
                  <a href="${project.thumbnail}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${project.title}">
                    <i class="bi bi-zoom-in"></i>
                  </a>
                  <a href="${detailUrl}" title="Project Details">
                    <i class="bi bi-arrow-up-right"></i>
                  </a>
                  ${project.projectUrl && project.projectUrl !== "#"
                    ? `<a href="${project.projectUrl}" target="_blank" rel="noopener" title="Live Preview"><i class="bi bi-box-arrow-up-right"></i></a>`
                    : ""
                  }
                </div>
              </div>
            </div>
            <div class="portfolio-card-body">
              <span class="portfolio-card-category">${project.categoryLabel}</span>
              <h4 class="portfolio-card-title">${project.title}</h4>
              <div class="portfolio-card-techs">${techBadges}</div>
            </div>
          </div>
        </div>`;
    });
    portfolioGrid.innerHTML = html;
  }

  /* ========================================
     Isotope Filtering
     ======================================== */
  window.addEventListener("load", () => {
    const portfolioContainer = select("#portfolioGrid");
    if (portfolioContainer && typeof Isotope !== "undefined") {
      const iso = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
        transitionDuration: "0.6s",
      });

      const filterBtns = select(".filter-btn", true);
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          iso.arrange({ filter: btn.getAttribute("data-filter") });
          iso.on("arrangeComplete", () => {
            if (typeof AOS !== "undefined") AOS.refresh();
          });
        });
      });
    }
  });

  /* ========================================
     Portfolio Details Page — Dynamic Loading
     Reads ?id=<projectId> from URL and loads
     the correct project data.
     ======================================== */
  const detailTitle = select("#detailTitle");
  if (detailTitle && typeof PROJECTS_DATA !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get("id"), 10);
    const project = getProjectById(projectId);

    if (project) {
      // Set page title
      document.title = `${project.title} — Aderoju Olaide Portfolio`;

      // Populate header
      detailTitle.textContent = project.title;
      const detailCategory = select("#detailCategory");
      if (detailCategory) detailCategory.textContent = project.categoryLabel;

      // Populate slider
      const slider = select("#detailSlider");
      if (slider) {
        slider.innerHTML = project.images
          .map(
            (img) =>
              `<div class="swiper-slide"><img src="${img}" alt="${project.title}" /></div>`
          )
          .join("");
      }

      // Populate info
      const setValue = (id, val) => {
        const el = select(id);
        if (el) el.textContent = val;
      };
      setValue("#detailCategoryValue", project.categoryLabel);
      setValue("#detailClient", project.client);
      setValue("#detailDate", project.date);
      setValue("#detailDescription", project.description);

      // Technologies
      const techContainer = select("#detailTechnologies");
      if (techContainer) {
        techContainer.innerHTML = project.technologies
          .map((t) => `<span class="detail-tech-badge">${t}</span>`)
          .join("");
      }

      // Live link
      const liveLink = select("#detailLiveLink");
      if (liveLink) {
        if (project.projectUrl && project.projectUrl !== "#") {
          liveLink.href = project.projectUrl;
        } else {
          liveLink.style.opacity = "0.5";
          liveLink.style.pointerEvents = "none";
          liveLink.removeAttribute("href");
        }
      }

      // GitHub link
      const githubLink = select("#detailGithubLink");
      if (githubLink) {
        if (project.githubUrl) {
          githubLink.href = project.githubUrl;
          githubLink.style.display = "inline-flex";
        }
      }

      // Previous / Next navigation
      const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
      const prevProject = select("#prevProject");
      const nextProject = select("#nextProject");

      if (prevProject) {
        if (currentIndex > 0) {
          prevProject.href = `portfolio-details.html?id=${PROJECTS_DATA[currentIndex - 1].id}`;
        } else {
          prevProject.style.opacity = "0.4";
          prevProject.style.pointerEvents = "none";
        }
      }
      if (nextProject) {
        if (currentIndex < PROJECTS_DATA.length - 1) {
          nextProject.href = `portfolio-details.html?id=${PROJECTS_DATA[currentIndex + 1].id}`;
        } else {
          nextProject.style.opacity = "0.4";
          nextProject.style.pointerEvents = "none";
        }
      }
    } else {
      // Project not found — redirect to portfolio
      detailTitle.textContent = "Project Not Found";
      const desc = select("#detailDescription");
      if (desc) desc.textContent = "This project could not be found. Redirecting...";
      setTimeout(() => {
        window.location.href = "index.html#portfolio";
      }, 2000);
    }
  }

  /* ========================================
     Portfolio Lightbox
     ======================================== */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".portfolio-lightbox" });
    GLightbox({
      selector: ".portfolio-details-lightbox",
      width: "90%",
      height: "90vh",
    });
  }

  /* ========================================
     Swiper: Portfolio Details Slider
     ======================================== */
  if (select(".portfolio-details-slider")) {
    new Swiper(".portfolio-details-slider", {
      speed: 500,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  /* ========================================
     Swiper: Testimonials Slider
     ======================================== */
  if (select(".testimonials-slider")) {
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: "auto",
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 24 },
      },
    });
  }

  /* ========================================
     AOS — Animate on Scroll
     ======================================== */
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        mirror: false,
        offset: 60,
      });
    }
  });

  /* ========================================
     PureCounter
     ======================================== */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /* ========================================
     Footer Year
     ======================================== */
  const yearEl = select("#currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
