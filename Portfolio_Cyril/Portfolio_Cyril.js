// JavaScript Document

/*
Portfolio Cyril Ramette - Business Intelligence Analyst
Adapté du template "TemplateMo 600 Prism Flux"
*/

// ==============================
// Données du portfolio (carrousel)
// ==============================

const portfolioData = [
  {
    id: 1,
    title: "Visualiser des données avec Excel",
    description:
      "Premiers tableaux de bord construits à partir de données brutes : tableaux croisés dynamiques, indicateurs clés et mise en forme pour un public non technique.",
    image: "images/neural-network.jpg", // image d'origine conservée
    tech: ["Excel", "TCD", "Segmentation"],
  },
  {
    id: 2,
    title: "Requêter une base de données avec SQL",
    description:
      "Écriture de requêtes SQL pour explorer une base de données, réaliser des jointures, filtrer et agréger les informations afin de répondre à des questions métiers.",
    image: "images/quantum-cloud.jpg",
    tech: ["SQL", "Jointures", "Agrégations"],
  },
  {
    id: 3,
    title: "Collecter des données en respectant le RGPD",
    description:
      "Analyse des contraintes légales et mise en place de pratiques de collecte conformes au RGPD : minimisation des données, consentement et anonymisation.",
    image: "images/blockchain-vault.jpg",
    tech: ["Anonymisation", "Conformité"],
  },
  {
    id: 4,
    title: "Suivre la satisfaction client avec SQL",
    description:
      "Construction d’indicateurs de satisfaction à partir d’une base relationnelle : scores, taux de réponse, filtres par segment de clients et période.",
    image: "images/cyber-defense.jpg",
    tech: ["SQL", "KPIs", "Satisfaction client"],
  },
  {
    id: 5,
    title: "Optimiser et nettoyer les données de stock",
    description:
      "Nettoyage et fiabilisation des données de stock d’une boutique : détection d’anomalies, gestion des doublons et mise en qualité des informations produits.",
    image: "images/data-nexus.jpg",
    tech: ["Qualité des données", "SQL", "Reporting"],
  },
  {
    id: 6,
    title: "Tableau de bord de suivi de projets (Power BI)",
    description:
      "Création d’un tableau de bord dynamique Power BI permettant de suivre l’avancement de projets, les délais, les risques et la charge par équipe.",
    image: "images/ar-interface.jpg",
    tech: ["Power BI", "DAX", "Dataviz"],
  },
  {
    id: 7,
    title: "Analyse de données en Python & aide à la décision",
    description:
      "Analyse exploratoire avec Python, premiers modèles, segmentation de marché et recommandations pour identifier les segments les plus pertinents pour le client.",
    image: "images/iot-matrix.jpg",
    tech: ["Python", "Pandas", "Segmentation"],
  },
];

// ==============================
// Données des compétences
// Catégories utilisées :
// - dataviz
// - sql
// - python
// - bi
// ==============================

const skillsData = [
  {
    name: "Excel & Tableaux croisés",
    icon: "📊",
    level: 90,
    category: "dataviz",
  },
  { name: "Power BI & DAX", icon: "📈", level: 88, category: "bi" },
  { name: "SQL (MySQL / PostgreSQL)", icon: "🗄️", level: 92, category: "sql" },
  {
    name: "Modélisation (schéma en étoile)",
    icon: "📐",
    level: 85,
    category: "bi",
  },
  { name: "Python (Pandas, NumPy)", icon: "🐍", level: 82, category: "python" },
  {
    name: "Visualisation (Matplotlib, Seaborn)",
    icon: "📉",
    level: 80,
    category: "dataviz",
  },
  {
    name: "Nettoyage & préparation des données",
    icon: "🧹",
    level: 87,
    category: "bi",
  },
  {
    name: "Analyse statistique de base",
    icon: "📚",
    level: 78,
    category: "python",
  },
  {
    name: "RGPD & bonnes pratiques data",
    icon: "🛡️",
    level: 75,
    category: "bi",
  },
  {
    name: "Documentation & Storytelling",
    icon: "✏️",
    level: 83,
    category: "bi",
  },
];

// ==============================
// Scroll vers une section
// ==============================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header = document.getElementById("header");
  if (section) {
    const headerHeight = header.offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// ==============================
// Particules (section parcours)
// ==============================

function initParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 18 + Math.random() * 8 + "s";

    particlesContainer.appendChild(particle);
  }
}

// ==============================
// Carrousel
// ==============================

let currentIndex = 0;
const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");

