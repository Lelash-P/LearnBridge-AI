import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini client strictly on server-side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const GEMINI_MODEL = 'gemini-3.8-flash';

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey && apiKey.length > 5 && !apiKey.includes('MY_GEMINI_API_KEY')),
    model: GEMINI_MODEL,
    serverTime: new Date().toISOString(),
  });
});

// Helper to sanitize and parse JSON response from Gemini
function cleanAndParseJSON<T = any>(rawText: string, fallback: T): T {
  try {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.warn('Failed to parse model JSON output, falling back:', err);
    return fallback;
  }
}
// Timeout wrapper for AI calls to maintain high responsiveness
function withTimeout<T>(promise: Promise<T>, ms = 6000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('AI request timed out after ' + ms + 'ms')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}
// 1. FEATURE A: PERSONALIZED AI TUTOR
app.post('/api/tutor/explain', async (req: Request, res: Response) => {
  const { topic, level = 'Beginner', language = 'English', mode = 'standard' } = req.body;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  if (!apiKey || apiKey.includes('MY_GEMINI_API_KEY')) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  const prompt = `You are LearnBridge AI, an empathetic, pedagogically sound educational tutor.
The user wants to learn about: "${topic.trim()}".
Target Learning Level: ${level} (Beginner: intuitive, simple metaphors, no overwhelming jargon; Intermediate: clear concepts with mechanics; Advanced: deep technical precision, edge cases, underlying architecture).
Language Preference: ${language} (If Tamil, provide fluent, accurate Tamil explanations while maintaining standard technical terms with transliteration or English equivalents in brackets).

Respond ONLY with valid raw JSON adhering to this exact schema (no markdown wrap outside, no extra text):
{
  "topic": "${topic.trim()}",
  "level": "${level}",
  "language": "${language}",
  "simpleExplanation": "A 2-3 sentence crystal-clear, non-intimidating explanation suitable for a ${level} learner.",
  "detailedExplanation": "A thorough paragraph diving deeper into how and why this concept works.",
  "realWorldExample": "An engaging, relatable real-world metaphor or everyday life application.",
  "stepByStep": [
    "Step 1: foundational concept or first action",
    "Step 2: core mechanics or application",
    "Step 3: outcome or how it connects"
  ],
  "keyTakeaways": [
    "Key Takeaway 1",
    "Key Takeaway 2",
    "Key Takeaway 3"
  ],
  "followUpQuestions": [
    "Follow-up question 1 to explore deeper",
    "Follow-up question 2 to test intuition",
    "Follow-up question 3 about practical applications"
  ]
}`;

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
      7000
    );

    const parsed = cleanAndParseJSON(response.text || '', null);
    if (!parsed) {
      return res.status(502).json({ error: 'Invalid response format from AI model.', fallbackAvailable: true });
    }

    return res.json({
      success: true,
      data: parsed,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error in /api/tutor/explain:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate tutor explanation.',
      fallbackAvailable: true,
    });
  }
});

// 2. FEATURE B: LANGUAGE BRIDGE (English <-> Tamil translation & Jargon Buster)
app.post('/api/language/bridge', async (req: Request, res: Response) => {
  const { text, mode = 'translate', targetLanguage = 'Tamil' } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  if (!apiKey || apiKey.includes('MY_GEMINI_API_KEY')) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  let prompt = '';
  if (mode === 'jargon_buster') {
    prompt = `You are LearnBridge AI's "Jargon Buster".
The student is confused by this academic/technical word or phrase: "${text.trim()}".
Target Language context: ${targetLanguage}.

Break it down simply so any student can understand without fear.
Respond ONLY with valid JSON:
{
  "term": "${text.trim()}",
  "plainMeaning": "A simple 1-2 sentence explanation in plain language avoiding hard words.",
  "tamilMeaning": "Tamil translation and clear conceptual explanation in Tamil.",
  "everydayAnalogy": "A concrete metaphor from daily life (cooking, sports, smartphones, shopping, etc.).",
  "exampleSentence": "A sample sentence showing how it is used naturally.",
  "tipForMemory": "A quick mnemonic or memory trigger to remember this concept easily."
}`;
  } else {
    prompt = `You are LearnBridge AI's Language Bridge.
Translate and explain this educational text between English and ${targetLanguage}.
Input text: "${text.trim()}"

Preserve educational and scientific meaning faithfully while ensuring simple, natural phrasing.
Respond ONLY with valid JSON:
{
  "originalText": "${text.trim()}",
  "targetLanguage": "${targetLanguage}",
  "translatedText": "Accurate, natural educational translation into ${targetLanguage}.",
  "simplifiedExplanation": "A simplified breakdown in ${targetLanguage} for students who find the original hard.",
  "glossary": [
    { "term": "Key term 1", "translation": "Term in ${targetLanguage}", "simpleMeaning": "Simple definition" },
    { "term": "Key term 2", "translation": "Term in ${targetLanguage}", "simpleMeaning": "Simple definition" }
  ],
  "pronunciationOrAudioNotes": "Helpful pronunciation or phonetics note if helpful"
}`;
  }

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      }),
      7000
    );

    const parsed = cleanAndParseJSON(response.text || '', null);
    if (!parsed) {
      return res.status(502).json({ error: 'Invalid response from AI model.', fallbackAvailable: true });
    }

    return res.json({
      success: true,
      data: parsed,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error in /api/language/bridge:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to process language bridge request.',
      fallbackAvailable: true,
    });
  }
});

