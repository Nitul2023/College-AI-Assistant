class RoadmapService {
  
  // Generate roadmap based on selected skills
  generateRoadmap(goal, selectedSkills, userLevel = 'Beginner') {
    const roadmaps = {
      'Full Stack Developer': this.fullStackRoadmap(selectedSkills, userLevel),
      'Data Scientist': this.dataScientistRoadmap(selectedSkills, userLevel),
      'Mobile App Developer': this.mobileDevRoadmap(selectedSkills, userLevel),
      'Machine Learning Engineer': this.mlEngineerRoadmap(selectedSkills, userLevel),
      'DevOps Engineer': this.devOpsRoadmap(selectedSkills, userLevel),
      'Cybersecurity Specialist': this.cybersecurityRoadmap(selectedSkills, userLevel),
      'UI/UX Designer': this.uiUxRoadmap(selectedSkills, userLevel),
      'Game Developer': this.gameDevRoadmap(selectedSkills, userLevel),
    };

    return roadmaps[goal] || this.customRoadmap(goal, selectedSkills, userLevel);
  }

  fullStackRoadmap(skills, level) {
    const hasHTML = skills.includes('HTML') || skills.includes('HTML/CSS');
    const hasJS = skills.includes('JavaScript');
    const hasReact = skills.includes('React');
    const hasNode = skills.includes('Node.js');
    const hasDB = skills.includes('MongoDB') || skills.includes('SQL');

    const steps = [];

    // Phase 1: Frontend Fundamentals
    if (!hasHTML) {
      steps.push({
        title: '📝 HTML & CSS Mastery',
        description: 'Learn the building blocks of web development. Master semantic HTML5 and modern CSS3 including Flexbox and Grid.',
        duration: '3-4 weeks',
        resources: [
          'freeCodeCamp - Responsive Web Design',
          'MDN Web Docs - HTML/CSS',
          'CSS Tricks - Complete Guide to Flexbox',
          'Practice: Build 5 landing pages'
        ],
        completed: false
      });
    }

    if (!hasJS) {
      steps.push({
        title: '⚡ JavaScript Fundamentals',
        description: 'Master vanilla JavaScript including ES6+, DOM manipulation, async programming, and modern JavaScript features.',
        duration: '4-6 weeks',
        resources: [
          'JavaScript.info - The Modern JavaScript Tutorial',
          'Eloquent JavaScript (Book)',
          'freeCodeCamp - JavaScript Algorithms',
          'Practice: 50+ coding challenges on LeetCode'
        ],
        completed: false
      });
    }

    // Phase 2: Frontend Framework
    if (!hasReact) {
      steps.push({
        title: '⚛️ React.js Deep Dive',
        description: 'Build modern web applications with React. Learn hooks, context API, routing, and state management.',
        duration: '5-6 weeks',
        resources: [
          'Official React Documentation',
          'React - The Complete Guide (Udemy)',
          'Practice: Build 3 projects (Todo App, Weather App, E-commerce)',
          'Learn React Router and Redux Toolkit'
        ],
        completed: false
      });
    }

    // Phase 3: Backend Development
    if (!hasNode) {
      steps.push({
        title: '🖥️ Node.js & Express Backend',
        description: 'Create RESTful APIs and server-side applications. Learn Express, middleware, authentication, and API design.',
        duration: '4-5 weeks',
        resources: [
          'Node.js Documentation',
          'The Complete Node.js Developer Course',
          'Build REST APIs with Express',
          'Practice: Create 3 backend projects'
        ],
        completed: false
      });
    }

    // Phase 4: Database
    if (!hasDB) {
      steps.push({
        title: '💾 Database Design & Management',
        description: 'Master both SQL and NoSQL databases. Learn MongoDB, PostgreSQL, data modeling, and query optimization.',
        duration: '3-4 weeks',
        resources: [
          'MongoDB University - Free Courses',
          'PostgreSQL Tutorial',
          'Database Design for Beginners',
          'Practice: Design 5 database schemas'
        ],
        completed: false
      });
    }

    // Phase 5: Full Stack Integration
    steps.push({
      title: '🔗 Full Stack Integration',
      description: 'Combine frontend and backend to build complete applications. Learn deployment, authentication, and real-time features.',
      duration: '4-6 weeks',
      resources: [
        'Build a MERN stack application',
        'JWT Authentication implementation',
        'Deploy on Vercel + Heroku/Railway',
        'Add real-time chat with Socket.io'
      ],
      completed: false
    });

    // Phase 6: Advanced Topics
    steps.push({
      title: '🚀 Advanced Full Stack Concepts',
      description: 'Level up with TypeScript, testing, CI/CD, Docker, and cloud services.',
      duration: '6-8 weeks',
      resources: [
        'Learn TypeScript fundamentals',
        'Jest & React Testing Library',
        'Docker containerization basics',
        'AWS/GCP fundamentals',
        'Build and deploy a production-ready SaaS app'
      ],
      completed: false
    });

    // Phase 7: Portfolio & Job Prep
    steps.push({
      title: '💼 Portfolio & Career Preparation',
      description: 'Build an impressive portfolio, prepare for interviews, and start applying for jobs.',
      duration: '4-6 weeks',
      resources: [
        'Build 5 portfolio projects',
        'Create professional GitHub profile',
        'Practice LeetCode/HackerRank (200+ problems)',
        'Mock interviews on Pramp',
        'Apply to 50+ companies'
      ],
      completed: false
    });

    return steps;
  }

  dataScientistRoadmap(skills, level) {
    const steps = [];

    if (!skills.includes('Python')) {
      steps.push({
        title: '🐍 Python Programming Mastery',
        description: 'Master Python fundamentals, OOP, and libraries essential for data science.',
        duration: '4-5 weeks',
        resources: [
          'Python.org - Official Tutorial',
          'Automate the Boring Stuff with Python',
          'LeetCode Python Track',
          'Practice: 100+ Python problems'
        ],
        completed: false
      });
    }

    steps.push({
      title: '📊 Statistics & Mathematics',
      description: 'Build strong foundation in statistics, probability, and linear algebra for data science.',
      duration: '6-8 weeks',
      resources: [
        'Khan Academy - Statistics & Probability',
        'StatQuest YouTube Channel',
        'Essence of Linear Algebra (3Blue1Brown)',
        'Practice statistical analysis on real datasets'
      ],
      completed: false
    });

    steps.push({
      title: '📈 Data Analysis with Pandas & NumPy',
      description: 'Master data manipulation, cleaning, and analysis with Python libraries.',
      duration: '4-5 weeks',
      resources: [
        'Pandas Documentation',
        'Data Analysis with Python (freeCodeCamp)',
        'Kaggle Learn - Pandas',
        'Complete 5 Kaggle datasets analysis'
      ],
      completed: false
    });

    steps.push({
      title: '📉 Data Visualization',
      description: 'Create compelling visualizations with Matplotlib, Seaborn, and Plotly.',
      duration: '3-4 weeks',
      resources: [
        'Matplotlib & Seaborn tutorials',
        'Plotly Dashboard creation',
        'Storytelling with Data (Book)',
        'Build 10 different chart types'
      ],
      completed: false
    });

    if (!skills.includes('Machine Learning')) {
      steps.push({
        title: '🤖 Machine Learning Fundamentals',
        description: 'Learn supervised and unsupervised learning, model evaluation, and scikit-learn.',
        duration: '8-10 weeks',
        resources: [
          'Andrew Ng - Machine Learning (Coursera)',
          'Hands-On Machine Learning (Book)',
          'scikit-learn Documentation',
          'Complete 10 ML projects on Kaggle'
        ],
        completed: false
      });
    }

    steps.push({
      title: '🧠 Deep Learning & Neural Networks',
      description: 'Master deep learning with TensorFlow/PyTorch, CNNs, RNNs, and transformers.',
      duration: '10-12 weeks',
      resources: [
        'Deep Learning Specialization (Coursera)',
        'Fast.ai - Practical Deep Learning',
        'TensorFlow/PyTorch tutorials',
        'Implement 5 neural network architectures'
      ],
      completed: false
    });

    steps.push({
      title: '💼 Real-World Projects & Portfolio',
      description: 'Build end-to-end data science projects and create a compelling portfolio.',
      duration: '6-8 weeks',
      resources: [
        'Complete 5 Kaggle competitions',
        'Build predictive model for real business problem',
        'Create data science blog',
        'Deploy ML models with Flask/FastAPI'
      ],
      completed: false
    });

    return steps;
  }

  mobileDevRoadmap(skills, level) {
    const steps = [];

    if (!skills.includes('React Native') && !skills.includes('Flutter')) {
      steps.push({
        title: '📱 Choose Your Framework: React Native',
        description: 'Master React Native for cross-platform mobile development using JavaScript.',
        duration: '6-8 weeks',
        resources: [
          'React Native Documentation',
          'The Complete React Native Course',
          'Build 3 mobile apps (Calculator, Todo, Weather)',
          'Learn Expo and React Navigation'
        ],
        completed: false
      });
    }

    steps.push({
      title: '🎨 Mobile UI/UX Design',
      description: 'Learn mobile design patterns, responsive layouts, and platform-specific guidelines.',
      duration: '3-4 weeks',
      resources: [
        'Material Design Guidelines',
        'iOS Human Interface Guidelines',
        'Figma for mobile design',
        'Practice: Design 5 mobile app screens'
        ],
      completed: false
    });

    steps.push({
      title: '🔐 Authentication & State Management',
      description: 'Implement secure authentication and efficient state management in mobile apps.',
      duration: '4-5 weeks',
      resources: [
        'Firebase Authentication',
        'Redux Toolkit for React Native',
        'AsyncStorage & SecureStore',
        'Build login/signup flows'
      ],
      completed: false
    });

    steps.push({
      title: '🌐 API Integration & Networking',
      description: 'Connect mobile apps to backend services and handle data efficiently.',
      duration: '3-4 weeks',
      resources: [
        'REST API integration',
        'Axios & Fetch API',
        'GraphQL with Apollo Client',
        'Build 3 API-driven apps'
      ],
      completed: false
    });

    steps.push({
      title: '🚀 Publishing & Deployment',
      description: 'Learn app store submission process and deployment best practices.',
      duration: '2-3 weeks',
      resources: [
        'Google Play Console setup',
        'Apple App Store Connect',
        'App signing and versioning',
        'Publish your first app'
      ],
      completed: false
    });

    steps.push({
      title: '💼 Portfolio & Advanced Features',
      description: 'Build production-ready apps with push notifications, payments, and analytics.',
      duration: '6-8 weeks',
      resources: [
        'Firebase Cloud Messaging',
        'Stripe payment integration',
        'Google Analytics for mobile',
        'Build 2 complex portfolio apps'
      ],
      completed: false
    });

    return steps;
  }

  mlEngineerRoadmap(skills, level) {
    const steps = [
      {
        title: '🐍 Advanced Python & Math',
        description: 'Master Python, linear algebra, calculus, and probability theory.',
        duration: '6-8 weeks',
        resources: [
          'Mathematics for Machine Learning (Book)',
          'NumPy & SciPy mastery',
          '3Blue1Brown - Linear Algebra',
          'Practice 150+ math problems'
        ],
        completed: false
      },
      {
        title: '🤖 Machine Learning Algorithms',
        description: 'Deep dive into ML algorithms, implementation from scratch, and optimization.',
        duration: '10-12 weeks',
        resources: [
          'Implement 15 algorithms from scratch',
          'Pattern Recognition & ML (Bishop)',
          'Stanford CS229 lectures',
          'Kaggle competitions'
        ],
        completed: false
      },
      {
        title: '🧠 Deep Learning Mastery',
        description: 'Master CNNs, RNNs, GANs, Transformers, and attention mechanisms.',
        duration: '12-14 weeks',
        resources: [
          'Deep Learning Specialization',
          'Implement papers with code',
          'PyTorch/TensorFlow advanced',
          'Build 10 DL projects'
        ],
        completed: false
      },
      {
        title: '☁️ MLOps & Production',
        description: 'Deploy ML models at scale with Docker, Kubernetes, and cloud platforms.',
        duration: '6-8 weeks',
        resources: [
          'MLflow & Kubeflow',
          'Docker containerization',
          'AWS SageMaker / GCP AI Platform',
          'Build end-to-end ML pipeline'
        ],
        completed: false
      },
      {
        title: '💼 Research & Publications',
        description: 'Read papers, contribute to open source, and build research portfolio.',
        duration: 'Ongoing',
        resources: [
          'Read 50+ ML papers',
          'Contribute to TensorFlow/PyTorch',
          'Publish on arXiv',
          'Build 5 innovative projects'
        ],
        completed: false
      }
    ];

    return steps;
  }

  devOpsRoadmap(skills, level) {
    return [
      {
        title: '🐧 Linux & Shell Scripting',
        description: 'Master Linux OS, command line, and Bash scripting for automation.',
        duration: '4-5 weeks',
        resources: ['Linux Command Line Basics', 'Bash Scripting Tutorial', 'Set up Ubuntu VM'],
        completed: false
      },
      {
        title: '🔧 Version Control & Git',
        description: 'Advanced Git, branching strategies, and collaborative workflows.',
        duration: '2-3 weeks',
        resources: ['Git branching models', 'GitLab CI/CD', 'GitHub Actions'],
        completed: false
      },
      {
        title: '🐳 Docker & Containers',
        description: 'Containerize applications, Docker Compose, and best practices.',
        duration: '4-5 weeks',
        resources: ['Docker Deep Dive', 'Multi-stage builds', 'Container orchestration basics'],
        completed: false
      },
      {
        title: '☸️ Kubernetes',
        description: 'Deploy and manage containerized applications at scale.',
        duration: '6-8 weeks',
        resources: ['CKA Certification prep', 'Helm charts', 'Deploy microservices'],
        completed: false
      },
      {
        title: '🔄 CI/CD Pipelines',
        description: 'Automate testing, building, and deployment processes.',
        duration: '4-5 weeks',
        resources: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Build production pipelines'],
        completed: false
      },
      {
        title: '📊 Monitoring & Logging',
        description: 'Set up observability with Prometheus, Grafana, and ELK stack.',
        duration: '4-5 weeks',
        resources: ['Prometheus & Grafana', 'ELK Stack', 'Application monitoring'],
        completed: false
      },
      {
        title: '☁️ Cloud Platforms',
        description: 'Master AWS/Azure/GCP services and infrastructure as code.',
        duration: '8-10 weeks',
        resources: ['AWS Solutions Architect', 'Terraform', 'CloudFormation', 'Multi-cloud deployment'],
        completed: false
      }
    ];
  }

  cybersecurityRoadmap(skills, level) {
    return [
      {
        title: '🔐 Networking Fundamentals',
        description: 'Master TCP/IP, DNS, HTTP/HTTPS, firewalls, and network protocols.',
        duration: '4-6 weeks',
        resources: ['CompTIA Network+', 'Wireshark packet analysis', 'Build home lab'],
        completed: false
      },
      {
        title: '💻 Operating Systems Security',
        description: 'Learn Windows and Linux security, hardening, and vulnerability assessment.',
        duration: '5-6 weeks',
        resources: ['Linux security', 'Windows Active Directory', 'Security configuration'],
        completed: false
      },
      {
        title: '🛡️ Ethical Hacking & Penetration Testing',
        description: 'Learn offensive security, web app testing, and exploit development.',
        duration: '10-12 weeks',
        resources: ['CEH certification', 'TryHackMe', 'HackTheBox', 'OWASP Top 10'],
        completed: false
      },
      {
        title: '🔍 Incident Response & Forensics',
        description: 'Investigate security incidents and perform digital forensics.',
        duration: '6-8 weeks',
        resources: ['SANS courses', 'Autopsy tool', 'Malware analysis', 'Incident handling'],
        completed: false
      },
      {
        title: '🏆 Certifications & Career',
        description: 'Earn industry certifications and build security portfolio.',
        duration: '12-16 weeks',
        resources: ['OSCP', 'Security+', 'Bug bounty programs', 'Build security projects'],
        completed: false
      }
    ];
  }

  uiUxRoadmap(skills, level) {
    return [
      {
        title: '🎨 Design Fundamentals',
        description: 'Master color theory, typography, layout, and visual hierarchy.',
        duration: '4-5 weeks',
        resources: ['Design principles', 'Typography basics', 'Color psychology', 'Practice daily'],
        completed: false
      },
      {
        title: '🖌️ Design Tools Mastery',
        description: 'Learn Figma, Adobe XD, and prototyping tools.',
        duration: '5-6 weeks',
        resources: ['Figma masterclass', 'Adobe XD tutorials', 'Build 10 designs'],
        completed: false
      },
      {
        title: '👤 User Research & Testing',
        description: 'Conduct user interviews, surveys, and usability testing.',
        duration: '4-5 weeks',
        resources: ['UX research methods', 'Usability testing', 'Create personas'],
        completed: false
      },
      {
        title: '📱 UI Design & Prototyping',
        description: 'Design beautiful interfaces and interactive prototypes.',
        duration: '6-8 weeks',
        resources: ['Mobile & web UI patterns', 'Micro-interactions', 'Build 5 prototypes'],
        completed: false
      },
      {
        title: '💼 Portfolio & Client Work',
        description: 'Build professional portfolio and work on real projects.',
        duration: '8-10 weeks',
        resources: ['Dribbble portfolio', 'Freelance projects', 'Case studies', 'Network'],
        completed: false
      }
    ];
  }

  gameDevRoadmap(skills, level) {
    return [
      {
        title: '🎮 Game Development Basics',
        description: 'Learn game design principles, mechanics, and Unity/Unreal basics.',
        duration: '6-8 weeks',
        resources: ['Unity Learn', 'Game design theory', 'Build 3 simple games'],
        completed: false
      },
      {
        title: '💻 Programming for Games',
        description: 'Master C# for Unity or C++ for Unreal Engine.',
        duration: '8-10 weeks',
        resources: ['C# fundamentals', 'Unity scripting', 'Game patterns', '100+ coding challenges'],
        completed: false
      },
      {
        title: '🎨 3D Modeling & Animation',
        description: 'Create game assets with Blender, texturing, and rigging.',
        duration: '10-12 weeks',
        resources: ['Blender tutorials', '3D modeling', 'Character rigging', 'Create asset library'],
        completed: false
      },
      {
        title: '🎵 Audio & VFX',
        description: 'Add sound effects, music, and visual effects to games.',
        duration: '4-5 weeks',
        resources: ['Audio design', 'Particle systems', 'Shader programming', 'Polish 3 games'],
        completed: false
      },
      {
        title: '🚀 Publishing & Monetization',
        description: 'Publish games on Steam, mobile stores, and implement monetization.',
        duration: '6-8 weeks',
        resources: ['Steam publishing', 'Mobile optimization', 'Ads & IAP', 'Release 2 games'],
        completed: false
      }
    ];
  }

  customRoadmap(goal, skills, level) {
    // Generic roadmap for custom goals
    return [
      {
        title: '📚 Foundation Building',
        description: `Build strong fundamentals for ${goal}`,
        duration: '4-6 weeks',
        resources: ['Online courses', 'Documentation', 'Practice projects'],
        completed: false
      },
      {
        title: '💪 Skill Development',
        description: 'Develop core skills and competencies',
        duration: '8-12 weeks',
        resources: ['Advanced tutorials', 'Real projects', 'Open source contributions'],
        completed: false
      },
      {
        title: '🚀 Advanced & Specialization',
        description: 'Master advanced topics and specialize',
        duration: '12-16 weeks',
        resources: ['Expert-level content', 'Complex projects', 'Certifications'],
        completed: false
      },
      {
        title: '💼 Career Preparation',
        description: 'Build portfolio and prepare for opportunities',
        duration: '6-8 weeks',
        resources: ['Portfolio projects', 'Interview prep', 'Networking', 'Job applications'],
        completed: false
      }
    ];
  }
}

module.exports = new RoadmapService();