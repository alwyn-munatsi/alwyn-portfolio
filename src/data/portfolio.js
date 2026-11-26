import generatedProjects from './projects.generated.json'

export const personal = {
  name: "Alwyn Munatsi",
  nickname: "Ndodana",
  pronouns: "He/Him",
  location: "Jersey City, NJ, United States",
  email: "munatsialwyn26@gmail.com",
  linkedin: "https://www.linkedin.com/in/alwynmunatsi/",
  github: "https://github.com/alwyn-munatsi",
  tagline: "Data Engineer · Data Analyst · BI Developer · AI/ML Engineering",
  bio: "Results-driven Data Engineer with strong expertise in SQL optimization, ETL development, and scalable cloud-based data solutions. Skilled at building and optimizing data pipelines, reducing ETL processing time by up to 80% and improving query performance by 40%. Experience includes credit management, fintech, and insurance technology, delivering business-critical insights through robust reporting and BI tools (Power BI, Tableau, QuickSight, Looker). Certified in Databricks Fundamentals and AWS Data Engineering Foundations. Seeking internship opportunities to apply advanced analytical skills and contribute to innovative, data-driven solutions.",
  stats: [
    { value: "6+",    label: "Years Experience" },
    { value: "80%",   label: "ETL Speed Gain"   },
    { value: "100K+", label: "Customers Served"  },
    { value: "10+",   label: "Certifications"    },
  ],
  openToWork: true,
}

export const experience = [
  {
    title: "Data Analyst Intern",
    company: "Copper Sparrow",
    period: "Jan 2026 – Present",
    duration: "3 mos",
    location: "New York, United States · Remote",
    type: "Internship",
    skills: ["Tableau", "Microsoft Power BI"],
    color: "#22c55e",
    current: true,
  },
  {
    title: "Entry Level Data Engineer",
    company: "Equals",
    period: "Jan 2022 – Dec 2024",
    duration: "3 yrs",
    location: "Harare, Zimbabwe · Hybrid",
    type: "Full-time",
    description: "Developed and maintained ETL workflows to support scalable credit risk data pipelines, reducing processing times by 35%, saving almost 15 staff hours weekly, and ensuring accurate financial reporting.",
    skills: ["Extract, Transform, Load (ETL)", "Data-Driven Decision Support", "SQL", "Python", "Azure"],
    color: "#38bdf8",
    current: false,
  },
  {
    title: "SQL Developer Associate",
    company: "EcoCash Holdings",
    period: "Jun 2019 – Jan 2022",
    duration: "2 yrs 8 mos",
    location: "Harare, Zimbabwe · Hybrid",
    type: "Full-time",
    description: "Developed and optimized SQL queries and stored procedures to manage customer policy data, improving response times by 80% (from 5s to 1s) and ensuring accurate claims reporting for 100K+ customers.",
    skills: ["API Integration", "OLAP", "SQL", "Stored Procedures"],
    color: "#f59e0b",
    current: false,
  },
]

export const education = [
  {
    school: "Katz School of Science and Health",
    degree: "Master of Science — MS, Data Analytics and Visualization",
    period: "Jan 2025 – Dec 2026",
    skills: ["CTE", "Transact-SQL (T-SQL)", "+20 skills"],
    logo: "K",
    color: "#ef4444",
  },
  {
    school: "Harare Institute of Technology",
    degree: "Bachelor of Technology (BTech), Computer Science",
    period: "2014 – 2018",
    grade: "Second Class",
    activities: "Soccer",
    skills: ["Transact-SQL (T-SQL)", "Python", "+7 skills"],
    logo: "H",
    color: "#38bdf8",
  },
]