// 3. FEATURE C: SMART QUIZ GENERATOR (5 Multiple Choice Questions)
app.post('/api/quiz/generate', async (req: Request, res: Response) => {
  const { topic, level = 'Beginner', language = 'English', count = 5 } = req.body;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  if (!apiKey || apiKey.includes('MY_GEMINI_API_KEY')) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  const prompt = `You are LearnBridge AI's Educational Assessment Engine.
Generate exactly 5 high-quality, conceptual multiple-choice questions for the topic: "${topic.trim()}".
Target Difficulty: ${level}.
Language: ${language} (If Tamil, the questions, options, and explanations must be in accurate Tamil).

Important rules:
1. Exactly 4 options per question.
2. The questions should test comprehension and real application, not rote memorization.
3. Clearly specify which option is correct by index (0, 1, 2, or 3).
4. Provide a clear pedagogical explanation for why the correct option is right and common pitfalls of wrong options.
5. Provide a specific "conceptTag" for each question (e.g., for Java Loops: "loop-condition", "initialization", "off-by-one", "infinite-loop", "nested-loops").

Respond ONLY with valid JSON:
{
  "topic": "${topic.trim()}",
  "level": "${level}",
  "language": "${language}",
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Why this option is correct and why other options are incorrect.",
      "conceptTag": "specific-subconcept-name"
    }
  ]
}`;

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      }),
      7000
    );

    const parsed = cleanAndParseJSON<any>(response.text || '', null);
    if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      return res.status(502).json({ error: 'Invalid quiz format generated.', fallbackAvailable: true });
    }

    return res.json({
      success: true,
      data: parsed,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error in /api/quiz/generate:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate quiz.',
      fallbackAvailable: true,
    });
  }
});

