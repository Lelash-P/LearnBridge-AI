import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { OFFLINE_LIBRARY, OfflineSubjectModule } from '../data/offlineLibrary';
import {
  WifiOff,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Languages,
  Code2,
  Calculator,
  PenTool,
  Cpu,
} from 'lucide-react';

export const OfflineLibraryView: React.FC = () => {
  const {
    setCurrentExplanation,
    setCurrentQuiz,
    setLatestGapAnalysis,
    setActiveTopic,
    setActiveLanguage,
    setCurrentView,
  } = useLearning();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewModule, setPreviewModule] = useState<OfflineSubjectModule | null>(OFFLINE_LIBRARY[0]);

  const categories = ['All', 'Programming', 'Mathematics', 'English Grammar', 'Computer Science'];

  const filteredModules = OFFLINE_LIBRARY.filter(
    (m) => selectedCategory === 'All' || m.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code2 className="w-4 h-4 text-indigo-600" />;
      case 'Mathematics':
        return <Calculator className="w-4 h-4 text-blue-600" />;
      case 'English Grammar':
        return <PenTool className="w-4 h-4 text-emerald-600" />;
      case 'Computer Science':
        return <Cpu className="w-4 h-4 text-purple-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-600" />;
    }
  };

  const startLesson = (module: OfflineSubjectModule, lang: 'English' | 'Tamil') => {
    setActiveTopic(module.title);
    setActiveLanguage(lang);
    setCurrentExplanation(lang === 'Tamil' ? module.explanationTa : module.explanationEn);
    setCurrentView('tutor');
  };

  const startQuiz = (module: OfflineSubjectModule, lang: 'English' | 'Tamil' = 'English') => {
    setActiveTopic(module.title);
    setActiveLanguage(lang);
    setCurrentQuiz(lang === 'Tamil' ? module.quizTa : module.quizEn);
    setCurrentView('quiz');
  };

  const viewGaps = (module: OfflineSubjectModule) => {
    setActiveTopic(module.title);
    setLatestGapAnalysis(module.sampleGapAnalysis);
    setCurrentView('gaps');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <WifiOff className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Built-in Offline Learning Toolkit
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete, verified curriculum for 5 fundamental subjects that runs 100% locally. Zero network connection or API key needed.
        </p>
      </div>

      {/* Offline Guarantee Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-extrabold text-sm text-emerald-950">
              Guaranteed Offline Accessibility
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Every lesson, multiple-choice quiz, and cognitive gap rule in this toolkit is packaged directly into the client application. If internet connectivity drops, student learning never halts.
            </p>
          </div>
        </div>

        <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs">
          5 Subjects Pre-loaded
        </span>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {getCategoryIcon(module.category)}
                  <span>{module.category}</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Offline Ready
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900">
                {module.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {module.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>5-Question Conceptual Quiz</span>
                <span>Bilingual (EN & தமிழ்)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => startLesson(module, 'English')}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center"
                >
                  Lesson (EN)
                </button>

                <button
                  onClick={() => startLesson(module, 'Tamil')}
                  className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-colors cursor-pointer text-center"
                >
                  தமிழ் பாடம்
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => startQuiz(module, 'English')}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Take Quiz</span>
                </button>

                <button
                  onClick={() => viewGaps(module)}
                  className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <span>Sample Gaps</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
