import React, { useState, useMemo } from "react";
import {
  ExternalLink,
  Sparkles,
  Edit3,
  Flame,
  Users,
  Briefcase,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Company, ApplicationRecord, ApplicationStatus } from "../types";
import {
  getLinkedInFresherJobSearchUrl,
  getLinkedInDecisionMakerSearchUrl,
  getCompanyLinkedInProfileUrl,
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
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 if companies filter changes
  const totalPages = pageSize === -1 ? 1 : Math.ceil(companies.length / pageSize);
  const safePage = Math.min(Math.max(1, currentPage), totalPages || 1);

  const paginatedCompanies = useMemo(() => {
    if (pageSize === -1) return companies;
    const start = (safePage - 1) * pageSize;
    return companies.slice(start, start + pageSize);
  }, [companies, safePage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const tableEl = document.getElementById("companies-table-container");
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            {paginatedCompanies.map((company) => {
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

                  {/* Company Name, City & Package Badge */}
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
                      {/* Direct LinkedIn Company Profile Tag */}
                      <a
                        id={`company-linkedin-badge-${company.id}`}
                        href={getCompanyLinkedInProfileUrl(company)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] border border-[#0a66c2]/30 text-[10px] font-bold transition"
                        title={`Open official LinkedIn Company Page for ${company.name}`}
                      >
                        <Linkedin className="w-2.5 h-2.5 fill-current" /> in Page
                      </a>
                    </div>

                    {/* Salary Package & Speed Badge */}
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      {company.packageCategory === "3-6 LPA" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-[11px]">
                          ⚡ {company.salaryPackage || "₹3.5 - ₹6.0 LPA"}
                          <span className="text-[10px] text-emerald-600 font-medium font-mono">
                            [{company.speedToOffer || "7-21 Days"}]
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-300 font-bold text-[11px]">
                          🚀 {company.salaryPackage || "₹6.5 - ₹9.5 LPA"}
                          <span className="text-[10px] text-indigo-600 font-medium font-mono">
                            [{company.speedToOffer || "14-30 Days"}]
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1">
                      <span className="font-semibold text-slate-800">
                        📍 {company.city}
                      </span>
                      <span>•</span>
                      <span>{company.type}</span>
                    </div>
                  </td>

                  {/* Sector & Tier */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 line-clamp-1">{company.sector}</div>
                    {company.tier && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 mt-1 font-medium">
                        {company.tier}
                      </span>
                    )}
                    {company.domainGroup && (
                      <div className="text-[10px] text-blue-700 font-medium mt-0.5">
                        {company.domainGroup}
                      </div>
                    )}
                  </td>

                  {/* Fresher Fit & Skills */}
                  <td className="py-3.5 px-4">
                    <p className="text-slate-700 text-xs line-clamp-2 leading-relaxed">
                      {company.fitReason}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {company.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                      {company.skills.length > 4 && (
                        <span className="text-[10px] text-slate-500 self-center">
                          +{company.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      id={`company-status-select-${company.id}`}
                      value={status}
                      onChange={(e) =>
                        onQuickUpdateStatus(company.id, e.target.value as ApplicationStatus)
                      }
                      className={`text-xs px-2.5 py-1.5 rounded-lg border focus:outline-hidden font-medium cursor-pointer transition w-full ${
                        statusBadgeClasses[status] || statusBadgeClasses["Not Applied"]
                      }`}
                    >
                      <option value="Not Applied">Not Applied</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Applied">Applied</option>
                      <option value="Referral Requested">Referral Sent</option>
                      <option value="Online Assessment">OA / Assessment</option>
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
                      {/* Official LinkedIn Company Profile Link */}
                      <a
                        href={getCompanyLinkedInProfileUrl(company)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-[#0a66c2]/10 hover:bg-[#0a66c2] hover:text-white text-[#0a66c2] rounded-lg border border-[#0a66c2]/30 transition"
                        title={`Open official LinkedIn Company Page for ${company.name}`}
                      >
                        <Linkedin className="w-3.5 h-3.5 fill-current" />
                      </a>

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

      {/* Pagination Controls Footer */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Rows per page:</span>
          <select
            id="table-page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-semibold cursor-pointer"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={-1}>All ({companies.length})</option>
          </select>
          <span className="text-slate-500 ml-2">
            Showing {(safePage - 1) * (pageSize === -1 ? companies.length : pageSize) + 1} -{" "}
            {pageSize === -1
              ? companies.length
              : Math.min(safePage * pageSize, companies.length)}{" "}
            of {companies.length}
          </span>
        </div>

        {pageSize !== -1 && totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              id="table-prev-page-btn"
              disabled={safePage <= 1}
              onClick={() => handlePageChange(safePage - 1)}
              className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2 font-semibold text-slate-800">
              Page {safePage} of {totalPages}
            </span>

            <button
              id="table-next-page-btn"
              disabled={safePage >= totalPages}
              onClick={() => handlePageChange(safePage + 1)}
              className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
