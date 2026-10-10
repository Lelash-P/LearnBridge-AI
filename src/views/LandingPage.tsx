import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Sparkles,
  Play,
  Languages,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Repeat,
  Compass,
  WifiOff,
  Users,
  Check,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, startHackathonDemo, activeLanguage } = useLearning();

  const isTa = activeLanguage === 'Tamil';

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-indigo-50/60 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Hackathon Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-bold mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>HACKNOWA GLOBAL HACKATHON 2026</span>
              <span className="text-indigo-400">•</span>
              <span className="text-indigo-700">AI for Everyday Life</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isTa ? (
                <>
                  நன்கு புரிந்துகொள். புத்திசாலியாகக் கற்றுக் கொள்.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500">
                    ஒன்றாக வளர்வோம்.
                  </span>
                </>
              ) : (
                <>
                  Understand Better. Learn Smarter.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500">
                    Grow Together.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {isTa
                ? 'மாணவர்கள் சிக்கலான பாடங்கள் மற்றும் மொழித் தடைகளைத் தாண்டி எளிதாகக் கற்க உதவும் AI துணைவன். ஆங்கிலம் மற்றும் தமிழில் தனிப்பயனாக்கப்பட்ட கல்வி.'
                : 'The adaptive learning companion that breaks complex educational concepts into intuitive metaphors, bridges English and Tamil, diagnoses conceptual gaps, and adapts every lesson.'}
            </p>

            {/* Main Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => startHackathonDemo(1)}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md hover:shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2 group scale-100 hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Launch 7-Step Judge Demo (Java Loops)</span>
              </button>

              <button
                onClick={() => setCurrentView('tutor')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try Live AI Tutor</span>
              </button>

              <button
                onClick={() => setCurrentView('language-bridge')}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Languages className="w-4 h-4 text-indigo-600" />
                <span>Bilingual Bridge (தமிழ் / EN)</span>
              </button>
            </div>

            {/* Quick Micro-stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/60 text-slate-600 text-xs">
              <div>
                <p className="font-extrabold text-lg text-slate-900">Adaptive</p>
                <p className="text-slate-500">Self-adjusting depth</p>
              </div>
              <div>
                <p className="font-extrabold text-lg text-indigo-600">EN & தமிழ்</p>
                <p className="text-slate-500">Bilingual language bridge</p>
              </div>
              <div>
                <p className="font-extrabold text-lg text-slate-900">Zero-Slop</p>
                <p className="text-slate-500">Real evidence gap detector</p>
              </div>
              <div>
                <p className="font-extrabold text-lg text-emerald-600">100% Offline</p>
                <p className="text-slate-500">Built-in emergency toolkit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE INNOVATION: The 5-Stage Adaptive Learning Cycle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Core Innovation Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            The Continuous Adaptive Learning Cycle
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Instead of giving every student the exact same rigid textbook, LearnBridge AI
            dynamically connects explanations, diagnostic quiz answers, and targeted remediation.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                  01
                </div>
                <h3 className="font-bold text-sm text-slate-900">UNDERSTAND</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Students enter any topic or question. AI delivers simple explanations, relatable real-world analogies, and step-by-step guides in English or Tamil.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-200/50 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Beginner to Advanced</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                  02
                </div>
                <h3 className="font-bold text-sm text-slate-900">PRACTICE</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  A 5-question conceptual quiz tests practical understanding. Correct answers are kept hidden until submitted to ensure genuine evaluation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200/50 flex items-center gap-1.5 text-[11px] font-semibold text-blue-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Conceptual MCQs</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                  03
                </div>
                <h3 className="font-bold text-sm text-slate-900">IDENTIFY GAPS</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  The Gap Detector evaluates actual errors (e.g. missed loop bounds) and isolates the cognitive root cause without inventing student history.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center gap-1.5 text-[11px] font-semibold text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Root Misconception</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                  04
                </div>
                <h3 className="font-bold text-sm text-slate-900">PERSONALIZE</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  The engine recommends the exact next step: simplifies the foundational rule, delivers 3 targeted practice questions, or increases difficulty.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-teal-200/50 flex items-center gap-1.5 text-[11px] font-semibold text-teal-700">
                <Repeat className="w-3.5 h-3.5" />
                <span>Adaptive Recommendation</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                  05
                </div>
                <h3 className="font-bold text-sm text-slate-900">GROW TOGETHER</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  The student builds lasting mastery and confidence. Progress is tracked on the local dashboard, with transparent analytics and review queues.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                <span>Mastery Solidified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM VS LEARNBRIDGE SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Real-World Problem */}
          <div className="bg-rose-50/60 rounded-3xl p-6 sm:p-8 border border-rose-200">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>The Real-World Problem</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Why Traditional Learning Leaves Millions Behind
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Rigid One-Size-Fits-All:</strong> Standard lectures deliver the exact same explanation regardless of student baseline.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>The English Language Barrier:</strong> Students who think in native languages like Tamil struggle to parse abstract technical terms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Blind Quizzing:</strong> Traditional tests assign a score (e.g. 60%) but leave students clueless about the actual conceptual misconceptions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Digital Divide:</strong> Cloud-dependent tutors fail completely when an internet connection drops in rural or low-bandwidth environments.</span>
              </li>
            </ul>
          </div>

          {/* The LearnBridge Solution */}
          <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>The LearnBridge Solution</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Adaptive, Empathetic, and Bilingual Empowerment
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Empathetic Level Adaptation:</strong> Switch effortlessly between Beginner (metaphors), Intermediate, and Advanced technical rigor.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Tamil & English Language Bridge:</strong> Native Tamil conceptual explanations, translation, and everyday "Jargon Buster".</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Evidence-Based Gap Detector:</strong> Pinpoints exact cognitive errors from actual quiz options and generates 3 targeted practice drills.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Offline Resilience:</strong> Built-in 5-subject toolkit that runs completely without internet, clearly labeled from live AI.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURE DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Explore All 8 Core Features
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Every tool is fully interactive, functional, and backed by pedagogical logic.
            </p>
          </div>
          <button
            onClick={() => startHackathonDemo(1)}
            className="self-start sm:self-auto text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Present Demo Scenario to Judges</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: AI Tutor */}
          <div
            onClick={() => setCurrentView('tutor')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                Personalized AI Tutor
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Simple & detailed explanations, everyday metaphors, step-by-step guides, and 3 follow-up curiosity prompts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Open Tutor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Language Bridge */}
          <div
            onClick={() => setCurrentView('language-bridge')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Languages className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors">
                Language Bridge (EN / தமிழ்)
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Translate concepts between English & Tamil without losing scientific fidelity. Includes the "Jargon Buster".
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>Open Bridge</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Smart Quiz */}
          <div
            onClick={() => setCurrentView('quiz')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Smart Quiz Generator
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                5 conceptual multiple-choice questions matching student level. Instant score calculation and pedagogical review.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Take a Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Learning Gap Detector */}
          <div
            onClick={() => setCurrentView('gaps')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                Learning Gap Detector
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Evaluates actual quiz errors, pinpoints the root misconception, and provides targeted 3-question remedial practice.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>Analyze Gaps</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Adaptive Next Lesson */}
          <div
            onClick={() => setCurrentView('dashboard')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Repeat className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-teal-600 transition-colors">
                Adaptive Next Lesson
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Transparent adaptation rules: struggles simplify foundations, average focuses on weak areas, high mastery advances.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600">
              <span>View Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Study Plan Generator */}
          <div
            onClick={() => setCurrentView('study-plan')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                Study Plan Generator
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Build practical daily study roadmaps with milestone checklists tailored to your available time and goals.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Generate Plan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 7: Offline Toolkit */}
          <div
            onClick={() => setCurrentView('offline-library')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <WifiOff className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                Offline Learning Toolkit
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Built-in curriculum for Math, English Grammar, Java Loops, Python, and CS Basics. Zero internet required.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>Explore Offline</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 8: About & Ethics */}
          <div
            onClick={() => setCurrentView('about')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-slate-600 transition-colors">
                Hackathon Presentation
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Learn about the mission, social impact, system architecture, ethical boundaries, and technical quality.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Read Presentation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ETHICAL RESPONSIBILITY & TRANSPARENCY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical AI & Social Impact Guardrail</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Transparent Adaptive Logic — Never Fake or Disabling Diagnostics
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              LearnBridge AI does not claim to measure innate intelligence or diagnose learning disabilities. Recommendations are strictly deterministic pedagogical next steps derived directly from the student's actual responses. All progress is kept private on your device.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('about')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            Read Ethics & Specs
          </button>
        </div>
      </section>
    </div>
  );
};
