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
  RotateCcw,
} from "lucide-react";
import { candidateProfile } from "../data/candidateProfile";

interface HeaderNavProps {
  onOpenQuickAssets: () => void;
  onOpenInterviewPrep: () => void;
  onExportCsv: () => void;
  onResetAllData: () => void;
  appliedCount: number;
  totalCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenQuickAssets,
  onOpenInterviewPrep,
  onExportCsv,
  onResetAllData,
  appliedCount,
  totalCount,
}) => {
  return (
    <header
      id="main-app-header"
      className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Branding & Candidate Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0 font-bold text-sm">
            148
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 tracking-tight">
                Data Analyst Application Portal
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold">
                2026 Fresher Edition
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span className="text-slate-900 font-semibold">{candidateProfile.fullName}</span>
              <span>•</span>
              <span className="text-blue-700 font-medium">Hyderabad & Bangalore Target</span>
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

        {/* Right: Key Action Toolbars */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Copy Asset Drawer Trigger */}
          <button
            id="nav-quick-asset-btn"
            onClick={onOpenQuickAssets}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-slate-600" /> Quick Copy Resume
          </button>

          {/* Interview Prep Trigger */}
          <button
            id="nav-interview-prep-btn"
            onClick={onOpenInterviewPrep}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100/80 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Interview Master Hub</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-amber-600 text-white font-extrabold uppercase">
              50+ Qs & 5 Rounds
            </span>
          </button>

          {/* Export to CSV */}
          <button
            id="nav-export-csv-btn"
            onClick={onExportCsv}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Master CSV
          </button>
        </div>
      </div>
    </header>
  );
};