function createCarouselItem(data, index) {
  const item = document.createElement("div");
  item.className = "carousel-item";
  item.dataset.index = index;

  const techBadges = data.tech
    .map((tech) => `<span class="tech-badge">${tech}</span>`)
    .join("");

  item.innerHTML = `
    <div class="card">
      <div class="card-number">0${data.id}</div>
      <div class="card-image">
        <img src="${data.image}" alt="${data.title}">
      </div>
      <h3 class="card-title">${data.title}</h3>
      <p class="card-description">${data.description}</p>
      <div class="card-tech">${techBadges}</div>
    </div>
  `;

  return item;
}

function initCarousel() {
  portfolioData.forEach((data, index) => {
    const item = createCarouselItem(data, index);
    carousel.appendChild(item);

    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.dataset.index = index;
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  updateCarousel();
}

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
  const totalItems = items.length;
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  items.forEach((item, index) => {
    let offset = index - currentIndex;

    if (offset > totalItems / 2) {
      offset -= totalItems;
    } else if (offset < -totalItems / 2) {
      offset += totalItems;
    }

    const absOffset = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    item.style.transform = "";
    item.style.opacity = "";
    item.style.zIndex = "";
    item.style.transition = "all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)";

    let spacing1 = 400;
    let spacing2 = 600;
    let spacing3 = 750;

    if (isMobile) {
      spacing1 = 280;
      spacing2 = 420;
      spacing3 = 550;
    } else if (isTablet) {
      spacing1 = 340;
      spacing2 = 520;
      spacing3 = 650;
    }

    if (absOffset === 0) {
      item.style.transform = "translate(-50%, -50%) translateZ(0) scale(1)";
      item.style.opacity = "1";
      item.style.zIndex = "10";
    } else if (absOffset === 1) {
      const translateX = sign * spacing1;
      const rotation = isMobile ? 25 : 30;
      const scale = isMobile ? 0.88 : 0.85;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.8";
      item.style.zIndex = "5";
    } else if (absOffset === 2) {
      const translateX = sign * spacing2;
      const rotation = isMobile ? 35 : 40;
      const scale = isMobile ? 0.75 : 0.7;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.5";
      item.style.zIndex = "3";
    } else if (absOffset === 3) {
      const translateX = sign * spacing3;
      const rotation = isMobile ? 40 : 45;
      const scale = isMobile ? 0.65 : 0.6;
      item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${
        -sign * rotation
      }deg) scale(${scale})`;
      item.style.opacity = "0.3";
      item.style.zIndex = "2";
    } else {
      item.style.transform =
        "translate(-50%, -50%) translateZ(-500px) scale(0.5)";
      item.style.opacity = "0";
      item.style.zIndex = "1";
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % portfolioData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex =
    (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// ==============================
// Grille hexagonale de compétences
// ==============================

function initSkillsGrid() {
  const skillsGrid = document.getElementById("skillsGrid");
  const categoryTabs = document.querySelectorAll(".category-tab");

  function displaySkills(category = "all") {
    skillsGrid.innerHTML = "";

    const filteredSkills =
      category === "all"
        ? skillsData
        : skillsData.filter((skill) => skill.category === category);

    filteredSkills.forEach((skill, index) => {
      const hexagon = document.createElement("div");
      hexagon.className = "skill-hexagon";
      hexagon.style.animationDelay = `${index * 0.1}s`;

      hexagon.innerHTML = `
        <div class="hexagon-inner">
          <div class="hexagon-content">
            <div class="skill-icon-hex">${skill.icon}</div>
            <div class="skill-name-hex">${skill.name}</div>
            <div class="skill-level">
              <div class="skill-level-fill" style="width: ${skill.level}%"></div>
            </div>
            <div class="skill-percentage-hex">${skill.level}%</div>
          </div>
        </div>
      `;

      skillsGrid.appendChild(hexagon);
    });
  }

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      displaySkills(tab.dataset.category);
    });
  });

  displaySkills();
}

// ==============================
// Écouteurs d’événements
// ==============================

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

// Rotation auto du carrousel
setInterval(nextSlide, 5000);

// Navigation clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

// Mise à jour du carrousel au redimensionnement
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateCarousel();
  }, 250);
});

// Initialisation
initCarousel();
initSkillsGrid();
initParticles();

// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Effet de scroll sur le header
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll fluide et nav active
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href").substring(1);
        if (href === sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// ==============================
// Compteurs animés (section stats)
// ==============================

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((number) => {
        if (!number.classList.contains("animated")) {
          number.classList.add("animated");
          animateCounter(number);
        }
      });
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  observer.observe(statsSection);
}

// ==============================
// Écran de chargement
// ==============================

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  }, 1500);
});

// ==============================
// Effet parallaxe sur le hero
// ==============================

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
