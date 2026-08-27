import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// AI Cold Outreach & Job Pitch Generator endpoint
app.post("/api/generate-pitch", async (req, res) => {
  try {
    const {
      companyName,
      sector,
      city,
      fitReason,
      jobDescription,
      tone,
      formatType, // 'cold_email' | 'linkedin_dm' | 'referral_request' | 'cover_letter' | 'interview_prep'
      applicantProfile,
    } = req.body;

    const ai = getGenAI();

    const candidateContext = `
Candidate Profile:
- Name: Manikanta Veerla
- Education: B.Tech Computer Science & Engineering (Internet of Things) - 2026 Batch, Ramachandra College of Engineering
- Core Target: Data Analyst / Junior Data Analyst / BI Solutions Engineer
- Key Technical Skills: Advanced SQL & T-SQL (3NF Normalization, CTEs, Window Functions, Stored Procedures, Query Optimization ~35% speedup), Power BI & DAX (Power Query ETL, Calculated Measures, Data Modeling), Python (Pandas, NumPy, Matplotlib, Seaborn), Advanced Excel (PivotTables, VLOOKUP, XLOOKUP), AWS (S3, Glue, Athena), Snowflake, dbt, ServiceNow (CSA Certified #27288495).
- Internships:
  1) Bold Analytics (Remote Data Analyst Intern): Built Excel data models (-20% anomaly rate), Power BI executive dashboards, multi-source SQL/Python EDA.
  2) Wisen IT Solutions Pvt. Ltd. (Data Analyst Intern): Wrote optimized T-SQL query routines across enterprise datasets, automated Power BI ETL (-40% reporting turnaround time).
- Featured Projects:
  1) Interactive Sales Dashboard – Blinkit Analytics (Power BI, DAX, MySQL ETL, 8-week operational metrics)
  2) Library Management System – Relational Database Architecture (SQL Server, 3NF, Stored Procedures, indexing)
  3) HR Analytics Dashboard – Employee Attrition & Retention (1400+ records analyzed with T-SQL window functions, Power BI DAX KPIs)
- Contact: Hyderabad, India (Open to Relocate) | Email: manikantaveerla2@gmail.com | Phone: +91-9573357376
- Links: LinkedIn (linkedin.com/in/manikanta-veerla) | Portfolio (mv1614-portfolio.vercel.app) | GitHub (github.com/Manikantaveerla)
`;

    let systemInstruction = `You are a high-impact tech career strategist helping a top 2026 fresher Data Analyst candidate (Manikanta Veerla) write compelling, tailored job applications. 
Never produce generic boilerplate or fluff. Be concise, punchy, and highlight measurable data achievements (e.g., 3NF SQL optimization, Blinkit Power BI DAX dashboards, 40% time reduction in ETL reporting).`;

    let prompt = "";

    if (formatType === "linkedin_dm") {
      prompt = `Generate a high-converting LinkedIn Connection Note & Follow-up DM for:
Company: ${companyName} (${city})
Domain: ${sector}
Why it fits: ${fitReason}
${jobDescription ? `Specific Job Info: ${jobDescription}` : ""}

Provide:
1. Short LinkedIn Connection Note (STRICTLY under 280 characters so it fits the character limit)
2. Follow-up InMail/Message (under 120 words, engaging hook about their data challenges in ${sector}, citing relevant project like ${sector.toLowerCase().includes("e-comm") || sector.toLowerCase().includes("food") || sector.toLowerCase().includes("quick") ? "Blinkit Power BI sales dashboard" : sector.toLowerCase().includes("fin") || sector.toLowerCase().includes("bank") ? "T-SQL 3NF optimized transaction query architecture" : "HR Attrition & ETL analytics pipeline"}).`;
    } else if (formatType === "referral_request") {
      prompt = `Generate a polite, professional Employee/Alumni Referral Request message for an engineer or senior analyst at ${companyName} (${city}, ${sector}):
Context: Manikanta is targeting entry-level / fresher Data Analyst positions.
Ensure it includes:
- Clear, respectful ask
- 2-bullet summary of technical skills (SQL window functions, Power BI DAX ETL)
- Mention of readiness to provide Job ID and resume link instantly.`;
    } else if (formatType === "cover_letter") {
      prompt = `Generate a concise 3-paragraph tailored cover letter for ${companyName} for an entry-level Data Analyst / BI Analyst role:
- Paragraph 1: Strong hook stating interest in ${companyName}'s work in ${sector} and graduating 2026 B.Tech background.
- Paragraph 2: Concrete technical proof citing Manikanta's internships at Bold Analytics & Wisen IT, and specific project relevant to ${companyName}.
- Paragraph 3: Call to action with portfolio link and availability for immediate technical assessment.`;
    } else if (formatType === "interview_prep") {
      prompt = `Generate customized interview preparation questions & strategy for ${companyName} (${sector}):
Provide:
1. Top 3 Domain-Specific SQL / Analytics scenarios likely asked by ${companyName} (focused on ${sector} data problems).
2. Recommended project from Manikanta's portfolio to emphasize and the exact 2-minute elevator story to tell.
3. 2 intelligent questions Manikanta can ask the interviewer at the end.`;
    } else {
      // Default: cold_email
      prompt = `Generate a tailored cold email to a Talent Acquisition specialist / Analytics Hiring Manager at ${companyName} in ${city} (${sector}):
${jobDescription ? `Job Context: ${jobDescription}` : `Why fit: ${fitReason}`}

Include:
- Subject line (High open rate, e.g. "Data Analyst 2026 Grad | SQL & Power BI | Manikanta Veerla")
- Body (under 140 words, structured with 2-3 clean bullet points highlighting tangible project metrics, portfolio link)
- Clear call to action for a 10-minute introductory conversation or technical test.`;
    }

    if (!ai) {
      // Fallback generator when API key is not yet set
      return res.json({
        success: true,
        generatedText: getDeterministicFallback(formatType, companyName, sector, fitReason),
        isFallback: true,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `${candidateContext}\n\nTask:\n${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const outputText = response.text || "";

    res.json({
      success: true,
      generatedText: outputText,
      isFallback: false,
    });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate pitch",
    });
  }
});

// AI Mock Interviewer - Generate Dynamic Challenge / Scenario
app.post("/api/ai-mock-question", async (req, res) => {
  try {
    const { skill, companyType, difficulty } = req.body;
    const ai = getGenAI();

    const prompt = `You are a Senior Lead Data Analyst / Analytics Hiring Manager at a top ${companyType || "Boutique Analytics Consultancy / Tech Unicorn"} in India.
Generate a realistic, high-signal technical interview question for a Fresher / Entry-Level Data Analyst candidate (2026 Batch).

Target Domain/Skill: ${skill || "SQL"}
Target Difficulty: ${difficulty || "Intermediate"}

Provide your response in JSON format with the following keys:
{
  "title": "Short descriptive question title",
  "companyContext": "1-sentence realistic business context (e.g. Swiggy delivery latency, Razorpay transaction fraud, Blinkit dark store inventory)",
  "problemStatement": "Detailed problem statement with sample table schemas (column names and data types)",
  "sampleInput": "Small 3-5 row sample table data",
  "expectedOutput": "Expected result table or output format",
  "hints": ["Hint 1 on key function to use", "Hint 2 on edge cases like NULLs or ties"]
}`;

    if (!ai) {
      return res.json({
        success: true,
        data: {
          title: "Consecutive Days Active User Logins",
          companyContext: "Blinkit Quick Commerce active user retention tracking in Hyderabad.",
          problemStatement: "Given a table `user_logins (user_id INT, login_date DATE)`, write a SQL query to find all users who logged in on at least 3 consecutive calendar days. Return `user_id`, `streak_start_date`, and `total_consecutive_days`.",
          sampleInput: "| user_id | login_date |\n| 101 | 2026-03-01 |\n| 101 | 2026-03-02 |\n| 101 | 2026-03-03 |\n| 102 | 2026-03-01 |\n| 102 | 2026-03-03 |",
          expectedOutput: "| user_id | streak_start_date | total_consecutive_days |\n| 101 | 2026-03-01 | 3 |",
          hints: ["Use ROW_NUMBER() partitioned by user_id ordered by login_date.", "Subtract ROW_NUMBER days from login_date to find constant streak grouping anchors."]
        },
        isFallback: true
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      data: parsed,
      isFallback: false
    });
  } catch (error: any) {
    console.error("Mock question generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate mock question",
    });
  }
});

// AI Mock Interviewer - Evaluate Candidate Query / Answer
app.post("/api/evaluate-interview-answer", async (req, res) => {
  try {
    const { skill, questionTitle, problemStatement, candidateAnswer } = req.body;
    const ai = getGenAI();

    const prompt = `You are a Principal Analytics Architect & Technical Interviewer evaluating a 2026 fresher candidate's live answer in an interview.

Candidate Name: Manikanta Veerla
Skill Being Tested: ${skill}
Question Title: ${questionTitle}
Problem Statement: ${problemStatement}

Candidate's Submitted Answer / Code:
"""
${candidateAnswer}
"""

Evaluate this answer thoroughly. Return your feedback as a structured JSON object with these exact keys:
{
  "score": number (1 to 10),
  "verdict": string ("Strong Hire" | "Hire" | "Borderline / Needs Polish" | "Needs Rework"),
  "summary": "2-sentence overall evaluation summary",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknessesAndBugs": ["Bug or edge-case missed (e.g. NULL handling, ties, syntax issue)", "Performance bottleneck"],
  "modelSolution": "The ideal, production-grade clean code/query with comments",
  "talkingPoints": "2-3 crisp sentences Manikanta should say to the interviewer when walking through this solution"
}`;

    if (!ai) {
      return res.json({
        success: true,
        feedback: {
          score: 8.5,
          verdict: "Hire",
          summary: "Solid analytical reasoning. The query handles core grouping logic cleanly with good syntax structuring.",
          strengths: [
            "Used standard ANSI SQL CTEs for readability.",
            "Correctly partitioned by primary entities."
          ],
          weaknessesAndBugs: [
            "Ensure you wrap division denominators in NULLIF to avoid division by zero runtime exceptions.",
            "Verify behavior if duplicate timestamps exist."
          ],
          modelSolution: `-- Optimized Model Solution\nWITH CleanedData AS (\n  SELECT * FROM source_table WHERE status IS NOT NULL\n)\nSELECT entity_id, SUM(metric) AS total_metric\nFROM CleanedData\nGROUP BY entity_id;`,
          talkingPoints: "State clearly: 'I partitioned by entity_id to isolate user histories, and applied a window ranking to ensure tied values are handled gracefully without skipping positions.'"
        },
        isFallback: true
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      feedback: parsed,
      isFallback: false
    });
  } catch (error: any) {
    console.error("Evaluation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to evaluate answer",
    });
  }
});

function getDeterministicFallback(
  formatType: string,
  companyName: string,
  sector: string,
  fitReason: string
): string {
  if (formatType === "linkedin_dm") {
    return `🔗 **LinkedIn Connection Note (<300 chars):**
"Hi [Name], I noticed ${companyName}'s work in ${sector}. As a 2026 CS Grad with 2 Data Analyst internships (SQL/Power BI/ETL), I'd love to connect and follow data analytics opportunities at ${companyName}!"

📩 **Follow-Up Message (Once Connected):**
"Hi [Name], thanks for connecting! I've been following ${companyName}'s growth in ${sector}. 
I specialize in writing optimized SQL (3NF, CTEs, Window Functions) and interactive Power BI DAX dashboards with automated ETL pipelines. 

Recently, I engineered an interactive Blinkit Sales analytics model and an HR Attrition predictive pipeline. 

Are there entry-level or 2026 fresher Data Analyst openings in your team? I'd love to share my portfolio: mv1614-portfolio.vercel.app. Thank you!"`;
  }

  if (formatType === "referral_request") {
    return `Subject: Referral Request: Entry-Level Data Analyst at ${companyName} – Manikanta Veerla

Hi [Name],

Hope you are doing well!

I noticed your role at ${companyName} and wanted to reach out as I am actively applying for the entry-level Data Analyst / BI Analyst position in ${companyName}'s ${sector} division.

As a 2026 Computer Science graduate with two completed Data Analyst internships (Bold Analytics & Wisen IT Solutions), my background includes:
• **SQL & Query Optimization:** 3NF relational schemas, window functions, and subquery optimization across 1,400+ records cutting latency by ~35%.
• **Power BI & DAX:** End-to-end automated ETL pipelines connecting MySQL/SQL Server to interactive executive dashboards.
• **Certifications:** ServiceNow CSA Certified (#27288495), SQL for Data Analysis, and Power BI DAX Mastery.

If comfortable, would you be willing to refer me for this opening? I have my resume, Job ID, and portfolio (mv1614-portfolio.vercel.app) ready to share immediately.

Thank you so much for your time and guidance!

Best regards,
Manikanta Veerla
+91-9573357376 | manikantaveerla2@gmail.com`;
  }

  return `Subject: Application: Entry-Level Data Analyst – Manikanta Veerla (SQL / Power BI / Python)

Dear ${companyName} Hiring Team,

I am writing to express my strong interest in the Data Analyst / BI Analyst opportunities at ${companyName}. As a 2026 Computer Science graduate with hands-on experience across two analytics internships, I am eager to apply my data modeling, SQL query optimization, and Power BI reporting skills to ${companyName}'s ${sector} data streams.

**Key Highlights of My Experience:**
• **Industry Internships:** At Bold Analytics and Wisen IT Solutions, I engineered automated SQL and Power BI ETL pipelines, reducing manual reporting turnaround time by 40% and cutting data anomaly rates by 20%.
• **Technical Stack:** Advanced SQL/T-SQL (CTEs, Window Functions, 3NF), Power BI DAX measures, Python (Pandas/NumPy), Advanced Excel (PivotTables, XLOOKUP), and ServiceNow CSA Certified.
• **Production Projects:** Designed the Blinkit Sales BI Dashboard (MySQL ETL) and Relational Library Management System.

I would welcome the opportunity to discuss how my analytical skills align with ${companyName}'s goals. You can review my live portfolio and code repositories at mv1614-portfolio.vercel.app.

Thank you for your time and consideration.

Sincerely,
Manikanta Veerla
+91-9573357376 | manikantaveerla2@gmail.com | linkedin.com/in/manikanta-veerla`;
}

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
