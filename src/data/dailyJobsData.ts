import { DailyJobPosting, AtsScanner } from "../types";

export const liveAtsScanners: AtsScanner[] = [
  {
    id: "fast-track-3-6-lpa-scanner",
    title: "⚡ 3-6 LPA Fast-Track Off-Campus & Drive Scanner (1st Choice)",
    platform: "Mass IT Services & Analytics CoEs",
    badge: "Fastest Offer (7-14 Days)",
    description:
      "Direct live search for high-volume entry-level Data Analyst, BI Trainee, and Associate roles across TCS, Cognizant, Infosys, Capgemini, LTIMindtree, Hexaware, Virtusa, and Genpact.",
    searchUrl:
      'https://www.google.com/search?q=("Data+Analyst"+OR+"BI+Analyst"+OR+"Analytics+Trainee"+OR+"Associate+Data+Analyst")+("fresher"+OR+"entry+level"+OR+"trainee"+OR+"0-1+years"+OR+"2026")+("TCS"+OR+"Cognizant"+OR+"Infosys"+OR+"Capgemini"+OR+"Hexaware"+OR+"Virtusa"+OR+"Genpact")+("Hyderabad"+OR+"Bangalore"+OR+"Pan-India")',
    targetCompanyTypes: "High-Intake IT Services & Analytics CoEs (₹3 - ₹6 LPA)",
    frequencyRecommendation: "Run every morning at 9:00 AM (Immediate registration)",
  },
  {
    id: "boutique-analytics-3-6-lpa",
    title: "⚡ Boutique Analytics & Power BI Consultancies (3-6 LPA)",
    platform: "Boutique Portals & Direct Walk-ins",
    badge: "1-Week Technical Turnaround",
    description:
      "Queries active openings in pure-play decision science and Power BI consultancies (Mu Sigma, LatentView, Polestar Solutions, Celebal, Course5, SG Analytics, Ugam, Gramener).",
    searchUrl:
      'https://www.google.com/search?q=("Data+Analyst"+OR+"BI+Consultant"+OR+"Junior+Decision+Scientist"+OR+"Power+BI+Trainee")+("Mu+Sigma"+OR+"LatentView"+OR+"Polestar"+OR+"Celebal"+OR+"Course5"+OR+"SG+Analytics"+OR+"Gramener")+("fresher"+OR+"junior"+OR+"2026")+("Hyderabad"+OR+"Bangalore")',
    targetCompanyTypes: "Boutique Analytics & Power BI Partners (₹3.8 - ₹6.5 LPA)",
    frequencyRecommendation: "Run daily at 11:00 AM",
  },
  {
    id: "gcc-growth-6-10-lpa",
    title: "🚀 6-10 LPA GCC & Mid-Product Tech Scanner (2nd Choice)",
    platform: "Workday & Enterprise ATS",
    badge: "GCC & Product (14-25 Days)",
    description:
      "Scans live Workday and Greenhouse portals for high-intake Hyderabad & Bangalore GCCs (Novartis, Optum, Broadridge, FactSet, S&P Global, Invesco, State Street, Synchrony, Bosch, Dell).",
    searchUrl:
      'https://www.google.com/search?q=site:myworkdayjobs.com+("Data+Analyst"+OR+"BI+Analyst"+OR+"Operations+Analyst")+("Novartis"+OR+"Optum"+OR+"Broadridge"+OR+"FactSet"+OR+"SP+Global"+OR+"Invesco"+OR+"State+Street"+OR+"Synchrony")+("fresher"+OR+"0-1+years"+OR+"2026")+("Hyderabad"+OR+"Bangalore")',
    targetCompanyTypes: "Hyderabad & Bangalore GCCs (₹6.0 - ₹9.5 LPA)",
    frequencyRecommendation: "Run twice a week (Monday & Thursday)",
  },
  {
    id: "linkedin-immediate-joiner",
    title: "⚡ LinkedIn 24h Immediate Joiner & Team Lead Posts",
    platform: "LinkedIn Live Feed",
    badge: "Direct Hiring Leads",
    description:
      "Finds direct status updates from Analytics Managers and Team Leads hiring 0-1 yr freshers for 3-6 LPA and 6-10 LPA immediate joiner positions.",
    searchUrl:
      'https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22hiring%22%20OR%20%22looking%20for%22)%20AND%20(%22Data%20Analyst%22%20OR%20%22Power%20BI%20Analyst%22)%20AND%20(%22fresher%22%20OR%20%220-1%20years%22%20OR%20%22immediate%22)&origin=GLOBAL_SEARCH_HEADER&sortBy=%22date_posted%22',
    targetCompanyTypes: "Team Leads & Hiring Managers",
    frequencyRecommendation: "Check every morning and evening",
  },
  {
    id: "startup-unicorn-quick-hiring",
    title: "🚀 Unicorn & Quick-Commerce Analytics Radar (6-10 LPA)",
    platform: "Greenhouse & Lever",
    badge: "High Growth",
    description:
      "Queries high-growth quick commerce and SaaS unicorns hiring junior operations analysts (Zepto, Swiggy, Razorpay, PhonePe, Shiprocket, Urban Company, Porter).",
    searchUrl:
      'https://www.google.com/search?q=(site:boards.greenhouse.io+OR+site:jobs.lever.co)+("Data+Analyst"+OR+"Operations+Analyst"+OR+"Growth+Analyst")+("Zepto"+OR+"Swiggy"+OR+"Razorpay"+OR+"PhonePe"+OR+"Shiprocket"+OR+"Porter")+("fresher"+OR+"junior"+OR+"entry")+("Hyderabad"+OR+"Bangalore")',
    targetCompanyTypes: "High-Growth Scale-ups (₹6.5 - ₹9.5 LPA)",
    frequencyRecommendation: "Run every 2-3 days",
  },
  {
    id: "linkedin-entry-jobs-hyderabad",
    title: "⚡ Verified 0-1 Yr Filtered Openings in Hyderabad & Bangalore",
    platform: "LinkedIn Jobs Filter",
    badge: "Verified Entry-Level",
    description:
      "Direct link with official LinkedIn Entry-Level (f_E=1,2) filters locked to Data Analyst and Power BI Analyst roles in Hyderabad & Bangalore.",
    searchUrl:
      "https://www.linkedin.com/jobs/search/?f_E=1%2C2&keywords=%22Data%20Analyst%22%20OR%20%22Power%20BI%20Analyst%22%20OR%20%22SQL%20Analyst%22&location=Hyderabad%2C%20Telangana%2C%20India&sortBy=DD",
    targetCompanyTypes: "All Fast-Hiring Hubs",
    frequencyRecommendation: "Apply directly within 2 hours of posting",
  },
  {
    id: "hyderabad-startups-wellfound-angelist",
    title: "🚀 Wellfound (AngelList) Hyderabad Startups Scanner",
    platform: "Wellfound / AngelList",
    badge: "Direct Founder Inboxes (24-48h)",
    description:
      "Direct 1-click search for Data Analyst, BI Analyst & Product Analyst positions at venture-backed Hyderabad startups. Applications land directly with Founders and CTOs.",
    searchUrl:
      "https://wellfound.com/jobs?location=Hyderabad&role=data-analyst",
    targetCompanyTypes: "Seed to Series B Hyderabad Startups",
    frequencyRecommendation: "Check every morning (Apply directly with portfolio link)",
  },
  {
    id: "hyderabad-cutshort-startups",
    title: "🎯 Cutshort Hyderabad Tech Startups (Fast-Track Offers)",
    platform: "Cutshort Direct Chat",
    badge: "60%+ Reply Rate in 48h",
    description:
      "Direct chat with hiring managers at Hyderabad scaleups (Darwinbox, Keka HR, Zaggle, Quixy, StanPlus, IncNut). Bypasses slow ATS portals.",
    searchUrl:
      "https://cutshort.io/jobs/data-analyst-jobs-in-hyderabad",
    targetCompanyTypes: "Fast-Hiring Product Startups in HITEC City & Madhapur",
    frequencyRecommendation: "Check daily at 10:00 AM & 5:00 PM",
  },
  {
    id: "t-hub-cie-incubator-scanner",
    title: "🏢 T-Hub Phase 2 & CIE IIIT-H Startup Ecosystem",
    platform: "T-Hub & CIE Job Boards",
    badge: "World's Largest Incubator (400+ Startups)",
    description:
      "Live openings across 400+ startups at T-Hub Phase 2 (Knowledge City, Raidurg) and CIE IIIT-Hyderabad. Immediate joining preferred for entry-level data analysts.",
    searchUrl:
      'https://www.google.com/search?q=("T-Hub"+OR+"IIIT+Hyderabad"+OR+"CIE")+("Data+Analyst"+OR+"BI+Analyst"+OR+"Analytics+Intern")+("Hyderabad"+OR+"Raidurg")+2026',
    targetCompanyTypes: "T-Hub Phase 2 Incubated Tech Startups",
    frequencyRecommendation: "Check weekly & attend T-Hub open networking demo days",
  },
  {
    id: "linkedin-hyderabad-startups-past-24h",
    title: "⚡ LinkedIn 24h Hyderabad Startup Urgent Requisitions",
    platform: "LinkedIn Live Feed",
    badge: "0-15 Days Notice Preferred",
    description:
      "Real-time posts from Hyderabad founders, VPs of Data, and Product Heads looking for immediate joiners with SQL and Power BI skills.",
    searchUrl:
      'https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22hiring%22%20OR%20%22looking%20for%22)%20AND%20(%22Data%20Analyst%22%20OR%20%22Power%20BI%22)%20AND%20(%22Hyderabad%22)%20AND%20(%22immediate%22%20OR%20%22fresher%22%20OR%20%220-1%20years%22)&origin=GLOBAL_SEARCH_HEADER&sortBy=%22date_posted%22',
    targetCompanyTypes: "Founders & Engineering Leads (Hyderabad)",
    frequencyRecommendation: "Check twice daily and DM directly with phone number",
  },
];

