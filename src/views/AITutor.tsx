import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { LearningLevel, SupportedLanguage, TutorExplanation } from '../types/learning';
import { OFFLINE_LIBRARY } from '../data/offlineLibrary';
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  ListOrdered,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Languages,
  Check,
  Zap,
  WifiOff,
} from 'lucide-react';

export const AITutor: React.FC = () => {
  const {
    activeTopic,
    setActiveTopic,
    activeLevel,
    setActiveLevel,
    activeLanguage,
    setActiveLanguage,
    currentExplanation,
    setCurrentExplanation,
    setCurrentView,
    aiServerStatus,
  } = useLearning();

  const [inputTopic, setInputTopic] = useState(activeTopic || 'Java Loops');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDetailed, setShowDetailed] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'example' | 'takeaways'>('overview');

  const popularTopics = [
    { title: 'Java Loops (for, while, do-while)', level: 'Beginner' as LearningLevel },
    { title: 'Python Lists and Dictionaries', level: 'Beginner' as LearningLevel },
    { title: 'Everyday Percentages & Fractions', level: 'Beginner' as LearningLevel },
    { title: 'Active vs. Passive Voice in Writing', level: 'Beginner' as LearningLevel },
    { title: 'Algorithms & Big-O Time Complexity', level: 'Beginner' as LearningLevel },
    { title: 'Photosynthesis & Cellular Respiration', level: 'Intermediate' as LearningLevel },
  ];

  const handleFetchExplanation = async (topicToFetch = inputTopic) => {
    if (!topicToFetch.trim()) {
      setErrorMessage('Please enter an educational topic or question.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setActiveTopic(topicToFetch.trim());

    // Check if offline match exists in local library
    const offlineMatch = OFFLINE_LIBRARY.find(
      (m) =>
        m.title.toLowerCase().includes(topicToFetch.toLowerCase()) ||
        topicToFetch.toLowerCase().includes(m.id) ||
        topicToFetch.toLowerCase().includes('java loop')
    );

    try {
      const response = await fetch('/api/tutor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToFetch.trim(),
          level: activeLevel,
          language: activeLanguage,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          const explanation: TutorExplanation = {
            ...json.data,
            source: 'gemini-3.8-flash',
            timestamp: new Date().toISOString(),
          };
          setCurrentExplanation(explanation);
          setLoading(false);
          return;
        }
      }

      // If API returned error or key is unconfigured, fall back gracefully
      const resJson = await response.json().catch(() => ({}));
      if (offlineMatch) {
        // Use verified offline library
        const exp = activeLanguage === 'Tamil' ? offlineMatch.explanationTa : offlineMatch.explanationEn;
        setCurrentExplanation(exp);
      } else {
        // Synthesize dynamic offline explanation
        const synthesized: TutorExplanation = {
          topic: topicToFetch.trim(),
          level: activeLevel,
          language: activeLanguage,
          simpleExplanation: `In ${activeLevel} terms: "${topicToFetch.trim()}" is an essential educational concept that forms a foundational building block in its subject.`,
          detailedExplanation: `When exploring ${topicToFetch.trim()} at an ${activeLevel} stage, we study its structural components, how rules govern its behavior, and how it connects to surrounding concepts.`,
          realWorldExample: `Think of ${topicToFetch.trim()} like following a well-tested recipe in cooking: every ingredient and timing rule has a clear cause-and-effect relationship.`,
          stepByStep: [
            `Step 1: Understand the foundational definitions of ${topicToFetch.trim()}.`,
            `Step 2: Observe how the mechanics behave with a small, concrete test case.`,
            `Step 3: Apply the concept to solve an interactive practice problem.`
          ],
          keyTakeaways: [
            `Core definitions of ${topicToFetch.trim()} set the foundation.`,
            `Rules must be applied consistently to avoid common boundary mistakes.`,
            `Practicing with real-world examples solidifies retention.`
          ],
          followUpQuestions: [
            `How does ${topicToFetch.trim()} behave in edge cases or unusual circumstances?`,
            `What is a common pitfall that students encounter when first learning ${topicToFetch.trim()}?`,
            `Can you connect ${topicToFetch.trim()} to a related topic you already know?`
          ],
          source: 'offline-toolkit',
          timestamp: new Date().toISOString()
        };
        setCurrentExplanation(synthesized);
      }
    } catch (err: any) {
      console.warn('Network call failed, falling back to offline toolkit:', err);
      if (offlineMatch) {
        const exp = activeLanguage === 'Tamil' ? offlineMatch.explanationTa : offlineMatch.explanationEn;
        setCurrentExplanation(exp);
      } else {
        setErrorMessage('Unable to reach the live AI service and no offline topic matched.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Personalized AI Tutor
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter any educational topic. Get simplified explanations, real-world analogies, step-by-step guides, and deep curiosity prompts in English or Tamil.
          </p>
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['Beginner', 'Intermediate', 'Advanced'] as LearningLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setActiveLevel(lvl);
                if (currentExplanation) {
                  // Re-fetch at new level
                  handleFetchExplanation(activeTopic);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLevel === lvl
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Topic Input Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFetchExplanation();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              placeholder="e.g. Java Loops, Photosynthesis, Binary Search, Newton's Laws..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language toggle within search */}
            <button
              type="button"
              onClick={() => {
                const nextLang = activeLanguage === 'English' ? 'Tamil' : 'English';
                setActiveLanguage(nextLang);
              }}
              className="px-3.5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="Toggle Explanation Language"
            >
              <Languages className="w-4 h-4 text-indigo-600" />
              <span>{activeLanguage === 'English' ? 'English' : 'தமிழ் (Tamil)'}</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Explaining...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Explain Topic</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Popular Topic Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-500">Popular topics:</span>
          {popularTopics.map((pt) => (
            <button
              key={pt.title}
              type="button"
              onClick={() => {
                setInputTopic(pt.title);
                handleFetchExplanation(pt.title);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs transition-colors cursor-pointer border border-transparent hover:border-indigo-200"
            >
              {pt.title}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* EXPLANATION OUTPUT CARD */}
      {currentExplanation ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Header of explanation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {currentExplanation.topic}
                </h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  {currentExplanation.level}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {currentExplanation.language}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pedagogical explanation adapted to {currentExplanation.level} learning pace.
              </p>
            </div>

            {/* Source indicator badge */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  currentExplanation.source === 'gemini-3.8-flash'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {currentExplanation.source === 'gemini-3.8-flash' ? (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
                    <span>Live AI (Gemini 3.8 Flash)</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                    <span>Offline Curated Toolkit</span>
                  </>
                )}
              </span>

              {/* Direct CTA to take quiz */}
              <button
                onClick={() => {
                  setActiveTopic(currentExplanation.topic);
                  setCurrentView('quiz');
                }}
                className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Take Diagnostic Quiz</span>
              </button>
            </div>
          </div>

          {/* Simple Explanation Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-white border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Simple Explanation (Core Intuition)</span>
            </div>
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
              {currentExplanation.simpleExplanation}
            </p>
          </div>

          {/* Real-World Metaphor Card */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Real-World Metaphor</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              {currentExplanation.realWorldExample}
            </p>
          </div>

          {/* Detailed Explanation Toggle */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
            <button
              onClick={() => setShowDetailed(!showDetailed)}
              className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-800 hover:text-indigo-600 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Detailed Explanation & Underlying Mechanics</span>
              </span>
              {showDetailed ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
            {showDetailed && (
              <div className="mt-3 pt-3 border-t border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2">
                <p>{currentExplanation.detailedExplanation}</p>
              </div>
            )}
          </div>

          {/* Step-by-Step Breakdown */}
          {currentExplanation.stepByStep?.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-indigo-600" />
                <span>Step-by-Step Conceptual Breakdown</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentExplanation.stepByStep.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {currentExplanation.keyTakeaways?.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Key Takeaways for Revision</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentExplanation.keyTakeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/60 text-xs text-slate-800 flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3 Interactive Follow-up Questions */}
          {currentExplanation.followUpQuestions?.length > 0 && (
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>3 Follow-up Questions for Deeper Learning (Click to Inquire)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentExplanation.followUpQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputTopic(q);
                      handleFetchExplanation(q);
                    }}
                    className="p-3 rounded-xl bg-white border border-indigo-200/80 hover:border-indigo-400 hover:shadow-xs text-left text-xs font-semibold text-indigo-950 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <span>{q}</span>
                    <span className="text-[10px] text-indigo-600 font-bold mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore this <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA to trigger Quiz */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Ready to test your comprehension? Start the 5-question diagnostic quiz.
            </div>

            <button
              onClick={() => {
                setActiveTopic(currentExplanation.topic);
                setCurrentView('quiz');
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Take Quiz on {currentExplanation.topic}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            What would you like to understand today?
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select a popular topic above or enter your own question. The AI tutor will adapt the explanation to your {activeLevel} level.
          </p>
          <button
            onClick={() => handleFetchExplanation('Java Loops')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Explain Java Loops (Sample Lesson)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
