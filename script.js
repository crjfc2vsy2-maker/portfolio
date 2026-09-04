// Update this object to change the profile, projects, skills and contacts.
// The page renders itself from this data — no HTML edits needed.
const portfolioData = {
  profile: {
    name: "Vladyslav",
    shortName: "Vladyslav",
    title: "Web Developer & AI Builder",
    intro:
      "I build modern, responsive websites and turn ideas into polished digital products using web technologies and AI.",
    aboutLead:
      "I’m a web developer focused on building clean, responsive, and modern websites.",
    aboutBody:
      "I use AI tools alongside web technologies to move quickly from idea to working product. I care about usability, performance, and making websites feel polished on both desktop and mobile. I’m constantly improving my workflow and expanding the kinds of projects I can build.",
    // Add or reorder contact methods here. url is the clickable target,
    // value is the visible text.
    contacts: [
      { label: "Telegram", value: "@vr_8kk", url: "https://t.me/vr_8kk" },
      { label: "Email", value: "vladender218@gmail.com", url: "mailto:vladender218@gmail.com" },
      { label: "WhatsApp", value: "+45 50 65 00 01", url: "https://wa.me/4550650001" },
    ],
  },
  // To add a new project, just add one more object to this array.
  // Fields: title, description, image, technologies, liveUrl, githubUrl, status.
  //   image     - path or URL to a screenshot (e.g. "images/my-project.png");
  //               leave "" to show a clean auto-generated placeholder.
  //   liveUrl   - link to the live site; "" hides the button.
  //   githubUrl - link to the repository; "" hides the button.
  //   status    - "live" | "in-progress" | "concept" | "archived".
  projects: [
    {
      title: "Oakmont Barber Co.",
      description:
        "A premium barbershop concept website with responsive design, booking UI, service pricing, team profiles, gallery, opening hours and contact sections.",
      image: "assets/oakmont-barber-concept.png",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
      liveUrl: "https://crjfc2vsy2-maker.github.io/barbershop-concept/",
      githubUrl: "https://github.com/crjfc2vsy2-maker/barbershop-concept",
      status: "concept",
    },
    {
      title: "Nexa AI",
      description:
        "A responsive AI SaaS dashboard concept with project management, content generation, analytics, templates, notifications, settings, and client-side simulated AI workflows.",
      image: "assets/nexa-ai-dashboard.png",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
      liveUrl: "https://crjfc2vsy2-maker.github.io/nexa-ai-dashboard/",
      githubUrl: "https://github.com/crjfc2vsy2-maker/nexa-ai-dashboard",
      status: "concept",
    },
    {
      title: "Personal Portfolio",
      description:
        "A responsive personal portfolio website built to showcase my work, skills, and contact information. Designed with a clean, modern interface and optimized for both desktop and mobile.",
      image: "",
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "AI-assisted Development"],
      liveUrl: "",
      githubUrl: "",
      status: "in-progress",
    },
  ],
  skills: [
    { category: "Languages", items: "HTML, CSS, JavaScript, TypeScript" },
    { category: "Frameworks", items: "React, Next.js" },
    { category: "Tools", items: "Git, GitHub, npm" },
    {
      category: "Practices",
      items: "Responsive Design, API Integration, AI-assisted Development",
    },
  ],
};

const profileFields = document.querySelectorAll("[data-profile-field]");
const projectsGrid = document.querySelector("#projectsGrid");
const skillsGrid = document.querySelector("#skillsGrid");
const contactLinks = document.querySelector("#contactLinks");

profileFields.forEach((field) => {
  const key = field.dataset.profileField;
  const value = portfolioData.profile[key];

  if (value) {
    field.textContent = value;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

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
  link.textContent = label;
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.setAttribute("aria-label", `${label}: ${projectTitle}`);

  return link;
};

const createProjectCard = (project, index) => {
  const article = document.createElement("article");
  article.className = "project-card";

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

  const title = document.createElement("h3");
  title.textContent = project.title;
  head.append(title);

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
    links.append(createProjectLink("Live", project.liveUrl, project.title));
  }

  if (project.githubUrl) {
    links.append(createProjectLink("GitHub", project.githubUrl, project.title));
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

portfolioData.skills.forEach((skill) => {
  const group = document.createElement("article");
  group.className = "skill-group";

  const title = document.createElement("h3");
  title.textContent = skill.category;

  const items = document.createElement("p");
  items.textContent = skill.items;

  group.append(title, items);
  skillsGrid.append(group);
});

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
