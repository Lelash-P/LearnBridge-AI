import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  LearningLevel,
  SupportedLanguage,
  TutorExplanation,
  Quiz,
  QuizResultItem,
  GapAnalysisResult,
  StudyPlan,
  CompletedTopicRecord,
} from '../types/learning';
import { OFFLINE_LIBRARY } from '../data/offlineLibrary';

export type AppView =
  | 'welcome'
  | 'dashboard'
  | 'tutor'
  | 'language-bridge'
  | 'quiz'
  | 'gaps'
  | 'study-plan'
  | 'offline-library'
  | 'about';

interface AIServerStatus {
  isConnected: boolean;
  hasApiKey: boolean;
  model: string;
  checking: boolean;
}

interface DemoModeState {
  isActive: boolean;
  currentStep: number;
}

interface LearningContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  activeLevel: LearningLevel;
  setActiveLevel: (level: LearningLevel) => void;
  activeLanguage: SupportedLanguage;
  setActiveLanguage: (lang: SupportedLanguage) => void;
  activeTopic: string;
  setActiveTopic: (topic: string) => void;
  currentExplanation: TutorExplanation | null;
  setCurrentExplanation: (exp: TutorExplanation | null) => void;
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  currentQuizSubmission: QuizResultItem[] | null;
  setCurrentQuizSubmission: (items: QuizResultItem[] | null) => void;
  latestGapAnalysis: GapAnalysisResult | null;
  setLatestGapAnalysis: (analysis: GapAnalysisResult | null) => void;
  completedRecords: CompletedTopicRecord[];
  studyPlans: StudyPlan[];
  addStudyPlan: (plan: StudyPlan) => void;
  aiServerStatus: AIServerStatus;
  checkAIServer: () => Promise<void>;
  demoMode: DemoModeState;
  startHackathonDemo: (startStep?: number) => void;
  setDemoStep: (step: number) => void;
  exitDemoMode: () => void;
  submitQuizAndAnalyze: (results: QuizResultItem[]) => Promise<void>;
  resetAllProgress: () => void;
  loadDemoStudentProfile: () => void;
}

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Kavitha R.',
  avatar: '👩‍🎓',
  preferredLanguage: 'English',
  level: 'Beginner',
  primarySubject: 'Computer Science',
  isDemoUser: true,
  streakDays: 4,
  totalTimeMinutes: 125,
};

