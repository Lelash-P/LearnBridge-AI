import React from 'react';
import { useLearning } from '../context/LearningContext';
import { HACKATHON_DEMO_STEPS } from '../data/demoScenario';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const DemoWalkthroughBanner: React.FC = () => {
  const { demoMode, setDemoStep, exitDemoMode } = useLearning();

  if (!demoMode.isActive) return null;

  const currentStepDef = HACKATHON_DEMO_STEPS.find(
    (s) => s.stepNumber === demoMode.currentStep
  ) || HACKATHON_DEMO_STEPS[0];

  const handlePrev = () => {
    if (demoMode.currentStep > 1) {
      setDemoStep(demoMode.currentStep - 1);
    }
  };

  const handleNext = () => {
    if (demoMode.currentStep < 7) {
      setDemoStep(demoMode.currentStep + 1);
    } else {
      exitDemoMode();
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 px-4 py-3 shadow-md border-b border-amber-400 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Step indicator and Title */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-slate-950 text-amber-300 font-extrabold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUDGE DEMO: STEP {demoMode.currentStep} OF 7</span>
          </div>

          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-950 leading-tight">
              {currentStepDef.title}: <span className="font-semibold text-slate-900">{currentStepDef.shortDesc}</span>
            </h4>
            <p className="text-xs text-slate-900/90 hidden sm:block">
              {currentStepDef.details}
            </p>
          </div>
        </div>

        {/* Center: Step indicators */}
        <div className="hidden lg:flex items-center gap-1.5">
          {HACKATHON_DEMO_STEPS.map((s) => {
            const isCompleted = s.stepNumber < demoMode.currentStep;
            const isCurrent = s.stepNumber === demoMode.currentStep;
            return (
              <button
                key={s.stepNumber}
                onClick={() => setDemoStep(s.stepNumber)}
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-950 text-amber-300 ring-2 ring-white scale-110 shadow-sm'
                    : isCompleted
                    ? 'bg-amber-300 text-slate-950 hover:bg-white'
                    : 'bg-amber-700/60 text-slate-900 hover:bg-amber-700'
                }`}
                title={`Step ${s.stepNumber}: ${s.title}`}
              >
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : s.stepNumber}
              </button>
            );
          })}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={handlePrev}
            disabled={demoMode.currentStep === 1}
            className="px-2.5 py-1 rounded bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="px-3 py-1 rounded bg-slate-950 text-amber-300 hover:bg-slate-900 font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
          >
            <span>{demoMode.currentStep === 7 ? 'Complete Walkthrough' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={exitDemoMode}
            className="p-1 text-slate-950/70 hover:text-slate-950 rounded hover:bg-slate-950/10 cursor-pointer ml-1"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
