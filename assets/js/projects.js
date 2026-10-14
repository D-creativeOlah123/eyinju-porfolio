/**
 * Projects Data Store
 * =====================
 * Central data source for all portfolio projects.
 * Each project has its own unique ID, links, and metadata.
 * To add a new project, simply add a new object to the array —
 * the order here is the order on the site, so put the strongest first.
 *
 * Fields:
 *   category      one or more of "fullstack", "web", "app" (drives the filters)
 *   tagline       short line under the title on the homepage card
 *   featured      true shows a "Featured" tag on the card
 *   layout        "phone" when the thumbnail is a single phone screen
 *   backdrop      optional image blurred behind a phone thumbnail
 *   thumbPosition optional object-position for the card crop on small screens
 *   projectUrl    live site ("#" when there isn't one)
 *   githubUrl     repository ("" when private)
 *   figmaUrl      Figma file ("" when there isn't one)
 */

const PROJECTS_DATA = [
  {
    id: 10,
    title: "RideLink",
    tagline: "Ride-hailing for Lagos",
    category: ["fullstack", "web"],
    featured: true,
    thumbnail: "assets/img/portfolio/ridelink-cover.webp",
    thumbPosition: "100% 50%",
    images: [
      "assets/img/portfolio/ridelink-1.webp",
      "assets/img/portfolio/ridelink-2.webp",
      "assets/img/portfolio/ridelink-3.webp"
    ],
    description:
      "A full-stack ride-hailing app for Lagos. Riders see upfront fares for Economy, Comfort and XL before booking — with rush-hour pricing by time of day — chat with their driver and pay through Paystack by card, transfer or USSD, verified server-side. Drivers and admins get their own dashboards for trips, earnings and disputes.",
    client: "Personal project",
    role: "Designed and built end-to-end",
    date: "2026",
    categoryLabel: "Full-Stack Web App",
    projectUrl: "https://ride-hailing-platform-henna.vercel.app/",
    githubUrl: "https://github.com/D-creativeOlah123/ride-hailing-platform",
    figmaUrl: "",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Paystack", "JWT + Google OAuth"]
  },
  {
    id: 11,
    title: "Jara",
    tagline: "A digital bank for Nigeria",
    category: ["fullstack", "app"],
    featured: true,
    layout: "phone",
    thumbnail: "assets/img/portfolio/jara-screen.webp",
    backdrop: "assets/img/portfolio/jara-backdrop.webp",
    images: [
      "assets/img/portfolio/jara-1.webp",
      "assets/img/portfolio/jara-2.webp"
    ],
    description:
      "A Nigerian digital bank — accounts, transfers, bills, savings and cards, all from one app. Open an account with your BVN, send money to any bank in seconds, pay airtime and light bills, save together through Ajo groups, and spend with a Jara card, with an admin console behind it. Designed in Figma, then built full-stack.",
    client: "Personal project",
    role: "Designed and built end-to-end",
    date: "June 2026",
    categoryLabel: "Web App Design & Full-Stack",
    projectUrl: "https://jare-web-ap.vercel.app/",
    githubUrl: "https://github.com/D-creativeOlah123/JARE-WEB-AP",
    figmaUrl: "https://www.figma.com/design/tEYn7OthXCwYCc9XMSJL0E/Level-4-Project?t=YAbDbrFFKY2NNvYg-0",
    technologies: ["Figma", "React", "Node.js", "Express", "MongoDB", "Paystack"]
  },
  {
    id: 13,
    title: "VibeTok",
    tagline: "Social app for young Nigerians",
    category: ["app"],
    thumbnail: "assets/img/portfolio/vibetok-cover.webp",
    thumbPosition: "100% 50%",
    images: [
      "assets/img/portfolio/vibetok-cover.webp",
      "assets/img/portfolio/vibetok-screens.webp"
    ],
    description:
      "VibeTok is a Nigerian social media app designed for young adults aged 18–35 to connect, share content, express themselves, and discover new trends in a fun and engaging digital community.",
    client: "Personal project",
    role: "UI/UX design",
    date: "2026",
    categoryLabel: "Mobile App UI/UX Design",
    projectUrl: "#",
    githubUrl: "",
    figmaUrl: "https://www.figma.com/design/zTWEOKleKZtEGniPHtWpfv/Untitled?node-id=0-1&p=f&t=9qeYUPGKKIrIrFl2-0",
    technologies: ["Figma", "UI/UX Design", "Mobile App Design"]
  },
  {
    id: 1,
    title: "Modern Elegance Boutique",
    tagline: "Fashion e-commerce app",
    category: ["app"],
    layout: "phone",
    thumbnail: "assets/img/portfolio/modern-elegance-app.webp",
    images: [
      "assets/img/portfolio/modern-elegance-app.webp",
      "assets/img/portfolio/modern-elegance-web.webp"
    ],
    description:
      "Modern Elegance Boutique is an upscale fashion brand specializing in women's clothing, shoes, and accessories. The store caters to fashion-savvy women who appreciate timeless elegance and contemporary style. The project focused on showcasing fashion, elevating brand image, facilitating online shopping, driving sales, and ensuring full responsiveness across all devices.",
    client: "Modern Elegance Boutique",
    date: "March 2023",
    categoryLabel: "Mobile App Design",
    projectUrl: "#",
    githubUrl: "",
    figmaUrl:
      "https://www.figma.com/design/bJJmWQkmZAiIvAq6GtYwg4/Modern-Elegance-Boutique-Mobile-App?node-id=516-644&t=eVVHI7kzTjDHKMCE-1",
    technologies: ["Figma", "UI/UX Design", "Prototyping", "User Research"]
  },
  {
    id: 12,
    title: "Agbeloba",
    tagline: "Agriculture brand website",
    category: ["web"],
    thumbnail: "assets/img/portfolio/agbeloba-cover.webp",
    images: [
      "assets/img/portfolio/agbeloba-full.webp"
    ],
    description:
      "A freestyle website concept for Agbeloba, an agriculture brand that helps farmers build economic and environmental resilience through fair supply-chain solutions and training. Designed in Figma and built in WordPress, the site covers the brand's impact numbers, story and mission, products, team, a gallery and a newsletter sign-up.",
    client: "Personal project",
    role: "Designed in Figma, built in WordPress",
    date: "2025",
    categoryLabel: "Web Design & WordPress",
    projectUrl: "#",
    githubUrl: "",
    figmaUrl: "",
    technologies: ["Figma", "WordPress", "UI/UX Design", "Responsive Design"]
  },
  {
    id: 6,
    title: "Guessing Game App",
    category: ["app"],
    layout: "phone",
    thumbnail: "assets/img/portfolio/guessing game.png",
    images: [
      "assets/img/portfolio/guessing game.png"
    ],
    description:
      "MindMatch is a modern, engaging mobile guessing game designed to challenge users’ thinking skills while delivering a fun and immersive experience",
    client: "Creative Agency",
    date: "December 2025",
    categoryLabel: "App Design",
    projectUrl: "https://numberduel.surge.sh",
    githubUrl: "",
    figmaUrl: "",
    technologies: ["HTML", "CSS", "Motion Design", "Figma"]
  },
  {
    id: 8,
    title: "Spotify Clone Redesign",
    category: ["web"],
    thumbnail: "assets/img/portfolio/sportify.png",
    images: [
      "assets/img/portfolio/sportify.png"
    ],
    description:
      "A pixel-perfect Spotify clone redesign built with pure HTML and CSS. This project demonstrates advanced CSS skills including Flexbox/Grid layouts, custom animations, gradient overlays, and responsive design — all without JavaScript frameworks.",
    client: "Personal Project",
    date: "July 2024",
    categoryLabel: "Web Development",
    projectUrl: "https://d-creativeolah123.github.io/sportify/",
    githubUrl: "",
    figmaUrl: "",
    technologies: ["HTML", "CSS", "Responsive Design", "CSS Animations"]
  },
  {
    id: 4,
    title: "A calculator",
    category: ["web"],
    layout: "phone",
    thumbnail: "assets/img/portfolio/calculator.png",
    images: [
      "assets/img/portfolio/calculator.png",
      "assets/img/portfolio/calculatorlight.png"
    ],
    description:
      "A simple and modern Calculator App using a Glassmorphism style.",
    client: "Creative Agency",
    date: "October 2025",
    categoryLabel: "JavaScript Mini Project",
    projectUrl: "https://glasscalculator.surge.sh/",
    githubUrl: "",
    figmaUrl: "",
    technologies: ["HTML", "CSS", "JavaScript", "Design"]
  },
  {
    id: 9,
    title: "SaaS Landing Page",
    category: ["web"],
    thumbnail: "assets/img/portfolio/Actual design.png",
    images: [
      "assets/img/portfolio/Actual design.png"
    ],
    description:
      "A high-converting SaaS landing page design with compelling hero sections, feature showcases, pricing tables, and testimonial carousels. Optimized for lead generation with strategic CTA placement and persuasive copy layout.",
    client: "Tech Startup",
    date: "October 2024",
    categoryLabel: "Web Design",
    projectUrl: "#",
    githubUrl: "",
    figmaUrl: "",
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
  return PROJECTS_DATA.filter((p) => p.category.includes(category));
}
