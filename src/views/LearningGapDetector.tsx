import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { OFFLINE_LIBRARY } from '../data/offlineLibrary';
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Repeat,
  Check,
  Award,
} from 'lucide-react';

export const LearningGapDetector: React.FC = () => {
  const {
    latestGapAnalysis,
    currentQuizSubmission,
    activeTopic,
    setCurrentView,
    setActiveTopic,
    demoMode,
  } = useLearning();

  // Drill answers state
  const [drillAnswers, setDrillAnswers] = useState<Record<number, number>>({});
  const [drillSubmitted, setDrillSubmitted] = useState(false);

  // If no gap analysis exists yet, pick sample Java Loops gap analysis for demonstration
  const fallbackAnalysis = OFFLINE_LIBRARY[0].sampleGapAnalysis;
  const analysis = latestGapAnalysis || fallbackAnalysis;

  const handleSelectDrill = (questionId: number, optionIdx: number) => {
    if (drillSubmitted) return;
    setDrillAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleDrillSubmit = () => {
    setDrillSubmitted(true);
  };

  const drillQuestions = analysis.targetedPracticeQuestions || [];
  const drillScore = drillQuestions.filter(
    (q) => drillAnswers[q.id] === q.correctAnswerIndex
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Learning Gap Detector & Adaptive Practice
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Evidence-based cognitive diagnosis derived strictly from your actual quiz answers. No fabricated metrics or speculative intelligence claims.
        </p>
      </div>

      {/* SUMMARY BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                EVALUATION SUBJECT:
              </span>
              <span className="font-extrabold text-lg text-slate-900">
                {analysis.topic}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded">
                Level: {analysis.level}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {analysis.overallSummary}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-semibold uppercase">Quiz Score</p>
              <p className="text-3xl font-extrabold text-slate-900">
                {analysis.scorePercent}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* IDENTIFIED GAPS CARDS (FEATURE D) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>
                {analysis.gapsIdentified.length > 0
                  ? `${analysis.gapsIdentified.length} Specific Learning Gap(s) Pinpointed`
                  : 'Zero Learning Gaps Detected! Complete Concept Mastery'}
              </span>
            </h3>
            <span className="text-xs text-slate-500">
              Correlated with actual missed question tags
            </span>
          </div>

          {analysis.gapsIdentified.map((gap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center">
                    !
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-amber-950">
                    Weak Area: {gap.identifiedGap}
                  </h4>
                </div>
                <span className="bg-amber-200 text-amber-900 font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  Tag: {gap.conceptTag}
                </span>
              </div>

              {/* Remedial explanation */}
              <div className="p-3.5 rounded-xl bg-white border border-amber-200/60 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <strong className="text-amber-900 block mb-1">Targeted Conceptual Clarification:</strong>
                <p>{gap.remedialExplanation}</p>
              </div>

              {/* Concrete real-world analogy */}
              {gap.concreteAnalogy && (
                <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-900">Intuitive Anchor Analogy:</strong>
                    <span>{gap.concreteAnalogy}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* TRANSPARENT ADAPTIVE NEXT ACTION (FEATURE E) */}
        {analysis.adaptiveRecommendation && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50/80 to-indigo-50/70 border border-teal-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                <Repeat className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wider">
                FEATURE E: Transparent Adaptive Action
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-slate-900">
                {analysis.adaptiveRecommendation.headline}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                <strong className="text-slate-900">Adaptive Logic Rationale: </strong>
                {analysis.adaptiveRecommendation.reasoning}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-teal-900 font-semibold">
                Action: {analysis.adaptiveRecommendation.suggestedActivity}
              </span>

              <button
                onClick={() => {
                  setActiveTopic(analysis.topic);
                  setCurrentView('tutor');
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Revise with Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TARGETED 3-QUESTION PRACTICE DRILL */}
      {drillQuestions.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  🎯
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Targeted Remedial Practice Drill (3 Questions)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Specially generated to reinforce loop condition bounds & updates.
              </p>
            </div>

            {drillSubmitted && (
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                Drill Score: {drillScore} / {drillQuestions.length} ({Math.round((drillScore / drillQuestions.length) * 100)}%)
              </span>
            )}
          </div>

          <div className="space-y-4">
            {drillQuestions.map((q, idx) => {
              const selectedIdx = drillAnswers[q.id];
              const isOptionSelected = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    drillSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-rose-50/40 border-rose-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 whitespace-pre-line">
                        {q.question}
                      </h4>
                    </div>

                    {drillSubmitted && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? '✓ Fixed' : '✕ Missed'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedIdx === optIdx;
                      const isOptionRight = q.correctAnswerIndex === optIdx;

                      let style = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';
                      if (!drillSubmitted) {
                        if (isSelected) style = 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-1 ring-indigo-500';
                      } else {
                        if (isOptionRight) style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        else if (isSelected && !isOptionRight) style = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                        else style = 'bg-white border-slate-200 text-slate-400 opacity-60';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectDrill(q.id, optIdx)}
                          disabled={drillSubmitted}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border border-current text-[10px] font-bold flex items-center justify-center">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {drillSubmitted && isOptionRight && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                        </button>
                      );
                    })}
                  </div>

                  {drillSubmitted && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs text-slate-700">
                      <strong className="text-slate-900 block mb-0.5">Remedial Note:</strong>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {drillSubmitted
                ? 'Drill completed! Your dashboard metrics have updated.'
                : `${Object.keys(drillAnswers).length} of ${drillQuestions.length} answered`}
            </span>

            {!drillSubmitted ? (
              <button
                onClick={handleDrillSubmit}
                disabled={Object.keys(drillAnswers).length === 0}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-40"
              >
                Submit Remedial Drill
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDrillSubmitted(false);
                    setDrillAnswers({});
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Drill</span>
                </button>

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>View Updated Dashboard (Step 7)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ETHICAL DISCLAIMER */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 block">Ethical Learning Boundary:</strong>
          <span>
            LearnBridge AI analyzes specific question response options to provide immediate educational support. It does not measure human intelligence or diagnose learning disabilities.
          </span>
        </div>
      </div>
    </div>
  );
};
