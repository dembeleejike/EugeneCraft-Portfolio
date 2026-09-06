/* =================================================================
   EDIT ME — this is the ONLY file you should need to touch when
   updating your portfolio: new projects, new links, new bio text.
   Never edit App.jsx just to update your content.

   Not confident hand-editing this? Use project-generator.html —
   fill in a form, it writes the object for you, you paste it below.
================================================================== */

export const PROFILE = {
  name: "Eugene Ejike Chibuike",
  brand: "EugeneCrafts",
  motto: "Your idea, my code.",
  role: "Full-Stack Developer · Computer Science Student · Product Builder",
  intro: "I design and build full-stack digital products that solve real problems — from business websites and learning platforms to interactive applications and custom web systems.",
  location: "City, Nigeria",
  email: "eugeneejike51@gmail.com",
  whatsapp: "2348112153223",
  github: "https://github.com/dembeleejike",
  linkedin: "https://linkedin.com/in/eugene-ejike-687b813a8/",
  resumeUrl: "", // link to your hosted CV — button hides until this is set
  photoUrl: "/profileImage.jpg", // link/path to your photo — placeholder frame shows until this is set
  availableFor: ["Freelance projects", "Web application development", "Business website builds", "Internships & collaborations"],
};

export const HIGHLIGHTS = [
  // Only use numbers that are true when you publish. Edit freely.
  { n: "2+", l: "Full-stack platforms built" },
  { n: "8+", l: "Total projects shipped" },
  { n: "1", l: "CS degree in progress" },
  { n: "∞", l: "Ideas turned into code" },
];

export const WHAT_I_DO_ICONS = ["Layers", "Globe", "Server", "Database", "Briefcase", "Sparkles"];
export const WHAT_I_DO = [
  { icon: "Layers", name: "Full-Stack Development", desc: "Complete web applications, from frontend UI to backend logic to the database underneath." },
  { icon: "Globe", name: "Frontend Development", desc: "React, Tailwind CSS and responsive interfaces that feel considered, not templated." },
  { icon: "Server", name: "Backend Development", desc: "Node.js, Express, REST APIs, authentication and the server-side systems that hold a product together." },
  { icon: "Database", name: "Database Development", desc: "MongoDB schema design and data management for real, growing applications." },
  { icon: "Briefcase", name: "Business Websites", desc: "Digital catalogues, quote systems and online presences for businesses moving off word-of-mouth." },
  { icon: "Sparkles", name: "Product Development", desc: "Taking a raw idea and turning it into something people can actually open and use." },
];

export const SKILLS = {
  Languages: ["HTML", "CSS", "JavaScript",],
  Frontend: ["React", "Tailwind CSS", "Bootstrap", "Responsive Design"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["MongoDB"],
  "Auth & Payments": ["JWT", "Google Auth", "Paystack", "Flutterwave"],
  "Cloud & Tools": ["Git", "GitHub", "Vercel", "Render", "Cloudinary", "VS Code", "NPM"],
};

// Your flagship, largest-presentation projects.
// caseStudy is optional — if present, a "Case Study" button opens the modal.
// >>> Use project-generator.html (Featured tab) to add one of these <<<
export const FEATURED_PROJECTS = [
  {
    name: "StoryXverse",
    tagline: "Full-stack interactive storytelling platform",
    version: "v1.0.0",
    status: "live", // "live" | "development" | "archived"
    date: "2026",
    desc: "A full-stack platform for reading, publishing and rewarding interactive stories — built with user profiles, a story library, and its own in-app economy.",
    features: ["Explore & Library", "Characters & media", "Story publishing", "Leaderboard", "SVP wallet", "Rewards system", "Admin dashboard", "Monetization"],
    tags: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "Authentication"],
    liveUrl: "https://storyxverse-backend.onrender.com",
    repoUrl: "",
    imageUrl: "/StoryXverseImage.jpeg",
    caseStudy: {
      problem: "Independent writers had no dedicated platform to publish interactive, branching stories and be rewarded for engagement.",
      solution: "A full-stack platform combining publishing tools, a reading experience, and an in-app wallet/reward system in one place.",
      challenges: "Designing a data model flexible enough for branching narratives while keeping reads fast, and building a reward economy that's fair and abuse-resistant.",
      learned: "How to structure a large MongoDB schema for content-heavy apps, and how to design monetization without compromising UX.",
      result: "A working, full-stack product covering publishing, reading, community and payments — not a demo, an actual platform.",
    },
  },
  {
    name: "CodeCraft",
    tagline: "Skills-learning platform",
    version: "v1.0.0",
    status: "live",
    date: "2026",
    desc: "A learning platform covering tech, AI, content creation, design/UX and business/marketing — with courses, bundles, mock exams and instructor tools.",
    features: ["Course catalogue", "Course bundles", "Mock exams", "Instructor tools", "Community/support", "Paid courses"],
    tags: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "Payments"],
    liveUrl: "https://codecraft-frontend-three.vercel.app/",
    repoUrl: "",
    imageUrl: "/codecraftImage.jpeg",
    caseStudy: {
      problem: "Learners looking to pick up practical skills (tech, AI, design, business) often bounce between scattered free resources with no structure.",
      solution: "A single platform with structured courses, bundles and mock exams, plus tools for instructors to publish their own content.",
      challenges: "Balancing a flexible course/bundle data model with a checkout flow that actually works for paid content.",
      learned: "How to design a multi-sided platform (learners + instructors) and wire up a real payment flow end to end.",
      result: "A working learning platform with real course structure, not just a static list of videos.",
    },
  },
];

