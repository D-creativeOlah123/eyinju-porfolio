/**
 * Projects Data Store
 * =====================
 * Central data source for all portfolio projects.
 * Each project has its own unique ID, links, and metadata.
 * To add a new project, simply add a new object to the array.
 */

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Modern Elegance Boutique",
    category: "app",
    filterClass: "filter-app",
    thumbnail: "assets/img/portfolio/portfolio-1.jpg",
    images: [
      "assets/img/portfolio/portfolio-1.jpg",
      "assets/img/portfolio/portfolio-details-1.jpg",
      "assets/img/portfolio/portfolio-details-2.jpg"
    ],
    description:
      "Modern Elegance Boutique is an upscale fashion brand specializing in women's clothing, shoes, and accessories. The store caters to fashion-savvy women who appreciate timeless elegance and contemporary style. The project focused on showcasing fashion, elevating brand image, facilitating online shopping, driving sales, and ensuring full responsiveness across all devices.",
    client: "Modern Elegance Boutique",
    date: "March 2023",
    categoryLabel: "Mobile App Design",
    projectUrl:
      "https://www.figma.com/design/bJJmWQkmZAiIvAq6GtYwg4/Modern-Elegance-Boutique-Mobile-App?node-id=516-644&t=eVVHI7kzTjDHKMCE-1",
    githubUrl: "",
    technologies: ["Figma", "UI/UX Design", "Prototyping", "User Research"]
  },
  {
    id: 2,
    title: "Responsive Web Dashboard",
    category: "web",
    filterClass: "filter-web",
    thumbnail: "assets/img/portfolio/MacBook Pro 14_ - 1 (1).png",
    images: [
      "assets/img/portfolio/MacBook Pro 14_ - 1 (1).png",
      "assets/img/portfolio/portfolio-details-2.jpg",
      "assets/img/portfolio/portfolio-details-3.jpg"
    ],
    description:
      "A comprehensive web dashboard designed for task management and productivity tracking. Features an intuitive interface with data visualization, drag-and-drop functionality, and real-time collaboration tools. Built with a focus on clean code architecture and responsive design principles.",
    client: "Internal Project",
    date: "June 2023",
    categoryLabel: "Web Design",
    projectUrl: "#",
    githubUrl: "",
    technologies: ["HTML/CSS", "JavaScript", "Figma", "Responsive Design"]
  },
  {
    id: 3,
    title: "Mobile Health App",
    category: "app",
    filterClass: "filter-app",
    thumbnail: "assets/img/portfolio/home.png",
    images: [
      "assets/img/portfolio/home.png",
      "assets/img/portfolio/portfolio-details-1.jpg",
      "assets/img/portfolio/portfolio-details-3.jpg"
    ],
    description:
      "A health and wellness mobile application designed with a focus on user engagement and accessibility. Features include workout tracking, meal planning, progress analytics, and community integration. The UI was crafted with calming color palettes and intuitive navigation patterns.",
    client: "Health & Wellness Startup",
    date: "September 2023",
    categoryLabel: "Mobile App Design",
    projectUrl: "#",
    githubUrl: "",
    technologies: ["Figma", "Adobe XD", "User Research", "Prototyping"]
  },
  {
    id: 4,
    title: "A calculator",
    category: "card",
    filterClass: "filter-card",
    thumbnail: "assets/img/portfolio/calculator.png",
    images: [
      "assets/img/portfolio/calculator.png",
      "assets/img/portfolio/calculator2.png",
      "assets/img/portfolio/portfolio-details-2.jpg"
    ],
    description:
      "A simple and modern Calculator App using a Glassmorphism style..",
    client: "Creative Agency",
    date: "october 2025",
    categoryLabel: "JAVASCRIPT MINI PROJECT",
    projectUrl: "https://glasscalculator.surge.sh/",
    githubUrl: "",
    technologies: ["HMTL", "CSS", "JAVASCRIPT", "Design"]
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    category: "web",
    filterClass: "filter-web",
    thumbnail: "assets/img/portfolio/Modern Elegance boutique.png",
    images: [
      "assets/img/portfolio/Modern Elegance boutique.png",
      "assets/img/portfolio/portfolio-details-2.jpg",
      "assets/img/portfolio/portfolio-details-3.jpg"
    ],
    description:
      "End-to-end e-commerce platform design featuring product catalogs, shopping cart UX, secure checkout flow, and user account management. Focused on conversion optimization through strategic placement of CTAs and streamlined user journeys.",
    client: "Retail Client",
    date: "January 2024",
    categoryLabel: "Web Design",
    projectUrl: "#",
    githubUrl: "",
    technologies: ["Figma", "WordPress", "WooCommerce", "UI/UX Design"]
  },
  {
    id: 6,
    title: "Guessing Game App",
    category: "app",
    filterClass: "filter-app",
    thumbnail: "assets/img/portfolio/Guessing Game.png",
    images: [
      "assets/img/portfolio/Guessing Game.png",
      "assets/img/portfolio/portfolio-details-1.jpg",
      "assets/img/portfolio/portfolio-details-3.jpg"
    ],
    description:
      "MindMatch is a modern, engaging mobile guessing game designed to challenge users’ thinking skills while delivering a fun and immersive experience",
    client: "Creative Agency",
    date: "DECEMBER 2025",
    categoryLabel: "App Design",
    projectUrl: "https://numberduel.surge.sh",
    githubUrl: "",
    technologies: ["HTMLS", "CSS", "Motion Design", "FIGMA"]
  },
  {
    id: 7,
    title: "Creative Portfolio Cards",
    category: "card",
    filterClass: "filter-card",
    thumbnail: "assets/img/portfolio/portfolio-7.jpg",
    images: [
      "assets/img/portfolio/portfolio-7.jpg",
      "assets/img/portfolio/portfolio-details-1.jpg",
      "assets/img/portfolio/portfolio-details-2.jpg"
    ],
    description:
      "A series of creative portfolio card designs showcasing various design styles from minimalist to bold. Each card tells a unique visual story while maintaining brand consistency. Perfect for digital and print applications.",
    client: "Personal Project",
    date: "May 2024",
    categoryLabel: "Graphic Design",
    projectUrl: "#",
    githubUrl: "",
    technologies: ["Photoshop", "Illustrator", "Typography", "Layout Design"]
  },
  {
    id: 8,
    title: "Spotify Clone Redesign",
    category: "web",
    filterClass: "filter-web",
    thumbnail: "assets/img/portfolio/sportify.png",
    images: [
      "assets/img/portfolio/sportify.png",
      "assets/img/portfolio/portfolio-details-2.jpg",
      "assets/img/portfolio/portfolio-details-3.jpg"
    ],
    description:
      "A pixel-perfect Spotify clone redesign built with pure HTML and CSS. This project demonstrates advanced CSS skills including Flexbox/Grid layouts, custom animations, gradient overlays, and responsive design — all without JavaScript frameworks.",
    client: "Personal Project",
    date: "July 2024",
    categoryLabel: "Web Development",
    projectUrl: "#",
    githubUrl: "",
    technologies: ["HTML", "CSS", "Responsive Design", "CSS Animations"]
  },
  {
    id: 9,
    title: "SaaS Landing Page",
    category: "web",
    filterClass: "filter-web",
    thumbnail: "assets/img/portfolio/Actual design.png",
    images: [
      "assets/img/portfolio/Actual design.png",
      "assets/img/portfolio/portfolio-details-1.jpg",
      "assets/img/portfolio/portfolio-details-3.jpg"
    ],
    description:
      "A high-converting SaaS landing page design with compelling hero sections, feature showcases, pricing tables, and testimonial carousels. Optimized for lead generation with strategic CTA placement and persuasive copy layout.",
    client: "Tech Startup",
    date: "October 2024",
    categoryLabel: "Web Design",
    projectUrl: "#",
    githubUrl: "",
    technologies: ["Figma", "HTML/CSS", "Conversion Optimization", "A/B Testing"]
  }
];

/**
 * Get a project by its ID
 * @param {number} id - The project ID
 * @returns {object|null} The project object or null
 */
function getProjectById(id) {
  return PROJECTS_DATA.find((p) => p.id === id) || null;
}

/**
 * Get projects filtered by category
 * @param {string} category - The category to filter by
 * @returns {array} Filtered projects
 */
function getProjectsByCategory(category) {
  if (!category || category === "*") return PROJECTS_DATA;
  return PROJECTS_DATA.filter((p) => p.category === category);
}
