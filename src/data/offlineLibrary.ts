import { Quiz, TutorExplanation, GapAnalysisResult } from '../types/learning';

export interface OfflineSubjectModule {
  id: string;
  title: string;
  category: 'Computer Science' | 'Mathematics' | 'English Grammar' | 'Programming';
  tag: string;
  summary: string;
  explanationEn: TutorExplanation;
  explanationTa: TutorExplanation;
  quizEn: Quiz;
  quizTa: Quiz;
  sampleGapAnalysis: GapAnalysisResult;
}

export const OFFLINE_LIBRARY: OfflineSubjectModule[] = [
  {
    id: 'java-loops',
    title: 'Java Loops (for, while, do-while)',
    category: 'Programming',
    tag: 'Java Fundamentals',
    summary: 'Master control flow, loop boundary conditions, off-by-one issues, and loop termination.',
    explanationEn: {
      topic: 'Java Loops',
      level: 'Beginner',
      language: 'English',
      simpleExplanation: 'A loop in Java is like a musical repeat button: it tells the computer to repeat a block of code over and over until a specific condition stops it.',
      detailedExplanation: 'Java provides three primary loop constructs: the "for" loop (ideal when you know beforehand how many times to repeat), the "while" loop (checks the condition BEFORE running the code), and the "do-while" loop (runs at least once because it checks the condition AFTER execution). Every loop relies on three critical components: initialization of a loop counter, a boolean termination condition, and an update statement (e.g. i++). If the condition never turns false, you create an infinite loop.',
      realWorldExample: 'Think of running laps around a school track. You start at lap 1 (initialization). Before every lap, your coach checks if you have run fewer than 5 laps (condition: lap <= 5). Once you finish lap 5, lap becomes 6, the condition fails, and you stop to drink water (loop terminates).',
      stepByStep: [
        'Step 1 (Initialization): Declare your starting variable, e.g., int i = 0;',
        'Step 2 (Condition Check): Evaluate boolean test, e.g., i < 5. If true, run the body; if false, exit immediately.',
        'Step 3 (Execute Body): Run whatever instructions are inside the { ... } braces.',
        'Step 4 (Update Step): Increment or modify counter, e.g., i++. Then jump back to Step 2.'
      ],
      keyTakeaways: [
        'A for-loop is best when the number of iterations is known ahead of time.',
        'A while-loop evaluates its condition at the start; if false initially, it may execute zero times.',
        'A do-while loop always executes its body at least once.',
        'Off-by-one errors happen when using "<" instead of "<=" or starting at 1 instead of 0.'
      ],
      followUpQuestions: [
        'What will happen if you forget the update expression (e.g., i++) inside a while loop?',
        'When is a do-while loop strictly preferred over a standard while loop in real software?',
        'How does the break keyword differ from the continue keyword inside a loop?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    explanationTa: {
      topic: 'ஜாவா லூப்புகள் (Java Loops)',
      level: 'Beginner',
      language: 'Tamil',
      simpleExplanation: 'ஜாவாவில் ஒரு லூப் என்பது ஒரு பாடல் மீண்டும் ஒலிப்பது (Repeat) போன்றது. ஒரு குறிப்பிட்ட நிபந்தனை முடியும் வரை ஒரே கட்டளையை மீண்டும் மீண்டும் செய்ய கணினிக்கு உத்தரவிடுகிறது.',
      detailedExplanation: 'ஜாவாவில் மூன்று முக்கிய லூப் வகைகள் உள்ளன: for லூப் (எத்தனை முறை சுழல வேண்டும் என்று முன்கூட்டியே தெரிந்தால்), while லூப் (இயங்குவதற்கு முன் நிபந்தனையை சரிபார்க்கும்), மற்றும் do-while லூப் (குறைந்தது ஒரு முறையாவது இயங்கி அதன் பின் நிபந்தனையை சரிபார்க்கும்). ஒவ்வொரு லூப்பிற்கும் மூன்று முக்கியமான பகுதிகள் உள்ளன: தொடக்கம் (Initialization), நிபந்தனை (Condition), மற்றும் மாற்றம் (Update - i++).',
      realWorldExample: 'ஒரு மைதானத்தில் 5 சுற்றுகள் ஓடுவதை கற்பனை செய்யுங்கள். நீங்கள் 1-வது சுற்றில் தொடங்குகிறீர்கள் (தொடக்கம்). ஒவ்வொரு சுற்றுக்கு முன்பும் நீங்கள் 5-க்குக் குறைவாக ஓடியுள்ளீர்களா என்று பார்க்கிறீர்கள் (நிபந்தனை). 5 சுற்றுகள் முடிந்ததும் நீங்கள் நிற்கிறீர்கள்.',
      stepByStep: [
        'படி 1 (தொடக்கம்): int i = 0; என தொடக்க எண்ணை அமைப்பது.',
        'படி 2 (நிபந்தனை சரிபார்ப்பு): i < 5 உண்மை என்றால் உள்ளே இருக்கும் கட்டளையை இயக்குவது.',
        'படி 3 (செயல்முறை): பிரேஸ்களுக்குள் { } உள்ள குறியீட்டை இயக்குவது.',
        'படி 4 (மாற்றம்): i++ மூலம் எண்ணை உயர்த்தி மீண்டும் படி 2-க்கு செல்வது.'
      ],
      keyTakeaways: [
        'சுற்றுகளின் எண்ணிக்கை முன்கூட்டியே தெரிந்தால் for லூப் சிறந்தது.',
        'while லூப் தொடக்கத்திலேயே நிபந்தனை பொய்யாக இருந்தால் ஒரு முறை கூட இயங்காது.',
        'do-while லூப் எப்போதும் குறைந்தது ஒரு முறையாவது இயங்கும்.',
        'அப்-பை-ஒன் (Off-by-one) பிழைகள் பெரும்பாலும் < மற்றும் <= தவறாக பயன்படுத்துவதால் ஏற்படுகின்றன.'
      ],
      followUpQuestions: [
        'while லூப்பில் i++ கொடுக்க மறந்துவிட்டால் என்ன நடக்கும்?',
        'ஜாவாவில் break மற்றும் continue வார்த்தைகளுக்கு என்ன வித்தியாசம்?',
        'do-while லூப் எந்த நிஜ சூழ்நிலைகளில் பயன்படுகிறது?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    quizEn: {
      id: 'quiz-java-loops-en',
      topic: 'Java Loops',
      level: 'Beginner',
      language: 'English',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'How many times will this loop print "Hello"?\nfor(int i = 0; i < 3; i++) { System.out.println("Hello"); }',
          options: ['2 times', '3 times', '4 times', 'Infinite times'],
          correctAnswerIndex: 1,
          explanation: 'The loop starts at i = 0, runs for i = 0, 1, 2. When i reaches 3, 3 < 3 is false, so it terminates. It runs exactly 3 times.',
          conceptTag: 'loop-bounds'
        },
        {
          id: 2,
          question: 'What is the key difference between a while loop and a do-while loop in Java?',
          options: [
            'A while loop cannot use boolean expressions',
            'A do-while loop checks the condition first before running',
            'A do-while loop is guaranteed to execute at least once',
            'A while loop can only iterate numbers, not objects'
          ],
          correctAnswerIndex: 2,
          explanation: 'A do-while loop checks its condition at the bottom (after executing the block), ensuring the body runs at least once even if the condition is false initially.',
          conceptTag: 'do-while-semantics'
        },
        {
          id: 3,
          question: 'What happens in this code snippet?\nint count = 5;\nwhile(count > 0) {\n  System.out.println(count);\n}',
          options: [
            'Prints numbers 5 down to 1 and terminates',
            'Syntax error during compilation',
            'Creates an infinite loop because count is never decremented',
            'Prints nothing because the condition is false'
          ],
          correctAnswerIndex: 2,
          explanation: 'Because count is never decremented inside the loop (no count--), count remains 5 forever, meaning count > 0 is always true, resulting in an infinite loop.',
          conceptTag: 'loop-termination'
        },
        {
          id: 4,
          question: 'To iterate over a Java array `int[] nums = {10, 20, 30}`, which loop condition avoids an ArrayIndexOutOfBoundsException?',
          options: [
            'for(int i = 0; i <= nums.length; i++)',
            'for(int i = 0; i < nums.length; i++)',
            'for(int i = 1; i <= nums.length; i++)',
            'for(int i = 0; i != nums.length + 1; i++)'
          ],
          correctAnswerIndex: 1,
          explanation: 'Java arrays are 0-indexed and end at index length - 1. Using i < nums.length visits valid indices 0, 1, 2. Using <= nums.length attempts to access index 3, which throws ArrayIndexOutOfBoundsException (an off-by-one error).',
          conceptTag: 'off-by-one'
        },
        {
          id: 5,
          question: 'What does the `continue` statement do inside a Java loop?',
          options: [
            'Immediately exits the entire loop completely',
            'Restarts the computer program from line 1',
            'Skips the rest of the current iteration and jumps to the next iteration',
            'Converts the loop into a recursive function'
          ],
          correctAnswerIndex: 2,
          explanation: 'Unlike break (which stops the loop altogether), continue immediately skips any remaining code in the current iteration and jumps to the next cycle (or update step).',
          conceptTag: 'control-statements'
        }
      ]
    },
    quizTa: {
      id: 'quiz-java-loops-ta',
      topic: 'ஜாவா லூப்புகள் (Java Loops)',
      level: 'Beginner',
      language: 'Tamil',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'இந்த லூப் "Hello" என்பதை எத்தனை முறை அச்சிடும்?\nfor(int i = 0; i < 3; i++) { System.out.println("Hello"); }',
          options: ['2 முறை', '3 முறை', '4 முறை', 'முடிவிலி (Infinite) முறை'],
          correctAnswerIndex: 1,
          explanation: 'லூப் i = 0 இல் தொடங்கி, 0, 1, 2 என 3 முறை இயங்கும். i = 3 ஆகும்போது நிபந்தனை பொய்யாகி நின்றுவிடும்.',
          conceptTag: 'loop-bounds'
        },
        {
          id: 2,
          question: 'while லூப் மற்றும் do-while லூப்பிற்கு இடையிலான முக்கிய வேறுபாடு என்ன?',
          options: [
            'while லூப் பூலியன் நிபந்தனைகளை ஏற்காது',
            'do-while லூப் முதலில் நிபந்தனையை சரிபார்க்கும்',
            'do-while லூப் குறைந்தது ஒரு முறையாவது கட்டாயம் இயங்கும்',
            'while லூப் எண்களை மட்டுமே சுழற்ற முடியும்'
          ],
          correctAnswerIndex: 2,
          explanation: 'do-while லூப் நிபந்தனையை கடைசியில் மட்டுமே சரிபார்ப்பதால், நிபந்தனை பொய்யாக இருந்தாலும் முதல் முறை இயங்கிவிடும்.',
          conceptTag: 'do-while-semantics'
        },
        {
          id: 3,
          question: 'இந்த குறியீட்டில் என்ன நடக்கும்?\nint count = 5;\nwhile(count > 0) {\n  System.out.println(count);\n}',
          options: [
            '5 முதல் 1 வரை அச்சிட்டு நின்றுவிடும்',
            'கம்பைல் பிழை (Syntax error)',
            'count குறைக்கப்படாததால் முடிவிலி லூப்பாக (Infinite Loop) மாறும்',
            'எதுவும் அச்சிடப்படாது'
          ],
          correctAnswerIndex: 2,
          explanation: 'லூப்பிற்குள் count-- கொடுக்கப்படாததால் count எப்போதும் 5 ஆகவே இருக்கும்; எனவே லூப் நிற்காமல் ஓடிக்கொண்டே இருக்கும்.',
          conceptTag: 'loop-termination'
        },
        {
          id: 4,
          question: 'int[] nums = {10, 20, 30} என்ற அணிக்கு எந்த நிபந்தனை சரியான குறியீட்டு வரம்பைக் கொடுக்கும்?',
          options: [
            'for(int i = 0; i <= nums.length; i++)',
            'for(int i = 0; i < nums.length; i++)',
            'for(int i = 1; i <= nums.length; i++)',
            'for(int i = 0; i != nums.length + 1; i++)'
          ],
          correctAnswerIndex: 1,
          explanation: 'ஜாவாவில் அணிகள் 0 இல் தொடங்குவதால் nums.length - 1 வரை மட்டுமே செல்ல வேண்டும். எனவே i < nums.length சரியானது; <= கொடுத்தால் ArrayIndexOutOfBoundsException பிழை வரும்.',
          conceptTag: 'off-by-one'
        },
        {
          id: 5,
          question: 'ஜாவா லூப்பில் `continue` கட்டளையின் வேலை என்ன?',
          options: [
            'லூப்பை விட்டு உடனடியாக வெளியேறுவது',
            'நிரலை தொடக்கத்திலிருந்து மீண்டும் இயக்குவது',
            'தற்போதைய சுற்றைத் தவிர்த்து அடுத்த சுற்றுக்கு தாவுவது',
            'லூப்பை ஒரு செயற்கூறாக மாற்றுவது'
          ],
          correctAnswerIndex: 2,
          explanation: 'break என்பது லூப்பையே நிறுத்தும், ஆனால் continue என்பது தற்போதைய சுற்றை மட்டும் தவிர்த்து அடுத்த சுற்றுக்கு அழைத்துச் செல்லும்.',
          conceptTag: 'control-statements'
        }
      ]
    },
    sampleGapAnalysis: {
      id: 'demo-gap-java-loops',
      topic: 'Java Loops',
      level: 'Beginner',
      scorePercent: 60,
      totalQuestions: 5,
      correctCount: 3,
      overallSummary: 'You have a good grasp of basic for-loops, but struggled with loop termination conditions (Question 3) and off-by-one array boundaries (Question 4).',
      gapsIdentified: [
        {
          conceptTag: 'loop-termination',
          identifiedGap: 'Understanding Loop Update & Termination Conditions',
          remedialExplanation: 'Every while loop requires an explicit update statement (like count--) inside its body. Without updating the tracked variable toward the termination boundary, the boolean check stays true forever.',
          concreteAnalogy: 'Imagine a countdown timer before a rocket launch: if you never subtract 1 second from the clock, the countdown stays at 5 forever and the rocket never launches!'
        },
        {
          conceptTag: 'off-by-one',
          identifiedGap: 'Array Boundary and Off-by-One Indexing (< vs <=)',
          remedialExplanation: 'In zero-indexed languages like Java, an array of size 3 only has indices 0, 1, and 2. Using "<=" goes up to index 3 which does not exist, causing a crash. Always use "i < length".',
          concreteAnalogy: 'Think of 3 chairs labeled 0, 1, and 2. If you tell a 4th person to sit in chair 3, they will fall down because that chair was never made!'
        }
      ],
      targetedPracticeQuestions: [
        {
          id: 101,
          question: 'Fix this loop so it terminates after 4 iterations:\nint x = 0;\nwhile(x < 4) {\n  System.out.println(x);\n  // MISSING LINE\n}',
          options: ['x = 0;', 'x++;', 'break;', 'x--;'],
          correctAnswerIndex: 1,
          explanation: 'Adding x++ increments x each time (0, 1, 2, 3), so when x reaches 4, x < 4 becomes false and terminates cleanly.',
          conceptTag: 'loop-termination'
        },
        {
          id: 102,
          question: 'Which index will cause an error in an array of size 5 (indices 0 to 4)?',
          options: ['index 0', 'index 2', 'index 4', 'index 5'],
          correctAnswerIndex: 3,
          explanation: 'An array of size 5 has indices 0, 1, 2, 3, 4. Index 5 is outside the bounds and throws an exception.',
          conceptTag: 'off-by-one'
        },
        {
          id: 103,
          question: 'What is printed by this loop?\nint k = 1;\nwhile(k <= 3) {\n  k++;\n}\nSystem.out.println(k);',
          options: ['3', '4', '1', '2'],
          correctAnswerIndex: 1,
          explanation: 'When k is 3, 3 <= 3 is true, so k increments to 4. Then 4 <= 3 is false, loop terminates, and k is 4.',
          conceptTag: 'loop-bounds'
        }
      ],
      adaptiveRecommendation: {
        actionType: 'practice_gap',
        headline: 'Focus on Loop Boundaries & Counter Updates',
        reasoning: 'Your score of 60% shows core syntax readiness, but boundary conditions caused errors. Reinforcing boundary checks will elevate you to 100% mastery.',
        suggestedActivity: 'Complete the 3 targeted drill questions above on loop condition updates.'
      },
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'basic-math-percentages',
    title: 'Percentages & Everyday Fractions',
    category: 'Mathematics',
    tag: 'Basic Mathematics',
    summary: 'Understand discounts, ratios, portions, and how fractions translate to percentages in everyday life.',
    explanationEn: {
      topic: 'Everyday Percentages and Fractions',
      level: 'Beginner',
      language: 'English',
      simpleExplanation: 'A percentage is simply a fraction where the bottom number is always 100. "Percent" literally means "per hundred".',
      detailedExplanation: 'Fractions and percentages are two ways of describing parts of a whole. 1/2 is equal to 50/100 or 50%. To calculate a percentage of any number, convert the percentage to a decimal by dividing by 100 (e.g. 20% becomes 0.20), then multiply by the total. In shopping, a 20% discount on a $50 item means you save 0.20 * 50 = $10, paying $40.',
      realWorldExample: 'Think of a pizza sliced into 4 equal slices. If you eat 1 slice, you ate 1/4 of the pizza. If you convert that to 100 slices, that would be 25 slices out of 100, which is 25%.',
      stepByStep: [
        'Step 1: Identify the part and the total (e.g., 3 out of 12 pencils).',
        'Step 2: Write as a fraction (3/12 = 1/4).',
        'Step 3: Divide numerator by denominator to get decimal (1 ÷ 4 = 0.25).',
        'Step 4: Multiply decimal by 100 to get percentage (0.25 × 100 = 25%).'
      ],
      keyTakeaways: [
        'Percent means "out of 100".',
        'Common shortcuts: 50% = half, 25% = quarter, 10% = move the decimal one place left.',
        'To find 15% tip on a bill: find 10% first, halve that to get 5%, and add them together.'
      ],
      followUpQuestions: [
        'If a shirt is on sale for 30% off a $40 price tag, what is the final price?',
        'Why does a 50% increase followed by a 50% decrease not bring you back to the original price?',
        'How does simple interest use percentages in banking?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    explanationTa: {
      topic: 'சதவீதங்கள் மற்றும் அன்றாட பின்னங்கள் (Percentages)',
      level: 'Beginner',
      language: 'Tamil',
      simpleExplanation: 'சதவீதம் (Percent) என்பது ஒரு முழுமையான பகுதியை 100-ஆகப் பிரித்து அதில் எத்தனை பங்கு என்று சொல்வது. "நூற்றுக்கு எத்தனை" என்பதே சதவீதம்.',
      detailedExplanation: 'பின்னங்களும் சதவீதங்களும் ஒரே விஷயத்தை வேறு வழியில் குறிக்கின்றன. 1/2 என்பது 50/100 அல்லது 50%. ஒரு தொகையின் சதவீதத்தைக் கணக்கிட, சதவீதத்தை 100-ஆல் வகுத்து (20% = 0.20) தொகையுடன் பெருக்க வேண்டும்.',
      realWorldExample: '4 துண்டுகளாக வெட்டப்பட்ட ஒரு தோசையை நினையுங்கள். நீங்கள் 1 துண்டைச் சாப்பிட்டால் 1/4 அல்லது 25% சாப்பிட்டிருக்கிறீர்கள்.',
      stepByStep: [
        'படி 1: பகுதியையும் முழுமையையும் அடையாளம் காணுங்கள் (எ.கா. 20-ல் 5).',
        'படி 2: பின்னமாக எழுதுங்கள் (5/20 = 1/4).',
        'படி 3: தசம எண்ணாக மாற்றுங்கள் (1 ÷ 4 = 0.25).',
        'படி 4: 100-ஆல் பெருக்கி சதவீதமாகப் பெறுங்கள் (0.25 × 100 = 25%).'
      ],
      keyTakeaways: [
        'சதவீதம் என்றால் "100-க்கு எத்தனை பங்கு".',
        'எளிதான வழிகள்: 50% = பாதி, 25% = கால் பகுதி, 10% = ஒரு தசம ஸ்தானம் தள்ளுவது.',
        'விலைக் கழிவு (Discount) கணக்கிட சதவீதமே பெரிதும் பயன்படுகிறது.'
      ],
      followUpQuestions: [
        'ரூபாய் 200 உள்ள ஒரு பொருளுக்கு 20% தள்ளுபடி என்றால் இறுதி விலை என்ன?',
        'பின்னங்களை சதவீதமாக மாற்றுவது எப்படி?',
        'வங்கிகளில் வட்டி கணக்கிட சதவீதம் எவ்வாறு பயன்படுகிறது?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    quizEn: {
      id: 'quiz-math-percentages-en',
      topic: 'Everyday Percentages and Fractions',
      level: 'Beginner',
      language: 'English',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'What is 25% of 80?',
          options: ['15', '20', '25', '30'],
          correctAnswerIndex: 1,
          explanation: '25% is equal to 1/4. 80 divided by 4 is 20.',
          conceptTag: 'fraction-conversion'
        },
        {
          id: 2,
          question: 'A jacket costs $100 and is discounted by 30%. What is the sale price?',
          options: ['$30', '$60', '$70', '$80'],
          correctAnswerIndex: 2,
          explanation: '30% of $100 is $30 savings. The final price is $100 - $30 = $70.',
          conceptTag: 'discount-calculation'
        },
        {
          id: 3,
          question: 'Which fraction is equivalent to 75%?',
          options: ['1/2', '2/3', '3/4', '4/5'],
          correctAnswerIndex: 2,
          explanation: '75% = 75/100, which simplifies by dividing top and bottom by 25 to 3/4.',
          conceptTag: 'fraction-equivalence'
        },
        {
          id: 4,
          question: 'If a student scores 18 out of 20 on a test, what is their percentage score?',
          options: ['80%', '85%', '90%', '92%'],
          correctAnswerIndex: 2,
          explanation: '18 / 20 = 9 / 10 = 0.90, which equals 90%.',
          conceptTag: 'score-to-percentage'
        },
        {
          id: 5,
          question: 'Quick mental math trick: To find 10% of 240, what should you do?',
          options: [
            'Multiply 240 by 10',
            'Move the decimal point one place to the left to get 24',
            'Subtract 10 from 240',
            'Divide 240 by 2'
          ],
          correctAnswerIndex: 1,
          explanation: 'Since 10% is 1/10, dividing by 10 simply shifts the decimal one place to the left: 240 becomes 24.',
          conceptTag: 'mental-math-shortcut'
        }
      ]
    },
    quizTa: {
      id: 'quiz-math-percentages-ta',
      topic: 'சதவீதங்கள் மற்றும் அன்றாட பின்னங்கள்',
      level: 'Beginner',
      language: 'Tamil',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: '80-ல் 25% என்பது எவ்வளவு?',
          options: ['15', '20', '25', '30'],
          correctAnswerIndex: 1,
          explanation: '25% என்பது 1/4 பகுதி. 80-ஐ 4-ஆல் வகுத்தால் 20 கிடைக்கும்.',
          conceptTag: 'fraction-conversion'
        },
        {
          id: 2,
          question: 'ரூபாய் 100 மதிப்புள்ள சட்டைக்கு 30% தள்ளுபடி என்றால் விற்பனை விலை என்ன?',
          options: ['ரூ. 30', 'ரூ. 60', 'ரூ. 70', 'ரூ. 80'],
          correctAnswerIndex: 2,
          explanation: '100-ல் 30% என்பது 30 தள்ளுபடி. எனவே 100 - 30 = 70.',
          conceptTag: 'discount-calculation'
        },
        {
          id: 3,
          question: '75%-க்கு இணையான பின்னம் எது?',
          options: ['1/2', '2/3', '3/4', '4/5'],
          correctAnswerIndex: 2,
          explanation: '75/100 என்பதை 25-ஆல் சுருக்கினால் 3/4 கிடைக்கும்.',
          conceptTag: 'fraction-equivalence'
        },
        {
          id: 4,
          question: 'ஒரு மாணவர் 20-க்கு 18 மதிப்பெண்கள் பெற்றால் அவரது சதவீதம் என்ன?',
          options: ['80%', '85%', '90%', '92%'],
          correctAnswerIndex: 2,
          explanation: '18 / 20 = 0.90. எனவே 90%.',
          conceptTag: 'score-to-percentage'
        },
        {
          id: 5,
          question: '240-ன் 10% காண எளிய முறை எது?',
          options: [
            '240-ஐ 10-ஆல் பெருக்குவது',
            'புள்ளியை இடதுபுறம் ஒரு ஸ்தானம் நகர்த்தி 24 எனக் காண்பது',
            '240-லிருந்து 10-ஐ கழிப்பது',
            '240-ஐ பாதியாக்குவது'
          ],
          correctAnswerIndex: 1,
          explanation: '10% என்பது பத்தில் ஒரு பங்கு என்பதால் ஒரு ஸ்தானம் புள்ளி தள்ளினால் 24 வரும்.',
          conceptTag: 'mental-math-shortcut'
        }
      ]
    },
    sampleGapAnalysis: {
      id: 'demo-gap-math',
      topic: 'Everyday Percentages and Fractions',
      level: 'Beginner',
      scorePercent: 80,
      totalQuestions: 5,
      correctCount: 4,
      overallSummary: 'Excellent practical intuition with percentages. Just review multi-step discount deductions.',
      gapsIdentified: [
        {
          conceptTag: 'discount-calculation',
          identifiedGap: 'Deducting discount savings from the original price',
          remedialExplanation: 'Remember that the calculated percentage discount is what you SAVE, not what you PAY. Always subtract savings from original price.',
          concreteAnalogy: 'If an item is $50 with $10 off, you pay $40, you do not pay $10!'
        }
      ],
      targetedPracticeQuestions: [
        {
          id: 201,
          question: 'If a $60 book has a 10% discount, how much do you save?',
          options: ['$6', '$10', '$54', '$60'],
          correctAnswerIndex: 0,
          explanation: '10% of 60 is $6.',
          conceptTag: 'discount-calculation'
        },
        {
          id: 202,
          question: 'Following the question above, what is the final price of the book?',
          options: ['$6', '$50', '$54', '$66'],
          correctAnswerIndex: 2,
          explanation: '$60 - $6 = $54.',
          conceptTag: 'discount-calculation'
        },
        {
          id: 203,
          question: 'What is 50% of 150?',
          options: ['50', '75', '100', '125'],
          correctAnswerIndex: 1,
          explanation: 'Half of 150 is 75.',
          conceptTag: 'fraction-conversion'
        }
      ],
      adaptiveRecommendation: {
        actionType: 'advance',
        headline: 'Advance to Compound Interest & Ratios',
        reasoning: 'With 80% accuracy, you have solid mastery of foundational percentages and are ready to tackle practical multi-step problem solving.',
        suggestedActivity: 'Explore real-world compound interest and recipe ratio conversions.'
      },
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'english-grammar-voice',
    title: 'Active vs. Passive Voice',
    category: 'English Grammar',
    tag: 'English Grammar',
    summary: 'Write with clarity, understand who performs the action, and know when passive voice is appropriate.',
    explanationEn: {
      topic: 'Active vs. Passive Voice',
      level: 'Beginner',
      language: 'English',
      simpleExplanation: 'In Active Voice, the subject does the action (e.g., "The cat chased the mouse"). In Passive Voice, the subject receives the action (e.g., "The mouse was chased by the cat").',
      detailedExplanation: 'Active voice sentences are direct, energetic, and concise because the grammatical subject is the "doer" of the action. Passive voice is formed using a form of the verb "to be" (is, was, were, been) followed by a past participle (eaten, written, discovered). Passive voice is valuable in scientific reports or when the doer is unknown (e.g., "Penicillin was discovered in 1928"), but active voice makes everyday writing much clearer.',
      realWorldExample: 'Imagine a soccer match. Active: "Messi kicked the ball into the net." Clear, exciting! Passive: "The ball was kicked into the net by Messi." Slower, puts the ball before the superstar.',
      stepByStep: [
        'Step 1: Find the main action verb in the sentence.',
        'Step 2: Ask: "Who or what is performing this action?"',
        'Step 3: If the performer comes before the verb, it is Active Voice.',
        'Step 4: If the receiver comes first and the performer is after "by", it is Passive Voice.'
      ],
      keyTakeaways: [
        'Active: Subject -> Verb -> Object (Direct & engaging).',
        'Passive: Object -> "To be" + Past Participle -> by Subject (Formal & indirect).',
        'Use active voice to make essays and presentations punchy and confident.'
      ],
      followUpQuestions: [
        'Can a sentence be passive without mentioning who did the action at all?',
        'Why do scientific research papers often favor passive voice?',
        'How can you rewrite "Mistakes were made" into active voice?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    explanationTa: {
      topic: 'செய்வினை மற்றும் செயப்பாட்டு வினை (Active vs Passive)',
      level: 'Beginner',
      language: 'Tamil',
      simpleExplanation: 'செய்வினையில் (Active Voice) எழுவாய் செயலை நேரடியாகச் செய்கிறது (எ.கா. "கண்ணன் பந்தை உதைத்தான்"). செயப்பாட்டு வினையில் (Passive) செயல் முன்னிலைப்படுத்தப்படுகிறது ("பந்து கண்ணனால் உதைக்கப்பட்டது").',
      detailedExplanation: 'ஆங்கிலத்தில் Active Voice வாக்கியங்கள் நேரடியானவை மற்றும் தெளிவாகப் புரியக்கூடியவை. Passive Voice வாக்கியங்களில் செயலைச் செய்தவரை விட, நிகழ்ந்த செயலே முன்னிலை பெறுகிறது. அறிவியல் கட்டுரைகளில் அல்லது செயலைச் செய்தவர் யார் என்று தெரியாதபோது Passive Voice பயன்படுத்தப்படுகிறது.',
      realWorldExample: 'கிரிக்கெட் வர்ணனையை நினையுங்கள். செய்வினை: "தோனி சிக்ஸர் அடித்தார்!" (நேரடி உற்சாகம்). செயப்பாட்டு வினை: "சிக்ஸர் தோனியால் அடிக்கப்பட்டது!" (செயல் முன்னிலை).',
      stepByStep: [
        'படி 1: வாக்கியத்தில் உள்ள வினையை (Verb) கண்டறியுங்கள்.',
        'படி 2: "இந்தச் செயலைச் செய்தது யார்?" என்று கேளுங்கள்.',
        'படி 3: செயலைச் செய்தவர் முதலில் வந்தால் அது Active Voice.',
        'படி 4: செயலைப் பெற்ற பொருள் முதலில் வந்தால் அது Passive Voice.'
      ],
      keyTakeaways: [
        'Active Voice வாக்கியங்கள் சுருக்கமாகவும் தெளிவாகவும் இருக்கும்.',
        'Passive Voice-ல் "be" வினை மற்றும் கடந்தகால வினையெச்சம் (Past Participle) வரும்.',
        'ஆங்கிலத்தில் கட்டுரைகள் எழுதும்போது Active Voice பயன்படுத்துவது நல்லது.'
      ],
      followUpQuestions: [
        'செய்தவர் பெயர் இல்லாமலும் Passive வாக்கியம் இருக்க முடியுமா?',
        'அறிவியல் கட்டுரைகளில் Passive Voice ஏன் அதிகம் விரும்பப்படுகிறது?',
        'Passive வாக்கியத்தை Active-ஆக மாற்றுவது எப்படி?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    quizEn: {
      id: 'quiz-english-voice-en',
      topic: 'Active vs. Passive Voice',
      level: 'Beginner',
      language: 'English',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'Identify the voice of this sentence: "The chef cooked a delicious meal."',
          options: ['Passive Voice', 'Active Voice', 'Imperative Voice', 'Subjunctive Voice'],
          correctAnswerIndex: 1,
          explanation: 'The chef (subject/doer) performs the action (cooked) directly upon the meal (object). This is Active Voice.',
          conceptTag: 'active-identification'
        },
        {
          id: 2,
          question: 'Which of the following sentences is written in PASSIVE voice?',
          options: [
            'Ravi sent the email this morning.',
            'The dog barked loudly at midnight.',
            'The new bridge was built by local engineers.',
            'The teacher explained the lesson clearly.'
          ],
          correctAnswerIndex: 2,
          explanation: '"The new bridge was built by local engineers" features the passive auxiliary "was" + past participle "built" + "by local engineers".',
          conceptTag: 'passive-identification'
        },
        {
          id: 3,
          question: 'Rewrite this passive sentence in active voice: "The trophy was won by our school team."',
          options: [
            'Our school team won the trophy.',
            'The trophy won our school team.',
            'Winning the trophy was done by the team.',
            'The school team had been won by trophy.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Putting the doer first ("Our school team") followed by the past tense verb ("won") and the receiver ("the trophy") creates the active sentence.',
          conceptTag: 'voice-conversion'
        },
        {
          id: 4,
          question: 'When is using passive voice considered especially useful and standard?',
          options: [
            'When writing poetry for children',
            'When the performer of the action is unknown or unimportant (e.g. "My bike was stolen")',
            'Whenever you want to use fewer words',
            'In every email sent to colleagues'
          ],
          correctAnswerIndex: 1,
          explanation: 'If you do not know who stole your bike, saying "My bike was stolen" is natural and accurate in passive voice.',
          conceptTag: 'voice-usage-context'
        },
        {
          id: 5,
          question: 'What is the past participle used in this passive sentence: "The letters were delivered yesterday"?',
          options: ['were', 'letters', 'delivered', 'yesterday'],
          correctAnswerIndex: 2,
          explanation: '"Delivered" is the past participle form of the verb "deliver".',
          conceptTag: 'past-participle-form'
        }
      ]
    },
    quizTa: {
      id: 'quiz-english-voice-ta',
      topic: 'செய்வினை மற்றும் செயப்பாட்டு வினை',
      level: 'Beginner',
      language: 'Tamil',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: '"The chef cooked a delicious meal" என்பது எந்த வகை வாக்கியம்?',
          options: ['Passive Voice', 'Active Voice (செய்வினை)', 'Imperative', 'Negative'],
          correctAnswerIndex: 1,
          explanation: 'சமையல்காரர் (The chef) நேரடியாக சமைத்தார் என்பதால் இது Active Voice.',
          conceptTag: 'active-identification'
        },
        {
          id: 2,
          question: 'பின்வருவனவற்றில் எது PASSIVE குரலில் உள்ளது?',
          options: [
            'Ravi sent the email.',
            'The dog barked loudly.',
            'The new bridge was built by local engineers.',
            'The teacher explained the lesson.'
          ],
          correctAnswerIndex: 2,
          explanation: '"was built by..." என்பது செயப்பாட்டு வினையின் அமைப்பாகும்.',
          conceptTag: 'passive-identification'
        },
        {
          id: 3,
          question: '"The trophy was won by our school team" என்பதை Active Voice-ஆக மாற்றுக:',
          options: [
            'Our school team won the trophy.',
            'The trophy won our school team.',
            'Winning the trophy was team.',
            'Team had been trophy.'
          ],
          correctAnswerIndex: 0,
          explanation: 'பள்ளிக் குழுவை முதலில் கொண்டுவந்து "Our school team won the trophy" என்று எழுதுவது சரியானது.',
          conceptTag: 'voice-conversion'
        },
        {
          id: 4,
          question: 'Passive voice எந்த இடத்தில் மிகவும் பயனுள்ளதாக இருக்கும்?',
          options: [
            'கவிதை எழுதும்போது',
            'செயலைச் செய்தவர் யார் என்று தெரியாதபோது (எ.கா. "My bike was stolen")',
            'குறைந்த சொற்களைப் பயன்படுத்தும்போது',
            'நண்பர்களுக்கு மெசேஜ் அனுப்பும்போது'
          ],
          correctAnswerIndex: 1,
          explanation: 'யார் திருடினார்கள் என்று தெரியாதபோது "வண்டி திருடப்பட்டது" என்று சொல்வது பொருத்தமானது.',
          conceptTag: 'voice-usage-context'
        },
        {
          id: 5,
          question: '"The letters were delivered yesterday" வாக்கியத்தில் கடந்தகால வினையெச்சம் (Past Participle) எது?',
          options: ['were', 'letters', 'delivered', 'yesterday'],
          correctAnswerIndex: 2,
          explanation: '"delivered" என்பது past participle வினையாகும்.',
          conceptTag: 'past-participle-form'
        }
      ]
    },
    sampleGapAnalysis: {
      id: 'demo-gap-grammar',
      topic: 'Active vs. Passive Voice',
      level: 'Beginner',
      scorePercent: 100,
      totalQuestions: 5,
      correctCount: 5,
      overallSummary: 'Flawless performance! You accurately distinguish between active and passive structures.',
      gapsIdentified: [],
      targetedPracticeQuestions: [],
      adaptiveRecommendation: {
        actionType: 'advance',
        headline: 'Ready for Advanced Sentence Structure',
        reasoning: 'With 100% mastery, you are ready to study Complex Clauses, Relative Pronouns, and Parallel Structure.',
        suggestedActivity: 'Proceed to study subordinate conjunctions and parallel sentence structure.'
      },
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'python-fundamentals',
    title: 'Python Lists & Dictionaries',
    category: 'Programming',
    tag: 'Python Fundamentals',
    summary: 'Master Python core data collections: ordered lists, key-value mappings, lookups, and iteration.',
    explanationEn: {
      topic: 'Python Lists and Dictionaries',
      level: 'Beginner',
      language: 'English',
      simpleExplanation: 'In Python, a List is like an ordered shopping list, and a Dictionary is like a real dictionary where you look up a word (key) to get its definition (value).',
      detailedExplanation: 'Lists are mutable ordered sequences written with square brackets [1, 2, 3], indexed from 0. Dictionaries are mutable mappings written with curly braces {"name": "Alex", "age": 16}, where every entry has a unique key associated with a value. Looking up a key in a Python dictionary is lightning-fast (O(1) average time) compared to searching an unordered list.',
      realWorldExample: 'List: A playlist of songs in order [song1, song2, song3]. Dictionary: Your phone contacts book where the name "Mom" (key) maps to her phone number "555-1234" (value).',
      stepByStep: [
        'Step 1 (Lists): Create with fruits = ["apple", "banana"]. Access first element with fruits[0].',
        'Step 2 (List Methods): Add items with fruits.append("orange").',
        'Step 3 (Dictionaries): Create with student = {"name": "Kavitha", "grade": "A"}.',
        'Step 4 (Dict Access): Access value using student["name"] or student.get("name").'
      ],
      keyTakeaways: [
        'Lists preserve item order and allow duplicate values.',
        'Dictionaries store key-value pairs; dictionary keys must be unique.',
        'Use lists for ordered collections and dictionaries for structured lookups.'
      ],
      followUpQuestions: [
        'What error happens if you access a dictionary key that does not exist using dict[key] vs dict.get(key)?',
        'How do you iterate through both keys and values in a Python dictionary?',
        'Can a list contain dictionaries, or can a dictionary value be another dictionary?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    explanationTa: {
      topic: 'பைதான் லிஸ்ட்கள் மற்றும் அகராதிகள் (Lists & Dictionaries)',
      level: 'Beginner',
      language: 'Tamil',
      simpleExplanation: 'பைதானில் List என்பது வரிசைப்படுத்தப்பட்ட பட்டியல். Dictionary என்பது ஒரு சொல் (Key) மற்றும் அதன் பொருள் (Value) கொண்ட தொடர்பு அமைப்பு.',
      detailedExplanation: 'லிஸ்ட்கள் சதுர அடைப்புக்குறிக்குள் [ ] எழுதப்படுகின்றன, மேலும் 0-லிருந்து தொடங்குகின்றன. டிக்ஷனரிகள் நெளி அடைப்புக்குறிக்குள் { } "சாவி": "மதிப்பு" வடிவில் சேமிக்கப்படுகின்றன. பெயரைக் கொடுத்து தொலைபேசி எண்ணைப் பெறுவது போல எளிதாகத் தேட டிக்ஷனரி பயன்படுகிறது.',
      realWorldExample: 'லிஸ்ட்: நீங்கள் கடையில் வாங்கும் பொருட்களின் பட்டியல் [அரிசி, பருப்பு, சர்க்கரை]. டிக்ஷனரி: உங்கள் போன் தொடர்புகள் புத்தகம் {"அம்மா": "9876543210"}.',
      stepByStep: [
        'படி 1: colors = ["red", "blue"] என லிஸ்ட் உருவாக்குதல்.',
        'படி 2: colors.append("green") மூலம் புதியதை சேர்த்தல்.',
        'படி 3: user = {"name": "ராமு", "age": 18} என டிக்ஷனரி உருவாக்குதல்.',
        'படி 4: user["name"] மூலம் மதிப்பைத் தேடுதல்.'
      ],
      keyTakeaways: [
        'லிஸ்ட்கள் வரிசையைப் பாதுகாக்கின்றன மற்றும் ஒரே மதிப்பை பல முறை கொண்டிருக்கலாம்.',
        'டிக்ஷனரிகளில் ஒவ்வொரு சாவியும் (Key) தனித்துவமானதாக (Unique) இருக்க வேண்டும்.',
        'விரைவாகத் தேடுவதற்கு டிக்ஷனரி மிகவும் உகந்தது.'
      ],
      followUpQuestions: [
        'டிக்ஷனரியில் இல்லாத ஒரு சாவியைத் தேடினால் என்ன பிழை வரும்?',
        'டிக்ஷனரியின் keys மற்றும் values இரண்டையும் ஒன்றாக லூப் செய்வது எப்படி?',
        'ஒரு லிஸ்ட்டிற்குள் பல டிக்ஷனரிகளை வைக்க முடியுமா?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    quizEn: {
      id: 'quiz-python-en',
      topic: 'Python Lists and Dictionaries',
      level: 'Beginner',
      language: 'English',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'What is the index of the first element in a Python list?',
          options: ['-1', '0', '1', 'Depends on list length'],
          correctAnswerIndex: 1,
          explanation: 'Python uses zero-based indexing, so the first element is always at index 0.',
          conceptTag: 'zero-indexing'
        },
        {
          id: 2,
          question: 'Which method adds a single item to the end of a Python list?',
          options: ['list.push()', 'list.add()', 'list.append()', 'list.insert_end()'],
          correctAnswerIndex: 2,
          explanation: 'The append() method is the standard built-in way to append an item to the end of a list.',
          conceptTag: 'list-methods'
        },
        {
          id: 3,
          question: 'Given d = {"a": 1, "b": 2}, what does d["c"] do?',
          options: [
            'Returns None',
            'Raises a KeyError exception',
            'Adds "c": None to the dictionary',
            'Returns 0'
          ],
          correctAnswerIndex: 1,
          explanation: 'Direct bracket indexing d["c"] raises a KeyError when the key does not exist. (Using d.get("c") returns None safely).',
          conceptTag: 'dict-keyerror'
        },
        {
          id: 4,
          question: 'What brackets are used to declare a Python dictionary?',
          options: ['Square brackets [ ]', 'Parentheses ( )', 'Curly braces { }', 'Angle brackets < >'],
          correctAnswerIndex: 2,
          explanation: 'Curly braces { } are used for dictionaries (and sets).',
          conceptTag: 'syntax-delimiters'
        },
        {
          id: 5,
          question: 'What will len(["apple", "banana", "cherry"]) return?',
          options: ['2', '3', '6', '18'],
          correctAnswerIndex: 1,
          explanation: 'The list contains 3 elements, so len() returns 3.',
          conceptTag: 'length-function'
        }
      ]
    },
    quizTa: {
      id: 'quiz-python-ta',
      topic: 'பைதான் லிஸ்ட்கள் மற்றும் அகராதிகள்',
      level: 'Beginner',
      language: 'Tamil',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'பைதான் லிஸ்ட்டில் முதல் உருப்படியின் குறியீட்டெண் (Index) என்ன?',
          options: ['-1', '0', '1', 'லிஸ்ட்டின் நீளத்தைப் பொறுத்தது'],
          correctAnswerIndex: 1,
          explanation: 'பைதானில் குறியீடுகள் 0-லிருந்தே தொடங்குகின்றன.',
          conceptTag: 'zero-indexing'
        },
        {
          id: 2,
          question: 'லிஸ்ட்டின் இறுதியில் புதிய உருப்படியைச் சேர்க்கும் செயற்கூறு எது?',
          options: ['push()', 'add()', 'append()', 'insert()'],
          correctAnswerIndex: 2,
          explanation: 'append() என்பது லிஸ்ட்டின் இறுதியில் சேர்க்கும் பைதான் செயற்கூறாகும்.',
          conceptTag: 'list-methods'
        },
        {
          id: 3,
          question: 'd = {"a": 1} இருக்கும்போது d["c"] எனத் தேடினால் என்ன நடக்கும்?',
          options: ['None தரும்', 'KeyError பிழை வரும்', 'புதிய சாவி உருவாகும்', '0 தரும்'],
          correctAnswerIndex: 1,
          explanation: 'இல்லாத சாவியை பிராக்கெட் மூலம் அழைத்தால் KeyError எழும்; d.get("c") பயன்படுத்தினால் பாதுகாப்பாக None வரும்.',
          conceptTag: 'dict-keyerror'
        },
        {
          id: 4,
          question: 'டிக்ஷனரி உருவாக்க எந்த அடைப்புக்குறி பயன்படுகிறது?',
          options: ['சதுர அடைப்புக்குறி [ ]', 'வட்ட அடைப்புக்குறி ( )', 'நெளி அடைப்புக்குறி { }', 'அம்பு அடைப்புக்குறி < >'],
          correctAnswerIndex: 2,
          explanation: 'டிக்ஷனரி { } நெளி அடைப்புக்குறியைப் பயன்படுத்துகிறது.',
          conceptTag: 'syntax-delimiters'
        },
        {
          id: 5,
          question: 'len(["a", "b", "c"]) என்ன விடையைத் தரும்?',
          options: ['2', '3', '4', '0'],
          correctAnswerIndex: 1,
          explanation: '3 உருப்படிகள் உள்ளதால் 3 என வரும்.',
          conceptTag: 'length-function'
        }
      ]
    },
    sampleGapAnalysis: {
      id: 'demo-gap-python',
      topic: 'Python Lists and Dictionaries',
      level: 'Beginner',
      scorePercent: 100,
      totalQuestions: 5,
      correctCount: 5,
      overallSummary: 'Superb understanding of Python collection semantics!',
      gapsIdentified: [],
      targetedPracticeQuestions: [],
      adaptiveRecommendation: {
        actionType: 'advance',
        headline: 'Advance to List Comprehensions and Nested Dictionaries',
        reasoning: 'You understand core list indexing and dictionary lookups cleanly. Next, learn Pythonic comprehensions.',
        suggestedActivity: 'Practice writing list comprehensions and JSON parsing in Python.'
      },
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'cs-basics-algorithms',
    title: 'Algorithms & Big-O Time Complexity',
    category: 'Computer Science',
    tag: 'Computer Science Basics',
    summary: 'Understand algorithmic thinking, scalability, constant vs linear time, and performance trade-offs.',
    explanationEn: {
      topic: 'Algorithms and Big-O Time Complexity',
      level: 'Beginner',
      language: 'English',
      simpleExplanation: 'An algorithm is a step-by-step recipe to solve a problem. Big-O notation describes how much longer an algorithm takes as the input gets bigger.',
      detailedExplanation: 'In Computer Science, we do not measure algorithm efficiency in seconds, because faster computers run code faster. Instead, Big-O notation measures the growth rate in the number of operations relative to input size N. O(1) means instant constant time regardless of size (like picking the top card from a deck). O(N) means linear time (like checking every single card in a deck). O(N²) means quadratic time (like comparing every card to every other card).',
      realWorldExample: 'Finding a book in a library: If you know the exact shelf code, you walk straight there: O(1). If the books are unsorted and you must inspect every single book one by one from left to right: O(N). If you use binary search in an alphabetized catalog: O(log N).',
      stepByStep: [
        'Step 1: Identify what "N" represents (e.g. number of items in a list).',
        'Step 2: Count how many operations happen per item in the worst case.',
        'Step 3: Drop constant factors and smaller terms (e.g., 3N + 5 becomes O(N)).',
        'Step 4: Categorize the efficiency (O(1) < O(log N) < O(N) < O(N log N) < O(N²)).'
      ],
      keyTakeaways: [
        'Big-O measures how algorithm runtime scales with input size N.',
        'O(1) is constant time; O(N) scales directly with input size; O(log N) cuts the search in half repeatedly.',
        'Binary search requires sorted data and runs in O(log N) time.'
      ],
      followUpQuestions: [
        'Why does binary search only work if the data is already sorted?',
        'What is space complexity compared to time complexity?',
        'Which Big-O complexity represents a nested loop iterating over the same list twice?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    explanationTa: {
      topic: 'அல்காரிதம்கள் மற்றும் பிக்-ஓ (Big-O) கால சிக்கலான தன்மை',
      level: 'Beginner',
      language: 'Tamil',
      simpleExplanation: 'அல்காரிதம் என்பது ஒரு சிக்கலைத் தீர்ப்பதற்கான படிப்படியான செய்முறை. Big-O என்பது உள்ளீட்டு அளவு (Input) அதிகரிக்கும் போது கணினி எடுக்கும் நேரத்தின் வளர்ச்சியை அளவிடுகிறது.',
      detailedExplanation: 'கணினி அறிவியலில் வேகத்தை வினாடிகளில் அளவிடுவதில்லை, ஏனெனில் வெவ்வேறு கணினிகள் வெவ்வேறு வேகம் கொண்டவை. மாறாக, செயல்பாடுகளின் எண்ணிக்கையை அளவிட Big-O பயன்படுகிறது. O(1) என்பது உடனடி நேரம். O(N) என்பது உள்ளீட்டின் எண்ணிக்கைக்கு ஏற்ப நேர்கோட்டில் வளரும் நேரம்.',
      realWorldExample: 'நூலகத்தில் ஒரு புத்தகத்தைத் தேடுவது: உங்களுக்கு அலமாரி எண் தெரிந்தால் உடனடியாக எடுப்பது O(1). வரிசைப்படுத்தப்படாத நூலகத்தில் ஒவ்வொரு புத்தகமாகப் பார்த்துத் தேடுவது O(N).',
      stepByStep: [
        'படி 1: உள்ளீட்டு அளவு N என்னவென்று அறியுங்கள் (எ.கா. பட்டியலில் உள்ள உருப்படிகள்).',
        'படி 2: எத்தனை முறை செயல் மீண்டும் நடக்கிறது என்று கணக்கிடுங்கள்.',
        'படி 3: மாறிலிகளை (Constants) விட்டுவிட்டு முதன்மை வேகத்தைக் குறியிடுங்கள்.',
        'படி 4: O(1), O(log N), O(N), O(N²) என வகைப்படுத்துங்கள்.'
      ],
      keyTakeaways: [
        'Big-O என்பது நிரலின் அளவிடும் திறனை (Scalability) குறிக்கிறது.',
        'O(1) மிக வேகமானது, O(N) நேரடியானது, O(N²) பெரிய உள்ளீடுகளுக்கு மெதுவானது.',
        'Binary Search எப்போதும் வரிசைப்படுத்தப்பட்ட தரவில் மட்டுமே இயங்கும்.'
      ],
      followUpQuestions: [
        'Binary search ஏன் வரிசைப்படுத்தப்பட்ட தரவில் மட்டுமே இயங்கும்?',
        'Time Complexity மற்றும் Space Complexity வேறுபாடு என்ன?',
        'இரண்டு லூப்புகள் ஒன்றிற்குள் ஒன்று இருந்தால் அதன் Big-O என்ன?'
      ],
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    },
    quizEn: {
      id: 'quiz-cs-algorithms-en',
      topic: 'Algorithms and Big-O Time Complexity',
      level: 'Beginner',
      language: 'English',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'What does O(1) time complexity mean?',
          options: [
            'The code takes exactly 1 second to run',
            'Execution time remains constant regardless of input size',
            'The code can only run on 1 computer processor',
            'The algorithm loops through the input once'
          ],
          correctAnswerIndex: 1,
          explanation: 'O(1) means constant time: whether input size N is 10 or 10,000,000, execution takes the same fixed amount of time.',
          conceptTag: 'constant-time'
        },
        {
          id: 2,
          question: 'If an algorithm contains a single for-loop that visits each of N items once, what is its time complexity?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
          correctAnswerIndex: 2,
          explanation: 'Visiting each element once takes linear time proportional to N, denoted as O(N).',
          conceptTag: 'linear-time'
        },
        {
          id: 3,
          question: 'Which search algorithm cuts the search space in half at every step and runs in O(log N) time?',
          options: ['Linear Search', 'Binary Search', 'Bubble Search', 'Random Search'],
          correctAnswerIndex: 1,
          explanation: 'Binary search splits the sorted array in half repeatedly, running in logarithmic time O(log N).',
          conceptTag: 'binary-search'
        },
        {
          id: 4,
          question: 'What is the time complexity of two nested loops where each iterates from 0 to N?',
          options: ['O(2N)', 'O(N + 2)', 'O(N²)', 'O(N!)'],
          correctAnswerIndex: 2,
          explanation: 'An outer loop of N and inner loop of N results in N * N = N² total operations, which is quadratic time O(N²).',
          conceptTag: 'quadratic-complexity'
        },
        {
          id: 5,
          question: 'Why do computer scientists use Big-O notation instead of measuring milliseconds on a stopwatch?',
          options: [
            'Stopwatches are inaccurate',
            'Big-O isolates the algorithm logic from hardware differences',
            'Big-O only applies to quantum computers',
            'Milliseconds change when running on batteries'
          ],
          correctAnswerIndex: 1,
          explanation: 'A modern supercomputer runs any code faster than a smartphone. Big-O isolates the fundamental scalability of the algorithm itself independent of processor clock speed.',
          conceptTag: 'algorithmic-scalability'
        }
      ]
    },
    quizTa: {
      id: 'quiz-cs-algorithms-ta',
      topic: 'அல்காரிதம்கள் மற்றும் பிக்-ஓ (Big-O)',
      level: 'Beginner',
      language: 'Tamil',
      source: 'offline-toolkit',
      questions: [
        {
          id: 1,
          question: 'O(1) கால சிக்கல் என்றால் என்ன?',
          options: [
            'சரியாக ஒரு வினாடி எடுக்கும்',
            'உள்ளீட்டு அளவு எவ்வளவாக இருந்தாலும் நேரம் மாறாமல் நிலையாக இருக்கும்',
            'ஒரு கணினியில் மட்டுமே இயங்கும்',
            'ஒரு முறை மட்டுமே சுழலும்'
          ],
          correctAnswerIndex: 1,
          explanation: 'O(1) என்பது மாறிலி நேரம்; உள்ளீடு 10 ஆக இருந்தாலும் கோடி ஆக இருந்தாலும் ஒரே நேரம் எடுக்கும்.',
          conceptTag: 'constant-time'
        },
        {
          id: 2,
          question: 'N உருப்படிகளை ஒரு லூப் மூலம் ஒவ்வொரு முறையும் பார்த்தால் அதன் வேகம் என்ன?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
          correctAnswerIndex: 2,
          explanation: 'ஒவ்வொரு உருப்படியையும் பார்வையிடுவது நேர்கோட்டு காலமான O(N) ஆகும்.',
          conceptTag: 'linear-time'
        },
        {
          id: 3,
          question: 'ஒவ்வொரு படியிலும் தேடல் பகுதியை பாதியாகக் குறைத்து O(log N) வேகத்தில் இயங்கும் தேடல் எது?',
          options: ['Linear Search', 'Binary Search', 'Random Search', 'Quick Search'],
          correctAnswerIndex: 1,
          explanation: 'Binary Search வரிசைப்படுத்தப்பட்ட தரவை பாதியாகப் பிரித்து O(log N) வேகத்தில் தேடுகிறது.',
          conceptTag: 'binary-search'
        },
        {
          id: 4,
          question: 'ஒன்றிற்குள் ஒன்றாக இருக்கும் இரண்டு N-லூப்புகளின் கால அளவு என்ன?',
          options: ['O(2N)', 'O(N + 2)', 'O(N²)', 'O(N!)'],
          correctAnswerIndex: 2,
          explanation: 'N * N = N² என்பதால் அது O(N²) இருபடி நேரமாகும்.',
          conceptTag: 'quadratic-complexity'
        },
        {
          id: 5,
          question: 'வினாடிகளில் அளவிடாமல் Big-O பயன்படுத்துவது ஏன்?',
          options: [
            'வினாடி கடிகாரங்கள் துல்லியமில்லை',
            'கணினியின் வன்பொருள் (Hardware) வேறுபாடுகளைத் தவிர்த்து அல்காரிதத்தின் தூய செயல்திறனை அளவிட',
            'Big-O பேட்டரி அளவைச் சார்ந்தது',
            'மின்னஞ்சல் அனுப்ப தேவைப்படுகிறது'
          ],
          correctAnswerIndex: 1,
          explanation: 'ஹார்டுவேர் வேக வேறுபாடுகளைத் தாண்டி அல்காரிதத்தின் உண்மையான திறனை அறிய இது உதவுகிறது.',
          conceptTag: 'algorithmic-scalability'
        }
      ]
    },
    sampleGapAnalysis: {
      id: 'demo-gap-cs',
      topic: 'Algorithms and Big-O Time Complexity',
      level: 'Beginner',
      scorePercent: 80,
      totalQuestions: 5,
      correctCount: 4,
      overallSummary: 'Strong conceptual grasp of algorithmic scalability and asymptotic analysis.',
      gapsIdentified: [
        {
          conceptTag: 'quadratic-complexity',
          identifiedGap: 'Visualizing nested loops as quadratic operations (N * N)',
          remedialExplanation: 'When loop B runs entirely inside loop A, you multiply their iterations, creating quadratic N² growth.',
          concreteAnalogy: 'If a school has N classes and each class has N students, counting every student in every class means counting N × N students.'
        }
      ],
      targetedPracticeQuestions: [
        {
          id: 301,
          question: 'If N = 10, how many operations happen in an O(N²) algorithm?',
          options: ['20', '100', '1,000', '10'],
          correctAnswerIndex: 1,
          explanation: '10 squared is 10 * 10 = 100.',
          conceptTag: 'quadratic-complexity'
        },
        {
          id: 302,
          question: 'Which complexity grows the SLOWEST as N gets huge?',
          options: ['O(N²)', 'O(N)', 'O(1)', 'O(N!)'],
          correctAnswerIndex: 2,
          explanation: 'O(1) never grows at all; it stays completely flat.',
          conceptTag: 'constant-time'
        },
        {
          id: 303,
          question: 'Does Binary Search require the input to be sorted beforehand?',
          options: ['Yes, always', 'No, never', 'Only for negative numbers', 'Only for strings'],
          correctAnswerIndex: 0,
          explanation: 'Binary Search strictly requires the elements to be in sorted order to decide which half to discard.',
          conceptTag: 'binary-search'
        }
      ],
      adaptiveRecommendation: {
        actionType: 'advance',
        headline: 'Explore Sorting Algorithms (Merge Sort vs Quick Sort)',
        reasoning: 'With 80% accuracy in Big-O basics, you are prepared to analyze practical sorting algorithms running in O(N log N) time.',
        suggestedActivity: 'Compare divide-and-conquer strategies in Merge Sort.'
      },
      source: 'offline-toolkit',
      timestamp: new Date().toISOString()
    }
  }
];
