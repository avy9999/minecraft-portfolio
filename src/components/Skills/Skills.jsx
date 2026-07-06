import "./Skills.scss";
import { useState } from "react";
import { skillData } from "./skillData";

const Skills = () => {
  const [hovered, setHovered] = useState(null);
  const activeCategory = (category) =>
  category.children.some((skill) => skill.name === hovered);

  return (
    <div className="mc-skills">
      {skillData.map((category) => (
        <div
          key={category.id}
          className={`mc-skill-category ${
            activeCategory(category) ? "active-category" : ""
          }`}
        >
          {/* CATEGORY HEADER */}
          <div className="mc-category-header">
            <div className="mc-category-icon">
              <img src={category.icon} alt={category.title} />
            </div>

            <div className="mc-category-title">
              {category.title}
            </div>
          </div>

          {/* CONNECTOR */}
          <div className="mc-tree-line">
            <div className="mc-tree-line-vertical" />
            <div className="mc-tree-line-horizontal" />
          </div>

          {/* SKILL ROW */}
          <div
            className="mc-skill-row"
            style={{
              gridTemplateColumns: `repeat(${category.children.length}, 1fr)`,
            }}
          >
            {category.children.map((skill) => (
              <div
                  className={`mc-skill-item ${
                      hovered === skill.name ? "active-item" : ""
                  }`}
              >

                  <div className="mc-item-connector"/>

                  <div
                      className={`mc-skill-node ${
                          hovered === skill.name ? "active-node" : ""
                      }`}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                  />

                  {hovered === skill.name && (
                    <div className="mc-skill-tooltip">
                      {skill.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;