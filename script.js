// Update this object to change the profile, projects, skills and contacts.
// The page renders itself from this data — no HTML edits needed.
const portfolioData = {
  profile: {
    name: "Vladyslav",
    shortName: "Vladyslav",
    title: "Web Developer",
    availability: "Available for freelance projects",
    intro:
      "From polished business sites to interactive digital products, I turn ideas into fast, responsive web experiences.",
    aboutLead:
      "I design and build responsive websites that feel considered — fast, clear, and easy to use.",
    aboutPoints: [
      "One person handling both design and development — nothing lost in handoff.",
      "Every interface is checked across breakpoints, not just designed for desktop.",
      "A modern workflow, accelerated by AI-assisted tools, without cutting corners on detail.",
    ],
    // Add or reorder contact methods here. url is the clickable target,
    // value is the visible text.
    contacts: [
      { label: "Telegram", value: "@vr_8kk", url: "https://t.me/vr_8kk" },
      { label: "Email", value: "vladender218@gmail.com", url: "mailto:vladender218@gmail.com" },
      { label: "WhatsApp", value: "+45 50 65 00 01", url: "https://wa.me/4550650001" },
    ],
  },
  // The three main showcase projects. To add one, add an object here.
  // Fields: title, category, description, image, technologies, liveUrl, githubUrl, status.
  //   category  - short label for what the project demonstrates (shown above the title).
  //   image     - path or URL to a screenshot; leave "" for an auto-generated placeholder.
  //   liveUrl   - link to the live site; "" hides the button.
  //   githubUrl - link to the repository; "" hides the button.
  //   status    - "live" | "in-progress" | "concept" | "archived".
  projects: [
    {
      title: "Oakmont Barber Co.",
      category: "Business Website",
      description:
        "A premium service-business website focused on strong branding, clear service presentation, and responsive, conversion-oriented design.",
      image: "assets/oakmont-barber-concept.png",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
      liveUrl: "https://crjfc2vsy2-maker.github.io/barbershop-concept/",
      githubUrl: "https://github.com/crjfc2vsy2-maker/barbershop-concept",
      status: "concept",
    },
    {
      title: "Nexa AI",
      category: "SaaS / Product UI",
      description:
        "A modern SaaS interface exploring dashboard UX, information hierarchy, data presentation, and responsive application design.",
      image: "assets/nexa-ai-dashboard.png",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
      liveUrl: "https://crjfc2vsy2-maker.github.io/nexa-ai-dashboard/",
      githubUrl: "https://github.com/crjfc2vsy2-maker/nexa-ai-dashboard",
      status: "concept",
    },
    {
      title: "NOIRÉ",
      category: "E-commerce",
      description:
        "A fashion e-commerce experience covering product discovery, filtering, product detail UX, persistent cart state, and responsive shopping interactions.",
      image: "assets/noire-fashion-store.png",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
      liveUrl: "https://crjfc2vsy2-maker.github.io/noire-fashion-store/",
      githubUrl: "https://github.com/crjfc2vsy2-maker/noire-fashion-store",
      status: "concept",
    },
  ],
  // A lighter-weight mention shown below the main projects — this site itself.
  metaProject: {
    text: "This portfolio is built the same way — designed with intent, then built to perform on every screen.",
    linkLabel: "View Source",
    githubUrl: "https://github.com/crjfc2vsy2-maker/portfolio",
  },
  // Grouped so a visitor can scan what's actually demonstrated in the
  // projects above — kept honest rather than padded out.
  skills: [
    {
      category: "Design & Frontend",
      items: ["Responsive Web Design", "UI Implementation", "HTML", "CSS", "JavaScript"],
    },
    {
      category: "Development Workflow",
      items: ["Git", "GitHub", "GitHub Pages", "Modern Dev Tooling"],
    },
    {
      category: "AI-Assisted Workflow",
      items: ["Claude Code", "Codex", "AI-Assisted Prototyping"],
    },
  ],
  process: [
    {
      number: "01",
      title: "Understand",
      description: "Clarify goals, audience, and the experience the site needs to deliver.",
    },
    {
      number: "02",
      title: "Design",
      description: "Define the visual direction, structure, and interface details.",
    },
    {
      number: "03",
      title: "Build",
      description: "Develop a responsive, interactive experience true to the design.",
    },
    {
      number: "04",
      title: "Refine",
      description: "Test across devices, polish details, and prepare for launch.",
    },
  ],
};

