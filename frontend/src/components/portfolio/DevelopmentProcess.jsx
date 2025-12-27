import React from 'react';
import { 
  FileSearch, 
  Palette, 
  Code, 
  CheckCircle2, 
  Rocket, 
  HeartHandshake 
} from 'lucide-react';

const DevelopmentProcess = () => {
  const processSteps = [
    {
      id: 1,
      number: '01',
      title: 'Planning & Research',
      description: 'Understanding requirements, defining goals, and creating a comprehensive project roadmap',
      icon: FileSearch,
      color: '#D4AF37'
    },
    {
      id: 2,
      number: '02',
      title: 'UI/UX Design',
      description: 'Creating wireframes, prototypes, and beautiful interfaces that prioritize user experience',
      icon: Palette,
      color: '#BFA7FF'
    },
    {
      id: 3,
      number: '03',
      title: 'Development',
      description: 'Building the solution with clean, scalable code and modern best practices',
      icon: Code,
      color: '#7C5CFF'
    },
    {
      id: 4,
      number: '04',
      title: 'Testing & QA',
      description: 'Rigorous testing across devices and scenarios to ensure flawless functionality',
      icon: CheckCircle2,
      color: '#D4AF37'
    },
    {
      id: 5,
      number: '05',
      title: 'Deployment',
      description: 'Launching with optimized configurations and smooth transition to production',
      icon: Rocket,
      color: '#BFA7FF'
    },
    {
      id: 6,
      number: '06',
      title: 'Support',
      description: 'Ongoing maintenance, updates, and support to keep your solution running perfectly',
      icon: HeartHandshake,
      color: '#7C5CFF'
    }
  ];

  return (
    <div className="content-block development-process-block" data-admin-editable="development-process">
      <h2 className="content-block-title">Development Process</h2>
      <p className="content-block-subtitle">Our proven methodology for delivering exceptional results</p>
      
      <div className="process-timeline">
        {processSteps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div 
              key={step.id} 
              className="process-step"
              style={{ '--step-color': step.color }}
              data-testid={`process-step-${step.id}`}
            >
              <div className="process-step-number">{step.number}</div>
              <div className="process-step-icon">
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </div>
              {idx < processSteps.length - 1 && <div className="process-step-line"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DevelopmentProcess;
