import React, { useState } from 'react';
import axios from 'axios';

interface ContactProps {
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const Contact: React.FC<ContactProps> = ({ sectionRefs }) => {
  // Local state to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<string>('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const backendUrl = import.meta.env.VITE_MONGODB_URI;
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

  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        ref={el => { sectionRefs.current[4] = el as HTMLDivElement | null; }}
        className="section flex flex-col items-center justify-center px-2 py-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold glow-text mb-6">Contact Me</h2>
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

          {/* Status message */}
          {status && <p className="text-white">{status}</p>}
        </form>

        <div className="flex gap-6 mb-3">
          <a href="#" title="GitHub" className="text-2xl hover:text-orange-400 transition">
            <span>🐙</span>
          </a>
          <a href="#" title="Twitter" className="text-2xl hover:text-orange-400 transition">
            <span>🐦</span>
          </a>
          <a href="#" title="LinkedIn" className="text-2xl hover:text-orange-400 transition">
            <span>🔗</span>
          </a>
        </div>

        <div className="glass px-5 py-2 mt-3 hidden lg:block rounded-full text-orange-400 font-semibold text-base shadow-md select-text">
          aman@gmail.com
        </div>
      </section>
    </>
  );
};

export default Contact;