// 4. FEATURE D & E: LEARNING GAP DETECTOR & ADAPTIVE PRACTICE
app.post('/api/gaps/analyze', async (req: Request, res: Response) => {
  const { topic, level = 'Beginner', language = 'English', quizResults } = req.body;

  if (!quizResults || !Array.isArray(quizResults) || quizResults.length === 0) {
    return res.status(400).json({ error: 'Quiz results are required for gap analysis.' });
  }

  const total = quizResults.length;
  const correctCount = quizResults.filter((q: any) => q.isCorrect).length;
  const incorrectQuestions = quizResults.filter((q: any) => !q.isCorrect);
  const scorePercent = Math.round((correctCount / total) * 100);

  if (!apiKey || apiKey.includes('MY_GEMINI_API_KEY')) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  const prompt = `You are LearnBridge AI's Diagnostic Learning Gap Analyzer and Adaptive Recommender.
A student took a quiz on topic "${topic}" at level "${level}".
Results:
- Total Questions: ${total}
- Correct: ${correctCount} (${scorePercent}%)
- Incorrect Questions:
${JSON.stringify(incorrectQuestions, null, 2)}

Language to respond in: ${language}.

Based EXCLUSIVELY on their actual incorrect answers and concept tags (do NOT invent or speculate beyond the evidence):
1. Pinpoint the specific cognitive gap or misunderstanding.
2. Provide a simplified remediation explanation to fix the misunderstanding immediately.
3. Generate 3 targeted practice questions addressing ONLY the weak subconcept(s).
4. Recommend the transparent adaptive next action (e.g., if score < 60%, simplify and revise; if 60-80%, focus on weak subconcept; if > 80%, level up to next difficulty).
Do NOT claim to diagnose intelligence or disabilities.

Respond ONLY with valid JSON:
{
  "topic": "${topic}",
  "scorePercent": ${scorePercent},
  "overallSummary": "Empathetic, constructive 2-sentence summary of the student's performance.",
  "gapsIdentified": [
    {
      "conceptTag": "name-of-missed-concept",
      "identifiedGap": "Specific misunderstanding detected based on the missed question",
      "remedialExplanation": "Clear, simple explanation clarifying this exact confusion",
      "concreteAnalogy": "A simple analogy that makes this click"
    }
  ],
  "targetedPracticeQuestions": [
    {
      "id": 1,
      "question": "New practice question targeted at the weak spot",
      "options": ["Choice A", "Choice B", "Choice C", "Choice D"],
      "correctAnswerIndex": 1,
      "explanation": "Clear explanation of the correct choice",
      "conceptTag": "targeted-subconcept"
    }
  ],
  "adaptiveRecommendation": {
    "actionType": "${scorePercent < 60 ? 'simplify' : scorePercent < 80 ? 'practice_gap' : 'advance'}",
    "headline": "Recommended Next Step Title",
    "reasoning": "Clear, transparent explanation of why this step was chosen based on the score of ${scorePercent}%",
    "suggestedActivity": "Specific actionable next exercise to do"
  }
}`;

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      }),
      7000
    );

    const parsed = cleanAndParseJSON(response.text || '', null);
    if (!parsed) {
      return res.status(502).json({ error: 'Invalid response from gap analyzer.', fallbackAvailable: true });
    }

    return res.json({
      success: true,
      data: parsed,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error in /api/gaps/analyze:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze learning gaps.',
      fallbackAvailable: true,
    });
  }
});

// 5. FEATURE H: STUDY PLAN GENERATOR
app.post('/api/study-plan/generate', async (req: Request, res: Response) => {
  const { subject, goal, timeCommitment = '45 minutes/day', durationDays = 7, level = 'Beginner' } = req.body;

  if (!subject || !goal) {
    return res.status(400).json({ error: 'Subject and goal are required.' });
  }

  if (!apiKey || apiKey.includes('MY_GEMINI_API_KEY')) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      fallbackAvailable: true,
    });
  }

  const prompt = `You are LearnBridge AI's Personalized Study Architect.
Generate a realistic, bite-sized, practical daily study plan for:
- Subject: "${subject}"
- Specific Goal: "${goal}"
- Daily Time Available: "${timeCommitment}"
- Target Duration: ${durationDays} Days
- Learning Level: "${level}"

Structure a realistic day-by-day plan that follows the LearnBridge cycle:
Understand -> Practice -> Identify Gaps -> Personalize Next Lesson.
Include realistic rest/review checkpoints.

Respond ONLY with valid JSON:
{
  "subject": "${subject}",
  "goal": "${goal}",
  "durationDays": ${durationDays},
  "timeCommitment": "${timeCommitment}",
  "level": "${level}",
  "planTitle": "Catchy and motivating plan title",
  "dailyMilestones": [
    {
      "day": 1,
      "topic": "Core topic name",
      "estimatedMinutes": 45,
      "coreConceptToUnderstand": "What to read or understand first",
      "interactivePracticeTask": "Hands-on activity or practice questions to do",
      "quickSelfCheck": "A simple question the student should be able to answer by end of day",
      "tipsForSuccess": "Quick advice to maintain focus"
    }
  ],
  "weeklyAdvice": "Overall pedagogical tip for this subject"
}`;

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
      7000
    );

    const parsed = cleanAndParseJSON(response.text || '', null);
    if (!parsed) {
      return res.status(502).json({ error: 'Invalid study plan output.', fallbackAvailable: true });
    }

    return res.json({
      success: true,
      data: parsed,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error in /api/study-plan/generate:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate study plan.',
      fallbackAvailable: true,
    });
  }
});

// Mount Vite or static server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT) || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LearnBridge AI server is running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
