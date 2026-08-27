import React, { useState } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Award,
  Database,
  BarChart3,
  FileText,
  Mail,
  Phone,
  MapPin,
  X,
  Sparkles,
} from "lucide-react";
import { candidateProfile } from "../data/candidateProfile";

interface QuickAssetBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAssetBar: React.FC<QuickAssetBarProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="quick-asset-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        id="quick-asset-drawer-content"
        className="w-full max-w-lg bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl text-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-sm">
              MV
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Application Quick-Copy Bar</h2>
              <p className="text-xs text-slate-500">1-click copy resume assets for job portals</p>
            </div>
          </div>
          <button
            id="close-quick-asset-drawer-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Quick Links Group */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Essential Portfolio & Profile Links
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {/* Portfolio */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:border-blue-300 transition">
                <div className="truncate pr-2">
                  <div className="text-[11px] text-slate-500 font-semibold">Live Portfolio Website</div>
                  <div className="font-mono text-xs text-blue-700 font-semibold truncate">
                    {candidateProfile.portfolioUrl}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    id="copy-portfolio-url-btn"
                    onClick={() => copyToClipboard(candidateProfile.portfolioUrl, "portfolio")}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition font-bold cursor-pointer"
                  >
                    {copiedKey === "portfolio" ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === "portfolio" ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={candidateProfile.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-blue-700 rounded-lg hover:bg-slate-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:border-blue-300 transition">
                <div className="truncate pr-2">
                  <div className="text-[11px] text-slate-500 font-semibold">LinkedIn Profile</div>
                  <div className="font-mono text-xs text-blue-700 font-semibold truncate">
                    {candidateProfile.linkedinUrl}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    id="copy-linkedin-url-btn"
                    onClick={() => copyToClipboard(candidateProfile.linkedinUrl, "linkedin")}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition font-bold cursor-pointer"
                  >
                    {copiedKey === "linkedin" ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === "linkedin" ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={candidateProfile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-blue-700 rounded-lg hover:bg-slate-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:border-blue-300 transition">
                <div className="truncate pr-2">
                  <div className="text-[11px] text-slate-500 font-semibold">GitHub Profile</div>
                  <div className="font-mono text-xs text-blue-700 font-semibold truncate">
                    {candidateProfile.githubUrl}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    id="copy-github-url-btn"
                    onClick={() => copyToClipboard(candidateProfile.githubUrl, "github")}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs flex items-center gap-1.5 transition font-bold cursor-pointer"
                  >
                    {copiedKey === "github" ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === "github" ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={candidateProfile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-500 hover:text-blue-700 rounded-lg hover:bg-slate-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Contact Details
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="copy-email-btn"
                onClick={() => copyToClipboard(candidateProfile.email, "email")}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-left hover:border-blue-300 transition flex items-center justify-between cursor-pointer"
              >
                <div className="truncate pr-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">Email</span>
                  <span className="text-xs text-slate-800 font-medium truncate block">{candidateProfile.email}</span>
                </div>
                {copiedKey === "email" ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              <button
                id="copy-phone-btn"
                onClick={() => copyToClipboard(candidateProfile.phone, "phone")}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-left hover:border-blue-300 transition flex items-center justify-between cursor-pointer"
              >
                <div className="truncate pr-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">Phone</span>
                  <span className="text-xs text-slate-800 font-medium truncate block">{candidateProfile.phone}</span>
                </div>
                {copiedKey === "phone" ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
            </div>
          </div>

          {/* ATS Form Skills Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <Database className="w-3.5 h-3.5" /> ATS Form Ready Skills String
              </h3>
              <button
                id="copy-skills-string-btn"
                onClick={() =>
                  copyToClipboard(
                    "SQL, MySQL, Microsoft SQL Server (T-SQL), Power BI, DAX, Python (Pandas, NumPy), Advanced Excel, ETL Pipelines, Database Normalization (3NF), Window Functions, Stored Procedures, Tableau, AWS, Snowflake, dbt, ServiceNow (CSA Certified)",
                    "skills-string"
                  )
                }
                className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-bold cursor-pointer"
              >
                {copiedKey === "skills-string" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedKey === "skills-string" ? "Copied All" : "Copy Skills String"}
              </button>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed">
              SQL, MySQL, Microsoft SQL Server (T-SQL), Power BI, DAX, Python (Pandas, NumPy), Advanced Excel, ETL Pipelines, Database Normalization (3NF), Window Functions, Stored Procedures, Tableau, AWS, Snowflake, dbt, ServiceNow (CSA Certified)
            </div>
          </div>

          {/* Project Repositories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5" /> Key Project Repositories
            </h3>
            <div className="space-y-2.5">
              {candidateProfile.projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-bold text-xs text-slate-900">{proj.title}</div>
                    <button
                      id={`copy-project-repo-${idx}`}
                      onClick={() => copyToClipboard(proj.repoUrl, `proj-${idx}`)}
                      className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md text-[11px] font-bold flex items-center gap-1 shrink-0 transition cursor-pointer"
                    >
                      {copiedKey === `proj-${idx}` ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === `proj-${idx}` ? "Copied" : "Repo Link"}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal mb-2 line-clamp-2">{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tools.map((t, i) => (
                      <span key={i} className="text-[10px] bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Quick Reference */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <Award className="w-3.5 h-3.5" /> ServiceNow CSA Credential ID
              </h3>
              <button
                id="copy-csa-id-btn"
                onClick={() => copyToClipboard("27288495", "csa-id")}
                className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-bold cursor-pointer"
              >
                {copiedKey === "csa-id" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedKey === "csa-id" ? "Copied ID" : "Copy ID: 27288495"}
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Certified System Administrator (CSA)</div>
                <div className="text-[11px] text-slate-600 font-medium">ServiceNow • Issued Jul 2025 • Cert ID: 27288495</div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" /> 30-Sec Resume Summary
              </h3>
              <button
                id="copy-summary-btn"
                onClick={() => copyToClipboard(candidateProfile.summary, "summary")}
                className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-bold cursor-pointer"
              >
                {copiedKey === "summary" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedKey === "summary" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed">
              {candidateProfile.summary}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">Manikanta Veerla • 2026 Batch</span>
          <button
            id="close-drawer-bottom-btn"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
