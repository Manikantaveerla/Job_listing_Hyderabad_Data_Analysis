import { UserProfile } from "../types";

export const candidateProfile: UserProfile = {
  fullName: "Manikanta Veerla & Vijulu",
  title: "Data Analyst • BI & Data Solutions Engineer",
  subTitle: "SQL / T-SQL • Power BI & DAX • Python (Pandas, NumPy) • Advanced Excel • ETL Pipelines • AWS & Snowflake",
  batch: "2026 Batch Graduate",
  email: "manikantaveerla2@gmail.com",
  phone: "+91-9573357376",
  location: "Hyderabad, India (Open to Relocate)",
  openToRelocate: true,
  linkedinUrl: "https://linkedin.com/in/manikanta-veerla",
  githubUrl: "https://github.com/Manikantaveerla",
  portfolioUrl: "https://mv1614-portfolio.vercel.app",
  summary:
    "Results-driven Computer Science graduate (2026) specializing in Data Analytics, Database Engineering, BI Reporting, and Automated ETL Pipelines. Hands-on expertise analyzing complex datasets, architecting normalized relational schemas, and developing interactive Power BI & DAX dashboards that transform raw enterprise data into actionable business strategy. Proven record across 2 professional data analyst internships and end-to-end data stack projects (SQL, Python, Power BI, Excel, Snowflake, dbt, AWS).",
  skills: {
    core: [
      "Data Analysis",
      "Data Cleaning & Wrangling",
      "ETL Pipelines",
      "Statistical Analysis",
      "Data Visualization",
      "Report Generation",
      "Data Quality & Integrity",
      "Exploratory Data Analysis (EDA)",
    ],
    databases: [
      "SQL",
      "MySQL",
      "Microsoft SQL Server (T-SQL)",
      "Database Normalization (3NF)",
      "Stored Procedures",
      "Window Functions",
      "Snowflake (Intermediate)",
    ],
    bi: [
      "Power BI (DAX Formulas, Data Modeling, Interactive Dashboards, Power Query ETL)",
      "Tableau (Interactive Visualizations, Calculated Fields)",
      "Microsoft Excel (Advanced – PivotTables, VLOOKUP, XLOOKUP, Data Validation)",
    ],
    programming: [
      "Python (Pandas, NumPy, Matplotlib, Seaborn)",
      "dbt (Intermediate)",
      "AWS (S3, Glue, Athena – Intermediate)",
    ],
    certifications: [
      "Certified System Administrator (CSA) – ServiceNow (Cert ID: 27288495)",
      "Professional Certificate in SQL & SQL for Data Analysis (Udemy)",
      "Power BI DAX Mastery: Advanced Formulas & Data Analysis (Udemy)",
      "Advanced Excel Course with Shortcuts & Tips (Udemy)",
      "Complete Python Course (Aajhub & Sapienz Recruit - ID: ASRAYKFR)",
      "Git & GitHub Bootcamp (LetsUpgrade - Cert No: LUEGGMAR1251910)",
    ],
  },
  internships: [
    {
      role: "Data Analyst Intern",
      company: "Bold Analytics – Analytics Consulting",
      period: "Mar 2026 – May 2026",
      location: "Remote",
      achievements: [
        "Selected through competitive technical assessment for a 2-month Data Analyst role in a professional remote analytics environment.",
        "Executed end-to-end data analysis workflows on multi-source structured business datasets using SQL, Python, and Excel to extract performance trends and present actionable data-driven insights to leadership.",
        "Engineered advanced Excel data models using PivotTables, VLOOKUP, and Power Query to cleanse, transform, and validate raw records, reducing data anomaly rates by 20%.",
        "Built interactive Power BI summary reports tracking core performance metrics, enabling executive teams to evaluate growth indicators and optimize decision-making efficiency.",
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Wisen IT Solutions Pvt. Ltd. – IT & Data Services",
      period: "Dec 2025 – Apr 2026",
      location: "Guntur, AP (ID: WISEN-2026-DA04346)",
      achievements: [
        "4-month industrial analytics internship applying production SQL database querying and BI reporting routines in an IT client environment.",
        "Wrote optimized SQL / T-SQL queries incorporating subqueries, joins, and aggregations to transform structured enterprise datasets, supporting routine and ad-hoc client analytics reporting.",
        "Constructed automated data preparation pipelines connecting relational databases to Power BI dashboards, reducing manual reporting turnaround time by 40%.",
        "Analyzed historical dataset patterns to identify operational bottlenecks, delivering structured metric presentations that assisted management in data-backed strategy planning.",
      ],
    },
  ],
  projects: [
    {
      title: "Interactive Sales Dashboard – Blinkit Analytics",
      tools: ["Power BI", "DAX", "MySQL", "Power Query", "Excel"],
      repoUrl: "https://github.com/Manikantaveerla/blinkit-sales-dashboard",
      description:
        "Designed and deployed an interactive Power BI sales analytics dashboard featuring custom DAX measures and calculated columns to evaluate sales revenue, inventory turnover, and fulfillment performance across 8-week operations.",
      highlights: [
        "Built automated ETL pipelines connecting MySQL database tables to Power BI via Power Query, enabling real-time data refresh and eliminating manual report compilation.",
        "Implemented custom DAX calculated measures for YoY growth, average basket size, and fulfillment delivery velocity.",
      ],
    },
    {
      title: "Library Management System – Relational Database Architecture",
      tools: ["SQL Server", "T-SQL", "MySQL", "Stored Procedures", "Indexing"],
      repoUrl: "https://github.com/Manikantaveerla/library-management-system",
      description:
        "Architected a 3NF normalized relational database schema in Microsoft SQL Server and MySQL using primary/foreign key constraints, indexing, stored procedures, and complex multi-table joins.",
      highlights: [
        "Formulated optimized T-SQL query routines, window functions, and aggregated views to generate automated reports tracking member borrowing habits, overdue penalties, and inventory utilization rates.",
        "Optimized query execution time by 35% through proper indexation and relational schema normalization.",
      ],
    },
    {
      title: "HR Analytics Dashboard – Employee Attrition & Retention Analysis",
      tools: ["Microsoft SQL Server", "Power BI", "DAX", "Excel", "Data Modeling"],
      repoUrl: "https://github.com/Manikantaveerla/hr-analytics-attrition",
      description:
        "Queried and analyzed a normalized SQL database of 1,400+ employee records using T-SQL joins, subqueries, and window functions to isolate attrition drivers across departments and salary bands.",
      highlights: [
        "Developed an ETL pipeline from SQL Server to Power BI and created a DAX dashboard tracking attrition rates, tenure, and compensation KPIs.",
        "Validated data integrity in Excel with PivotTables and VLOOKUP, uncovering high correlation between overtime hours and department attrition.",
      ],
    },
  ],
  certifications: [
    {
      name: "Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      date: "Issued Jul 2025",
      certId: "27288495",
    },
    {
      name: "Professional Certificate in SQL & SQL for Data Analysis",
      issuer: "Udemy",
      date: "Issued Jul 2026",
    },
    {
      name: "Power BI DAX Mastery: Advanced Formulas & Data Analysis",
      issuer: "Udemy",
      date: "Issued Jul 2026",
    },
    {
      name: "Advanced Excel Course with Shortcuts & Tips",
      issuer: "Udemy",
      date: "Issued Jul 2026",
    },
    {
      name: "Complete Python Course",
      issuer: "Aajhub & Sapienz Recruit",
      date: "Issued Jun 2025",
      certId: "ASRAYKFR",
    },
    {
      name: "Git & GitHub Bootcamp",
      issuer: "LetsUpgrade",
      date: "Issued Mar 2025",
      certId: "LUEGGMAR1251910",
    },
  ],
};
