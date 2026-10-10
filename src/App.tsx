import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Header } from './components/Header';
import { DemoWalkthroughBanner } from './components/DemoWalkthroughBanner';
import { OnboardingModal } from './components/OnboardingModal';
import { LandingPage } from './views/LandingPage';
import { Dashboard } from './views/Dashboard';
import { AITutor } from './views/AITutor';
import { LanguageBridge } from './views/LanguageBridge';
import { SmartQuiz } from './views/SmartQuiz';
import { LearningGapDetector } from './views/LearningGapDetector';
import { StudyPlanView } from './views/StudyPlanView';
import { OfflineLibraryView } from './views/OfflineLibraryView';
import { AboutSection } from './views/AboutSection';
import { Zap } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, startHackathonDemo } = useLearning();
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'tutor':
        return <AITutor />;
      case 'language-bridge':
        return <LanguageBridge />;
      case 'quiz':
        return <SmartQuiz />;
      case 'gaps':
        return <LearningGapDetector />;
      case 'study-plan':
        return <StudyPlanView />;
      case 'offline-library':
        return <OfflineLibraryView />;
      case 'about':
        return <AboutSection />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation Header */}
      <Header onOpenOnboarding={() => setOnboardingOpen(true)} />

      {/* Judge Demo Walkthrough Banner */}
      <DemoWalkthroughBanner />

      {/* Main Page View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Onboarding / Profile Preferences Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-slate-900">
                  LearnBridge AI
                </p>
                <p className="text-xs text-slate-500">
                  "Understand Better. Learn Smarter. Grow Together."
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-semibold">
              <button
                onClick={() => setCurrentView('welcome')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('tutor')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                AI Tutor
              </button>
              <button
                onClick={() => setCurrentView('language-bridge')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Language Bridge (தமிழ்)
              </button>
              <button
                onClick={() => setCurrentView('quiz')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Smart Quiz
              </button>
              <button
                onClick={() => setCurrentView('offline-library')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Offline Toolkit
              </button>
              <button
                onClick={() => setCurrentView('about')}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Hackathon About & Ethics
              </button>
            </div>

            <div className="text-right text-xs text-slate-500">
              <p>HackNowa Global Hackathon 2026</p>
              <p className="text-[11px] text-slate-400">
                AI for Everyday Life • Educational Accessibility
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}
