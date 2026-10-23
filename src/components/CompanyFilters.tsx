import React from "react";
import {
  Search,
  RotateCcw,
  LayoutGrid,
  List,
  Flame,
  X,
  Layers,
  Sparkles,
  Rocket,
} from "lucide-react";
import { ApplicationStatus } from "../types";

interface CompanyFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  allCities?: string[];
  selectedPackage?: "All" | "3-6 LPA" | "6-10 LPA";
  onPackageChange?: (pkg: "All" | "3-6 LPA" | "6-10 LPA") => void;
  selectedDomain?: string;
  onDomainChange?: (domain: string) => void;
  allDomains?: string[];
  selectedSector?: string;
  onSectorChange?: (sector: string) => void;
  allSectors?: string[];
  selectedStatus?: ApplicationStatus | "All";
  onStatusChange?: (status: ApplicationStatus | "All") => void;
  selectedType?: string;
  onTypeChange?: (t: string) => void;
  allTypes?: string[];
  selectedTier?: string;
  onTierChange?: (tier: string) => void;
  allTiers?: string[];
  onlyFresherPriority?: boolean;
  onToggleFresherPriority?: () => void;
  onlyHyderabadStartups?: boolean;
  onToggleHyderabadStartups?: () => void;
  viewMode?: "table" | "grid";
  onViewModeChange?: (mode: "table" | "grid") => void;
  onResetFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export const CompanyFilters: React.FC<CompanyFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  allCities = ["Hyderabad", "Bangalore", "Pune", "Chennai", "Delhi NCR"],
  selectedPackage = "All",
  onPackageChange = (_pkg: "All" | "3-6 LPA" | "6-10 LPA") => {},
  selectedDomain = "All",
  onDomainChange = (_domain: string) => {},
  allDomains = [],
  selectedSector = "All",
  onSectorChange = (_sector: string) => {},
  allSectors = [],
  selectedStatus = "All",
  onStatusChange = (_status: ApplicationStatus | "All") => {},
  selectedType = "All",
  onTypeChange = (_type: string) => {},
  allTypes = [],
  selectedTier = "All",
  onTierChange = (_tier: string) => {},
  allTiers = [],
  onlyFresherPriority = false,
  onToggleFresherPriority = () => {},
  onlyHyderabadStartups = false,
  onToggleHyderabadStartups = () => {},
  viewMode = "table",
  onViewModeChange = (_mode: "table" | "grid") => {},
  onResetFilters,
  filteredCount,
  totalCount,
}) => {
  const isFiltered =
    searchQuery !== "" ||
    selectedPackage !== "All" ||
    selectedCity !== "All" ||
    selectedDomain !== "All" ||
    selectedSector !== "All" ||
    selectedStatus !== "All" ||
    selectedType !== "All" ||
    selectedTier !== "All" ||
    onlyFresherPriority ||
    onlyHyderabadStartups;

  return (
    <div
      id="company-filters-container"
      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3.5"
    >
      {/* Target Salary & Speed Priority Selector (Primary User Goal) */}
      <div className="bg-slate-900 text-white rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
            ₹
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              Target Salary Bracket & Speed Priority
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                100% Fresher Targeted
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Filter exclusively between 1st Choice Fast-Track (3-6 LPA) and 2nd Choice Growth-Track (6-10 LPA)
            </div>
          </div>
        </div>

        {/* Priority Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-lg border border-slate-700/80 shrink-0">
          <button
            id="salary-filter-all-btn"
            onClick={() => onPackageChange("All")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              selectedPackage === "All"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            ⭐ All Target Roles
          </button>
          <button
            id="salary-filter-3-6-btn"
            onClick={() => onPackageChange("3-6 LPA")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              selectedPackage === "3-6 LPA"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-400 hover:text-emerald-300"
            }`}
          >
            <span>⚡ ₹3 - ₹6 LPA</span>
            <span className="px-1 py-0.2 rounded-full bg-emerald-950/60 text-emerald-200 text-[10px]">
              1st Choice (7-21 Days)
            </span>
          </button>
          <button
            id="salary-filter-6-10-btn"
            onClick={() => onPackageChange("6-10 LPA")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              selectedPackage === "6-10 LPA"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-indigo-300 hover:text-indigo-200"
            }`}
          >
            <span>🚀 ₹6 - ₹10 LPA</span>
            <span className="px-1 py-0.2 rounded-full bg-indigo-950/60 text-indigo-200 text-[10px]">
              2nd Choice (14-30 Days)
            </span>
          </button>
        </div>
      </div>

      {/* Top row: Search input + View Mode toggles + City pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="company-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 500+ tech companies by name, role, skills (SQL, Power BI, Python), or domain..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              id="clear-search-query-btn"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 overflow-x-auto">
          {["All", "Hyderabad", "Bangalore", "Pune", "Chennai"].map((city) => (
            <button
              key={city}
              id={`city-tab-${city.toLowerCase().replace(/\s+/g, "-")}-btn`}
              onClick={() => onCityChange(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                selectedCity === city
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {city === "All" ? "All Cities" : city}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            id="view-mode-table-btn"
            onClick={() => onViewModeChange("table")}
            className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
              viewMode === "table"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200 font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            id="view-mode-grid-btn"
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
              viewMode === "grid"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200 font-bold"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Filter Badges row: Fresher Priority & Key Category Quick Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Fresher Priority Toggle Button */}
        <button
          id="toggle-fresher-priority-btn"
          onClick={onToggleFresherPriority}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
            onlyFresherPriority
              ? "bg-amber-600 text-white border-amber-700 shadow-xs"
              : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${onlyFresherPriority ? "fill-current" : ""}`} />
          High Fresher Intake & Early Career
        </button>

        {/* Hyderabad Startups Toggle Button */}
        <button
          id="toggle-hyderabad-startups-btn"
          onClick={onToggleHyderabadStartups}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
            onlyHyderabadStartups
              ? "bg-orange-600 text-white border-orange-700 shadow-md ring-2 ring-orange-300"
              : "bg-orange-50 text-orange-950 border-orange-300 hover:bg-orange-100"
          }`}
          title="Filter all 52+ fast-hiring Hyderabad tech startups (7-14 day offers)"
        >
          <Rocket className={`w-3.5 h-3.5 ${onlyHyderabadStartups ? "text-amber-200" : "text-orange-600"}`} />
          <span>⚡ Hyderabad Startups Only (52+ Fast Offers)</span>
        </button>

        {/* Global Capability Center (GCC) */}
        <button
          id="filter-gcc-btn"
          onClick={() => onTierChange(selectedTier === "Global Capability Center (GCC)" ? "All" : "Global Capability Center (GCC)")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Global Capability Center (GCC)"
              ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
              : "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100"
          }`}
        >
          🏛️ GCC Centers (150+)
        </button>

        {/* Tier 1 Product MNC */}
        <button
          id="filter-tier1-product-mnc-btn"
          onClick={() => onTierChange(selectedTier === "Tier 1 Product MNC" ? "All" : "Tier 1 Product MNC")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Tier 1 Product MNC"
              ? "bg-blue-600 text-white border-blue-700 shadow-xs"
              : "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
          }`}
        >
          🌐 Tier 1 Product MNCs
        </button>

        {/* Indian Unicorn & High-Growth SaaS */}
        <button
          id="filter-unicorn-saas-btn"
          onClick={() => onTierChange(selectedTier === "Indian Unicorn & High-Growth SaaS" ? "All" : "Indian Unicorn & High-Growth SaaS")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Indian Unicorn & High-Growth SaaS"
              ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
              : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          🦄 Indian Unicorns & SaaS
        </button>

        {/* HealthTech & BioPharma */}
        <button
          id="filter-healthtech-btn"
          onClick={() => onTierChange(selectedTier === "HealthTech & BioPharma" ? "All" : "HealthTech & BioPharma")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "HealthTech & BioPharma"
              ? "bg-teal-600 text-white border-teal-700 shadow-xs"
              : "bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100"
          }`}
        >
          🧬 HealthTech & Pharma
        </button>

        {/* Semiconductor & Embedded Systems */}
        <button
          id="filter-semiconductor-btn"
          onClick={() => onTierChange(selectedTier === "Semiconductor & Embedded Systems" ? "All" : "Semiconductor & Embedded Systems")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Semiconductor & Embedded Systems"
              ? "bg-rose-600 text-white border-rose-700 shadow-xs"
              : "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
          }`}
        >
          ⚡ Semiconductors & Hardware
        </button>

        {/* Boutique Analytics */}
        <button
          id="filter-boutique-analytics-btn"
          onClick={() => onTierChange(selectedTier === "Boutique Analytics" ? "All" : "Boutique Analytics")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Boutique Analytics"
              ? "bg-purple-600 text-white border-purple-700 shadow-xs"
              : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
          }`}
        >
          📊 Boutique Analytics
        </button>
      </div>

      {/* Dropdown filters + Status + Reset */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 font-semibold">Status:</span>
            <select
              id="filter-status-select"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 font-medium cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Not Applied">Not Applied</option>
              <option value="In Progress">In Progress</option>
              <option value="Applied">Applied</option>
              <option value="Referral Requested">Referral Requested</option>
              <option value="Online Assessment">Online Assessment</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Tier / Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 font-semibold">Category:</span>
            <select
              id="filter-tier-select"
              value={selectedTier}
              onChange={(e) => onTierChange(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 font-medium cursor-pointer max-w-[200px]"
            >
              <option value="All">All Categories</option>
              {allTiers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Domain Group Dropdown */}
          {allDomains.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold">Domain:</span>
              <select
                id="filter-domain-select"
                value={selectedDomain}
                onChange={(e) => onDomainChange(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 max-w-[180px] font-medium cursor-pointer truncate"
              >
                <option value="All">All Domains</option>
                {allDomains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Scale Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 font-semibold">Scale:</span>
            <select
              id="filter-type-select"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 font-medium cursor-pointer"
            >
              <option value="All">All Scales</option>
              {allTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counts & Clear Filters */}
        <div className="flex items-center gap-3">
          <span className="text-slate-600 text-xs">
            Showing <strong className="text-slate-900 font-bold">{filteredCount}</strong> of {totalCount} companies
          </span>

          {isFiltered && (
            <button
              id="reset-all-filters-btn"
              onClick={onResetFilters}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 transition cursor-pointer text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
