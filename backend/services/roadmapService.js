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
          'freeCodeCamp - Responsive Web Design (YouTube: https://www.youtube.com/watch?v=zJSY8tbf_ys)',
          'MDN Web Docs - HTML/CSS (YouTube: url(https://www.youtube.com/watch?v=qz0aGYrrlhU)',
          'CSS Tricks - Complete Guide to Flexbox (YouTube: https://www.youtube.com/watch?v=3YW65K6LcIA)',
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
          'JavaScript.info - The Modern JavaScript Tutorial (YouTube: https://www.youtube.com/watch?v=W6NZfCO5SIk)',
          'Eloquent JavaScript (Book) (YouTube Summary: https://www.youtube.com/watch?v=Bv_5Zv5c-Ts)',
          'freeCodeCamp - JavaScript Algorithms (YouTube: https://www.youtube.com/watch?v=PkZNo7MFNFg)',
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
          'Official React Documentation (YouTube: https://www.youtube.com/watch?v=bMknfKXIFA8)',
          'React - The Complete Guide (Udemy) (YouTube Intro: https://www.youtube.com/watch?v=Ke90Tje7VS0)',
          'Practice: Build 3 projects (Todo App, Weather App, E-commerce)',
          'Learn React Router and Redux Toolkit (YouTube: https://www.youtube.com/watch?v=0W6i5LYKCSI)'
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
          'Node.js Documentation (YouTube: "https://www.youtube.com/watch?v=fBNz5xF-Kx4")',
          'The Complete Node.js Developer Course (YouTube: https://www.youtube.com/watch?v=TlB_eWDSMt4)',
          'Build REST APIs with Express (YouTube: https://www.youtube.com/watch?v=l8WPWK9mS5M)',
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
          'MongoDB University - Free Courses (YouTube: https://www.youtube.com/watch?v=ofme2o29ngU)',
          'PostgreSQL Tutorial (YouTube: https://www.youtube.com/watch?v=qw--VYLpxG4)',
          'Database Design for Beginners (YouTube: https://www.youtube.com/watch?v=ztHopE5Wnpc)',
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
        'Build a MERN stack application (YouTube: https://www.youtube.com/watch?v=7CqJlxBYj-M)',
        'JWT Authentication implementation (YouTube: https://www.youtube.com/watch?v=mbsmsi7l3r4)',
        'Deploy on Vercel + Heroku/Railway (YouTube: https://www.youtube.com/watch?v=l134cBAJCuc)',
        'Add real-time chat with Socket.io (YouTube: https://www.youtube.com/watch?v=ZKEqqIO7n-k)'
      ],
      completed: false
    });

    // Phase 6: Advanced Topics
    steps.push({
      title: '🚀 Advanced Full Stack Concepts',
      description: 'Level up with TypeScript, testing, CI/CD, Docker, and cloud services.',
      duration: '6-8 weeks',
      resources: [
        'Learn TypeScript fundamentals (YouTube: https://www.youtube.com/watch?v=BwuLxPH8IDs)',
        'Jest & React Testing Library (YouTube: https://www.youtube.com/watch?v=8Xwq35cPwYg)',
        'Docker containerization basics (YouTube: https://www.youtube.com/watch?v=fqMOX6JJhGo)',
        'AWS/GCP fundamentals (YouTube: https://www.youtube.com/watch?v=SOTamWNgDKc)',
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
        'Create professional GitHub profile (YouTube: https://www.youtube.com/watch?v=G-EGDH50hGE)',
        'Practice LeetCode/HackerRank (200+ problems) (YouTube: https://www.youtube.com/watch?v=SVvr3ZjtjI8)',
        'Mock interviews on Pramp (YouTube: https://www.youtube.com/watch?v=1qw5ITr3k9E)',
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
          'Python.org - Official Tutorial (YouTube: https://www.youtube.com/watch?v=_uQrJ0TkZlc)',
          'Automate the Boring Stuff with Python (YouTube: https://www.youtube.com/watch?v=1F_OgqRuSdI)',
          'LeetCode Python Track (YouTube: https://www.youtube.com/watch?v=0K_eZGS5NsU)',
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
        'Khan Academy - Statistics & Probability (YouTube: https://www.youtube.com/watch?v=uhxtUt_-GyM)',
        'StatQuest YouTube Channel (YouTube: https://www.youtube.com/c/joshstarmer)',
        'Essence of Linear Algebra (3Blue1Brown) (YouTube: https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)',
        'Practice statistical analysis on real datasets'
      ],
      completed: false
    });

    steps.push({
      title: '📈 Data Analysis with Pandas & NumPy',
      description: 'Master data manipulation, cleaning, and analysis with Python libraries.',
      duration: '4-5 weeks',
      resources: [
        'Pandas Documentation (YouTube: https://www.youtube.com/watch?v=vmEHCJofslg)',
        'Data Analysis with Python (freeCodeCamp) (YouTube: https://www.youtube.com/watch?v=r-uOLxNrNk8)',
        'Kaggle Learn - Pandas (YouTube: https://www.youtube.com/watch?v=F6kmIpWj8bQ)',
        'Complete 5 Kaggle datasets analysis'
      ],
      completed: false
    });

    steps.push({
      title: '📉 Data Visualization',
      description: 'Create compelling visualizations with Matplotlib, Seaborn, and Plotly.',
      duration: '3-4 weeks',
      resources: [
        'Matplotlib & Seaborn tutorials (YouTube: https://www.youtube.com/watch?v=UO98lJQ3QGI)',
        'Plotly Dashboard creation (YouTube: https://www.youtube.com/watch?v=hSPmj7mK6ng)',
        'Storytelling with Data (Book) (YouTube Summary: https://www.youtube.com/watch?v=8EMW7io5OGI)',
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
          'Andrew Ng - Machine Learning (Coursera) (YouTube: https://www.youtube.com/watch?v=PPLop4L2eGk)',
          'Hands-On Machine Learning (Book) (YouTube: https://www.youtube.com/watch?v=I74ymkoNTnw)',
          'scikit-learn Documentation (YouTube: https://www.youtube.com/watch?v=0Lt9w-BxKFQ)',
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
        'Deep Learning Specialization (Coursera) (YouTube: https://www.youtube.com/watch?v=CS4cs9xVecg)',
        'Fast.ai - Practical Deep Learning (YouTube: https://www.youtube.com/watch?v=0oyCUWLL_fU)',
        'TensorFlow/PyTorch tutorials (YouTube: https://www.youtube.com/watch?v=ORrStCArmP4)',
        'Implement 5 neural network architectures'
      ],
      completed: false
    });

    steps.push({
      title: '💼 Real-World Projects & Portfolio',
      description: 'Build end-to-end data science projects and create a compelling portfolio.',
      duration: '6-8 weeks',
      resources: [
        'Complete 5 Kaggle competitions (YouTube: https://www.youtube.com/watch?v=GJBDmWeYKHE)',
        'Build predictive model for real business problem',
        'Create data science blog (YouTube: https://www.youtube.com/watch?v=owHh3veSjAk)',
        'Deploy ML models with Flask/FastAPI (YouTube: https://www.youtube.com/watch?v=h3oRrAHLPlE)'
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
          'React Native Documentation (YouTube: https://www.youtube.com/watch?v=0-S5a0eXPoc)',
          'The Complete React Native Course (YouTube: https://www.youtube.com/watch?v=6ZnfsJ6mM5c)',
          'Build 3 mobile apps (Calculator, Todo, Weather)',
          'Learn Expo and React Navigation (YouTube: https://www.youtube.com/watch?v=nQVCkqvU1uE)'
        ],
        completed: false
      });
    }

    steps.push({
      title: '🎨 Mobile UI/UX Design',
      description: 'Learn mobile design patterns, responsive layouts, and platform-specific guidelines.',
      duration: '3-4 weeks',
      resources: [
        'Material Design Guidelines (YouTube: https://www.youtube.com/watch?v=ckCjIJbxYLY)',
        'iOS Human Interface Guidelines (YouTube: https://www.youtube.com/watch?v=G7MeRkDkRN4)',
        'Figma for mobile design (YouTube: https://www.youtube.com/watch?v=FTFaQWZBqQ8)',
        'Practice: Design 5 mobile app screens'
        ],
      completed: false
    });

    steps.push({
      title: '🔐 Authentication & State Management',
      description: 'Implement secure authentication and efficient state management in mobile apps.',
      duration: '4-5 weeks',
      resources: [
        'Firebase Authentication (YouTube: https://www.youtube.com/watch?v=9bXhf_TELP4)',
        'Redux Toolkit for React Native (YouTube: https://www.youtube.com/watch?v=9zySeP5vH9c)',
        'AsyncStorage & SecureStore (YouTube: https://www.youtube.com/watch?v=AcgpBZltVZk)',
        'Build login/signup flows'
      ],
      completed: false
    });

    steps.push({
      title: '🌐 API Integration & Networking',
      description: 'Connect mobile apps to backend services and handle data efficiently.',
      duration: '3-4 weeks',
      resources: [
        'REST API integration (YouTube: https://www.youtube.com/watch?v=fgTGADljAeg)',
        'Axios & Fetch API (YouTube: https://www.youtube.com/watch?v=6LyagkoRWYA)',
        'GraphQL with Apollo Client (YouTube: https://www.youtube.com/watch?v=ed8SzALpx1Q)',
        'Build 3 API-driven apps'
      ],
      completed: false
    });

    steps.push({
      title: '🚀 Publishing & Deployment',
      description: 'Learn app store submission process and deployment best practices.',
      duration: '2-3 weeks',
      resources: [
        'Google Play Console setup (YouTube: https://www.youtube.com/watch?v=5GHT4M9co9s)',
        'Apple App Store Connect (YouTube: https://www.youtube.com/watch?v=tnbOcpwJGa8)',
        'App signing and versioning (YouTube: https://www.youtube.com/watch?v=8RRShBhMBoo)',
        'Publish your first app'
      ],
      completed: false
    });

    steps.push({
      title: '💼 Portfolio & Advanced Features',
      description: 'Build production-ready apps with push notifications, payments, and analytics.',
      duration: '6-8 weeks',
      resources: [
        'Firebase Cloud Messaging (YouTube: https://www.youtube.com/watch?v=sioEY4tWmLI)',
        'Stripe payment integration (YouTube: https://www.youtube.com/watch?v=volAze3fpt0)',
        'Google Analytics for mobile (YouTube: https://www.youtube.com/watch?v=TRb7wOKWafs)',
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
          'Mathematics for Machine Learning (Book) (YouTube: https://www.youtube.com/watch?v=uZeDTwWcnuY)',
          'NumPy & SciPy mastery (YouTube: https://www.youtube.com/watch?v=QUT1VHiLmmI)',
          '3Blue1Brown - Linear Algebra (YouTube: https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)',
          'Practice 150+ math problems'
        ],
        completed: false
      },
      {
        title: '🤖 Machine Learning Algorithms',
        description: 'Deep dive into ML algorithms, implementation from scratch, and optimization.',
        duration: '10-12 weeks',
        resources: [
          'Implement 15 algorithms from scratch (YouTube: https://www.youtube.com/watch?v=ngLyX54e1LU)',
          'Pattern Recognition & ML (Bishop) (YouTube: https://www.youtube.com/watch?v=lFd8ZE3Fzns)',
          'Stanford CS229 lectures (YouTube: https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU)',
          'Kaggle competitions (YouTube: https://www.youtube.com/watch?v=GJBDmWeYKHE)'
        ],
        completed: false
      },
      {
        title: '🧠 Deep Learning Mastery',
        description: 'Master CNNs, RNNs, GANs, Transformers, and attention mechanisms.',
        duration: '12-14 weeks',
        resources: [
          'Deep Learning Specialization (YouTube: https://www.youtube.com/watch?v=CS4cs9xVecg)',
          'Implement papers with code (YouTube: https://www.youtube.com/watch?v=733m6qBH-jI)',
          'PyTorch/TensorFlow advanced (YouTube: https://www.youtube.com/watch?v=c36lUUr864M)',
          'Build 10 DL projects'
        ],
        completed: false
      },
      {
        title: '☁️ MLOps & Production',
        description: 'Deploy ML models at scale with Docker, Kubernetes, and cloud platforms.',
        duration: '6-8 weeks',
        resources: [
          'MLflow & Kubeflow (YouTube: https://www.youtube.com/watch?v=859OxXrt_TI)',
          'Docker containerization (YouTube: https://www.youtube.com/watch?v=fqMOX6JJhGo)',
          'AWS SageMaker / GCP AI Platform (YouTube: https://www.youtube.com/watch?v=LkSjPeLcXgQ)',
          'Build end-to-end ML pipeline'
        ],
        completed: false
      },
      {
        title: '💼 Research & Publications',
        description: 'Read papers, contribute to open source, and build research portfolio.',
        duration: 'Ongoing',
        resources: [
          'Read 50+ ML papers (YouTube: https://www.youtube.com/watch?v=733m6qBH-jI)',
          'Contribute to TensorFlow/PyTorch (YouTube: https://www.youtube.com/watch?v=_3db-mzLBhA)',
          'Publish on arXiv (YouTube: https://www.youtube.com/watch?v=SH4TdM4GmUs)',
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
        resources: [
          'Linux Command Line Basics (YouTube: https://www.youtube.com/watch?v=ROjZy1WbCIA)',
          'Bash Scripting Tutorial (YouTube: https://www.youtube.com/watch?v=tK9Oc6AEnR4)',
          'Set up Ubuntu VM (YouTube: https://www.youtube.com/watch?v=x5MhydijWmc)'
        ],
        completed: false
      },
      {
        title: '🔧 Version Control & Git',
        description: 'Advanced Git, branching strategies, and collaborative workflows.',
        duration: '2-3 weeks',
        resources: [
          'Git branching models (YouTube: https://www.youtube.com/watch?v=e2IbNHi4uCI)',
          'GitLab CI/CD (YouTube: https://www.youtube.com/watch?v=qP8kir2GUgo)',
          'GitHub Actions (YouTube: https://www.youtube.com/watch?v=R8_veQiYBjI)'
        ],
        completed: false
      },
      {
        title: '🐳 Docker & Containers',
        description: 'Containerize applications, Docker Compose, and best practices.',
        duration: '4-5 weeks',
        resources: [
          'Docker Deep Dive (YouTube: https://www.youtube.com/watch?v=fqMOX6JJhGo)',
          'Multi-stage builds (YouTube: https://www.youtube.com/watch?v=zpkqNPwEzac)',
          'Container orchestration basics (YouTube: https://www.youtube.com/watch?v=X48VuDVv0do)'
        ],
        completed: false
      },
      {
        title: '☸️ Kubernetes',
        description: 'Deploy and manage containerized applications at scale.',
        duration: '6-8 weeks',
        resources: [
          'CKA Certification prep (YouTube: https://www.youtube.com/watch?v=X48VuDVv0do)',
          'Helm charts (YouTube: https://www.youtube.com/watch?v=-ykwb1d0DXU)',
          'Deploy microservices (YouTube: https://www.youtube.com/watch?v=s_o8dwzRlu4)'
        ],
        completed: false
      },
      {
        title: '🔄 CI/CD Pipelines',
        description: 'Automate testing, building, and deployment processes.',
        duration: '4-5 weeks',
        resources: [
          'Jenkins (YouTube: https://www.youtube.com/watch?v=FX322RVNGj4)',
          'GitHub Actions (YouTube: https://www.youtube.com/watch?v=R8_veQiYBjI)',
          'GitLab CI (YouTube: https://www.youtube.com/watch?v=qP8kir2GUgo)',
          'Build production pipelines'
        ],
        completed: false
      },
      {
        title: '📊 Monitoring & Logging',
        description: 'Set up observability with Prometheus, Grafana, and ELK stack.',
        duration: '4-5 weeks',
        resources: [
          'Prometheus & Grafana (YouTube: https://www.youtube.com/watch?v=h4Sl21AKiDg)',
          'ELK Stack (YouTube: https://www.youtube.com/watch?v=MRMgd6E9AXE)',
          'Application monitoring (YouTube: https://www.youtube.com/watch?v=9TJx7QTrTyo)'
        ],
        completed: false
      },
      {
        title: '☁️ Cloud Platforms',
        description: 'Master AWS/Azure/GCP services and infrastructure as code.',
        duration: '8-10 weeks',
        resources: [
          'AWS Solutions Architect (YouTube: https://www.youtube.com/watch?v=SOTamWNgDKc)',
          'Terraform (YouTube: https://www.youtube.com/watch?v=l5k1ai_GBDE)',
          'CloudFormation (YouTube: https://www.youtube.com/watch?v=t97jZch4lMY)',
          'Multi-cloud deployment (YouTube: https://www.youtube.com/watch?v=M988_fsOSWo)'
        ],
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
        resources: [
          'CompTIA Network+ (YouTube: https://www.youtube.com/watch?v=As6g6IXcVa4)',
          'Wireshark packet analysis (YouTube: https://www.youtube.com/watch?v=lb1Dw0elw0Q)',
          'Build home lab (YouTube: https://www.youtube.com/watch?v=Wnt4K5VVrbo)'
        ],
        completed: false
      },
      {
        title: '💻 Operating Systems Security',
        description: 'Learn Windows and Linux security, hardening, and vulnerability assessment.',
        duration: '5-6 weeks',
        resources: [
          'Linux security (YouTube: https://www.youtube.com/watch?v=KgwBBBtGtWY)',
          'Windows Active Directory (YouTube: https://www.youtube.com/watch?v=85-bp7XxWDQ)',
          'Security configuration (YouTube: https://www.youtube.com/watch?v=3RZkuQ4MkLc)'
        ],
        completed: false
      },
      {
        title: '🛡️ Ethical Hacking & Penetration Testing',
        description: 'Learn offensive security, web app testing, and exploit development.',
        duration: '10-12 weeks',
        resources: [
          'CEH certification (YouTube: https://www.youtube.com/watch?v=hXSFdwCnFxU)',
          'TryHackMe (YouTube: https://www.youtube.com/watch?v=lZAoFs75_cs)',
          'HackTheBox (YouTube: https://www.youtube.com/watch?v=2wfbRaGKuAs)',
          'OWASP Top 10 (YouTube: https://www.youtube.com/watch?v=ravAWGSBQfM)'
        ],
        completed: false
      },
      {
        title: '🔍 Incident Response & Forensics',
        description: 'Investigate security incidents and perform digital forensics.',
        duration: '6-8 weeks',
        resources: [
          'SANS courses (YouTube: https://www.youtube.com/watch?v=0Z-Ld3z8TFQ)',
          'Autopsy tool (YouTube: https://www.youtube.com/watch?v=QRCGopHls6g)',
          'Malware analysis (YouTube: https://www.youtube.com/watch?v=zv2p8_crWMs)',
          'Incident handling (YouTube: https://www.youtube.com/watch?v=xKPzbrXLGOQ)'
        ],
        completed: false
      },
      {
        title: '🏆 Certifications & Career',
        description: 'Earn industry certifications and build security portfolio.',
        duration: '12-16 weeks',
        resources: [
          'OSCP (YouTube: https://www.youtube.com/watch?v=OKo_BfBBGMQ)',
          'Security+ (YouTube: https://www.youtube.com/watch?v=9NE33fpQuw8)',
          'Bug bounty programs (YouTube: https://www.youtube.com/watch?v=p4JgIu1mceI)',
          'Build security projects'
        ],
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
        resources: [
          'Design principles (YouTube: https://www.youtube.com/watch?v=_Jtnod8SByA)',
          'Typography basics (YouTube: https://www.youtube.com/watch?v=QrNi9FmdlxY)',
          'Color psychology (YouTube: https://www.youtube.com/watch?v=x0smq5ljlf4)',
          'Practice daily'
        ],
        completed: false
      },
      {
        title: '🖌️ Design Tools Mastery',
        description: 'Learn Figma, Adobe XD, and prototyping tools.',
        duration: '5-6 weeks',
        resources: [
          'Figma masterclass (YouTube: https://www.youtube.com/watch?v=FTFaQWZBqQ8)',
          'Adobe XD tutorials (YouTube: https://www.youtube.com/watch?v=3aOU9MbITlM)',
          'Build 10 designs'
        ],
        completed: false
      },
      {
        title: '👤 User Research & Testing',
        description: 'Conduct user interviews, surveys, and usability testing.',
        duration: '4-5 weeks',
        resources: [
          'UX research methods (YouTube: https://www.youtube.com/watch?v=7_sFVYfatXY)',
          'Usability testing (YouTube: https://www.youtube.com/watch?v=0YL0xoSmyZI)',
          'Create personas (YouTube: https://www.youtube.com/watch?v=u44pBnAn7cM)'
        ],
        completed: false
      },
      {
        title: '📱 UI Design & Prototyping',
        description: 'Design beautiful interfaces and interactive prototypes.',
        duration: '6-8 weeks',
        resources: [
          'Mobile & web UI patterns (YouTube: https://www.youtube.com/watch?v=0J45UqnXCGc)',
          'Micro-interactions (YouTube: https://www.youtube.com/watch?v=kR-mU6EQKNQ)',
          'Build 5 prototypes'
        ],
        completed: false
      },
      {
        title: '💼 Portfolio & Client Work',
        description: 'Build professional portfolio and work on real projects.',
        duration: '8-10 weeks',
        resources: [
          'Dribbble portfolio (YouTube: https://www.youtube.com/watch?v=5Hd7RNBL6-o)',
          'Freelance projects (YouTube: https://www.youtube.com/watch?v=jA5MBymDOFk)',
          'Case studies (YouTube: https://www.youtube.com/watch?v=vMuEAKFCkAQ)',
          'Network'
        ],
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
        resources: [
          'Unity Learn (YouTube: https://www.youtube.com/watch?v=XtQMytORBmM)',
          'Game design theory (YouTube: https://www.youtube.com/watch?v=G8AT01tuyrk)',
          'Build 3 simple games'
        ],
        completed: false
      },
      {
        title: '💻 Programming for Games',
        description: 'Master C# for Unity or C++ for Unreal Engine.',
        duration: '8-10 weeks',
        resources: [
          'C# fundamentals (YouTube: https://www.youtube.com/watch?v=GhQdlIFylQ8)',
          'Unity scripting (YouTube: https://www.youtube.com/watch?v=IlAJ2jKeMjc)',
          'Game patterns (YouTube: https://www.youtube.com/watch?v=hFR7bFVtacc)',
          '100+ coding challenges'
        ],
        completed: false
      },
      {
        title: '🎨 3D Modeling & Animation',
        description: 'Create game assets with Blender, texturing, and rigging.',
        duration: '10-12 weeks',
        resources: [
          'Blender tutorials (YouTube: https://www.youtube.com/watch?v=B0J27sf9N1Y)',
          '3D modeling (YouTube: https://www.youtube.com/watch?v=nIoXOplUvAw)',
          'Character rigging (YouTube: https://www.youtube.com/watch?v=2sPt3MnHOgs)',
          'Create asset library'
        ],
        completed: false
      },
      {
        title: '🎵 Audio & VFX',
        description: 'Add sound effects, music, and visual effects to games.',
        duration: '4-5 weeks',
        resources: [
          'Audio design (YouTube: https://www.youtube.com/watch?v=at9S4RttCgI)',
          'Particle systems (YouTube: https://www.youtube.com/watch?v=FEA1wTMJAR0)',
          'Shader programming (YouTube: https://www.youtube.com/watch?v=kfM-yu0iAx0)',
          'Polish 3 games'
        ],
        completed: false
      },
      {
        title: '🚀 Publishing & Monetization',
        description: 'Publish games on Steam, mobile stores, and implement monetization.',
        duration: '6-8 weeks',
        resources: [
          'Steam publishing (YouTube: https://www.youtube.com/watch?v=YJZB2SzPRxw)',
          'Mobile optimization (YouTube: https://www.youtube.com/watch?v=4UMoFmEaFgE)',
          'Ads & IAP (YouTube: https://www.youtube.com/watch?v=eJRHM2KDNQY)',
          'Release 2 games'
        ],
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
        resources: [
          'Online courses (YouTube: https://www.youtube.com/@freeCodeCamp)',
          'Documentation',
          'Practice projects'
        ],
        completed: false
      },
      {
        title: '💪 Skill Development',
        description: 'Develop core skills and competencies',
        duration: '8-12 weeks',
        resources: [
          'Advanced tutorials (YouTube: https://www.youtube.com/@Fireship)',
          'Real projects',
          'Open source contributions'
        ],
        completed: false
      },
      {
        title: '🚀 Advanced & Specialization',
        description: 'Master advanced topics and specialize',
        duration: '12-16 weeks',
        resources: [
          'Expert-level content (YouTube: https://www.youtube.com/@TechWithTim)',
          'Complex projects',
          'Certifications'
        ],
        completed: false
      },
      {
        title: '💼 Career Preparation',
        description: 'Build portfolio and prepare for opportunities',
        duration: '6-8 weeks',
        resources: [
          'Portfolio projects',
          'Interview prep (YouTube: url(https://www.youtube.com/watch?v=1qw5ITr3k9E)',
          'Networking',
          'Job applications'
        ],
        completed: false
      }
    ];
  }
}

module.exports = new RoadmapService();