// Manually curated projects. These always take precedence over auto-synced
// ones below (matched by GitHub URL), so you can override title/description/
// category for any repo just by editing its entry here.
const curatedProjects = [
  {
    title: "The Quest to Predict Labor: A Data-Driven Look at Weekly Work Hours",
    short: "Labor Prediction ML Model",
    period: "Nov 2025 – Dec 2025",
    association: "Katz School of Science and Health",
    description: "Exploring which demographic, socioeconomic, and occupational variables best predict weekly labor supply (hours worked per week) among U.S. adults.",
    skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"],
    category: "ML · Research",
    github: "https://github.com/alwyn-munatsi/machine-learning-predict-hours-per-week",
  },
  {
    title: "Data Engineering — Retail Order Analysis",
    short: "Retail Order Analysis",
    period: "2024",
    association: "Katz School of Science and Health",
    description: "Comprehensive analysis of retail order data using both SQL and Python, designed to extract key business insights from historical sales records across regions, categories, and product lines.",
    skills: ["Python", "Microsoft SQL Server", "SQL", "ETL"],
    category: "Data Engineering",
    github: "https://github.com/alwyn-munatsi/data-engineering-retail-orders-analysis",
  },
  {
    title: "DataCo Supply Chain Business Intelligence",
    short: "Supply Chain BI Dashboard",
    period: "2024",
    association: "Personal Project",
    description: "End-to-end BI dashboard for DataCo supply chain analytics, delivering actionable insights on inventory, logistics, and supplier performance.",
    skills: ["Power BI", "SQL", "Data Visualization"],
    category: "Business Intelligence",
    github: "https://github.com/alwyn-munatsi/dataco-supplychain-bi",
  },
  {
    title: "Social Signals Data Pipeline",
    short: "Social Signals Pipeline",
    period: "2024",
    association: "Personal Project",
    description: "Real-time social media data ingestion and processing pipeline, capturing signals and transforming them for downstream analytics.",
    skills: ["Python", "Data Engineering", "ETL"],
    category: "Data Engineering",
    github: "https://github.com/alwyn-munatsi/social-signals-data-pipeline",
  },
  {
    title: "Retail & Stock Market Data Pipeline",
    short: "Stock Market Pipeline",
    period: "2024",
    association: "Personal Project",
    description: "Time-series retail and stock market data pipeline combining real-time ingestion with historical analysis.",
    skills: ["Python", "Data Engineering", "Time Series"],
    category: "Data Engineering",
    github: "https://github.com/alwyn-munatsi/real-time-stocks-market-data-pipeline",
  },
  {
    title: "Smart Health Diagnosis and Doctor Reference System",
    short: "Smart Health Diagnosis",
    period: "2018",
    association: "Harare Institute of Technology",
    description: "Web-based application using Java, Spring Boot, and MySQL to assist users in diagnosing health conditions and referring appropriate doctors based on symptoms. Incorporated ML algorithms for accurate health diagnosis.",
    skills: ["Java", "Spring Boot", "MySQL", "Machine Learning"],
    category: "Full Stack · AI",
    github: "https://github.com/alwyn-munatsi",
  },
]

// Auto-synced daily by .github/workflows/sync-projects.yml from GitHub repos
// tagged with the "data-engineering" topic. `projects.generated.json` is
// regenerated — do not hand-edit it; to override a specific auto-synced
// project, add a curated entry above with the same `github` URL instead.
const seenUrls = new Set(curatedProjects.map(p => p.github))

export const projects = [
  ...curatedProjects,
  ...generatedProjects.filter(p => !seenUrls.has(p.github)),
]

export const certifications = [
  { name: "Neo4j Fundamentals",        issuer: "Neo4j",          date: "Feb 2026", color: "#38bdf8" },
  { name: "Model Validation 1 – Trainer", issuer: "Handshake",   date: "Nov 2025", color: "#818cf8" },
  { name: "Model Validation 2 – Expert",  issuer: "Handshake",   date: "Oct 2025", color: "#818cf8" },
  { name: "Databricks Fundamentals",   issuer: "Databricks",     date: "Jul 2025", color: "#ff6b35" },
  { name: "Data Engineering on AWS",   issuer: "AWS",            date: "Jul 2025", color: "#f59e0b" },
  { name: "Data Fundamentals",         issuer: "IBM",            date: "May 2025", color: "#0f62fe" },
  { name: "Getting Started with Data", issuer: "IBM",            date: "Apr 2025", color: "#0f62fe" },
  { name: "Tata Data Visualisation",   issuer: "Tata / Forage",  date: "Mar 2025", color: "#00a3e0" },
  { name: "Data Science Foundations",  issuer: "IBM",            date: "Jul 2021", color: "#0f62fe" },
  { name: "Java Programming",          issuer: "Great Learning", date: "Apr 2022", color: "#22c55e" },
  { name: "Java",                      issuer: "TestDome",        date: "Aug 2021", color: "#22c55e" },
  { name: "Spring Boot 2.0 Essential Training", issuer: "LinkedIn", date: "Jun 2021", color: "#0077b5" },
]

