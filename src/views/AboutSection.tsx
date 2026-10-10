import React from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Info,
  ShieldCheck,
  Cpu,
  Sparkles,
  Play,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Award,
  WifiOff,
  Server,
  Lock,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { startHackathonDemo } = useLearning();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <span>HackNowa Global Hackathon 2026</span>
          <span>•</span>
          <span>AI for Everyday Life</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          LearnBridge AI: Architectural Overview & Mission
        </h1>

        <p className="text-sm sm:text-base text-indigo-200 max-w-3xl leading-relaxed">
          "Understand Better. Learn Smarter. Grow Together."
          <br />
          Built to dismantle cognitive and linguistic barriers for students around the world through an adaptive, evidence-based learning cycle.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => startHackathonDemo(1)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Judge Presentation Walkthrough</span>
          </button>
        </div>
      </div>

      {/* 4 Core Pillars: Problem, Solution, Innovation, Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>1. The Real-World Problem</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Rigid Teaching & Linguistic Alienation
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Millions of students struggle to grasp foundational STEM and language concepts because textbooks rely on dense English jargon, inflexible explanations, and one-size-fits-all pacing. When students fail a test, they are handed a punitive number without any insight into the cognitive misconception that caused the mistake.
          </p>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>2. The LearnBridge Solution</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Adaptive, Empathetic Learning Companion
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            LearnBridge AI acts as a patient, bilingual educational companion. It breaks down complex ideas into intuitive everyday metaphors, translates concepts faithfully between English and Tamil (தமிழ்), generates targeted diagnostic quizzes, pinpoints specific learning gaps, and prescribes transparent next actions.
          </p>
        </div>

        {/* The Innovation */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>3. The Core Innovation</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            The Continuous Adaptive Learning Cycle
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            A self-adjusting educational loop:
            <br />
            <strong>UNDERSTAND → PRACTICE → IDENTIFY LEARNING GAPS → PERSONALIZE THE NEXT LESSON → UNDERSTAND BETTER.</strong>
            <br />
            Instead of treating quizzes as dead ends, quiz errors become the exact starting input for targeted conceptual drills.
          </p>
        </div>

        {/* The Social Impact */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>4. Social Impact & Accessibility</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Democratizing High-Quality Tutoring
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Private 1-on-1 tutoring costs $40-$80/hour, excluding millions of underprivileged learners. LearnBridge bridges this divide with native Tamil support, zero paywalls, device-only privacy, and full offline resilience for students in low-connectivity regions.
          </p>
        </div>
      </div>

      {/* TECHNICAL IMPLEMENTATION MATRIX */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Technical Implementation Breakdown
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clear delineation of what runs on Gemini 3.8 Flash, what runs on application logic, and what works offline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* AI Model Layer */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase">
              <Server className="w-4 h-4 text-indigo-600" />
              <span>Live AI Model Layer</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Gemini 3.8 Flash (Server-Side Proxy)
            </h4>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside pt-1">
              <li>Generates tailored explanations at Beginner/Intermediate/Advanced levels</li>
              <li>Translates educational text while preserving scientific meaning</li>
              <li>Generates 5 conceptual multiple-choice questions on arbitrary topics</li>
              <li>Analyzes student error patterns to pinpoint cognitive misconceptions</li>
              <li>Generates practical day-by-day study roadmaps</li>
              <li>Strict server-side proxy prevents API key exposure</li>
            </ul>
          </div>

          {/* Deterministic Application Logic */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Application Logic Layer</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Deterministic State & Evaluation Engine
            </h4>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside pt-1">
              <li>Calculates exact score percentages and question outcomes</li>
              <li>Tracks concept tags for each missed question</li>
              <li>Enforces answer withholding until student submission</li>
              <li>Transparent adaptive rules (Score &lt; 60% simplify, 60-80% drill gaps, &gt; 80% advance)</li>
              <li>Persists student history to local browser storage</li>
            </ul>
          </div>

          {/* Offline Toolkit */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase">
              <WifiOff className="w-4 h-4 text-emerald-600" />
              <span>Offline Resilience Layer</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Zero-Network Curriculum Bundle
            </h4>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside pt-1">
              <li>5 complete pre-packaged subjects (Java, Python, Math, Grammar, CS)</li>
              <li>Full English and Tamil lessons &amp; analogies</li>
              <li>Verified 5-question interactive quizzes</li>
              <li>Pre-mapped cognitive gap remedies &amp; 3-question drills</li>
              <li>Always accessible even during network outages</li>
            </ul>
          </div>
        </div>
      </div>

      {/* LIMITATIONS & ETHICAL SAFEGUARDS */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical Standards & System Boundaries</span>
          </div>
          <h3 className="text-xl font-bold mt-1">
            Limitations, Privacy & Responsible Educational AI
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-300">
          <div className="space-y-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-semibold">
              No Medical or Intelligence Claims
            </strong>
            <p className="leading-relaxed">
              LearnBridge AI does NOT measure a student's innate intelligence or diagnose learning disabilities. All evaluations are pedagogical observations strictly tied to actual quiz answers.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-semibold">
              Zero Data Mining / Device-Only Storage
            </strong>
            <p className="leading-relaxed">
              Student progress, nicknames, and quiz results remain entirely inside the client's local browser storage. No student tracking profiles are collected or monetized.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-semibold">
              Transparent AI vs Offline Labeling
            </strong>
            <p className="leading-relaxed">
              The application never misleads the user: every response is explicitly labeled as either "Live Gemini 3.8 Flash" or "Offline Curated Toolkit".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
