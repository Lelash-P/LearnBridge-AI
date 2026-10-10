export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type SupportedLanguage = 'English' | 'Tamil';

export interface StudentProfile {
  name: string;
  avatar: string;
  preferredLanguage: SupportedLanguage;
  level: LearningLevel;
  primarySubject: string;
  isDemoUser: boolean;
  streakDays: number;
  totalTimeMinutes: number;
}

export interface TutorExplanation {
  topic: string;
  level: LearningLevel;
  language: SupportedLanguage;
  simpleExplanation: string;
  detailedExplanation: string;
  realWorldExample: string;
  stepByStep: string[];
  keyTakeaways: string[];
  followUpQuestions: string[];
  source: 'gemini-3.8-flash' | 'offline-toolkit';
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  conceptTag: string;
}

export interface Quiz {
  id: string;
  topic: string;
  level: LearningLevel;
  language: SupportedLanguage;
  questions: QuizQuestion[];
  source: 'gemini-3.8-flash' | 'offline-toolkit';
}

export interface QuizResultItem {
  questionId: number;
  question: string;
  options: string[];
  selectedOptionIndex: number;
  correctOptionIndex: number;
  isCorrect: boolean;
  explanation: string;
  conceptTag: string;
}

export interface IdentifiedGap {
  conceptTag: string;
  identifiedGap: string;
  remedialExplanation: string;
  concreteAnalogy: string;
}

export interface AdaptiveRecommendation {
  actionType: 'simplify' | 'practice_gap' | 'advance';
  headline: string;
  reasoning: string;
  suggestedActivity: string;
}

export interface GapAnalysisResult {
  id: string;
  topic: string;
  level: LearningLevel;
  scorePercent: number;
  totalQuestions: number;
  correctCount: number;
  overallSummary: string;
  gapsIdentified: IdentifiedGap[];
  targetedPracticeQuestions: QuizQuestion[];
  adaptiveRecommendation: AdaptiveRecommendation;
  source: 'gemini-3.8-flash' | 'offline-toolkit';
  timestamp: string;
}

export interface StudyMilestone {
  day: number;
  topic: string;
  estimatedMinutes: number;
  coreConceptToUnderstand: string;
  interactivePracticeTask: string;
  quickSelfCheck: string;
  tipsForSuccess: string;
  completed?: boolean;
}

export interface StudyPlan {
  id: string;
  subject: string;
  goal: string;
  durationDays: number;
  timeCommitment: string;
  level: LearningLevel;
  planTitle: string;
  dailyMilestones: StudyMilestone[];
  weeklyAdvice: string;
  source: 'gemini-3.8-flash' | 'offline-toolkit';
  createdAt: string;
}

export interface CompletedTopicRecord {
  id: string;
  topic: string;
  category: string;
  level: LearningLevel;
  language: SupportedLanguage;
  timestamp: string;
  quizScore?: number;
  hasGapAnalysis?: boolean;
}
