export interface CuratedResource {
  id: string;
  category: "SQL Practice" | "Power BI & DAX" | "Excel Mastery" | "Python & Pandas" | "Product & Business Analytics" | "Mock Tests & Case Studies";
  title: string;
  provider: string;
  url: string;
  badge: "Free" | "Freemium" | "Interactive" | "Official Docs" | "YouTube Channel";
  description: string;
  whyItsBest: string;
  actionTitle: string;
}

export const curatedResourcesList: CuratedResource[] = [
  // SQL
  {
    id: "res-sql-1",
    category: "SQL Practice",
    title: "LeetCode Top SQL 50 Study Plan",
    provider: "LeetCode",
    url: "https://leetcode.com/studyplan/top-sql-50/",
    badge: "Interactive",
    description: "50 curated SQL problems covering joins, basic aggregate functions, advanced select, subqueries, and window functions.",
    whyItsBest: "The standard benchmark for tech unicorn (Swiggy, Zepto, Razorpay) online assessments.",
    actionTitle: "Practice LeetCode SQL 50",
  },
  {
    id: "res-sql-2",
    category: "SQL Practice",
    title: "DataLemur SQL Interview Questions",
    provider: "DataLemur (Nick Singh)",
    url: "https://datalemur.com/questions",
    badge: "Free",
    description: "Over 80+ real SQL interview questions asked by Amazon, Google, Uber, and top startups with instant query execution in the browser.",
    whyItsBest: "Realistic business schemas with detailed hints, explanations, and edge-case test suites.",
    actionTitle: "Solve DataLemur Questions",
  },
  {
    id: "res-sql-3",
    category: "SQL Practice",
    title: "SQLBolt Interactive Tutorial",
    provider: "SQLBolt",
    url: "https://sqlbolt.com/",
    badge: "Interactive",
    description: "Interactive browser-based lessons on SQL syntax, multi-table queries, constraints, and schema operations.",
    whyItsBest: "Perfect for rapid revision of SQL basics and query structure before Round 1 assessments.",
    actionTitle: "Start SQLBolt Practice",
  },
  {
    id: "res-sql-4",
    category: "SQL Practice",
    title: "StrataScratch SQL & Data Science Interview Questions",
    provider: "StrataScratch",
    url: "https://platform.stratascratch.com/coding",
    badge: "Freemium",
    description: "500+ real interview coding questions from top tech and analytics companies in PostgreSQL and MySQL.",
    whyItsBest: "Allows switching between PostgreSQL, MySQL, and Python Pandas on the exact same problem statement.",
    actionTitle: "Explore StrataScratch",
  },

  // Power BI & DAX
  {
    id: "res-pbi-1",
    category: "Power BI & DAX",
    title: "DAX.guide & SQLBI Master Reference",
    provider: "SQLBI (Marco Russo & Alberto Ferrari)",
    url: "https://dax.guide/",
    badge: "Official Docs",
    description: "The definitive encyclopedia of every single DAX function, complete with VertiPaq internal execution behavior and syntax compatibility.",
    whyItsBest: "Written by the world authority on DAX; explains CALCULATE filter context transitions with unmatched precision.",
    actionTitle: "Search DAX.guide",
  },
  {
    id: "res-pbi-2",
    category: "Power BI & DAX",
    title: "Guy in a Cube (YouTube)",
    provider: "Adam Saxton & Patrick LeBlanc (Microsoft)",
    url: "https://www.youtube.com/@GuyInACube",
    badge: "YouTube Channel",
    description: "Real-world Power BI tips, performance optimization, model tuning, and DAX modeling best practices.",
    whyItsBest: "Official Microsoft MVPs sharing practical dashboard architecture and troubleshooting techniques.",
    actionTitle: "Watch Guy in a Cube",
  },
  {
    id: "res-pbi-3",
    category: "Power BI & DAX",
    title: "Microsoft PL-300 Power BI Data Analyst Path",
    provider: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/",
    badge: "Official Docs",
    description: "Complete official curriculum covering data preparation (Power Query), data modeling (Star Schema), DAX, and report deployment.",
    whyItsBest: "Aligns 100% with enterprise Power BI standards and certification requirements.",
    actionTitle: "Read Microsoft PL-300 Path",
  },

  // Excel Mastery
  {
    id: "res-excel-1",
    category: "Excel Mastery",
    title: "Chandoo.org Advanced Excel & Dashboards",
    provider: "Chandoo",
    url: "https://chandoo.org/wp/advanced-excel-skills/",
    badge: "Free",
    description: "Deep tutorials on Pivot Tables, SUMIFS, dynamic charts, Power Query automation, and business modeling.",
    whyItsBest: "Focused on real corporate reporting scenarios, dashboard ergonomics, and formula speed.",
    actionTitle: "Visit Chandoo.org",
  },
  {
    id: "res-excel-2",
    category: "Excel Mastery",
    title: "Leila Gharani Excel Mastery Channel",
    provider: "Leila Gharani (Microsoft MVP)",
    url: "https://www.youtube.com/@LeilaGharani",
    badge: "YouTube Channel",
    description: "Practical tutorials on XLOOKUP, dynamic arrays (FILTER, UNIQUE), Power Query transformations, and clean executive reporting.",
    whyItsBest: "Crystal clear explanations of modern Excel 365 features that impress interviewers.",
    actionTitle: "Watch Leila Gharani",
  },

  // Python & Pandas
  {
    id: "res-py-1",
    category: "Python & Pandas",
    title: "Keith Galli Pandas Real-World Data Analysis (YouTube)",
    provider: "Keith Galli",
    url: "https://www.youtube.com/watch?v=vmEHCJofslg",
    badge: "YouTube Channel",
    description: "Comprehensive hands-on walkthrough analyzing real 12-month sales data using Pandas, Matplotlib, and NumPy.",
    whyItsBest: "Simulates actual Data Analyst exploratory data analysis (EDA) and business question answering.",
    actionTitle: "Watch Keith Galli Pandas",
  },
  {
    id: "res-py-2",
    category: "Python & Pandas",
    title: "100 Pandas Exercises & Solutions",
    provider: "GitHub / Community",
    url: "https://github.com/ajcr/100-pandas-puzzles",
    badge: "Interactive",
    description: "Short puzzles covering DataFrame creation, filtering, multi-index, grouping, string operations, and time series.",
    whyItsBest: "Rapid syntax drills to build automatic muscle memory for live technical screening tests.",
    actionTitle: "Solve 100 Pandas Puzzles",
  },

  // Product & Business
  {
    id: "res-biz-1",
    category: "Product & Business Analytics",
    title: "Lenny's Newsletter: Business & Product Metrics Guide",
    provider: "Lenny Rachitsky",
    url: "https://www.lennysnewsletter.com/",
    badge: "Free",
    description: "Comprehensive guides on conversion funnels, retention cohorts, North Star metrics, CAC/LTV, and A/B test methodologies.",
    whyItsBest: "Used by top tech product managers and analytics leads across Silicon Valley and Indian tech hubs.",
    actionTitle: "Read Lenny's Metrics Guide",
  },
  {
    id: "res-biz-2",
    category: "Product & Business Analytics",
    title: "Mode Analytics SQL & Business Tutorial",
    provider: "Mode Analytics",
    url: "https://mode.com/sql-tutorial/",
    badge: "Free",
    description: "Combines technical SQL querying with real business metrics (Churn, MoM Growth, Basket Analysis).",
    whyItsBest: "Bridges the gap between raw code and commercial storytelling.",
    actionTitle: "Learn on Mode SQL Tutorial",
  },
];
