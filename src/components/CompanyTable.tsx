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

interface CompanyTableProps {
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

export const CompanyTable: React.FC<CompanyTableProps> = ({
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
      id="companies-table-container"
      className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4 min-w-[200px]">Company & Location</th>
              <th className="py-3.5 px-4 min-w-[170px]">Sector & Tier</th>
              <th className="py-3.5 px-4 min-w-[260px]">Fresher Fit & Intelligence</th>
              <th className="py-3.5 px-4 min-w-[140px]">Status</th>
              <th className="py-3.5 px-4 text-right min-w-[220px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {companies.map((company) => {
              const record = records[company.id] || {
                status: "Not Applied",
              };
              const status = record.status || "Not Applied";

              return (
                <tr
                  key={company.id}
                  id={`company-row-${company.id}`}
                  className="hover:bg-slate-50/80 transition group"
                >
                  {/* # ID */}
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500 font-semibold">
                    {company.id}
                  </td>

                  {/* Company Name & City */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition">
                        {company.name}
                      </span>
                      {company.isFresherPriority && (
                        <span
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-bold"
                          title="High fresher hiring propensity"
                        >
                          <Flame className="w-2.5 h-2.5 fill-amber-600 text-amber-600" /> Fresher
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-slate-600 text-[11px]">
                      <span
                        className={
                          company.city === "Hyderabad" ? "text-blue-700 font-semibold" : "text-purple-700 font-semibold"
                        }
                      >
                        📍 {company.city}
                      </span>
                      <span>•</span>
                      <span className="text-slate-600">{company.type}</span>
                    </div>

                    {record.jobId && (
                      <div className="font-mono text-[10px] text-blue-700 font-semibold mt-0.5">
                        Req ID: {record.jobId}
                      </div>
                    )}
                  </td>

                  {/* Sector & Tier */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-medium line-clamp-1">
                        {company.sector}
                      </span>
                      {company.tier && (
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                            company.tier === "Boutique Analytics"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : company.tier === "Fast-Growing Startup"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-blue-50 text-blue-800 border-blue-200"
                          }`}
                        >
                          {company.tier}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Fit Reason & Fresher Note */}
                  <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                    <div className="line-clamp-2 text-xs font-normal">{company.fitReason}</div>
                    {company.fresherNote && (
                      <div className="mt-1 text-[11px] text-blue-800 line-clamp-1 font-semibold">
                        💡 {company.fresherNote}
                      </div>
                    )}
                    {record.notes && (
                      <div className="mt-1 text-[11px] text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 line-clamp-1">
                        📝 Log: {record.notes}
                      </div>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      id={`status-dropdown-${company.id}`}
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

                    {record.appliedDate && status !== "Not Applied" && (
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">
                        Applied: {record.appliedDate}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      {/* Direct LinkedIn Fresher Jobs Filter */}
                      <a
                        href={getLinkedInFresherJobSearchUrl(company)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                        title="Search LinkedIn Entry-Level / 0-1 yr Jobs for this company"
                      >
                        <Briefcase className="w-3 h-3 text-blue-700" /> Jobs
                      </a>

                      {/* Find Decision Makers & Leads */}
                      <a
                        href={getLinkedInDecisionMakerSearchUrl(company)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition"
                        title="Find Analytics Leads & Recruiters on LinkedIn"
                      >
                        <Users className="w-3.5 h-3.5" />
                      </a>

                      {/* Official Career Link */}
                      <a
                        href={company.careerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition"
                        title="Open Official Careers Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Outreach Modal Trigger */}
                      <button
                        id={`outreach-btn-${company.id}`}
                        onClick={() => onOpenOutreach(company)}
                        className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        title="Generate Cold Email, LinkedIn DM, or Founder Pitch"
                      >
                        <Sparkles className="w-3 h-3 text-purple-700" /> Pitch
                      </button>

                      {/* Detail / Log Modal Trigger */}
                      <button
                        id={`log-detail-btn-${company.id}`}
                        onClick={() => onSelectCompany(company)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-xs font-medium transition cursor-pointer"
                        title="Edit Job ID, dates, and application notes"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

