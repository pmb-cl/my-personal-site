// Content sourced from Phillip Bauman's resume + LinkedIn profile.

export const profile = {
  name: 'Phillip Bauman',
  role: 'Director of Software Engineering',
  company: 'Capital One Shopping',
  location: 'Brooklyn, New York',
  email: 'pbauman@alumni.nd.edu',
  phone: '917.364.6717',
  linkedin: 'https://www.linkedin.com/in/phillip-bauman',
  resume: '/Phillip_Bauman_Resume_2026_Final.pdf'
};

export const intro =
  'I build large-scale systems — and the engineering organizations behind them.';

export const about = [
  'I’m a technical executive with over a decade of progressive experience architecting large-scale, distributed marketing and ad-tech platforms. Today I direct a multi-workstream engineering organization at Capital One Shopping, owning the full architecture, technical strategy, and delivery for advertiser products spanning messaging, network integrations, and AI-powered personalization.',
  'My career has moved between two worlds: the zero-to-one urgency of a venture-backed startup, where I served as founding CTO, and the scale of a Fortune 100, where I lead 40+ engineers and a cloud-native platform serving millions of daily users. I care about the systems, but I care just as much about the people who build them.'
];

export const stats = [
  { value: 40, suffix: '+', label: 'Engineers led across AI/ML, Ad Tech & Messaging' },
  { value: 100, suffix: '+', label: 'Decoupled Node.js / AWS microservices' },
  { value: 900, suffix: 'M', label: 'Daily user touchpoints evaluated by ML pipelines' },
  { value: 20, suffix: '×', label: 'Increase in messaging system throughput' },
  { value: 30, suffix: 'K', label: 'Users scaled to as founding CTO' },
  { value: 2, prefix: '$', suffix: 'M', label: 'Venture funding raised at Hallo' }
];

export const journey = [
  {
    period: 'Jan 2024 — Present',
    role: 'Director, Software Engineering',
    company: 'Capital One Shopping',
    place: 'New York, NY',
    summary:
      'Leading a 40+ person engineering organization — including engineering managers and senior ICs — across Core AI/ML, Ad Tech, and Messaging.',
    points: [
      'Govern a cloud-native architecture of 100+ highly decoupled Node.js / AWS microservices serving millions of users.',
      'Scaled predictive modeling pipelines to evaluate 900M daily user touchpoints, optimizing 3M+ targeted sends for conversion and retention.',
      'Overhauled legacy messaging with event-driven, distributed AWS compute — cutting batch time >75% and lifting throughput 20× (250K → 5M dynamic emails/hour).',
      'Championed agentic AI and ML across marketing workflows, enabling real-time personalized creative delivery.',
      'Calibrated 100+ engineers across the horizontal organization through performance management strategy.'
    ]
  },
  {
    period: 'Feb 2022 — Jan 2024',
    role: 'Senior Manager, Software Engineering',
    company: 'Capital One Shopping',
    place: 'New York, NY',
    summary:
      'Led ~20 engineers across Alerts + Push Infrastructure, Placement Tech, and Sales Tooling.',
    points: [
      'Architected and scaled programmatic Ad Tech integrations and Direct Merchant APIs, expanding affiliate network capability.',
      'Partnered horizontally to reintroduce Machine Learning into Shopping and deepen product personalization.',
      'Grew the team 120% while holding a high talent bar.'
    ]
  },
  {
    period: '2017 — 2022',
    role: 'Co-Founder & CTO',
    company: 'Hallo',
    place: 'Los Angeles, CA',
    summary:
      'Founding team. Built a greenfield, distributed consumer platform on AWS from zero to production.',
    points: [
      'Raised $2M in venture funding — including from Garrett Camp (Uber) and Steve Case (AOL).',
      'Scaled the platform to 30,000 active users and $1MM in ARR.',
      'Built and shipped features instrumental to deals with Apple, T-Mobile, and Affirm.',
      'Established CI/CD pipelines, database schemas, and microservice topologies for high-concurrency live interactions.'
    ]
  },
  {
    period: '2012 — 2017',
    role: 'Engineer & Analyst',
    company: 'Capital One',
    place: 'US Card · Commercial Lending · Auto Finance',
    summary:
      'Progressed across DevOps, Software Engineering, and Business Analysis roles for a Fortune 100 financial institution.',
    points: [
      'Owned CI/CD and the rehydration strategy for analytics tracking on CapitalOne.com.',
      'Migrated the on-prem TeaLeaf engine to AWS and automated server provisioning with auto-scaling policies.',
      'Designed API and service integrations powering underwriting decisions for Commercial Lending.'
    ]
  }
];

export const expertise = [
  {
    title: 'Leadership',
    items: [
      'Org design & scaling',
      'Managers of managers',
      'Performance calibration',
      'Hiring & talent retention',
      'Technical strategy',
      'Cross-functional partnership'
    ]
  },
  {
    title: 'AI / ML',
    items: [
      'MLOps & decisioning',
      'Agentic AI workflows',
      'PyTorch · TensorFlow · Keras',
      'HuggingFace',
      'Feature-enrichment pipelines',
      'Generative personalization'
    ]
  },
  {
    title: 'Architecture',
    items: [
      'Distributed microservices',
      'Event-driven systems',
      'High-throughput pipelines',
      'Ad Tech & Direct Merchant APIs',
      'GraphQL · REST',
      'SSR · SEO · Accessibility'
    ]
  },
  {
    title: 'Cloud & Platform',
    items: [
      'AWS (Lambda, ECS, EMR…)',
      'Bedrock · BigQuery',
      'Node.js · TypeScript · Go',
      'Kubernetes · Docker',
      'Spark · Hadoop · Airflow',
      'Security & vulnerability mgmt'
    ]
  }
];

export const marquee = [
  'Capital One Shopping',
  'Hallo',
  'University of Notre Dame',
  'AWS',
  'Apple',
  'T-Mobile',
  'Affirm',
  'Garrett Camp',
  'Steve Case'
];
