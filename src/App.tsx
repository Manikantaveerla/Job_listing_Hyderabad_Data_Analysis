import React, { useState, useEffect, useMemo } from "react";
import {
  masterCompaniesList,
  allSectorsList,
  allTypesList,
  allTiersList,
  allDomainsList,
  allCitiesList,
} from "./data/companiesData";
import { candidateProfile } from "./data/candidateProfile";
import {
  ApplicationRecord,
  ApplicationStatus,
  Company,
  DailySprint,
  DailyJobPosting,
} from "./types";
import {
  getInitialApplicationRecords,
  saveApplicationRecords,
  getDailySprint,
  saveDailySprint,
  exportToCsv,
} from "./utils/storage";
import {
  getStoredDailyJobs,
  saveStoredDailyJobs,
} from "./data/dailyJobsData";

import { HeaderNav } from "./components/HeaderNav";
import { StatsDashboard } from "./components/StatsDashboard";
import { DailySprintCard } from "./components/DailySprintCard";
import { CompanyFilters } from "./components/CompanyFilters";
import { CompanyTable } from "./components/CompanyTable";
import { CompanyCardGrid } from "./components/CompanyCardGrid";
import { QuickAssetBar } from "./components/QuickAssetBar";
import { OutreachModal } from "./components/OutreachModal";
import { CompanyDetailModal } from "./components/CompanyDetailModal";
import { InterviewPrepModal } from "./components/InterviewPrepModal";
import { InterviewMasterHub } from "./components/InterviewMasterHub";
import { DailyJobsHub } from "./components/DailyJobsHub";
import { StrategyGuideModal } from "./components/StrategyGuideModal";
import { HyderabadStartupAcceleratorModal } from "./components/HyderabadStartupAcceleratorModal";

