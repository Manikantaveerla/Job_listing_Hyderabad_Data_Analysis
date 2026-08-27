import React from "react";
import {
  ExternalLink,
  Sparkles,
  Edit3,
  Flame,
  Users,
  Briefcase,
} from "lucide-react";
import { Company, ApplicationRecord, ApplicationStatus } from "../types";
import {
  getLinkedInFresherJobSearchUrl,
  getLinkedInDecisionMakerSearchUrl,
} from "../data/companiesData";

interface CompanyCardGridProps {
  companies: Company[];
  records: Record<number, ApplicationRecord>;
  onSelectCompany: (company: Company) => void;
  onOpenOutreach: (company: Company) => void;
  onQuickUpdateStatus: (companyId: number, status: ApplicationStatus) => void;
}

const statusBadgeClasses: Record<ApplicationStatus, string> = {
  "Not Applied": "bg-slate-100 text-slate-700 border-slate-300",
  "In Progress": "bg-amber-50 text-amber-900 border-amber-300 font-medium",
  "Applied": "bg-blue-50 text-blue-800 border-blue-300 font-medium",
  "Referral Requested": "bg-purple-50 text-purple-800 border-purple-300 font-medium",
  "Online Assessment": "bg-teal-50 text-teal-800 border-teal-300 font-medium",
  "Interview Scheduled": "bg-emerald-50 text-emerald-800 border-emerald-300 font-medium",
  "Offer Received": "bg-amber-100 text-amber-900 border-amber-400 font-bold",
  "Rejected": "bg-rose-50 text-rose-800 border-rose-300",
};

export const CompanyCardGrid: React.FC<CompanyCardGridProps> = ({
  companies,
  records,
  onSelectCompany,
  onOpenOutreach,
  onQuickUpdateStatus,
}) => {
  if (companies.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-600 shadow-xs">
        <p className="text-sm font-semibold text-slate-800">No companies found matching current filters.</p>
        <p className="text-xs text-slate-500 mt-1">Try clearing search keywords or selecting "All" categories.</p>
      </div>
    );
  }

  return (
    <div
      id="companies-grid-container"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
    >
      {companies.map((company) => {
        const record = records[company.id] || { status: "Not Applied" };
        const status = record.status || "Not Applied";

        return (
          <div
            key={company.id}
            id={`company-card-${company.id}`}
            className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-4 shadow-xs hover:shadow-md flex flex-col justify-between transition group"
          >
            {/* Top row */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                    #{company.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition line-clamp-1">
                        {company.name}
                      </h3>
                      {company.isFresherPriority && (
                        <span
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[9px] font-bold shrink-0"
                          title="High fresher hiring propensity"
                        >
                          <Flame className="w-2.5 h-2.5 fill-amber-600 text-amber-600" /> Fresher
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-0.5">
                      <span className={company.city === "Hyderabad" ? "text-blue-700 font-semibold" : "text-purple-700 font-semibold"}>
                        📍 {company.city}
                      </span>
                      <span>•</span>
                      <span>{company.type}</span>
                    </div>
                  </div>
                </div>

                {company.tier && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-medium ${
                      company.tier === "Boutique Analytics"
                        ? "bg-purple-50 text-purple-800 border-purple-200"
                        : company.tier === "Fast-Growing Startup"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {company.tier}
                  </span>
                )}
              </div>

              {/* Fit reason & Fresher Note */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 text-xs text-slate-700 leading-relaxed space-y-1.5">
                <p className="line-clamp-2">{company.fitReason}</p>
                {company.fresherNote && (
                  <p className="text-[11px] text-blue-800 line-clamp-1 font-semibold">
                    💡 {company.fresherNote}
                  </p>
                )}
                {record.notes && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 line-clamp-1">
                    📝 {record.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Row: Status Selector & Actions */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-600 font-semibold">Status:</span>
                <select
                  id={`grid-status-dropdown-${company.id}`}
                  value={status}
                  onChange={(e) =>
                    onQuickUpdateStatus(company.id, e.target.value as ApplicationStatus)
                  }
                  className={`text-xs px-2.5 py-1 rounded-lg border focus:outline-hidden font-semibold cursor-pointer ${
                    statusBadgeClasses[status] || statusBadgeClasses["Not Applied"]
                  }`}
                >
                  <option value="Not Applied">Not Applied</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Applied">Applied</option>
                  <option value="Referral Requested">Referral Requested</option>
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Received">Offer Received 🎉</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-1.5 pt-1 flex-wrap">
                {/* LinkedIn Fresher Jobs */}
                <a
                  href={getLinkedInFresherJobSearchUrl(company)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  title="Search LinkedIn 0-1 yr Jobs for this company"
                >
                  <Briefcase className="w-3 h-3 text-blue-700" /> Jobs
                </a>

                {/* LinkedIn Decision Maker search */}
                <a
                  href={getLinkedInDecisionMakerSearchUrl(company)}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs transition"
                  title="Find Analytics Leads on LinkedIn"
                >
                  <Users className="w-3.5 h-3.5" />
                </a>

                {/* Career Portal */}
                <a
                  href={company.careerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 text-xs transition"
                  title="Official Career Portal"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-1 ml-auto">
                  <button
                    id={`grid-outreach-btn-${company.id}`}
                    onClick={() => onOpenOutreach(company)}
                    className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-purple-700" /> Pitch
                  </button>
                  <button
                    id={`grid-log-btn-${company.id}`}
                    onClick={() => onSelectCompany(company)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs transition cursor-pointer"
                    title="Log Application Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

