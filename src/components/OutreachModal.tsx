import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  Sparkles,
  Mail,
  Linkedin,
  UserCheck,
  FileCode,
  Lightbulb,
  Send,
  Loader2,
  RefreshCw,
  ExternalLink,
  Zap,
  Briefcase,
  Users,
} from "lucide-react";
import { Company, ApplicationStatus } from "../types";
import { candidateProfile } from "../data/candidateProfile";
import {
  getLinkedInFresherJobSearchUrl,
  getLinkedInDecisionMakerSearchUrl,
  getGoogleFresherJobsUrl,
  getLinkedInPeopleSearchUrl,
  getLinkedInJobsUrl,
} from "../data/companiesData";

interface OutreachModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (companyId: number, status: ApplicationStatus) => void;
}

export const OutreachModal: React.FC<OutreachModalProps> = ({
  company,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState<
    "founder_pitch" | "email" | "linkedin" | "referral" | "cover_letter" | "ai_custom"
  >("founder_pitch");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiCustomOutput, setAiCustomOutput] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  if (!isOpen || !company) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Determine relevant project based on domain
  const isEcommOrFood =
    company.sector.toLowerCase().includes("commerce") ||
    company.sector.toLowerCase().includes("food") ||
    company.sector.toLowerCase().includes("retail") ||
    company.name.toLowerCase().includes("blinkit") ||
    company.name.toLowerCase().includes("zepto") ||
    company.name.toLowerCase().includes("swiggy");

  const isFintechOrBank =
    company.sector.toLowerCase().includes("fin") ||
    company.sector.toLowerCase().includes("bank") ||
    company.sector.toLowerCase().includes("payment") ||
    company.sector.toLowerCase().includes("invest");

  const isHRorEdTech =
    company.sector.toLowerCase().includes("hr") ||
    company.sector.toLowerCase().includes("edtech") ||
    company.sector.toLowerCase().includes("hiring");

  const relevantProject = isEcommOrFood
    ? candidateProfile.projects[0] // Blinkit
    : isHRorEdTech
    ? candidateProfile.projects[2] // HR Analytics
    : candidateProfile.projects[1]; // Library DB / Relational SQL

  // 0. Founder / Boutique Analytics Direct High-Impact Pitch
  const founderPitchSubject = `Quick question re: Data Analyst / BI engineering at ${company.name} – Manikanta Veerla`;
  const founderPitchBody = `Hi [Name / Team],

I noticed ${company.name}'s rapid expansion in ${company.sector}. 

I am a 2026 CS graduate with two Data Analyst internships under my belt (Bold Analytics & Wisen IT Solutions). I don't need a ramp-up period to start delivering value:

1. **SQL & ETL Pipelines:** I write clean, optimized CTEs, window functions, and relational schema transformations (cut query latency by 35% across 1,400+ record datasets).
2. **Power BI & DAX:** Built end-to-end automated dashboards from raw databases that cut manual reporting turnaround by 40%.
3. **Domain Alignment:** Built ${relevantProject.title} using ${relevantProject.tools.join(", ")}.
4. **Certifications:** ServiceNow Certified System Administrator (CSA #27288495), SQL for Data Analysis, and Power BI DAX Mastery.

Live Portfolio & Repositories: ${candidateProfile.portfolioUrl}

Are you currently open to bringing on an agile Junior Data Analyst / BI Trainee in ${company.city} who can take reporting pipelines and data cleaning off your plate immediately?

Would love to share my resume or do a 10-minute technical problem walk-through!

Best,
Manikanta Veerla
+91-9573357376 | ${candidateProfile.email}
LinkedIn: ${candidateProfile.linkedinUrl}`;

  // 1. Cold Email Template
  const emailSubject = `Data Analyst (2026 CS Grad) • SQL, Power BI & ETL • Manikanta Veerla`;
  const emailBody = `Dear ${company.name} Talent Acquisition & Data Team,


I am writing to express my strong interest in entry-level Data Analyst / BI Analyst opportunities at ${company.name} (${company.city}). 

As a 2026 Computer Science graduate with hands-on experience across two data analyst internships (Bold Analytics & Wisen IT Solutions), I specialize in:
• **SQL & Query Optimization:** 3NF relational schemas, window functions, CTEs, and subqueries cutting latency by ~35%.
• **Power BI & DAX:** End-to-end automated ETL pipelines connecting MySQL/SQL Server to interactive dashboards, reducing manual reporting turnaround by 40%.
• **Domain Alignment:** Built ${relevantProject.title} (${relevantProject.tools.join(", ")}).
• **Certifications:** ServiceNow Certified System Administrator (CSA #27288495), SQL for Data Analysis, and Power BI DAX Mastery.

Why ${company.name}: I have been closely tracking ${company.name}'s innovative footprint in ${company.sector}, and I would love to contribute my data modeling and reporting skills to your analytics stream.

My portfolio with interactive projects and SQL repositories is available at: ${candidateProfile.portfolioUrl}

I would welcome the opportunity for a 10-minute introductory discussion or technical assessment.

Thank you for your time and consideration!

Warm regards,
Manikanta Veerla
+91-9573357376 | ${candidateProfile.email}
LinkedIn: ${candidateProfile.linkedinUrl} | GitHub: ${candidateProfile.githubUrl}`;

  // 2. LinkedIn Messages
  const linkedinConnectionNote = `Hi [Name], I noticed ${company.name}'s work in ${company.sector}. As a 2026 CS Grad with 2 Data Analyst internships (SQL/Power BI/ETL), I'd love to connect and follow data analytics opportunities at ${company.name}!`;

  const linkedinInMail = `Hi [Name], thanks for connecting!

I've been following ${company.name}'s analytics initiatives in ${company.city}. As a 2026 CS graduate specializing in Data Analytics & BI Solutions, I recently engineered automated ETL pipelines and DAX dashboards for ${relevantProject.title} and hold ServiceNow CSA (#27288495) and SQL certifications.

Are there upcoming entry-level / fresher Data Analyst openings within ${company.name}'s ${company.sector} teams? 

I'd be glad to share my resume and live portfolio: ${candidateProfile.portfolioUrl}.

Thank you,
Manikanta Veerla
+91-9573357376`;

  // 3. Referral Request Template
  const referralSubject = `Referral Request: Entry-Level Data Analyst at ${company.name} – Manikanta Veerla`;
  const referralBody = `Hi [Name],

Hope you're having a great week!

I noticed your role at ${company.name} and wanted to reach out as I am actively applying for the entry-level Data Analyst / BI Analyst position in ${company.name}'s ${company.sector} team (${company.city}).

As a 2026 Computer Science graduate with two completed Data Analyst internships (Bold Analytics & Wisen IT Solutions), my background includes:
• **SQL & Query Optimization:** 3NF relational schemas, window functions, and subquery optimization across 1,400+ records cutting query latency by ~35%.
• **Power BI & DAX:** End-to-end automated ETL pipelines connecting MySQL/SQL Server to interactive dashboards, reducing manual reporting turnaround by 40%.
• **Verified Certifications:** ServiceNow CSA Certified (#27288495), SQL for Data Analysis, and Power BI DAX Mastery.

If you are comfortable, could you please consider referring me for this opening? I have my resume, Job ID, and portfolio (${candidateProfile.portfolioUrl}) ready to provide right away.

Thank you so much for your time and support!

Best regards,
Manikanta Veerla
+91-9573357376 | ${candidateProfile.email}`;

  // 4. Cover Letter
  const coverLetter = `Dear Hiring Manager,

I am writing to express my enthusiasm for the Data Analyst / BI Solutions Engineer role at ${company.name} in ${company.city}. As a 2026 Computer Science & Engineering graduate specializing in database engineering, automated ETL pipelines, and interactive BI dashboards, I am eager to apply my analytical expertise to ${company.name}'s ${company.sector} operations.

Throughout my internships at Bold Analytics and Wisen IT Solutions, I translated multi-source enterprise datasets into actionable intelligence. At Wisen IT Solutions, I wrote optimized T-SQL query routines incorporating window functions and joins to construct automated Power BI pipelines—slashing manual reporting turnaround time by 40%. At Bold Analytics, I engineered advanced Excel data models and Power BI executive dashboards, decreasing dataset anomaly rates by 20%. Furthermore, my end-to-end project on ${relevantProject.title} demonstrates my ability to design production-grade schemas, formulate complex DAX measures, and extract strategic metrics.

${company.name}'s market reputation in ${company.sector} resonates deeply with my career objectives. With my certifications as a ServiceNow Certified System Administrator (CSA #27288495) and professional credentials in SQL and Power BI DAX Mastery, I am prepared to contribute immediate analytical value to your team.

Thank you for your consideration. I look forward to the opportunity to discuss how my technical skills and proactive work ethic align with ${company.name}.

Sincerely,
Manikanta Veerla
+91-9573357376 | ${candidateProfile.email}
Portfolio: ${candidateProfile.portfolioUrl}`;

  // AI Generator function
  const handleGenerateAiPitch = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const response = await fetch("/api/generate-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: company.name,
          sector: company.sector,
          city: company.city,
          fitReason: company.fitReason,
          jobDescription: jobDescription.trim(),
          formatType: "cold_email",
        }),
      });

      const data = await response.json();
      if (data.success && data.generatedText) {
        setAiCustomOutput(data.generatedText);
      } else {
        setGenerationError(data.error || "Failed to generate custom pitch");
      }
    } catch (err: any) {
      setGenerationError(err.message || "Failed to connect to AI server");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      id="outreach-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="outreach-modal-container"
        className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 font-bold text-sm">
              #{company.id}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900">{company.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                  {company.city}
                </span>
                {company.tier && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-semibold">
                    {company.tier}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-semibold">
                  {company.sector}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <span className="text-slate-800 font-semibold">Why it fits:</span> {company.fitReason}
              </p>
            </div>
          </div>
          <button
            id="close-outreach-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rapid Research & 1-Click Search Bar */}
        <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap text-xs">
          <span className="text-slate-700 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" /> 1-Click Search:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={getLinkedInFresherJobSearchUrl(company)}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
            >
              <Briefcase className="w-3 h-3 text-white" /> LinkedIn 0-1 yr Jobs <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href={getLinkedInDecisionMakerSearchUrl(company)}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
            >
              <Users className="w-3 h-3 text-blue-600" /> Analytics Leads on LinkedIn <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href={getGoogleFresherJobsUrl(company)}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
            >
              Google Fresher Search <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-slate-200 bg-slate-50/50 flex gap-2 overflow-x-auto">
          <button
            id="tab-founder-pitch-btn"
            onClick={() => setActiveTab("founder_pitch")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === "founder_pitch"
                ? "border-amber-600 text-amber-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" /> Startup & Boutique Pitch
          </button>
          <button
            id="tab-cold-email-btn"
            onClick={() => setActiveTab("email")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === "email"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Cold Email
          </button>
          <button
            id="tab-linkedin-dm-btn"
            onClick={() => setActiveTab("linkedin")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === "linkedin"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn Note & DM
          </button>
          <button
            id="tab-referral-request-btn"
            onClick={() => setActiveTab("referral")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === "referral"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Referral Request
          </button>
          <button
            id="tab-cover-letter-btn"
            onClick={() => setActiveTab("cover_letter")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === "cover_letter"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Cover Letter
          </button>
          <button
            id="tab-ai-custom-btn"
            onClick={() => setActiveTab("ai_custom")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === "ai_custom"
                ? "border-purple-600 text-purple-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI JD Tailor
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 0: FOUNDER PITCH */}
          {activeTab === "founder_pitch" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Boutique & Startup Strategy:</strong> Startups value immediate delivery over corporate protocol. This pitch highlights zero ramp-up time, automated Power BI pipelines, and query latency reductions.
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <div className="text-slate-600">
                    <span className="text-slate-500 font-semibold">Subject: </span>
                    <span className="text-slate-900 font-bold">{founderPitchSubject}</span>
                  </div>
                  <button
                    id="copy-founder-subject-btn"
                    onClick={() => copyText(founderPitchSubject, "founder-subj")}
                    className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedKey === "founder-subj" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Subject
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <div className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {founderPitchBody}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Send directly to Founders, Directors of Analytics, or Engineering Managers.</span>
                </div>
                <button
                  id="copy-full-founder-pitch-btn"
                  onClick={() => copyText(`${founderPitchSubject}\n\n${founderPitchBody}`, "full-founder")}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs cursor-pointer"
                >
                  {copiedKey === "full-founder" ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "full-founder" ? "Copied to Clipboard!" : "Copy Full Pitch"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: COLD EMAIL */}
          {activeTab === "email" && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <div className="text-slate-600">
                    <span className="text-slate-500 font-semibold">Subject: </span>
                    <span className="text-slate-900 font-bold">{emailSubject}</span>
                  </div>
                  <button
                    id="copy-email-subject-btn"
                    onClick={() => copyText(emailSubject, "subj")}
                    className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedKey === "subj" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === "subj" ? "Copied" : "Copy Subject"}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {emailBody}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Pro Tip: Send between 9:00 AM - 10:30 AM on Tuesday/Wednesday for highest open rates.</span>
                </div>
                <button
                  id="copy-full-email-btn"
                  onClick={() => copyText(`${emailSubject}\n\n${emailBody}`, "full-email")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  {copiedKey === "full-email" ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "full-email" ? "Copied Full Email!" : "Copy Full Email"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LINKEDIN NOTE & INMAIL */}
          {activeTab === "linkedin" && (
            <div className="space-y-4">
              {/* Note <300 Chars */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <div className="font-bold text-blue-800 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5" /> 1. LinkedIn Connection Note
                    <span className="text-[10px] text-slate-500 font-normal">
                      ({linkedinConnectionNote.length}/300 chars limit)
                    </span>
                  </div>
                  <button
                    id="copy-linkedin-note-btn"
                    onClick={() => copyText(linkedinConnectionNote, "li-note")}
                    className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedKey === "li-note" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === "li-note" ? "Copied" : "Copy Note"}
                  </button>
                </div>
                <p className="font-mono text-xs text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  {linkedinConnectionNote}
                </p>
              </div>

              {/* InMail / DM */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <div className="font-bold text-blue-800 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> 2. Follow-Up Message (Once Connected)
                  </div>
                  <button
                    id="copy-linkedin-dm-btn"
                    onClick={() => copyText(linkedinInMail, "li-dm")}
                    className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedKey === "li-dm" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === "li-dm" ? "Copied" : "Copy Message"}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  {linkedinInMail}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={getLinkedInPeopleSearchUrl(company.name, company.city)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-700 hover:underline font-bold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Find {company.name} Recruiters on LinkedIn
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: REFERRAL REQUEST */}
          {activeTab === "referral" && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <div className="text-slate-600">
                    <span className="text-slate-500 font-semibold">Subject: </span>
                    <span className="text-slate-900 font-bold">{referralSubject}</span>
                  </div>
                  <button
                    id="copy-referral-subject-btn"
                    onClick={() => copyText(referralSubject, "ref-subj")}
                    className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedKey === "ref-subj" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === "ref-subj" ? "Copied" : "Copy Subject"}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {referralBody}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={getLinkedInPeopleSearchUrl(company.name, company.city)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-700 hover:underline font-bold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Search Alumni & Senior Analysts at {company.name}
                </a>
                <button
                  id="copy-full-referral-btn"
                  onClick={() => copyText(`${referralSubject}\n\n${referralBody}`, "full-ref")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  {copiedKey === "full-ref" ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "full-ref" ? "Copied Referral Message!" : "Copy Referral Pitch"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COVER LETTER */}
          {activeTab === "cover_letter" && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {coverLetter}
              </div>

              <div className="flex justify-end">
                <button
                  id="copy-cover-letter-btn"
                  onClick={() => copyText(coverLetter, "cov-let")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  {copiedKey === "cov-let" ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "cov-let" ? "Copied Cover Letter!" : "Copy Cover Letter"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: AI JD TAILOR */}
          {activeTab === "ai_custom" && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                <label className="text-xs font-bold text-purple-900 block">
                  Paste Specific Job Description or Requirements from {company.name} (Optional):
                </label>
                <textarea
                  id="jd-input-textarea"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste specific JD text, requirements (e.g. 'Must know SQL window functions, Power BI DAX, and have worked with payments data')..."
                  className="w-full h-24 bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 transition resize-none font-mono"
                />
                <div className="flex justify-end">
                  <button
                    id="generate-ai-pitch-btn"
                    onClick={handleGenerateAiPitch}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {isGenerating ? "Generating Bespoke Pitch..." : "Generate AI Tailored Pitch"}
                  </button>
                </div>
              </div>

              {generationError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {generationError}
                </div>
              )}

              {aiCustomOutput && (
                <div className="bg-slate-50 rounded-xl border border-purple-300 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Tailored Output
                    </span>
                    <button
                      id="copy-ai-output-btn"
                      onClick={() => copyText(aiCustomOutput, "ai-out")}
                      className="text-purple-800 hover:text-purple-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "ai-out" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedKey === "ai-out" ? "Copied" : "Copy AI Pitch"}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {aiCustomOutput}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">Quick Status Update:</span>
            {onUpdateStatus && (
              <div className="flex gap-1.5">
                <button
                  id="mark-applied-from-outreach-btn"
                  onClick={() => {
                    onUpdateStatus(company.id, "Applied");
                    onClose();
                  }}
                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs transition font-bold cursor-pointer"
                >
                  Mark Applied ✓
                </button>
                <button
                  id="mark-referral-from-outreach-btn"
                  onClick={() => {
                    onUpdateStatus(company.id, "Referral Requested");
                    onClose();
                  }}
                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-800 rounded-lg text-xs transition font-bold cursor-pointer"
                >
                  Mark Referral Requested
                </button>
              </div>
            )}
          </div>
          <button
            id="close-outreach-bottom-btn"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
