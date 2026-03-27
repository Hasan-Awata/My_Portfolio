import React, { useEffect, useState } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the data from the JSON file when the site loads
  useEffect(() => {
    fetch('/data/projects.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.projects) {
          setProjects(data.projects);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-sans selection:bg-fuchsia-500/30">
      
      {/* HERO SECTION */}
      <header className="py-20 md:py-32 px-6 md:px-8 max-w-5xl mx-auto flex flex-col justify-center items-start">
        <p className="text-violet-400 font-mono mb-4 tracking-wide text-sm md:text-base">Hello, world. I am Hasan Awata</p>
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          A Backend <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">
            Developer.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
          I architect robust, scalable, and secure server-side systems. I specialize in asynchronous programming, database optimization, and building clean, enterprise-grade APIs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#projects" className="text-center px-6 py-3 bg-violet-500/10 border border-violet-500/50 text-violet-400 rounded-md font-mono hover:bg-violet-500/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
            View Work
          </a>
          <a href="https://github.com/Hasan-Awata" target="_blank" rel="noreferrer" className="text-center px-6 py-3 text-gray-300 border border-gray-700 rounded-md font-mono hover:bg-gray-800 transition-all duration-300">
            GitHub Profile
          </a>
        </div>
      </header>

      {/* DYNAMIC PROJECTS SECTION */}
      <section id="projects" className="py-16 md:py-20 px-6 md:px-8 max-w-5xl mx-auto border-t border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-12 flex items-center gap-3">
          <span className="text-violet-400 font-mono text-lg md:text-xl">01.</span> Projects
        </h2>

        {loading ? (
          <p className="text-violet-400 font-mono animate-pulse">Loading secure systems...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 font-mono">No projects found. Add some via the admin panel!</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            
            {/* Loop through projects dynamically */}
            {projects.map((project, index) => {
              
              const isEven = index % 2 === 0;
              
              // Alternating Violet and Fuchsia accents for the Cyberpunk theme
              const cardHover = isEven ? "hover:border-violet-500/30" : "hover:border-fuchsia-500/30";
              const titleColor = isEven ? "group-hover:text-violet-400" : "group-hover:text-fuchsia-400";
              const iconColor = isEven ? "text-violet-400 hover:text-violet-300" : "text-fuchsia-400 hover:text-fuchsia-300";
              const highlightBorder = isEven ? "border-violet-500" : "border-fuchsia-500";
              const highlightText = isEven ? "text-violet-400" : "text-fuchsia-400";
              const markerTheme = isEven ? "marker:text-violet-500" : "marker:text-fuchsia-500";
              
              return (
                <div key={index} className={`bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 transition-colors duration-300 group ${cardHover}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl md:text-2xl font-bold text-white transition-colors ${titleColor}`}>{project.title}</h3>
                    <a href={project.repo_link} target="_blank" rel="noreferrer" className={`mt-1 md:mt-0 transition-colors ${iconColor}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                  <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Dynamic Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className={`bg-gray-950 border-l-2 ${highlightBorder} p-4 md:p-5 rounded-r-lg mb-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]`}>
                      <h4 className={`font-mono text-xs md:text-sm mb-3 uppercase tracking-wider ${highlightText}`}>Engineering Highlights</h4>
                      <ul className={`list-disc list-outside ml-4 md:ml-5 space-y-2 text-gray-300 text-sm ${markerTheme}`}>
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dynamic Tools */}
                  <div className="flex flex-wrap gap-2 md:gap-3 font-mono text-xs text-gray-500">
                    {project.tools && project.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full">{tool}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 font-mono text-xs md:text-sm border-t border-gray-800">
        <p>Architected by You. Powered by Decap CMS.</p>
      </footer>
    </div>
  );
}

export default App;