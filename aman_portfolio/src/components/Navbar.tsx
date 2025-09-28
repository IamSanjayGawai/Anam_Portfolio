import { useState } from 'react';
// import { Link } from 'react-router-dom';


const backendUrl = import.meta.env.VITE_MONGODB_URI;
const navbar = () => {
        const [isOpen, setIsOpen] = useState(false);
  return (
    <div>      <header className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-8 py-5 bg-[#10111A]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-extrabold tracking-wide text-orange-400">
          Aman Pandit
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href={`${backendUrl}/api/files/download-resume`} target="_blank"
          download
          className="glass-btn px-5 py-2 rounded-full text-base font-semibold hover:bg-orange-500/80 hover:text-white transition focus:ring-2 focus:ring-orange-400 shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 4v12m0 0l-3-3m3 3l3-3" />
            <path d="M6 20h12" />
          </svg>
          Resume / CV
        </a>
        {/* <Link to={"/admin"}>Admin</Link> */}
        <a
          href="mailto:aman@email.com"
          className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 px-6 py-2 rounded-full text-base font-semibold text-white shadow-lg hover:scale-105 transition focus:ring-2 focus:ring-pink-400 glow-text"
        >
          Say Hi!
        </a>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden flex flex-col gap-1 z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#10111A] shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden flex flex-col p-6 gap-6`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="self-end text-2xl text-white"
        >
          &times;
        </button>
        <a
          href="/cv.pdf"
          download
          className="text-white text-lg font-semibold"
        >
          Resume / CV
        </a>
        
        <a
          href="mailto:aman@email.com"
          className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 px-4 py-2 rounded-full text-base font-semibold text-white shadow-lg"
          onClick={() => setIsOpen(false)}
        >
          Say Hi!
        </a>
      </div>
    </header>
</div>
  )
}

export default navbar