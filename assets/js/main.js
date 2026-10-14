/**
 * Aderoju Olaide — Portfolio
 * Main JavaScript
 * ================================================
 * Handles: nav tone + active link, scroll reveals,
 * word-by-word headings, counters, draggable stickers,
 * the portfolio carousel with unique project links,
 * portfolio details page dynamic loading, and the
 * small footer details.
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

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");

  /* ========================================
     Nav — tone follows the section beneath it,
     and the current section's link is marked
     ======================================== */
  const nav = select("#nav");
  const tonedSections = select("main .tone-light, main .tone-dark", true);
  const navLinks = select(".nav__links a", true);

  if (nav && tonedSections.length) {
    const updateNav = () => {
      const navRect = nav.getBoundingClientRect();
      const navMid = navRect.top + navRect.height / 2;
      const under = tonedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= navMid && rect.bottom > navMid;
      });
      nav.dataset.tone = under && under.classList.contains("tone-light") ? "light" : "dark";

      const readLine = window.innerHeight * 0.4;
      navLinks.forEach((link) => {
        const section = select(link.hash);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const current = rect.top <= readLine && rect.bottom > readLine;
        if (current) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    let navTicking = false;
    const requestNavUpdate = () => {
      if (navTicking) return;
      navTicking = true;
      requestAnimationFrame(() => {
        navTicking = false;
        updateNav();
      });
    };
    window.addEventListener("scroll", requestNavUpdate, { passive: true });
    window.addEventListener("resize", requestNavUpdate);
    window.addEventListener("load", updateNav);
    updateNav();
  }

  /* ========================================
     Headings — wrap each word so CSS can
     bring them in one by one
     ======================================== */
  const splitWords = (node, counter) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(" "));
            return;
          }
          const word = document.createElement("span");
          word.className = "w";
          word.style.setProperty("--i", counter.i++);
          word.textContent = part;
          fragment.appendChild(word);
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        splitWords(child, counter);
      }
    });
  };

  select("[data-split]", true).forEach((heading) => {
    if (!reduceMotion) splitWords(heading, { i: 0 });
    heading.classList.add("is-split");
  });

  /* ========================================
     Counters
     ======================================== */
  const countUp = (el) => {
    const end = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    if (reduceMotion) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (end * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ========================================
     Reveal on Scroll
     ======================================== */
  const revealTargets = select("[data-reveal], [data-split], [data-observe]", true);

  // Siblings that reveal together get a small stagger
  select("[data-reveal]", true).forEach((el) => {
    const siblings = [...el.parentElement.children].filter((s) => s.hasAttribute("data-reveal"));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--d", Math.min(index, 5) * 0.08 + "s");
  });

  const reveal = (el) => {
    el.classList.add("is-in");
    el.querySelectorAll("[data-count]").forEach(countUp);
  };

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach(reveal);
  }

  /* ========================================
     Hero Stickers — pick them up with a mouse
     ======================================== */
  let stickerZ = 10;
  select(".sticker", true).forEach((sticker, index) => {
    sticker.style.setProperty("--n", index);
    let grab = null;
    let x = 0;
    let y = 0;

    sticker.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      e.preventDefault();
      sticker.setPointerCapture(e.pointerId);
      grab = { x: e.clientX - x, y: e.clientY - y };
      sticker.style.zIndex = ++stickerZ;
      sticker.classList.add("is-held");
    });

    sticker.addEventListener("pointermove", (e) => {
      if (!grab) return;
      x = e.clientX - grab.x;
      y = e.clientY - grab.y;
      sticker.style.setProperty("--dx", x + "px");
      sticker.style.setProperty("--dy", y + "px");
    });

    const release = () => {
      grab = null;
      sticker.classList.remove("is-held");
    };
    sticker.addEventListener("pointerup", release);
    sticker.addEventListener("pointercancel", release);
  });

  /* ========================================
     Portfolio Carousel
     Each project gets its own unique link:
     portfolio-details.html?id=<projectId>
     ======================================== */
  const track = select("#workTrack");
  if (track && typeof PROJECTS_DATA !== "undefined") {
    track.innerHTML = PROJECTS_DATA.map((project, index) => {
      const detailUrl = `portfolio-details.html?id=${project.id}`;
      const isPhone = project.layout === "phone";
      const hasLiveUrl = project.projectUrl && project.projectUrl !== "#";
      const mediaSrc = isPhone && project.backdrop ? project.backdrop : project.thumbnail;
      const mediaStyle = project.thumbPosition ? ` style="object-position: ${project.thumbPosition}"` : "";
      const externalBtn = (url, label, icon) =>
        `<a href="${url}" class="btn btn--glass btn--icon" target="_blank" rel="noopener" aria-label="${label}" title="${label}" draggable="false"><i class="bi ${icon}"></i></a>`;

      return `
        <article class="work-card${isPhone ? " work-card--phone" : ""}" data-category="${[].concat(project.category).join(" ")}">
          <div class="work-card__media">
            <img src="${mediaSrc}" alt="${isPhone ? "" : project.title}" loading="lazy" decoding="async" draggable="false"${mediaStyle} />
          </div>
          ${isPhone
            ? `<div class="work-card__phone"><img src="${project.thumbnail}" alt="${project.title}" loading="lazy" decoding="async" draggable="false" /></div>`
            : ""
          }
          <div class="work-card__shade"></div>
          <div class="work-card__badges">
            <span class="work-card__index">${pad(index + 1)}</span>
            ${project.featured ? `<span class="work-card__featured"><i class="bi bi-star-fill"></i> Featured</span>` : ""}
          </div>
          <span class="work-card__cat">${project.categoryLabel}</span>
          <div class="work-card__foot">
            <div class="work-card__meta">
              <h3 class="work-card__title">${project.title}</h3>
              <p class="work-card__client">${project.tagline || project.client}</p>
              <p class="work-card__date">${project.date}</p>
            </div>
            <div class="work-card__actions">
              <a href="${detailUrl}" class="btn btn--glass" draggable="false"><i class="bi bi-bounding-box"></i> Case study</a>
              ${hasLiveUrl
                ? externalBtn(project.projectUrl, `Live site of ${project.title}`, "bi-arrow-up-right")
                : project.figmaUrl
                  ? externalBtn(project.figmaUrl, `${project.title} in Figma`, "bi-vector-pen")
                  : ""
              }
              ${project.githubUrl ? externalBtn(project.githubUrl, `${project.title} on GitHub`, "bi-github") : ""}
            </div>
          </div>
        </article>`;
    }).join("");

    const cards = select(".work-card", true);
    const prevBtn = select("#workPrev");
    const nextBtn = select("#workNext");
    const currentEl = select("#workCurrent");
    const totalEl = select("#workTotal");
    const barEl = select("#workBar");
    const visibleCards = () => cards.filter((card) => !card.hidden);
    let activeCard = null;

    const goTo = (card) => {
      if (!card) return;
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    // The card closest to the centre of the track is the one in focus
    const updateActive = (force = false) => {
      const shown = visibleCards();
      const trackRect = track.getBoundingClientRect();
      const centre = trackRect.left + trackRect.width / 2;
      let closest = null;
      let closestDistance = Infinity;
      shown.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - centre);
        if (distance < closestDistance) {
          closest = card;
          closestDistance = distance;
        }
      });
      if (closest === activeCard && !force) return;

      activeCard = closest;
      cards.forEach((card) => card.classList.toggle("is-active", card === closest));
      const position = shown.indexOf(closest);
      if (currentEl) currentEl.textContent = pad(position + 1);
      if (totalEl) totalEl.textContent = pad(shown.length);
      if (barEl) barEl.style.width = ((position + 1) / shown.length) * 100 + "%";
      if (prevBtn) prevBtn.disabled = position <= 0;
      if (nextBtn) nextBtn.disabled = position >= shown.length - 1;
    };

    const step = (direction) => {
      const shown = visibleCards();
      goTo(shown[shown.indexOf(activeCard) + direction]);
    };

    let trackTicking = false;
    track.addEventListener(
      "scroll",
      () => {
        if (trackTicking) return;
        trackTicking = true;
        requestAnimationFrame(() => {
          trackTicking = false;
          updateActive();
        });
      },
      { passive: true }
    );
    window.addEventListener("resize", () => updateActive(true));
    window.addEventListener("load", () => updateActive(true));

    if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => step(1));
    track.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    });

    // Tabbing into a side card brings it to the centre
    cards.forEach((card) => {
      card.addEventListener("focusin", () => {
        if (card !== activeCard) goTo(card);
      });
    });

    // Drag to scroll with a mouse; touch and trackpads scroll natively
    let drag = null;
    let suppressClick = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false };
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        track.classList.add("is-dragging", "no-snap");
      }
      if (drag.moved) track.scrollLeft = drag.left - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      if (!moved) return;
      suppressClick = true;
      setTimeout(() => (suppressClick = false), 50);
      track.classList.remove("is-dragging");
      goTo(activeCard);
      setTimeout(() => track.classList.remove("no-snap"), 600);
    });

    // Clicking a side card focuses it instead of following its links
    track.addEventListener(
      "click",
      (e) => {
        if (suppressClick) {
          suppressClick = false;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        const card = e.target.closest(".work-card");
        if (card && card !== activeCard) {
          e.preventDefault();
          goTo(card);
        }
      },
      true
    );

    // Category filters
    const filterBtns = select(".chip[data-filter]", true);
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        cards.forEach((card) => {
          card.hidden = filter !== "*" && !card.dataset.category.split(" ").includes(filter);
        });
        track.scrollLeft = 0;
        updateActive(true);
      });
    });

    updateActive(true);
  }

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
      if (project.role) {
        setValue("#detailRole", project.role);
      } else {
        const roleRow = select("#detailRole");
        if (roleRow) roleRow.closest(".detail-info-item").hidden = true;
      }

      // Technologies
      const techContainer = select("#detailTechnologies");
      if (techContainer) {
        techContainer.innerHTML = project.technologies
          .map((t) => `<span class="detail-tech-badge">${t}</span>`)
          .join("");
      }

      // External links — each button only shows when the project has that link
      const showLink = (id, url) => {
        const link = select(id);
        if (!link) return;
        if (url && url !== "#") {
          link.href = url;
          link.style.display = "inline-flex";
        } else {
          link.style.display = "none";
        }
      };
      showLink("#detailLiveLink", project.projectUrl);
      showLink("#detailGithubLink", project.githubUrl);
      showLink("#detailFigmaLink", project.figmaUrl);

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
     Swiper: Portfolio Details Slider
     ======================================== */
  const detailSlider = select(".portfolio-details-slider");
  if (detailSlider && typeof Swiper !== "undefined") {
    const slideCount = select("#detailSlider .swiper-slide", true).length;
    detailSlider.classList.toggle("is-single", slideCount < 2);
    const swiper = new Swiper(".portfolio-details-slider", {
      speed: 500,
      loop: slideCount > 1,
      autoHeight: true,
      pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
    // Slide heights depend on the images, so re-measure as they arrive
    select("#detailSlider img", true).forEach((img) => {
      if (!img.complete) img.addEventListener("load", () => swiper.updateAutoHeight(), { once: true });
    });
  }

  /* ========================================
     Footer — Local Time + Year
     ======================================== */
  const timeEl = select("#localTime");
  if (timeEl) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    });
    const updateTime = () => {
      timeEl.textContent = `· ${formatter.format(new Date())} WAT`;
    };
    updateTime();
    setInterval(updateTime, 30000);
  }

  const yearEl = select("#currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  window.__portfolioReady = true;
})();
