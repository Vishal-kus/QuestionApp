import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  User,
  ShieldCheck
} from 'lucide-react';
import SubmitConfirmModal from './SubmitConfirmModal';

// Status constants matching official NTA CBT
export const STATUS = {
  NOT_VISITED: 'NOT_VISITED',
  NOT_ANSWERED: 'NOT_ANSWERED',
  ANSWERED: 'ANSWERED',
  MARKED_FOR_REVIEW: 'MARKED_FOR_REVIEW',
  ANSWERED_AND_MARKED: 'ANSWERED_AND_MARKED'
};

export default function ExamScreen({
  candidateName,
  questions,
  onFinishExam
}) {
  // Current active question index (0 to questions.length - 1)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map of question index to chosen option ('A', 'B', 'C', 'D' or null)
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Map of question index to status
  const [questionStatuses, setQuestionStatuses] = useState(() => {
    const initial = {};
    for (let i = 0; i < questions.length; i++) {
      initial[i] = i === 0 ? STATUS.NOT_ANSWERED : STATUS.NOT_VISITED;
    }
    return initial;
  });

  // 2 Hours Timer (120 minutes = 7200 seconds)
  const TOTAL_DURATION = 120 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);

  const timerRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleAutoSubmit = () => {
    // When time expires, auto-submit exam
    handleSubmitExam();
  };

  // Format seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const currentAnswer = selectedAnswers[currentIndex] || null;

  // Count current statistics for palette & modal
  const stats = {
    total: questions.length,
    notVisited: Object.values(questionStatuses).filter((s) => s === STATUS.NOT_VISITED).length,
    notAnswered: Object.values(questionStatuses).filter((s) => s === STATUS.NOT_ANSWERED).length,
    answered: Object.values(questionStatuses).filter((s) => s === STATUS.ANSWERED).length,
    marked: Object.values(questionStatuses).filter((s) => s === STATUS.MARKED_FOR_REVIEW).length,
    answeredMarked: Object.values(questionStatuses).filter((s) => s === STATUS.ANSWERED_AND_MARKED).length
  };

  // Option selection
  const handleSelectOption = (key) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: prev[currentIndex] === key ? null : key
    }));
  };

  // 1. "Save & Next" button
  const handleSaveAndNext = () => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      if (selectedAnswers[currentIndex]) {
        updated[currentIndex] = STATUS.ANSWERED;
      } else {
        updated[currentIndex] = STATUS.NOT_ANSWERED;
      }

      // Mark next question as not-answered if it was not visited
      if (currentIndex + 1 < questions.length && updated[currentIndex + 1] === STATUS.NOT_VISITED) {
        updated[currentIndex + 1] = STATUS.NOT_ANSWERED;
      }
      return updated;
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  // 2. "Save & Mark For Review" button
  const handleSaveAndMarkForReview = () => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      if (selectedAnswers[currentIndex]) {
        updated[currentIndex] = STATUS.ANSWERED_AND_MARKED;
      } else {
        updated[currentIndex] = STATUS.MARKED_FOR_REVIEW;
      }

      if (currentIndex + 1 < questions.length && updated[currentIndex + 1] === STATUS.NOT_VISITED) {
        updated[currentIndex + 1] = STATUS.NOT_ANSWERED;
      }
      return updated;
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  // 3. "Clear Response" button
  const handleClearResponse = () => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentIndex];
      return updated;
    });

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentIndex]: STATUS.NOT_ANSWERED
    }));
  };

  // 4. "Mark For Review & Next" button
  const handleMarkForReviewAndNext = () => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      if (selectedAnswers[currentIndex]) {
        updated[currentIndex] = STATUS.ANSWERED_AND_MARKED;
      } else {
        updated[currentIndex] = STATUS.MARKED_FOR_REVIEW;
      }

      if (currentIndex + 1 < questions.length && updated[currentIndex + 1] === STATUS.NOT_VISITED) {
        updated[currentIndex + 1] = STATUS.NOT_ANSWERED;
      }
      return updated;
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  // Back button
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((curr) => curr - 1);
    }
  };

  // Next button
  const handleNext = () => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      // If current question wasn't answered or marked, ensure it's recorded as not answered
      if (!updated[currentIndex] || updated[currentIndex] === STATUS.NOT_VISITED) {
        updated[currentIndex] = STATUS.NOT_ANSWERED;
      }
      if (currentIndex + 1 < questions.length && updated[currentIndex + 1] === STATUS.NOT_VISITED) {
        updated[currentIndex + 1] = STATUS.NOT_ANSWERED;
      }
      return updated;
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  // Jump from question palette directly to a question
  const handlePaletteClick = (targetIndex) => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      // If current question has not been saved/marked and no answer, keep it as NOT_ANSWERED
      if (updated[currentIndex] === STATUS.NOT_VISITED) {
        updated[currentIndex] = STATUS.NOT_ANSWERED;
      }
      // Target question becomes visited / not answered if it was not visited
      if (updated[targetIndex] === STATUS.NOT_VISITED) {
        updated[targetIndex] = STATUS.NOT_ANSWERED;
      }
      return updated;
    });

    setCurrentIndex(targetIndex);
    setMobilePaletteOpen(false);
  };

  // Final submit handler
  const handleSubmitExam = () => {
    clearInterval(timerRef.current);
    setIsSubmitModalOpen(false);

    const timeSpent = TOTAL_DURATION - timeLeft;
    onFinishExam({
      selectedAnswers,
      questionStatuses,
      timeSpent
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case STATUS.NOT_VISITED:
        return 'status-not-visited';
      case STATUS.NOT_ANSWERED:
        return 'status-not-answered';
      case STATUS.ANSWERED:
        return 'status-answered';
      case STATUS.MARKED_FOR_REVIEW:
        return 'status-marked';
      case STATUS.ANSWERED_AND_MARKED:
        return 'status-answered-marked';
      default:
        return 'status-not-visited';
    }
  };

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 65px)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8fafc'
    }}>
      {/* Subheader Candidate & Timer Bar - Exactly matching screenshot */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left: [ Candidate Name ] */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#334155',
            letterSpacing: '0.2px'
          }}>
            [ {candidateName || 'Amit Parmar'} ]
          </span>
          <span style={{
            fontSize: '12px',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            fontWeight: 600
          }}>
            Paper II: Computer Science
          </span>
        </div>

        {/* Right: Remaining Time: 01:59:45 in Blue Oval pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0f172a'
          }}>
            <span>Remaining Time:</span>
            <div
              className={timeLeft < 300 ? 'timer-urgent' : ''}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                padding: '5px 16px',
                borderRadius: '20px',
                fontSize: '15px',
                fontWeight: 800,
                letterSpacing: '1px',
                fontFamily: 'var(--font-mono)',
                boxShadow: '0 2px 5px rgba(2, 132, 199, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Clock size={15} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Mobile Palette Toggle Button */}
          <button
            onClick={() => setMobilePaletteOpen(!mobilePaletteOpen)}
            style={{
              display: 'none',
              padding: '6px 12px',
              backgroundColor: '#006699',
              color: '#ffffff',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12px',
              alignItems: 'center',
              gap: '6px'
            }}
            className="mobile-palette-toggle"
          >
            <Menu size={16} />
            <span>Palette ({stats.answered}/{stats.total})</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Question Area + Right Question Palette */}
      <div style={{
        display: 'flex',
        flex: 1,
        position: 'relative'
      }}>
        {/* LEFT COLUMN: Question Panel + Navigation Panel */}
        <div style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          minWidth: 0
        }}>
          {/* Question Top Metadata */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              borderBottom: '1px solid #f1f5f9',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#004d73'
                }}>
                  Question No. {currentIndex + 1}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  padding: '2px 10px',
                  borderRadius: '12px'
                }}>
                  {currentQuestion.unit}
                </span>
              </div>

              <div style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: 600,
                display: 'flex',
                gap: '12px'
              }}>
                <span style={{ color: '#16a34a' }}>+2.00 Marks</span>
                <span>0.00 Neg</span>
              </div>
            </div>

            {/* Question Text */}
            <div style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#1e293b',
              lineHeight: 1.7,
              marginBottom: '24px',
              whiteSpace: 'pre-line',
              padding: '4px 0'
            }}>
              {currentQuestion.question}
            </div>

            {/* Respective Options - Radio Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '32px'
            }}>
              {Object.entries(currentQuestion.options).map(([optKey, optVal]) => {
                const isSelected = currentAnswer === optKey;
                return (
                  <div
                    key={optKey}
                    id={`option-${optKey.toLowerCase()}`}
                    onClick={() => handleSelectOption(optKey)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(2, 132, 199, 0.12)' : 'none'
                    }}
                  >
                    {/* Authentic Radio Button Circle */}
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid #0284c7' : '2px solid #94a3b8',
                      backgroundColor: '#ffffff',
                      flexShrink: 0,
                      marginTop: '2px',
                      transition: 'all 0.12s ease'
                    }} />

                    {/* Option Text */}
                    <div style={{
                      fontSize: '14px',
                      color: isSelected ? '#0369a1' : '#334155',
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: 1.5
                    }}>
                      <span style={{ fontWeight: 700, marginRight: '6px' }}>({optKey})</span>
                      {optVal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation & Action Panel (Matching Bottom of Question Panel in Image) */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px',
            marginTop: 'auto'
          }}>
            {/* Top Row: NTA Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {/* 1. Save & Next (Green) */}
                <button
                  id="btn-save-and-next"
                  onClick={handleSaveAndNext}
                  style={{
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    padding: '8px 18px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 2px 4px rgba(22, 163, 74, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  Save & Next
                </button>

                {/* 2. Save & Mark For Review (Amber / Yellow) */}
                <button
                  id="btn-save-mark-review"
                  onClick={handleSaveAndMarkForReview}
                  style={{
                    backgroundColor: '#d97706',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 2px 4px rgba(217, 119, 6, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  Save & Mark For Review
                </button>

                {/* 3. Clear Response (White / Gray border) */}
                <button
                  id="btn-clear-response"
                  onClick={handleClearResponse}
                  disabled={!currentAnswer}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  Clear Response
                </button>

                {/* 4. Mark For Review & Next (Blue) */}
                <button
                  id="btn-mark-review-next"
                  onClick={handleMarkForReviewAndNext}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  Mark For Review & Next
                </button>
              </div>
            </div>

            {/* Bottom Row: Back, Next, and Submit */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  id="btn-nav-back"
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '7px 16px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>

                <button
                  id="btn-nav-next"
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '7px 16px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Submit Button (Green on bottom right) */}
              <button
                id="btn-exam-submit"
                onClick={() => setIsSubmitModalOpen(true)}
                style={{
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  padding: '9px 26px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 800,
                  boxShadow: '0 3px 6px rgba(22, 163, 74, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={17} />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Question Palette & Legend */}
        <aside style={{
          width: '340px',
          backgroundColor: '#f8fafc',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          overflowY: 'auto'
        }}>
          {/* Candidate Profile Box */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#e0f2fe',
              border: '2px solid #0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284c7'
            }}>
              <User size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>
                {candidateName || 'Amit Parmar'}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Roll No: NTA25CS08492
              </div>
            </div>
          </div>

          {/* NTA Legend Table with Real Counts */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#004d73',
              marginBottom: '10px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '4px'
            }}>
              Legend / Question Status
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px 14px',
              fontSize: '11px',
              color: '#475569'
            }}>
              {/* Not Visited */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="legend-icon status-not-visited">{stats.notVisited}</span>
                <span>Not Visited</span>
              </div>

              {/* Not Answered */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="legend-icon status-not-answered">{stats.notAnswered}</span>
                <span>Not Answered</span>
              </div>

              {/* Answered */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="legend-icon status-answered">{stats.answered}</span>
                <span>Answered</span>
              </div>

              {/* Marked for Review */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="legend-icon status-marked">{stats.marked}</span>
                <span>Marked for Review</span>
              </div>
            </div>

            {/* Answered & Marked for Review - Full Width */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid #f1f5f9',
              fontSize: '10.5px',
              lineHeight: 1.35
            }}>
              <span className="legend-icon status-answered-marked" style={{ marginTop: '2px' }}>
                {stats.answeredMarked}
              </span>
              <span>
                <strong>Answered & Marked for Review</strong> (will be considered for evaluation)
              </span>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#004d73',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Question Palette</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                {questions.length} Questions
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              justifyItems: 'center',
              maxHeight: '420px',
              overflowY: 'auto',
              padding: '4px 2px'
            }}>
              {questions.map((q, idx) => {
                const status = questionStatuses[idx] || STATUS.NOT_VISITED;
                const statusClass = getStatusClass(status);
                const isActive = currentIndex === idx;

                return (
                  <button
                    key={q.question_no}
                    id={`palette-btn-${idx + 1}`}
                    onClick={() => handlePaletteClick(idx)}
                    className={`palette-btn ${statusClass} ${isActive ? 'active' : ''}`}
                    title={`Question ${idx + 1} (${status.replace(/_/g, ' ')})`}
                  >
                    {(idx + 1).toString().padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Final Submit Confirmation Modal */}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onFinalSubmit={handleSubmitExam}
        stats={stats}
        remainingSeconds={timeLeft}
      />
    </div>
  );
}
