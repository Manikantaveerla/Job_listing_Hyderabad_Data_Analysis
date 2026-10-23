import React, { useState } from "react";
import {
  X,
  Zap,
  Rocket,
  MapPin,
  ExternalLink,
  Copy,
  CheckCircle2,
  Building2,
  Search,
  Flame,
  Award,
  Users,
  Briefcase,
  Send,
  Sparkles,
  PhoneCall,
  Clock,
  Compass,
} from "lucide-react";
import { candidateProfile } from "../data/candidateProfile";
import { hyderabadStartupsList } from "../data/hyderabadStartupsData";
import { Company } from "../types";
import {
  getCompanyLinkedInProfileUrl,
  getCompanyLinkedInJobsUrl,
  getLinkedInDecisionMakerSearchUrl,
  getLinkedInFresherJobSearchUrl,
} from "../data/companiesData";

interface HyderabadStartupAcceleratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCompanyForOutreach: (company: Company) => void;
  onFilterHyderabadStartupsInDashboard: () => void;
}

export const HyderabadStartupAcceleratorModal: React.FC<
  HyderabadStartupAcceleratorModalProps
> = ({
  isOpen,
  onClose,
  onSelectCompanyForOutreach,
  onFilterHyderabadStartupsInDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<"directory" | "blueprint" | "portals" | "pitch">("directory");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSubSector, setSelectedSubSector] = useState<string>("All");

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredStartups = hyderabadStartupsList.filter((c) => {
    if (selectedSubSector !== "All" && c.domainGroup !== selectedSubSector) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.fitReason.toLowerCase().includes(q) ||
        c.fresherNote?.toLowerCase().includes(q) ||
        c.recommendedRoles.some((r) => r.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const domains = Array.from(new Set(hyderabadStartupsList.map((c) => c.domainGroup))).sort();

  // High-Impact Founder Direct DM
  const startupFounderPitch = `Hi [Founder/CTO Name],

I noticed ${hyderabadStartupsList[0].name}'s rapid growth in the Hyderabad tech ecosystem.

I am a 2026 Computer Science graduate based locally here in Hyderabad (HITEC City / Madhapur). I completed 2 Data Analyst internships (Bold Analytics & Wisen IT Solutions) and hold ServiceNow CSA (#27288495) + SQL for Data Analysis certifications.

3 reasons why I can contribute from Day 1 with 0 training overhead:
1. Production SQL & ETL: Write optimized 3NF queries, CTEs, and window functions (reduced query latency by ~35% on 1,400+ record datasets).
2. End-to-End Power BI & DAX: Built automated executive dashboards from raw databases cutting reporting turnaround by 40%.
3. Immediate Joining (0-Day Notice): Unlike experienced candidates with 60-90 day notice periods, I can join immediately and am available for an in-person technical discussion in Hyderabad anytime this week.

Live Portfolio & SQL Repositories: ${candidateProfile.portfolioUrl}

Are you open to a 10-minute technical chat or practical case challenge?

Best regards,
Manikanta Veerla
+91-9573357376 | ${candidateProfile.email}
LinkedIn: ${candidateProfile.linkedinUrl}`;

  return (
    <div
      id="hyderabad-accelerator-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="hyderabad-accelerator-modal-container"
        className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-slate-800 my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with High-Velocity Badge */}
        <div className="bg-linear-to-r from-amber-600 via-orange-600 to-rose-700 text-white p-5 sm:p-6 shrink-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-white/10 blur-2xl transform skew-x-12 pointer-events-none" />
          
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-amber-200 text-xs font-bold flex items-center gap-1 border border-white/20">
                  <Flame className="w-3.5 h-3.5 fill-current text-amber-300" />
                  Speed-to-Offer War Room (7–14 Days)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold border border-emerald-400/30">
                  📍 Hyderabad Local Advantage
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Hyderabad Startups Data Analyst Accelerator
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-2xl">
                Bypass slow 6-month corporate ATS loops. Connect directly with founders, CTOs, and hiring leads across 52+ fast-growing Hyderabad startups hiring for immediate offers.
              </p>
            </div>

            <button
              id="close-hyd-accelerator-modal-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
            <button
              id="hyd-tab-directory-btn"
              onClick={() => setActiveTab("directory")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "directory"
                  ? "bg-white text-orange-900 shadow-md"
                  : "bg-black/20 text-white hover:bg-black/30"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>52+ Hyderabad Startups ({hyderabadStartupsList.length})</span>
            </button>
            <button
              id="hyd-tab-blueprint-btn"
              onClick={() => setActiveTab("blueprint")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "blueprint"
                  ? "bg-white text-orange-900 shadow-md"
                  : "bg-black/20 text-white hover:bg-black/30"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>14-Day Fast Offer Formula</span>
            </button>
            <button
              id="hyd-tab-portals-btn"
              onClick={() => setActiveTab("portals")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "portals"
                  ? "bg-white text-orange-900 shadow-md"
                  : "bg-black/20 text-white hover:bg-black/30"
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Top 5 Direct Founder Portals</span>
            </button>
            <button
              id="hyd-tab-pitch-btn"
              onClick={() => setActiveTab("pitch")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "pitch"
                  ? "bg-white text-orange-900 shadow-md"
                  : "bg-black/20 text-white hover:bg-black/30"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Founder DM & WhatsApp Script</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50 text-slate-800">
          {/* TAB 1: 52+ HYDERABAD STARTUPS DIRECTORY */}
          {activeTab === "directory" && (
            <div className="space-y-4">
              {/* Quick Actions & Filters Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search Hyderabad startups by name, role, tech domain, or micro-location (HITEC City, T-Hub)..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={selectedSubSector}
                    onChange={(e) => setSelectedSubSector(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-orange-500"
                  >
                    <option value="All">All Domains ({hyderabadStartupsList.length})</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      onFilterHyderabadStartupsInDashboard();
                      onClose();
                    }}
                    className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>View in Main Dashboard Table</span>
                  </button>
                </div>
              </div>

              {/* Startup Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredStartups.map((company) => {
                  const slugLinkedinUrl = getCompanyLinkedInProfileUrl(company);
                  const linkedinJobsUrl = getCompanyLinkedInJobsUrl(company);
                  const decisionMakerUrl = getLinkedInDecisionMakerSearchUrl(company);
                  const fresherJobsSearchUrl = getLinkedInFresherJobSearchUrl(company, "Hyderabad");

                  return (
                    <div
                      key={company.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-orange-300 hover:shadow-md transition flex flex-col justify-between gap-3 group"
                    >
                      <div>
                        {/* Header: Company Name, Badge & Package */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-600 transition">
                                {company.name}
                              </h3>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                {company.tier}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span className="font-medium text-slate-700">{company.fresherNote || "Hyderabad Tech Hub"}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 block font-mono">
                              {company.salaryPackage || "₹4.5 - ₹7.0 LPA"}
                            </span>
                            <span className="text-[10px] text-orange-600 font-bold block mt-0.5">
                              {company.speedToOffer || "Fast-Track (7-21 Days)"}
                            </span>
                          </div>
                        </div>

                        {/* Sector & Reason */}
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {company.fitReason}
                        </p>

                        {/* Recommended Roles */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {company.recommendedRoles.map((role, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                            >
                              {role}
                            </span>
                          ))}
                        </div>

                        {/* Skills */}
                        <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                          <span className="font-bold text-slate-700">Skills:</span>
                          {company.skills.slice(0, 4).map((s, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded-md font-semibold text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 1-Click Fast Attack Buttons */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          {/* Official Careers */}
                          <a
                            href={company.careerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1 text-[11px] transition"
                            title="Open Official Startup Career Portal"
                          >
                            <span>Careers</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>

                          {/* 1-Click Fresher Jobs */}
                          <a
                            href={fresherJobsSearchUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center gap-1 text-[11px] border border-blue-200 transition"
                            title="Direct 0-1 yr LinkedIn Jobs Filter"
                          >
                            <span>LinkedIn Jobs</span>
                            <ExternalLink className="w-3 h-3 text-blue-500" />
                          </a>

                          {/* Direct Founder / Lead Search */}
                          <a
                            href={decisionMakerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold flex items-center gap-1 text-[11px] border border-amber-200 transition"
                            title="Search Founders, CTOs, and Analytics Leads on LinkedIn"
                          >
                            <span>Find Founders/Leads</span>
                            <Search className="w-3 h-3 text-amber-600" />
                          </a>
                        </div>

                        {/* Open Pitch Modal */}
                        <button
                          onClick={() => onSelectCompanyForOutreach(company)}
                          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-xs transition cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Pitch Company</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: 14-DAY FAST OFFER BLUEPRINT */}
          {activeTab === "blueprint" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Top Banner: Why Startups Give Offers 5x Faster */}
              <div className="bg-linear-to-br from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                    <Zap className="w-5 h-5 text-amber-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-orange-950">
                      Why Hyderabad Startups Give Fast Calls & Offers (The 14-Day Advantage)
                    </h3>
                    <p className="text-xs text-orange-900 mt-1 leading-relaxed">
                      Mass IT services and giant MNCs have 4–6 interview rounds, campus hiring queues, and strict 6-month timelines. 
                      In contrast, <strong>Hyderabad startups hire because of immediate operational pain</strong>: dashboards are broken, queries are slow, or founders need weekly metric reports immediately. 
                      When you reach out with ready-to-run SQL code and 0-day notice period, you leapfrog thousands of applicants!
                    </p>
                  </div>
                </div>
              </div>

              {/* The 3 Unfair Advantages Manikanta Possesses */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold mb-2.5">
                    ⚡
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">1. Immediate Joining (0-Day Notice)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Most experienced analysts have 60 to 90 days notice periods. Startups hate waiting 3 months. Emphasize: <em>"Available to start immediately upon offer confirmation."</em>
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold mb-2.5">
                    📍
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">2. Hyderabad Local Presence</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    You reside locally in Hyderabad. You can offer: <em>"Available for an in-person technical round or live whiteboarding session in HITEC City / T-Hub / Gachibowli today."</em>
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold mb-2.5">
                    📊
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">3. Live Proof of Work</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Startups do not care about college brand—they care about dashboard proof. You have a live Blinkit quick commerce analysis, HR analytics model, and normalized SQL schema.
                  </p>
                </div>
              </div>

              {/* Day-by-Day 14-Day Sprint Routine */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Day-by-Day Sprint Routine to Secure 3–5 Startup Interviews
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white font-bold shrink-0">
                      Days 1–3
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">The Wellfound & Cutshort Blitz</strong>
                      <p className="text-slate-600 mt-0.5">
                        Apply to 15 Hyderabad startups on Wellfound and Cutshort. Customize the application note with: "Local in Hyderabad • 0-day notice • Live Power BI Dashboard Portfolio".
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold shrink-0">
                      Days 4–7
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">Direct Founder / Head of Data LinkedIn DMs</strong>
                      <p className="text-slate-600 mt-0.5">
                        Use the "Find Founders/Leads" button on each Hyderabad startup in this portal. Send 10 targeted InMails/connection notes per day using the Founder Script provided in Tab 4.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold shrink-0">
                      Days 8–10
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">T-Hub Phase 2 & HITEC City Open Networking</strong>
                      <p className="text-slate-600 mt-0.5">
                        Visit T-Hub Phase 2 in Knowledge City, Raidurg (open incubator events, startup demo days). Carry a tablet or laptop with your interactive dashboards loaded. Startup founders work directly out of T-Hub common areas!
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-bold shrink-0">
                      Days 11–14
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-bold">Rapid Technical Tests & Offer Closure</strong>
                      <p className="text-slate-600 mt-0.5">
                        Startups typically give a 24-hour SQL dataset test. Deliver it within 6 hours with clean documentation, DAX measures, and a 2-minute Loom/video presentation. Offers are released within 48 hours of test review.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOP 5 DIRECT FOUNDER PORTALS */}
          {activeTab === "portals" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-2">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Top 5 Direct Startup Hiring Channels for Hyderabad
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click to open verified, pre-filtered searches where startup founders review applications within 24–48 hours.
                </p>
              </div>

              {/* 1. Wellfound */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-orange-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-extrabold text-lg shrink-0">
                    W
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">Wellfound (Formerly AngelList)</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
                        Direct Founder Inboxes
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-xl">
                      The #1 global platform for venture-backed startups. In Wellfound, you apply with a personal note that founders and engineering leads read directly without an HR intermediary.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wellfound.com/jobs?location=Hyderabad&role=data-analyst"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs justify-center"
                >
                  <span>Launch Wellfound Hyderabad</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 2. Cutshort */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-orange-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-extrabold text-lg shrink-0">
                    C
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">Cutshort Hyderabad Tech Startups</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        60%+ Guaranteed Reply Rate
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-xl">
                      Cutshort requires recruiters and founders to respond within 48 hours or lose platform credits. Used extensively by Darwinbox, Keka HR, Zaggle, and StanPlus.
                    </p>
                  </div>
                </div>

                <a
                  href="https://cutshort.io/jobs/data-analyst-jobs-in-hyderabad"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs justify-center"
                >
                  <span>Launch Cutshort Hyderabad</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 3. LinkedIn 24h Feed */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-orange-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-extrabold text-lg shrink-0">
                    in
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">LinkedIn Past 24h Real-Time Hiring Posts</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                        Urgent Needs / Team Leads
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-xl">
                      Live posts from startup founders and team leads in Hyderabad saying "Looking for an immediate Data Analyst / Power BI fresher in Hyderabad". DM them directly within 2 hours!
                    </p>
                  </div>
                </div>

                <a
                  href='https://www.linkedin.com/search/results/content/?datePosted=%22past-24h%22&keywords=(%22hiring%22%20OR%20%22looking%20for%22)%20AND%20(%22Data%20Analyst%22%20OR%20%22Power%20BI%22)%20AND%20(%22Hyderabad%22)%20AND%20(%22immediate%22%20OR%20%22fresher%22%20OR%20%220-1%20years%22)&origin=GLOBAL_SEARCH_HEADER&sortBy=%22date_posted%22'
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs justify-center"
                >
                  <span>Launch 24h Live Search</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 4. T-Hub Phase 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-orange-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-extrabold text-lg shrink-0">
                    T
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">T-Hub Phase 2 & CIE IIIT-Hyderabad</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                        World's Largest Incubator
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-xl">
                      Address: Plot No 1/C, Sy No 83/1, Raidurg Panmaktha, Hyderabad Knowledge City, Serilingampally, Hyderabad, 500081. Email resume directly to <strong>careers@t-hub.co</strong>.
                    </p>
                  </div>
                </div>

                <a
                  href="https://t-hub.co/careers/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs justify-center"
                >
                  <span>Open T-Hub Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: FOUNDER DM & WHATSAPP SCRIPT */}
          {activeTab === "pitch" && (
            <div className="space-y-5 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Direct Founder / CTO Pitch (High Conversion)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Copy this pitch directly when messaging founders, CTOs, or Heads of Analytics on LinkedIn or email. It emphasizes your 0-day notice period and Hyderabad local presence.
                </p>
              </div>

              <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-lg border border-slate-800 relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Manikanta's Hyderabad Founder Pitch
                  </span>
                  <button
                    onClick={() => copyText(startupFounderPitch, "founder-pitch")}
                    className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === "founder-pitch" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed select-all">
                  {startupFounderPitch}
                </pre>
              </div>

              {/* Direct WhatsApp Share Link */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    WA
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">WhatsApp Direct Quick Share</h5>
                    <p className="text-[11px] text-emerald-800">
                      Instantly open WhatsApp with this pre-filled message to send to referrals or HR contacts.
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(startupFounderPitch)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0"
                >
                  <span>Share via WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-3.5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>HITEC City • Madhapur • Gachibowli • Financial District • T-Hub Phase 2</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onFilterHyderabadStartupsInDashboard();
                onClose();
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Filter All Hyderabad Startups in Portal</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