export const curatedDailyJobPostings: DailyJobPosting[] = [
  // --- HYDERABAD STARTUPS FAST-TRACK JOBS (URGENT / IMMEDIATE HIRING) ---
  {
    id: "job-darwinbox-associate-analyst-hyd",
    companyName: "Darwinbox",
    companyId: 501,
    roleTitle: "Associate Data Analyst (People & Product Analytics)",
    location: "Hyderabad (HITEC City HQ)",
    experienceLevel: "Fresher / 0-1 years (2026 Batch Eligible)",
    postedDate: "Today",
    tierCategory: "Indian Unicorn & High-Growth SaaS",
    requiredSkills: ["SQL", "Power BI", "Python", "Tableau", "Excel"],
    salaryRange: "₹7.5 - ₹10.5 LPA",
    packageCategory: "6-10 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://darwinbox.com/careers/",
    jobDescriptionSummary:
      "Join Darwinbox's core People Analytics & BI team in HITEC City. Query multi-tenant SQL data stores, design automated executive HR metrics dashboards, and analyze customer feature retention. Rapid 10-day interview turnaround.",
    fresherHiringType: "Direct FTE - Fast Placement",
    isUrgent: true,
  },
  {
    id: "job-keka-jr-data-analyst-hyd",
    companyName: "Keka HR",
    companyId: 504,
    roleTitle: "Junior Data Analyst & BI Developer",
    location: "Hyderabad (Kondapur HQ)",
    experienceLevel: "Fresher / 0-1 years (Immediate Joiner)",
    postedDate: "Today",
    tierCategory: "Fast-Growing Startup",
    requiredSkills: ["SQL", "PostgreSQL", "Power BI", "Excel", "Data Wrangling"],
    salaryRange: "₹4.5 - ₹6.5 LPA",
    packageCategory: "3-6 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.keka.com/careers",
    jobDescriptionSummary:
      "Work directly with engineering and product leads at Keka's Kondapur HQ. Clean and model payroll datasets, optimize relational database queries, and build internal performance dashboards in Power BI. Immediate offer for strong SQL problem solvers.",
    fresherHiringType: "Direct FTE - Fast Placement",
    isUrgent: true,
  },
  {
    id: "job-redhealth-fleet-analyst-hyd",
    companyName: "RED.Health (StanPlus)",
    companyId: 506,
    roleTitle: "Operations Data Analyst (Fleet & Telematics)",
    location: "Hyderabad (Madhapur)",
    experienceLevel: "Fresher / 0-1 years",
    postedDate: "Today",
    tierCategory: "Fast-Growing Startup",
    requiredSkills: ["SQL", "Python", "Google Looker Studio", "Excel", "GIS Data"],
    salaryRange: "₹4.0 - ₹6.5 LPA",
    packageCategory: "3-6 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://red.health/careers/",
    jobDescriptionSummary:
      "Analyze emergency response times, hospital admission handoffs, and ambulance fleet routing across Telangana and national hubs. Direct communication with VP of Operations with same-week hiring loop.",
    fresherHiringType: "Direct FTE - Fast Placement",
    isUrgent: true,
  },
  {
    id: "job-thub-incubator-analyst-hyd",
    companyName: "T-Hub Ecosystem Startups (Direct Hub)",
    companyId: 540,
    roleTitle: "Data Analyst & Business Intelligence Trainee",
    location: "Hyderabad (T-Hub Phase 2, Knowledge City, Raidurg)",
    experienceLevel: "Fresher / 2026 Batch (Immediate)",
    postedDate: "Today",
    tierCategory: "Fast-Growing Startup",
    requiredSkills: ["SQL", "Power BI", "Python", "Advanced Excel"],
    salaryRange: "₹4.0 - ₹7.0 LPA",
    packageCategory: "3-6 LPA",
    atsPlatform: "Direct Walk-in",
    applyUrl: "https://t-hub.co/careers/",
    jobDescriptionSummary:
      "Multi-startup hiring pool at T-Hub Phase 2 in Knowledge City. Startups look for energetic data analysts capable of building instant dashboards, automating data scraping/ETL, and reporting business KPIs directly to founders.",
    fresherHiringType: "Walk-in / Immediate Offer",
    isUrgent: true,
  },
  {
    id: "job-zaggle-fintech-analyst-hyd",
    companyName: "Zaggle",
    companyId: 505,
    roleTitle: "FinTech Data Analyst (Spend & Transaction Risk)",
    location: "Hyderabad (Banjara Hills / HITEC City)",
    experienceLevel: "Fresher / 0-1 years",
    postedDate: "1 day ago",
    tierCategory: "Fast-Growing Startup",
    requiredSkills: ["SQL", "Python", "Power BI", "Excel", "Transaction Analytics"],
    salaryRange: "₹4.5 - ₹7.0 LPA",
    packageCategory: "3-6 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.zaggle.in/careers",
    jobDescriptionSummary:
      "Analyze corporate card transaction patterns, identify expense anomalies, and build Power BI reports for enterprise CFO clients. Fast-paced listed fintech company.",
    fresherHiringType: "Direct FTE",
    isUrgent: false,
  },
  {
    id: "job-highradius-associate-analyst-hyd",
    companyName: "HighRadius",
    companyId: 502,
    roleTitle: "Associate Data Analyst (Order-to-Cash AI)",
    location: "Hyderabad (Financial District)",
    experienceLevel: "Fresher / 2026 Batch",
    postedDate: "Today",
    tierCategory: "Indian Unicorn & High-Growth SaaS",
    requiredSkills: ["SQL", "Python", "Power BI", "Machine Learning Basics", "Excel"],
    salaryRange: "₹7.0 - ₹9.5 LPA",
    packageCategory: "6-10 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.highradius.com/careers/",
    jobDescriptionSummary:
      "Build automated data validation pipelines and financial reporting models for Fortune 500 treasuries. Work at HighRadius's premier campus in Hyderabad Financial District.",
    fresherHiringType: "Early Career FTE",
    isUrgent: true,
  },

  // --- 3-6 LPA FAST-TRACK OPENINGS (1ST CHOICE) ---
  {
    id: "job-polestar-bi-associate-3-6",
    companyName: "Polestar Solutions",
    companyId: 4,
    roleTitle: "Associate BI Consultant (Power BI & SQL Track)",
    location: "Hyderabad (HITEC City)",
    experienceLevel: "Fresher / 0-1 years (2026 Batch Eligible)",
    postedDate: "Today",
    tierCategory: "Boutique Analytics",
    requiredSkills: ["Power BI", "DAX Formulas", "SQL Server", "Excel", "Data Modeling"],
    salaryRange: "₹4.2 - ₹6.0 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=Polestar+Solutions+careers+Associate+BI+Consultant+Hyderabad",
    jobDescriptionSummary:
      "Build enterprise-grade Power BI reports with custom DAX calculations. Perform SQL transformations, automate ETL schedules, and validate data accuracy. Fast technical evaluation within 7 days.",
    fresherHiringType: "Direct FTE - Fast Placement",
    isUrgent: true,
  },
  {
    id: "job-musigma-decision-scientist-3-6",
    companyName: "Mu Sigma",
    companyId: 1,
    roleTitle: "Junior Decision Scientist / Data Analyst Trainee",
    location: "Bangalore (Whitefield)",
    experienceLevel: "0-1 years / Fresher",
    postedDate: "Today",
    tierCategory: "Boutique Analytics",
    requiredSkills: ["SQL", "Excel", "Data Interpretation", "Power BI", "Basic Statistics"],
    salaryRange: "₹4.5 - ₹6.0 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=Mu+Sigma+careers+Junior+Decision+Scientist+Bangalore",
    jobDescriptionSummary:
      "Solve complex business challenges using structured SQL data queries and exploratory data analysis. Comprehensive decision science training program provided with rapid client deployment.",
    fresherHiringType: "Early Career Drive",
    isUrgent: true,
  },
  {
    id: "job-celebal-powerbi-trainee-3-6",
    companyName: "Celebal Technologies",
    companyId: 5,
    roleTitle: "Power BI & Azure Data Associate Trainee",
    location: "Hyderabad (HITEC City)",
    experienceLevel: "Fresher / 0-1 years (2026)",
    postedDate: "Today",
    tierCategory: "IT Services & Digital Engineering",
    requiredSkills: ["Power BI", "DAX", "SQL", "Azure Basics", "Excel"],
    salaryRange: "₹4.0 - ₹6.5 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=Celebal+Technologies+careers+Power+BI+Associate+Hyderabad",
    jobDescriptionSummary:
      "Design interactive customer analytics dashboards in Power BI. Connect to Azure SQL data sources, create STAR schema models, and optimize DAX measures for executive reporting.",
    fresherHiringType: "Direct Entry-Level",
    isUrgent: true,
  },
  {
    id: "job-latentview-analyst-trainee-3-6",
    companyName: "LatentView Analytics",
    companyId: 2,
    roleTitle: "Analyst Trainee (Digital Analytics & BI)",
    location: "Bangalore (Hybrid)",
    experienceLevel: "0-1 years / Fresher",
    postedDate: "1 day ago",
    tierCategory: "Boutique Analytics",
    requiredSkills: ["SQL", "Power BI", "Python", "Tableau", "Excel"],
    salaryRange: "₹4.5 - ₹6.5 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=LatentView+Analytics+careers+Analyst+Trainee+Bangalore",
    jobDescriptionSummary:
      "Deliver digital analytics and BI solutions for Global 500 enterprises. Analyze marketing attribution data, build automated SQL pipelines, and present visual insights.",
    fresherHiringType: "Off-Campus Drive",
    isUrgent: false,
  },
  {
    id: "job-cognizant-genc-data-3-6",
    companyName: "Cognizant",
    companyId: 12,
    roleTitle: "Programmer Analyst Trainee (GenC Elevate Data)",
    location: "Hyderabad & Bangalore",
    experienceLevel: "0-1 years / 2026 Batch",
    postedDate: "Today",
    tierCategory: "IT Services & Digital Engineering",
    requiredSkills: ["SQL", "Power BI", "Data Modeling", "Excel", "Python"],
    salaryRange: "₹4.0 - ₹6.75 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=Cognizant+careers+GenC+Elevate+Data+Analyst+Hyderabad",
    jobDescriptionSummary:
      "GenC Elevate Data track for 2026 graduates. Fast-track onboarding into Analytics & BI practices with intensive client project onboarding in Hyderabad.",
    fresherHiringType: "National Off-Campus Drive",
    isUrgent: true,
  },
  {
    id: "job-tcs-digital-data-3-6",
    companyName: "TCS (Tata Consultancy Services)",
    companyId: 11,
    roleTitle: "Data Analyst Trainee (TCS Digital Track)",
    location: "Hyderabad (Deccan Park / Adibatla)",
    experienceLevel: "0-1 years / 2026 Batch",
    postedDate: "2 days ago",
    tierCategory: "IT Services & Digital Engineering",
    requiredSkills: ["SQL", "Power BI", "Python", "Excel", "DBMS"],
    salaryRange: "₹3.6 - ₹7.0 LPA",
    atsPlatform: "TCS iON",
    applyUrl: "https://www.google.com/search?q=TCS+careers+Digital+Data+Analyst+Hyderabad+NQT",
    jobDescriptionSummary:
      "Recruitment through TCS National Qualifier Test (NQT). Candidates clearing Digital cutoff receive ₹7 LPA Data Analyst / Engineer positions in Hyderabad.",
    fresherHiringType: "TCS NQT National Drive",
    isUrgent: false,
  },
  {
    id: "job-darwinbox-bi-analyst-3-6",
    companyName: "Darwinbox",
    companyId: 36,
    roleTitle: "Associate BI & Product Data Analyst",
    location: "Hyderabad (Financial District)",
    experienceLevel: "0-1 years / Fresher",
    postedDate: "Today",
    tierCategory: "Indian Unicorn & High-Growth SaaS",
    requiredSkills: ["SQL", "Power BI", "Excel", "Data Modeling", "APIs"],
    salaryRange: "₹4.5 - ₹6.5 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=Darwinbox+careers+Associate+BI+Analyst+Hyderabad",
    jobDescriptionSummary:
      "Join Hyderabad HR tech unicorn. Build operational product analytics, track customer adoption funnels, and build SQL data validation scripts for rapid release cycles.",
    fresherHiringType: "Direct FTE",
    isUrgent: true,
  },
  {
    id: "job-genpact-analytics-3-6",
    companyName: "Genpact Analytics",
    companyId: 31,
    roleTitle: "Business Analyst Trainee (Operations & BI)",
    location: "Hyderabad (Uppal / Pocharam)",
    experienceLevel: "Fresher / 0-1 years",
    postedDate: "Today",
    tierCategory: "IT Services & Digital Engineering",
    requiredSkills: ["SQL", "Advanced Excel (Pivots/XLOOKUP)", "Power BI", "Reporting"],
    salaryRange: "₹3.5 - ₹5.5 LPA",
    atsPlatform: "Direct Walk-in",
    applyUrl: "https://www.google.com/search?q=Genpact+Hyderabad+careers+Business+Analyst+Trainee+walkin",
    jobDescriptionSummary:
      "Immediate walk-in and virtual drives for Data Analysts. Fast same-day or 3-day offer letters for candidates proficient in Excel pivots, SQL queries, and basic Power BI.",
    fresherHiringType: "Walk-in / Immediate Offer",
    isUrgent: true,
  },

  // --- 6-10 LPA GROWTH-TRACK OPENINGS (2ND CHOICE) ---
  {
    id: "job-novartis-da-6-10",
    companyName: "Novartis Healthcare",
    companyId: 51,
    roleTitle: "Associate Data & BI Analyst (Commercial Analytics)",
    location: "Hyderabad (HITEC City)",
    experienceLevel: "0-1 years / Fresher (2026 Batch Eligible)",
    postedDate: "Today",
    tierCategory: "Global Capability Center (GCC)",
    requiredSkills: ["SQL", "Power BI", "DAX", "Excel", "Data Modeling"],
    salaryRange: "₹7.5 - ₹9.5 LPA",
    atsPlatform: "Workday",
    applyUrl: "https://www.google.com/search?q=Novartis+Hyderabad+careers+Associate+Data+Analyst+Workday",
    jobDescriptionSummary:
      "Build executive KPI dashboards in Power BI for commercial pharma sales operations. Execute SQL queries on Snowflake data warehouse, perform Cohort analysis, and automate weekly ETL report refreshes.",
    fresherHiringType: "Early Career FTE",
    isUrgent: true,
  },
  {
    id: "job-optum-da-6-10",
    companyName: "Optum (UnitedHealth Group)",
    companyId: 52,
    roleTitle: "Associate Healthcare Data Analyst",
    location: "Hyderabad (HITEC City)",
    experienceLevel: "0-1 years / 2026 Fresher",
    postedDate: "Today",
    tierCategory: "Global Capability Center (GCC)",
    requiredSkills: ["SQL", "Power BI", "Python", "Healthcare Data Feeds", "Excel"],
    salaryRange: "₹6.5 - ₹8.5 LPA",
    atsPlatform: "Workday",
    applyUrl: "https://www.google.com/search?q=Optum+Hyderabad+careers+Associate+Data+Analyst+Workday",
    jobDescriptionSummary:
      "Analyze claims data, patient care metrics, and insurance workflows. Build automated SQL data validation checks and maintain interactive operational Power BI dashboards.",
    fresherHiringType: "Campus / Off-Campus Drive",
    isUrgent: true,
  },
  {
    id: "job-broadridge-ba-6-10",
    companyName: "Broadridge Financial Solutions",
    companyId: 53,
    roleTitle: "Associate Business Analyst (SQL & BI Track)",
    location: "Hyderabad (Financial District)",
    experienceLevel: "0-1 years / Fresher",
    postedDate: "1 day ago",
    tierCategory: "Global Capability Center (GCC)",
    requiredSkills: ["SQL Server (T-SQL)", "Power BI", "Excel", "Data Reconciliation"],
    salaryRange: "₹6.0 - ₹8.5 LPA",
    atsPlatform: "Workday",
    applyUrl: "https://www.google.com/search?q=Broadridge+Hyderabad+careers+Associate+Business+Analyst",
    jobDescriptionSummary:
      "Execute complex T-SQL queries to reconcile financial transactions and generate investor communication metrics. Great work environment with high job stability.",
    fresherHiringType: "Direct Entry-Level",
    isUrgent: false,
  },
  {
    id: "job-factset-financial-da-6-10",
    companyName: "FactSet Research Systems",
    companyId: 54,
    roleTitle: "Junior Financial Data Analyst",
    location: "Hyderabad (Gachibowli)",
    experienceLevel: "Fresher / 0-1 years (2026)",
    postedDate: "Today",
    tierCategory: "Global Capability Center (GCC)",
    requiredSkills: ["SQL", "Financial Data Modeling", "Excel", "Power BI", "Python Basics"],
    salaryRange: "₹6.5 - ₹8.5 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=FactSet+Hyderabad+careers+Junior+Financial+Data+Analyst",
    jobDescriptionSummary:
      "Transform global financial market datasets, validate equity/fixed-income feeds, and build internal monitoring tools for institutional asset managers.",
    fresherHiringType: "Early Career FTE",
    isUrgent: true,
  },
  {
    id: "job-tiger-analytics-6-10",
    companyName: "Tiger Analytics",
    companyId: 66,
    roleTitle: "Junior Analyst - Advanced Analytics & BI",
    location: "Hyderabad, Chennai & Bangalore",
    experienceLevel: "Fresher / 0-1 years (2026 Batch)",
    postedDate: "2 days ago",
    tierCategory: "Boutique Analytics",
    requiredSkills: ["SQL", "Power BI / Tableau", "Python", "Exploratory Data Analysis"],
    salaryRange: "₹6.5 - ₹8.5 LPA",
    atsPlatform: "Direct Career",
    applyUrl: "https://www.google.com/search?q=Tiger+Analytics+careers+Junior+Analyst+Hyderabad+Chennai",
    jobDescriptionSummary:
      "Develop interactive BI solutions and automated KPI reporting decks for Fortune 500 retail and CPG enterprises. High exposure to end-to-end data lifecycle.",
    fresherHiringType: "Early Career FTE",
    isUrgent: false,
  },
  {
    id: "job-zepto-growth-analyst-6-10",
    companyName: "Zepto",
    companyId: 71,
    roleTitle: "Associate Growth & Operations Analyst",
    location: "Bangalore (HSR Layout)",
    experienceLevel: "0-1 years / Fresher",
    postedDate: "Today",
    tierCategory: "Indian Unicorn & High-Growth SaaS",
    requiredSkills: ["SQL", "Power BI / Metabase", "Excel", "Data Wrangling", "Fast RCA"],
    salaryRange: "₹7.0 - ₹9.5 LPA",
    atsPlatform: "Lever",
    applyUrl: "https://www.google.com/search?q=Zepto+careers+Associate+Growth+Analyst+Bangalore",
    jobDescriptionSummary:
      "Analyze rider dispatch efficiency, dark store fulfillment speed, and customer cart abandonment. High-paced environment with rapid daily iterations.",
    fresherHiringType: "Direct Entry-Level",
    isUrgent: true,
  },
  {
    id: "job-spglobal-data-analyst-6-10",
    companyName: "S&P Global",
    companyId: 55,
    roleTitle: "Associate Data Analyst - Market Intelligence",
    location: "Hyderabad (HITEC City)",
    experienceLevel: "0-1 years / 2026 Fresher",
    postedDate: "1 day ago",
    tierCategory: "Global Capability Center (GCC)",
    requiredSkills: ["SQL", "Power BI", "Excel", "Data Validation", "Python Basics"],
    salaryRange: "₹7.0 - ₹9.0 LPA",
    atsPlatform: "Workday",
    applyUrl: "https://www.google.com/search?q=SP+Global+Hyderabad+careers+Associate+Data+Analyst+Workday",
    jobDescriptionSummary:
      "Analyze global corporate intelligence feeds, maintain data quality pipelines, and develop automated Power BI KPI reports for global financial institutions.",
    fresherHiringType: "Early Career FTE",
    isUrgent: false,
  }
];

