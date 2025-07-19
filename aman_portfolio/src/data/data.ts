// data.ts

export interface Link {
  type: 'github' | 'live';
  url: string;
}

export interface Project {
  title: string;
  image: string;
  shortDesc?: string;
  fullDesc?: string;
  desc?: string;
  details?: string;
  tech: string[];
  techClasses: string[];
  links?: Link[];
  live?: string;
  github?: string;
}

export const featuredProjects: Project[] = [
  {
    title: "Dashboard Pro",
    image: "https://source.unsplash.com/400x250/?app,dashboard",
    shortDesc: "Analytics dashboard built for startups with real-time insights and custom widgets.",
    fullDesc: "Dashboard Pro is a scalable analytics platform for modern startups. It offers real-time data tracking, customizable widgets, and a sleek UI. Role-based access and export features streamline workflows for teams.",
    tech: ["React", "Node.js", "MongoDB"],
    techClasses: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-gray-200 text-gray-800"],
    links: [
      { type: "github", url: "https://github.com/user/project-a" },
      { type: "live", url: "https://project-a.live" }
    ]
  },
  {
    title: "ShopEase",
    image: "https://source.unsplash.com/400x250/?ecommerce,shop",
    shortDesc: "Full-featured ecommerce platform with payment integration and admin panel.",
    fullDesc: "ShopEase is a robust ecommerce solution featuring seamless payment integration, inventory management, and a user-friendly admin panel. Built for scalability and security.",
    tech: ["Vue.js", "Firebase"],
    techClasses: ["bg-yellow-100 text-yellow-800", "bg-indigo-100 text-indigo-800"],
    links: [
      { type: "github", url: "https://github.com/user/project-a" },
      { type: "live", url: "https://project-a.live" }
    ]
  },
  {
    title: "Writer's Hub",
    image: "https://source.unsplash.com/400x250/?blog,content",
    shortDesc: "A collaborative blog platform for writers to publish, share, and engage with readers.",
    fullDesc: "Writer's Hub enables writers to publish articles, collaborate, and build their portfolio. Features include social sharing, comment system, and content analytics.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    techClasses: ["bg-purple-100 text-purple-800", "bg-pink-100 text-pink-800", "bg-gray-200 text-gray-800"],
    links: [
      { type: "github", url: "https://github.com/user/project-a" },
      { type: "live", url: "https://project-a.live" }
    ]
  }
];

// 👇 Type the keys explicitly to use as a union later
export const exploreProjects: {
  recent: Project[];
  case: Project[];
  open: Project[];
  published: Project[];
} = {
  recent: [
    {
      title: "Fitness Tracker",
      image: "https://source.unsplash.com/400x250/?fitness,app",
      desc: "Track workouts, nutrition, and progress with this mobile-friendly app.",
      tech: ["React Native", "Firebase"],
      techClasses: ["bg-blue-100 text-blue-800", "bg-indigo-100 text-indigo-800"],
      live: "https://fitnesstracker.app",
      github: "https://github.com/username/fitnesstracker",
      details: "A comprehensive fitness tracking application with personalized dashboards, health analytics, and goal tracking."
    },
    {
      title: "Eventify",
      image: "https://source.unsplash.com/400x250/?events,calendar",
      desc: "Event management platform with RSVP, ticketing, and calendar sync.",
      tech: ["Angular", "Express"],
      techClasses: ["bg-red-100 text-red-800", "bg-green-100 text-green-800"],
      live: "https://eventify.com",
      github: "https://github.com/username/eventify",
      details: "Manage events efficiently with RSVP tracking, ticketing, and Google Calendar integration. Mobile-friendly and secure."
    },
    {
      title: "CookBook",
      image: "https://source.unsplash.com/400x250/?cookbook,recipe",
      desc: "Share and discover recipes, create collections, and meal plans.",
      tech: ["Svelte", "Supabase"],
      techClasses: ["bg-orange-100 text-orange-800", "bg-green-100 text-green-800"],
      live: "https://cookbook.com",
      github: "https://github.com/username/cookbook",
      details: "A platform for culinary enthusiasts to share and discover recipes, organize collections, and generate meal plans."
    }
  ],
  case: [
    {
      title: "AI-Powered Chatbot (Case Study)",
      image: "https://source.unsplash.com/400x250/?ai,chatbot",
      desc: "End-to-end chatbot for customer service using NLP and machine learning.",
      tech: ["Python", "TensorFlow"],
      techClasses: ["bg-yellow-100 text-yellow-800", "bg-blue-100 text-blue-800"],
      live: "https://aichatbotdemo.com",
      github: "https://github.com/username/aichatbot",
      details: "A deep-dive case study into architecting an AI-powered chatbot for real-time support, leveraging NLP and ML."
    },
    {
      title: "Healthcare Portal (Case Study)",
      image: "https://source.unsplash.com/400x250/?health,portal",
      desc: "Patient management and telemedicine platform for clinics.",
      tech: ["Laravel", "Vue.js"],
      techClasses: ["bg-red-100 text-red-800", "bg-green-100 text-green-800"],
      live: "https://healthportal.com",
      github: "https://github.com/username/healthportal",
      details: "Case study of designing a secure telemedicine portal with patient scheduling, video consultations, and EHR integration."
    }
  ],
  open: [
    {
      title: "OpenWeather API Wrapper",
      image: "https://source.unsplash.com/400x250/?weather,api",
      desc: "Open source JS library for seamless weather data integration.",
      tech: ["JavaScript", "API"],
      techClasses: ["bg-yellow-100 text-yellow-800", "bg-gray-200 text-gray-800"],
      live: "https://npmjs.com/package/openweather-wrapper",
      github: "https://github.com/username/openweather-wrapper",
      details: "JS library to simplify OpenWeatherMap API consumption. Clean interface, async support, and complete docs."
    },
    {
      title: "Markdown Blog Engine",
      image: "https://source.unsplash.com/400x250/?markdown,blog",
      desc: "A static blog generator powered by Markdown and Node.js.",
      tech: ["Node.js", "Markdown"],
      techClasses: ["bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800"],
      live: "https://markdownblogdemo.com",
      github: "https://github.com/username/markdown-blog",
      details: "Generate static blogs from Markdown with theming and live preview. CLI and REST API available."
    }
  ],
  published: [
    {
      title: "Web Animation Article",
      image: "https://source.unsplash.com/400x250/?animation,web",
      desc: "Published on CSS-Tricks: 'Modern Web Animation Techniques'.",
      tech: ["Article", "CSS"],
      techClasses: ["bg-teal-100 text-teal-800", "bg-blue-100 text-blue-800"],
      live: "https://css-tricks.com/web-animation-techniques/",
      github: "https://github.com/username/web-animation-article",
      details: "In-depth article on CSS-Tricks, covering the latest web animation techniques and performance tips."
    },
    {
      title: "React Best Practices",
      image: "https://source.unsplash.com/400x250/?react,blog",
      desc: "Featured in Smashing Magazine: 'React Patterns & Practices'.",
      tech: ["React", "Blog"],
      techClasses: ["bg-blue-100 text-blue-800", "bg-purple-100 text-purple-800"],
      live: "https://smashingmagazine.com/react-patterns",
      github: "https://github.com/username/react-best-practices",
      details: "Featured article on Smashing Magazine, discussing advanced React patterns and scalable code architecture."
    }
  ]
};
