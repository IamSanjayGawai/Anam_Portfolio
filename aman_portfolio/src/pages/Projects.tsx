import { useEffect, useState } from 'react';
import { FaGlobe, FaGithub, FaArrowLeft, FaXmark } from 'react-icons/fa6';
import { exploreProjects } from '../data/data';
import axios from 'axios';
interface Link {
  type: 'github' | 'live';
  url: string;
}

interface Project {
  title: string;
  image: string;
  tech: string[];
  techClasses: string[];
  shortDesc?: string;
  desc?: string;
  fullDesc?: string;
  details?: string;
  links?: Link[];
}

// 👇 Type keys of exploreProjects to restrict valid tabs
type ExploreTab = keyof typeof exploreProjects;

export default function PortfolioShowcase() {
  const [showExplore, setShowExplore] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<ExploreTab>('recent');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

    const handleGetProject = async() =>{

       let response = await axios.get('http://localhost:4000/api/explore/get')
       console.log(response.data, "reposne data")
           setProjects(response.data);

  }

  // Sample data for demonstration
  useEffect(() => {
  handleGetProject();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('portfolio');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setIsVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  const openModal = (project: Project) => setModalData(project);
  const closeModal = () => setModalData(null);

  const renderProjectCard = (project: Project, openModalFn: (project: Project) => void) => (
    <div key={project.title} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full flex flex-col group">
      <div className="overflow-hidden rounded-t-xl">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5 flex flex-col h-full flex-1">
        <h3 className="text-xl font-semibold mb-1 text-gray-900">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map((t, i) => (
            <span key={i} className={`px-2 py-1 rounded text-xs font-semibold ${project.techClasses[i]}`}>{t}</span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 flex-1">{project.shortDesc || project.desc}</p>
        <div className="flex gap-2 mt-auto">
          {project.links?.map(link => (
            <a key={link.type} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex-1 inline-flex items-center justify-center ${link.type === 'github' ? 'bg-gray-800 hover:bg-black' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-2 rounded font-semibold text-sm shadow`}>
              {link.type === 'github' ? <FaGithub className="mr-2" /> : <FaGlobe className="mr-2" />}
              {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
            </a>
          ))}
          <button onClick={() => openModalFn(project)} className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition-colors font-semibold text-sm">View Details</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <section id="portfolio" className={`portfolio-section max-w-5xl mx-auto px-4 py-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Featured Projects</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {projects.map((project: Project) => renderProjectCard(project, openModal))}
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={() => setShowExplore(true)} className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none">Explore More</button>
        </div>
      </section>

      {showExplore && (
        <section className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center mb-8">
              <button onClick={() => setShowExplore(false)} className="text-gray-600 hover:text-blue-600 text-2xl mr-4 focus:outline-none"><FaArrowLeft /></button>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explore More Projects</h2>
            </div>
            <div className="flex border-b border-gray-200 mb-8 gap-4">
              {(Object.keys(projects) as ExploreTab[]).map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn px-4 py-2 font-semibold border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-700' : 'text-gray-700 border-transparent hover:text-blue-600'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreProjects[activeTab].map((project: Project) => renderProjectCard(project, openModal))}
            </div>
          </div>
        </section>
      )}

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 relative p-6">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl focus:outline-none"><FaXmark /></button>
            <img src={modalData.image} alt={modalData.title} className="w-full h-44 object-cover rounded mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{modalData.title}</h3>
            <div className="mb-3">
              {modalData.tech.map((t, i) => (
                <span key={i} className={`inline-block px-2 py-1 rounded text-xs font-semibold mr-2 mb-2 ${modalData.techClasses[i]}`}>{t}</span>
              ))}
            </div>
            <p className="text-gray-700 mb-5">{modalData.fullDesc || modalData.details}</p>
            <div className="flex gap-2">
              {modalData.links?.map((link: Link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${link.type === 'github' ? 'bg-gray-800 hover:bg-black' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-2 rounded font-semibold text-sm shadow`}>
                  {link.type === 'github' ? <FaGithub /> : <FaGlobe />} {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
