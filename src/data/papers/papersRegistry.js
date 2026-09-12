// Centralized Registry of all UGC NET Examination Papers and Practice Sets
import ugcNet2025Mock from './ugc-net-2025-mock.json';
import ugcNetJune2025 from './ugc-net-june-2025.json';
import ugcNetJune2024Reexam from './ugc-net-june-2024-reexam.json';
import ugcNetJune2024Cancelled from './ugc-net-june-2024-cancelled.json';
import ugcNetDec2023 from './ugc-net-dec-2023.json';
import ugcNetJune2023 from './ugc-net-june-2023.json';
import ugcNetDec2022Shift1 from './ugc-net-dec-2022-shift1.json';
import ugcNetDec2022Shift2 from './ugc-net-dec-2022-shift2.json';
import ugcNetSep2022 from './ugc-net-sep-2022.json';
import ugcNetNov2021 from './ugc-net-nov-2021.json';
import ugcNetNov2020 from './ugc-net-nov-2020.json';

// Attach source paper name to each question so students know its origin
const attachPaperSource = (questions, paperTitle) => {
  return questions.map((q, idx) => ({
    ...q,
    sourcePaper: q.paper || paperTitle,
    uniqueId: `${paperTitle}-${idx}`
  }));
};

export const PAPERS = [
  {
    id: 'ugc-net-2025-mock',
    title: 'UGC NET 2025 Mock Test Series',
    shortTitle: '2025 Mock Test',
    year: '2025',
    session: '2025 Special',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'RECOMMENDED',
    badgeVariant: 'primary',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNet2025Mock.length,
    totalMarks: ugcNet2025Mock.length * 2,
    durationMinutes: 120,
    description: 'Comprehensive 100-question mock examination mapped to the latest UGC NET NTA syllabus with verified mathematical and algorithmic explanations.',
    topics: ['All 10 Syllabus Units', 'OS', 'DBMS', 'Discrete Math', 'Networks', 'AI', 'TOC'],
    questions: attachPaperSource(ugcNet2025Mock, 'UGC NET 2025 Mock')
  },
  {
    id: 'ugc-net-nov-2021',
    title: 'UGC NET Nov 2021 Paper II',
    shortTitle: 'Nov 2021 Official',
    year: '2021',
    session: 'Nov 2021',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'NEW • OFFICIAL PYQ',
    badgeVariant: 'success',
    isNew: true,
    category: 'full',
    totalQuestions: ugcNetNov2021.length,
    totalMarks: ugcNetNov2021.length * 2,
    durationMinutes: 120,
    description: 'Official NTA question paper from November 2021 covering full 10 units including C/C++, Java recursion, Software Engineering, AI, and TOC.',
    topics: ['Full 10 Units', 'Programming Languages', 'Software Engg', 'AI', 'Networks'],
    questions: attachPaperSource(ugcNetNov2021, 'UGC NET Nov 2021')
  },
  {
    id: 'ugc-net-sep-2022',
    title: 'UGC NET Sep 2022 Paper II',
    shortTitle: 'Sep 2022 Official',
    year: '2022',
    session: 'Sep 2022',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'NEW • OFFICIAL PYQ',
    badgeVariant: 'success',
    isNew: true,
    category: 'full',
    totalQuestions: ugcNetSep2022.length,
    totalMarks: ugcNetSep2022.length * 2,
    durationMinutes: 120,
    description: 'Official September 2022 Computer Science paper with detailed step-by-step solutions for equivalence relations, microprocessor bus, and 2D transformations.',
    topics: ['Full 10 Units', 'Discrete Structures', 'Architecture', 'Computer Graphics', 'DBMS'],
    questions: attachPaperSource(ugcNetSep2022, 'UGC NET Sep 2022')
  },
  {
    id: 'ugc-net-nov-2020',
    title: 'UGC NET Nov 2020 Paper II',
    shortTitle: 'Nov 2020 Official',
    year: '2020',
    session: 'Nov 2020',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'NEW • OFFICIAL PYQ',
    badgeVariant: 'success',
    isNew: true,
    category: 'full',
    totalQuestions: ugcNetNov2020.length,
    totalMarks: ugcNetNov2020.length * 2,
    durationMinutes: 120,
    description: 'Authentic November 2020 official question set with pipeline delay analysis, combinatorics, 2D homogeneous scaling, and automata theory.',
    topics: ['Full 10 Units', 'Optimization', 'Pipelining', 'Theory of Computation', 'OS'],
    questions: attachPaperSource(ugcNetNov2020, 'UGC NET Nov 2020')
  },
  {
    id: 'ugc-net-june-2024-reexam',
    title: 'UGC NET June 2024 (Re-Exam) Paper II',
    shortTitle: 'June 2024 Re-Exam',
    year: '2024',
    session: 'June 2024 Re-Exam',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'OFFICIAL PYQ',
    badgeVariant: 'info',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetJune2024Reexam.length,
    totalMarks: ugcNetJune2024Reexam.length * 2,
    durationMinutes: 120,
    description: 'Official Re-Examination paper conducted by NTA in August/September 2024 following the June session reorganization.',
    topics: ['Full 10 Units', 'Latest Trend Questions', 'System Software', 'AI & ML'],
    questions: attachPaperSource(ugcNetJune2024Reexam, 'UGC NET June 2024 Re-Exam')
  },
  {
    id: 'ugc-net-june-2024-cancelled',
    title: 'UGC NET June 2024 (Session 1) Paper II',
    shortTitle: 'June 2024 (S1)',
    year: '2024',
    session: 'June 2024 Session 1',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'OFFICIAL PYQ',
    badgeVariant: 'info',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetJune2024Cancelled.length,
    totalMarks: ugcNetJune2024Cancelled.length * 2,
    durationMinutes: 120,
    description: 'First sitting official paper from the June 2024 cycle. Excellent resource for testing latest curriculum pattern questions.',
    topics: ['Full 10 Units', 'Compilers', 'Computer Networks', 'Discrete Mathematics'],
    questions: attachPaperSource(ugcNetJune2024Cancelled, 'UGC NET June 2024 (S1)')
  },
  {
    id: 'ugc-net-june-2025',
    title: 'UGC NET June 2025 Full Mock Paper',
    shortTitle: 'June 2025 Mock',
    year: '2025',
    session: 'June 2025',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'PREDICTED PAPER',
    badgeVariant: 'purple',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetJune2025.length,
    totalMarks: ugcNetJune2025.length * 2,
    durationMinutes: 120,
    description: 'High-probability mock paper designed for upcoming June 2025 aspirants, highlighting modern graph theory, cloud, and neural networks.',
    topics: ['Full 10 Units', 'High Yield 2025 Pattern', 'Modern AI', 'Advanced Data Structures'],
    questions: attachPaperSource(ugcNetJune2025, 'UGC NET June 2025 Mock')
  },
  {
    id: 'ugc-net-dec-2023',
    title: 'UGC NET Dec 2023 Paper II',
    shortTitle: 'Dec 2023 Official',
    year: '2023',
    session: 'Dec 2023',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'OFFICIAL PYQ',
    badgeVariant: 'info',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetDec2023.length,
    totalMarks: ugcNetDec2023.length * 2,
    durationMinutes: 120,
    description: 'Official December 2023 examination paper with complete answer key and rationale for all 100 questions.',
    topics: ['Full 10 Units', 'Algorithms', 'Operating Systems', 'Software Engineering'],
    questions: attachPaperSource(ugcNetDec2023, 'UGC NET Dec 2023')
  },
  {
    id: 'ugc-net-june-2023',
    title: 'UGC NET June 2023 Paper II',
    shortTitle: 'June 2023 Official',
    year: '2023',
    session: 'June 2023',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'OFFICIAL PYQ',
    badgeVariant: 'info',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetJune2023.length,
    totalMarks: ugcNetJune2023.length * 2,
    durationMinutes: 120,
    description: 'Complete June 2023 official paper with balanced coverage across all computer science domains.',
    topics: ['Full 10 Units', 'Computer Architecture', 'Data Communications', 'TOC'],
    questions: attachPaperSource(ugcNetJune2023, 'UGC NET June 2023')
  },
  {
    id: 'ugc-net-dec-2022-shift1',
    title: 'UGC NET Dec 2022 (Shift 1) Paper II',
    shortTitle: 'Dec 2022 Shift 1',
    year: '2022',
    session: 'Dec 2022 Shift 1',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'OFFICIAL PYQ',
    badgeVariant: 'info',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetDec2022Shift1.length,
    totalMarks: ugcNetDec2022Shift1.length * 2,
    durationMinutes: 120,
    description: 'Shift 1 official paper from the December 2022 merged cycle with deep mathematical problems worked out.',
    topics: ['Full 10 Units', 'Shift 1 PYQ', 'Optimization', 'Algorithms'],
    questions: attachPaperSource(ugcNetDec2022Shift1, 'UGC NET Dec 2022 Shift 1')
  },
  {
    id: 'ugc-net-dec-2022-shift2',
    title: 'UGC NET Dec 2022 (Shift 2) Paper II',
    shortTitle: 'Dec 2022 Shift 2',
    year: '2022',
    session: 'Dec 2022 Shift 2',
    subject: 'Computer Science & Applications (Paper II)',
    badge: 'OFFICIAL PYQ',
    badgeVariant: 'info',
    isNew: false,
    category: 'full',
    totalQuestions: ugcNetDec2022Shift2.length,
    totalMarks: ugcNetDec2022Shift2.length * 2,
    durationMinutes: 120,
    description: 'Shift 2 official paper from the December 2022 cycle featuring advanced database and network protocol questions.',
    topics: ['Full 10 Units', 'Shift 2 PYQ', 'Database Management', 'Networking Protocols'],
    questions: attachPaperSource(ugcNetDec2022Shift2, 'UGC NET Dec 2022 Shift 2')
  }
];

