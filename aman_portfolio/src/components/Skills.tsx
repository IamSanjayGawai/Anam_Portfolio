
type SkillsProps ={
      sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const Skills = ({sectionRefs}:SkillsProps) => {


          const skills = [
  {
    title: "Security Analysis",
    icon: "🛡️",
    items: [
      { name: "Vulnerability Assessment", level: 92 },
      { name: "Penetration Testing", level: 88 },
      { name: "Risk Management", level: 90 }
    ]
  },
  {
    title: "Network Security",
    icon: "🔒",
    items: [
      { name: "Firewall Configuration", level: 85 },
      { name: "IDS/IPS", level: 82 },
      { name: "Network Monitoring", level: 87 }
    ]
  },
  {
    title: "Security Tools",
    icon: "⚡",
    items: [
      { name: "Wireshark", level: 88 },
      { name: "Metasploit", level: 80 },
      { name: "Nmap", level: 95 }
    ]
  }
];

  return (
   <>
   <section 
  id="skills" 
  ref={el => { sectionRefs.current[2] = el as HTMLDivElement | null; }} 
  className="section flex flex-col gap-12 items-center justify-center px-2 py-6" 
> 
  <h2 className="text-3xl md:text-4xl font-extrabold glow-text mb-4">Security Expertise</h2> 
  <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl"> 
    {skills.map((category, idx) => ( 
      <div key={idx} className="glass rounded-2xl p-6 shadow-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group"> 
        <div className="flex items-center gap-3 mb-4"> 
          <span className="text-cyan-400 text-2xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span> 
          <span className="font-bold text-lg text-cyan-300 group-hover:text-cyan-200 transition-colors">{category.title}</span> 
        </div> 
        <div className="flex flex-col gap-3"> 
          {category.items.map((skill, skillIdx) => ( 
            <div key={skillIdx} className="group/skill relative overflow-hidden"> 
              <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/60 rounded-lg p-4 border border-slate-700/40 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-sm"> 
                <div className="flex items-center justify-between"> 
                  <span className="text-slate-200 font-medium group-hover/skill:text-cyan-200 transition-colors duration-300">{skill.name}</span> 
                  <div className="flex space-x-1"> 
                    {[...Array(5)].map((_, i) => ( 
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i < Math.floor(skill.level / 20) 
                            ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50' 
                            : 'bg-slate-600/50'
                        }`} 
                      /> 
                    ))} 
                  </div> 
                </div> 
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" /> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    ))} 
  </div> 
</section>
   
   </>
  )
}

export default Skills