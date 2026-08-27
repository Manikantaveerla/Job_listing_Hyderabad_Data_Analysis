import React from "react";
import {
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  Award,
  XCircle,
  Building2,
  MapPin,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { ApplicationRecord, ApplicationStatus } from "../types";
import { masterCompaniesList } from "../data/companiesData";

interface StatsDashboardProps {
  records: Record<number, ApplicationRecord>;
  onFilterStatus?: (status: ApplicationStatus | "All") => void;
  onFilterCity?: (city: "Hyderabad" | "Bangalore" | "All") => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  records,
  onFilterStatus,
  onFilterCity,
}) => {
  const total = masterCompaniesList.length;

  const counts: Record<ApplicationStatus, number> = {
    "Not Applied": 0,
    "In Progress": 0,
    Applied: 0,
    "Referral Requested": 0,
    "Online Assessment": 0,
    "Interview Scheduled": 0,
    "Offer Received": 0,
    Rejected: 0,
  };

  let hydCount = 0;
  let blrCount = 0;

  masterCompaniesList.forEach((c) => {
    if (c.city === "Hyderabad") hydCount++;
    if (c.city === "Bangalore") blrCount++;

    const status = records[c.id]?.status || "Not Applied";
    if (counts[status] !== undefined) {
      counts[status]++;
    } else {
      counts["Not Applied"]++;
    }
  });

  const totalActiveApplied =
    counts.Applied +
    counts["Referral Requested"] +
    counts["Online Assessment"] +
    counts["Interview Scheduled"] +
    counts["Offer Received"];

  const pipelineStages = [
    {
      label: "Not Applied",
      count: counts["Not Applied"],
      color: "text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100",
      icon: Clock,
      statusKey: "Not Applied" as ApplicationStatus,
    },
    {
      label: "In Progress",
      count: counts["In Progress"],
      color: "text-amber-800 border-amber-200 bg-amber-50 hover:bg-amber-100/80",
      icon: TrendingUp,
      statusKey: "In Progress" as ApplicationStatus,
    },
    {
      label: "Applied",
      count: counts["Applied"],
      color: "text-blue-800 border-blue-200 bg-blue-50 hover:bg-blue-100/80",
      icon: Send,
      statusKey: "Applied" as ApplicationStatus,
    },
    {
      label: "Referral Sent",
      count: counts["Referral Requested"],
      color: "text-purple-800 border-purple-200 bg-purple-50 hover:bg-purple-100/80",
      icon: UserCheck,
      statusKey: "Referral Requested" as ApplicationStatus,
    },
    {
      label: "Assessment / OA",
      count: counts["Online Assessment"],
      color: "text-teal-800 border-teal-200 bg-teal-50 hover:bg-teal-100/80",
      icon: Briefcase,
      statusKey: "Online Assessment" as ApplicationStatus,
    },
    {
      label: "Interview",
      count: counts["Interview Scheduled"],
      color: "text-emerald-800 border-emerald-200 bg-emerald-50 hover:bg-emerald-100/80",
      icon: CheckCircle2,
      statusKey: "Interview Scheduled" as ApplicationStatus,
    },
    {
      label: "Offers",
      count: counts["Offer Received"],
      color: "text-amber-900 border-amber-300 bg-amber-100/70 hover:bg-amber-100 font-bold",
      icon: Award,
      statusKey: "Offer Received" as ApplicationStatus,
    },
  ];

  return (
    <div id="stats-dashboard" className="space-y-4">
      {/* Top Stat Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {pipelineStages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <button
              key={idx}
              id={`stat-card-${idx}`}
              onClick={() => onFilterStatus && onFilterStatus(stage.statusKey)}
              className={`p-3 rounded-xl border ${stage.color} text-left transition hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between shadow-xs cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 truncate">
                  {stage.label}
                </span>
                <Icon className="w-3.5 h-3.5 opacity-80 shrink-0" />
              </div>
              <div className="mt-2 text-xl font-extrabold font-mono text-slate-900">
                {stage.count}
                <span className="text-[10px] text-slate-600 font-semibold ml-1">
                  ({Math.round((stage.count / total) * 100)}%)
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Secondary Distribution Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {/* City Split */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">City Locations</div>
              <div className="text-[11px] text-slate-600">Target Tech Hubs</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="filter-hyd-stat-btn"
              onClick={() => onFilterCity && onFilterCity("Hyderabad")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-300 font-semibold cursor-pointer"
            >
              Hyderabad: <span className="font-bold text-blue-700">{hydCount}</span>
            </button>
            <button
              id="filter-blr-stat-btn"
              onClick={() => onFilterCity && onFilterCity("Bangalore")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-300 font-semibold cursor-pointer"
            >
              Bangalore: <span className="font-bold text-indigo-700">{blrCount}</span>
            </button>
          </div>
        </div>

        {/* Total Funnel Progress */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Total Applied</div>
              <div className="text-[11px] text-slate-600">
                {totalActiveApplied} of {total} Processed
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-base font-extrabold text-emerald-700 font-mono">
              {Math.round((totalActiveApplied / total) * 100)}%
            </div>
            <div className="text-[10px] text-slate-600 font-medium">Market Penetration</div>
          </div>
        </div>

        {/* Candidate Profile Fit Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Manikanta Veerla</div>
              <div className="text-[11px] text-slate-600">ServiceNow CSA • SQL • Power BI</div>
            </div>
          </div>
          <div className="text-[11px] text-purple-800 font-bold bg-purple-50 px-2 py-1 rounded-lg border border-purple-200">
            2026 CS Fresher
          </div>
        </div>
      </div>
    </div>
  );
};
