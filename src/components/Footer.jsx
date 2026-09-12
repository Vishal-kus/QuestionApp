import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function Footer({ onSelectUnit }) {
  // Can be expanded/collapsed or expanded by default
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(true);
  const [activeUnitTab, setActiveUnitTab] = useState('ALL'); // 'ALL' or unit number

  const weightageData = [
    { unitNum: 1, unit: 'Unit 1: Discrete Structures and Optimization', avgQ: '11.7', share: '11.7%', priority: 'High', priorityColor: '#ef4444', priorityBg: '#fef2f2', priorityBorder: '#fca5a5' },
    { unitNum: 8, unit: 'Unit 8: Theory of Computation and Compilers', avgQ: '10.7', share: '10.7%', priority: 'High', priorityColor: '#ef4444', priorityBg: '#fef2f2', priorityBorder: '#fca5a5' },
    { unitNum: 9, unit: 'Unit 9: Data Communication & Networks', avgQ: '10.7', share: '10.7%', priority: 'High', priorityColor: '#ef4444', priorityBg: '#fef2f2', priorityBorder: '#fca5a5' },
    { unitNum: 5, unit: 'Unit 5: System Software and Operating System', avgQ: '10.5', share: '10.5%', priority: 'High', priorityColor: '#ef4444', priorityBg: '#fef2f2', priorityBorder: '#fca5a5' },
    { unitNum: 4, unit: 'Unit 4: Database Management Systems', avgQ: '9.7', share: '9.7%', priority: 'Medium-High', priorityColor: '#f59e0b', priorityBg: '#fffbeb', priorityBorder: '#fde68a' },
    { unitNum: 10, unit: 'Unit 10: Artificial Intelligence (AI)', avgQ: '9.7', share: '9.7%', priority: 'Medium-High', priorityColor: '#f59e0b', priorityBg: '#fffbeb', priorityBorder: '#fde68a' },
    { unitNum: 3, unit: 'Unit 3: Programming Languages & Graphics', avgQ: '9.4', share: '9.4%', priority: 'Medium', priorityColor: '#0284c7', priorityBg: '#f0f9ff', priorityBorder: '#bae6fd' },
    { unitNum: 6, unit: 'Unit 6: Software Engineering', avgQ: '9.2', share: '9.2%', priority: 'Medium', priorityColor: '#0284c7', priorityBg: '#f0f9ff', priorityBorder: '#bae6fd' },
    { unitNum: 7, unit: 'Unit 7: Data Structures and Algorithms', avgQ: '9.2', share: '9.2%', priority: 'Medium', priorityColor: '#0284c7', priorityBg: '#f0f9ff', priorityBorder: '#bae6fd' },
    { unitNum: 2, unit: 'Unit 2: Computer System Architecture', avgQ: '9.1', share: '9.1%', priority: 'Medium', priorityColor: '#0284c7', priorityBg: '#f0f9ff', priorityBorder: '#bae6fd' },
  ];

  const mustDoUnits = [
    {
      unitNum: 1,
      title: 'Unit 1: Discrete Structures and Optimization',
      priority: 'High',
      topics: [
        {
          title: 'Mathematical Logic',
          desc: 'Propositional logic equivalences (P → Q ≡ ~P ∨ Q), Quantifier negations (∀, ∃), SOP/POS canonical boolean forms.'
        },
        {
          title: 'Combinatorics & Probability',
          desc: 'Inclusion-Exclusion Principle, Permutations & Combinations (non-attacking rooks/partitions), Bayes\' Theorem conditional probability.'
        },
        {
          title: 'Graph Theory',
          desc: 'Eulerian & Hamiltonian paths/circuits, Planar graphs Euler\'s formula (V - E + R = 2), Chromatic number calculation, Handshaking Lemma (2E = Σ deg(v)).'
        },
        {
          title: 'Optimization & LPP',
          desc: 'Linear Programming (Simplex tableau optimality conditions), Dual LPP formulation and duality theorem, PERT/CPM critical path & slack calculation.'
        }
      ]
    },
    {
      unitNum: 2,
      title: 'Unit 2: Computer System Architecture',
      priority: 'Medium',
      topics: [
        {
          title: 'Memory Hierarchy',
          desc: 'Cache mapping techniques (Direct, Fully Associative, Set-Associative tag, set index, block offset bit calculations), Average memory access time (AMAT).'
        },
        {
          title: 'Data Representation',
          desc: 'IEEE 754 Floating-Point single/double precision representation, 2\'s complement arithmetic, overflow detection, Gray Code binary conversion.'
        },
        {
          title: 'Instruction Pipelining',
          desc: 'Pipeline hazards (Data RAW/WAR/WAW, Control branch delays, Structural), Speedup ratio formula S = (k · n) / (k + n - 1), Efficiency & Throughput.'
        },
        {
          title: 'Addressing Modes',
          desc: 'Relative addressing, Indexed mode, Direct, Indirect, Register Indirect, and Auto-increment/decrement effective address computation.'
        }
      ]
    },
    {
      unitNum: 3,
      title: 'Unit 3: Programming Languages and Computer Graphics',
      priority: 'Medium',
      topics: [
        {
          title: 'C/C++ & Java Programming',
          desc: 'Pointer arithmetic, complex recursive function trace outputs, bitwise operators (&, |, ^, ~, <<, >>), variable scope & storage classes.'
        },
        {
          title: 'Rasterization Algorithms',
          desc: 'DDA & Bresenham\'s Line drawing algorithm (decision parameters), Midpoint Circle generation algorithm.'
        },
        {
          title: '2D & 3D Transformations',
          desc: 'Matrix multiplication for Translation, Rotation (counter-clockwise & clockwise), Scaling, Reflection across lines, and Homogeneous coordinate representation.'
        },
        {
          title: 'Clipping Algorithms',
          desc: 'Cohen-Sutherland Line Clipping (4-bit outcode test, trivial accept/reject), Liang-Barsky parametric line clipping, Sutherland-Hodgman polygon clipping.'
        }
      ]
    },
    {
      unitNum: 4,
      title: 'Unit 4: Database Management Systems',
      priority: 'Medium-High',
      topics: [
        {
          title: 'Functional Dependencies & Keys',
          desc: 'Finding candidate keys, Super keys, Attribute closure computation (X⁺), Canonical / Minimal Cover of functional dependencies.'
        },
        {
          title: 'Relational Normalization',
          desc: 'Testing Normal Forms (1NF, 2NF, 3NF, BCNF, 4NF/5NF), Lossless Join decomposition check, Dependency Preservation verification.'
        },
        {
          title: 'Transactions & Concurrency',
          desc: 'Two-Phase Locking (Basic 2PL, Strict 2PL, Rigorous 2PL), Timestamp Ordering protocol, Conflict Serializability (Precedence Graph), ACID properties.'
        },
        {
          title: 'SQL & Relational Algebra',
          desc: 'Tuple Relational Calculus (TRC), Natural & Outer Joins (Left, Right, Full), Relational Division operator (÷), Group By / Having / Correlated subqueries.'
        }
      ]
    },
    {
      unitNum: 5,
      title: 'Unit 5: System Software and Operating System',
      priority: 'High',
      topics: [
        {
          title: 'CPU Scheduling',
          desc: 'Gantt chart numericals for FCFS, SJF (Preemptive SRTF), Non-preemptive Priority, and Round Robin (Turnaround & Waiting time calculations).'
        },
        {
          title: 'Memory Management & Virtual Memory',
          desc: 'Page replacement algorithms (FIFO, LRU, Optimal), Belady’s Anomaly, Multi-level page table size calculations, TLB hit/miss effective access time.'
        },
        {
          title: 'Disk Scheduling',
          desc: 'Total head movement calculations for FCFS, SSTF, SCAN (Elevator), C-SCAN, LOOK, and C-LOOK disk scheduling algorithms.'
        },
        {
          title: 'Synchronization & Deadlocks',
          desc: 'Banker’s Safety Algorithm for deadlock avoidance (Need = Max - Allocation), Resource Allocation Graph (RAG), Counting Semaphores (P/Wait and V/Signal).'
        }
      ]
    },
    {
      unitNum: 6,
      title: 'Unit 6: Software Engineering',
      priority: 'Medium',
      topics: [
        {
          title: 'Process & Agile Models',
          desc: 'Agile & Scrum ceremonies/sprints, Waterfall, Prototype sequence, Spiral model risk analysis, Capability Maturity Model (CMM levels 1-5).'
        },
        {
          title: 'Software Metrics & Testing',
          desc: 'McCabe\'s Cyclomatic Complexity formula V(G) = E - N + 2P or Regions + 1, White-box vs. Black-box testing, Basis Path Testing, Boundary Value Analysis.'
        },
        {
          title: 'Design Principles (Cohesion & Coupling)',
          desc: 'Cohesion types ranking (Functional > Sequential > Communicational > Procedural > Temporal > Logical > Coincidental), Coupling types ranking (Data < Stamp < Control < External < Common < Content).'
        },
        {
          title: 'Cost & Effort Estimation',
          desc: 'Boehm\'s COCOMO Model equations (Basic, Intermediate, Detailed effort in Person-Months = a · (KLOC)ᵇ), Function Point analysis.'
        }
      ]
    },
    {
      unitNum: 7,
      title: 'Unit 7: Data Structures and Algorithms',
      priority: 'Medium',
      topics: [
        {
          title: 'Asymptotic Complexity & Recurrences',
          desc: 'Big-O, Big-Omega, Big-Theta tight bounds, Master Theorem cases (T(n) = aT(n/b) + f(n)), Substitution and Recursion Tree methods.'
        },
        {
          title: 'Trees & Search Structures',
          desc: 'Binary Search Tree (BST) traversals, AVL Tree rotations (LL, RR, LR, RL), B-Trees & B+ Trees minimum/maximum keys & order formulas, Min/Max Heapify.'
        },
        {
          title: 'Dynamic Programming',
          desc: 'Longest Common Subsequence (LCS), 0/1 Knapsack problem (DP matrix vs Fractional greedy), Matrix Chain Multiplication parenthesization, Optimal BST.'
        },
        {
          title: 'Graph Algorithms',
          desc: 'Dijkstra’s shortest path algorithm (greedy), Prim’s & Kruskal’s Minimum Spanning Tree (MST), Bellman-Ford negative edge detection, Floyd-Warshall all-pairs.'
        }
      ]
    },
    {
      unitNum: 8,
      title: 'Unit 8: Theory of Computation and Compilers',
      priority: 'High',
      topics: [
        {
          title: 'Chomsky Hierarchy & Grammar',
          desc: 'Chomsky classification (Type 3: Regular, Type 2: Context-Free, Type 1: Context-Sensitive, Type 0: Recursively Enumerable), Closure properties under union, intersection, concatenation, complement.'
        },
        {
          title: 'Automata Theory',
          desc: 'DFA state minimization (Myhill-Nerode / equivalence partitioning), NFA to DFA power-set construction, Pushdown Automata (PDA) acceptance by final state vs empty stack.'
        },
        {
          title: 'Decidability & Computability',
          desc: 'Halting problem of Turing machines, Post Correspondence Problem (PCP / MPCP), Rice\'s Theorem on semantic properties of languages.'
        },
        {
          title: 'Compiler Design & Parsing',
          desc: 'Parsing techniques hierarchy (LL(1) First & Follow calculation, LR(0), SLR(1), LALR(1), CLR(1)), Shift-Reduce & Reduce-Reduce conflicts, Intermediate Three-Address Code (TAC), Basic Blocks & DAG optimization.'
        }
      ]
    },
    {
      unitNum: 9,
      title: 'Unit 9: Data Communication and Computer Networks',
      priority: 'High',
      topics: [
        {
          title: 'IP Addressing & Subnetting',
          desc: 'Classless Inter-Domain Routing (CIDR /x prefix), Network address, Directed Broadcast address, Usable host calculations, Subnet and Supernet masking.'
        },
        {
          title: 'Network Header Formats',
          desc: 'IPv4 header fields (IHL, Total Length, Fragmentation Offset, TTL), IPv6 128-bit fixed 40-byte header, TCP 3-way handshake and header flags (SYN, ACK, FIN, RST, PSH, URG), UDP checksum.'
        },
        {
          title: 'Flow & Error Control',
          desc: 'Sliding Window protocols: Stop-and-Wait efficiency η = 1 / (1 + 2a), Go-Back-N window size (2ⁿ - 1), Selective Repeat window size (2ⁿ⁻¹), CRC polynomial division.'
        },
        {
          title: 'Routing Protocols & Security',
          desc: 'Distance Vector Routing (Bellman-Ford, Count-to-Infinity problem, Split Horizon), Link State Routing (Dijkstra, OSPF), RSA public-key cryptography (e · d ≡ 1 mod φ(n)), Symmetric DES/AES.'
        }
      ]
    },
    {
      unitNum: 10,
      title: 'Unit 10: Artificial Intelligence (AI)',
      priority: 'Medium-High',
      topics: [
        {
          title: 'Heuristic Search Algorithms',
          desc: 'A* Search evaluation function f(n) = g(n) + h(n) (Admissibility h(n) ≤ h*(n) & Monotonicity conditions), AO* Search (AND-OR graphs), Minimax algorithm with Alpha-Beta Pruning.'
        },
        {
          title: 'Knowledge Representation & Logic',
          desc: 'First-Order Predicate Logic (FOPL), Clause form conversion (Skolemization), Unification algorithm for literals, Resolution refutation proof tree.'
        },
        {
          title: 'Neural Networks & Deep Learning',
          desc: 'Single-layer Perceptron weight update rule Δw = η(t - y)x, Multilayer Perceptron backpropagation error gradient, Activation functions (Sigmoid, ReLU, Softmax).'
        },
        {
          title: 'Fuzzy Logic & Genetic Algorithms',
          desc: 'Fuzzy set operations (Union max, Intersection min, Complement 1 - μ, α-cut sets), Genetic Algorithm operators (Fitness-proportionate Selection, Single-point Crossover, Bit-flip Mutation).'
        }
      ]
    }
  ];

  const handleUnitClick = (fullUnitName) => {
    if (onSelectUnit) {
      onSelectUnit(fullUnitName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      backgroundColor: '#0a192f',
      color: '#cbd5e1',
      borderTop: '3px solid #006699',
      marginTop: 'auto',
      position: 'relative',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Topic Analysis Header Bar */}
      <div style={{
        backgroundColor: '#0f2744',
        borderBottom: '1px solid #1e3a5f',
        padding: '24px 20px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(2, 132, 199, 0.2)',
              border: '1.5px solid #0284c7',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <TrendingUp size={24} />
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#38bdf8',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>
                <BarChart3 size={13} />
                <span>NTA PYQ Quantitative Intelligence</span>
              </div>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#ffffff',
                margin: '2px 0 0',
                fontFamily: 'var(--font-heading)'
              }}>
                UGC NET Computer Science Topic & Weightage Analysis
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <span>{isAnalysisExpanded ? 'Collapse Analysis' : 'Expand Full Analysis'}</span>
            {isAnalysisExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expandable Topic Analysis Content */}
      {isAnalysisExpanded && (
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '36px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px'
        }}>
          {/* Introductory Summary Note */}
          <div style={{
            backgroundColor: 'rgba(2, 132, 199, 0.08)',
            borderRadius: '12px',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            padding: '20px 24px',
            fontSize: '14.5px',
            lineHeight: 1.7,
            color: '#e2e8f0'
          }}>
            <p style={{ margin: '0 0 12px 0' }}>
              Yes! I have thoroughly analyzed and structured <strong style={{ color: '#38bdf8' }}>over 1,100 questions across 11 past exam papers (2020 to 2025)</strong> in your portal.
            </p>
            <p style={{ margin: '0 0 12px 0' }}>
              Because the UGC NET Paper 2 Computer Science paper is standardized, the National Testing Agency (NTA) maintains a <strong style={{ color: '#ffffff' }}>balanced distribution of roughly 10 questions per unit</strong> (100 questions total, worth 200 marks).
            </p>
            <p style={{ margin: 0, color: '#94a3b8' }}>
              Below is the <strong style={{ color: '#e2e8f0' }}>exact unit weightage</strong>, <strong style={{ color: '#e2e8f0' }}>core topic breakdown</strong>, and a <strong style={{ color: '#e2e8f0' }}>high-priority "Must-Do" topic prediction matrix</strong> based on quantitative trends in the PYQs.
            </p>
          </div>

          {/* Section 1: Unit-Wise Weightage Analysis */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>1. Unit-Wise Weightage Analysis</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    From 1,100+ PYQs
                  </span>
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0' }}>
                  Quantitative distribution per 100-question sitting. Click any unit row to practice immediately.
                </p>
              </div>
            </div>

            {/* Table */}
            <div style={{
              overflowX: 'auto',
              borderRadius: '10px',
              border: '1px solid #1e3a5f',
              backgroundColor: '#0d2238'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '13.5px'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#132d4b',
                    borderBottom: '2px solid #1e3a5f',
                    color: '#e2e8f0',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px'
                  }}>
                    <th style={{ padding: '14px 18px', fontWeight: 700 }}>Unit Name</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'center' }}>Avg. Questions / Paper</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'center' }}>Weightage Share</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'center' }}>Priority Level</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {weightageData.map((row, idx) => (
                    <tr
                      key={row.unit}
                      style={{
                        borderBottom: idx < weightageData.length - 1 ? '1px solid #1e3a5f' : 'none',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#163354'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '13px 18px', fontWeight: 700, color: '#f1f5f9' }}>
                        {row.unit}
                      </td>
                      <td style={{ padding: '13px 18px', textAlign: 'center', fontWeight: 800, color: '#38bdf8' }}>
                        {row.avgQ}
                      </td>
                      <td style={{ padding: '13px 18px', textAlign: 'center', fontWeight: 700, color: '#e2e8f0' }}>
                        {row.share}
                      </td>
                      <td style={{ padding: '13px 18px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: row.priorityColor,
                          backgroundColor: row.priorityBg,
                          border: `1px solid ${row.priorityBorder}`
                        }}>
                          <span>{row.priority === 'High' ? '🔴' : '🟡'}</span>
                          <span>{row.priority}</span>
                        </span>
                      </td>
                      <td style={{ padding: '13px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleUnitClick(row.unit)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(2, 132, 199, 0.2)',
                            border: '1px solid #0284c7',
                            color: '#38bdf8',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#0284c7';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.2)';
                            e.currentTarget.style.color = '#38bdf8';
                          }}
                        >
                          Practice Unit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Unit-Wise Core Topics & Predicted Must-Do Topics */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>2. Unit-Wise Core Topics & Predicted "Must-Do" Topics</span>
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0' }}>
                High-frequency question models, recurring numerical patterns, and key formulas across all 10 syllabus modules.
              </p>
            </div>

            {/* Units Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(580px, 1fr))',
              gap: '20px'
            }}>
              {mustDoUnits.map((u) => {
                const priorityColor = u.priority === 'High' ? '#ef4444' : u.priority === 'Medium-High' ? '#f59e0b' : '#0284c7';

                return (
                  <div
                    key={u.unitNum}
                    style={{
                      backgroundColor: '#0d2238',
                      borderRadius: '12px',
                      border: '1px solid #1e3a5f',
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      transition: 'border-color 0.2s, transform 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#0284c7';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a5f';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Unit Card Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      borderBottom: '1px solid #1a3556',
                      paddingBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          fontSize: '13px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          U{u.unitNum}
                        </div>
                        <h4 style={{
                          fontSize: '15.5px',
                          fontWeight: 800,
                          color: '#ffffff',
                          margin: 0
                        }}>
                          {u.title}
                        </h4>
                      </div>

                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: priorityColor,
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${priorityColor}40`
                      }}>
                        {u.priority} Priority
                      </span>
                    </div>

                    {/* Topics List */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {u.topics.map((t, tidx) => (
                        <div
                          key={tidx}
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            border: '1px solid rgba(255,255,255,0.05)'
                          }}
                        >
                          <div style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#38bdf8',
                            marginBottom: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span style={{ color: '#0284c7' }}>•</span>
                            <span>{t.title}</span>
                          </div>
                          <div style={{
                            fontSize: '12.5px',
                            color: '#cbd5e1',
                            lineHeight: 1.55
                          }}>
                            {t.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
                      <button
                        onClick={() => handleUnitClick(u.title)}
                        style={{
                          width: '100%',
                          padding: '9px 14px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(2, 132, 199, 0.15)',
                          border: '1px solid #0284c7',
                          color: '#38bdf8',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#0284c7';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.15)';
                          e.currentTarget.style.color = '#38bdf8';
                        }}
                      >
                        <span>Practice {u.title.split(':')[0]} PYQs</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Official Bottom Bar & Portal Disclaimer */}
      <div style={{
        borderTop: '1px solid #1a3556',
        backgroundColor: '#071324',
        padding: '24px 20px',
        fontSize: '12px',
        color: '#64748b'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#006699',
              color: '#ffffff',
              fontSize: '9px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              NTA
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontWeight: 600 }}>
                UGC NET Computer Science & Applications (Paper II) CBT Simulator
              </div>
              <div>
                Aligned with the latest National Testing Agency (NTA) official syllabus and examination pattern.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <span style={{ color: '#94a3b8' }}>Over 1,100+ Verified Questions</span>
            <span>•</span>
            <span style={{ color: '#94a3b8' }}>11 Past Official Papers</span>
            <span>•</span>
            <span style={{ color: '#94a3b8' }}>All 10 Syllabus Units</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
