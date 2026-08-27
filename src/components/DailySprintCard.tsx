import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Flame, Target, Trophy, ArrowRight, CheckCircle2, RotateCcw, Zap } from "lucide-react";
import { DailySprint } from "../types";

interface DailySprintCardProps {
  sprint: DailySprint;
  totalApplied: number;
  totalCompanies: number;
  onUpdateTarget: (newTarget: number) => void;
  onApplyNextQueue: () => void;
}

export const DailySprintCard: React.FC<DailySprintCardProps> = ({
  sprint,
  totalApplied,
  totalCompanies,
  onUpdateTarget,
  onApplyNextQueue,
}) => {
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [customTarget, setCustomTarget] = useState(sprint.target);

  const percentage = Math.min(100, Math.round((sprint.appliedToday / sprint.target) * 100));
  const isGoalReached = sprint.appliedToday >= sprint.target;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSaveTarget = () => {
    const valid = Math.max(1, Math.min(50, customTarget));
    onUpdateTarget(valid);
    setIsEditingTarget(false);
  };

  return (
    <div
      id="daily-sprint-card"
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-slate-800 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Left Side: Sprint Status & Streak */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                Daily Application Sprint
              </h2>
              {sprint.streak > 0 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-600" /> {sprint.streak} Day Streak!
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Goal: Apply to <span className="text-blue-700 font-bold">{sprint.target} companies</span> daily.
              Total applied so far: <span className="text-slate-900 font-bold">{totalApplied} / {totalCompanies}</span> ({Math.round((totalApplied / totalCompanies) * 100)}%)
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action & Target Adjuster */}
        <div className="flex items-center gap-3 shrink-0">
          {isEditingTarget ? (
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-300">
              <input
                id="sprint-target-input"
                type="number"
                min={1}
                max={50}
                value={customTarget}
                onChange={(e) => setCustomTarget(parseInt(e.target.value) || 1)}
                className="w-12 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 text-center font-bold"
              />
              <button
                id="save-sprint-target-btn"
                onClick={handleSaveTarget}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              id="edit-sprint-target-btn"
              onClick={() => setIsEditingTarget(true)}
              className="text-xs text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 transition flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-blue-600" /> Target: {sprint.target}/day
            </button>
          )}

          <button
            id="apply-next-queue-btn"
            onClick={onApplyNextQueue}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300" /> Next 5 in Queue <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Today's Progress:</span>
            <span className="font-bold text-slate-900">
              {sprint.appliedToday} of {sprint.target} Applied Today
            </span>
            {isGoalReached && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px] bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Target Achieved! 🎉
              </span>
            )}
          </div>
          <span className="text-slate-500 text-xs font-semibold font-mono">{percentage}% Complete</span>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isGoalReached
                ? "bg-linear-to-r from-emerald-500 to-teal-500"
                : "bg-linear-to-r from-blue-600 to-indigo-600"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
