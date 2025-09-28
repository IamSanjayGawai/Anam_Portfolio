import { useState, useEffect, useRef } from 'react';
import Index from "../pages/Index";
import Navbar from '../components/Navbar';
import About from '../components/About';
import Contact from '../components/Contact';
import Skills from '../components/Skills';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [exploreOpen, setExploreOpen] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);



  // Handle scroll to update active navigation
  useEffect(() => {
    const handleScroll = () => {
      let currentIdx = 0;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionRefs.current.forEach((section, idx) => {
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          const sectionBottom = bottom + window.scrollY;
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            currentIdx = idx;
          }
        }
      });
      setActiveSection(currentIdx);
      console.log('Active section:', currentIdx, 'Scroll position:', scrollPosition);
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize active section on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  // Handle navigation click
  const handleNavClick = (idx: number) => {
    setActiveSection(idx);
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
  };





  // Close explore more on outside click
  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if (exploreOpen && !e.target.closest('#exploreMoreContainer')) {
        setExploreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [exploreOpen]);

  const navItems = [
    { icon: "M8 5v14l11-7z", label: "home" },
    { icon: "M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2", label: "about" },
    { icon: "M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z", label: "skills" },
    { icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z", label: "portfolio" },
    { icon: "M21 10.5a8.38 8.38 0 0 1-3.88 7.13C15.06 19.29 13.62 20 12 20s-3.06-.71-5.12-2.37A8.38 8.38 0 0 1 3 10.5M8 9a4 4 0 1 0 8 0 4 4 0 0 0-8 0z", label: "contact" }
  ];



  return (
    <div className="relative min-h-screen overflow-x-hidden text-white bg-[#11121c]">
      {/* Custom Styles */}
     <style>{`
    html,body {
      font-family: 'Inter', sans-serif;
      background: #10111a;
    }

    /* Animated Gradient Background */
    .animated-bg::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      background: linear-gradient(-45deg, #ff9800, #ff7a18, #fa709a, #ff9800);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Your existing styles below... */
    .glass {
      position: relative;
      z-index: 1;
      background: rgba(28, 28, 36, 0.72);
      box-shadow: 0 1px 10px 2px rgba(30, 30, 38, 0.22), 0 0 24px #f9731633;
      backdrop-filter: blur(22px) saturate(1.25);
      border: 1px solid rgba(255,255,255,0.05);
    }

    .glow-text {
      background: linear-gradient(90deg, #ff9800, #ff7a18, #fa709a, #ff9800);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      background-size: 200% 200%;
      animation: gradshift 7s linear infinite;
      text-shadow: 0 1px 10px #ffb34744, 0 0 1px #fff;
    }

    @keyframes gradshift {
      0%,100% { background-position: 0% 60%; }
      50% { background-position: 100% 40%; }
    }

    .section { scroll-margin-top: 60px; }
    .nav-float { top: 50%; transform: translateY(-50%); }
    .glass-btn {
      background: rgba(27, 27, 36, 0.63);
      box-shadow: 0 2px 8px #ffb34733, 0 1px 10px rgba(30, 30, 38, 0.18);
      border: 1px solid rgba(255,255,255,0.06);
      backdrop-filter: blur(14px) saturate(1.2);
    }
    .glass-btn:active { transform: scale(.97);}
    .glass-form { background: rgba(28,28,36,0.8); }

    @media (max-width: 1023px) {
      .nav-float {
        top: auto;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%) !important;
        flex-direction: row !important;
        width: auto !important;
        height: auto !important;
      }
      .nav-float aside { flex-direction: row !important; }
    }

    ::selection { background: #ff7a18; color: #fff; }
  `}</style>


      {/* Header */}
      <Navbar />

 
<nav
  className="
    fixed z-40
    flex items-center justify-center gap-4
    transition-all

    /* Mobile: horizontal bottom center */
    bottom-6 left-1/2 -translate-x-1/2 flex-row w-auto h-16 rounded-full

    /* Large screens: vertical left center */
    lg:bottom-auto lg:left-6 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:flex-col lg:w-16 lg:h-[340px] lg:rounded-3xl

    bg-gray-100
  "
>
  <aside className=" flex flex-row lg:flex-col items-center gap-4 ">
    {navItems.map((item, idx) => (
      <button
        key={idx}
        aria-current={activeSection === idx ? "page" : "false"}
        aria-label={item.label}
        onClick={() => handleNavClick(idx)}
        className={`w-12 h-12 rounded-full flex justify-center items-center text-xl transition-all duration-300 focus:ring-2 focus:ring-orange-400
          ${activeSection === idx
            ? "bg-orange-500 shadow-lg text-white scale-110 ring-2 ring-orange-400"
            : "text-gray-400 hover:text-white hover:bg-slate-800/80"
          }`}
        
      >
        <svg
          className="w-6 h-6"
          fill={idx === 0 ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d={item.icon} />
        </svg>
      </button>
    ))}
  </aside>


</nav>



     

      {/* Email Badge */}
      {/* <div className="fixed bottom-8 right-8 z-30 flex items-center gap-2 pointer-events-auto select-text">
        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
        <span className="text-white/70 font-mono glass px-3 py-1.5 rounded-full text-sm shadow-md">aman@email.com</span>
      </div> */}

      {/* Main Content */}
      <main className="relative pt-32 lg:pt-40 max-w-[900px] mx-auto space-y-24">
        {/* Home Section */}
        <About sectionRefs={sectionRefs} />

        {/* About Section */}
        <section
          id="about"
          ref={el => { sectionRefs.current[1] = el as HTMLDivElement | null; }}
          className="section flex flex-col lg:flex-row items-center justify-center gap-10 px-2 py-6"
        >
          <div className="max-w-xl flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-extrabold glow-text mb-2">About Me</h2>
            <p className="text-base md:text-lg text-white/90 font-medium">
              <span className="font-bold text-orange-400">Hi, I'm Aman.</span>
              I'm a passionate developer who loves creating amazing web experiences. 
              With expertise in modern web technologies, I build solutions that are both 
              beautiful and functional. I enjoy turning complex problems into simple, 
              elegant designs.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <Skills sectionRefs={sectionRefs} />

        {/* Portfolio Section */}
        <section
          id="portfolio"
          ref={el => { sectionRefs.current[3] = el as HTMLDivElement | null; }}
          className="section flex flex-col items-center px-2 py-6"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold glow-text mb-8">Featured Projects</h2>
<Index />
        </section>
        <Contact sectionRefs={sectionRefs} />
       
      </main>
    </div>
  );
};

export default HomePage;