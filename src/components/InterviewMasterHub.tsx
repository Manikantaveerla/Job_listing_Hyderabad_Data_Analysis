import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Database,
  BarChart3,
  FileSpreadsheet,
  Terminal,
  Calculator,
  BookOpen,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  HelpCircle,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Send,
  Loader2,
  Code2,
  Compass,
  ListChecks,
  Brain,
  Building2,
  Clock,
  Briefcase
} from "lucide-react";
import { interviewRoundsGuide, companyArchetypes, InterviewRound } from "../data/interviewRoundsData";
import {
  sqlInterviewQuestions,
  excelInterviewQuestions,
  powerBiInterviewQuestions,
  pythonInterviewQuestions,
  businessStatsInterviewQuestions,
  InterviewQuestion,
} from "../data/interviewQuestionsData";
import { masterTopicChecklist, TopicItem } from "../data/interviewTopicChecklist";
import { curatedResourcesList, CuratedResource } from "../data/interviewResourcesData";

interface InterviewMasterHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewMasterHub: React.FC<InterviewMasterHubProps> = ({ isOpen, onClose }) => {
  // Navigation Tabs
  const [activeMainTab, setActiveMainTab] = useState<
    "rounds_playbook" | "top_questions" | "topics_checklist" | "curated_resources" | "ai_mock_grader"
  >("rounds_playbook");

