import "./Achievements.scss";

const Achievements = () => {
  const achievements = [
    {
      title: "Achievement Made!",
      content:
        "2nd Runner Up at the 24-Hour Code Farming Hackathon held at KCC Institute of Technology and Management (KCC ITM).",
      image: "/images/book.webp",
    },
    {
      title: "Achievement Get!",
      content:
        "Serving as the Vice-President of the TechStars Club at KCC Institute of Technology and Management (KCC ITM).",
      image: "/images/book.webp",
    },
  ];

  return (
    <div className="mc-achievements">
      {achievements.map((achievement, index) => (
        <div className="mc-achievement-card" key={index}>
          <div className="mc-achievement-icon">
            <img src={achievement.image} alt={achievement.title} />
          </div>

          <div className="mc-achievement-info">
            <div className="mc-achievement-title">
              {achievement.title}
            </div>

            <div className="mc-achievement-description">
              {achievement.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;