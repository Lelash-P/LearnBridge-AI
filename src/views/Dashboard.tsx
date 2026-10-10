import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  HardDrive,
  Play,
  Repeat,
  Compass,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    profile,
    completedRecords,
    latestGapAnalysis,
    setCurrentView,
    setActiveTopic,
    loadDemoStudentProfile,
    resetAllProgress,
    startHackathonDemo,
  } = useLearning();

  const totalQuizzes = completedRecords.filter((r) => r.quizScore !== undefined).length;
  const avgAccuracy =
    totalQuizzes > 0
      ? Math.round(
          completedRecords.reduce((acc, r) => acc + (r.quizScore || 0), 0) / totalQuizzes
        )
      : 0;

  // Active gaps needing revision
  const activeGaps = latestGapAnalysis?.gapsIdentified || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & Profile Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl border border-white/20 shadow-inner">
              {profile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {profile.name}!
                </h1>
                {profile.isDemoUser && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Demo Profile
                  </span>
                )}
              </div>
              <p className="text-indigo-200 text-xs sm:text-sm mt-1">
                Learning Level: <span className="text-white font-semibold">{profile.level}</span> • Focus: <span className="text-white font-semibold">{profile.primarySubject}</span> • Language: <span className="text-white font-semibold">{profile.preferredLanguage}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => startHackathonDemo(1)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Java Loops Demo</span>
            </button>

            <button
              onClick={() => setCurrentView('tutor')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Tutor a Topic</span>
            </button>
          </div>
        </div>

        {/* Local Storage Indicator Banner */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-indigo-200">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-teal-400" />
            <span>
              Device Storage Active: All learning progress is stored privately inside your local browser.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!profile.isDemoUser || completedRecords.length === 0 ? (
              <button
                onClick={loadDemoStudentProfile}
                className="text-amber-300 hover:text-amber-200 font-semibold underline cursor-pointer"
              >
                Load Sample Demo Data
              </button>
            ) : null}
            <button
              onClick={() => {
                if (confirm('Clear local study history and reset dashboard?')) {
                  resetAllProgress();
                }
              }}
              className="text-indigo-300 hover:text-white cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRIC TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Topics Studied */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Topics Studied
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">
              {completedRecords.length}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Active learning sessions
            </p>
          </div>
        </div>

        {/* Metric 2: Quizzes Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Quizzes Completed
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">
              {totalQuizzes}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Evaluated assessments
            </p>
          </div>
        </div>

        {/* Metric 3: Quiz Accuracy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Accuracy
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">
              {totalQuizzes > 0 ? `${avgAccuracy}%` : '—'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {totalQuizzes > 0 ? 'Across completed quizzes' : 'Take a quiz to calculate'}
            </p>
          </div>
        </div>

        {/* Metric 4: Active Learning Gaps */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Revision Queues
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-slate-900">
              {activeGaps.length}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Targeted concepts identified
            </p>
          </div>
        </div>
      </div>

      {/* TWO COLUMN SECTION: ADAPTIVE REVISION & RECENT CONCEPTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Areas Recommended for Revision & Adaptive Next Lesson */}
        <div className="lg:col-span-2 space-y-6">
          {/* Areas Recommended for Revision */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Areas Recommended for Revision
                  </h3>
                  <p className="text-xs text-slate-500">
                    Derived from actual incorrect quiz submissions — no fabricated metrics.
                  </p>
                </div>
              </div>

              {activeGaps.length > 0 && (
                <button
                  onClick={() => setCurrentView('gaps')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Practice Gaps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {activeGaps.length > 0 ? (
              <div className="space-y-3">
                {activeGaps.map((gap, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-900">
                          {gap.identifiedGap}
                        </span>
                        <span className="bg-amber-200 text-amber-900 text-[10px] font-mono px-1.5 py-0.5 rounded">
                          {gap.conceptTag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">
                        {gap.remedialExplanation}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentView('gaps');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                    >
                      Remedy Gap
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">
                  No Active Learning Gaps Detected!
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Complete a quiz in Java, Math, Python, or Grammar to generate evidence-based gap analysis.
                </p>
                <button
                  onClick={() => setCurrentView('quiz')}
                  className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Take a Diagnostic Quiz</span>
                </button>
              </div>
            )}
          </div>

          {/* Adaptive Next Lesson Recommendation (FEATURE E) */}
          <div className="bg-gradient-to-br from-indigo-50/80 to-teal-50/60 rounded-3xl p-6 border border-indigo-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                <Repeat className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
                FEATURE E: Adaptive Practice Engine
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {latestGapAnalysis?.adaptiveRecommendation?.headline ||
                'Foundational Concept Readiness'}
            </h3>

            <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
              {latestGapAnalysis?.adaptiveRecommendation?.reasoning ||
                'Based on your current Beginner profile, we recommend starting with Java Loops to experience the full adaptive cycle: Understand -> Practice -> Identify Gaps -> Personalize Next Lesson.'}
            </p>

            <div className="mt-4 pt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">Suggested Activity: </strong>
                <span>
                  {latestGapAnalysis?.adaptiveRecommendation?.suggestedActivity ||
                    'Explore Java Loops in simple English or Tamil.'}
                </span>
              </div>

              <button
                onClick={() => {
                  setActiveTopic('Java Loops');
                  setCurrentView('tutor');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Start Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 col: Recently Studied Topics & Quick Shortcuts */}
        <div className="space-y-6">
          {/* Recently Studied Topics */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center justify-between">
              <span>Recently Practiced</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </h3>

            {completedRecords.length > 0 ? (
              <div className="space-y-3">
                {completedRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                        {rec.topic}
                      </h4>
                      {rec.quizScore !== undefined && (
                        <span
                          className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded ${
                            rec.quizScore >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : rec.quizScore >= 60
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rec.quizScore}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                      <span>{rec.level} • {rec.language}</span>
                      <span>
                        {new Date(rec.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs">
                <p>No recent topics recorded yet.</p>
                <button
                  onClick={loadDemoStudentProfile}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer underline"
                >
                  Load Sample History
                </button>
              </div>
            )}
          </div>

          {/* Quick Learning Shortcuts */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
              Quick Shortcuts
            </h3>
            <p className="text-xs text-slate-300">
              Direct access to essential learning portals:
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => setCurrentView('language-bridge')}
                className="w-full text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer text-xs flex items-center justify-between"
              >
                <span>Bilingual Language Bridge (தமிழ்)</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              </button>

              <button
                onClick={() => setCurrentView('study-plan')}
                className="w-full text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer text-xs flex items-center justify-between"
              >
                <span>Study Plan Generator</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              </button>

              <button
                onClick={() => setCurrentView('offline-library')}
                className="w-full text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer text-xs flex items-center justify-between"
              >
                <span>Offline 5-Subject Toolkit</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
