import { ApplicationRecord, ApplicationStatus, DailySprint } from "../types";
import { masterCompaniesList } from "../data/companiesData";

const STORAGE_KEY = "da148_applications_v1";
const SPRINT_KEY = "da148_daily_sprint_v1";

export function getInitialApplicationRecords(): Record<number, ApplicationRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read from localStorage:", e);
  }

  // Default empty records
  const records: Record<number, ApplicationRecord> = {};
  const today = new Date().toISOString().split("T")[0];

  masterCompaniesList.forEach((c) => {
    records[c.id] = {
      companyId: c.id,
      status: "Not Applied",
      lastUpdated: today,
      referralStatus: "Not Needed",
      rating: 3,
    };
  });

  return records;
}

export function saveApplicationRecords(records: Record<number, ApplicationRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

export function getDailySprint(): DailySprint {
  const today = new Date().toISOString().split("T")[0];
  try {
    const raw = localStorage.getItem(SPRINT_KEY);
    if (raw) {
      const data: DailySprint = JSON.parse(raw);
      if (data.lastActiveDate === today) {
        return data;
      } else {
        // New day: reset today's count, maintain streak if active yesterday
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const isConsecutive = data.lastActiveDate === yesterday && data.appliedToday >= data.target;
        return {
          target: data.target || 8,
          appliedToday: 0,
          lastActiveDate: today,
          streak: isConsecutive ? data.streak : data.appliedToday >= (data.target || 8) ? data.streak : 0,
        };
      }
    }
  } catch (e) {
    console.error("Failed to read daily sprint:", e);
  }

  return {
    target: 8,
    appliedToday: 0,
    lastActiveDate: today,
    streak: 0,
  };
}

export function saveDailySprint(sprint: DailySprint): void {
  try {
    localStorage.setItem(SPRINT_KEY, JSON.stringify(sprint));
  } catch (e) {
    console.error("Failed to save daily sprint:", e);
  }
}

export function exportToCsv(records: Record<number, ApplicationRecord>): void {
  const headers = [
    "#",
    "Company Name",
    "City",
    "Scale/Type",
    "Sector / Domain",
    "Application Status",
    "Date Applied",
    "Job ID / Link",
    "Referral Status",
    "Referral Contact",
    "Assessment / Interview Date",
    "Custom Notes",
    "Why Fits Profile",
    "Careers Link",
  ];

  const rows = masterCompaniesList.map((company) => {
    const rec: ApplicationRecord | undefined = records[company.id];

    return [
      company.id,
      escapeCsv(company.name),
      escapeCsv(company.city),
      escapeCsv(company.type),
      escapeCsv(company.sector),
      escapeCsv(rec?.status || "Not Applied"),
      escapeCsv(rec?.appliedDate || ""),
      escapeCsv(rec?.jobId || rec?.jobUrl || ""),
      escapeCsv(rec?.referralStatus || "Not Needed"),
      escapeCsv(rec?.referralContact || ""),
      escapeCsv(rec?.interviewDate || rec?.assessmentDate || ""),
      escapeCsv(rec?.notes || ""),
      escapeCsv(company.fitReason),
      escapeCsv(company.careerUrl),
    ];
  });

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `Manikanta_Veerla_Data_Analyst_148_Tracker_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeCsv(str: any): string {
  if (str === null || str === undefined) return '""';
  const stringValue = String(str);
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return `"${stringValue}"`;
}
