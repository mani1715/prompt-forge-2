import React from 'react';
import { Code, Database, Cloud, Wrench } from 'lucide-react';

const TechStack = ({ technologies }) => {
  // Categorize technologies
  const categorizeTech = (tech) => {
    const frontend = ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'TypeScript', 'Vue', 'Angular', 'Next', 'Figma', 'Styled Components'];
    const backend = ['Node.js', 'Express', 'FastAPI', 'Python', 'Flask', 'Django', 'PHP'];
    const database = ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'];
    const tools = ['Git', 'Docker', 'AWS', 'Azure', 'Vercel', 'Heroku', 'Jest', 'Webpack'];

    if (frontend.some(f => tech.includes(f))) return 'Frontend';
    if (backend.some(b => tech.includes(b))) return 'Backend';
    if (database.some(d => tech.includes(d))) return 'Database';
    if (tools.some(t => tech.includes(t))) return 'Tools';
    return 'Other';
  };

  const categorized = technologies.reduce((acc, tech) => {
    const category = categorizeTech(tech);
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech);
    return acc;
  }, {});

  const categoryIcons = {
    'Frontend': Code,
    'Backend': Code,
    'Database': Database,
    'Tools': Wrench,
    'Other': Cloud
  };

  const categoryColors = {
    'Frontend': 'tech-frontend',
    'Backend': 'tech-backend',
    'Database': 'tech-database',
    'Tools': 'tech-tools',
    'Other': 'tech-other'
  };

  return (
    <div className="tech-stack-container" data-testid="tech-stack">
      {Object.keys(categorized).map((category) => {
        const IconComponent = categoryIcons[category];
        const colorClass = categoryColors[category];
        
        return (
          <div key={category} className="tech-category-section">
            <div className="tech-category-header">
              <IconComponent className="h-5 w-5" />
              <h3 className="tech-category-title">{category}</h3>
            </div>
            <div className="tech-badges-grid">
              {categorized[category].map((tech, idx) => (
                <span 
                  key={idx} 
                  className={`tech-badge-premium ${colorClass}`}
                  data-testid={`tech-badge-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
