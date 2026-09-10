import React, { useState } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import CandidateModal from './components/CandidateModal';
import ExamScreen from './components/ExamScreen';
import ResultScreen from './components/ResultScreen';
import QuestionPaperModal from './components/QuestionPaperModal';
import InstructionsModal from './components/InstructionsModal';
import questionsData from './data/ugcNet2025.json';

// Robust Fisher-Yates shuffle algorithm to mix questions each time
const shuffleQuestions = (list) => {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  // Screens: 'HOME' | 'EXAM' | 'RESULT'
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [candidateName, setCandidateName] = useState('');
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [examResult, setExamResult] = useState(null);

  // Active question set (mixed on each attempt/retake)
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(questionsData));
  const [attemptCount, setAttemptCount] = useState(1);

  // When clicking "UGC NET 2025 Paper" button
  const handleSelectPaper = () => {
    setIsCandidateModalOpen(true);
  };

  // When candidate enters name and starts test
  const handleStartExam = (name) => {
    setCandidateName(name);
    setIsCandidateModalOpen(false);
    // Mix questions freshly for this attempt
    const mixed = shuffleQuestions(questionsData);
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
    const mixed = shuffleQuestions(questionsData);
    setActiveQuestions(mixed);
    setAttemptCount((prev) => prev + 1);
    setCurrentScreen('EXAM');
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* NTA Official Header */}
      <Header
        candidateName={candidateName}
        onOpenQuestionPaper={() => setIsQuestionPaperOpen(true)}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        inExam={currentScreen === 'EXAM'}
      />

      {/* Screen Router */}
      <main style={{ flex: 1 }}>
        {currentScreen === 'HOME' && (
          <HomeScreen
            onSelectPaper={handleSelectPaper}
            onOpenInstructions={() => setIsInstructionsOpen(true)}
          />
        )}

        {currentScreen === 'EXAM' && (
          <ExamScreen
            key={`exam-attempt-${attemptCount}`}
            candidateName={candidateName}
            questions={activeQuestions}
            onFinishExam={handleFinishExam}
          />
        )}

        {currentScreen === 'RESULT' && (
          <ResultScreen
            key={`result-attempt-${attemptCount}`}
            candidateName={candidateName}
            questions={activeQuestions}
            examResult={examResult}
            onRetakeExam={handleRetakeExam}
          />
        )}
      </main>

      {/* Candidate Name Verification Modal */}
      <CandidateModal
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        onStartTest={handleStartExam}
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
