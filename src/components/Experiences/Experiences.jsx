import "./Experiences.scss";

const Experiences = () => {
  const experiences = [
    {
      title: "Pokebest Bot Developer",
      company: "Pokebest",
      date: "2023 - 2025",
      description: [
        "Developed and maintained gameplay systems for a Pokémon-themed Discord bot serving 30,000+ users across 6000+ servers.",
        "Designed and implemented battle systems, event mechanics, progression features, and real-time multiplayer interactions.",
        "Implemented asynchronous workflows and interactive UI components to improve gameplay responsiveness and user experience.",
        "Managed persistent game data, caching, and backend logic for large-scale player progression systems.",
      ],
      tech: ["Python", "Discord.py", "AsyncIO", "PostgreSQL"],
    },
  ];

  return (
    <div className="mc-experience">
      {experiences.map((e, i) => (
        <div className="mc-exp-card" key={i}>
          {/* HEADER */}
          <div className="mc-exp-header">
            <div className="mc-exp-title">
              {e.title} <span>@ {e.company}</span>
            </div>

            <div className="mc-exp-date">{e.date}</div>
          </div>

          {/* BODY */}
          <div className="mc-exp-body">
            <ul className="mc-exp-list">
              {e.description.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>

            {/* TECH STACK */}
            <div className="mc-exp-tech">
              {e.tech.map((t, idx) => (
                <span key={idx} className="mc-exp-tech-item">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;