export default function App() {
  // 1. Navigation & View State
  const [activeNavTab, setActiveNavTab] = useState<"companies" | "daily-jobs" | "interview-hub">("companies");

  // 2. Persistent Records & Sprint State
  const [records, setRecords] = useState<Record<number, ApplicationRecord>>(() =>
    getInitialApplicationRecords()
  );
  const [sprint, setSprint] = useState<DailySprint>(() => getDailySprint());
  const [dailyJobs, setDailyJobs] = useState<DailyJobPosting[]>(() => getStoredDailyJobs());

  // 3. Filter & View State for Companies
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<"All" | "3-6 LPA" | "6-10 LPA">("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "All">("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [onlyFresherPriority, setOnlyFresherPriority] = useState<boolean>(false);
  const [onlyHyderabadStartups, setOnlyHyderabadStartups] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // 4. Modal States
  const [isQuickAssetsOpen, setIsQuickAssetsOpen] = useState(false);
  const [isInterviewPrepOpen, setIsInterviewPrepOpen] = useState(false);
  const [isStrategyGuideOpen, setIsStrategyGuideOpen] = useState(false);
  const [isHyderabadAcceleratorOpen, setIsHyderabadAcceleratorOpen] = useState(false);
  const [activeOutreachCompany, setActiveOutreachCompany] = useState<Company | null>(null);
  const [activeDetailCompany, setActiveDetailCompany] = useState<Company | null>(null);

  // 5. Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    saveApplicationRecords(records);
  }, [records]);

  useEffect(() => {
    saveDailySprint(sprint);
  }, [sprint]);

  useEffect(() => {
    saveStoredDailyJobs(dailyJobs);
  }, [dailyJobs]);

  // Handler: Update Record for a company
  const handleUpdateRecord = (
    companyId: number,
    updates: Partial<ApplicationRecord>
  ) => {
    setRecords((prev) => {
      const existing = prev[companyId] || {
        companyId,
        status: "Not Applied",
        lastUpdated: new Date().toISOString().split("T")[0],
      };

      const updatedStatus = updates.status || existing.status;
      const oldStatus = existing.status;

      // If status changed from "Not Applied" to an applied/in-progress state, increment daily sprint
      if (
        oldStatus === "Not Applied" &&
        (updatedStatus === "Applied" ||
          updatedStatus === "In Progress" ||
          updatedStatus === "Referral Requested")
      ) {
        setSprint((prevSprint) => {
          const nextApplied = prevSprint.appliedToday + 1;
          const isStreakEarned = nextApplied >= prevSprint.target && prevSprint.appliedToday < prevSprint.target;
          return {
            ...prevSprint,
            appliedToday: nextApplied,
            streak: isStreakEarned ? prevSprint.streak + 1 : prevSprint.streak,
          };
        });
      }

      return {
        ...prev,
        [companyId]: {
          ...existing,
          ...updates,
          companyId,
          lastUpdated: new Date().toISOString().split("T")[0],
        },
      };
    });

    const comp = masterCompaniesList.find((c) => c.id === companyId);
    if (updates.status) {
      showToast(`Updated ${comp?.name || "Company"} status to "${updates.status}"`);
    } else {
      showToast(`Saved record details for ${comp?.name || "Company"}`);
    }
  };

  // Quick Status change directly from table / grid
  const handleQuickUpdateStatus = (companyId: number, newStatus: ApplicationStatus) => {
    handleUpdateRecord(companyId, {
      status: newStatus,
      appliedDate:
        newStatus === "Not Applied"
          ? undefined
          : records[companyId]?.appliedDate || new Date().toISOString().split("T")[0],
    });
  };

  // Log Job Posting from Daily Radar to Master Tracker
  const handleLogJobToTracker = (job: DailyJobPosting, targetStatus: ApplicationStatus = "In Progress") => {
    if (job.companyId) {
      handleQuickUpdateStatus(job.companyId, targetStatus);
      showToast(`Logged "${job.roleTitle} at ${job.companyName}" to your Tracker as ${targetStatus}!`);
    } else {
      // Find by name in 500 list
      const matched = masterCompaniesList.find(
        (c) => c.name.toLowerCase() === job.companyName.toLowerCase()
      );
      if (matched) {
        handleQuickUpdateStatus(matched.id, targetStatus);
        showToast(`Logged "${job.roleTitle} at ${matched.name}" to your Tracker as ${targetStatus}!`);
      } else {
        // Increment sprint
        setSprint((prev) => ({ ...prev, appliedToday: prev.appliedToday + 1 }));
        showToast(`Logged "${job.roleTitle} at ${job.companyName}" to your daily count!`);
      }
    }
  };

  // Open outreach pitch for job
  const handleOpenOutreachForJob = (job: DailyJobPosting) => {
    if (job.companyId) {
      const comp = masterCompaniesList.find((c) => c.id === job.companyId);
      if (comp) {
        setActiveOutreachCompany(comp);
        return;
      }
    }

    const matched = masterCompaniesList.find(
      (c) => c.name.toLowerCase() === job.companyName.toLowerCase()
    );
    if (matched) {
      setActiveOutreachCompany(matched);
      return;
    }

    // Synthesize temporary company
    const syntheticComp: Company = {
      id: 9999,
      name: job.companyName,
      city: job.location.includes("Hyderabad") ? "Hyderabad" : "Bangalore",
      sector: job.tierCategory,
      type: "Startup",
      tier: "Enterprise Tech",
      domainGroup: "SaaS & Enterprise Cloud",
      careerUrl: job.applyUrl,
      fitReason: job.jobDescriptionSummary,
      isFresherPriority: true,
      skills: job.requiredSkills,
      recommendedRoles: [job.roleTitle],
    };
    setActiveOutreachCompany(syntheticComp);
  };

  // Add custom discovered job
  const handleAddCustomJob = (newJob: DailyJobPosting) => {
    setDailyJobs((prev) => [newJob, ...prev]);
    showToast(`Added "${newJob.roleTitle} at ${newJob.companyName}" to Daily Jobs Radar!`);
  };

  // Update Daily Sprint Target
  const handleUpdateSprintTarget = (newTarget: number) => {
    setSprint((prev) => ({
      ...prev,
      target: newTarget,
    }));
    showToast(`Updated daily goal to ${newTarget} applications/day`);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedPackage("All");
    setSelectedCity("All");
    setSelectedDomain("All");
    setSelectedSector("All");
    setSelectedStatus("All");
    setSelectedType("All");
    setSelectedTier("All");
    setOnlyFresherPriority(false);
    setOnlyHyderabadStartups(false);
  };

  // Filter Next 5 Unapplied in Queue
  const handleApplyNextQueue = () => {
    const unapplied = masterCompaniesList.filter(
      (c) => (records[c.id]?.status || "Not Applied") === "Not Applied"
    );

    if (unapplied.length === 0) {
      showToast("Awesome work! You have applied to all companies! 🎉");
      return;
    }

    const next5 = unapplied.slice(0, 5);
    const next5Names = next5.map((c) => c.name).join(", ");

    setSelectedStatus("Not Applied");
    setSearchQuery("");
    showToast(`Queued next priority companies: ${next5Names}`);
  };

  // Export CSV
  const handleExportCsv = () => {
    exportToCsv(records);
    showToast(`Exported Master ${masterCompaniesList.length} Application Tracker CSV!`);
  };

  // Reset all application data (with confirmation)
  const handleResetAllData = () => {
    if (window.confirm("Are you sure you want to reset all tracked application statuses back to default?")) {
      const resetRecords: Record<number, ApplicationRecord> = {};
      const today = new Date().toISOString().split("T")[0];
      masterCompaniesList.forEach((c) => {
        resetRecords[c.id] = {
          companyId: c.id,
          status: "Not Applied",
          lastUpdated: today,
        };
      });
      setRecords(resetRecords);
      showToast("Reset all application records to default.");
    }
  };

  // Count total applied
  const appliedCount = useMemo(() => {
    return (Object.values(records) as ApplicationRecord[]).filter(
      (r) =>
        r.status === "Applied" ||
        r.status === "Referral Requested" ||
        r.status === "Online Assessment" ||
        r.status === "Interview Scheduled" ||
        r.status === "Offer Received"
    ).length;
  }, [records]);

  // Filtered List Computation
  const filteredCompanies = useMemo(() => {
    return masterCompaniesList.filter((company) => {
      // 0. Package / Salary Priority filter
      if (selectedPackage !== "All" && company.packageCategory !== selectedPackage) {
        return false;
      }

      // 0.1 Fresher priority filter
      if (onlyFresherPriority && !company.isFresherPriority) {
        return false;
      }

      // 0.2 Hyderabad Startups only filter
      if (onlyHyderabadStartups) {
        const isHydStartup =
          company.city === "Hyderabad" &&
          (company.type === "Startup" ||
            company.type === "Small" ||
            company.type === "Small-Mid" ||
            company.type === "Mid-Sized" ||
            company.tier === "Fast-Growing Startup" ||
            company.tier === "Indian Unicorn & High-Growth SaaS" ||
            company.id >= 501);
        if (!isHydStartup) {
          return false;
        }
      }

      // 1. Tier / Category filter
      if (selectedTier !== "All" && company.tier !== selectedTier) {
        return false;
      }

      // 2. City filter
      if (selectedCity !== "All" && company.city !== selectedCity) {
        return false;
      }

      // 3. Domain filter
      if (selectedDomain !== "All" && company.domainGroup !== selectedDomain) {
        return false;
      }

      // 4. Sector filter
      if (selectedSector !== "All" && company.sector !== selectedSector) {
        return false;
      }

      // 5. Scale/Type filter
      if (selectedType !== "All" && company.type !== selectedType) {
        return false;
      }

      // 6. Status filter
      const record = records[company.id];
      const status = record?.status || "Not Applied";
      if (selectedStatus !== "All" && status !== selectedStatus) {
        return false;
      }

      // 7. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(q);
        const matchesSector = company.sector.toLowerCase().includes(q);
        const matchesFit = company.fitReason.toLowerCase().includes(q);
        const matchesCity = company.city.toLowerCase().includes(q);
        const matchesType = company.type.toLowerCase().includes(q);
        const matchesTier = company.tier?.toLowerCase().includes(q) || false;
        const matchesDomain = company.domainGroup?.toLowerCase().includes(q) || false;
        const matchesSkills = company.skills?.some(s => s.toLowerCase().includes(q)) || false;
        const matchesRoles = company.recommendedRoles?.some(r => r.toLowerCase().includes(q)) || false;
        const matchesNotes = record?.notes?.toLowerCase().includes(q) || false;
        const matchesJobId = record?.jobId?.toLowerCase().includes(q) || false;

        return (
          matchesName ||
          matchesSector ||
          matchesFit ||
          matchesCity ||
          matchesType ||
          matchesTier ||
          matchesDomain ||
          matchesSkills ||
          matchesRoles ||
          matchesNotes ||
          matchesJobId
        );
      }

      return true;
    });
  }, [
    records,
    selectedCity,
    selectedDomain,
    selectedSector,
    selectedType,
    selectedTier,
    onlyFresherPriority,
    onlyHyderabadStartups,
    selectedStatus,
    searchQuery,
  ]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* 1. Header Navigation */}
      <HeaderNav
        activeTab={activeNavTab}
        onSelectTab={setActiveNavTab}
        onOpenQuickAssets={() => setIsQuickAssetsOpen(true)}
        onOpenInterviewPrep={() => setIsInterviewPrepOpen(true)}
        onOpenStrategyGuide={() => setIsStrategyGuideOpen(true)}
        onOpenHyderabadAccelerator={() => setIsHyderabadAcceleratorOpen(true)}
        onExportCsv={handleExportCsv}
        appliedCount={appliedCount}
        totalCount={masterCompaniesList.length}
      />

      {/* 2. Main Body Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* VIEW 1: 500 Target Companies Directory */}
        {activeNavTab === "companies" && (
          <div className="space-y-6">
            {/* Daily Sprint Card */}
            <DailySprintCard
              sprint={sprint}
              totalApplied={appliedCount}
              totalCompanies={masterCompaniesList.length}
              onUpdateTarget={handleUpdateSprintTarget}
              onApplyNextQueue={handleApplyNextQueue}
            />

            {/* Application Funnel & Stats Dashboard */}
            <StatsDashboard
              records={records}
              onFilterStatus={(s) => setSelectedStatus(s)}
              onFilterCity={(c) => setSelectedCity(c)}
            />

            {/* Filter Toolbar */}
            <CompanyFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              allCities={allCitiesList}
              selectedDomain={selectedDomain}
              onDomainChange={setSelectedDomain}
              allDomains={allDomainsList}
              selectedSector={selectedSector}
              onSectorChange={setSelectedSector}
              allSectors={allSectorsList}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              allTypes={allTypesList}
              selectedTier={selectedTier}
              onTierChange={setSelectedTier}
              allTiers={allTiersList}
              onlyFresherPriority={onlyFresherPriority}
              onToggleFresherPriority={() => setOnlyFresherPriority((prev) => !prev)}
              onlyHyderabadStartups={onlyHyderabadStartups}
              onToggleHyderabadStartups={() => setOnlyHyderabadStartups((prev) => !prev)}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onResetFilters={handleResetFilters}
              filteredCount={filteredCompanies.length}
              totalCount={masterCompaniesList.length}
            />

            {/* Company List Display (Table or Grid) */}
            {viewMode === "table" ? (
              <CompanyTable
                companies={filteredCompanies}
                records={records}
                onSelectCompany={(company) => setActiveDetailCompany(company)}
                onOpenOutreach={(company) => setActiveOutreachCompany(company)}
                onQuickUpdateStatus={handleQuickUpdateStatus}
              />
            ) : (
              <CompanyCardGrid
                companies={filteredCompanies}
                records={records}
                onSelectCompany={(company) => setActiveDetailCompany(company)}
                onOpenOutreach={(company) => setActiveOutreachCompany(company)}
                onQuickUpdateStatus={handleQuickUpdateStatus}
              />
            )}
          </div>
        )}

        {/* VIEW 2: Daily Jobs Radar & ATS Scanners */}
        {activeNavTab === "daily-jobs" && (
          <DailyJobsHub
            dailyJobs={dailyJobs}
            companies={masterCompaniesList}
            records={records}
            onLogJobToTracker={handleLogJobToTracker}
            onOpenOutreachForJob={handleOpenOutreachForJob}
            onAddCustomJob={handleAddCustomJob}
            onOpenStrategyGuide={() => setIsStrategyGuideOpen(true)}
          />
        )}

        {/* VIEW 3: Interview Master Hub */}
        {activeNavTab === "interview-hub" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <InterviewMasterHub isOpen={true} />
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Data Analyst Master Portal • Tailored for <strong>Manikanta Veerla</strong> (2026 Batch)
          </span>
          <div className="flex items-center gap-4">
            <button
              id="footer-open-guide-btn"
              onClick={() => setIsStrategyGuideOpen(true)}
              className="text-blue-700 hover:text-blue-900 font-semibold transition text-[11px] cursor-pointer"
            >
              30-Min Strategy Blueprint
            </button>
            <span>•</span>
            <button
              id="footer-hyd-startups-btn"
              onClick={() => setIsHyderabadAcceleratorOpen(true)}
              className="text-orange-600 hover:text-orange-800 font-bold transition text-[11px] cursor-pointer flex items-center gap-1"
            >
              ⚡ Hyderabad Startups Accelerator
            </button>
            <span>•</span>
            <button
              id="footer-reset-data-btn"
              onClick={handleResetAllData}
              className="text-slate-500 hover:text-slate-800 transition text-[11px] cursor-pointer"
            >
              Reset Application Data
            </button>
            <span>•</span>
            <span className="text-blue-700 font-bold font-mono">{masterCompaniesList.length}+ Tech Companies</span>
          </div>
        </div>
      </footer>

      {/* 4. Modals & Drawers */}
      <QuickAssetBar
        isOpen={isQuickAssetsOpen}
        onClose={() => setIsQuickAssetsOpen(false)}
      />

      <InterviewPrepModal
        isOpen={isInterviewPrepOpen}
        onClose={() => setIsInterviewPrepOpen(false)}
      />

      <StrategyGuideModal
        isOpen={isStrategyGuideOpen}
        onClose={() => setIsStrategyGuideOpen(false)}
        onNavigateToJobsRadar={() => {
          setIsStrategyGuideOpen(false);
          setActiveNavTab("daily-jobs");
        }}
        onNavigateToInterviewHub={() => {
          setIsStrategyGuideOpen(false);
          setActiveNavTab("interview-hub");
        }}
      />

      <HyderabadStartupAcceleratorModal
        isOpen={isHyderabadAcceleratorOpen}
        onClose={() => setIsHyderabadAcceleratorOpen(false)}
        onSelectCompanyForOutreach={(company) => {
          setIsHyderabadAcceleratorOpen(false);
          setActiveOutreachCompany(company);
        }}
        onFilterHyderabadStartupsInDashboard={() => {
          setOnlyHyderabadStartups(true);
          setSelectedCity("Hyderabad");
          setSelectedStatus("All");
          setActiveNavTab("companies");
          showToast("Filtered dashboard to 52+ Fast-Hiring Hyderabad Startups!");
        }}
      />

      <OutreachModal
        company={activeOutreachCompany}
        isOpen={!!activeOutreachCompany}
        onClose={() => setActiveOutreachCompany(null)}
        onUpdateStatus={handleQuickUpdateStatus}
      />

      <CompanyDetailModal
        company={activeDetailCompany}
        record={activeDetailCompany ? records[activeDetailCompany.id] || null : null}
        isOpen={!!activeDetailCompany}
        onClose={() => setActiveDetailCompany(null)}
        onSaveRecord={handleUpdateRecord}
        onOpenOutreach={(comp) => setActiveOutreachCompany(comp)}
      />

      {/* 5. Floating Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}

