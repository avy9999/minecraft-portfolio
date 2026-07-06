import "./Connect.scss";
import { playSound } from "../../utils/audioSystem";

const Connect = () => {
  const links = [
    {
      name: "Gmail",
      url: "mailto:aryangupta.2528899@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" className="mc-icon">
          <path
            fill="currentColor"
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aryan-gupta-avy/",
      icon: (
        <svg viewBox="0 0 24 24" className="mc-icon">
          <path
            fill="currentColor"
            d="M4 4h4v4H4V4zm0 6h4v10H4V10zm6 0h4v2c.6-1.2 2-2.2 4-2.2 3 0 4 2 4 5.2V20h-4v-6c0-1.5-.5-2.5-2-2.5S14 12.5 14 14v6h-4V10z"
          />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/avy9999",
      icon: (
        <svg viewBox="0 0 24 24" className="mc-icon">
          <path
            fill="currentColor"
            d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.91c.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a10.98 10.98 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.4-2.68 5.37-5.24 5.65.41.36.77 1.07.77 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
          />
        </svg>
      ),
    },
    {
      name: "Discord",
      url: "https://discord.com/users/791910343718338590",
      icon: (
        <svg viewBox="0 0 24 24" className="mc-icon">
          <path
            fill="currentColor"
            d="M20 4c-2-1-4-1-6-1s-4 0-6 1L6 6c-2 3-3 6-3 10 2 2 5 3 5 3l1-2-1-1c2 1 4 1 6 1s4 0 6-1l-1 1 1 2s3-1 5-3c0-4-1-7-3-10l-2-2zm-9 9c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2zm6 0c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com/avy.desu",
      icon: (
        <svg viewBox="0 0 24 24" className="mc-icon">
          <path
            fill="currentColor"
            d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mc-contact">
      {/* TEXT (NO BACKGROUND) */}
      <div className="mc-contact-text">
        <h2>Thanks for checking out my portfolio 👾</h2>
        <p>Let’s connect and build something awesome together.</p>
      </div>

      {/* BUTTON GRID */}
      <div className="mc-contact-grid">
        {links.map((l, i) => (
          <a
            key={i}
            href={l.url}
            target="_blank"
            className="mc-social-btn"
            onClick={() => playSound("buttonClick")}
          >
            {l.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Connect;