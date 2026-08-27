export interface InterviewRound {
  id: string;
  roundNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  weightage: string;
  focusArea: string;
  description: string;
  format: string[];
  keyTopics: string[];
  sampleQuestions: string[];
  clearingStrategy: string[];
  commonMistakes: string[];
  evaluatorExpectations: string[];
}

export interface CompanyArchetype {
  type: string;
  examples: string[];
  processSummary: string;
  fresherHiringBars: string[];
  salaryRangeFresher: string;
  recommendedFocus: string;
}

export const companyArchetypes: CompanyArchetype[] = [
  {
    type: "Boutique Analytics Consultancies & Pure-Play AI Firms",
    examples: ["Fractal Analytics", "Tiger Analytics", "LatentView", "Tredence", "The Math Company", "Merilytics", "Gramener", "Mu Sigma", "Course5 Intelligence"],
    processSummary: "Online SQL/Aptitude Test -> Take-Home Case Study or Live Problem Solving -> Technical Deep Dive (SQL + DAX/Python) -> Director/Partner Techno-Commercial Round.",
    fresherHiringBars: [
      "Heavy emphasis on writing clean, optimized SQL (CTEs, Window Functions, 3NF Normalization) on the spot without Google.",
      "Ability to translate vague business problems (e.g. 'Retail sales dropped 12% in Q3') into quantitative metrics and hypotheses.",
      "Confidence in presenting Power BI / Excel dashboards with clear executive narratives and actionable recommendations.",
    ],
    salaryRangeFresher: "₹6.5 LPA - ₹12 LPA",
    recommendedFocus: "Practice live whiteboard SQL, case study decompositions, and DAX calculated metrics with business storytelling.",
  },
  {
    type: "High-Growth Startups & Quick Commerce / FinTech Unicorns",
    examples: ["Swiggy", "Zepto", "Blinkit", "Razorpay", "PhonePe", "CRED", "Groww", "Meesho", "Urban Company", "Juspay"],
    processSummary: "Resume Screen -> Online Coding (HackerRank SQL/Python) -> Live Live-Coding Session (Medium/Hard SQL) -> Product Sense & Metrics Interview -> Engineering/Product Manager Round.",
    fresherHiringBars: [
      "Speed and precision in writing complex joins, cohorts, cumulative metrics, and churn calculations.",
      "High product sense: Understanding conversion funnels, CAC, LTV, AOV, drop-off rates, and A/B test statistical significance.",
      "Hands-on Python (Pandas/NumPy) for automated ETL and exploratory data analysis.",
    ],
    salaryRangeFresher: "₹8 LPA - ₹16 LPA",
    recommendedFocus: "Master LeetCode SQL Medium problems, retention cohorts, rolling window metrics, and product root-cause analysis.",
  },
  {
    type: "Global Capability Centers (GCCs) & Investment Banking Captives",
    examples: ["Goldman Sachs", "Morgan Stanley", "JP Morgan Chase", "Invesco", "Wells Fargo", "D.E. Shaw", "Synchrony", "HSBC", "State Street"],
    processSummary: "Aptitude + SQL Assessment -> Technical Round 1 (Relational DB Design, ACID, SQL, Excel Modeling) -> Technical Round 2 (Math/Statistics, Python, Data Quality) -> Senior VP / Manager Fitment.",
    fresherHiringBars: [
      "Rigorous database fundamentals: 1NF-3NF, Clustered/Non-clustered indexes, execution plans, transaction isolation.",
      "Statistical foundations: Hypothesis testing, distributions, regression, outlier detection, confidence intervals.",
      "High attention to data governance, accuracy, edge-case handling (NULL values, currency rounding, timestamps).",
    ],
    salaryRangeFresher: "₹8.5 LPA - ₹15 LPA",
    recommendedFocus: "Study relational DB architecture, indexing internals, statistical hypothesis testing, and advanced financial Excel modeling.",
  },
  {
    type: "Tier-1 IT Services & Enterprise Tech Titans",
    examples: ["TCS (Digital/Prime)", "Infosys (Specialist Programmer)", "Wipro", "Cognizant", "Capgemini", "Accenture", "LTIMindtree", "Tech Mahindra"],
    processSummary: "National Qualifier Test (NQT / AMCAT / Cocubes: Quant + Logical + Verbal + SQL/Coding) -> Technical Interview (Core SQL, DBMS, Excel, Python Basics, Final Year Project) -> HR Interview.",
    fresherHiringBars: [
      "High cutoff in aptitude tests (80th+ percentile in Quantitative and Logical Reasoning).",
      "Clear explanation of final year projects, SQL joins, aggregate queries, normalization, and basic Power BI/Excel functions.",
      "Polite, articulate communication and flexibility regarding technology stack and project location.",
    ],
    salaryRangeFresher: "₹4.5 LPA - ₹9 LPA",
    recommendedFocus: "Speed aptitude practice, crisp verbal definitions of DBMS/SQL concepts, and confident project walk-throughs.",
  },
];

