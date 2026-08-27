import React, { useState, useEffect, useMemo } from "react";
import { masterCompaniesList, allSectorsList, allTypesList, allTiersList } from "./data/companiesData";
import { candidateProfile } from "./data/candidateProfile";
import {
  ApplicationRecord,
  ApplicationStatus,
  Company,
  DailySprint,
} from "./types";
import {
  getInitialApplicationRecords,
  saveApplicationRecords,
  getDailySprint,
  saveDailySprint,
  exportToCsv,
} from "./utils/storage";

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

export default function App() {
  // 1. Persistent Records & Sprint State
  const [records, setRecords] = useState<Record<number, ApplicationRecord>>(() =>
    getInitialApplicationRecords()
  );
  const [sprint, setSprint] = useState<DailySprint>(() => getDailySprint());

  // 2. Filter & View State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<"All" | "Hyderabad" | "Bangalore">("All");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "All">("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [onlyFresherPriority, setOnlyFresherPriority] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // 3. Modal States
  const [isQuickAssetsOpen, setIsQuickAssetsOpen] = useState(false);
  const [isInterviewPrepOpen, setIsInterviewPrepOpen] = useState(false);
  const [activeOutreachCompany, setActiveOutreachCompany] = useState<Company | null>(null);
  const [activeDetailCompany, setActiveDetailCompany] = useState<Company | null>(null);

  // 4. Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    saveApplicationRecords(records);
  }, [records]);

  useEffect(() => {
    saveDailySprint(sprint);
  }, [sprint]);

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
    setSelectedCity("All");
    setSelectedSector("All");
    setSelectedStatus("All");
    setSelectedType("All");
    setSelectedTier("All");
    setOnlyFresherPriority(false);
  };

  // Filter Next 5 Unapplied in Queue
  const handleApplyNextQueue = () => {
    // Find unapplied companies
    const unapplied = masterCompaniesList.filter(
      (c) => (records[c.id]?.status || "Not Applied") === "Not Applied"
    );

    if (unapplied.length === 0) {
      showToast("Awesome work! You have applied to all companies! 🎉");
      return;
    }

    const next5 = unapplied.slice(0, 5);
    const next5Names = next5.map((c) => c.name).join(", ");

    // Focus view on these
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
      // 0. Fresher priority filter
      if (onlyFresherPriority && !company.isFresherPriority) {
        return false;
      }

      // 1. Tier / Category filter
      if (selectedTier !== "All" && company.tier !== selectedTier) {
        return false;
      }

      // 2. City filter
      if (selectedCity !== "All" && company.city !== selectedCity) {
        return false;
      }

      // 3. Sector filter
      if (selectedSector !== "All" && company.sector !== selectedSector) {
        return false;
      }

      // 4. Scale/Type filter
      if (selectedType !== "All" && company.type !== selectedType) {
        return false;
      }

      // 5. Status filter
      const record = records[company.id];
      const status = record?.status || "Not Applied";
      if (selectedStatus !== "All" && status !== selectedStatus) {
        return false;
      }

      // 6. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(q);
        const matchesSector = company.sector.toLowerCase().includes(q);
        const matchesFit = company.fitReason.toLowerCase().includes(q);
        const matchesCity = company.city.toLowerCase().includes(q);
        const matchesType = company.type.toLowerCase().includes(q);
        const matchesTier = company.tier?.toLowerCase().includes(q) || false;
        const matchesNotes = record?.notes?.toLowerCase().includes(q) || false;
        const matchesJobId = record?.jobId?.toLowerCase().includes(q) || false;

        return (
          matchesName ||
          matchesSector ||
          matchesFit ||
          matchesCity ||
          matchesType ||
          matchesTier ||
          matchesNotes ||
          matchesJobId
        );
      }

      return true;
    });
  }, [
    records,
    selectedCity,
    selectedSector,
    selectedType,
    selectedTier,
    onlyFresherPriority,
    selectedStatus,
    searchQuery,
  ]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* 1. Header Navigation */}
      <HeaderNav
        onOpenQuickAssets={() => setIsQuickAssetsOpen(true)}
        onOpenInterviewPrep={() => setIsInterviewPrepOpen(true)}
        onExportCsv={handleExportCsv}
        onResetAllData={handleResetAllData}
        appliedCount={appliedCount}
        totalCount={masterCompaniesList.length}
      />

      {/* 2. Main Body Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
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
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
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
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Data Analyst Master Portal • Built for <strong>Manikanta Veerla & Vijulu</strong> (2026 Batch)
          </span>
          <div className="flex items-center gap-4">
            <button
              id="footer-reset-data-btn"
              onClick={handleResetAllData}
              className="text-slate-500 hover:text-slate-800 transition text-[11px] cursor-pointer"
            >
              Reset Application Data
            </button>
            <span>•</span>
            <span className="text-blue-700 font-bold font-mono">148 Hyderabad & Bangalore Target Companies</span>
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
