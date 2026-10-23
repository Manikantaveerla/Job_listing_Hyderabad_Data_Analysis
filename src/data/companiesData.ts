import { Company } from "../types";
import { all500TechCompanies } from "./top500Companies";

export function getCareerSearchUrl(company: Company | string, cityParam?: string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const city = typeof company === "string" ? (cityParam || "India") : company.city;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  return `https://www.google.com/search?q=${cleanName}+careers+Data+Analyst+${city}+fresher+2026`;
}

export function getGoogleFresherJobsUrl(company: Company | string, cityParam?: string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const city = typeof company === "string" ? (cityParam || "India") : company.city;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  return `https://www.google.com/search?q="${cleanName}"+("Data+Analyst"+OR+"BI+Analyst"+OR+"Junior+Analyst")+("fresher"+OR+"entry+level"+OR+"trainee"+OR+"0-1+years")+${city}`;
}

export function getLinkedInJobsUrl(company: Company | string, cityParam?: string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const city = typeof company === "string" ? (cityParam || "India") : company.city;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  return `https://www.linkedin.com/jobs/search/?keywords=${cleanName}%20Data%20Analyst&location=${encodeURIComponent(city + ", India")}`;
}

export const LINKEDIN_COMPANY_SLUGS: Record<string, string> = {
  "mu sigma": "mu-sigma",
  "latentview analytics": "latentview-analytics",
  "course5 intelligence": "course5-intelligence",
  "fractal analytics": "fractal-analytics",
  "tiger analytics": "tiger-analytics",
  "polestar solutions": "polestar-solutions-&-services-india-pvt-ltd",
  "polestar": "polestar-solutions-&-services-india-pvt-ltd",
  "celebal technologies": "celebal-technologies",
  "absolutdata": "absolutdata",
  "gramener": "gramener",
  "tredence": "tredence",
  "ugam": "ugamsolutions",
  "quantiphi": "quantiphi",
  "the math company": "themathcompany",
  "mathco": "themathcompany",
  "indegene": "indegene",
  "bridgei2i": "bridgei2i-analytics-solutions",
  "flutura": "flutura-decision-sciences-analytics",
  "datasigns technologies": "datasigns-technologies",
  "bridgepoint analytics": "bridgepoint-analytics",
  "sg analytics": "s-g-analytics",
  "evalueserve": "evalueserve",
  "affine": "affine-analytics",
  "affine analytics": "affine-analytics",
  "tcs": "tata-consultancy-services",
  "tata consultancy services": "tata-consultancy-services",
  "infosys": "infosys",
  "wipro": "wipro",
  "hcltech": "hcltech",
  "hcl technologies": "hcltech",
  "tech mahindra": "tech-mahindra",
  "l&t technology services": "l&t-technology-services-limited",
  "ltts": "l&t-technology-services-limited",
  "ltimindtree": "ltimindtree",
  "mphasis": "mphasis",
  "persistent systems": "persistent-systems",
  "coforge": "coforge",
  "birlasoft": "birlasoft",
  "cyient": "cyient",
  "hexaware technologies": "hexaware-technologies",
  "sonata software": "sonata-software",
  "zensar technologies": "zensar",
  "kpit technologies": "kpit-technologies",
  "genpact": "genpact",
  "accenture": "accenture",
  "cognizant": "cognizant",
  "capgemini": "capgemini",
  "deloitte": "deloitte",
  "pwc": "pwc",
  "ey": "ernstandyoung",
  "kpmg": "kpmg",
  "optum": "optum",
  "novartis": "novartis",
  "broadridge": "broadridge",
  "factset": "factset",
  "s&p global": "spglobal",
  "invesco": "invesco-ltd",
  "state street": "state-street",
  "fis": "fis",
  "fiserv": "fiserv",
  "synchrony": "synchrony-financial",
  "franklin templeton": "franklin-templeton",
  "wells fargo": "wellsfargo",
  "bank of america": "bank-of-america",
  "jpmorgan chase": "jpmorganchase",
  "morgan stanley": "morgan-stanley",
  "goldman sachs": "goldman-sachs",
  "citi": "citi",
  "citigroup": "citi",
  "hsbc": "hsbc",
  "barclays": "barclays",
  "standard chartered": "standard-chartered-bank",
  "bny mellon": "bny-mellon",
  "ubs": "ubs",
  "deutsche bank": "deutsche-bank",
  "mastercard": "mastercard",
  "visa": "visa",
  "paypal": "paypal",
  "american express": "american-express",
  "target": "target",
  "walmart global tech": "walmartglobaltech",
  "walmart": "walmart",
  "amazon": "amazon",
  "flipkart": "flipkart",
  "swiggy": "swiggy-in",
  "zomato": "zomato",
  "blinkit": "blinkit",
  "zepto": "zepto-quick-commerce",
  "ola": "ola-cabs",
  "uber": "uber-com",
  "makemytrip": "makemytrip.com",
  "meesho": "meesho",
  "phonepe": "phonepe-internet",
  "paytm": "paytm",
  "razorpay": "razorpay",
  "cred": "cred_club",
  "groww": "groww-in",
  "zerodha": "zerodha",
  "freshworks": "freshworks-inc",
  "zoho": "zoho",
  "postman": "postman-platform",
  "browserstack": "browserstack",
  "hasura": "hasura",
  "chargebee": "chargebee",
  "innovaccer": "innovaccer",
  "harness": "harness-io",
  "druva": "druva",
  "exl": "exl-service",
  "wns": "wns-global-services",
  "firstsource": "firstsource",
  "taskus": "taskus",
  "teleperformance": "teleperformance",
  "concentrix": "concentrix",
  "ntt data": "ntt-data",
  "dxc technology": "dxc-technology",
  "atos": "atos",
  "cgi": "cgi",
  "sopra steria": "soprasteria",
  "ust": "ustglobal",
  "virtusa": "virtusa",
  "happiest minds": "happiest-minds-technologies",
  "saksoft": "saksoft",
  "datamatics": "datamatics-global-services-limited",
  "citiustech": "citiustech",
  "zs associates": "zs-associates",
  "servicenow": "servicenow",
  "salesforce": "salesforce",
  "microsoft": "microsoft",
  "google": "google",
  "adobe": "adobe",
  "oracle": "oracle",
  "sap": "sap",
  "ibm": "ibm",
  "intel": "intel-corporation",
  "amd": "amd",
  "nvidia": "nvidia",
  "qualcomm": "qualcomm",
  "cisco": "cisco",
  "dell": "delltechnologies",
  "hp": "hp",
  "siemens": "siemens",
  "bosch": "bosch-india",
  "philips": "philips",
  "ge healthcare": "gehealthcare",
  "medtronic": "medtronic",
  "abbott": "abbott-laboratories",
  "astrazeneca": "astrazeneca",
  "sanofi": "sanofi",
  "dr. reddy's": "dr-reddy-s-laboratories",
  "dr reddy's": "dr-reddy-s-laboratories",
  "sun pharma": "sun-pharma",
  "cipla": "cipla",
  "reliance jio": "jio",
  "jio": "jio",
  "airtel": "airtel",
  "bharti airtel": "airtel",
  "darwinbox": "darwinbox",
  "highradius": "highradius",
  "zenoti": "zenoti",
  "keka": "keka-hr",
  "keka hr": "keka-hr",
  "zaggle": "zaggle-app",
  "stanplus": "stanplus",
  "red.health": "red-health-india",
  "red.health (stanplus)": "red-health-india",
  "skyroot": "skyroot-aerospace",
  "skyroot aerospace": "skyroot-aerospace",
  "dhruva space": "dhruvaspace",
  "syntizen": "syntizen-technologies",
  "syntizen technologies": "syntizen-technologies",
  "quixy": "quixyofficial",
  "quixy (elevatiq)": "quixyofficial",
  "oorwin": "oorwin",
  "incnut": "incnut-digital",
  "incnut digital": "incnut-digital",
  "skinkraft": "skinkraft-official",
  "vedix": "vedixofficial",
  "segmind": "segmind",
  "purecode ai": "purecode-ai",
  "marut drones": "marut-drones",
  "tracex": "tracex-technologies",
  "tracex technologies": "tracex-technologies",
  "nephroplus": "nephroplus",
  "stan": "getstan",
  "stan (getstan)": "getstan",
  "banyan nation": "banyan-nation",
  "gayam motor works": "gayam-motor-works",
  "gmw": "gayam-motor-works",
  "pure ev": "pure-ev",
  "whistledrive": "whistledrive",
  "callhealth": "callhealth-services",
  "paymatrix": "paymatrix",
  "flaist": "flaist",
  "freyr solutions": "freyr-solutions",
  "freyr": "freyr-solutions",
  "heaps.ai": "heaps-ai",
  "heaps": "heaps-ai",
  "bluesemi": "bluesemi",
  "gamepoint": "gamepoint-india",
  "h-bots robotics": "h-bots",
  "spendflo": "spendflo",
  "medplus": "medplus",
  "medplus health": "medplus",
  "tanla": "tanla-platforms",
  "tanla platforms": "tanla-platforms",
  "cigniti": "cigniti-technologies",
  "cigniti technologies": "cigniti-technologies",
  "ctrls": "ctrls-datacenter",
  "ctrls datacenters": "ctrls-datacenter",
  "cloud4c": "cloud4c-services",
  "cloud4c services": "cloud4c-services",
  "cyient dlm": "cyient-dlm",
  "brightcom group": "brightcomgroup",
  "pramati": "pramati-technologies",
  "wavemaker": "wavemaker",
  "t-hub": "t-hub-hyderabad",
  "cie iiit-hyderabad": "centre-for-innovation-and-entrepreneurship-cie-iiit-hyderabad",
  "shopflo": "shopflo",
  "appinventiv": "appinventiv",
  "rapido": "rapido-bike",
  "epaylater": "epaylater",
  "possible": "possible-health",
  "finxera": "finxera-inc",
  "drona pay": "drona-pay",
  "flyx": "flyx-social",
  "superops": "superops-ai",
  "superops.ai": "superops-ai",
  "bike bazaar": "bikebazaar",
};

