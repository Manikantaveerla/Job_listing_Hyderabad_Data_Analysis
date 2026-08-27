import React, { useState } from "react";
import {
  X,
  Calendar,
  Building2,
  MapPin,
  Tag,
  Link as LinkIcon,
  ExternalLink,
  Save,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Company, ApplicationRecord, ApplicationStatus } from "../types";
import { getLinkedInJobsUrl, getLinkedInPeopleSearchUrl, getCareerSearchUrl } from "../data/companiesData";

interface CompanyDetailModalProps {
  company: Company | null;
  record: ApplicationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveRecord: (companyId: number, updatedRecord: Partial<ApplicationRecord>) => void;
  onOpenOutreach: (company: Company) => void;
}

const ALL_STATUSES: ApplicationStatus[] = [
  "Not Applied",
  "In Progress",
  "Applied",
  "Referral Requested",
  "Online Assessment",
  "Interview Scheduled",
  "Offer Received",
  "Rejected",
];

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  record,
  isOpen,
  onClose,
  onSaveRecord,
  onOpenOutreach,
}) => {
  if (!isOpen || !company) return null;

  const today = new Date().toISOString().split("T")[0];

  const [status, setStatus] = useState<ApplicationStatus>(record?.status || "Not Applied");
  const [appliedDate, setAppliedDate] = useState<string>(record?.appliedDate || today);
  const [jobId, setJobId] = useState<string>(record?.jobId || "");
  const [jobUrl, setJobUrl] = useState<string>(record?.jobUrl || "");
  const [referralContact, setReferralContact] = useState<string>(record?.referralContact || "");
  const [referralStatus, setReferralStatus] = useState<
    "Not Needed" | "Contacted" | "Referred" | "Declined"
  >(record?.referralStatus || "Not Needed");
  const [assessmentDate, setAssessmentDate] = useState<string>(record?.assessmentDate || "");
  const [interviewDate, setInterviewDate] = useState<string>(record?.interviewDate || "");
  const [notes, setNotes] = useState<string>(record?.notes || "");

  const handleSave = () => {
    onSaveRecord(company.id, {
      status,
      appliedDate: status === "Not Applied" ? undefined : appliedDate,
      jobId: jobId.trim() || undefined,
      jobUrl: jobUrl.trim() || undefined,
      referralContact: referralContact.trim() || undefined,
      referralStatus,
      assessmentDate: assessmentDate || undefined,
      interviewDate: interviewDate || undefined,
      notes: notes.trim() || undefined,
      lastUpdated: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div
      id="company-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="company-detail-modal-container"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-base">
              #{company.id}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900">{company.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                  {company.city}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-semibold">
                  {company.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <span className="text-slate-900 font-semibold">{company.sector}</span> • {company.fitReason}
              </p>
            </div>
          </div>
          <button
            id="close-detail-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Quick External Links Launchpad */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>Direct Job Portals:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <a
                href={company.careerUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
              >
                Official Careers <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={getLinkedInJobsUrl(company.name, company.city)}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                LinkedIn Jobs <ExternalLink className="w-3 h-3 text-white" />
              </a>
              <a
                href={getLinkedInPeopleSearchUrl(company.name, company.city)}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                Find Recruiters <ExternalLink className="w-3 h-3" />
              </a>
              <button
                id="modal-outreach-trigger-btn"
                onClick={() => {
                  onClose();
                  onOpenOutreach(company);
                }}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-purple-600" /> Generate Outreach
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Application Status</label>
              <select
                id="detail-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-semibold"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Applied */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Date Applied</label>
              <input
                id="detail-applied-date-input"
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
              />
            </div>

            {/* Job ID / Requisition # */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Job ID / Requisition #</label>
              <input
                id="detail-jobid-input"
                type="text"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="e.g. REQ-94821 or 2026-DA-01"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-mono"
              />
            </div>

            {/* Specific Job Post Link */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Job Post URL (Optional)</label>
              <input
                id="detail-joburl-input"
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-mono"
              />
            </div>

            {/* Referral Contact */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Referral Contact Name / LinkedIn</label>
              <input
                id="detail-referral-contact-input"
                type="text"
                value={referralContact}
                onChange={(e) => setReferralContact(e.target.value)}
                placeholder="e.g. Rahul Sharma (Senior Data Analyst)"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
              />
            </div>

            {/* Referral Status */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Referral Status</label>
              <select
                id="detail-referral-status-select"
                value={referralStatus}
                onChange={(e) => setReferralStatus(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
              >
                <option value="Not Needed">Not Needed / Direct Apply</option>
                <option value="Contacted">Contacted / Message Sent</option>
                <option value="Referred">Referred by Employee ✓</option>
                <option value="Declined">Declined / No Response</option>
              </select>
            </div>

            {/* Online Assessment Date */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">OA / Test Date</label>
              <input
                id="detail-oa-date-input"
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
              />
            </div>

            {/* Technical Interview Date */}
            <div>
              <label className="text-slate-700 font-bold mb-1 block">Interview Date</label>
              <input
                id="detail-interview-date-input"
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Personal Application Notes */}
          <div>
            <label className="text-slate-700 font-bold mb-1 block">
              Application Notes, Interview Rounds & Key Follow-ups
            </label>
            <textarea
              id="detail-notes-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Applied via workday; highlighted Blinkit Power BI DAX metrics and ServiceNow CSA certification. Follow-up next Tuesday on LinkedIn."
              rows={3}
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-hidden focus:border-blue-600 resize-none font-mono"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            id="cancel-detail-btn"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="save-detail-record-btn"
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Application Record
          </button>
        </div>
      </div>
    </div>
  );
};
