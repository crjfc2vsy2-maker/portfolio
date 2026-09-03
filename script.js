// Редактируйте этот объект, чтобы обновлять профиль, проекты и навыки без изменений в HTML.
const portfolioData = {
  profile: {
    name: "Ваше Имя",
    shortName: "Ваше Имя",
    email: "hello@example.com",
    intro:
      "Разрабатываю современные интерфейсы и превращаю идеи в быстрые, понятные цифровые продукты.",
    aboutLead:
      "Проектирую и разрабатываю интерфейсы, в которых визуальная точность сочетается с чистым и надёжным кодом.",
    aboutBody:
      "Мне важны логичная структура, высокая скорость и детали, которые делают продукт приятным каждый день. Это портфолио будет расти вместе с новыми задачами и опытом.",
  },
  // Чтобы добавить новый проект — просто добавьте ещё один объект в этот массив.
  // Поля: title, description, image, technologies, liveUrl, githubUrl, status.
  //   image     — путь или URL к скриншоту (например "images/my-project.png");
  //               оставьте "" — карточка покажет аккуратную авто-заглушку.
  //   liveUrl   — ссылка на рабочий сайт; "" — кнопка не показывается.
  //   githubUrl — ссылка на репозиторий; "" — кнопка не показывается.
  //   status    — "live" | "in-progress" | "concept" | "archived".
  projects: [
    {
      title: "Northstar Studio",
      description:
        "Сайт цифровой студии с ясной подачей услуг, выразительной типографикой и адаптивной сеткой.",
      image: "",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "",
      githubUrl: "",
      status: "in-progress",
    },
    {
      title: "Atelier Objects",
      description:
        "Минималистичный каталог предметов интерьера с фокусом на контенте и удобной навигацией.",
      image: "",
      technologies: ["React", "CSS Modules", "Vite"],
      liveUrl: "",
      githubUrl: "",
      status: "in-progress",
    },
    {
      title: "Pulse Dashboard",
      description:
        "Панель аналитики с понятной иерархией данных, быстрыми фильтрами и адаптивными графиками.",
      image: "",
      technologies: ["TypeScript", "Next.js", "API"],
      liveUrl: "",
      githubUrl: "",
      status: "concept",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: "HTML, CSS, JavaScript, TypeScript, React",
    },
    {
      category: "UI & UX",
      items: "Responsive design, accessibility, design systems, Figma",
    },
    {
      category: "Tools",
      items: "Git, GitHub, Vite, npm, Chrome DevTools",
    },
    {
      category: "Quality",
      items: "Performance, semantic markup, testing, clean architecture",
    },
  ],
};

const profileFields = document.querySelectorAll("[data-profile-field]");
const emailLink = document.querySelector("[data-profile-link='email']");
const projectsGrid = document.querySelector("#projectsGrid");
const skillsGrid = document.querySelector("#skillsGrid");

profileFields.forEach((field) => {
  const key = field.dataset.profileField;
  const value = portfolioData.profile[key];

  if (value) {
    field.textContent = value;
  }
});

emailLink.href = `mailto:${portfolioData.profile.email}`;
document.querySelector("#year").textContent = new Date().getFullYear();

const PROJECT_STATUS_LABELS = {
  live: "Live",
  "in-progress": "In progress",
  concept: "Concept",
  archived: "Archived",
};

// Фоновые цвета авто-заглушки — те же оттенки, что использовались в превью раньше.
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
    image.alt = `Превью проекта «${project.title}»`;
  } else {
    image.src = buildPlaceholderImage(project.title, index);
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
  }

  preview.append(image);

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
  technologies.setAttribute("aria-label", "Технологии");

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
    navToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
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
