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
  | "Boutique Analytics"
  | "Fast-Growing Startup"
  | "Mid-Market IT"
  | "Enterprise Tech"
  | "Product MNC";

export type CityLocation = "Hyderabad" | "Bangalore";

export interface Company {
  id: number;
  name: string;
  city: CityLocation;
  type: CompanyScale;
  tier?: CompanyTier;
  sector: string;
  fitReason: string;
  careerUrl: string;
  recommendedRoles: string[];
  skills: string[];
  isFresherPriority?: boolean;
  fresherNote?: string;
  domainGroup:
    | "FinTech & Banking"
    | "SaaS & Cloud"
    | "Healthcare & Pharma"
    | "Semiconductors & Hardware"
    | "E-Commerce & Quick Comm"
    | "AI & Data Platforms"
    | "Travel & Mobility"
    | "Gaming & Media"
    | "HR Tech & EdTech"
    | "Logistics & Supply Chain"
    | "Other";
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