export const skills = {
  "Languages":      ["Python", "SQL", "Java", "R", "T-SQL"],
  "Data Tools":     ["Power BI", "Tableau", "QuickSight", "Looker", "Excel"],
  "Engineering":    ["ETL / ELT", "Data Pipelines", "Data Warehousing", "OLAP", "Neo4j"],
  "Cloud & Infra":  ["Azure", "AWS", "Databricks", "Azure Data Factory"],
  "Frameworks":     ["Spring Boot", "TensorFlow", "Pandas", "NumPy"],
  "Databases":      ["Microsoft SQL Server", "MySQL", "PostgreSQL"],
}

export const chatbotContext = `
You are an AI assistant representing Alwyn (Ndodana) Munatsi on his personal portfolio website.
Answer questions about Alwyn in a friendly, professional, and enthusiastic manner. Speak in third person about Alwyn unless asked to speak differently.

KEY FACTS:
- Full name: Alwyn (Ndodana) Munatsi, pronouns He/Him
- Location: Jersey City, New Jersey, United States
- Currently: Data Analyst Intern at Copper Sparrow (Jan 2026–Present, NYC Remote)
- Open to work: Data Analyst, Data Scientist, Data Engineer internship roles

EXPERIENCE:
1. Data Analyst Intern @ Copper Sparrow (Jan 2026–Present): Using Tableau and Microsoft Power BI. Remote, NYC.
2. Entry Level Data Engineer @ Equals (Jan 2022–Dec 2024, 3 years): ETL workflows for credit risk data pipelines. Reduced processing times by 35%, saved 15 staff hours weekly. Harare, Zimbabwe.
3. SQL Developer Associate @ EcoCash Holdings (Jun 2019–Jan 2022, 2 yrs 8 mos): Optimized SQL queries, improved response times by 80% (from 5s to 1s), managed data for 100K+ customers. Harare, Zimbabwe.

EDUCATION:
- MS, Data Analytics and Visualization @ Katz School of Science and Health (Jan 2025–Dec 2026) — currently enrolled
- BTech, Computer Science @ Harare Institute of Technology (2014–2018) — Second Class

KEY ACHIEVEMENTS:
- Reduced ETL processing time by up to 80%
- Improved query performance by 40%
- Served 100K+ customers at EcoCash
- 2,791 LinkedIn followers

SKILLS: SQL, Python, Power BI, Tableau, ETL, Azure, Databricks, AWS, TensorFlow, Neo4j, Java, Spring Boot, R, QuickSight, Looker

CERTIFICATIONS: Neo4j Fundamentals (Feb 2026), Databricks Fundamentals (Jul 2025), AWS Data Engineering (Jul 2025), IBM Data Fundamentals (May 2025), Tata Data Visualisation (Mar 2025), and more.

PROJECTS:
- Labor Prediction ML Model (Katz, 2025): TensorFlow/Python ML model predicting weekly labor supply
- Retail Order Analysis (Katz, 2024): Python + SQL Server data engineering pipeline
- Supply Chain BI Dashboard: Power BI dashboard for DataCo
- Social Signals Data Pipeline: Real-time social data ingestion
- Smart Health Diagnosis System (HIT, 2018): Java/Spring Boot/MySQL web app with ML

GitHub: https://github.com/alwyn-munatsi
LinkedIn: https://www.linkedin.com/in/alwynmunatsi/

Keep answers concise, warm, and professional. If asked about availability, say Alwyn is actively seeking Data Analytics, Data Engineering, or Data Science internship/entry-level opportunities.
`
