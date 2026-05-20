import data from "../db/db.js";

/* ══════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════ */
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* ══════════════════════════════════════════════════════
   STATS BAR
   ══════════════════════════════════════════════════════ */
function populateStats() {
  const bar = document.getElementById("statsBar");
  if (!bar) return;
  data.stats.forEach(s => {
    const item = el("div", "stat-item");
    item.appendChild(el("div", "stat-number", s.number));
    item.appendChild(el("div", "stat-label", s.label));
    bar.appendChild(item);
  });
}

/* ══════════════════════════════════════════════════════
   ABOUT TEXT
   ══════════════════════════════════════════════════════ */
function populateAbout() {
  const aboutText = document.getElementById("aboutText");
  if (aboutText) aboutText.textContent = data.bio.about;
}

/* ══════════════════════════════════════════════════════
   SKILLS
   ══════════════════════════════════════════════════════ */
function populateSkills() {
  const container = document.getElementById("skillsContainer");
  if (!container) return;
  Object.entries(data.skills).forEach(([groupName, items]) => {
    const group = el("div", "skill-group");
    group.appendChild(el("div", "skill-group-title", groupName));
    const tags = el("div", "skill-tags");
    items.forEach(skill => tags.appendChild(el("span", "skill-tag", skill)));
    group.appendChild(tags);
    container.appendChild(group);
  });
}

/* ══════════════════════════════════════════════════════
   EXPERIENCE TIMELINE
   ══════════════════════════════════════════════════════ */
function populateExperience() {
  const timeline = document.getElementById("experienceTimeline");
  if (!timeline) return;

  data.experience.forEach(job => {
    const card = el("div", "timeline-card reveal");

    // Header
    const header = el("div", "timeline-card-header");
    const left = el("div");
    left.appendChild(el("div", "timeline-card-title", job.title));
    left.appendChild(el("div", "timeline-card-company", job.company));
    left.appendChild(el("div", "timeline-card-meta", job.location));
    header.appendChild(left);
    header.appendChild(el("div", "timeline-card-date", job.duration));
    card.appendChild(header);

    // Bullets
    const ul = el("ul");
    job.details.forEach(d => {
      const li = el("li");
      li.innerHTML = d;
      ul.appendChild(li);
    });
    card.appendChild(ul);

    // Tags
    const tags = el("div", "timeline-tags");
    job.tags.forEach(t => tags.appendChild(el("span", "tag", t)));
    card.appendChild(tags);

    timeline.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   EDUCATION
   ══════════════════════════════════════════════════════ */
function populateEducation() {
  const row = document.getElementById("educationRow");
  if (!row) return;

  const label = el("div", "section-label", "Education");
  label.style.marginTop = "3rem";
  row.appendChild(label);

  data.education.forEach(edu => {
    const card = el("div", "edu-card reveal");

    const left = el("div", "edu-card-left");
    left.appendChild(el("h3", null, edu.degree));
    left.appendChild(el("p", null, edu.school));
    card.appendChild(left);

    const right = el("div", "edu-card-right");
    right.appendChild(el("div", "edu-date", edu.duration));
    right.appendChild(el("div", "edu-grade", edu.grade));
    card.appendChild(right);

    row.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   WHAT I'VE BUILT
   ══════════════════════════════════════════════════════ */
function populateBuilt() {
  const grid = document.getElementById("builtGrid");
  if (!grid) return;

  data.built.forEach(item => {
    const card = el("div", "built-card reveal");
    card.appendChild(el("div", "built-card-icon", item.icon));
    card.appendChild(el("div", "built-card-tag", item.tag));
    card.appendChild(el("h3", null, item.title));
    card.appendChild(el("p", null, item.description));
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   CASE STUDIES
   ══════════════════════════════════════════════════════ */
function populateCaseStudies() {
  const grid = document.getElementById("caseGrid");
  if (!grid) return;

  data.caseStudies.forEach(cs => {
    const card = el("div", "case-card reveal");

    const img = el("img", "case-card-img");
    img.src = cs.image;
    img.alt = cs.title;
    img.loading = "lazy";
    // Fallback background if image missing
    img.onerror = () => { img.style.display = "none"; };
    card.appendChild(img);

    const body = el("div", "case-card-body");
    body.appendChild(el("div", "case-card-tag", cs.tag));
    body.appendChild(el("h3", null, cs.title));
    body.appendChild(el("p", null, cs.description));

    const link = el("a", "case-card-link", "Read Case Study →");
    link.href = cs.link;
    link.target = "_blank";
    body.appendChild(link);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   COMMUNITY
   ══════════════════════════════════════════════════════ */
function populateCommunity() {
  const grid = document.getElementById("communityGrid");
  if (!grid) return;

  data.community.forEach(c => {
    const card = el("div", "community-card reveal");

    card.appendChild(el("div", "community-icon", c.icon));

    const info = el("div", "community-info");
    info.appendChild(el("h3", null, c.title));
    info.appendChild(el("div", "community-role", c.role));
    info.appendChild(el("div", "community-duration", c.duration));
    info.appendChild(el("p", null, c.description));
    card.appendChild(info);

    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   ACHIEVEMENTS
   ══════════════════════════════════════════════════════ */
function populateAchievements() {
  const grid = document.getElementById("achGrid");
  if (!grid) return;

  data.achievements.forEach(a => {
    const card = el("div", "ach-card reveal");

    const img = el("img");
    img.src = a.image;
    img.alt = a.title;
    img.loading = "lazy";
    img.onerror = () => { img.style.display = "none"; };
    card.appendChild(img);

    const info = el("div", "ach-info");
    info.appendChild(el("h3", null, a.title));
    info.appendChild(el("p", null, a.description));

    const link = el("a", "ach-link", a.linkText);
    link.href = a.link;
    link.target = "_blank";
    info.appendChild(link);

    card.appendChild(info);
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   NAV — scroll spy + hamburger
   ══════════════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const navMobile = document.getElementById("navMobile");

  // Scrolled class
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  hamburger && hamburger.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });

  // Close mobile nav on link click
  document.querySelectorAll(".nav-mobile-link").forEach(link => {
    link.addEventListener("click", () => navMobile.classList.remove("open"));
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════
   TABS — Product Work
   ══════════════════════════════════════════════════════ */
function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById("tab-" + tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
}

/* ══════════════════════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════════════════════ */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe all .reveal elements (populated after DOM updates)
  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }, 100);
}

/* ══════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  populateStats();
  populateAbout();
  populateSkills();
  populateExperience();
  populateEducation();
  populateBuilt();
  populateCaseStudies();
  populateCommunity();
  populateAchievements();
  initNav();
  initTabs();
  initReveal();
});
