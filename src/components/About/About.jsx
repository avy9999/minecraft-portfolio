import "./About.scss";

const aboutData = {
  name: "Aryan Gupta",
  imageUrl: "/images/me.webp",
  sketchesImage: "/images/sketches.webp",
};

const About = () => {
  const data = aboutData;

  return (
    <div className="about-container">

      {/* TOP SECTION */}
      <div className="about-top">

        {/* LEFT TEXT */}
        <div className="about-text">
          <h1>Hi! I'm {data.name}</h1>

          <p>
            I am a 4th Year B.Tech student passionate about technology,
            problem solving, and building meaningful projects.
          </p>

          <p>
            I enjoy solving coding problems, tackling real-world tasks,
            and continuously improving my logical thinking.
          </p>

          <p>
            I have a strong interest in games and chess which helps me think strategically.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="about-image">
          <img src={data.imageUrl} alt="me" />
        </div>
      </div>

      {/* CONTINUATION TEXT BELOW IMAGE AREA */}
      <div className="about-bottom-text">
        <p>
            I also love working on various projects — from small experiments to full-stack apps.
        </p>
        <p>
          In my free time, I enjoy sketching and improving how I express ideas through writing.
        </p>
        <p>
          I believe learning never stops. Every project I build teaches me something new,
          and I always try to improve my skills and push beyond comfort zones.
        </p>
      </div>

      {/* SKETCHES SECTION */}
      <div className="sketches-section">

        {/* FULL HEADER BAR (FIXED) */}
        <div className="about-section-header full">
          My sketches
        </div>

        {/* CLEAN IMAGE */}
        <div className="sketches-image">
          <img src={data.sketchesImage} alt="My sketches" />
        </div>

        <p className="sketches-caption">
          Here are some of my sketches.
        </p>

      </div>

    </div>
  );
};

export default About;