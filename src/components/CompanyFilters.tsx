import React from "react";
import {
  Search,
  RotateCcw,
  LayoutGrid,
  List,
  Flame,
  Building2,
  Briefcase,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { ApplicationStatus } from "../types";

interface CompanyFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCity: "All" | "Hyderabad" | "Bangalore";
  onCityChange: (city: "All" | "Hyderabad" | "Bangalore") => void;
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
  viewMode = "table",
  onViewModeChange = (_mode: "table" | "grid") => {},
  onResetFilters,
  filteredCount,
  totalCount,
}) => {
  const isFiltered =
    searchQuery !== "" ||
    selectedCity !== "All" ||
    selectedSector !== "All" ||
    selectedStatus !== "All" ||
    selectedType !== "All" ||
    selectedTier !== "All" ||
    onlyFresherPriority;

  return (
    <div
      id="company-filters-container"
      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3.5"
    >
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
            placeholder="Search 218+ companies by name, boutique firm, skills (SQL, Power BI, Python), or domain..."
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
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          {(["All", "Hyderabad", "Bangalore"] as const).map((city) => (
            <button
              key={city}
              id={`city-tab-${city.toLowerCase()}-btn`}
              onClick={() => onCityChange(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
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

      {/* Quick Filter Badges row: Fresher Priority & Tier Quick Buttons */}
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
          High Fresher Intake & Boutique Roles
        </button>

        {/* Boutique Analytics Filter */}
        <button
          id="filter-boutique-analytics-btn"
          onClick={() => onTierChange(selectedTier === "Boutique Analytics" ? "All" : "Boutique Analytics")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Boutique Analytics"
              ? "bg-purple-600 text-white border-purple-700 shadow-xs"
              : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
          }`}
        >
          🏢 Boutique Analytics ({totalCount > 148 ? "60+" : "30+"})
        </button>

        {/* Fast-Growing Startups Filter */}
        <button
          id="filter-fast-growing-startups-btn"
          onClick={() => onTierChange(selectedTier === "Fast-Growing Startup" ? "All" : "Fast-Growing Startup")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Fast-Growing Startup"
              ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
              : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          ⚡ Fast-Growing Startups
        </button>

        {/* Enterprise & Product MNCs */}
        <button
          id="filter-product-mnc-btn"
          onClick={() => onTierChange(selectedTier === "Product MNC" ? "All" : "Product MNC")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedTier === "Product MNC"
              ? "bg-blue-600 text-white border-blue-700 shadow-xs"
              : "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
          }`}
        >
          🌐 Global Product MNCs
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

          {/* Tier Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 font-semibold">Category:</span>
            <select
              id="filter-tier-select"
              value={selectedTier}
              onChange={(e) => onTierChange(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 font-medium cursor-pointer"
            >
              <option value="All">All Categories</option>
              {allTiers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 font-semibold">Sector:</span>
            <select
              id="filter-sector-select"
              value={selectedSector}
              onChange={(e) => onSectorChange(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 max-w-[180px] truncate font-medium cursor-pointer"
            >
              <option value="All">All Sectors</option>
              {allSectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown */}
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