const STORAGE_KEY = 'learnbridge_app_state_v1';

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [activeLevel, setActiveLevel] = useState<LearningLevel>('Beginner');
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>('English');
  const [activeTopic, setActiveTopic] = useState<string>('Java Loops');
  const [currentExplanation, setCurrentExplanation] = useState<TutorExplanation | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuizSubmission, setCurrentQuizSubmission] = useState<QuizResultItem[] | null>(null);
  const [latestGapAnalysis, setLatestGapAnalysis] = useState<GapAnalysisResult | null>(null);

  const [completedRecords, setCompletedRecords] = useState<CompletedTopicRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_records`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_plans`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [aiServerStatus, setAiServerStatus] = useState<AIServerStatus>({
    isConnected: false,
    hasApiKey: false,
    model: 'gemini-3.8-flash',
    checking: true,
  });

  const [demoMode, setDemoMode] = useState<DemoModeState>({
    isActive: false,
    currentStep: 1,
  });

  // Verify server health on mount
  const checkAIServer = async () => {
    setAiServerStatus((prev) => ({ ...prev, checking: true }));
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setAiServerStatus({
          isConnected: true,
          hasApiKey: Boolean(data.hasApiKey),
          model: data.model || 'gemini-3.8-flash',
          checking: false,
        });
      } else {
        setAiServerStatus({
          isConnected: false,
          hasApiKey: false,
          model: 'offline',
          checking: false,
        });
      }
    } catch {
      setAiServerStatus({
        isConnected: false,
        hasApiKey: false,
        model: 'offline',
        checking: false,
      });
    }
  };

  useEffect(() => {
    checkAIServer();
  }, []);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [profile]);

  // Sync records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_records`, JSON.stringify(completedRecords));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [completedRecords]);

  // Sync study plans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_plans`, JSON.stringify(studyPlans));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [studyPlans]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addStudyPlan = (plan: StudyPlan) => {
    setStudyPlans((prev) => [plan, ...prev.filter((p) => p.id !== plan.id)]);
  };

  // Submit quiz results and trigger gap evaluation
  const submitQuizAndAnalyze = async (results: QuizResultItem[]) => {
    setCurrentQuizSubmission(results);
    const score = Math.round((results.filter((r) => r.isCorrect).length / results.length) * 100);

    // Update records
    const record: CompletedTopicRecord = {
      id: `record-${Date.now()}`,
      topic: activeTopic,
      category: 'General',
      level: activeLevel,
      language: activeLanguage,
      timestamp: new Date().toISOString(),
      quizScore: score,
      hasGapAnalysis: true,
    };
    setCompletedRecords((prev) => [record, ...prev.filter((r) => r.topic !== activeTopic)]);

    // Check if server is reachable for live AI gap analysis
    let gapData: GapAnalysisResult | null = null;
    if (aiServerStatus.isConnected && aiServerStatus.hasApiKey) {
      try {
        const res = await fetch('/api/gaps/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: activeTopic,
            level: activeLevel,
            language: activeLanguage,
            quizResults: results.map((r) => ({
              question: r.question,
              selectedOption: r.options[r.selectedOptionIndex],
              correctOption: r.options[r.correctOptionIndex],
              isCorrect: r.isCorrect,
              conceptTag: r.conceptTag,
            })),
          }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            gapData = {
              id: `gap-${Date.now()}`,
              topic: activeTopic,
              level: activeLevel,
              scorePercent: json.data.scorePercent ?? score,
              totalQuestions: results.length,
              correctCount: results.filter((r) => r.isCorrect).length,
              overallSummary: json.data.overallSummary,
              gapsIdentified: json.data.gapsIdentified || [],
              targetedPracticeQuestions: json.data.targetedPracticeQuestions || [],
              adaptiveRecommendation: json.data.adaptiveRecommendation || {
                actionType: score < 60 ? 'simplify' : score < 80 ? 'practice_gap' : 'advance',
                headline: 'Adaptive Recommendation',
                reasoning: `Based on actual score of ${score}%.`,
                suggestedActivity: 'Review weak concepts.',
              },
              source: 'gemini-3.8-flash',
              timestamp: new Date().toISOString(),
            };
          }
        }
      } catch (err) {
        console.warn('Live gap analysis failed, using deterministic local evaluation:', err);
      }
    }

    // If live AI was not used or failed, use offline toolkit or deterministic analysis
    if (!gapData) {
      const offlineMod = OFFLINE_LIBRARY.find(
        (m) => m.title.toLowerCase().includes(activeTopic.toLowerCase()) || activeTopic.toLowerCase().includes(m.id)
      );

      if (offlineMod && activeTopic.toLowerCase().includes('java')) {
        gapData = {
          ...offlineMod.sampleGapAnalysis,
          id: `gap-${Date.now()}`,
          scorePercent: score,
          totalQuestions: results.length,
          correctCount: results.filter((r) => r.isCorrect).length,
          source: 'offline-toolkit',
          timestamp: new Date().toISOString(),
        };
      } else {
        // Construct deterministic gap analysis from actual missed questions
        const missed = results.filter((r) => !r.isCorrect);
        gapData = {
          id: `gap-${Date.now()}`,
          topic: activeTopic,
          level: activeLevel,
          scorePercent: score,
          totalQuestions: results.length,
          correctCount: results.length - missed.length,
          overallSummary:
            missed.length === 0
              ? `Outstanding performance! You answered all ${results.length} questions correctly.`
              : `You scored ${score}%. Reviewing ${missed.length} question(s) will help solidify your understanding.`,
          gapsIdentified: missed.map((m) => ({
            conceptTag: m.conceptTag,
            identifiedGap: `Review: ${m.conceptTag.replace(/-/g, ' ')}`,
            remedialExplanation: m.explanation,
            concreteAnalogy: 'Think of this as an essential building block that ties your concepts together.',
          })),
          targetedPracticeQuestions: missed.slice(0, 3).map((m, idx) => ({
            id: 900 + idx,
            question: `Remedial Check: ${m.question}`,
            options: m.options,
            correctAnswerIndex: m.correctOptionIndex,
            explanation: m.explanation,
            conceptTag: m.conceptTag,
          })),
          adaptiveRecommendation: {
            actionType: score < 60 ? 'simplify' : score < 80 ? 'practice_gap' : 'advance',
            headline:
              score < 60
                ? 'Simplify Foundation & Review Basics'
                : score < 80
                ? 'Targeted Practice on Identified Gaps'
                : 'Mastery Achieved: Advance to Next Topic',
            reasoning: `Based on your evaluated quiz score of ${score}% across ${results.length} questions.`,
            suggestedActivity:
              score < 80
                ? 'Complete the recommended revision questions below.'
                : 'Explore advanced concepts or build a real mini-project.',
          },
          source: 'offline-toolkit',
          timestamp: new Date().toISOString(),
        };
      }
    }

    setLatestGapAnalysis(gapData);
  };

  const startHackathonDemo = (startStep = 1) => {
    setDemoMode({
      isActive: true,
      currentStep: startStep,
    });
    // Set demo student profile & topic
    setActiveTopic('Java Loops');
    setActiveLevel('Beginner');
    setActiveLanguage('English');

    const javaMod = OFFLINE_LIBRARY.find((m) => m.id === 'java-loops');
    if (javaMod) {
      setCurrentExplanation(javaMod.explanationEn);
      setCurrentQuiz(javaMod.quizEn);
    }

    if (startStep === 1 || startStep === 2) {
      setCurrentView('tutor');
    } else if (startStep === 3 || startStep === 4) {
      setCurrentView('quiz');
    } else if (startStep === 5 || startStep === 6) {
      setCurrentView('gaps');
    } else if (startStep === 7) {
      setCurrentView('dashboard');
    }
  };

  const setDemoStep = (step: number) => {
    setDemoMode((prev) => ({ ...prev, currentStep: step }));
    if (step === 1 || step === 2) setCurrentView('tutor');
    else if (step === 3 || step === 4) setCurrentView('quiz');
    else if (step === 5 || step === 6) setCurrentView('gaps');
    else if (step === 7) setCurrentView('dashboard');
  };

  const exitDemoMode = () => {
    setDemoMode({ isActive: false, currentStep: 1 });
  };

  const resetAllProgress = () => {
    try {
      localStorage.removeItem(`${STORAGE_KEY}_profile`);
      localStorage.removeItem(`${STORAGE_KEY}_records`);
      localStorage.removeItem(`${STORAGE_KEY}_plans`);
    } catch (e) {
      console.warn(e);
    }
    setProfile(DEFAULT_PROFILE);
    setCompletedRecords([]);
    setStudyPlans([]);
    setCurrentExplanation(null);
    setCurrentQuiz(null);
    setCurrentQuizSubmission(null);
    setLatestGapAnalysis(null);
    setDemoMode({ isActive: false, currentStep: 1 });
    setCurrentView('welcome');
  };

  const loadDemoStudentProfile = () => {
    setProfile({
      name: 'Kavitha R. (High School CS Student)',
      avatar: '👩‍💻',
      preferredLanguage: 'English',
      level: 'Beginner',
      primarySubject: 'Java & Computer Science',
      isDemoUser: true,
      streakDays: 5,
      totalTimeMinutes: 140,
    });
    // Seed with realistic demo progress
    const initialRecords: CompletedTopicRecord[] = [
      {
        id: 'rec-1',
        topic: 'Percentages & Everyday Fractions',
        category: 'Mathematics',
        level: 'Beginner',
        language: 'English',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        quizScore: 80,
        hasGapAnalysis: true,
      },
      {
        id: 'rec-2',
        topic: 'Active vs. Passive Voice',
        category: 'English Grammar',
        level: 'Beginner',
        language: 'English',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        quizScore: 100,
        hasGapAnalysis: true,
      },
    ];
    setCompletedRecords(initialRecords);
  };

  return (
    <LearningContext.Provider
      value={{
        currentView,
        setCurrentView,
        profile,
        updateProfile,
        activeLevel,
        setActiveLevel,
        activeLanguage,
        setActiveLanguage,
        activeTopic,
        setActiveTopic,
        currentExplanation,
        setCurrentExplanation,
        currentQuiz,
        setCurrentQuiz,
        currentQuizSubmission,
        setCurrentQuizSubmission,
        latestGapAnalysis,
        setLatestGapAnalysis,
        completedRecords,
        studyPlans,
        addStudyPlan,
        aiServerStatus,
        checkAIServer,
        demoMode,
        startHackathonDemo,
        setDemoStep,
        exitDemoMode,
        submitQuizAndAnalyze,
        resetAllProgress,
        loadDemoStudentProfile,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
