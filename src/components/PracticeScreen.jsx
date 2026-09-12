import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
  Layers,
  ChevronDown,
  Home,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOPIC_UNITS, getQuestionsByUnit, getAllPaperQuestions } from '../data/papers/papersRegistry';

// Fisher-Yates shuffle
const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function PracticeScreen({ initialUnit, onBackToHome }) {
  // Currently selected unit ('ALL' or specific unit name)
  const [selectedUnit, setSelectedUnit] = useState(initialUnit || TOPIC_UNITS[0].unit);

  // Question pool for the selected unit
  const [questionPool, setQuestionPool] = useState([]);
  const [poolIndex, setPoolIndex] = useState(0);

  // Session Statistics
  const [sessionCount, setSessionCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Current Question State
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Load / reload question pool whenever selectedUnit changes
  useEffect(() => {
    let list = [];
    if (selectedUnit === 'ALL') {
      list = getAllPaperQuestions();
    } else {
      list = getQuestionsByUnit(selectedUnit);
    }

    if (list.length === 0) {
      list = getAllPaperQuestions();
    }

    const shuffled = shuffleArray(list);
    setQuestionPool(shuffled);
    setPoolIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
  }, [selectedUnit]);

  // Current active question
  const currentQuestion = useMemo(() => {
    if (questionPool.length === 0) return null;
    return questionPool[poolIndex % questionPool.length];
  }, [questionPool, poolIndex]);

  // Handle option click -> IMMEDIATELY EVALUATE & SHOW EXPLANATION
  const handleOptionClick = (optionKey) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(optionKey);
    setIsAnswered(true);
    setShowExplanation(true);

    const isCorrect = optionKey.toUpperCase() === currentQuestion.correct_answer.toUpperCase();

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        // Small celebration on streak milestone
        if (next % 3 === 0) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
        return next;
      });
    } else {
      setIncorrectCount((prev) => prev + 1);
      setCurrentStreak(0);
    }
  };

  // Next Question -> pulls new question from pool endlessly
  const handleNextQuestion = () => {
    if (questionPool.length === 0) return;

    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setSessionCount((prev) => prev + 1);

    // If reaching end of pool, reshuffle to ensure endless fresh variety
    if (poolIndex + 1 >= questionPool.length) {
      const reshuffled = shuffleArray(questionPool);
      setQuestionPool(reshuffled);
      setPoolIndex(0);
    } else {
      setPoolIndex((prev) => prev + 1);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accuracy = (correctCount + incorrectCount) > 0
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
    : 0;

  const currentUnitMeta = TOPIC_UNITS.find((u) => u.unit === selectedUnit);

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '24px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Top Header & Unit Selector Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '16px 22px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Unit Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 340px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#16a34a',
            flexShrink: 0
          }}>
            <BookOpen size={22} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px' }}>
              TOPIC-WISE PRACTICE MODE • INSTANT FEEDBACK
            </div>
            <select
              id="unit-selector-dropdown"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0f172a',
                backgroundColor: '#f8fafc',
                outline: 'none',
                cursor: 'pointer',
                marginTop: '3px'
              }}
            >
              <option value="ALL">All 10 Units Mixed (1,100+ Questions)</option>
              {TOPIC_UNITS.map((unit) => (
                <option key={unit.unit} value={unit.unit}>
                  {unit.unit} ({getQuestionsByUnit(unit.unit).length} Qs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Session Counters */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap'
        }}>
          {/* Streak Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: currentStreak >= 3 ? '#fff7ed' : '#f8fafc',
            border: currentStreak >= 3 ? '1px solid #fdba74' : '1px solid #e2e8f0',
            color: currentStreak >= 3 ? '#ea580c' : '#475569',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <Flame size={15} color={currentStreak >= 3 ? '#ea580c' : '#94a3b8'} />
            <span>Streak: {currentStreak}</span>
          </div>

          {/* Correct Count */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <CheckCircle2 size={15} />
            <span>{correctCount} Correct</span>
          </div>

          {/* Incorrect Count */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <XCircle size={15} />
            <span>{incorrectCount} Wrong</span>
          </div>

          {/* Accuracy */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            color: '#2563eb',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <Award size={15} />
            <span>{accuracy}% Accuracy</span>
          </div>

          {/* Exit / Return to All Papers */}
          {onBackToHome && (
            <button
              id="btn-practice-exit"
              onClick={onBackToHome}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Home size={14} />
              <span>All Papers</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Question Card */}
      {!currentQuestion ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <p>Loading questions...</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Card Meta Header */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px'
              }}>
                Question #{sessionCount}
              </span>

              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#334155'
              }}>
                {currentQuestion.unit}
              </span>
            </div>

            {/* Source Paper Origin Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1e40af'
            }}>
              <span>Source:</span>
              <strong>{currentQuestion.sourcePaper || currentQuestion.paper || 'Official UGC NET'}</strong>
            </div>
          </div>

          {/* Question Content */}
          <div style={{ padding: '28px 28px 20px' }}>
            <h2 style={{
              fontSize: '17px',
              fontWeight: 600,
              lineHeight: 1.6,
              color: '#0f172a',
              margin: '0 0 24px 0',
              whiteSpace: 'pre-line'
            }}>
              {currentQuestion.question}
            </h2>

            {/* Options List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px'
            }}>
              {['A', 'B', 'C', 'D'].map((key) => {
                const optionText = currentQuestion.options ? currentQuestion.options[key] : null;
                if (!optionText) return null;

                const isSelected = selectedOption === key;
                const isCorrectOption = key.toUpperCase() === currentQuestion.correct_answer.toUpperCase();

                // Style based on state
                let bgColor = '#ffffff';
                let borderColor = '#e2e8f0';
                let textColor = '#1e293b';
                let indicatorBg = '#f1f5f9';
                let indicatorColor = '#475569';

                if (isAnswered) {
                  if (isCorrectOption) {
                    // Correct answer is always green
                    bgColor = '#f0fdf4';
                    borderColor = '#22c55e';
                    textColor = '#14532d';
                    indicatorBg = '#22c55e';
                    indicatorColor = '#ffffff';
                  } else if (isSelected && !isCorrectOption) {
                    // User's wrong pick is red
                    bgColor = '#fef2f2';
                    borderColor = '#ef4444';
                    textColor = '#7f1d1d';
                    indicatorBg = '#ef4444';
                    indicatorColor = '#ffffff';
                  } else {
                    // Other unselected options dim
                    bgColor = '#f8fafc';
                    borderColor = '#f1f5f9';
                    textColor = '#64748b';
                  }
                }

                return (
                  <button
                    key={key}
                    id={`practice-opt-${key.toLowerCase()}`}
                    onClick={() => handleOptionClick(key)}
                    disabled={isAnswered}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      border: `2px solid ${borderColor}`,
                      backgroundColor: bgColor,
                      color: textColor,
                      fontSize: '14px',
                      fontWeight: isSelected || (isAnswered && isCorrectOption) ? 700 : 500,
                      textAlign: 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                    }}
                    onMouseOver={(e) => {
                      if (!isAnswered) {
                        e.currentTarget.style.borderColor = '#0284c7';
                        e.currentTarget.style.backgroundColor = '#f0f9ff';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isAnswered) {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }
                    }}
                  >
                    {/* Circle Indicator A/B/C/D */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: indicatorBg,
                      color: indicatorColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {isAnswered && isCorrectOption ? (
                        <Check size={18} strokeWidth={3} />
                      ) : isAnswered && isSelected && !isCorrectOption ? (
                        <X size={18} strokeWidth={3} />
                      ) : (
                        key
                      )}
                    </div>

                    {/* Option Text */}
                    <span style={{ flex: 1, lineHeight: 1.5 }}>
                      {optionText}
                    </span>

                    {/* Result Tag */}
                    {isAnswered && isCorrectOption && (
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        color: '#15803d',
                        backgroundColor: '#dcfce7',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        Correct Answer
                      </span>
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        color: '#b91c1c',
                        backgroundColor: '#fee2e2',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        Your Choice
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Answer Feedback Banner & Solution Box */}
            {isAnswered && (
              <div className="animate-fade-in" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                marginTop: '10px'
              }}>
                {/* Result Message Pill */}
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '8px',
                  backgroundColor: selectedOption?.toUpperCase() === currentQuestion.correct_answer.toUpperCase() ? '#f0fdf4' : '#fef2f2',
                  border: selectedOption?.toUpperCase() === currentQuestion.correct_answer.toUpperCase() ? '1.5px solid #86efac' : '1.5px solid #fca5a5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedOption?.toUpperCase() === currentQuestion.correct_answer.toUpperCase() ? (
                      <>
                        <CheckCircle2 size={20} color="#16a34a" />
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#15803d' }}>
                          Spot on! Option {currentQuestion.correct_answer} is correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle size={20} color="#dc2626" />
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#b91c1c' }}>
                          Incorrect. Correct Option is {currentQuestion.correct_answer}.
                        </span>
                      </>
                    )}
                  </div>

                  {/* Primary Next Question CTA */}
                  <button
                    id="btn-practice-next-inline"
                    onClick={handleNextQuestion}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 20px',
                      borderRadius: '6px',
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(2, 132, 199, 0.35)',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0369a1'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <span>Next Question</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Explanation Box */}
                {currentQuestion.explanation && (
                  <div style={{
                    backgroundColor: '#fffbeb',
                    borderRadius: '8px',
                    border: '1px solid #fef3c7',
                    padding: '16px 20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#b45309',
                      fontSize: '13px',
                      fontWeight: 800,
                      marginBottom: '8px'
                    }}>
                      <Lightbulb size={16} />
                      <span>STEP-BY-STEP EXPLANATION & RATIONALE</span>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      lineHeight: 1.65,
                      color: '#451a03',
                      whiteSpace: 'pre-line'
                    }}>
                      {currentQuestion.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Card Navigation Bar */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {!isAnswered ? (
                <span>👉 Click any option above to check your answer and view the solution immediately.</span>
              ) : (
                <span>Click <strong>Next Question</strong> to fetch another question from all other sets.</span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                id="btn-practice-next"
                onClick={handleNextQuestion}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  backgroundColor: isAnswered ? '#16a34a' : '#0284c7',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: isAnswered ? '0 2px 8px rgba(22, 163, 74, 0.3)' : '0 2px 8px rgba(2, 132, 199, 0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isAnswered ? '#15803d' : '#0369a1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = isAnswered ? '#16a34a' : '#0284c7';
                }}
              >
                <span>{isAnswered ? 'Next Question' : 'Skip / Next'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unit Selector Quick Tabs below question */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '18px 22px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#334155',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Layers size={15} color="#0284c7" />
          <span>Switch Unit:</span>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <button
            onClick={() => setSelectedUnit('ALL')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: selectedUnit === 'ALL' ? 700 : 500,
              backgroundColor: selectedUnit === 'ALL' ? '#0284c7' : '#f1f5f9',
              color: selectedUnit === 'ALL' ? '#ffffff' : '#334155',
              border: selectedUnit === 'ALL' ? '1px solid #0284c7' : '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            All 10 Units Mixed
          </button>

          {TOPIC_UNITS.map((unit) => {
            const isSelected = selectedUnit === unit.unit;
            return (
              <button
                key={unit.unit}
                onClick={() => setSelectedUnit(unit.unit)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? '#0284c7' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#334155',
                  border: isSelected ? '1px solid #0284c7' : '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
              >
                Unit {unit.unitNumber}: {unit.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
