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
  const [pageSize, setPageSize] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = pageSize === -1 ? 1 : Math.ceil(companies.length / pageSize);
  const safePage = Math.min(Math.max(1, currentPage), totalPages || 1);

  const paginatedCompanies = useMemo(() => {
    if (pageSize === -1) return companies;
    const start = (safePage - 1) * pageSize;
    return companies.slice(start, start + pageSize);
  }, [companies, safePage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const gridEl = document.getElementById("companies-grid-container");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="space-y-4">
      <div
        id="companies-grid-container"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
      >
        {paginatedCompanies.map((company) => {
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
                      <div className="flex items-center gap-1.5 flex-wrap">
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
                        <a
                          id={`grid-company-linkedin-badge-${company.id}`}
                          href={getCompanyLinkedInProfileUrl(company)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] border border-[#0a66c2]/30 text-[9px] font-bold transition shrink-0"
                          title={`Open LinkedIn Company Page for ${company.name}`}
                        >
                          <Linkedin className="w-2.5 h-2.5 fill-current" /> in
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-0.5">
                        <span className="font-semibold text-slate-800">
                          📍 {company.city}
                        </span>
                        <span>•</span>
                        <span>{company.type}</span>
                      </div>

                      {/* Salary Package & Speed Indicator */}
                      <div className="mt-1 flex items-center gap-1">
                        {company.packageCategory === "3-6 LPA" ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-[10px]">
                            ⚡ {company.salaryPackage || "₹3.5 - ₹6.0 LPA"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-300 font-bold text-[10px]">
                            🚀 {company.salaryPackage || "₹6.5 - ₹9.5 LPA"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {company.tier && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-medium bg-slate-100 text-slate-700 border-slate-200">
                      {company.tier}
                    </span>
                  )}
                </div>

                {/* Sector & Domain */}
                <div className="mb-2">
                  <span className="text-xs font-semibold text-slate-800">{company.sector}</span>
                  {company.domainGroup && (
                    <span className="text-[10px] text-blue-700 ml-2 font-medium">
                      • {company.domainGroup}
                    </span>
                  )}
                </div>

                {/* Fit reason */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                  {company.fitReason}
                </p>

                {/* Skills badges */}
                <div className="flex flex-wrap gap-1 mb-3">
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
              </div>

              {/* Bottom Row / Status & Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {/* Status Dropdown */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-semibold">Status:</span>
                  <select
                    id={`grid-status-select-${company.id}`}
                    value={status}
                    onChange={(e) =>
                      onQuickUpdateStatus(company.id, e.target.value as ApplicationStatus)
                    }
                    className={`text-xs px-2 py-1 rounded-lg border font-medium cursor-pointer transition flex-1 max-w-[170px] ${
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
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-1.5 pt-1">
                  <div className="flex items-center gap-1">
                    {/* LinkedIn Company Profile */}
                    <a
                      href={getCompanyLinkedInProfileUrl(company)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-[#0a66c2]/10 hover:bg-[#0a66c2] hover:text-white text-[#0a66c2] rounded-lg border border-[#0a66c2]/30 transition"
                      title={`Open official LinkedIn Company Profile for ${company.name}`}
                    >
                      <Linkedin className="w-3.5 h-3.5 fill-current" />
                    </a>

                    {/* LinkedIn Fresher search */}
                    <a
                      href={getLinkedInFresherJobSearchUrl(company)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      title="LinkedIn Entry-Level Jobs"
                    >
                      <Briefcase className="w-3 h-3 text-blue-700" /> Jobs
                    </a>

                    {/* LinkedIn decision makers */}
                    <a
                      href={getLinkedInDecisionMakerSearchUrl(company)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition"
                      title="Find Leads on LinkedIn"
                    >
                      <Users className="w-3.5 h-3.5" />
                    </a>

                    {/* Official career portal */}
                    <a
                      href={company.careerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition"
                      title="Open Careers Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Outreach Pitch */}
                    <button
                      id={`grid-outreach-btn-${company.id}`}
                      onClick={() => onOpenOutreach(company)}
                      className="px-2 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                      title="Generate Outreach Pitch"
                    >
                      <Sparkles className="w-3 h-3 text-purple-700" /> Pitch
                    </button>

                    {/* Edit Detail */}
                    <button
                      id={`grid-detail-btn-${company.id}`}
                      onClick={() => onSelectCompany(company)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition cursor-pointer"
                      title="Application Notes & Details"
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

      {/* Grid Pagination Footer */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Cards per page:</span>
          <select
            id="grid-page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-semibold cursor-pointer"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
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
              id="grid-prev-page-btn"
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
              id="grid-next-page-btn"
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