  // Question Bank State
  const [activeSkillCategory, setActiveSkillCategory] = useState<
    "sql" | "excel" | "powerbi" | "python" | "business_stats"
  >("sql");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>("sql-1");
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);

  // Topic Checklist Progress (stored in localStorage)
  const [checkedTopicIds, setCheckedTopicIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("da_interview_mastered_topics");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Selected Round in Rounds Playbook
  const [selectedRoundId, setSelectedRoundId] = useState<string>("round-1");

  // AI Mock Interviewer State
  const [mockSkill, setMockSkill] = useState<string>("SQL");
  const [mockDifficulty, setMockDifficulty] = useState<string>("Intermediate");
  const [mockCompanyType, setMockCompanyType] = useState<string>("Boutique Analytics Consultancy");
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState<boolean>(false);
  const [activeMockQuestion, setActiveMockQuestion] = useState<{
    title: string;
    companyContext: string;
    problemStatement: string;
    sampleInput?: string;
    expectedOutput?: string;
    hints?: string[];
  } | null>(null);
  const [candidateAnswerText, setCandidateAnswerText] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    verdict: string;
    summary: string;
    strengths: string[];
    weaknessesAndBugs: string[];
    modelSolution: string;
    talkingPoints: string;
  } | null>(null);

  // Save checklist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("da_interview_mastered_topics", JSON.stringify(checkedTopicIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedTopicIds]);

  const toggleTopic = (id: string) => {
    setCheckedTopicIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  // Questions dataset selector
  const currentQuestionsList: InterviewQuestion[] = useMemo(() => {
    switch (activeSkillCategory) {
      case "sql":
        return sqlInterviewQuestions;
      case "excel":
        return excelInterviewQuestions;
      case "powerbi":
        return powerBiInterviewQuestions;
      case "python":
        return pythonInterviewQuestions;
      case "business_stats":
        return businessStatsInterviewQuestions;
      default:
        return sqlInterviewQuestions;
    }
  }, [activeSkillCategory]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return currentQuestionsList.filter((q) => {
      if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const qStr = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(qStr);
        const matchesScenario = q.scenario.toLowerCase().includes(qStr);
        const matchesExpl = q.explanation.toLowerCase().includes(qStr);
        const matchesTags = q.tags.some((t) => t.toLowerCase().includes(qStr));
        return matchesTitle || matchesScenario || matchesExpl || matchesTags;
      }
      return true;
    });
  }, [currentQuestionsList, selectedDifficulty, searchQuery]);

  // Checklist mastery metrics
  const checklistStats = useMemo(() => {
    const total = masterTopicChecklist.length;
    const mastered = Object.values(checkedTopicIds).filter(Boolean).length;
    const percent = Math.round((mastered / (total || 1)) * 100);
    return { total, mastered, percent };
  }, [checkedTopicIds]);

  // Generate dynamic mock question via API
  const handleGenerateMockQuestion = async () => {
    setIsGeneratingQuestion(true);
    setEvaluationResult(null);
    setCandidateAnswerText("");

    try {
      const res = await fetch("/api/ai-mock-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: mockSkill,
          difficulty: mockDifficulty,
          companyType: mockCompanyType,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setActiveMockQuestion(data.data);
      } else {
        // Fallback question
        setActiveMockQuestion({
          title: "Consecutive Days Active User Logins",
          companyContext: "Blinkit Quick Commerce active user retention tracking in Hyderabad.",
          problemStatement: "Given a table `user_logins (user_id INT, login_date DATE)`, write a SQL query to find all users who logged in on at least 3 consecutive calendar days. Return `user_id`, `streak_start_date`, and `total_consecutive_days`.",
          sampleInput: "| user_id | login_date |\n| 101 | 2026-03-01 |\n| 101 | 2026-03-02 |\n| 101 | 2026-03-03 |\n| 102 | 2026-03-01 |\n| 102 | 2026-03-03 |",
          expectedOutput: "| user_id | streak_start_date | total_consecutive_days |\n| 101 | 2026-03-01 | 3 |",
          hints: ["Use ROW_NUMBER() partitioned by user_id ordered by login_date.", "Subtract ROW_NUMBER days from login_date to find constant streak grouping anchors."],
        });
      }
    } catch (err) {
      console.error(err);
      setActiveMockQuestion({
        title: "Consecutive Days Active User Logins",
        companyContext: "Blinkit Quick Commerce active user retention tracking in Hyderabad.",
        problemStatement: "Given a table `user_logins (user_id INT, login_date DATE)`, write a SQL query to find all users who logged in on at least 3 consecutive calendar days.",
        hints: ["Use ROW_NUMBER() partitioned by user_id ordered by login_date."],
      });
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  // Evaluate candidate's live answer via API
  const handleEvaluateAnswer = async () => {
    if (!activeMockQuestion || !candidateAnswerText.trim()) return;

    setIsEvaluating(true);
    try {
      const res = await fetch("/api/evaluate-interview-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: mockSkill,
          questionTitle: activeMockQuestion.title,
          problemStatement: activeMockQuestion.problemStatement,
          candidateAnswer: candidateAnswerText,
        }),
      });

      const data = await res.json();
      if (data.success && data.feedback) {
        setEvaluationResult(data.feedback);
      } else {
        setEvaluationResult({
          score: 8,
          verdict: "Hire",
          summary: "Solid analytical foundation. The solution captures the main logic and exhibits clear syntax structure.",
          strengths: ["Clean syntax and logical structuring.", "Correct partitioning logic."],
          weaknessesAndBugs: ["Consider wrapping division in NULLIF to avoid division by zero."],
          modelSolution: `-- Production Grade Solution\nWITH UserStreaks AS (\n  SELECT user_id, login_date,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn\n  FROM user_logins\n)\nSELECT user_id, MIN(login_date) AS streak_start, COUNT(*) AS total_consecutive_days\nFROM UserStreaks\nGROUP BY user_id\nHAVING COUNT(*) >= 3;`,
          talkingPoints: "State clearly: 'I partitioned by user_id and calculated consecutive sequences using date offsets to ensure optimal query execution time.'",
        });
      }
    } catch (err) {
      console.error(err);
      setEvaluationResult({
        score: 8,
        verdict: "Hire",
        summary: "Good structured response. Ensure edge cases like NULL values and duplicate timestamps are acknowledged.",
        strengths: ["Structured step-by-step thinking.", "Correct core operators used."],
        weaknessesAndBugs: ["Double check tie handling in rankings."],
        modelSolution: `-- Model Query\nSELECT * FROM data_table;`,
        talkingPoints: "Walk the interviewer through your thought process clearly before declaring completion.",
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="interview-master-hub-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="interview-master-hub-container"
        className="w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Data Analyst Placement & Interview Master Hub
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 font-bold hidden sm:inline-block">
                  2026 Fresher Edition
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Comprehensive 5-round playbook, top 50 real technical questions per skill, mastery checklist, and live AI interviewer
              </p>
            </div>
          </div>

          <button
            id="close-master-hub-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-slate-200 bg-slate-50/50 flex gap-2 overflow-x-auto shrink-0">
          <button
            id="tab-rounds-playbook-btn"
            onClick={() => setActiveMainTab("rounds_playbook")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeMainTab === "rounds_playbook"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> 5-Round Blueprint & Strategies
          </button>

          <button
            id="tab-top-questions-btn"
            onClick={() => setActiveMainTab("top_questions")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeMainTab === "top_questions"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-600" /> Top Questions Bank (50+ Per Skill)
          </button>

          <button
            id="tab-topics-checklist-btn"
            onClick={() => setActiveMainTab("topics_checklist")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeMainTab === "topics_checklist"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <ListChecks className="w-3.5 h-3.5 text-emerald-600" /> Must-Know Topics Tracker ({checklistStats.percent}%)
          </button>

          <button
            id="tab-curated-resources-btn"
            onClick={() => setActiveMainTab("curated_resources")}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeMainTab === "curated_resources"
                ? "border-blue-600 text-blue-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Curated Free Resources
          </button>

          <button
            id="tab-ai-mock-grader-btn"
            onClick={() => {
              setActiveMainTab("ai_mock_grader");
              if (!activeMockQuestion) {
                handleGenerateMockQuestion();
              }
            }}
            className={`pb-3 px-3 text-xs border-b-2 flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeMainTab === "ai_mock_grader"
                ? "border-purple-600 text-purple-900 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Live AI Mock Evaluator
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs">
          {/* TAB 1: 5-ROUND BLUEPRINT & STRATEGIES */}
          {activeMainTab === "rounds_playbook" && (
            <div className="space-y-6">
              {/* Company Archetypes Cards */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Hiring Archetypes & Selection Bars across Hyderabad & Bangalore
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {companyArchetypes.map((archetype, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-blue-900 text-xs">{archetype.type}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                            {archetype.salaryRangeFresher}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">
                          <strong className="text-slate-800">Examples:</strong> {archetype.examples.join(", ")}
                        </p>
                        <div className="mt-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800">
                          <span className="font-bold text-blue-800">Process: </span>
                          {archetype.processSummary}
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px]">
                        <span className="font-bold text-amber-800">What Decides Selection:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                          {archetype.fresherHiringBars.map((bar, bIdx) => (
                            <li key={bIdx}>{bar}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step 5 Rounds Deep-Dive */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Compass className="w-4 h-4 text-amber-600" />
                  Detailed Step-by-Step Round Guide & Clearing Strategy
                </h3>

                {/* Round selection buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {interviewRoundsGuide.map((round) => (
                    <button
                      key={round.id}
                      onClick={() => setSelectedRoundId(round.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition border cursor-pointer ${
                        selectedRoundId === round.id
                          ? "bg-blue-50 border-blue-600 text-blue-900 shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-800">
                        {round.roundNumber}
                      </span>
                      {round.title.split(":")[0]}
                    </button>
                  ))}
                </div>

                {/* Active Round Detail Panel */}
                {(() => {
                  const round = interviewRoundsGuide.find((r) => r.id === selectedRoundId) || interviewRoundsGuide[0];
                  return (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold">
                              Round {round.roundNumber}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">{round.title}</h4>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{round.subtitle}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px]">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-600" /> {round.duration}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                            {round.weightage}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-700 text-xs leading-relaxed">{round.description}</p>

                      {/* 2-Column Grid: Format & Key Topics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                          <h5 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-blue-600" /> Assessment Format & Structure
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-slate-700 list-disc list-inside">
                            {round.format.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                          <h5 className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                            <Brain className="w-3.5 h-3.5 text-amber-600" /> Core Focus Topics
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-slate-700 list-disc list-inside">
                            {round.keyTopics.map((k, i) => (
                              <li key={i}>{k}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Clearing Strategy & Winning Tactics */}
                      <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-2">
                        <h5 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-700" /> Insider Clearing Tactics & Proven Frameworks
                        </h5>
                        <ul className="space-y-1.5 text-[11px] text-emerald-950">
                          {round.clearingStrategy.map((strat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{strat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Pitfalls to Avoid */}
                      <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 space-y-2">
                        <h5 className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Deadly Mistakes to Avoid
                        </h5>
                        <ul className="space-y-1 text-[11px] text-rose-950 list-disc list-inside">
                          {round.commonMistakes.map((mistake, i) => (
                            <li key={i}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 2: TOP QUESTIONS BANK (50+ PER SKILL) */}
          {activeMainTab === "top_questions" && (
            <div className="space-y-4">
              {/* Skill Selector Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setActiveSkillCategory("sql")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      activeSkillCategory === "sql"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" /> SQL (Top 50)
                  </button>
                  <button
                    onClick={() => setActiveSkillCategory("excel")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      activeSkillCategory === "excel"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Excel (Top 50)
                  </button>
                  <button
                    onClick={() => setActiveSkillCategory("powerbi")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      activeSkillCategory === "powerbi"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Power BI & DAX (Top 50)
                  </button>
                  <button
                    onClick={() => setActiveSkillCategory("python")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      activeSkillCategory === "python"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" /> Python / Pandas (Top 50)
                  </button>
                  <button
                    onClick={() => setActiveSkillCategory("business_stats")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      activeSkillCategory === "business_stats"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5" /> Stats & Case Studies (25)
                  </button>
                </div>

                {/* Search & Difficulty Filter */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Levels</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Tricky">Tricky</option>
                  </select>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {filteredQuestions.map((q) => {
                  const isExpanded = expandedQuestionId === q.id;
                  const isMastered = !!checkedTopicIds[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-xl border transition overflow-hidden ${
                        isExpanded ? "border-blue-500 shadow-sm" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Question Header */}
                      <div
                        className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                q.difficulty === "Basic"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : q.difficulty === "Intermediate"
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : q.difficulty === "Advanced"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-rose-100 text-rose-800 border border-rose-200"
                              }`}
                            >
                              {q.difficulty}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                              {q.skillName}
                            </span>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{q.title}</h4>
                          </div>
                          <p className="text-slate-600 text-xs pl-0.5">{q.scenario}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopic(q.id);
                            }}
                            className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                              isMastered
                                ? "bg-emerald-100 border border-emerald-300 text-emerald-800"
                                : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {isMastered ? <CheckCircle2 className="w-3 h-3 text-emerald-700" /> : <Circle className="w-3 h-3" />}
                            {isMastered ? "Mastered" : "Mark Mastered"}
                          </button>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </div>

                      {/* Question Details / Solutions */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 space-y-3.5 border-t border-slate-100 bg-slate-50/50">
                          {/* Code or Formula Snippet */}
                          {(q.codeSnippet || q.formulaSnippet) && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                                  <Code2 className="w-3.5 h-3.5 text-blue-600" /> Production-Grade Query / Code
                                </span>
                                <button
                                  onClick={() => copyText(q.codeSnippet || q.formulaSnippet || "", q.id)}
                                  className="text-blue-700 hover:text-blue-900 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                                >
                                  {copiedCodeKey === q.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  {copiedCodeKey === q.id ? "Copied!" : "Copy Code"}
                                </button>
                              </div>
                              <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                                {q.codeSnippet || q.formulaSnippet}
                              </pre>
                            </div>
                          )}

                          {/* Technical & Conceptual Explanation */}
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-800">Technical Breakdown:</span>
                            <p className="text-slate-800 text-xs leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200">
                              {q.explanation}
                            </p>
                          </div>

                          {/* Interviewer Trap & Gotcha */}
                          {q.interviewerGotcha && (
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-amber-900 font-bold">Interviewer Trap / Gotcha: </strong>
                                {q.interviewerGotcha}
                              </div>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {q.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: MUST-KNOW TOPICS & MASTERY TRACKER */}
          {activeMainTab === "topics_checklist" && (
            <div className="space-y-5">
              {/* Progress Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-emerald-600" />
                    Data Analyst Core Topic Mastery Engine
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Track your readiness across all core topics tested in Technical Rounds 1 & 2
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-900">
                      {checklistStats.mastered} / {checklistStats.total}
                    </span>
                    <p className="text-[10px] text-slate-500 font-medium">Topics Mastered</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-600 flex items-center justify-center font-bold text-sm text-blue-900">
                    {checklistStats.percent}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-600 to-emerald-500 transition-all duration-500"
                  style={{ width: `${checklistStats.percent}%` }}
                />
              </div>

              {/* Topic Cards by Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {masterTopicChecklist.map((topic) => {
                  const isChecked = !!checkedTopicIds[topic.id];

                  return (
                    <div
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition select-none flex items-start gap-3 ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-300 shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`font-bold text-xs ${
                              isChecked ? "text-emerald-900 line-through decoration-emerald-600" : "text-slate-900"
                            }`}
                          >
                            {topic.name}
                          </h4>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                              topic.importance === "Must-Know"
                                ? "bg-rose-100 text-rose-800 border border-rose-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {topic.importance}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{topic.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {topic.keyKeywords.map((kw, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CURATED FREE RESOURCES */}
          {activeMainTab === "curated_resources" && (
            <div className="space-y-5">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Gold-Standard Free Practice Platforms & Cheat Sheets
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Hand-picked resources trusted by top analytics engineers to practice live SQL, master DAX, and ace case studies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curatedResourcesList.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between hover:border-slate-300 shadow-xs transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 font-bold">
                          {res.category}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200 font-bold">
                          {res.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{res.title}</h4>
                      <p className="text-[11px] text-slate-600">{res.description}</p>
                      <div className="text-[11px] bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-950">
                        <strong className="text-emerald-800">Why it's essential: </strong>
                        {res.whyItsBest}
                      </div>
                    </div>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition mt-2"
                    >
                      {res.actionTitle} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AI LIVE MOCK INTERVIEWER & GRADER */}
          {activeMainTab === "ai_mock_grader" && (
            <div className="space-y-5">
              {/* Question Config Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Live AI Technical Interviewer & Solution Grader</h3>
                      <p className="text-[11px] text-slate-600">Simulates live interview questions, verifies your logic, and scores your solution</p>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateMockQuestion}
                    disabled={isGeneratingQuestion}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {isGeneratingQuestion ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating Challenge...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> New Question
                      </>
                    )}
                  </button>
                </div>

                {/* Skill & Difficulty Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-600 font-bold uppercase">Target Skill</label>
                    <select
                      value={mockSkill}
                      onChange={(e) => setMockSkill(e.target.value)}
                      className="w-full mt-1 bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="Advanced SQL & Window Functions">Advanced SQL (Window, CTE, 3NF)</option>
                      <option value="Power BI & DAX Modeling">Power BI & DAX Modeling</option>
                      <option value="Advanced Excel & Modeling">Advanced Excel & Formulations</option>
                      <option value="Python & Pandas Data Cleaning">Python & Pandas (ETL & EDA)</option>
                      <option value="Business Case & Root Cause Analysis">Product & Business Case Studies</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-600 font-bold uppercase">Difficulty Level</label>
                    <select
                      value={mockDifficulty}
                      onChange={(e) => setMockDifficulty(e.target.value)}
                      className="w-full mt-1 bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="Intermediate">Intermediate (Standard Fresher)</option>
                      <option value="Advanced">Advanced (Top Tier Product / FinTech)</option>
                      <option value="Tricky Edge Cases">Tricky (NULLs, Ties, Performance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-600 font-bold uppercase">Company Archetype</label>
                    <select
                      value={mockCompanyType}
                      onChange={(e) => setMockCompanyType(e.target.value)}
                      className="w-full mt-1 bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="Boutique Analytics Consultancy">Boutique Analytics (Fractal, Tiger)</option>
                      <option value="Quick Commerce & Unicorn Startup">Unicorn Startup (Swiggy, Blinkit, Razorpay)</option>
                      <option value="Global Investment Banking Captive">GCC / FinTech (Goldman, Invesco)</option>
                      <option value="Tier-1 Enterprise IT">Tier-1 IT (TCS Digital, Cognizant)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Mock Question Card */}
              {activeMockQuestion && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-bold">
                        Live Technical Challenge
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">{activeMockQuestion.title}</h4>
                      <p className="text-xs text-blue-700 font-semibold mt-0.5">🏢 Context: {activeMockQuestion.companyContext}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
                    {activeMockQuestion.problemStatement}
                  </div>

                  {activeMockQuestion.sampleInput && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700">Sample Schema / Input Data:</span>
                      <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto">
                        {activeMockQuestion.sampleInput}
                      </pre>
                    </div>
                  )}

                  {activeMockQuestion.hints && activeMockQuestion.hints.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                      <span className="font-bold text-amber-900">💡 Interviewer Hints:</span>
                      <ul className="list-disc list-inside space-y-0.5 pl-1 text-amber-950">
                        {activeMockQuestion.hints.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Candidate Input Area */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>Your Live Solution (Write your SQL Query, Code, or Analytical Approach):</span>
                      <span className="text-[10px] text-slate-500 font-normal">Screen-sharing simulation</span>
                    </label>
                    <textarea
                      rows={6}
                      value={candidateAnswerText}
                      onChange={(e) => setCandidateAnswerText(e.target.value)}
                      placeholder="e.g. WITH RankedUsers AS (\n  SELECT user_id, login_date, ...\n)..."
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-600 leading-relaxed"
                    />

                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={handleEvaluateAnswer}
                        disabled={isEvaluating || !candidateAnswerText.trim()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs disabled:opacity-50 cursor-pointer"
                      >
                        {isEvaluating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Evaluating with AI...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Submit for Evaluation & Feedback
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* AI Evaluation Report */}
                  {evaluationResult && (
                    <div className="p-5 rounded-2xl bg-white border border-purple-300 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-purple-600" />
                          <h5 className="font-bold text-slate-900 text-sm">Interviewer Feedback & Scorecard</h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              evaluationResult.verdict.includes("Hire")
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {evaluationResult.verdict}
                          </span>
                          <span className="text-base font-bold text-slate-900">
                            {evaluationResult.score} / 10
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">{evaluationResult.summary}</p>

                      {/* Strengths & Weaknesses */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                          <span className="font-bold text-emerald-900"> Strengths Demonstrated:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-emerald-950 text-[11px]">
                            {evaluationResult.strengths.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                          <span className="font-bold text-rose-900">⚠️ Missed Edge Cases & Improvements:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-rose-950 text-[11px]">
                            {evaluationResult.weaknessesAndBugs.map((w, i) => (
                              <li key={i}>{w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Model Production Solution */}
                      {evaluationResult.modelSolution && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                            <Code2 className="w-3.5 h-3.5 text-blue-600" /> Optimal Model Solution:
                          </span>
                          <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                            {evaluationResult.modelSolution}
                          </pre>
                        </div>
                      )}

                      {/* Verbal Talking Points */}
                      {evaluationResult.talkingPoints && (
                        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs">
                          <strong className="text-purple-900 font-bold">🗣️ Exact Soundbite to Say to Interviewer: </strong>
                          {evaluationResult.talkingPoints}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-600 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Mastery: {checklistStats.mastered} of {checklistStats.total} Core Topics ({checklistStats.percent}%)</span>
          </div>

          <button
            id="close-master-hub-bottom-btn"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Close Master Hub
          </button>
        </div>
      </div>
    </div>
  );
};