// Smaller / supporting work. filter can be any short category label you like.
// >>> Use project-generator.html (Other tab) to add one of these <<<
export const OTHER_PROJECTS = [
  { name: "Manik Aluminum Company", desc: "A digital showroom and quote-request system for a local aluminium & building materials business.", tags: ["React", "Tailwind", "Node.js", "MongoDB"], filter: "Business", liveUrl: "", repoUrl: "" },
  { name: "Sharifa's Clothing Website", desc: "A storefront-style website for a clothing business.", tags: ["HTML", "CSS"], filter: "Business", liveUrl: "", repoUrl: "" },
  { name: "Quiz App", desc: "An interactive quiz application with scoring and question flow.", tags: ["JavaScript", "HTML", "CSS"], filter: "Frontend", liveUrl: "", repoUrl: "" },
  { name: "Todo App", desc: "A task manager with create, complete and delete flows.", tags: ["JavaScript", "HTML", "CSS"], filter: "Frontend", liveUrl: " ", repoUrl: " https://dembeleejike.github.io/My-Todo-App/ " },
  { name: "Calculator", desc: "A functioning calculator UI with standard operations.", tags: ["JavaScript","HTML", "CSS"], filter: "Frontend", liveUrl: "", repoUrl: "" },
  { name: "Music Playlist UI", desc: "A playlist interface exploring media-app layout and interaction.", tags: ["HTML", "CSS"], filter: "Frontend", liveUrl: "", repoUrl: "" },
  { name: "This Portfolio", desc: "The site you're looking at right now — built, versioned and maintained like a product.", tags: ["React", "Tailwind"], filter: "Frontend", liveUrl: "https://eugene-craft-portfolio.vercel.app/", repoUrl: "https://github.com/dembeleejike/EugeneCraft-Portfolio.git" },
];

export const JOURNEY = [
  { year: "2024", items: ["Started building web projects"] },
  { year: "2025", items: ["Expanded into React", "Started full-stack development with Node.js & MongoDB"] },
  { year: "2026", items: ["Built CodeCraft", "Built StoryXverse", "Built business platforms (Apexframe)", "Expanded into full product development"] },
];

export const EDUCATION = {
  school: "Federal University of Technology Minna",
  program: "Computer Science",
  status: "100 Level",
};

export const LEARNING = [
  "Self-taught web development",
  "Continuous project-based learning",
  "Full-stack development — React, Node.js, MongoDB",
];

export const SERVICES = [
  { name: "Website Development", desc: "Business and professional websites built to convert visitors into enquiries." },
  { name: "Web Application Development", desc: "Custom applications with a real frontend and backend, not a template." },
  { name: "Backend / API Development", desc: "REST APIs and server-side systems your product can actually run on." },
  { name: "Database Integration", desc: "MongoDB data modelling and integration for growing applications." },
  { name: "Business Digitization", desc: "Turning manual, walk-in-only processes into a digital system customers can use online." },
];

// Only add real testimonials here. Leave empty until you have genuine ones —
// the section on the site hides itself automatically when this array is empty.
export const TESTIMONIALS = [
  // { quote: "...", name: "Client Name", role: "Business Owner" },
];

export const LAST_UPDATED = "August 2026"; // bump this whenever you make a real update
