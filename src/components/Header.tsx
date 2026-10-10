import React, { useState } from 'react';
import { useLearning, AppView } from '../context/LearningContext';
import {
  Sparkles,
  BookOpen,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  WifiOff,
  Info,
  Play,
  RotateCcw,
  Globe,
  User,
  Menu,
  X,
  Zap,
} from 'lucide-react';

interface HeaderProps {
  onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOnboarding }) => {
  const {
    currentView,
    setCurrentView,
    activeLanguage,
    setActiveLanguage,
    aiServerStatus,
    startHackathonDemo,
    profile,
  } = useLearning();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'tutor', label: 'AI Tutor', icon: <Sparkles className="w-4 h-4" /> },
    { view: 'language-bridge', label: 'Language Bridge', icon: <Languages className="w-4 h-4" /> },
    { view: 'quiz', label: 'Smart Quiz', icon: <CheckCircle2 className="w-4 h-4" /> },
    { view: 'gaps', label: 'Gap Analysis', icon: <AlertTriangle className="w-4 h-4" /> },
    { view: 'study-plan', label: 'Study Plan', icon: <Calendar className="w-4 h-4" /> },
    { view: 'offline-library', label: 'Offline Toolkit', icon: <WifiOff className="w-4 h-4" /> },
    { view: 'about', label: 'About Project', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar for Hackathon & AI status */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-600 text-white font-semibold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
            HackNowa 2026
          </span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            AI for Everyday Life • LearnBridge AI
          </span>
          <span className="text-slate-400 hidden md:inline">
            "Understand Better. Learn Smarter. Grow Together."
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* AI Connection Status Indicator */}
          <div className="flex items-center gap-1.5" title={aiServerStatus.hasApiKey ? 'Connected to Gemini 3.8 Flash' : 'Offline Toolkit Active'}>
            <span
              className={`w-2 h-2 rounded-full ${
                aiServerStatus.hasApiKey
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-[11px] font-medium text-slate-200">
              {aiServerStatus.checking
                ? 'Checking AI...'
                : aiServerStatus.hasApiKey
                ? 'Gemini 3.8 Flash Live'
                : 'Offline Toolkit Active'}
            </span>
          </div>

          {/* Quick Demo Mode Trigger */}
          <button
            onClick={() => startHackathonDemo(1)}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer shadow-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Judge Demo (Java Loops)</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('welcome')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  LearnBridge<span className="text-indigo-600">.ai</span>
                </span>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-indigo-200">
                  Adaptive
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                Personalized Learning & Language Bridge
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Language toggle + Profile */}
          <div className="flex items-center gap-2">
            {/* Language toggle: English / Tamil */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setActiveLanguage('English')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  activeLanguage === 'English'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch interface and learning content to English"
              >
                EN
              </button>
              <button
                onClick={() => setActiveLanguage('Tamil')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  activeLanguage === 'Tamil'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="தமிழுக்கு மாற்றவும் (Switch to Tamil)"
              >
                தமிழ்
              </button>
            </div>

            {/* Profile badge */}
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left cursor-pointer border border-transparent hover:border-slate-200"
              title="Student Profile & Settings"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                {profile.avatar || '👩‍🎓'}
              </div>
              <div className="hidden xl:block text-xs">
                <p className="font-semibold text-slate-800 leading-tight truncate max-w-[100px]">
                  {profile.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {profile.level}
                </p>
              </div>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-slate-100">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                startHackathonDemo(1);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch 7-Step Hackathon Demo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
