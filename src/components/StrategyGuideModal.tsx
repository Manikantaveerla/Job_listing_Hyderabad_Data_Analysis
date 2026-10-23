import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Flame,
  ShieldCheck,
  Briefcase,
  Users,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { candidateProfile } from "../data/candidateProfile";

interface StrategyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToJobsRadar: () => void;
  onNavigateToInterviewHub: () => void;
}

export const StrategyGuideModal: React.FC<StrategyGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToJobsRadar,
  onNavigateToInterviewHub,
}) => {
  const [activeTab, setActiveTab] = useState<
    "routine" | "hyderabad_fast_track" | "multithread" | "interview" | "rules"
  >("routine");
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      id="strategy-guide-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto"
    >
      <div
        id="strategy-guide-modal-content"
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 text-white shrink-0 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-[11px] font-bold mb-2">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Master Execution Blueprint
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                The 30-Minute Daily Job Hunt Blueprint
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                How to leverage this portal to secure 5-8 top-tier Data Analyst interview callbacks in 30 days as a 2026 fresher.
              </p>
            </div>

            <button
              id="close-strategy-modal-btn"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pt-1">
            {[
              { id: "routine", label: "⏰ 30-Min Daily Routine", icon: Clock },
              { id: "hyderabad_fast_track", label: "⚡ Hyderabad Startups (Fast Offers)", icon: Flame },
              { id: "multithread", label: "🎯 The 3-Touch System", icon: Users },
              { id: "interview", label: "🎓 5-Round Mastery", icon: Award },
              { id: "rules", label: "🛡️ 5 Golden Rules", icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* TAB 1: 30-Min Daily Routine */}
          {activeTab === "routine" && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                <Flame className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Consistency Beats Volume</h4>
                  <p className="text-xs text-blue-800 mt-0.5 leading-relaxed">
                    Applying randomly to 100 job portals with 1 click yields less than 2% response.
                    Following this 30-minute system with targeted outreach achieves a <strong>25% to 35% response rate</strong>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Block 1: Morning 10 Min */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[11px]">
                      00 - 10 Min
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">Morning Radar</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">1. ATS & Post X-Ray Scan</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-1"]}
                        onChange={() => toggleCheck("step-1")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Click <strong>Workday Scanner</strong> to see Fortune 500 GCC openings in Hyderabad & Bangalore.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-2"]}
                        onChange={() => toggleCheck("step-2")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Run <strong>LinkedIn 24h Posts</strong> to catch direct hiring posts from Analytics Leads.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-3"]}
                        onChange={() => toggleCheck("step-3")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Pick 3 newly posted roles to target today.</span>
                    </li>
                  </ul>
                </div>

                {/* Block 2: Midday 10 Min */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-[11px]">
                      10 - 20 Min
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">Outreach & Pitch</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">2. Five-Pitch Rule</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-4"]}
                        onChange={() => toggleCheck("step-4")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Click <strong>Users (Decision Makers)</strong> next to your target company.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-5"]}
                        onChange={() => toggleCheck("step-5")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Click <strong>Pitch</strong> to generate tailored cold message citing SQL, Power BI & ServiceNow projects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-6"]}
                        onChange={() => toggleCheck("step-6")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Send 3-5 personalized connection notes / InMails.</span>
                    </li>
                  </ul>
                </div>

                {/* Block 3: Afternoon 10 Min */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                      20 - 30 Min
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">Apply & Log</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">3. Direct Apply & Streak</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-7"]}
                        onChange={() => toggleCheck("step-7")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Submit direct application on the official career / ATS portal.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-8"]}
                        onChange={() => toggleCheck("step-8")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Change status to <strong>Applied</strong> in this portal to build your daily streak.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={!!checkedSteps["step-9"]}
                        onChange={() => toggleCheck("step-9")}
                        className="mt-0.5 rounded-sm cursor-pointer"
                      />
                      <span>Log Job ID, recruiter name, and follow-up date in notes.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Evening Practice Recommendation */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-bold text-amber-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    Evening 30-Min Mastery (Interview Readiness)
                  </div>
                  <p className="text-xs text-amber-900">
                    Solve 5 SQL queries from the <strong>Top 50 Question Bank</strong> and review 1 Power BI dashboard architecture.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToInterviewHub();
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  Open Interview Hub <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB: Hyderabad Startups Fast-Track Offers */}
          {activeTab === "hyderabad_fast_track" && (
            <div className="space-y-5">
              <div className="bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                    <Flame className="w-5 h-5 text-amber-200 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-orange-950">
                      Hyderabad Startups Fast-Track Blueprint (7–14 Day Offer Formula)
                    </h3>
                    <p className="text-xs text-orange-900 mt-1 leading-relaxed">
                      If you need interview calls and offers <strong>faster</strong>, Hyderabad startups are your #1 priority. 
                      Unlike MNCs with 6-month campus backlogs, startups hire when they have urgent product metrics and pipeline dashboards to ship. 
                      A direct outreach to a founder or analytics lead in HITEC City or T-Hub will get an interview scheduled within 48 to 72 hours!
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pillar Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-2">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-900 font-bold text-[11px]">
                    Channel 1: Wellfound & Cutshort
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">Direct Founder Inbox</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apply to 5 Hyderabad startups daily on Wellfound and Cutshort. Founders read applications directly. Include: <em>"Local in Hyderabad • 0-Day Notice Period • Live Blinkit & HR Power BI Dashboards"</em>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-bold text-[11px]">
                    Channel 2: LinkedIn Lead DMs
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">Target Engineering & Data Heads</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click <strong>Find Founders/Leads</strong> on any Hyderabad startup in this portal. Send the pre-crafted Founder Pitch directly to the VP of Engineering or Head of Analytics.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                    Channel 3: T-Hub Walk-In
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">Phase 2 Knowledge City</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    T-Hub Phase 2 in Raidurg houses 400+ tech startups. Attend open community demo days with your interactive dashboard loaded on your tablet or laptop. On-the-spot interviews are common!
                  </p>
                </div>
              </div>

              {/* Action Checklist */}
              <div className="p-4.5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  Daily Hyderabad Startup Attack Checklist
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded-sm" />
                    <span>Filter <strong>⚡ Hyderabad Startups Only</strong> on the portal dashboard and target 5 unapplied companies.</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded-sm" />
                    <span>Run the <strong>LinkedIn 24h Hyderabad Startup Urgent Requisitions</strong> query in Daily Jobs Radar.</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded-sm" />
                    <span>Message 3 startup founders on LinkedIn highlighting your <strong>0-Day Notice Period</strong> and Hyderabad location.</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded-sm" />
                    <span>When given a take-home SQL task, return it within 6 hours with documented CTEs, Power BI visual, and summary insights.</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: The 3-Touch System */}
          {activeTab === "multithread" && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">The Multi-Threading Strategy (3-Touch Rule)</h3>
                <p className="text-xs text-slate-600">
                  When a job opening is released at a top company, 1,000+ candidates apply on the portal. Here is how you bypass 95% of the queue:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Touch 1: Official Portal Submission</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Submit your application on the official ATS (Workday, Greenhouse, Taleo) using standard clean resume format.
                      Make sure your resume contains exact keywords: <em>SQL, CTEs, Window Functions, Power BI, DAX, Data Modeling, ServiceNow CSA</em>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Touch 2: Peer Connection with Live Project Link</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Use the <strong>Users</strong> icon to find a Senior Data Analyst or Data Engineer working at that office.
                      Send a friendly message sharing a 30-second video or live link to your <em>Sales Forecasting Dashboard</em> or <em>ServiceNow Incident SLA Dashboard</em>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Touch 3: Direct Note to Hiring Manager / Lead</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Send a concise 3-bullet note to the Analytics Manager:
                      <br />
                      <em>"Hi [Name], I recently submitted my application for [Job ID]. As a 2026 graduate specializing in SQL & Power BI, I built a full pipeline solving [Specific Metric]. Here is the repo/dashboard. Would love to be considered for your team."</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 5-Round Interview Readiness */}
          {activeTab === "interview" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">The 5-Round Fresher Data Analyst Gauntlet</h3>
                <p className="text-xs text-slate-600">
                  Every round requires a distinct skill set. Here is how your portal prepares you for all 5 rounds:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Round 1: Online Assessment (OA)
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">SQL Queries + Aptitude + Core BI</h4>
                  <p className="text-xs text-slate-600">
                    Expect 2-3 live SQL queries (`DENSE_RANK`, `LEAD/LAG`, multi-table `JOIN` with `HAVING`). Use our Top 50 SQL Question Bank to ace this.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    Round 2: Technical Deep Dive
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Power BI, DAX & Data Modeling</h4>
                  <p className="text-xs text-slate-600">
                    Explain Star Schema vs Snowflake Schema, `CALCULATE()` filter context transition, and Row-Level Security (RLS) implementation.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                    Round 3: Business Case Study
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Guesstimates & Metric Root-Cause Analysis</h4>
                  <p className="text-xs text-slate-600">
                    "Sales dropped by 14% in Q3 in South region—how would you investigate?" Practice our structured 4-step RCA framework.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Round 4: Techno-Managerial / Project Defense
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Deep Defense of Portfolio & ServiceNow CSA</h4>
                  <p className="text-xs text-slate-600">
                    Defend your exact project decisions: why you chose specific visual charts, handling null values, and managing SLA thresholds.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-blue-950 text-xs sm:text-sm">Practice with the AI Mock Interviewer</h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Launch dynamic mock sessions for any company tier and receive instant scoring.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToInterviewHub();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shrink-0 cursor-pointer shadow-xs"
                >
                  Start Mock Interview
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: 5 Golden Rules */}
          {activeTab === "rules" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">5 Non-Negotiable Rules for 2026 Freshers</h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "1. The 48-Hour Application Rule",
                    desc: "Apply to new job postings within 48 hours of publication. After 48 hours, ATS filters often cap initial candidate review batches at 100-200 applications.",
                  },
                  {
                    title: "2. Portfolio Beats GPA & Generic Resumes",
                    desc: "Recruiters and hiring managers spend 7 seconds on a resume. A live Power BI link or GitHub repository with clean SQL scripts immediately verifies your skills.",
                  },
                  {
                    title: "3. Leverage Your ServiceNow CSA Superpower",
                    desc: "Most Data Analyst freshers only know basic SQL and Excel. Your certified ServiceNow CSA knowledge makes you 3x more attractive to enterprise IT and GCC teams (JPMorgan, Wells Fargo, Novartis).",
                  },
                  {
                    title: "4. Maintain Your Daily Sprint Streak",
                    desc: "Set your daily target to 5 applications and 3 outreach messages. Momentum builds algorithmic visibility on LinkedIn and expands your active pipeline.",
                  },
                  {
                    title: "5. Always Follow Up on Day 5",
                    desc: "If you reached out to a manager or recruiter with no reply, send a polite 1-sentence bump on Day 5. 40% of recruiter replies occur on the second touch.",
                  },
                ].map((rule, rIdx) => (
                  <div key={rIdx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{rule.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Candidate Target: <strong>{candidateProfile.fullName}</strong> • 2026 Batch
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateToJobsRadar();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Launch Daily Jobs Radar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