// Official 10 Units Definition for Topic-wise Practice
export const TOPIC_UNITS = [
  {
    unitNumber: 1,
    unit: 'Unit 1: Discrete Structures and Optimization',
    shortName: 'Discrete Structures & Optimization',
    description: 'Mathematical Logic, Set Theory, Combinatorics, Graph Theory, and Linear Programming.'
  },
  {
    unitNumber: 2,
    unit: 'Unit 2: Computer System Architecture',
    shortName: 'Computer System Architecture',
    description: 'Digital Logic, Instruction Formats, Addressing Modes, Memory Hierarchy, and Pipelining.'
  },
  {
    unitNumber: 3,
    unit: 'Unit 3: Programming Languages and Computer Graphics',
    shortName: 'Programming Languages & Graphics',
    description: 'C/C++, OOPs, Java, 2D/3D Transformations, Viewing, and Clipping Algorithms.'
  },
  {
    unitNumber: 4,
    unit: 'Unit 4: Database Management Systems',
    shortName: 'Database Management Systems (DBMS)',
    description: 'ER Model, Relational Algebra, SQL, Normalization, Transactions, and Concurrency Control.'
  },
  {
    unitNumber: 5,
    unit: 'Unit 5: System Software and Operating System',
    shortName: 'System Software & Operating System',
    description: 'Process Scheduling, Deadlocks, Memory Management, Virtual Memory, and Unix Commands.'
  },
  {
    unitNumber: 6,
    unit: 'Unit 6: Software Engineering',
    shortName: 'Software Engineering',
    description: 'SDLC Models, Requirements Engg, Software Design, Metrics, Testing, and Maintenance.'
  },
  {
    unitNumber: 7,
    unit: 'Unit 7: Data Structures and Algorithms',
    shortName: 'Data Structures & Algorithms',
    description: 'Trees, Graphs, Sorting, Hashing, Divide & Conquer, Dynamic Programming, and NP-Hard.'
  },
  {
    unitNumber: 8,
    unit: 'Unit 8: Theory of Computation and Compilers',
    shortName: 'Theory of Computation & Compilers',
    description: 'Finite Automata, Regular Languages, CFG, Turing Machines, Lexical Analysis, and Parsers.'
  },
  {
    unitNumber: 9,
    unit: 'Unit 9: Data Communication and Computer Networks',
    shortName: 'Data Communication & Networks',
    description: 'OSI/TCP Reference Models, IP Addressing, Routing Algorithms, TCP/UDP, and Network Security.'
  },
  {
    unitNumber: 10,
    unit: 'Unit 10: Artificial Intelligence (AI)',
    shortName: 'Artificial Intelligence (AI)',
    description: 'Heuristic Search (A*, AO*), Knowledge Representation, Fuzzy Logic, Genetic Algorithms, and ANN.'
  }
];

// Helper: Get all questions across all 11 papers
export const getAllPaperQuestions = () => {
  const all = [];
  PAPERS.forEach((p) => {
    p.questions.forEach((q) => {
      all.push(q);
    });
  });
  return all;
};

// Helper: Get questions for a specific unit gathered from ALL papers
export const getQuestionsByUnit = (unitName) => {
  const all = getAllPaperQuestions();
  return all.filter((q) => q.unit === unitName);
};

// Helper: Get unit question count
export const getUnitQuestionCount = (unitName) => {
  return getQuestionsByUnit(unitName).length;
};

export const getAllPapers = () => PAPERS;

export const getPaperById = (id) => PAPERS.find((p) => p.id === id) || PAPERS[0];

export const getDefaultPaper = () => PAPERS[0];
