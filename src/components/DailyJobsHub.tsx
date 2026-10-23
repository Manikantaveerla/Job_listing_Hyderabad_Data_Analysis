import React, { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Flame,
  Briefcase,
  Sparkles,
  Plus,
  Compass,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  DollarSign,
  Layers,
  Send,
  Zap,
  Filter,
  RefreshCw,
  Copy,
  Check,
  Globe,
  Sliders,
  BookmarkCheck,
  AlertCircle,
  HelpCircle,
  Linkedin,
} from "lucide-react";
import { DailyJobPosting, Company, ApplicationRecord, ApplicationStatus } from "../types";
import { liveAtsScanners, generateCustomGoogleDork } from "../data/dailyJobsData";
import { candidateProfile } from "../data/candidateProfile";
import { getCompanyLinkedInProfileUrl } from "../data/companiesData";

interface DailyJobsHubProps {
  dailyJobs: DailyJobPosting[];
  companies: Company[];
  records: Record<number, ApplicationRecord>;
  onLogJobToTracker: (job: DailyJobPosting, status?: ApplicationStatus) => void;
  onOpenOutreachForJob: (job: DailyJobPosting) => void;
  onAddCustomJob: (newJob: DailyJobPosting) => void;
  onOpenStrategyGuide: () => void;
}

