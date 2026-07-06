import "./Certifications.scss";

const Certifications = () => {
  const certifications = [
    {
      title: "Foundation of Prompt Engineering by AWS Skill Builder",
      image: "/images/god-apple.png",
      link: "https://drive.google.com/file/d/1GxjtmSlRnu109blejj2PHIOsZWqt83Ay/view?usp=sharing",
    },
    {
      title: "Postman API Fundamentals Student Expert",
      image: "/images/diamond.png",
      link: "https://badges.parchment.com/public/assertions/SQfZvKvBTRSwMoHUwPvW3g?utm_source=url_copy&identity__email=aryangupta.2528899%40gmail.com",
    },
    {
      title: "Acquiring Data by NASSCOM",
      image: "/images/golden-carrot.png",
      link: "https://www.futureskillsprime.in/iDH/user/credential/view/32914-f2daad73-713d-11f1-9954-005056b48b54",
    },
    {
      title: "SQL (Intermediate) by HackerRank",
      image: "/images/god-apple.png",
      link: "https://www.hackerrank.com/certificates/iframe/5fb793085ef9",
    },
  ];

  return (
    <div className="mc-certifications">
      {certifications.map((certification, index) => (
        <div className="mc-certification-card" key={index}>
          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mc-certification-icon"
          >
            <img
              src={certification.image}
              alt={certification.title}
            />
          </a>

          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mc-certification-title"
          >
            {certification.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Certifications;