export function getCompanyLinkedInSlug(company: Company | string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const normalized = companyName.toLowerCase().replace(/\(.*?\)/g, "").trim();
  
  if (LINKEDIN_COMPANY_SLUGS[normalized]) {
    return LINKEDIN_COMPANY_SLUGS[normalized];
  }

  // Check partial key matches
  for (const [key, slug] of Object.entries(LINKEDIN_COMPANY_SLUGS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return slug;
    }
  }

  // Fallback to formatted slug
  return normalized
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCompanyLinkedInProfileUrl(company: Company | string): string {
  if (typeof company !== "string" && company.linkedinUrl) {
    return company.linkedinUrl;
  }
  const slug = getCompanyLinkedInSlug(company);
  return `https://www.linkedin.com/company/${slug}/`;
}

export function getCompanyLinkedInJobsUrl(company: Company | string): string {
  const slug = getCompanyLinkedInSlug(company);
  return `https://www.linkedin.com/company/${slug}/jobs/`;
}

export function getCompanyLinkedInPeopleUrl(company: Company | string): string {
  const slug = getCompanyLinkedInSlug(company);
  return `https://www.linkedin.com/company/${slug}/people/`;
}

export function getLinkedInCompanySearchUrl(company: Company | string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  return `https://www.linkedin.com/search/results/companies/?keywords=${cleanName}`;
}

export function getLinkedInFresherJobSearchUrl(company: Company | string, cityParam?: string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const city = typeof company === "string" ? (cityParam || "India") : company.city;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  // f_E=1,2 filters for Internship (1) and Entry-Level (2) on LinkedIn
  return `https://www.linkedin.com/jobs/search/?keywords=${cleanName}%20%22Data%20Analyst%22%20OR%20%22BI%20Analyst%22&location=${encodeURIComponent(city + ", India")}&f_E=1%2C2`;
}

export function getLinkedInPeopleSearchUrl(company: Company | string, _cityParam?: string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  return `https://www.linkedin.com/search/results/people/?keywords=${cleanName}%20Recruiter%20OR%20"Talent%20Acquisition"%20OR%20"HR%20Lead"`;
}

export function getLinkedInDecisionMakerSearchUrl(company: Company | string, _cityParam?: string): string {
  const companyName = typeof company === "string" ? company : company.name;
  const cleanName = encodeURIComponent(companyName.replace(/\(.*?\)/g, "").trim());
  return `https://www.linkedin.com/search/results/people/?keywords=${cleanName}%20"Analytics%20Lead"%20OR%20"Head%20of%20Analytics"%20OR%20"Data%20Engineering%20Manager"%20OR%20"Founder"`;
}

// Master company list contains all 500 tech companies verified & categorized
export const masterCompaniesList: Company[] = all500TechCompanies;

export const allSectorsList: string[] = Array.from(
  new Set(masterCompaniesList.map((c) => c.sector))
).sort();

export const allTypesList: string[] = Array.from(
  new Set(masterCompaniesList.map((c) => c.type))
).sort();

export const allTiersList: string[] = Array.from(
  new Set(masterCompaniesList.map((c) => c.tier).filter(Boolean) as string[])
).sort();

export const allDomainsList: string[] = Array.from(
  new Set(masterCompaniesList.map((c) => c.domainGroup).filter(Boolean) as string[])
).sort();

export const allCitiesList: string[] = Array.from(
  new Set(masterCompaniesList.map((c) => c.city).filter(Boolean) as string[])
).sort();
