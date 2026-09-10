import React from 'react';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Play,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export default function HomeScreen({ onSelectPaper, onOpenInstructions }) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '36px'
    }}>
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #004d73 0%, #006699 60%, #0284c7 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '36px 32px',
        boxShadow: '0 10px 25px -5px rgba(0, 102, 153, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '14px',
            letterSpacing: '0.5px'
          }}>
            <ShieldCheck size={16} />
            <span>NTA OFFICIAL CBT SIMULATOR</span>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-heading)'
          }}>
            UGC NET 2025 Mock Test Series Portal
          </h1>

          <p style={{
            fontSize: '15px',
            opacity: 0.9,
            lineHeight: 1.6,
            margin: '0 0 20px 0'
          }}>
            Experience the authentic National Testing Agency (NTA) Computer Based Test (CBT) environment. Prepare with official question papers, real-time question palette tracking, and instant detailed solutions with explanations.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              id="btn-ugc-net-2025"
              onClick={onSelectPaper}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 28px',
                borderRadius: '8px',
                backgroundColor: '#f58220',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(245, 130, 32, 0.45)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Play size={18} fill="#ffffff" />
              <span>UGC NET 2025 Paper</span>
            </button>

            <button
              onClick={onOpenInstructions}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer'
              }}
            >
              <HelpCircle size={16} />
              <span>Exam Guidelines</span>
            </button>
          </div>
        </div>

        {/* Hero Mini Stats Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          minWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>EXAM DURATION</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>2 Hours (120 Mins)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>MARKING SCHEME</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>+2 Marks / 0 Neg</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>EXPLANATIONS</div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>100% Verified Solutions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Papers Section */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#0f172a',
              margin: 0,
              fontFamily: 'var(--font-heading)'
            }}>
              Available Test Series Papers
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>
              Select a paper to verify your details and begin the examination.
            </p>
          </div>
        </div>

        {/* Test Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {/* Main UGC NET 2025 Paper Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '2px solid #0284c7',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Top Ribbon */}
            <div style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '6px 16px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>RECOMMENDED • UGC NET 2025</span>
              <span>LIVE CBT TEST</span>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  flexShrink: 0
                }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 4px 0',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    UGC NET 2025 Paper
                  </h3>
                  <div style={{ fontSize: '13px', color: '#0284c7', fontWeight: 600 }}>
                    Subject: Computer Science & Applications (Paper II)
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: '13px',
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '18px'
              }}>
                Covers Operating Systems, Discrete Mathematics, Computer Networks, Software Engineering, AI, Computer Architecture, and DBMS with verified mathematical solutions.
              </p>

              {/* Tags */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '24px',
                fontSize: '12px'
              }}>
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#334155'
                }}>
                  <Clock size={14} color="#0284c7" />
                  <span><strong>Time:</strong> 2 Hours</span>
                </div>

                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#334155'
                }}>
                  <Award size={14} color="#16a34a" />
                  <span><strong>Total:</strong> 100 Questions</span>
                </div>

                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#334155'
                }}>
                  <Zap size={14} color="#f59e0b" />
                  <span><strong>Marks:</strong> 200 (+2 / 0)</span>
                </div>

                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#334155'
                }}>
                  <CheckCircle2 size={14} color="#7c3aed" />
                  <span><strong>Feedback:</strong> Instant Reason</span>
                </div>
              </div>

              {/* Start Test Button */}
              <div style={{ marginTop: 'auto' }}>
                <button
                  id="btn-card-start-test"
                  onClick={onSelectPaper}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 3px 6px rgba(22, 163, 74, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                >
                  <Play size={16} fill="#ffffff" />
                  <span>Attempt UGC NET 2025 Paper</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guidelines / How it Works Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontSize: '17px',
              fontWeight: 800,
              color: '#004d73',
              marginBottom: '14px',
              fontFamily: 'var(--font-heading)'
            }}>
              Test Simulation Features
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              fontSize: '13px',
              color: '#475569',
              lineHeight: 1.5,
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ color: '#16a34a', fontWeight: 800 }}>✓</div>
                <div>
                  <strong>Exact NTA CBT UI:</strong> Question panel with options on the left, 5-status Question Palette on the right.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ color: '#16a34a', fontWeight: 800 }}>✓</div>
                <div>
                  <strong>Interactive Action Buttons:</strong> Save & Next, Save & Mark For Review, Clear Response, and Mark For Review & Next.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ color: '#16a34a', fontWeight: 800 }}>✓</div>
                <div>
                  <strong>2-Hour Real-Time Clock:</strong> Synchronized countdown timer with automatic submission upon timeout.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ color: '#16a34a', fontWeight: 800 }}>✓</div>
                <div>
                  <strong>Detailed Solutions & Explanations:</strong> Review every question, check correct answers, and understand the step-by-step reasoning.
                </div>
              </div>
            </div>

            <div style={{
              marginTop: 'auto',
              padding: '12px 16px',
              backgroundColor: '#eff6ff',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
              fontSize: '12px',
              color: '#1e40af'
            }}>
              Tip: You can change or clear your responses at any time before clicking the final Submit button.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
