import React from "react";
import {
  Briefcase,
  Download,
  BookOpen,
  Copy,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
  Compass,
  Zap,
  Building2,
} from "lucide-react";
import { candidateProfile } from "../data/candidateProfile";

interface HeaderNavProps {
  activeTab: "companies" | "daily-jobs" | "interview-hub";
  onSelectTab: (tab: "companies" | "daily-jobs" | "interview-hub") => void;
  onOpenQuickAssets: () => void;
  onOpenInterviewPrep: () => void;
  onOpenStrategyGuide: () => void;
  onOpenHyderabadAccelerator?: () => void;
  onExportCsv: () => void;
  appliedCount: number;
  totalCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickAssets,
  onOpenInterviewPrep,
  onOpenStrategyGuide,
  onOpenHyderabadAccelerator,
  onExportCsv,
  appliedCount,
  totalCount,
}) => {
  return (
    <header
      id="main-app-header"
      className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Branding & Candidate Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 via-indigo-600 to-orange-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 font-bold text-xs">
            550+
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight">
                Data Analyst Master Application Portal
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold">
                2026 Fresher Edition
              </span>
              <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-bold">
                ⚡ 52+ Hyderabad Startups
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span className="text-slate-900 font-semibold">{candidateProfile.fullName}</span>
              <span>•</span>
              <span className="text-blue-700 font-medium">{totalCount}+ Tech Companies & Startups</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">Hyderabad Hub</span>
              <span>•</span>
              <a
                href={candidateProfile.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-blue-700 font-medium underline flex items-center gap-0.5"
              >
                Portfolio <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Center: Main View Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto">
          <button
            id="nav-tab-companies-btn"
            onClick={() => onSelectTab("companies")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === "companies"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>500 Target Companies</span>
          </button>

          <button
            id="nav-tab-daily-jobs-btn"
            onClick={() => onSelectTab("daily-jobs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === "daily-jobs"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Daily Jobs Radar</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeTab === "daily-jobs" ? "bg-white/20 text-white" : "bg-rose-100 text-rose-700"
              }`}
            >
              ATS Scanners
            </span>
          </button>

          <button
            id="nav-tab-interview-hub-btn"
            onClick={() => onSelectTab("interview-hub")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === "interview-hub"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interview Master Hub</span>
          </button>
        </div>

        {/* Right: Key Action Toolbars */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Hyderabad Startups Accelerator Trigger */}
          <button
            id="nav-hyd-accelerator-btn"
            onClick={onOpenHyderabadAccelerator}
            className="px-3 py-2 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            title="Fast-Track 14-Day Offer Accelerator for 52+ Hyderabad Startups"
          >
            <Zap className="w-3.5 h-3.5 text-amber-200 fill-current" />
            <span>⚡ Hyderabad Startups</span>
            <span className="bg-black/25 text-[10px] px-1.5 py-0.2 rounded-full font-black">52+</span>
          </button>

          {/* Strategy Guide Trigger */}
          <button
            id="nav-strategy-guide-btn"
            onClick={onOpenStrategyGuide}
            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            title="Step-by-step 30-minute daily job search routine"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">30-Min Strategy</span>
          </button>

          {/* Quick Copy Asset Drawer Trigger */}
          <button
            id="nav-quick-asset-btn"
            onClick={onOpenQuickAssets}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">Quick Copy Resume</span>
          </button>

          {/* Export to CSV */}
          <button
            id="nav-export-csv-btn"
            onClick={onExportCsv}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            title="Export full application data to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};

