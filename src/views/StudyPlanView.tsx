import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { StudyPlan, StudyMilestone, LearningLevel } from '../types/learning';
import {
  Calendar,
  Compass,
  Clock,
  Sparkles,
  CheckCircle2,
  ListTodo,
  Loader2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Zap,
  WifiOff,
  Plus,
} from 'lucide-react';

export const StudyPlanView: React.FC = () => {
  const { studyPlans, addStudyPlan, activeLevel } = useLearning();

  const [subject, setSubject] = useState('Java Core Fundamentals');
  const [goal, setGoal] = useState('Master control flow, loops, and write small algorithm problems with confidence');
  const [timeCommitment, setTimeCommitment] = useState('45 minutes / day');
  const [durationDays, setDurationDays] = useState(7);
  const [planLevel, setPlanLevel] = useState<LearningLevel>(activeLevel);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Default sample plan
  const samplePlan: StudyPlan = {
    id: 'sample-java-plan',
    subject: 'Java Core Fundamentals',
    goal: 'Master control flow, loops, and write small algorithm problems with confidence',
    durationDays: 7,
    timeCommitment: '45 minutes / day',
    level: 'Beginner',
    planTitle: '7-Day Practical Java Control Flow Mastery',
    weeklyAdvice: 'Spend 20 minutes understanding the mental model, 20 minutes coding by hand, and 5 minutes reflecting on off-by-one boundary cases.',
    source: 'offline-toolkit',
    createdAt: new Date().toISOString(),
    dailyMilestones: [
      {
        day: 1,
        topic: 'Variables, Types & Operators in Java',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'Understand primitive types (int, boolean, double) and comparison operators (==, !=, <, <=).',
        interactivePracticeTask: 'Declare 3 variables representing bank balance, items purchased, and tax, then compute final total.',
        quickSelfCheck: 'What is the difference between single = (assignment) and double == (equality check)?',
        tipsForSuccess: 'Always check your data types before comparing them.',
        completed: true,
      },
      {
        day: 2,
        topic: 'If-Else Conditionals & Decision Trees',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'How boolean branches divert computer execution flow.',
        interactivePracticeTask: 'Write a small program that takes a test score and prints letter grades A, B, C, or F.',
        quickSelfCheck: 'What executes if none of the if or else-if boolean expressions are true?',
        tipsForSuccess: 'Test edge cases like score = 90.0 or score = 0.0.',
        completed: true,
      },
      {
        day: 3,
        topic: 'The For Loop & Boundary Ranges',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'The 3-part syntax of for loops: initialization, condition, and increment.',
        interactivePracticeTask: 'Write a loop that prints only even numbers from 2 up to 20.',
        quickSelfCheck: 'Why does for(int i = 0; i < 5; i++) run 5 times instead of 4 or 6?',
        tipsForSuccess: 'Remember zero-indexing: counting starts at 0, so 0 to 4 is 5 total counts.',
        completed: false,
      },
      {
        day: 4,
        topic: 'While and Do-While Loops & Infinite Loops',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'Condition evaluation timing: top-check (while) vs bottom-check (do-while).',
        interactivePracticeTask: 'Simulate a user entering a password until they guess correctly.',
        quickSelfCheck: 'What happens if you omit the counter update line inside a while loop?',
        tipsForSuccess: 'Always ensure your loop variable moves toward the termination condition.',
        completed: false,
      },
      {
        day: 5,
        topic: 'Break, Continue & Nested Loops',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'Interrupting execution: break halts the loop completely, continue skips the rest of the current turn.',
        interactivePracticeTask: 'Print a 5x5 square pattern of asterisks (*) using two nested for-loops.',
        quickSelfCheck: 'How many total times does an inner loop run if both outer and inner run 4 times?',
        tipsForSuccess: 'Trace nested iterations on a piece of paper with a table.',
        completed: false,
      },
      {
        day: 6,
        topic: 'Diagnostic Quiz & Learning Gap Remediation',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'Test your understanding with LearnBridge Smart Quiz and review any identified gaps.',
        interactivePracticeTask: 'Take the 5-question Java Loops diagnostic quiz and practice the targeted remedial drill.',
        quickSelfCheck: 'Can you spot an off-by-one array index boundary error on sight?',
        tipsForSuccess: 'Use your quiz errors as constructive learning markers.',
        completed: false,
      },
      {
        day: 7,
        topic: 'Mini-Project: Number Guessing Game',
        estimatedMinutes: 45,
        coreConceptToUnderstand: 'Combine variables, while loops, if-else statements, and break keywords into a complete working program.',
        interactivePracticeTask: 'Build a game where the computer picks a random number from 1 to 100 and gives "higher" or "lower" clues.',
        quickSelfCheck: 'How does your loop decide when the game is won or lost?',
        tipsForSuccess: 'Celebrate your 7-day milestone! You have mastered Java control flow foundations.',
        completed: false,
      },
    ],
  };

  const currentPlan = studyPlans.length > 0 ? studyPlans[0] : samplePlan;

  const handleGeneratePlan = async () => {
    if (!subject.trim() || !goal.trim()) {
      setErrorMessage('Please provide both a subject and learning goal.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/study-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.trim(),
          goal: goal.trim(),
          timeCommitment,
          durationDays,
          level: planLevel,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          const generated: StudyPlan = {
            id: `plan-${Date.now()}`,
            subject: json.data.subject || subject,
            goal: json.data.goal || goal,
            durationDays: json.data.durationDays || durationDays,
            timeCommitment: json.data.timeCommitment || timeCommitment,
            level: planLevel,
            planTitle: json.data.planTitle || `${durationDays}-Day ${subject} Roadmap`,
            weeklyAdvice: json.data.weeklyAdvice || 'Focus on daily consistency.',
            dailyMilestones: json.data.dailyMilestones || [],
            source: 'gemini-3.8-flash',
            createdAt: new Date().toISOString(),
          };
          addStudyPlan(generated);
          setLoading(false);
          return;
        }
      }

      // Offline synthesis
      addStudyPlan(samplePlan);
    } catch {
      addStudyPlan(samplePlan);
      setErrorMessage('Using curated offline study plan roadmap.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = (dayNumber: number) => {
    if (!currentPlan) return;
    const updated = {
      ...currentPlan,
      dailyMilestones: currentPlan.dailyMilestones.map((m) =>
        m.day === dayNumber ? { ...m, completed: !m.completed } : m
      ),
    };
    addStudyPlan(updated);
  };

  const completedCount = currentPlan.dailyMilestones.filter((m) => m.completed).length;
  const progressPercent =
    currentPlan.dailyMilestones.length > 0
      ? Math.round((completedCount / currentPlan.dailyMilestones.length) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Personalized Study Plan Generator
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Turn ambitious goals into achievable daily milestones based on your available time and current level.
        </p>
      </div>

      {/* Inputs Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Customize Your Learning Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Subject or Topic
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Python for Data, Java Core, Everyday Fractions..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Specific Learning Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Pass semester test, build a mini-project, bridge foundational gaps..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Available Daily Time
            </label>
            <select
              value={timeCommitment}
              onChange={(e) => setTimeCommitment(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
            >
              <option value="30 minutes / day">30 minutes / day</option>
              <option value="45 minutes / day">45 minutes / day</option>
              <option value="1 hour / day">1 hour / day</option>
              <option value="2 hours / day">2 hours / day (Intensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Plan Duration
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
            >
              <option value={5}>5 Days (Sprint)</option>
              <option value={7}>7 Days (Weekly Foundation)</option>
              <option value={14}>14 Days (Comprehensive Mastery)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Starting Level
            </label>
            <select
              value={planLevel}
              onChange={(e) => setPlanLevel(e.target.value as LearningLevel)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
            >
              <option value="Beginner">Beginner (Metaphors & Intuition)</option>
              <option value="Intermediate">Intermediate (Core Mechanics)</option>
              <option value="Advanced">Advanced (Rigorous Edge Cases)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Follows the LearnBridge cycle: Understand → Practice → Remedy Gaps</span>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Study Plan</span>
              </>
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* PLAN DETAILS DISPLAY */}
      {currentPlan && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {currentPlan.planTitle}
                </h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  {currentPlan.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Goal: <span className="text-slate-800 font-semibold">{currentPlan.goal}</span> • {currentPlan.timeCommitment}
              </p>
            </div>

            {/* Source indicator */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  currentPlan.source === 'gemini-3.8-flash'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {currentPlan.source === 'gemini-3.8-flash' ? (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
                    <span>Live Gemini Study Plan</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                    <span>Curated Offline Sample Plan</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto">
              <p className="text-xs font-bold text-slate-800">
                Roadmap Completion: {completedCount} of {currentPlan.dailyMilestones.length} milestones ({progressPercent}%)
              </p>
              <div className="w-full sm:w-64 bg-slate-200 rounded-full h-2.5 mt-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {currentPlan.weeklyAdvice && (
              <div className="text-xs text-slate-600 sm:text-right max-w-md">
                <span className="font-bold text-slate-800 block">Weekly Strategy:</span>
                <span>{currentPlan.weeklyAdvice}</span>
              </div>
            )}
          </div>

          {/* Daily Milestones Checklist */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-indigo-600" />
              <span>Day-by-Day Milestone Roadmap</span>
            </h3>

            <div className="space-y-3">
              {currentPlan.dailyMilestones.map((milestone) => (
                <div
                  key={milestone.day}
                  className={`p-5 rounded-2xl border transition-all ${
                    milestone.completed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleMilestone(milestone.day)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors cursor-pointer ${
                          milestone.completed
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-slate-300 hover:border-indigo-500 text-transparent'
                        }`}
                        title={milestone.completed ? 'Mark uncompleted' : 'Mark completed'}
                      >
                        ✓
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-indigo-600">
                            DAY {milestone.day}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {milestone.estimatedMinutes} mins
                          </span>
                        </div>
                        <h4 className={`text-base font-bold mt-0.5 ${
                          milestone.completed ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}>
                          {milestone.topic}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Core concept & interactive task */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <strong className="text-slate-900 block mb-0.5">Focus Concept to Understand:</strong>
                      <p className="text-slate-700">{milestone.coreConceptToUnderstand}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                      <strong className="text-indigo-950 block mb-0.5">Interactive Practice Task:</strong>
                      <p className="text-indigo-900">{milestone.interactivePracticeTask}</p>
                    </div>
                  </div>

                  {/* Quick self check */}
                  {milestone.quickSelfCheck && (
                    <div className="mt-2.5 pl-9 flex items-center gap-2 text-xs text-slate-600">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        <strong className="text-slate-800">End-of-Day Self Check: </strong>
                        {milestone.quickSelfCheck}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
