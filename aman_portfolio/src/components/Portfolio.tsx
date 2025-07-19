
import React, { useState, useEffect } from 'react';
import { Globe, Github, ArrowLeft, X } from 'lucide-react';
import axios from 'axios';

// interface Project {
//   title: string;
//   image: string;
//   shortDesc: string;
//   fullDesc: string;
//   tech: string[];
//   techClasses: string[];
//   links: { type: 'live' | 'github'; url: string }[];
// }

type Project = {
  _id: string;
  type: string;
  title: string;
  imageUrl: string | null; // ✅ match backend field!
  imagePreview: string | null;
  desc: string;
  tech: string[];
  techClasses: string[];
  live: string;
  github: string;
  details: string;
};


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
    const [projects, setProjects] = useState<Project[]>([]);



  const handleGetProject = async() =>{

       let response = await axios.get('http://localhost:4000/api/explore/get')

           setProjects(response.data);

  }

  // Sample data for demonstration
  useEffect(() => {
  handleGetProject();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (project: Project | ExploreProject) => {
    setModalProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setModalProject(null), 300);
  };

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project }) => (
    <div className="bg-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full  group flex flex-col transform hover:-translate-y-1">
      <div className="overflow-hidden rounded-t-xl">
        <img 
              src={
          project.imagePreview
            ? project.imagePreview
            : project.imageUrl?.startsWith("http")
            ? project.imageUrl
            : `http://localhost:4000/${project.imageUrl?.replace(/\\/g, "/")}`
        }
          alt={project.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col h-full flex-1">
        <h3 className="text-xl font-semibold mb-1 text-white">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map((tech, i) => (
            <span key={tech} className={`${project.techClasses[i]} px-2 py-1 rounded text-xs font-semibold`}>
              {tech}
            </span>
          ))}
        </div>
        {/* <p className="text-gray-600 mb-4 flex-1">{project.shortDesc}</p> */}
        <div className="flex gap-2 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded transition-colors font-semibold text-sm shadow bg-orange-400 hover:bg-orange-500 text-white"
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
              className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded transition-colors font-semibold text-sm shadow bg-gray-800 hover:bg-black text-white"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          )}
          <button
            onClick={() => openModal(project)}
            className="flex-1 border border-blue-600 text-orange-400 hover:bg-blue-50 px-3 py-2 rounded transition-colors font-semibold text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const ExploreProjectCard: React.FC<{ project: ExploreProject }> = ({ project }) => (
    <div className="bg-[#10111A] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group h-full transform hover:-translate-y-1">
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
              className="flex-1 inline-flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white px-3 py-2 rounded font-semibold text-sm shadow transition-colors"
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
            className="flex-1 border border-blue-600 text-orange-400 hover:bg-blue-50 px-3 py-2 rounded font-semibold text-sm transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const Modal: React.FC = () => {
    if (!modalProject) return null;



    
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
            src={
              'image' in modalProject
                ? modalProject.image
                : modalProject.imagePreview
                ? modalProject.imagePreview
                : modalProject.imageUrl?.startsWith("http")
                ? modalProject.imageUrl
                : modalProject.imageUrl
                ? `http://localhost:4000/${modalProject.imageUrl.replace(/\\/g, "/")}`
                : ""
            }
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
          
          {/* <p className="text-gray-700 mb-5">{description}</p> */}
          
          <div className="flex gap-2">
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
          </div>
        </div>
      </div>
    );
  };

return (
  <div className="bg-[#10111A]  font-sans ">
    {/* Main Portfolio Section */}
    <section 
      className={`max-w-6xl mx-auto px-4 py-5 transition-all duration-700 ${
        showExploreMore ? 'hidden' : 'block'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {projects.slice(0, 3).map((project, index) => (
    <ProjectCard key={index} project={project} index={index} />
  ))}
</div>


      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowExploreMore(true)}
          className="bg-orange-400 text-white px-6 py-3 rounded-full font-bold text-base md:text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Explore More
        </button>
      </div>
    </section>

    {/* Explore More Section */}
    <section 
      className={`fixed inset-0 bg-[#10111A] z-40 overflow-y-auto transition-all duration-500 ${
        showExploreMore ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setShowExploreMore(false)}
            className="text-gray-100 hover:text-orange-400 text-2xl mr-4 focus:outline-none transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
            Explore More Projects
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-gray-100 mb-8">
          {[
            { key: 'recent', label: 'Recent Projects' },
            { key: 'case', label: 'Case Studies' },
            { key: 'open', label: 'Open Source' },
            { key: 'published', label: 'Published Work' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                activeTab === key
                  ? 'border-orange-400 text-orange-400'
                  : 'border-transparent text-gray-100 hover:text-orange-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 gap-6">
          {projects
            .filter((project) => project.type === activeTab)
            .map((project, index) => {
              const image =
                project.imagePreview
                  ? project.imagePreview
                  : project.imageUrl?.startsWith("http")
                  ? project.imageUrl
                  : project.imageUrl
                  ? `http://localhost:4000/${project.imageUrl.replace(/\\/g, "/")}`
                  : "";
              const exploreProject: ExploreProject = {
                title: project.title,
                image,
                desc: project.desc,
                details: project.details,
                tech: project.tech,
                techClasses: project.techClasses,
                live: project.live,
                github: project.github,
              };
              return (
                <ExploreProjectCard key={`${activeTab}-${index}`} project={exploreProject} />
              );
            })}
        </div>
      </div>
    </section>

    {/* Modal */}
    <Modal />
  </div>
);

};

export default Portfolio;
