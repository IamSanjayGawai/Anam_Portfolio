import React, { useEffect, useState } from 'react'
import HeroText from './HeroText';
import axios from 'axios';

type AboutProps = {
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

type AboutDetailsProps = {
  name: string,
  about: string,
  headline: string,
  role: string,
  image: string,
  mission: string
}
const backendUrl = import.meta.env.VITE_MONGODB_URI;
const About: React.FC<AboutProps> = ({ sectionRefs }) => {
  const [aboutDetail, setAboutDetail] = useState<AboutDetailsProps | null>(null);

  const handleGetAbout = async () => {
    const response = await axios.get(`${backendUrl}/api/authors`);
    setAboutDetail(response.data);
  };

  useEffect(() => {
    handleGetAbout()
  }, [])

  // const normalizedImagePath = aboutDetail?.image?.replace(/\\/g, "/");

  // const imageUrl = normalizedImagePath?.startsWith("http")
  //   ? normalizedImagePath
  //   : normalizedImagePath?.startsWith("uploads/")
  //     ? `${backendUrl}/${normalizedImagePath}`
  //     : `${backendUrl}/uploads/${normalizedImagePath}`;

  return (
    <>
      <section
        id="home"
        ref={(el) => { sectionRefs.current[0] = el as HTMLDivElement | null; }}
        className="w-full section relative flex flex-col justify-center items-center text-center overflow-hidden"
      >
        {/* Animated background SVG */}
        <div className="absolute inset-0 -z-10">
          <svg
            className="w-full h-full animate-pulse opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1463 360"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#ff7a18", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#af002d", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#grad1)"
              d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,218.7C672,235,768,245,864,224C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="50 0"
                dur="8s"
                repeatCount="indefinite"
                additive="sum"
                values="0 0; 50 0; 0 0"
              />
            </path>
          </svg>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-4 ">
          {aboutDetail ? <HeroText text={aboutDetail.name} /> : null}

          <div className="text-lg md:text-2xl font-medium text-white/80 mb-2">
            Engineer. Creator. Dreamer.
          </div>
          <div className="text-base md:text-lg text-[#eaeaea]/80 mb-6">
            {aboutDetail?.headline}
          </div>
          <div className="flex flex-col items-center gap-2 mt-4 mb-8">
            <span className="glass text-orange-400 px-5 py-2 rounded-full font-semibold text-base shadow-lg">
              {aboutDetail?.role}
            </span>
          </div>
        </div>
        <div className="mt-12 pointer-events-none select-none">
          <svg width="36" height="36" className="animate-bounce mx-auto opacity-80">
            <circle cx="18" cy="18" r="15" stroke="#ff7a18" strokeWidth="2" opacity="0.16" />
            <path d="M18 12v9m0 0l-4-4m4 4l4-4" stroke="#ffb347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

    </>
  )
}

export default About;
