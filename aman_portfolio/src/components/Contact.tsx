// import React, { useState } from 'react';
// import axios from 'axios';
// import { Github, Linkedin, Instagram } from "lucide-react";
// import { useEffect } from 'react';

// interface ContactProps {
//   sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
// }

// const Contact: React.FC<ContactProps> = ({ sectionRefs }) => {
//   // Local state to hold form data
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const [status, setStatus] = useState<string>('');

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const backendUrl = import.meta.env.VITE_MONGODB_URI;
//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('Sending...');

//     try {
//       const response = await axios.post(`${backendUrl}/api/contact`, formData);
//       if (response.data.success) {
//         setStatus('✅ Thank you for reaching out!');
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         setStatus('❌ Something went wrong.');
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('❌ Server error. Please try again.');
//     }
//   };

//   useEffect(() => {
//     // Load existing author details if any
//     const fetchAuthor = async () => {
//       const res = await axios.get(`${backendUrl}/api/authors`);
//       const data = res.data;
//       if (data) {
//         setAuthorData((prev) => ({
//           ...prev,
//           name: data.name,
//           about: data.about,
//           headline: data.headline,
//           role: data.role,
//           github: data.github,
//     instagram: data.instagram,
//     linkedin: data.linkedin,
//     gmail: data.gmail,
//           imagePreview: data.image ? `${backendUrl}/${data.image}` : null,
//         }));
//       }
//     };
//     if (showProfile) {
//       fetchAuthor();
//     }
//   }, [showProfile]);

//   return (
//     <>
//       {/* Contact Section */}
//       <section
//         id="contact"
//         ref={el => { sectionRefs.current[4] = el as HTMLDivElement | null; }}
//         className="section flex flex-col items-center justify-center px-2 py-6"
//       >
//         <h2 className="text-3xl md:text-4xl font-extrabold glow-text mb-6">Contact Me</h2>
//         <form
//           onSubmit={handleSubmit}
//           className="glass-form rounded-2xl shadow-lg px-8 py-8 w-full max-w-lg flex flex-col gap-5 mb-7"
//         >
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//             required
//             placeholder="Your Name"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//             required
//             placeholder="Your Email"
//           />
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-white/60 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
//             required
//             placeholder="Your Message"
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 px-7 py-3 rounded-full font-semibold tracking-wide text-lg text-white shadow-lg hover:scale-105 transition focus:ring-2 focus:ring-orange-400 glow-text"
//           >
//             Send Message
//           </button>

//           {/* Status message */}
//           {status && <p className="text-white">{status}</p>}
//         </form>
   


//     <div className="flex gap-6 mb-3">
//       <a
//         href="https://github.com/yourusername"
//         target="_blank"
//         rel="noopener noreferrer"
//         title="GitHub"
//         className="hover:text-orange-400 transition"
//       >
//         <Github size={28} />
//       </a>

//       <a
//         href="https://www.linkedin.com/in/yourprofile/"
//         target="_blank"
//         rel="noopener noreferrer"
//         title="LinkedIn"
//         className="hover:text-orange-400 transition"
//       >
//         <Linkedin size={28} />
//       </a>

//       <a
//         href="https://www.instagram.com/yourusername/"
//         target="_blank"
//         rel="noopener noreferrer"
//         title="Instagram"
//         className="hover:text-orange-400 transition"
//       >
//         <Instagram size={28} />
//       </a>
//     </div>


//         <div className="glass px-5 py-2 mt-3 hidden lg:block rounded-full text-orange-400 font-semibold text-base shadow-md select-text">
//           aman@gmail.com
//         </div>
//       </section>
//     </>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

interface ContactProps {
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const Contact: React.FC<ContactProps> = ({ sectionRefs }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<string>('');
  const [authorData, setAuthorData] = useState<any>(null);

  const backendUrl = import.meta.env.VITE_MONGODB_URI;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post(`${backendUrl}/api/contact`, formData);
      if (response.data.success) {
        setStatus('✅ Thank you for reaching out!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error. Please try again.');
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/authors`);
        setAuthorData(res.data);
      } catch (err) {
        console.error("Error fetching author details:", err);
      }
    };
    fetchAuthor();
  }, []);

  // Define social icons dynamically
  const socialLinks = [
    {
      name: "GitHub",
      url: authorData?.github,
      icon: <Github size={28} />
    },
    {
      name: "LinkedIn",
      url: authorData?.linkedin,
      icon: <Linkedin size={28} />
    },
    {
      name: "Instagram",
      url: authorData?.instagram,
      icon: <Instagram size={28} />
    },
    {
      name: "Gmail",
      url: authorData?.gmail ? `mailto:${authorData.gmail}` : null,
      icon: <Mail size={28} />
    }
  ];

  return (
    <section
      id="contact"
      ref={el => { sectionRefs.current[4] = el as HTMLDivElement | null; }}
      className="section flex flex-col items-center justify-center px-2 py-6"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold glow-text mb-6">Contact Me</h2>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-form rounded-2xl shadow-lg px-8 py-8 w-full max-w-lg flex flex-col gap-5 mb-7"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
          placeholder="Your Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
          placeholder="Your Email"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-white/60 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
          placeholder="Your Message"
        ></textarea>
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 px-7 py-3 rounded-full font-semibold tracking-wide text-lg text-white shadow-lg hover:scale-105 transition focus:ring-2 focus:ring-orange-400 glow-text"
        >
          Send Message
        </button>

        {status && <p className="text-white">{status}</p>}
      </form>

      {/* Social Links */}
      <div className="flex gap-6 mb-3">
        {socialLinks.map(
          (link, idx) =>
            link.url && (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="hover:text-orange-400 transition"
              >
                {link.icon}
              </a>
            )
        )}
      </div>

      {/* Email Display */}
      {authorData?.gmail && (
        <div className="glass px-5 py-2 mt-3 hidden lg:block rounded-full text-orange-400 font-semibold text-base shadow-md select-text">
          {authorData.gmail}
        </div>
      )}
    </section>
  );
};

export default Contact;

