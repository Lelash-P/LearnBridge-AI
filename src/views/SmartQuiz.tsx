import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { Quiz, QuizQuestion, QuizResultItem, LearningLevel, SupportedLanguage } from '../types/learning';
import { OFFLINE_LIBRARY } from '../data/offlineLibrary';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Loader2,
  Award,
  Zap,
  WifiOff,
  Languages,
} from 'lucide-react';

export const SmartQuiz: React.FC = () => {
  const {
    activeTopic,
    setActiveTopic,
    activeLevel,
    setActiveLevel,
    activeLanguage,
    setActiveLanguage,
    currentQuiz,
    setCurrentQuiz,
    submitQuizAndAnalyze,
    setCurrentView,
    demoMode,
  } = useLearning();

  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResults, setSubmissionResults] = useState<QuizResultItem[]>([]);
  const [customTopic, setCustomTopic] = useState(activeTopic || 'Java Loops');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If in Hackathon Demo Mode Step 3, load Java Loops quiz automatically
  useEffect(() => {
    if (demoMode.isActive && (!currentQuiz || currentQuiz.topic !== 'Java Loops')) {
      const javaMod = OFFLINE_LIBRARY.find((m) => m.id === 'java-loops');
      if (javaMod) {
        setCurrentQuiz(activeLanguage === 'Tamil' ? javaMod.quizTa : javaMod.quizEn);
        // Pre-select realistic answers for demo:
        // Student answers Q1 (index 1), Q2 (index 2), Q5 (index 2) correctly
        // But misses Q3 (selects index 0 instead of 2) and Q4 (selects index 0 instead of 1) -> 60%
        setSelectedAnswers({ 1: 1, 2: 2, 3: 0, 4: 0, 5: 2 });
        setIsSubmitted(false);
      }
    }
  }, [demoMode.isActive, activeLanguage]);

  // Load default quiz on initial render if none loaded
  useEffect(() => {
    if (!currentQuiz) {
      const javaMod = OFFLINE_LIBRARY.find((m) => m.id === 'java-loops');
      if (javaMod) {
        setCurrentQuiz(activeLanguage === 'Tamil' ? javaMod.quizTa : javaMod.quizEn);
      }
    }
  }, [currentQuiz, activeLanguage]);

  const handleGenerateQuiz = async (topicToUse = customTopic) => {
    if (!topicToUse.trim()) return;
    setLoading(true);
    setErrorMessage(null);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setActiveTopic(topicToUse.trim());

    // Check offline library first
    const offlineMatch = OFFLINE_LIBRARY.find(
      (m) =>
        m.title.toLowerCase().includes(topicToUse.toLowerCase()) ||
        topicToUse.toLowerCase().includes(m.id) ||
        topicToUse.toLowerCase().includes('java loop')
    );

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse.trim(),
          level: activeLevel,
          language: activeLanguage,
          count: 5,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          const generatedQuiz: Quiz = {
            id: `quiz-${Date.now()}`,
            topic: json.data.topic || topicToUse.trim(),
            level: json.data.level || activeLevel,
            language: json.data.language || activeLanguage,
            questions: json.data.questions || [],
            source: 'gemini-3.8-flash',
          };
          setCurrentQuiz(generatedQuiz);
          setLoading(false);
          return;
        }
      }

      // If live AI call failed or key is missing, use offline or synthesized fallback
      if (offlineMatch) {
        setCurrentQuiz(activeLanguage === 'Tamil' ? offlineMatch.quizTa : offlineMatch.quizEn);
      } else {
        // Synthesize dynamic offline quiz
        const synthesizedQuiz: Quiz = {
          id: `quiz-${Date.now()}`,
          topic: topicToUse.trim(),
          level: activeLevel,
          language: activeLanguage,
          source: 'offline-toolkit',
          questions: [
            {
              id: 1,
              question: `What is the core purpose of ${topicToUse.trim()}?`,
              options: [
                'To complicate software design',
                `To provide a structured mechanism for solving problems in ${topicToUse.trim()}`,
                'To bypass standard compiler checks',
                'To shut down runtime processes',
              ],
              correctAnswerIndex: 1,
              explanation: `${topicToUse.trim()} is designed to give engineers and learners a reliable structured pattern.`,
              conceptTag: 'core-purpose',
            },
            {
              id: 2,
              question: `Which component is essential when executing ${topicToUse.trim()}?`,
              options: [
                'An unconstrained loop condition',
                'A validated termination or boundary test',
                'Hardcoding random magic numbers',
                'Ignoring inputs',
              ],
              correctAnswerIndex: 1,
              explanation: 'A validated boundary check ensures operations terminate properly without errors.',
              conceptTag: 'boundary-check',
            },
            {
              id: 3,
              question: `What is a common beginner mistake when working with ${topicToUse.trim()}?`,
              options: [
                'Using clear variable names',
                'Misunderstanding boundary conditions or edge cases',
                'Writing unit tests',
                'Adding comments',
              ],
              correctAnswerIndex: 1,
              explanation: 'Boundary conditions (such as off-by-one errors) are the most frequent pitfall for beginners.',
              conceptTag: 'boundary-error',
            },
            {
              id: 4,
              question: `How does ${topicToUse.trim()} adapt across different difficulty levels?`,
              options: [
                'It remains identical with no changes',
                'It scales from intuitive metaphors to formal architectural constraints',
                'It disables syntax highlighting',
                'It is only used in theory, never practice',
              ],
              correctAnswerIndex: 1,
              explanation: 'Foundations start with intuitive models, evolving into rigorous optimization.',
              conceptTag: 'pedagogical-depth',
            },
            {
              id: 5,
              question: `Why is verifying comprehension of ${topicToUse.trim()} important?`,
              options: [
                'To uncover specific conceptual gaps and reinforce retention',
                'Just to assign a single numeric grade',
                'To discourage students',
                'It is not important at all',
              ],
              correctAnswerIndex: 0,
              explanation: 'Evidence-based feedback identifies specific misunderstandings for targeted remediation.',
              conceptTag: 'gap-retention',
            },
          ],
        };
        setCurrentQuiz(synthesizedQuiz);
      }
    } catch {
      if (offlineMatch) {
        setCurrentQuiz(activeLanguage === 'Tamil' ? offlineMatch.quizTa : offlineMatch.quizEn);
      } else {
        setErrorMessage('Unable to generate live quiz; loaded fallback assessment.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!currentQuiz) return;
    const questions = currentQuiz.questions;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (answeredCount < questions.length) {
      if (!confirm(`You have answered ${answeredCount} of ${questions.length} questions. Submit anyway?`)) {
        return;
      }
    }

    const evaluated: QuizResultItem[] = questions.map((q) => {
      const selected = selectedAnswers[q.id] ?? -1;
      const isCorrect = selected === q.correctAnswerIndex;
      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedOptionIndex: selected,
        correctOptionIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
        conceptTag: q.conceptTag,
      };
    });

    setSubmissionResults(evaluated);
    setIsSubmitted(true);

    // Feed real quiz results into the LearningContext gap analyzer
    await submitQuizAndAnalyze(evaluated);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = currentQuiz?.questions.length || 0;
  const score = submissionResults.filter((r) => r.isCorrect).length;
  const scorePercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Smart Quiz Generator
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            5 conceptual multiple-choice questions matching your level. Answers are strictly withheld until submission.
          </p>
        </div>

        {/* Source Badge */}
        {currentQuiz && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold self-start md:self-auto ${
              currentQuiz.source === 'gemini-3.8-flash'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {currentQuiz.source === 'gemini-3.8-flash' ? (
              <>
                <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
                <span>Live Gemini 3.8 Flash Quiz</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Offline Curated Quiz</span>
              </>
            )}
          </span>
        )}
      </div>

      {/* Quiz Controls / Topic Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateQuiz();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Topic to generate quiz on (e.g. Java Loops, Fractions, Active Voice)..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const nextLang = activeLanguage === 'English' ? 'Tamil' : 'English';
                setActiveLanguage(nextLang);
              }}
              className="px-3.5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Languages className="w-4 h-4 text-blue-600" />
              <span>{activeLanguage}</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating 5 Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate New Quiz</span>
                </>
              )}
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* QUIZ BODY */}
      {currentQuiz && (
        <div className="space-y-6">
          {/* Progress / Status banner */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {currentQuiz.topic} ({currentQuiz.level})
              </h3>
              <p className="text-xs text-slate-500">
                {isSubmitted
                  ? `Quiz Evaluated: ${score} of ${totalQuestions} correct (${scorePercent}%)`
                  : `Answered ${answeredCount} of ${totalQuestions} questions`}
              </p>
            </div>

            {/* Answered progress bar */}
            {!isSubmitted && (
              <div className="flex items-center gap-3">
                <div className="w-32 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  />
                </div>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={answeredCount === 0}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-40"
                >
                  Submit & Score
                </button>
              </div>
            )}

            {isSubmitted && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>

                <button
                  onClick={() => setCurrentView('gaps')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Analyze Learning Gaps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* POST-SUBMISSION SCORE CARD */}
          {isSubmitted && (
            <div
              className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 ${
                scorePercent >= 80
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : scorePercent >= 60
                  ? 'bg-blue-50/80 border-blue-200'
                  : 'bg-amber-50/80 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-xs ${
                    scorePercent >= 80
                      ? 'bg-emerald-600 text-white'
                      : scorePercent >= 60
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {scorePercent}%
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {scorePercent >= 80
                      ? 'Concept Mastered!'
                      : scorePercent >= 60
                      ? 'Good Baseline Understanding'
                      : 'Concept Revision Recommended'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    You answered {score} out of {totalQuestions} questions correctly.
                    Review the answers below, then jump into the Learning Gap Detector.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('gaps')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Gap Analysis (Feature D)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 5 QUESTIONS LIST */}
          <div className="space-y-4">
            {currentQuiz.questions.map((q, qIndex) => {
              const selectedIdx = selectedAnswers[q.id];
              const result = isSubmitted ? submissionResults.find((r) => r.questionId === q.id) : null;
              const isCorrect = result?.isCorrect;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-3xl p-6 border shadow-xs transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-200 ring-1 ring-emerald-400/20'
                        : 'border-rose-200 ring-1 ring-rose-400/20'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 whitespace-pre-line leading-relaxed">
                          {q.question}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1 inline-block">
                          Concept: {q.conceptTag}
                        </span>
                      </div>
                    </div>

                    {isSubmitted && (
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? '✓ Correct' : '✕ Missed'}
                      </span>
                    )}
                  </div>

                  {/* 4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedIdx === optIdx;
                      const isOptionCorrect = q.correctAnswerIndex === optIdx;

                      let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                      if (!isSubmitted) {
                        if (isSelected) {
                          btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 font-bold';
                        }
                      } else {
                        // In post-submission mode
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                        } else if (isSelected && !isOptionCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/20';
                        } else {
                          btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          disabled={isSubmitted}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full border border-current text-[11px] font-bold flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isSubmitted && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card (visible only after submission) */}
                  {isSubmitted && (
                    <div className="mt-4 pt-3 border-t border-slate-100 p-3.5 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-1">Pedagogical Explanation:</strong>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom submission action */}
          {!isSubmitted && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {answeredCount} of {totalQuestions} answered
              </span>

              <button
                onClick={handleSubmitQuiz}
                disabled={answeredCount === 0}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-40"
              >
                Submit Answers for Evaluation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