export const DailyJobsHub: React.FC<DailyJobsHubProps> = ({
  dailyJobs,
  companies,
  records,
  onLogJobToTracker,
  onOpenOutreachForJob,
  onAddCustomJob,
  onOpenStrategyGuide,
}) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  // Custom Job Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newJobCompany, setNewJobCompany] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobLocation, setNewJobLocation] = useState("Hyderabad / Bangalore");
  const [newJobExp, setNewJobExp] = useState("0-1 years / Fresher (2026 Batch)");
  const [newJobCategory, setNewJobCategory] = useState("Global Capability Center (GCC)");
  const [newJobAts, setNewJobAts] = useState<DailyJobPosting["atsPlatform"]>("Workday");
  const [newJobUrl, setNewJobUrl] = useState("");
  const [newJobSkills, setNewJobSkills] = useState("SQL, Power BI, Python, Excel");
  const [newJobSalary, setNewJobSalary] = useState("₹8.0 - ₹12.0 LPA");
  const [newJobSummary, setNewJobSummary] = useState("");

  // Dork Generator States
  const [dorkRole, setDorkRole] = useState('"Data Analyst" OR "BI Analyst"');
  const [dorkCity, setDorkCity] = useState("Hyderabad, Bangalore");
  const [dorkAts, setDorkAts] = useState("all");
  const [copiedDork, setCopiedDork] = useState(false);
  const [isDorkExpanded, setIsDorkExpanded] = useState(false);

  // Candidate core skills for match calculation
  const candidateSkillsList = useMemo(() => {
    return [
      ...candidateProfile.skills.core,
      ...candidateProfile.skills.databases,
      ...candidateProfile.skills.bi,
      ...candidateProfile.skills.programming,
      ...candidateProfile.skills.certifications,
    ].map((s) => s.toLowerCase());
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return dailyJobs.filter((job) => {
      // 1. City
      if (selectedCity !== "All") {
        if (!job.location.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== "All" && job.tierCategory !== selectedCategory) {
        return false;
      }

      // 3. Skill
      if (selectedSkill !== "All") {
        const hasSkill = job.requiredSkills.some((s) =>
          s.toLowerCase().includes(selectedSkill.toLowerCase())
        );
        if (!hasSkill) return false;
      }

      // 4. Urgent
      if (onlyUrgent && !job.isUrgent) {
        return false;
      }

      // 5. Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesComp = job.companyName.toLowerCase().includes(q);
        const matchesTitle = job.roleTitle.toLowerCase().includes(q);
        const matchesDesc = job.jobDescriptionSummary.toLowerCase().includes(q);
        const matchesSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(q));
        const matchesLoc = job.location.toLowerCase().includes(q);

        if (!matchesComp && !matchesTitle && !matchesDesc && !matchesSkills && !matchesLoc) {
          return false;
        }
      }

      return true;
    });
  }, [dailyJobs, selectedCity, selectedCategory, selectedSkill, onlyUrgent, searchQuery]);

  // Handle Add Custom Job Form
  const handleSaveCustomJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobCompany.trim() || !newJobTitle.trim()) return;

    const matchedComp = companies.find(
      (c) => c.name.toLowerCase() === newJobCompany.trim().toLowerCase()
    );

    const skillsArray = newJobSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const customJob: DailyJobPosting = {
      id: `custom-job-${Date.now()}`,
      companyName: newJobCompany.trim(),
      companyId: matchedComp ? matchedComp.id : undefined,
      roleTitle: newJobTitle.trim(),
      location: newJobLocation.trim(),
      experienceLevel: newJobExp.trim(),
      postedDate: "Today",
      tierCategory: newJobCategory,
      requiredSkills: skillsArray.length > 0 ? skillsArray : ["SQL", "Power BI", "Excel"],
      salaryRange: newJobSalary.trim() || undefined,
      atsPlatform: newJobAts,
      applyUrl:
        newJobUrl.trim() ||
        `https://www.google.com/search?q=${encodeURIComponent(newJobCompany + " careers " + newJobTitle)}`,
      jobDescriptionSummary:
        newJobSummary.trim() ||
        `Direct fresher Data Analyst role at ${newJobCompany}. Analyzing datasets, writing SQL queries, and creating Power BI reports.`,
      fresherHiringType: "Direct Entry-Level",
      isUrgent: true,
    };

    onAddCustomJob(customJob);
    setIsAddModalOpen(false);

    // Reset Form
    setNewJobCompany("");
    setNewJobTitle("");
    setNewJobSummary("");
    setNewJobUrl("");
  };

  // Generated Dork URL
  const generatedDorkUrl = useMemo(() => {
    const cities = dorkCity.split(",").map((c) => c.trim()).filter(Boolean);
    return generateCustomGoogleDork({
      roleKeywords: dorkRole,
      targetCities: cities,
      skills: ["SQL", "Power BI"],
      batchYear: "2026",
      atsFilter: dorkAts === "all" ? undefined : dorkAts,
    });
  }, [dorkRole, dorkCity, dorkAts]);

  const handleCopyDork = () => {
    navigator.clipboard.writeText(generatedDorkUrl);
    setCopiedDork(true);
    setTimeout(() => setCopiedDork(false), 2000);
  };

  return (
    <div id="daily-jobs-hub-container" className="space-y-6">
      {/* Top Banner: Daily Strategy + Quick Scan Controls */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-950 border border-slate-800 rounded-3xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
              Live Fresher Jobs Radar & ATS Scanners
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Daily Job Openings & 1-Click ATS Scanners
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track live 2026 fresher & entry-level Data Analyst vacancies across 500 target companies.
              Run instant X-Ray scans on Workday GCCs, Greenhouse unicorns, and live LinkedIn manager hiring posts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="open-strategy-guide-btn"
              onClick={onOpenStrategyGuide}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Compass className="w-4 h-4" /> 30-Min Daily Job Playbook
            </button>

            <button
              id="open-add-job-modal-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Post / Log Discovered Job
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Live 1-Click ATS X-Ray Scanners (Instant Google Dorks) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Live ATS X-Ray Scanners (Find Fresh Postings in Seconds)
            </h3>
          </div>
          <button
            id="toggle-dork-builder-btn"
            onClick={() => setIsDorkExpanded(!isDorkExpanded)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            {isDorkExpanded ? "Hide Query Generator" : "Custom Dork Generator"}
          </button>
        </div>

        {/* ATS Scanner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {liveAtsScanners.map((scanner) => (
            <div
              key={scanner.id}
              id={`scanner-card-${scanner.id}`}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                    {scanner.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {scanner.platform.split(" ")[0]}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition line-clamp-1">
                  {scanner.title}
                </h4>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {scanner.description}
                </p>

                <div className="mt-2 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Target:</strong> {scanner.targetCompanyTypes}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500 italic">
                  {scanner.frequencyRecommendation}
                </span>

                <a
                  id={`launch-scanner-${scanner.id}-btn`}
                  href={scanner.searchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs"
                >
                  Scan Now <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible Custom Dork Query Generator */}
        {isDorkExpanded && (
          <div
            id="custom-dork-generator-box"
            className="bg-slate-50 border border-slate-300 rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Custom Boolean ATS Dork Generator (Google Search)
              </h4>
              <span className="text-[11px] text-slate-500">
                Pulls all matching job URLs across indexable portals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target Roles:</label>
                <input
                  type="text"
                  value={dorkRole}
                  onChange={(e) => setDorkRole(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                  placeholder='"Data Analyst" OR "BI Analyst"'
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target Locations:</label>
                <input
                  type="text"
                  value={dorkCity}
                  onChange={(e) => setDorkCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                  placeholder="Hyderabad, Bangalore, Remote"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target ATS Portal:</label>
                <select
                  value={dorkAts}
                  onChange={(e) => setDorkAts(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer font-medium"
                >
                  <option value="all">All Web / Open Portals</option>
                  <option value="workday">Workday (myworkdayjobs.com)</option>
                  <option value="greenhouse">Greenhouse (boards.greenhouse.io)</option>
                  <option value="lever">Lever (jobs.lever.co)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200">
              <div className="text-xs text-slate-600 font-mono truncate max-w-xl">
                {generatedDorkUrl}
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="copy-dork-url-btn"
                  onClick={handleCopyDork}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedDork ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Query
                    </>
                  )}
                </button>

                <a
                  id="launch-generated-dork-btn"
                  href={generatedDorkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                >
                  Launch Google Search <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Daily Live Fresher Openings Board */}
      <div className="space-y-4">
        {/* Filters Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="daily-jobs-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live openings by company (Novartis, JPMorgan), role title, or skills (Power BI, SQL, DAX)..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition"
              />
            </div>

            {/* City Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 overflow-x-auto">
              {["All", "Hyderabad", "Bangalore", "Chennai", "Pune"].map((city) => (
                <button
                  key={city}
                  id={`daily-city-filter-${city.toLowerCase()}-btn`}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    selectedCity === city
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {city === "All" ? "All Locations" : city}
                </button>
              ))}
            </div>
          </div>

          {/* Second Row: Dropdowns & Urgent Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-semibold">Category:</span>
                <select
                  id="daily-category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Global Capability Center (GCC)">Global Capability Center (GCC)</option>
                  <option value="Indian Unicorn & High-Growth SaaS">Indian Unicorn & SaaS</option>
                  <option value="HealthTech & BioPharma">HealthTech & BioPharma</option>
                  <option value="Boutique Analytics">Boutique Analytics</option>
                  <option value="Semiconductor & Embedded Systems">Semiconductors & DeepTech</option>
                </select>
              </div>

              {/* Skill Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-semibold">Core Skill:</span>
                <select
                  id="daily-skill-select"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer"
                >
                  <option value="All">All Skills</option>
                  <option value="SQL">SQL (Advanced / CTEs)</option>
                  <option value="Power BI">Power BI & DAX</option>
                  <option value="Python">Python (Pandas)</option>
                  <option value="ServiceNow">ServiceNow SLA / CSA</option>
                  <option value="Excel">Advanced Excel</option>
                  <option value="Tableau">Tableau</option>
                </select>
              </div>

              {/* Urgent Toggle */}
              <button
                id="daily-urgent-toggle-btn"
                onClick={() => setOnlyUrgent(!onlyUrgent)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition border cursor-pointer ${
                  onlyUrgent
                    ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                    : "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${onlyUrgent ? "fill-current" : ""}`} /> Urgent Hiring Only
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-xs">
              <span>
                Showing <strong className="text-slate-900">{filteredJobs.length}</strong> live fresher openings
              </span>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-600 shadow-xs">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">No job postings found matching criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting filters or click "Scan Now" on the ATS scanners above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              // Check if already tracked in records
              const trackedRecord = job.companyId ? records[job.companyId] : null;
              const isAlreadyApplied = trackedRecord && trackedRecord.status !== "Not Applied";

              // Skill Match Calculation
              const matchedCount = job.requiredSkills.filter((s) =>
                candidateSkillsList.some((cs) => cs.includes(s.toLowerCase()))
              ).length;
              const matchPercent = Math.round((matchedCount / job.requiredSkills.length) * 100);

              return (
                <div
                  key={job.id}
                  id={`daily-job-card-${job.id}`}
                  className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Badges & Posted Time */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold">
                          {job.tierCategory}
                        </span>

                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                          ATS: {job.atsPlatform}
                        </span>

                        {job.isUrgent && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                            <Flame className="w-2.5 h-2.5 fill-rose-600 text-rose-600" /> Urgent
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 shrink-0 font-medium">
                        <Clock className="w-3 h-3" /> {job.postedDate}
                      </div>
                    </div>

                    {/* Role Title & Company */}
                    <div className="mb-2">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                        {job.roleTitle}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {job.companyName}
                        </span>
                        <a
                          id={`daily-job-company-linkedin-${job.id}`}
                          href={getCompanyLinkedInProfileUrl(job.companyName)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] border border-[#0a66c2]/30 text-[10px] font-bold transition"
                          title={`Open ${job.companyName} LinkedIn Company Profile`}
                        >
                          <Linkedin className="w-2.5 h-2.5 fill-current" /> in Page
                        </a>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        {job.salaryRange && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-emerald-700 font-bold">
                              <DollarSign className="w-3.5 h-3.5" />
                              {job.salaryRange}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Experience & Hiring Type */}
                    <div className="inline-block px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium mb-3">
                      🎓 <strong>Target Profile:</strong> {job.experienceLevel} ({job.fresherHiringType})
                    </div>

                    {/* JD Summary */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                      {job.jobDescriptionSummary}
                    </p>

                    {/* Required Skills & Profile Match */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-700">Required Skills:</span>
                        <span
                          className={`font-bold px-1.5 py-0.2 rounded-md text-[10px] ${
                            matchPercent >= 80
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {matchPercent}% Profile Match
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {job.requiredSkills.map((skill, sIdx) => {
                          const isMatched = candidateSkillsList.some((cs) =>
                            cs.includes(skill.toLowerCase())
                          );
                          return (
                            <span
                              key={sIdx}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                isMatched
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              {skill} {isMatched && "✓"}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    {/* Status Badge if already tracked */}
                    {isAlreadyApplied ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Tracked: {trackedRecord?.status}
                      </div>
                    ) : (
                      <button
                        id={`log-job-btn-${job.id}`}
                        onClick={() => onLogJobToTracker(job, "In Progress")}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-slate-300"
                        title="Add this opening to your Master Tracker"
                      >
                        <BookmarkCheck className="w-3.5 h-3.5 text-slate-600" /> Log to Tracker
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      {/* Outreach Pitch Trigger */}
                      <button
                        id={`job-outreach-btn-${job.id}`}
                        onClick={() => onOpenOutreachForJob(job)}
                        className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        title="Generate personalized cold email / LinkedIn message"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-700" /> Pitch
                      </button>

                      {/* Direct Apply ATS Button */}
                      <a
                        id={`job-apply-link-${job.id}`}
                        href={job.applyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                      >
                        Apply Now <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Add Custom Discovered Job */}
      {isAddModalOpen && (
        <div
          id="add-custom-job-modal-backdrop"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
        >
          <div
            id="add-custom-job-modal"
            className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  +
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Log Discovered Fresher Opening</h3>
                  <p className="text-xs text-slate-500">Add a job found via LinkedIn or company career portal</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustomJob} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                    placeholder="e.g. Novartis, Swiggy, Amazon"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="e.g. Associate Data Analyst"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    placeholder="Hyderabad / Bangalore"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category / Tier</label>
                  <select
                    value={newJobCategory}
                    onChange={(e) => setNewJobCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs cursor-pointer"
                  >
                    <option value="Global Capability Center (GCC)">Global Capability Center (GCC)</option>
                    <option value="Tier 1 Product MNC">Tier 1 Product MNC</option>
                    <option value="Indian Unicorn & High-Growth SaaS">Indian Unicorn & SaaS</option>
                    <option value="HealthTech & BioPharma">HealthTech & BioPharma</option>
                    <option value="Boutique Analytics">Boutique Analytics</option>
                    <option value="Semiconductor & Embedded Systems">Semiconductors</option>
                    <option value="IT Services & Digital Engineering">IT Services & Digital</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ATS Portal</label>
                  <select
                    value={newJobAts}
                    onChange={(e) => setNewJobAts(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs cursor-pointer"
                  >
                    <option value="Workday">Workday</option>
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Lever">Lever</option>
                    <option value="Direct Career">Direct Career</option>
                    <option value="LinkedIn Post">LinkedIn Post</option>
                    <option value="Phenom">Phenom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Estimated CTC / Salary</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    placeholder="e.g. ₹8.0 - ₹12.0 LPA"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newJobSkills}
                  onChange={(e) => setNewJobSkills(e.target.value)}
                  placeholder="SQL, Power BI, DAX, Python, Excel, ServiceNow"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Direct Job / Apply URL</label>
                <input
                  type="url"
                  value={newJobUrl}
                  onChange={(e) => setNewJobUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Job Description Notes</label>
                <textarea
                  rows={3}
                  value={newJobSummary}
                  onChange={(e) => setNewJobSummary(e.target.value)}
                  placeholder="Key responsibilities, team details, or interview rounds mentioned in JD..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                >
                  Save Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
