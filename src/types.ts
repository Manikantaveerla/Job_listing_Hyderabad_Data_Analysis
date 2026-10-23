export type ApplicationStatus =
  | "Not Applied"
  | "In Progress"
  | "Applied"
  | "Referral Requested"
  | "Online Assessment"
  | "Interview Scheduled"
  | "Offer Received"
  | "Rejected";

export type CompanyScale =
  | "Large MNC"
  | "Large"
  | "Mid-Large"
  | "Mid-Sized"
  | "Small-Mid"
  | "Small"
  | "Startup"
  | "Boutique Analytics";

export type CompanyTier =
  | "Tier 1 Product MNC"
  | "Global Capability Center (GCC)"
  | "HealthTech & BioPharma"
  | "IT Services & Digital Engineering"
  | "Indian Unicorn & High-Growth SaaS"
  | "Telecom, Media & Quick-Commerce"
  | "Semiconductor & Embedded Systems"
  | "AutoTech, Aerospace & DeepTech"
  | "Boutique Analytics"
  | "Fast-Growing Startup"
  | "Enterprise Tech"
  | "Product MNC"
  | "Gaming, Media & AdTech"
  | "Cybersecurity & Cloud Infra"
  | "AI, Data & Observability"
  | "HR Tech & EdTech"
  | "Logistics & Supply Chain"
  | "Consulting & Business Strategy"
  | string;

export type CityLocation =
  | "Hyderabad"
  | "Bangalore"
  | "Pune"
  | "Chennai"
  | "Delhi NCR"
  | "Pan-India / Hubs"
  | string;

export interface Company {
  id: number;
  name: string;
  city: CityLocation;
  type: CompanyScale;
  tier?: CompanyTier;
  sector: string;
  fitReason: string;
  careerUrl: string;
  linkedinUrl?: string;
  recommendedRoles: string[];
  skills: string[];
  isFresherPriority?: boolean;
  fresherNote?: string;
  packageCategory?: "3-6 LPA" | "6-10 LPA";
  salaryPackage?: string;
  speedToOffer?: "Fast-Track (7-21 Days)" | "Growth-Track (14-30 Days)";
  hiringProcess?: string;
  domainGroup:
    | "Global Product & Cloud"
    | "FinTech & Banking"
    | "SaaS & Enterprise Cloud"
    | "Healthcare & Pharma"
    | "IT Services & Consulting"
    | "Semiconductors & Hardware"
    | "E-Commerce & Quick Commerce"
    | "AI, Data & Observability"
    | "Automotive, Mobility & Aerospace"
    | "Gaming, Media & AdTech"
    | "Telecom & Networking"
    | "Cybersecurity & Cloud Infra"
    | "Logistics & Supply Chain"
    | "HR Tech & EdTech"
    | "Consulting & Business Strategy"
    | "AI & Data Platforms"
    | "Other"
    | string;
}

export interface ApplicationRecord {
  companyId: number;
  status: ApplicationStatus;
  appliedDate?: string;
  jobId?: string;
  jobTitle?: string;
  jobUrl?: string;
  referralContact?: string;
  referralStatus?: "Not Needed" | "Contacted" | "Referred" | "Declined";
  assessmentDate?: string;
  interviewDate?: string;
  notes?: string;
  rating?: number; // 1-5 priority
  lastUpdated: string;
}

export interface UserProfile {
  fullName: string;
  title: string;
  subTitle: string;
  batch: string;
  email: string;
  phone: string;
  location: string;
  openToRelocate: boolean;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  summary: string;
  skills: {
    core: string[];
    databases: string[];
    bi: string[];
    programming: string[];
    certifications: string[];
  };
  internships: Array<{
    role: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
  }>;
  projects: Array<{
    title: string;
    tools: string[];
    repoUrl: string;
    description: string;
    highlights: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    certId?: string;
  }>;
}

export interface DailySprint {
  target: number;
  appliedToday: number;
  lastActiveDate: string;
  streak: number;
}

export interface DailyJobPosting {
  id: string;
  companyName: string;
  companyId?: number;
  roleTitle: string;
  location: string;
  experienceLevel: string; // e.g. "0-1 years / Fresher (2026 Batch)"
  postedDate: string; // e.g. "Today", "1 day ago"
  tierCategory: string; // e.g. "GCC", "Product MNC", "Unicorn SaaS", "Boutique Analytics"
  requiredSkills: string[];
  salaryRange?: string;
  packageCategory?: "3-6 LPA" | "6-10 LPA";
  atsPlatform: "Workday" | "Greenhouse" | "Lever" | "Direct Career" | "LinkedIn Post" | "Phenom" | "TCS iON" | "Direct Walk-in" | string;
  applyUrl: string;
  jobDescriptionSummary: string;
  fresherHiringType: "Campus / Off-Campus Drive" | "Early Career FTE" | "Analytics Graduate Intern to FTE" | "Direct Entry-Level" | "Direct FTE - Fast Placement" | "Early Career Drive" | "Off-Campus Drive" | "National Off-Campus Drive" | "TCS NQT National Drive" | "Direct FTE" | "Walk-in / Immediate Offer" | string;
  isUrgent?: boolean;
}

export interface AtsScanner {
  id: string;
  title: string;
  platform: string;
  badge: string;
  description: string;
  searchUrl: string;
  targetCompanyTypes: string;
  frequencyRecommendation: string;
}

