
import React, { useState, useEffect } from 'react';
import { Globe, Github, ArrowLeft, X } from 'lucide-react';

interface Project {
  title: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  techClasses: string[];
  links: { type: 'live' | 'github'; url: string }[];
}

interface ExploreProject {
  title: string;
  image: string;
  desc: string;
  details?: string;
  tech: string[];
  techClasses: string[];
  live?: string;
  github?: string;
}

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showExploreMore, setShowExploreMore] = useState(false);
  const [activeTab, setActiveTab] = useState<'recent' | 'case' | 'open' | 'published'>('recent');
  const [modalProject, setModalProject] = useState<Project | ExploreProject | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const featuredProjects: Project[] = [
    {
      title: "Dashboard Pro",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      shortDesc: "Analytics dashboard built for startups with real-time insights and custom widgets.",
      fullDesc: "Dashboard Pro is a scalable analytics platform for modern startups. It offers real-time data tracking, customizable widgets, and a sleek UI. Role-based access and export features streamline workflows for teams.",
      tech: ["React", "Node.js", "MongoDB"],
      techClasses: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-gray-200 text-gray-800"],
      links: [
        { type: "live", url: "https://dashboardpro.live" },
        { type: "github", url: "https://github.com/username/dashboardpro" }
      ]
    },
    {
      title: "ShopEase",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      shortDesc: "Full-featured ecommerce platform with payment integration and admin panel.",
      fullDesc: "ShopEase is a robust ecommerce solution featuring seamless payment integration, inventory management, and a user-friendly admin panel. Built for scalability and security.",
      tech: ["Vue.js", "Firebase"],
      techClasses: ["bg-yellow-100 text-yellow-800", "bg-indigo-100 text-indigo-800"],
      links: [
        { type: "live", url: "https://shopease.com" },
        { type: "github", url: "https://github.com/username/shopease" }
      ]
    },
    {
      title: "Writer's Hub",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d0?w=400&h=250&fit=crop",
      shortDesc: "A collaborative blog platform for writers to publish, share, and engage with readers.",
      fullDesc: "Writer's Hub enables writers to publish articles, collaborate, and build their portfolio. Features include social sharing, comment system, and content analytics.",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      techClasses: ["bg-purple-100 text-purple-800", "bg-pink-100 text-pink-800", "bg-gray-200 text-gray-800"],
      links: [
        { type: "live", url: "https://writershub.app" },
        { type: "github", url: "https://github.com/username/writershub" }
      ]
    }
  ];

  const exploreProjects = {
    recent: [
      {
        title: "Fitness Tracker",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        desc: "Track workouts, nutrition, and progress with this mobile-friendly app.",
        tech: ["React Native", "Firebase"],
        techClasses: ["bg-blue-100 text-blue-800", "bg-indigo-100 text-indigo-800"],
        live: "https://fitnesstracker.app",
        github: "https://github.com/username/fitnesstracker",
        details: "A comprehensive fitness tracking application with personalized dashboards, health analytics, and goal tracking."
      },
      {
        title: "Eventify",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop",
        desc: "Event management platform with RSVP, ticketing, and calendar sync.",
        tech: ["Angular", "Express"],
        techClasses: ["bg-red-100 text-red-800", "bg-green-100 text-green-800"],
        live: "https://eventify.com",
        github: "https://github.com/username/eventify",
        details: "Manage events efficiently with RSVP tracking, ticketing, and Google Calendar integration. Mobile-friendly and secure."
      },
      {
        title: "CookBook",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop",
        desc: "End-to-end chatbot for customer service using NLP and machine learning.",
        tech: ["Python", "TensorFlow"],
        techClasses: ["bg-yellow-100 text-yellow-800", "bg-blue-100 text-blue-800"],
        live: "https://aichatbotdemo.com",
        github: "https://github.com/username/aichatbot",
        details: "A deep-dive case study into architecting an AI-powered chatbot for real-time support, leveraging NLP and ML."
      },
      {
        title: "Healthcare Portal (Case Study)",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
        desc: "Open source JS library for seamless weather data integration.",
        tech: ["JavaScript", "API"],
        techClasses: ["bg-yellow-100 text-yellow-800", "bg-gray-200 text-gray-800"],
        live: "https://npmjs.com/package/openweather-wrapper",
        github: "https://github.com/username/openweather-wrapper",
        details: "JS library to simplify OpenWeatherMap API consumption. Clean interface, async support, and complete docs."
      },
      {
        title: "Markdown Blog Engine",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop",
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
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        desc: "Published on CSS-Tricks: 'Modern Web Animation Techniques'.",
        tech: ["Article", "CSS"],
        techClasses: ["bg-teal-100 text-teal-800", "bg-blue-100 text-blue-800"],
        live: "https://css-tricks.com/web-animation-techniques/",
        github: "https://github.com/username/web-animation-article",
        details: "In-depth article on CSS-Tricks, covering the latest web animation techniques and performance tips."
      },
      {
        title: "React Best Practices",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
        desc: "Featured in Smashing Magazine: 'React Patterns & Practices'.",
        tech: ["React", "Blog"],
        techClasses: ["bg-blue-100 text-blue-800", "bg-purple-100 text-purple-800"],
        live: "https://smashingmagazine.com/react-patterns",
        github: "https://github.com/username/react-best-practices",
        details: "Featured article on Smashing Magazine, discussing advanced React patterns and scalable code architecture."
      }
    ]
  };

  const openModal = (project: Project | ExploreProject) => {
    setModalProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setModalProject(null), 300);
  };

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full md:w-1/3 group flex flex-col transform hover:-translate-y-1">
      <div className="overflow-hidden rounded-t-xl">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col h-full flex-1">
        <h3 className="text-xl font-semibold mb-1 text-gray-900">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map((tech, i) => (
            <span key={tech} className={`${project.techClasses[i]} px-2 py-1 rounded text-xs font-semibold`}>
              {tech}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 flex-1">{project.shortDesc}</p>
        <div className="flex gap-2 mt-auto">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 inline-flex items-center justify-center px-3 py-2 rounded transition-colors font-semibold text-sm shadow ${
                link.type === 'live' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-800 hover:bg-black text-white'
              }`}
            >
              {link.type === 'live' ? <Globe className="w-4 h-4 mr-2" /> : <Github className="w-4 h-4 mr-2" />}
              {link.type === 'live' ? 'Live' : 'GitHub'}
            </a>
          ))}
          <button
            onClick={() => openModal(project)}
            className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition-colors font-semibold text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const ExploreProjectCard: React.FC<{ project: ExploreProject }> = ({ project }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group h-full transform hover:-translate-y-1">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-40 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-lg font-semibold mb-1 text-gray-900">{project.title}</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map((tech, i) => (
            <span key={tech} className={`${project.techClasses[i]} px-2 py-1 rounded text-xs font-semibold`}>
              {tech}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 flex-1">{project.desc}</p>
        <div className="flex gap-2 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-semibold text-sm shadow transition-colors"
            >
              <Globe className="w-4 h-4 mr-2" />
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center bg-gray-800 hover:bg-black text-white px-3 py-2 rounded font-semibold text-sm shadow transition-colors"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          )}
          <button
            onClick={() => openModal(project)}
            className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded font-semibold text-sm transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const Modal: React.FC = () => {
    if (!modalProject) return null;

    const isProjectType = 'fullDesc' in modalProject;
    const description = isProjectType ? modalProject.fullDesc : (modalProject.details || modalProject.desc);
    
    return (
      <div 
        className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center transition-all duration-300 ${
          isModalVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeModal}
      >
        <div 
          className={`bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 relative p-6 transition-all duration-300 ${
            isModalVisible ? 'scale-100' : 'scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl focus:outline-none transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={modalProject.image} 
            alt={modalProject.title} 
            className="w-full h-44 object-cover rounded mb-4"
          />
          
          <h3 className="text-2xl font-bold mb-2 text-gray-900">{modalProject.title}</h3>
          
          <div className="mb-3">
            {modalProject.tech.map((tech, i) => (
              <span key={tech} className={`inline-block ${modalProject.techClasses[i]} px-2 py-1 rounded text-xs font-semibold mr-2 mb-2`}>
                {tech}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 mb-5">{description}</p>
          
          <div className="flex gap-2">
            {isProjectType ? (
              modalProject.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded font-semibold text-sm shadow transition-colors ${
                    link.type === 'live' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-800 hover:bg-black text-white'
                  }`}
                >
                  {link.type === 'live' ? <Globe className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                  {link.type === 'live' ? 'Live' : 'GitHub'}
                </a>
              ))
            ) : (
              <>
                {modalProject.live && (
                  <a
                    href={modalProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-semibold text-sm shadow transition-colors mr-2"
                  >
                    <Globe className="w-4 h-4" />
                    Live
                  </a>
                )}
                {modalProject.github && (
                  <a
                    href={modalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-gray-800 hover:bg-black text-white px-3 py-2 rounded font-semibold text-sm shadow transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Main Portfolio Section */}
      <section 
        className={`max-w-5xl mx-auto px-4 py-12 transition-all duration-700 ${
          showExploreMore ? 'opacity-0 pointer-events-none hidden' : ''
        } ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Featured Projects</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowExploreMore(true)}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Explore More
          </button>
        </div>
      </section>

      {/* Explore More Section */}
      <section 
        className={`fixed inset-0 bg-white z-40 overflow-y-auto transition-all duration-300 ${
          showExploreMore ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setShowExploreMore(false)}
              className="text-gray-600 hover:text-blue-600 text-2xl mr-4 focus:outline-none transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explore More Projects</h2>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 gap-4">
            {[
              { key: 'recent', label: 'Recent Projects' },
              { key: 'case', label: 'Case Studies' },
              { key: 'open', label: 'Open Source' },
              { key: 'published', label: 'Published Work' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                  activeTab === key
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-700 hover:text-blue-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreProjects[activeTab].map((project, index) => (
              <ExploreProjectCard key={`${activeTab}-${index}`} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal />
    </div>
  );
};

export default Portfolio;
