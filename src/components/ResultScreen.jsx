import React, { useState, useEffect } from 'react';
import {
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  HelpCircle,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check,
  X,
  MinusCircle,
  Layers,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultScreen({
  candidateName,
  questions,
  examResult,
  onRetakeExam
}) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'CORRECT' | 'INCORRECT' | 'UNATTEMPTED'
  const [expandedExplanations, setExpandedExplanations] = useState({});

  const { selectedAnswers = {}, timeSpent = 0 } = examResult;

  // Calculate detailed scores
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const evaluatedQuestions = questions.map((q, idx) => {
    const userAnswer = selectedAnswers[idx] || null;
    const isAnswered = userAnswer !== null;
    const isCorrect = isAnswered && userAnswer === q.correct_answer;
    const isIncorrect = isAnswered && userAnswer !== q.correct_answer;

    if (isCorrect) correctCount++;
    else if (isIncorrect) incorrectCount++;
    else unattemptedCount++;

    return {
      ...q,
      originalIndex: idx,
      userAnswer,
      isAnswered,
      isCorrect,
      isIncorrect
    };
  });

  const totalQuestions = questions.length;
  const marksPerQuestion = 2;
  const totalPossibleMarks = totalQuestions * marksPerQuestion;
  const marksObtained = correctCount * marksPerQuestion;
  const percentage = Math.round((marksObtained / totalPossibleMarks) * 100);
  const accuracy = (correctCount + incorrectCount) > 0 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 0;

  // Trigger celebration confetti on mount if score is good
  useEffect(() => {
    if (percentage >= 50) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Filtered list
  const filteredQuestions = evaluatedQuestions.filter((q) => {
    if (filter === 'CORRECT') return q.isCorrect;
    if (filter === 'INCORRECT') return q.isIncorrect;
    if (filter === 'UNATTEMPTED') return !q.isAnswered;
    return true;
  });

  // Unit-wise statistics
  const unitStats = {};
  evaluatedQuestions.forEach((q) => {
    const unitName = q.unit || 'General';
    if (!unitStats[unitName]) {
      unitStats[unitName] = { total: 0, correct: 0, incorrect: 0, unattempted: 0 };
    }
    unitStats[unitName].total++;
    if (q.isCorrect) unitStats[unitName].correct++;
    else if (q.isIncorrect) unitStats[unitName].incorrect++;
    else unitStats[unitName].unattempted++;
  });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '30px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }}>
      {/* Top Banner / Scorecard Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #004d73 0%, #006699 100%)',
          color: '#ffffff',
          padding: '24px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '8px'
            }}>
              <Award size={14} />
              <span>Official NTA Evaluation Report</span>
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 800,
              margin: 0,
              fontFamily: 'var(--font-heading)'
            }}>
              UGC NET 2025 Examination Scorecard
            </h1>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '14px' }}>
              Candidate: <strong>{candidateName || 'Amit Parmar'}</strong> • Paper: Computer Science & Applications
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.25)'
              }}
            >
              <Printer size={16} />
              <span>Print Scorecard</span>
            </button>
            <button
              id="btn-retake-exam"
              onClick={onRetakeExam}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                backgroundColor: '#ffffff',
                color: '#004d73',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <RotateCcw size={16} />
              <span>Re-take Test</span>
            </button>
          </div>
        </div>

        {/* Primary Scores Grid */}
        <div style={{
          padding: '24px 30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          backgroundColor: '#ffffff'
        }}>
          {/* Marks Scored */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              TOTAL MARKS
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 800,
              color: marksObtained >= totalPossibleMarks / 2 ? '#16a34a' : '#dc2626',
              fontFamily: 'var(--font-heading)'
            }}>
              {marksObtained} <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 600 }}>/ {totalPossibleMarks}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              (+2 Marks per correct)
            </div>
          </div>

          {/* Percentage */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              SCORE PERCENTAGE
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#0284c7',
              fontFamily: 'var(--font-heading)'
            }}>
              {percentage}%
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              {percentage >= 40 ? 'Qualified' : 'Needs Practice'}
            </div>
          </div>

          {/* Accuracy */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              ACCURACY
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#7c3aed',
              fontFamily: 'var(--font-heading)'
            }}>
              {accuracy}%
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Correct vs Attempted
            </div>
          </div>

          {/* Time Spent */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              TIME SPENT
            </div>
            <div style={{
              fontSize: '30px',
              fontWeight: 800,
              color: '#334155',
              fontFamily: 'var(--font-mono)'
            }}>
              {formatDuration(timeSpent)}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Total Duration: 2 Hours
            </div>
          </div>
        </div>

        {/* Answer Counts Bar */}
        <div style={{
          padding: '16px 30px',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#fafafa',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-around',
          fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              {totalQuestions}
            </div>
            <span style={{ color: '#475569' }}>Total Questions</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              {correctCount}
            </div>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>Correct Answers</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              {incorrectCount}
            </div>
            <span style={{ color: '#dc2626', fontWeight: 600 }}>Incorrect Answers</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              {unattemptedCount}
            </div>
            <span style={{ color: '#64748b' }}>Unattempted / Skipped</span>
          </div>
        </div>
      </div>

      {/* Subject / Unit Wise Performance Breakdown */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          color: '#004d73'
        }}>
          <Layers size={18} />
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, fontFamily: 'var(--font-heading)' }}>
            Unit-Wise Performance Breakdown
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#475569', textAlign: 'left' }}>
                <th style={{ padding: '10px 14px', borderBottom: '2px solid #e2e8f0' }}>Unit Name</th>
                <th style={{ padding: '10px 14px', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Total</th>
                <th style={{ padding: '10px 14px', borderBottom: '2px solid #e2e8f0', textAlign: 'center', color: '#16a34a' }}>Correct</th>
                <th style={{ padding: '10px 14px', borderBottom: '2px solid #e2e8f0', textAlign: 'center', color: '#dc2626' }}>Incorrect</th>
                <th style={{ padding: '10px 14px', borderBottom: '2px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>Skipped</th>
                <th style={{ padding: '10px 14px', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(unitStats).map(([unit, ustat], uIdx) => (
                <tr key={unit} style={{
                  borderBottom: '1px solid #f1f5f9',
                  backgroundColor: uIdx % 2 === 0 ? '#ffffff' : '#fafafa'
                }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1e293b' }}>
                    {unit}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>{ustat.total}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>
                    {ustat.correct}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>
                    {ustat.incorrect}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#64748b' }}>
                    {ustat.unattempted}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: '#0284c7' }}>
                    {ustat.correct * 2} / {ustat.total * 2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Question Review & Reason/Explanation Section */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '18px'
        }}>
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#0f172a',
              margin: 0,
              fontFamily: 'var(--font-heading)'
            }}>
              Detailed Solutions & Explanations
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
              Review correct answers, your selected options, and detailed reasons why each answer is correct.
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#ffffff',
            padding: '4px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            gap: '4px'
          }}>
            {[
              { id: 'ALL', label: `All (${totalQuestions})` },
              { id: 'CORRECT', label: `Correct (${correctCount})` },
              { id: 'INCORRECT', label: `Incorrect (${incorrectCount})` },
              { id: 'UNATTEMPTED', label: `Skipped (${unattemptedCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: filter === tab.id ? '#006699' : 'transparent',
                  color: filter === tab.id ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List with Explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredQuestions.map((q) => {
            const isCorrect = q.isCorrect;
            const isIncorrect = q.isIncorrect;
            const isUnattempted = !q.isAnswered;

            return (
              <div
                key={q.question_no}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: isCorrect 
                    ? '1.5px solid #86efac' 
                    : isIncorrect 
                      ? '1.5px solid #fca5a5' 
                      : '1px solid #e2e8f0',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                  overflow: 'hidden'
                }}
              >
                {/* Question Header Card */}
                <div style={{
                  padding: '14px 20px',
                  backgroundColor: isCorrect ? '#f0fdf4' : isIncorrect ? '#fef2f2' : '#f8fafc',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontWeight: 800,
                      color: '#004d73',
                      fontSize: '15px'
                    }}>
                      Question No. {q.originalIndex + 1}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0'
                    }}>
                      Paper Q-ID: #{q.question_no}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 600
                    }}>
                      {q.unit}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isCorrect && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        backgroundColor: '#dcfce7',
                        color: '#15803d',
                        fontSize: '12px',
                        fontWeight: 700
                      }}>
                        <Check size={14} /> Correct (+2.00)
                      </span>
                    )}
                    {isIncorrect && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        fontSize: '12px',
                        fontWeight: 700
                      }}>
                        <X size={14} /> Incorrect (0.00)
                      </span>
                    )}
                    {isUnattempted && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        backgroundColor: '#f1f5f9',
                        color: '#64748b',
                        fontSize: '12px',
                        fontWeight: 700
                      }}>
                        <MinusCircle size={14} /> Not Attempted (0.00)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Body */}
                <div style={{ padding: '20px' }}>
                  <div style={{
                    fontSize: '14.5px',
                    fontWeight: 600,
                    lineHeight: 1.65,
                    color: '#1e293b',
                    whiteSpace: 'pre-line',
                    marginBottom: '18px'
                  }}>
                    {q.question}
                  </div>

                  {/* Options List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginBottom: '20px'
                  }}>
                    {Object.entries(q.options).map(([optKey, optVal]) => {
                      const isCorrectAnswer = optKey === q.correct_answer;
                      const isUserChoice = optKey === q.userAnswer;

                      let rowBg = '#ffffff';
                      let rowBorder = '#cbd5e1';
                      let badge = null;

                      if (isCorrectAnswer) {
                        rowBg = '#f0fdf4';
                        rowBorder = '#22c55e';
                        badge = (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: '#dcfce7',
                            color: '#15803d',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Check size={12} /> Correct Answer
                          </span>
                        );
                      }

                      if (isUserChoice && !isCorrectAnswer) {
                        rowBg = '#fef2f2';
                        rowBorder = '#ef4444';
                        badge = (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <X size={12} /> Your Choice (Incorrect)
                          </span>
                        );
                      } else if (isUserChoice && isCorrectAnswer) {
                        badge = (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: '#dcfce7',
                            color: '#15803d',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Check size={12} /> Correct Choice
                          </span>
                        );
                      }

                      return (
                        <div
                          key={optKey}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: `1.5px solid ${rowBorder}`,
                            backgroundColor: rowBg,
                            fontSize: '13px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <strong style={{
                              color: isCorrectAnswer ? '#15803d' : '#004d73',
                              fontSize: '14px'
                            }}>
                              ({optKey})
                            </strong>
                            <span style={{
                              color: isCorrectAnswer ? '#14532d' : isUserChoice ? '#7f1d1d' : '#334155',
                              fontWeight: (isCorrectAnswer || isUserChoice) ? 600 : 400
                            }}>
                              {optVal}
                            </span>
                          </div>

                          {badge}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation / Reason Box */}
                  <div style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#1e40af',
                      fontWeight: 700,
                      fontSize: '13px',
                      marginBottom: '8px'
                    }}>
                      <Lightbulb size={17} color="#2563eb" />
                      <span>Detailed Explanation & Reason:</span>
                    </div>

                    <div style={{
                      fontSize: '13px',
                      lineHeight: 1.65,
                      color: '#1e3a8a',
                      whiteSpace: 'pre-line'
                    }}>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