const profileFields = document.querySelectorAll("[data-profile-field]");
const projectsGrid = document.querySelector("#projectsGrid");
const metaProjectEl = document.querySelector("#metaProject");
const skillsGrid = document.querySelector("#skillsGrid");
const processGrid = document.querySelector("#processGrid");
const contactLinks = document.querySelector("#contactLinks");
const aboutPointsList = document.querySelector("#aboutPoints");

profileFields.forEach((field) => {
  const key = field.dataset.profileField;
  const value = portfolioData.profile[key];

  if (value) {
    field.textContent = value;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

if (aboutPointsList) {
  portfolioData.profile.aboutPoints.forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    aboutPointsList.append(item);
  });
}

if (contactLinks) {
  portfolioData.profile.contacts.forEach((contact) => {
    const item = document.createElement("li");

    const link = document.createElement("a");
    link.href = contact.url;
    link.setAttribute("aria-label", `${contact.label}: ${contact.value}`);

    if (/^https?:/i.test(contact.url)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    const label = document.createElement("span");
    label.className = "contact-label";
    label.textContent = contact.label;

    const value = document.createElement("span");
    value.className = "contact-value";
    value.textContent = contact.value;

    link.append(label, value);
    item.append(link);
    contactLinks.append(item);
  });
}

const PROJECT_STATUS_LABELS = {
  live: "Live",
  "in-progress": "In progress",
  concept: "Concept",
  archived: "Archived",
};

// Placeholder background colours, reused when a project has no image yet.
const PLACEHOLDER_PALETTE = [
  { background: "#dedbd2", ink: "#24221f" },
  { background: "#a9bcd0", ink: "#152433" },
  { background: "#bdc2a7", ink: "#20251a" },
];

const buildPlaceholderImage = (title, index) => {
  const { background, ink } = PLACEHOLDER_PALETTE[index % PLACEHOLDER_PALETTE.length];
  const safeTitle = String(title).replace(/[<>&]/g, " ").slice(0, 28);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">',
    `<rect width="800" height="500" fill="${background}"/>`,
    `<circle cx="584" cy="430" r="280" fill="none" stroke="${ink}" stroke-opacity="0.18"/>`,
    `<text x="56" y="70" fill="${ink}" fill-opacity="0.6" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="3">PREVIEW</text>`,
    `<text x="52" y="292" fill="${ink}" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="700">${safeTitle}</text>`,
    "</svg>",
  ].join("");

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const createProjectLink = (label, url, projectTitle) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.setAttribute("aria-label", `${label}: ${projectTitle}`);

  const text = document.createElement("span");
  text.textContent = label;
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(text, arrow);

  return link;
};

const createProjectCard = (project, index) => {
  const article = document.createElement("article");
  article.className = "project-card";
  article.style.setProperty("--reveal-delay", `${index * 90}ms`);

  const preview = document.createElement("div");
  preview.className = "project-preview";

  const image = document.createElement("img");
  image.className = "project-image";
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 800;
  image.height = 500;

  if (project.image) {
    image.src = project.image;
    image.alt = `${project.title} preview`;
  } else {
    image.src = buildPlaceholderImage(project.title, index);
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
  }

  // A project with a live URL gets a clickable preview (opens in a new tab).
  // Without one, the preview stays a plain, non-interactive image.
  if (project.liveUrl) {
    const previewLink = document.createElement("a");
    previewLink.className = "project-preview-link";
    previewLink.href = project.liveUrl;
    previewLink.target = "_blank";
    previewLink.rel = "noreferrer";
    previewLink.setAttribute(
      "aria-label",
      `Open the ${project.title} live site in a new tab`,
    );
    image.alt = "";
    previewLink.append(image);
    preview.append(previewLink);
  } else {
    preview.append(image);
  }

  const body = document.createElement("div");
  body.className = "project-body";

  const head = document.createElement("div");
  head.className = "project-head";

  const titleGroup = document.createElement("div");

  if (project.category) {
    const category = document.createElement("p");
    category.className = "project-category";
    category.textContent = project.category;
    titleGroup.append(category);
  }

  const title = document.createElement("h3");
  title.textContent = project.title;
  titleGroup.append(title);
  head.append(titleGroup);

  if (project.status) {
    const status = document.createElement("span");
    status.className = "project-status";
    status.dataset.status = project.status;
    status.textContent = PROJECT_STATUS_LABELS[project.status] || project.status;
    head.append(status);
  }

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;

  const technologies = document.createElement("ul");
  technologies.className = "tech-list";
  technologies.setAttribute("aria-label", "Technologies");

  (project.technologies || []).forEach((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    technologies.append(item);
  });

  body.append(head, description, technologies);

  const links = document.createElement("div");
  links.className = "project-links";

  if (project.liveUrl) {
    links.append(createProjectLink("View Live", project.liveUrl, project.title));
  }

  if (project.githubUrl) {
    links.append(createProjectLink("View Source", project.githubUrl, project.title));
  }

  if (links.childElementCount > 0) {
    body.append(links);
  }

  article.append(preview, body);

  return article;
};

const renderProjects = () => {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = "";
  portfolioData.projects.forEach((project, index) => {
    projectsGrid.append(createProjectCard(project, index));
  });
};

renderProjects();

if (metaProjectEl && portfolioData.metaProject) {
  const { text, linkLabel, githubUrl } = portfolioData.metaProject;
  const textEl = document.createElement("p");
  textEl.textContent = text + " ";

  const link = document.createElement("a");
  link.className = "text-link";
  link.href = githubUrl;
  link.target = "_blank";
  link.rel = "noreferrer";
  const linkText = document.createElement("span");
  linkText.textContent = linkLabel;
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(linkText, arrow);

  textEl.append(link);
  metaProjectEl.append(textEl);
}

portfolioData.skills.forEach((skill) => {
  const group = document.createElement("article");
  group.className = "skill-group";

  const title = document.createElement("h3");
  title.textContent = skill.category;

  const items = document.createElement("ul");
  items.className = "skill-tags";
  skill.items.forEach((skillItem) => {
    const item = document.createElement("li");
    item.textContent = skillItem;
    items.append(item);
  });

  group.append(title, items);
  skillsGrid.append(group);
});

if (processGrid) {
  portfolioData.process.forEach((step) => {
    const item = document.createElement("article");
    item.className = "process-step";

    const number = document.createElement("p");
    number.className = "process-number";
    number.textContent = step.number;

    const title = document.createElement("h3");
    title.textContent = step.title;

    const description = document.createElement("p");
    description.className = "process-description";
    description.textContent = step.description;

    item.append(number, title, description);
    processGrid.append(item);
  });
}

const headerInner = document.querySelector(".header-inner");
const navToggle = document.querySelector("#navToggle");
const navWrap = document.querySelector("#primaryNav");

if (headerInner && navToggle && navWrap) {
  const setNav = (open) => {
    headerInner.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  navToggle.addEventListener("click", () => {
    setNav(!headerInner.classList.contains("nav-open"));
  });

  navWrap.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNav(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNav(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      headerInner.classList.contains("nav-open") &&
      !headerInner.contains(event.target)
    ) {
      setNav(false);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 681px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) {
      setNav(false);
    }
  });
}

// Header gains a border/shadow once the page has scrolled past the hero.
const siteHeader = document.querySelector(".site-header");
if (siteHeader) {
  const setScrolled = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
}

// Scroll-spy: highlight the nav link for the section currently in view.
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navLinks.length && sections.length && "IntersectionObserver" in window) {
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const spyObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActiveLink(visible.target.id);
      }
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
  );

  sections.forEach((section) => spyObserver.observe(section));
}

// Subtle entrance reveal for sections and project cards as they scroll in.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  document.querySelectorAll("[data-reveal]").forEach((target) => {
    target.classList.add("is-revealed");
  });
}

// Hero background: a faint dot grid with a soft spotlight that follows the
// pointer. Disabled on touch/reduced-motion — it's a static texture there.
const heroVisual = document.querySelector("[data-hero-visual]");
if (heroVisual && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
  let frame = null;
  heroVisual.addEventListener("pointermove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const rect = heroVisual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      heroVisual.style.setProperty("--spot-x", `${x}%`);
      heroVisual.style.setProperty("--spot-y", `${y}%`);
      heroVisual.classList.add("is-active");
      frame = null;
    });
  });
  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.classList.remove("is-active");
  });
}