export const initialCuratedDailyJobs: DailyJobPosting[] = curatedDailyJobPostings;

export const DAILY_JOBS_STORAGE_KEY = "da_portal_daily_jobs_v2";

export function getStoredDailyJobs(): DailyJobPosting[] {
  try {
    const raw = localStorage.getItem(DAILY_JOBS_STORAGE_KEY);
    if (!raw) return initialCuratedDailyJobs;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load daily jobs from storage", e);
  }
  return initialCuratedDailyJobs;
}

export function saveStoredDailyJobs(jobs: DailyJobPosting[]): void {
  try {
    localStorage.setItem(DAILY_JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (e) {
    console.error("Failed to save daily jobs to storage", e);
  }
}

export interface DorkOptions {
  roleKeywords?: string;
  targetCities?: string[];
  skills?: string[];
  batchYear?: string;
  atsFilter?: string;
  companyName?: string;
}

export function generateCustomGoogleDork(
  optionsOrPlatform: string | DorkOptions,
  role?: string,
  location?: string,
  targetCompany?: string
): string {
  if (typeof optionsOrPlatform === "object") {
    const opts = optionsOrPlatform;
    const roleTerm = opts.roleKeywords
      ? `("${opts.roleKeywords}" OR "Data Analyst" OR "BI Analyst")`
      : `("Data Analyst" OR "BI Analyst" OR "Power BI")`;
    const citiesTerm =
      opts.targetCities && opts.targetCities.length > 0
        ? `(${opts.targetCities.map((c) => `"${c}"`).join(" OR ")})`
        : `("Hyderabad" OR "Bangalore" OR "Pune")`;
    const expTerm = `("fresher" OR "entry level" OR "0-1 years" OR "${
      opts.batchYear || "2026"
    }" OR "junior" OR "associate" OR "trainee")`;

    let siteTerm = "";
    if (opts.atsFilter === "workday") siteTerm = "site:myworkdayjobs.com";
    else if (opts.atsFilter === "greenhouse") siteTerm = "site:boards.greenhouse.io";
    else if (opts.atsFilter === "lever") siteTerm = "site:jobs.lever.co";
    else if (opts.atsFilter === "phenom") siteTerm = "site:careers.*";

    const parts = [siteTerm, roleTerm, expTerm, citiesTerm].filter(Boolean);
    return `https://www.google.com/search?q=${encodeURIComponent(parts.join(" "))}`;
  }

  const atsPlatform = optionsOrPlatform;
  const roleTerms = role
    ? `("${role}" OR "Data Analyst" OR "BI Analyst" OR "Power BI")`
    : `("Data Analyst" OR "BI Analyst" OR "Analytics")`;

  const expTerms = `("fresher" OR "entry level" OR "0-1 years" OR "2026" OR "junior" OR "associate" OR "trainee")`;
  const locTerm = location && location !== "All" ? `"${location}"` : `("Hyderabad" OR "Bangalore" OR "Pune")`;
  const compTerm = targetCompany ? `"${targetCompany}"` : "";

  let siteTerm = "";
  if (atsPlatform === "Workday") siteTerm = "site:myworkdayjobs.com";
  else if (atsPlatform === "Greenhouse") siteTerm = "site:boards.greenhouse.io";
  else if (atsPlatform === "Lever") siteTerm = "site:jobs.lever.co";
  else if (atsPlatform === "Phenom") siteTerm = "site:careers.*";
  else if (atsPlatform === "LinkedIn Post") siteTerm = 'site:linkedin.com/posts ("hiring" OR "looking for")';
  else siteTerm = "";

  const queryParts = [siteTerm, roleTerms, compTerm, expTerms, locTerm].filter(Boolean);
  const fullQuery = queryParts.join(" ");

  return `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`;
}
