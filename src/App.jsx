import React, { useState } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import CandidateModal from './components/CandidateModal';
import ExamScreen from './components/ExamScreen';
import ResultScreen from './components/ResultScreen';
import PracticeScreen from './components/PracticeScreen';
import QuestionPaperModal from './components/QuestionPaperModal';
import InstructionsModal from './components/InstructionsModal';
import { getDefaultPaper } from './data/papers/papersRegistry';

// Robust Fisher-Yates shuffle algorithm to mix questions on each attempt
const shuffleQuestions = (list) => {
  if (!list || list.length === 0) return [];
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  // Screens: 'HOME' | 'EXAM' | 'RESULT' | 'PRACTICE'
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [candidateName, setCandidateName] = useState('');
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [examResult, setExamResult] = useState(null);

  // Selected paper for full examination
  const [selectedPaper, setSelectedPaper] = useState(() => getDefaultPaper());

  // Selected unit for topic-wise instant practice
  const [practiceUnit, setPracticeUnit] = useState('ALL');

  // Active question set (mixed on each attempt/retake for the selected paper)
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(getDefaultPaper().questions));
  const [attemptCount, setAttemptCount] = useState(1);

  // When clicking "Attempt Paper" button for any paper on HomeScreen
  const handleSelectPaper = (paper) => {
    setSelectedPaper(paper);
    setIsCandidateModalOpen(true);
  };

  // When clicking "Practice Unit" or "Unit-wise Practice" on HomeScreen
  const handleStartPractice = (unitName) => {
    setPracticeUnit(unitName || 'ALL');
    setCurrentScreen('PRACTICE');
    window.scrollTo(0, 0);
  };

  // When candidate enters name and starts full test
  const handleStartExam = (name) => {
    setCandidateName(name);
    setIsCandidateModalOpen(false);
    // Mix questions freshly for this attempt from the chosen paper
    const mixed = shuffleQuestions(selectedPaper.questions);
    setActiveQuestions(mixed);
    setAttemptCount((prev) => prev + 1);
    setCurrentScreen('EXAM');
    window.scrollTo(0, 0);
  };

  // When exam is finished / submitted
  const handleFinishExam = (resultData) => {
    setExamResult(resultData);
    setCurrentScreen('RESULT');
    window.scrollTo(0, 0);
  };

  // Retake exam with a completely new mixed order of questions
  const handleRetakeExam = () => {
    setExamResult(null);
    const mixed = shuffleQuestions(selectedPaper.questions);
    setActiveQuestions(mixed);
    setAttemptCount((prev) => prev + 1);
    setCurrentScreen('EXAM');
    window.scrollTo(0, 0);
  };

  // Go back to paper selection on Home Page
  const handleGoHome = () => {
    setCurrentScreen('HOME');
    setExamResult(null);
    window.scrollTo(0, 0);
  };

  const headerPaper = currentScreen === 'PRACTICE'
    ? { shortTitle: 'Topic-wise Practice Mode' }
    : selectedPaper;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* NTA Official Header */}
      <Header
        candidateName={candidateName}
        onOpenQuestionPaper={() => setIsQuestionPaperOpen(true)}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        inExam={currentScreen === 'EXAM'}
        paper={headerPaper}
        onGoHome={handleGoHome}
        currentScreen={currentScreen}
      />

      {/* Screen Router */}
      <main style={{ flex: 1 }}>
        {currentScreen === 'HOME' && (
          <HomeScreen
            onSelectPaper={handleSelectPaper}
            onOpenInstructions={() => setIsInstructionsOpen(true)}
            onStartPractice={handleStartPractice}
          />
        )}

        {currentScreen === 'PRACTICE' && (
          <PracticeScreen
            initialUnit={practiceUnit}
            onBackToHome={handleGoHome}
          />
        )}

        {currentScreen === 'EXAM' && (
          <ExamScreen
            key={`exam-attempt-${attemptCount}-${selectedPaper.id}`}
            candidateName={candidateName}
            questions={activeQuestions}
            paper={selectedPaper}
            onFinishExam={handleFinishExam}
          />
        )}

        {currentScreen === 'RESULT' && (
          <ResultScreen
            key={`result-attempt-${attemptCount}-${selectedPaper.id}`}
            candidateName={candidateName}
            questions={activeQuestions}
            examResult={examResult}
            paper={selectedPaper}
            onRetakeExam={handleRetakeExam}
            onBackToHome={handleGoHome}
          />
        )}
      </main>

      {/* Candidate Name Verification Modal */}
      <CandidateModal
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        onStartTest={handleStartExam}
        paper={selectedPaper}
      />

      {/* Question Paper Modal */}
      <QuestionPaperModal
        isOpen={isQuestionPaperOpen}
        onClose={() => setIsQuestionPaperOpen(false)}
        questions={activeQuestions}
      />

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </div>
  );
}