export const interviewRoundsGuide: InterviewRound[] = [
  {
    id: "round-1",
    roundNumber: 1,
    title: "Resume Screening & Online Assessment (OA)",
    subtitle: "Aptitude + Core SQL & Python Coding Test",
    duration: "60 - 90 Minutes",
    weightage: "Elimination Gate (Top 10-15% Selected)",
    focusArea: "Speed, Accuracy, Syntax Mastery, Quantitative Logic",
    description: "The initial filter designed to screen hundreds of fresher applicants. Platforms used include HackerRank, HackerEarth, Mercer Mettl, SHL, and CoCubes.",
    format: [
      "Section A: Quantitative Aptitude & Data Interpretation (15-20 MCQs on Ratios, Percentages, Profit/Loss, Time & Work, Bar/Pie Chart analysis).",
      "Section B: Logical & Verbal Reasoning (10-15 MCQs on Series, Syllogisms, Critical Reasoning).",
      "Section C: Core SQL Assessment (2-3 hands-on coding questions + 10 MCQs on joins, group by, indexes, subqueries).",
      "Section D: Python / Data Analysis MCQs (NumPy arrays, Pandas slicing, regex, syntax debugging).",
    ],
    keyTopics: [
      "SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)",
      "Multi-table Inner/Left Joins with GROUP BY and HAVING filters",
      "Handling NULLs in aggregations (COUNT(*) vs COUNT(column))",
      "Data Interpretation: Speed calculation of growth rates, CAGR, and margins from tabular charts",
    ],
    sampleQuestions: [
      "Write a query to find the 2nd highest salary in each department without using subqueries.",
      "Calculate the running total of daily revenue for the past 30 days for each merchant.",
      "Find all users who placed an order on at least 3 consecutive days.",
    ],
    clearingStrategy: [
      "Test edge cases first: What happens if there are duplicate values, empty tables, or ties?",
      "For HackerRank/Mettl SQL: Always check hidden test cases for NULL column values and date formatting differences (YYYY-MM-DD vs DD-MM-YYYY).",
      "Time allocation: Spend max 1.5 mins per aptitude MCQ; reserve at least 35-40 mins for the 2-3 SQL coding problems.",
      "Write queries using modern CTEs (`WITH cte AS (...)`) for maximum readability and easier debugging.",
    ],
    commonMistakes: [
      "Using `WHERE` instead of `HAVING` after `GROUP BY` aggregations.",
      "Assuming table rows are ordered without an explicit `ORDER BY` clause in window functions.",
      "Getting stuck on a single difficult aptitude question and running out of time for the SQL section.",
    ],
    evaluatorExpectations: [
      "100% test case pass rate on SQL problems with optimal O(N) or indexed O(log N) performance.",
      "No syntax runtime errors on standard SQL dialects (PostgreSQL / MySQL / T-SQL).",
    ],
  },
  {
    id: "round-2",
    roundNumber: 2,
    title: "Technical Round 1: Live SQL & Analytical Coding",
    subtitle: "Screen-Sharing Live Problem Solving & Query Optimization",
    duration: "45 - 60 Minutes",
    weightage: "Primary Technical Filter (40% Weightage)",
    focusArea: "Live Coding, Thought Process, Query Efficiency, Database Schema",
    description: "Conducted by a Senior Data Analyst or Technical Lead. You will share your screen or write code inside an interactive pad (CoderPad, HackerRank Live, Google Docs).",
    format: [
      "5 mins: Introduction & quick technical background summary.",
      "25-30 mins: 3 Live SQL problems progressing from Warm-up -> Intermediate -> Complex Scenario.",
      "10-15 mins: Python / Pandas data cleaning snippet or Advanced Excel formula walkthrough.",
      "5 mins: Candidate questions to the interviewer.",
    ],
    keyTopics: [
      "Advanced Window Functions (ROWS BETWEEN, PARTITION BY, NTILE)",
      "Self Joins for hierarchical data (Employee -> Manager) and sequential events",
      "Date arithmetic (DATEDIFF, DATEADD, DATE_TRUNC, EXTRACT)",
      "Database Normalization (1NF, 2NF, 3NF) & Index types (Clustered vs Non-Clustered)",
      "Python Pandas: `.groupby()`, `.apply()`, `.merge()`, handling missing `.fillna()`",
    ],
    sampleQuestions: [
      "Given a table of `user_logins (user_id, login_date)`, find all users who logged in for 5 consecutive days.",
      "Write a query to calculate Month-over-Month (MoM) revenue growth % and flag months with negative growth.",
      "Explain the difference between `UNION` vs `UNION ALL` and how SQL engines handle memory deduplication.",
      "In Pandas, how would you find duplicate email addresses and keep only the latest registration record?",
    ],
    clearingStrategy: [
      "**Speak before typing:** Restate the problem, clarify edge cases (e.g. 'Can two transactions have the exact same timestamp? How should ties be ranked?').",
      "**Start with a clear approach:** Explain: 'I will create a CTE to rank the events partitioned by user, and then filter where rank = 1 in the outer query.'",
      "**Write clean, formatted SQL:** Use uppercase for keywords (`SELECT`, `FROM`, `WHERE`), proper indentation, and descriptive alias names.",
      "**Dry run with sample data:** Walk through the query step-by-step with 3 sample rows to prove it works before declaring you are done.",
    ],
    commonMistakes: [
      "Jumping into typing silently without explaining your logic.",
      "Panicking when an initial query produces wrong output instead of calmly inspecting intermediate CTE outputs.",
      "Not knowing the difference between `RANK()` vs `DENSE_RANK()` vs `ROW_NUMBER()`.",
    ],
    evaluatorExpectations: [
      "Structured problem breakdown and ability to receive hints without getting defensive.",
      "Understanding query performance: Why `UNION ALL` is faster than `UNION`, and how indexes prevent full table scans.",
    ],
  },
  {
    id: "round-3",
    roundNumber: 3,
    title: "Technical Round 2: BI, Power BI / Excel & Case Study",
    subtitle: "Dashboard Teardown, Data Modeling & Business Case Study",
    duration: "45 - 60 Minutes",
    weightage: "Business Acumen & Tool Mastery (30% Weightage)",
    focusArea: "Power BI DAX, Star Schema, Business Metrics Formulation, Data Storytelling",
    description: "Evaluates your ability to bridge raw data with business decision-making. Often involves reviewing a dashboard you built, presenting a take-home assignment, or solving a live business case.",
    format: [
      "15 mins: Deep-dive walkthrough of your featured Power BI dashboard (e.g., Blinkit Sales Dashboard / HR Attrition).",
      "15 mins: Live DAX & Data Modeling questions (Star schema, calculated measures vs columns, relationship ambiguity).",
      "15 mins: Live Business Problem (e.g., 'E-commerce cart abandonment rose by 8% last week—how do you analyze the root cause?').",
      "5 mins: Wrap-up & Q&A.",
    ],
    keyTopics: [
      "Star Schema vs Snowflake Schema (Fact tables, Dimension tables, surrogate keys)",
      "DAX Context: Filter Context vs Row Context vs Context Transition with `CALCULATE()`",
      "Time Intelligence DAX: `SAMEPERIODLASTYEAR`, `DATESYTD`, `DATEADD`",
      "Active vs Inactive relationships & `USERELATIONSHIP()` in DAX",
      "Excel: Nested `XLOOKUP`, `INDEX(MATCH)`, Pivot Tables with Calculated Fields, Power Query ETL",
      "Metric Decomposition: Funnel analysis, A/B test interpretation, Churn vs Retention",
    ],
    sampleQuestions: [
      "Explain the exact difference between a Calculated Column and a Measure in Power BI with respect to RAM consumption and refresh time.",
      "How did you model the date dimension in your Blinkit Sales Dashboard, and why is an explicit Date table required for Time Intelligence DAX?",
      "If Average Order Value (AOV) dropped while Total Revenue stayed flat, what happened to Order Volume?",
      "In Excel, how would you dynamically extract unique items from a list of 50,000 transactions without modifying the source data?",
    ],
    clearingStrategy: [
      "**Frame every metric around business impact:** Never just say 'I built a bar chart.' Say: 'I designed an interactive Pareto chart that revealed 80% of attrition was concentrated in 2 departments, allowing HR to target retention interventions.'",
      "**Defend your data model:** Be ready to explain why you chose a Star Schema with 1-to-Many single-direction relationships to avoid circular ambiguity.",
      "**Use the MECE framework (Mutually Exclusive, Collectively Exhaustive)** for business diagnostic questions: Break problems down into Demand-side vs Supply-side, Internal vs External factors.",
    ],
    commonMistakes: [
      "Creating bi-directional relationships in Power BI without understanding performance penalties.",
      "Using calculated columns for aggregations instead of dynamic measures.",
      "Failing to explain the business 'why' behind dashboard visualizations.",
    ],
    evaluatorExpectations: [
      "Mastery over DAX evaluation context and data modeling best practices.",
      "Intuitive understanding of business KPIs (MRR, Churn, AOV, Gross Margin, CSAT).",
    ],
  },
  {
    id: "round-4",
    roundNumber: 4,
    title: "Techno-Managerial & Project Defense Round",
    subtitle: "Hiring Manager Round: Internship Deep-Dive & Situational Scenarios",
    duration: "45 - 60 Minutes",
    weightage: "Cultural Fit & Engineering Rigor (20% Weightage)",
    focusArea: "Internship Achievements, STAR Method, Conflict Resolution, Problem Ownership",
    description: "Conducted by the Analytics Director, Engineering Manager, or Business Unit Head. They assess your actual ownership in your previous internships, passion for data, and team fit.",
    format: [
      "10 mins: Tell me about yourself + 2-minute elevator pitch highlighting your data analyst internships at Bold Analytics & Wisen IT.",
      "20 mins: Surgical dissection of your projects and internships (data volume, bottlenecks, trade-offs made).",
      "15 mins: Situational and behavioral questions (handling ambiguous data, dealing with tight deadlines, pushback from stakeholders).",
      "5 mins: Strategic questions from you to the manager.",
    ],
    keyTopics: [
      "STAR Method (Situation, Task, Action, Result) for all scenario answers",
      "Concrete metrics: Quantify everything (e.g. 'Reduced ETL latency by 40%', 'Cleaned 1,400+ employee records', 'Optimized query execution by 35%')",
      "Trade-offs: Why MySQL vs PostgreSQL? Why Power BI vs Tableau? Why 3NF schema vs flat wide table?",
      "ServiceNow CSA certification & workflow understanding",
    ],
    sampleQuestions: [
      "Walk me through a time during your Wisen IT or Bold Analytics internship when the source data was messy, incomplete, or corrupted. How did you resolve it?",
      "If a business stakeholder insists on seeing a pie chart with 25 slices, how do you persuade them to use a better visualization?",
      "Tell me about a complex SQL query you optimized. What was the bottleneck before, and what specific change made it faster?",
      "Why do you want to start your career at our company specifically over other analytics firms?",
    ],
    clearingStrategy: [
      "**Always anchor answers with metrics:** Use numbers, percentages, and business outcomes.",
      "**Be honest about project boundaries:** Clearly explain what YOU personally built versus what was provided as starter code or team collaboration.",
      "**Demonstrate growth mindset:** If asked about a tool you haven't used deeply (e.g., Snowflake, Tableau), say: 'While my primary stack is SQL Server, MySQL, and Power BI, the underlying relational concepts and DAX/LOD calculations translate directly. I've already explored Snowflake documentation and can ramp up in 1-2 weeks.'",
    ],
    commonMistakes: [
      "Speaking in vague generalities without specific examples or numbers.",
      "Criticizing previous team members, college professors, or internship mentors.",
      "Having no questions prepared to ask the Hiring Manager.",
    ],
    evaluatorExpectations: [
      "Genuine curiosity, resilience, high accountability, and excitement for data analytics.",
      "Alignment with company values and team collaboration style.",
    ],
  },
  {
    id: "round-5",
    roundNumber: 5,
    title: "HR & Leadership / Offer Negotiation",
    subtitle: "Culture Fit, Background Verification & Compensation Alignment",
    duration: "20 - 30 Minutes",
    weightage: "Final Confirmation (Pass/Fail)",
    focusArea: "Communication, Relocation, Joining Date, Salary Expectations",
    description: "Conducted by Talent Acquisition / HR Business Partner. Confirms graduation timeline (2026 Batch), relocation flexibility (Hyderabad / Bangalore), and compensation structure.",
    format: [
      "10 mins: Verification of academic credentials, graduation date, internship certificates, and certifications (ServiceNow CSA).",
      "10 mins: Location preferences, willingness to work in hybrid/in-office setups, and notice period/immediate availability.",
      "5-10 mins: CTC discussion, breakdown of Fixed vs Variable components, benefits, and joining timeline.",
    ],
    keyTopics: [
      "Clear explanation of 2026 graduation status and college NOC / final semester availability",
      "Enthusiastic confirmation of relocation to Hyderabad or Bangalore",
      "Polite, market-informed compensation dialogue",
    ],
    sampleQuestions: [
      "Are you open to working from our Hyderabad / Bangalore office 5 days a week?",
      "What are your salary expectations for this entry-level Data Analyst position?",
      "Do you have any other active offers or pending interview processes?",
      "When can you join us if an offer is extended today?",
    ],
    clearingStrategy: [
      "**Be crystal clear on relocation:** State enthusiastically: 'Yes, I am fully prepared and excited to relocate to Hyderabad / Bangalore immediately.'",
      "**Answering salary expectations:** 'Based on industry benchmarks for 2026 entry-level Data Analysts with hands-on internship experience in SQL and Power BI, I am looking for a competitive package aligned with company standards (e.g., standard band for this role). I am primarily focused on the growth and mentorship opportunities here.'",
      "**Highlight your certifications:** Mention your ServiceNow Certified System Administrator (CSA) and SQL/DAX certifications as proof of validated competency.",
    ],
    commonMistakes: [
      "Hesitating on location or demanding remote-only work for fresher roles.",
      "Giving an aggressive, ungrounded salary demand or arguing over standard fresher compensation bands.",
      "Providing inaccurate joining dates or concealing active college exam dates.",
    ],
    evaluatorExpectations: [
      "Professional demeanor, immediate joining readiness, and clear background verification paperwork.",
    ],
  },
];
