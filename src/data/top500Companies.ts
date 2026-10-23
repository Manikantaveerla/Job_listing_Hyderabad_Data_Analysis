import { Company } from "../types";
import { fastTrack3to6LpaCompanies } from "./fastTrack3to6LpaData";
import { growthTrack6to10LpaCompanies } from "./growthTrack6to10LpaData";
import { remainingCompaniesList } from "./remainingCompaniesList";
import { hyderabadStartupsList } from "./hyderabadStartupsData";

export { hyderabadStartupsList };

export const all500TechCompanies: Company[] = [
  ...fastTrack3to6LpaCompanies,
  ...growthTrack6to10LpaCompanies,
  ...remainingCompaniesList,
  ...hyderabadStartupsList,
];

export const top500CompaniesList: Company[] = all500TechCompanies;

