export interface DemoStepDefinition {
  stepNumber: number;
  title: string;
  shortDesc: string;
  targetView: 'tutor' | 'quiz' | 'gaps' | 'dashboard';
  actionPrompt: string;
  details: string;
}

export const HACKATHON_DEMO_STEPS: DemoStepDefinition[] = [
  {
    stepNumber: 1,
    title: 'Topic Inquiry',
    shortDesc: 'Student requests an explanation of Java Loops',
    targetView: 'tutor',
    actionPrompt: 'Inquire about Java Loops in simple terms',
    details: 'The student selects "Java Loops (for, while, do-while)" at the Beginner level in their preferred language (English or Tamil).'
  },
  {
    stepNumber: 2,
    title: 'Adaptive Explanation',
    shortDesc: 'AI explains Java loops with simple real-world metaphors',
    targetView: 'tutor',
    actionPrompt: 'Review simple explanation and track-laps analogy',
    details: 'LearnBridge AI presents a crystal-clear breakdown: loop counter, boolean condition, update step, and a real-world analogy (running laps around a school track).'
  },
  {
    stepNumber: 3,
    title: 'Diagnostic Quiz',
    shortDesc: 'Student takes a 5-question conceptual quiz',
    targetView: 'quiz',
    actionPrompt: 'Answer the 5 multiple choice questions',
    details: 'The student attempts the 5 questions. In this scenario, the student answers Questions 1, 2, and 5 correctly, but misses Question 3 (infinite while loop) and Question 4 (array off-by-one boundary).'
  },
  {
    stepNumber: 4,
    title: 'Evaluation of Actual Answers',
    shortDesc: 'System grades the actual responses (3 / 5 = 60%)',
    targetView: 'quiz',
    actionPrompt: 'Evaluate score and inspect incorrect options',
    details: 'No fabricated scores: the system computes exact 60% accuracy, showing pedagogical feedback for why the correct option was right and highlighting mistakes.'
  },
  {
    stepNumber: 5,
    title: 'Cognitive Gap Identification',
    shortDesc: 'Detects loop conditions & off-by-one misconceptions',
    targetView: 'gaps',
    actionPrompt: 'Inspect identified learning gaps',
    details: 'The Gap Detector correlates missed Q3 & Q4 to pinpoint specific misunderstandings: (1) Loop update statement omissions causing infinite loops, and (2) Zero-indexed array bounds (< vs <=).'
  },
  {
    stepNumber: 6,
    title: 'Targeted Remedial Revision',
    shortDesc: 'Delivers custom practice drill & adaptive action',
    targetView: 'gaps',
    actionPrompt: 'Complete targeted 3-question drill',
    details: 'Provides a simple analogy (countdown timer clock) and 3 new focused practice questions specifically tailored to fixing loop termination and boundary confusion.'
  },
  {
    stepNumber: 7,
    title: 'Progress Dashboard Updated',
    shortDesc: 'Updates topics studied, mastery score & revision queue',
    targetView: 'dashboard',
    actionPrompt: 'View updated learning metrics',
    details: 'The student dashboard reflects: Java Loops logged, 60% baseline quiz score, 2 learning gap items queued for spaced repetition, and transparent adaptive next recommendation.'
  }
];
