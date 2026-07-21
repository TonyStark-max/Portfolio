export const portfolioData = {
  personal: {
    name: "Thupakula Somasekhar",
    title: "Software Engineer & Backend Systems Architect",
    tagline: "Building reliable, high-concurrency backend systems with Java 21, Spring Boot, PostgreSQL, Redis & Docker.",
    availability: "Seeking Software Engineering Opportunities",
    location: "Hyderabad, India",
    email: "somuthupakula2@gmail.com", // Paste your direct email here
    github: "https://github.com/TonyStark-max", // Paste your GitHub profile URL here
    linkedin: "https://linkedin.com/in/somu-thupakula", // Paste your LinkedIn profile URL here
    twitter: "https://x.com",
    resumeUrl: "/Somu_resume.pdf", // User's resume PDF
    university: "Malla Reddy Deemed to be University (Hyderabad)",
    degree: "Bachelor of Technology in Computer Science & Engineering (Expected 2027)",
    cgpa: "7.9/10",
    bio: [
      "Computer Science student with practical experience developing production-oriented software using Java, Spring Boot, PostgreSQL, Redis, and Docker.",
      "Specialized in building scalable REST APIs, implementing authentication & caching mechanisms, and designing concurrency-safe workflows through real-world projects."
    ],
    stats: [
      { label: "B.Tech CGPA", value: "7.9/10", highlight: "Malla Reddy University" },
      { label: "Core Stack", value: "Java 21", highlight: "Spring Boot & Netty" },
      { label: "API Test Pass", value: "100%", highlight: "Isolation, XSS & Rate-Limits" },
      { label: "Distributed Storage", value: "Netty TCP", highlight: "WAL & JSON Snapshots" },
    ]
  },

  projects: [
    {
      id: "synapse-hub",
      title: "Synapse-Hub",
      subtitle: "Multi-Tenant Idea Management System for Teams",
      category: "Backend & Security",
      featured: true,
      metrics: "PostgreSQL RLS • 100% Test Pass",
      description: "Production-oriented multi-tenant idea management platform enforcing strict row-level security, IDOR protection, and a dual-mode auth sandbox.",
      architecture: [
        "Enforced multi-tenant isolation via PostgreSQL Row-Level Security (RLS) and Spring Security filters, blocking cross-tenant IDOR access.",
        "Built a dual-mode auth engine — Clerk OAuth2 and a mock JWT sandbox — cutting local setup to one Docker command.",
        "Verified tenant isolation and API security via integration tests, hitting 100% pass across isolation, XSS, and rate-limiting suites."
      ],
      techStack: ["Java 21", "Spring Boot", "PostgreSQL", "Clerk OAuth", "React", "TypeScript", "MockMvc", "Docker"],
      demoUrl: "https://github.com/TonyStark-max/Synapse-Hub",
      githubUrl: "https://github.com/TonyStark-max/Synapse-Hub",
      hldUrl: "/docs/synapse-hub-hld.pdf",
      accentColor: "from-amber-500/20 to-orange-500/10",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "distributed-kv-store",
      title: "Distributed KV-Store",
      subtitle: "Concurrent Low-Latency Key-Value Engine",
      category: "Systems & Networking",
      featured: true,
      metrics: "Custom TCP • Crash-Safe WAL",
      description: "High-performance concurrent key-value store built with Java 21 and Netty, featuring write-ahead logging (WAL), snapshotting, and async replication.",
      architecture: [
        "Networking: Architected a concurrent key-value store using Java 21 and Netty with a custom TCP wire protocol.",
        "Durability: Engineered crash-safe storage via write-ahead logging (WAL) disk flushes and atomic JSON snapshotting.",
        "Replication: Implemented asynchronous primary-replica streaming with automatic client reconnection and lag tracking."
      ],
      techStack: ["Java 21", "Netty", "JUnit", "SLF4J", "Docker", "Docker Compose"],
      demoUrl: "https://github.com/TonyStark-max/Mini-KV",
      githubUrl: "https://github.com/TonyStark-max/Mini-KV",
      hldUrl: "/docs/mini-kv-hld.pdf",
      accentColor: "from-teal-500/20 to-emerald-500/10",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "natural-ticket-booking",
      title: "Natural Language Ticket Booking",
      subtitle: "AI-Assisted High-Concurrency Reservation Engine",
      category: "AI & Microservices",
      featured: true,
      metrics: "Zero Double-Bookings • CDC Sync",
      description: "Resilient ticket reservation platform powered by Spring AI and Supabase, utilizing a 2-tiered locking engine to eliminate race conditions.",
      architecture: [
        "Designed a two-tiered locking engine using Redis TTL soft holds and PostgreSQL pessimistic locks to eliminate double-bookings.",
        "Built a resilient transaction system with idempotent retries and automated compensating rollbacks for payment failures.",
        "Synchronized seat maps via Postgres CDC and built an AI booking agent routing directly through the transactional API."
      ],
      techStack: ["Java", "Spring AI", "SpringBoot", "PostgreSQL", "Redis", "Supabase", "React", "Docker"],
      demoUrl: "https://github.com/TonyStark-max/aiseatbooking",
      githubUrl: "https://github.com/TonyStark-max/aiseatbooking",
      hldUrl: "/docs/aiseatbooking-hld.pdf",
      accentColor: "from-cyan-500/20 to-blue-500/10",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  education: {
    institution: "Malla Reddy Deemed to be University (Hyderabad)",
    period: "2023 — Present",
    degree: "Bachelor of Technology in Computer Science & Engineering (Expected 2027)",
    cgpa: "7.9 / 10",
    coursework: ["Data Structures & Algorithms", "Database Management Systems", "Object-Oriented Programming", "Operating Systems", "Computer Networks", "Software Engineering"]
  },

  experience: [
    {
      role: "Backend & Systems Software Developer",
      company: "Software Engineering Projects",
      period: "2023 — Present",
      type: "Production Projects & Research",
      description: "Developed production-oriented software using Java 21, Spring Boot, PostgreSQL, Redis, Netty, and Docker. Implemented scalable REST APIs, authentication security, crash-safe storage, and concurrency locks.",
      highlights: [
        "Built multi-tenant isolation with PostgreSQL RLS & Spring Security filters, preventing cross-tenant IDOR access.",
        "Architected concurrent Netty TCP wire protocol key-value store with crash-safe WAL disk flushes and async primary-replica streaming.",
        "Engineered 2-tiered locking engine (Redis TTL soft holds + Postgres pessimistic locks) eliminating double-bookings in high-traffic reservation workflows."
      ],
      tech: ["Java 21", "Spring Boot", "Spring Security", "Spring AI", "Netty", "PostgreSQL", "Redis", "Docker"]
    }
  ],

  skills: [
    // Languages
    { name: "Java 21", category: "Languages", icon: "Coffee", level: "Advanced", desc: "Core language for microservices, Netty concurrency & enterprise systems." },
    { name: "Python", category: "Languages", icon: "Code", level: "Proficient", desc: "Scripting, data processing, and automation algorithms." },
    { name: "JavaScript", category: "Languages", icon: "FileCode", level: "Proficient", desc: "Frontend React integration, REST APIs, and async logic." },

    // Backend
    { name: "Spring Boot", category: "Backend", icon: "Server", level: "Advanced", desc: "Building scalable REST APIs, dependency injection & microservice architecture." },
    { name: "Spring Security", category: "Backend", icon: "Shield", level: "Advanced", desc: "OAuth2, JWT authentication, multi-tenant security filters & RLS." },
    { name: "Spring AI", category: "Backend", icon: "Sparkles", level: "Intermediate", desc: "AI agent integrations, LLM prompt routing & transactional APIs." },
    { name: "JPA / Hibernate", category: "Backend", icon: "Database", level: "Proficient", desc: "ORM data mapping, pessimistic locking & database transactions." },
    { name: "REST APIs & Microservices", category: "Backend", icon: "Layers", level: "Advanced", desc: "Decoupled architecture, DTO mapping, rate limiting & MockMvc testing." },

    // DevOps & Tools
    { name: "Docker & Compose", category: "DevOps & Tools", icon: "Container", level: "Advanced", desc: "Containerizing microservices, multi-stage builds & local dev environments." },
    { name: "Git & GitHub Actions", category: "DevOps & Tools", icon: "GitBranch", level: "Proficient", desc: "Version control, automated CI testing, and release workflows." },
    { name: "Linux", category: "DevOps & Tools", icon: "Terminal", level: "Proficient", desc: "Shell scripting, process management, and server administration." },
    { name: "Maven & Vercel", category: "DevOps & Tools", icon: "Package", level: "Proficient", desc: "Build automation, dependency management & frontend deployment." },

    // Databases
    { name: "PostgreSQL", category: "Databases", icon: "Database", level: "Advanced", desc: "Row-Level Security (RLS), pessimistic locks, and Change Data Capture (CDC)." },
    { name: "Redis", category: "Databases", icon: "Zap", level: "Advanced", desc: "High-speed caching, TTL soft holds, and distributed locking." },
    { name: "MinIO & Supabase", category: "Databases", icon: "HardDrive", level: "Proficient", desc: "Object storage and cloud backend database synchronization." }
  ]
};
