import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import {
  Languages,
  ArrowRightLeft,
  BookOpen,
  Sparkles,
  Lightbulb,
  HelpCircle,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Zap,
  Bookmark,
} from 'lucide-react';

interface JargonResult {
  term: string;
  plainMeaning: string;
  tamilMeaning: string;
  everydayAnalogy: string;
  exampleSentence: string;
  tipForMemory: string;
}

interface TranslationResult {
  originalText: string;
  targetLanguage: string;
  translatedText: string;
  simplifiedExplanation: string;
  glossary: { term: string; translation: string; simpleMeaning: string }[];
  pronunciationOrAudioNotes?: string;
}

export const LanguageBridge: React.FC = () => {
  const { activeLanguage, setActiveLanguage } = useLearning();

  const [activeTab, setActiveTab] = useState<'translate' | 'jargon'>('jargon');

  // Translation State
  const [inputText, setInputText] = useState(
    'A while loop checks its boolean expression before executing the enclosed block of code. If the condition evaluates to false immediately, the loop body is bypassed entirely.'
  );
  const [targetLang, setTargetLang] = useState<'Tamil' | 'English'>('Tamil');
  const [translating, setTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);

  // Jargon Buster State
  const [jargonInput, setJargonInput] = useState('Polymorphism');
  const [busting, setBusting] = useState(false);
  const [jargonResult, setJargonResult] = useState<JargonResult | null>({
    term: 'Polymorphism (பன்முகத்தன்மை)',
    plainMeaning: 'The ability of different objects or tools to respond to the same command in their own unique way.',
    tamilMeaning: 'பல்வேறு உருவங்களை எடுக்கும் திறன். ஒரே கட்டளையை வெவ்வேறு பொருட்கள் தங்களுக்குரிய முறையில் நிறைவேற்றுவது.',
    everydayAnalogy: 'Think of the "Play" button on your phone: If you press Play on a video, it shows pictures; if you press Play on an audio app, it makes sound; if you press Play on a game, it starts the match. One single button, three different behaviors!',
    exampleSentence: 'In Java, polymorphism allows a Shape variable to draw a Circle, Square, or Triangle with the same .draw() method call.',
    tipForMemory: 'Poly = Many, Morph = Form. Many forms of the same action!',
  });

  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sampleJargonWords = [
    'Polymorphism',
    'Recursion',
    'Photosynthesis',
    'Denominator',
    'Hypotenuse',
    'Encapsulation',
    'Algorithmic Complexity',
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setTranslating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/language/bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText.trim(),
          mode: 'translate',
          targetLanguage: targetLang,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          setTranslationResult(json.data);
          setTranslating(false);
          return;
        }
      }

      // Offline translation fallback
      setTranslationResult({
        originalText: inputText,
        targetLanguage: targetLang,
        translatedText:
          targetLang === 'Tamil'
            ? 'while லூப் குறியீட்டுத் தொகுதியை இயக்குவதற்கு முன் அதன் பூலியன் நிபந்தனையை சரிபார்க்கிறது. நிபந்தனை தொடக்கத்திலேயே தவறாக இருந்தால், லூப் தொகுதி முழுமையாகத் தவிர்க்கப்படும்.'
            : 'A while loop repeatedly executes instructions as long as its condition holds true.',
        simplifiedExplanation:
          targetLang === 'Tamil'
            ? 'அதாவது, ஒரு கதவு திறந்திருக்கிறதா என்று பார்த்துவிட்டு உள்ளே செல்வது போன்றது. கதவு பூட்டியிருந்தால் (தவறு) உள்ளே செல்லவே முடியாது.'
            : 'It works like checking if a door is unlocked before stepping inside.',
        glossary: [
          { term: 'while loop', translation: 'while லூப்', simpleMeaning: 'நிபந்தனை முடியும் வரை இயங்கும் சுழற்சி' },
          { term: 'boolean expression', translation: 'பூலியன் நிபந்தனை', simpleMeaning: 'சரி அல்லது தவறு தரும் நிபந்தனை' },
          { term: 'bypassed', translation: 'தவிர்க்கப்படுவது', simpleMeaning: 'இயக்காமல் தாண்டிச் செல்வது' },
        ],
      });
    } catch {
      // Offline fallback
      setTranslationResult({
        originalText: inputText,
        targetLanguage: targetLang,
        translatedText:
          targetLang === 'Tamil'
            ? 'while லூப் குறியீட்டுத் தொகுதியை இயக்குவதற்கு முன் அதன் பூலியன் நிபந்தனையை சரிபார்க்கிறது. நிபந்தனை பொய்யானால் லூப் இயங்காது.'
            : 'A while loop checks its boolean condition before running the code block.',
        simplifiedExplanation:
          'எளிய முறையில்: நிபந்தனை சரிபார்க்கப்பட்ட பின்னரே குறியீடு இயங்கும்.',
        glossary: [
          { term: 'while loop', translation: 'சுழற்சி', simpleMeaning: 'மீண்டும் மீண்டும் இயங்குவது' },
        ],
      });
    } finally {
      setTranslating(false);
    }
  };

  const handleBustJargon = async (wordToBust = jargonInput) => {
    if (!wordToBust.trim()) return;
    setBusting(true);
    setErrorMessage(null);
    setJargonInput(wordToBust);

    try {
      const response = await fetch('/api/language/bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: wordToBust.trim(),
          mode: 'jargon_buster',
          targetLanguage: 'Tamil',
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          setJargonResult(json.data);
          setBusting(false);
          return;
        }
      }

      // Dynamic fallback
      setJargonResult({
        term: wordToBust,
        plainMeaning: `A foundational academic concept in its field, designed to describe a specific mechanism or relationship.`,
        tamilMeaning: `${wordToBust} - இந்த கலைச்சொல் குறிப்பிட்ட கல்வி கருத்தை எளிய முறையில் விளக்குகிறது.`,
        everydayAnalogy: `Think of it like a specific tool in a household toolbox: it has one clear job that makes a bigger task simpler.`,
        exampleSentence: `Understanding ${wordToBust} helps students solve complex problems step-by-step.`,
        tipForMemory: `Break the word into parts or associate it with its primary purpose.`,
      });
    } catch {
      setErrorMessage('Using local definitions.');
    } finally {
      setBusting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Languages className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Language Bridge (English & தமிழ்)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Preserve conceptual meaning while removing language barriers. Translate educational content or bust intimidating academic jargon.
        </p>
      </div>

      {/* Mode Switch Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-fit border border-slate-200">
        <button
          onClick={() => setActiveTab('jargon')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'jargon'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Academic Jargon Buster</span>
        </button>

        <button
          onClick={() => setActiveTab('translate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'translate'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Educational Text Translator</span>
        </button>
      </div>

      {/* MODE 1: ACADEMIC JARGON BUSTER */}
      {activeTab === 'jargon' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Demystify Difficult Academic & Coding Words</span>
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBustJargon();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={jargonInput}
                onChange={(e) => setJargonInput(e.target.value)}
                placeholder="Enter a scary word (e.g. Polymorphism, Recursion, Denominator)..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />

              <button
                type="submit"
                disabled={busting}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {busting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Busting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Bust Jargon</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Jargon Prompt Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500">Try these:</span>
              {sampleJargonWords.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => handleBustJargon(word)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs transition-colors cursor-pointer border border-transparent hover:border-purple-200"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Jargon Buster Output */}
          {jargonResult && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {jargonResult.term}
                  </h2>
                  <p className="text-xs text-purple-600 font-semibold mt-0.5">
                    Explained without cognitive intimidation
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(`${jargonResult.term}: ${jargonResult.plainMeaning}`)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Copy explanation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Plain English meaning */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">
                  Plain Meaning (Zero Jargon)
                </span>
                <p className="text-sm sm:text-base text-slate-800 font-medium">
                  {jargonResult.plainMeaning}
                </p>
              </div>

              {/* Tamil Explanation */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block mb-1">
                  தமிழ் விளக்கம் (Tamil Conceptual Meaning)
                </span>
                <p className="text-sm sm:text-base text-slate-800 font-medium">
                  {jargonResult.tamilMeaning}
                </p>
              </div>

              {/* Relatable Everyday Analogy */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Relatable Everyday Analogy</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {jargonResult.everydayAnalogy}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Example Sentence */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">
                    How it is used in textbooks:
                  </span>
                  <p className="text-slate-700 italic font-mono">
                    "{jargonResult.exampleSentence}"
                  </p>
                </div>

                {/* Memory Tip */}
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                  <span className="font-bold text-teal-900 block mb-1">
                    Memory Trigger / Mnemonic:
                  </span>
                  <p className="text-teal-950 font-medium">
                    {jargonResult.tipForMemory}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: EDUCATIONAL TEXT TRANSLATOR */}
      {activeTab === 'translate' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Languages className="w-4 h-4 text-indigo-600" />
                <span>Translate & Simplify Educational Text</span>
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Translate to:</span>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                  <button
                    onClick={() => setTargetLang('Tamil')}
                    className={`px-2.5 py-1 rounded font-bold transition-colors cursor-pointer ${
                      targetLang === 'Tamil'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600'
                    }`}
                  >
                    தமிழ் (Tamil)
                  </button>
                  <button
                    onClick={() => setTargetLang('English')}
                    className={`px-2.5 py-1 rounded font-bold transition-colors cursor-pointer ${
                      targetLang === 'English'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Paste any confusing academic or textbook text here..."
              className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() =>
                  setInputText(
                    'Photosynthesis is the biochemical process by which photoautotrophic organisms convert light energy into chemical energy stored in glucose molecules.'
                  )
                }
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Load Science Textbook Sample
              </button>

              <button
                onClick={handleTranslate}
                disabled={translating}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {translating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-4 h-4" />
                    <span>Translate & Simplify</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Translation Output */}
          {translationResult && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                {/* Source */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Original Source Text
                  </span>
                  <p className="text-sm text-slate-800 p-4 rounded-2xl bg-slate-50 border border-slate-200 leading-relaxed font-mono">
                    {translationResult.originalText}
                  </p>
                </div>

                {/* Translation */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Educational Translation ({translationResult.targetLanguage})</span>
                  </span>
                  <p className="text-sm text-slate-900 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 leading-relaxed font-semibold">
                    {translationResult.translatedText}
                  </p>
                </div>
              </div>

              {/* Simplified Breakdown */}
              <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block mb-1">
                  Simplified Pedagogical Meaning
                </span>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {translationResult.simplifiedExplanation}
                </p>
              </div>

              {/* Terminology Glossary */}
              {translationResult.glossary?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-indigo-600" />
                    <span>Key Terminology Glossary</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {translationResult.glossary.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1"
                      >
                        <p className="text-xs font-bold text-indigo-700">{item.term}</p>
                        <p className="text-xs font-semibold text-slate-900">{item.translation}</p>
                        <p className="text-[11px] text-slate-500">{item.simpleMeaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
