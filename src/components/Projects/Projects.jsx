import "./Projects.scss";
import {
  playSound,
  playBackgroundMusic,
  pauseBackgroundMusic,
} from "../../utils/audioSystem";

const Projects = () => {
  const projects = [
    {
      title: "Minecraft Portfolio",
      description:
        "An immersive Minecraft-inspired 3D portfolio built with React Three Fiber and Three.js. Explore a fully interactive world showcasing my projects, skills, and creativity through custom animations, smooth camera controls, and a unique game-like experience.",
      image: "/images/minecraft-portfolio.webp",
      github: "https://github.com/avy9999/minecraft-portfolio",
      live: "https://avy-portfolio.vercel.app/",
      tech: [
        "React",
        "Three.js",
        "React Three Fiber",
        "Blender",
        "SCSS",
      ],
    },
    {
      title: "Chess Engine",
      description:
        "A custom-built chess engine focused on move generation, board evaluation, and minimax-based decision making. Built for performance and future AI training integration.",
      image: "/images/chess-engine.webp",
      github: "https://github.com/avy9999/chess_engine",
      live: "https://lichess.org/@/Ryu-Ishigori",
      tech: ["C++", "Minimax", "Algorithms"],
    },
    {
      title: "Contest Tracker App",
      description:
        "A web app that tracks competitive programming contests across platforms with reminders, filters, and personalized recommendations.",
      image: "/images/contest-tracker.webp",
      github: "https://github.com/avy9999/cp_contest_tracker",
      live: null,
      tech: ["Kotlin", "Node.js", "API"],
    },
  ];

  return (
    <div className="mc-projects">
      {projects.map((p, i) => (
        <div className="mc-project-card" key={i}>
          {/* HEADER (INVERTED STYLE) */}
          <div className="mc-project-header">
            <div className="mc-project-title">{p.title}</div>

            <div className="mc-project-actions">
              {p.live && (
                <a href={p.live} target="_blank" className="mc-btn" onClick={() => playSound("buttonClick")}>
                  Live
                </a>
              )}
              <a href={p.github} target="_blank" className="mc-btn" onClick={() => playSound("buttonClick")}>
                GitHub
              </a>
            </div>
          </div>

          {/* BODY */}
          <div className="mc-project-body">
            {/* BIGGER IMAGE */}
            <div className="mc-project-icon">
              <img src={p.image} alt={p.title} />
            </div>

            {/* CONTENT */}
            <div className="mc-project-info">
              <p className="mc-desc">{p.description}</p>

              <div className="mc-tech">
                {p.tech.map((t, idx) => (
                  <span key={idx} className="mc-tech-item">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;