import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Play,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck,
  Search,
  Sparkles,
  Layers,
  Calendar,
  Filter,
  Check,
  Target,
  ArrowRight,
  Flame,
  Brain
} from 'lucide-react';
import { getAllPapers, TOPIC_UNITS, getQuestionsByUnit } from '../data/papers/papersRegistry';

export default function HomeScreen({ onSelectPaper, onOpenInstructions, onStartPractice }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL'); // 'ALL' | 'NEW' | 'RECENT' | 'PYQ' | 'TOPIC'
  const [searchQuery, setSearchQuery] = useState('');

  const allPapers = useMemo(() => getAllPapers(), []);

  // Filter full papers based on search query
  const filteredPapers = useMemo(() => {
    return allPapers.filter((paper) => {
      // Tab filter
      if (selectedFilter === 'NEW' && !paper.isNew) return false;
      if (selectedFilter === 'RECENT' && !['2025', '2024'].includes(paper.year)) return false;
      if (selectedFilter === 'PYQ' && paper.id === 'ugc-net-2025-mock') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = paper.title.toLowerCase().includes(q);
        const matchesSession = paper.session.toLowerCase().includes(q);
        const matchesYear = paper.year.toLowerCase().includes(q);
        const matchesTopics = paper.topics?.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = paper.description.toLowerCase().includes(q);
        return matchesTitle || matchesSession || matchesYear || matchesTopics || matchesDesc;
      }

      return true;
    });
  }, [allPapers, selectedFilter, searchQuery]);

  // Filter units if in TOPIC mode
  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return TOPIC_UNITS;
    const q = searchQuery.toLowerCase();
    return TOPIC_UNITS.filter((u) => 
      u.unit.toLowerCase().includes(q) || 
      u.shortName.toLowerCase().includes(q) || 
      u.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalQuestionsSum = allPapers.reduce((sum, p) => sum + p.totalQuestions, 0);

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '36px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #003e5c 0%, #005a87 40%, #0284c7 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '36px 32px',
        boxShadow: '0 12px 30px -6px rgba(0, 77, 115, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.16)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '14px',
            letterSpacing: '0.6px'
          }}>
            <ShieldCheck size={16} />
            <span>NTA OFFICIAL CBT EXAMINATION SIMULATOR</span>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-heading)'
          }}>
            UGC NET Computer Science Test Series & Practice Portal
          </h1>

          <p style={{
            fontSize: '15px',
            opacity: 0.92,
            lineHeight: 1.6,
            margin: '0 0 22px 0'
          }}>
            Practice with authentic UGC NET Previous Year Question papers and all 10 unit-wise syllabus modules. Choose between authentic 2-hour CBT exam simulation or infinite instant-feedback practice mode with verified step-by-step solutions.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              id="btn-hero-first-paper"
              onClick={() => onSelectPaper(allPapers[0])}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 24px',
                borderRadius: '8px',
                backgroundColor: '#f58220',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(245, 130, 32, 0.45)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                border: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Play size={17} fill="#ffffff" />
              <span>Start 2025 Mock Test</span>
            </button>

            <button
              id="btn-hero-topic-practice"
              onClick={() => setSelectedFilter('TOPIC')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 22px',
                borderRadius: '8px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                border: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Target size={17} />
              <span>Unit-wise Practice (Instant Answers)</span>
            </button>

            <button
              id="btn-hero-guidelines"
              onClick={onOpenInstructions}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 18px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.35)',
                cursor: 'pointer'
              }}
            >
              <HelpCircle size={16} />
              <span>Instructions</span>
            </button>
          </div>
        </div>

        {/* Hero Quick Stats Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '14px',
          padding: '24px 28px',
          minWidth: '260px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.85, fontWeight: 700, letterSpacing: '0.5px' }}>AVAILABLE PAPERS</div>
              <div style={{ fontSize: '20px', fontWeight: 800 }}>{allPapers.length} Official Sets</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.85, fontWeight: 700, letterSpacing: '0.5px' }}>TOTAL QUESTIONS</div>
              <div style={{ fontSize: '20px', fontWeight: 800 }}>{totalQuestionsSum.toLocaleString()}+ Questions</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileCheck size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.85, fontWeight: 700, letterSpacing: '0.5px' }}>SOLUTIONS</div>
              <div style={{ fontSize: '20px', fontWeight: 800 }}>100% Step-by-Step</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar Section */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '18px 22px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#0f172a',
              margin: 0,
              fontFamily: 'var(--font-heading)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {selectedFilter === 'TOPIC' ? (
                <>
                  <span>Unit-wise Practice Modules</span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#16a34a',
                    backgroundColor: '#f0fdf4',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0'
                  }}>
                    10 Units • Instant Solutions
                  </span>
                </>
              ) : (
                <>
                  <span>Select Full Question Paper</span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0284c7',
                    backgroundColor: '#eff6ff',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    border: '1px solid #bfdbfe'
                  }}>
                    {filteredPapers.length} of {allPapers.length} Papers
                  </span>
                </>
              )}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
              {selectedFilter === 'TOPIC'
                ? 'Practice any unit with questions pooled from all papers. Instant correct/wrong check and full explanation on click.'
                : 'Select an official NTA paper to experience the timed 2-hour Computer Based Test simulator.'}
            </p>
          </div>

          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            border: '1.5px solid #cbd5e1',
            borderRadius: '8px',
            padding: '8px 14px',
            width: '100%',
            maxWidth: '320px',
            gap: '8px'
          }}>
            <Search size={16} color="#64748b" />
            <input
              id="search-papers-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={selectedFilter === 'TOPIC' ? "Search units (e.g. DBMS, AI, OS)..." : "Search by year, topic or exam..."}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '13px',
                outline: 'none',
                width: '100%',
                color: '#1e293b'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  fontSize: '12px',
                  padding: 0
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '14px'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <Filter size={13} /> View Mode:
          </span>

          {[
            { id: 'ALL', label: 'All Full Papers (11)' },
            { id: 'TOPIC', label: '🎯 Topic-wise Practice (All 10 Units)', highlightGreen: true },
            { id: 'NEW', label: '✨ Newly Added Papers (3)' },
            { id: 'RECENT', label: '2024 - 2025 Sessions' },
            { id: 'PYQ', label: 'Official PYQs (2020 - 2023)' }
          ].map((tab) => {
            const isActive = selectedFilter === tab.id;
            const isGreen = tab.highlightGreen;
            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id.toLowerCase()}`}
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  border: isActive
                    ? (isGreen ? '1.5px solid #16a34a' : '1.5px solid #0284c7')
                    : isGreen
                    ? '1.5px solid #86efac'
                    : '1px solid #e2e8f0',
                  backgroundColor: isActive
                    ? (isGreen ? '#16a34a' : '#0284c7')
                    : isGreen
                    ? '#f0fdf4'
                    : '#ffffff',
                  color: isActive
                    ? '#ffffff'
                    : isGreen
                    ? '#15803d'
                    : '#475569',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.15)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TOPIC-WISE PRACTICE SECTION (When TOPIC filter is chosen) */}
      {selectedFilter === 'TOPIC' ? (
        <div>
          {/* Practice Mode Promo Card */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            borderRadius: '12px',
            padding: '18px 24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Brain size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#14532d', margin: '0 0 3px' }}>
                  Endless Topic Practice • Questions from All 11 Papers Combined
                </h3>
                <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
                  Click any option to instantly see if it is correct or wrong, view the step-by-step verified explanation, and keep practicing with infinite questions.
                </p>
              </div>
            </div>

            <button
              id="btn-start-all-units"
              onClick={() => onStartPractice && onStartPractice('ALL')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 22px',
                borderRadius: '8px',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(22, 163, 74, 0.35)'
              }}
            >
              <span>Practice All 10 Units Mixed</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 10 Unit Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px'
          }}>
            {filteredUnits.map((unit) => {
              const qCount = getQuestionsByUnit(unit.unit).length;

              return (
                <div
                  key={unit.unit}
                  id={`unit-card-${unit.unitNumber}`}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(22, 163, 74, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#16a34a',
                      fontSize: '15px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      U{unit.unitNumber}
                    </div>

                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#15803d',
                        backgroundColor: '#dcfce7',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        Unit {unit.unitNumber}
                      </span>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 800,
                        color: '#0f172a',
                        margin: '6px 0 2px',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1.3
                      }}>
                        {unit.shortName}
                      </h3>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '12.5px',
                    color: '#64748b',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    flex: 1
                  }}>
                    {unit.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '18px',
                    fontSize: '12px'
                  }}>
                    <span style={{ color: '#475569', fontWeight: 600 }}>
                      Questions from 11 Sets:
                    </span>
                    <span style={{ fontWeight: 800, color: '#0284c7' }}>
                      {qCount} Questions
                    </span>
                  </div>

                  <button
                    id={`btn-practice-unit-${unit.unitNumber}`}
                    onClick={() => onStartPractice && onStartPractice(unit.unit)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  >
                    <Target size={15} />
                    <span>Practice Unit {unit.unitNumber} Questions</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* FULL EXAMINATION PAPERS GRID */
        filteredPapers.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <BookOpen size={42} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#334155', margin: '0 0 6px' }}>
              No question papers found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 18px' }}>
              No papers matched your search "{searchQuery}". Try clearing search or selecting "All Full Papers".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('ALL'); }}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {filteredPapers.map((paper) => {
              const isHighlighted = paper.isNew || paper.id === 'ugc-net-2025-mock';
              const ribbonBg = paper.isNew
                ? '#16a34a'
                : paper.badgeVariant === 'primary'
                ? '#0284c7'
                : paper.badgeVariant === 'purple'
                ? '#7c3aed'
                : paper.badgeVariant === 'warning'
                ? '#ea580c'
                : '#006699';

              return (
                <div
                  key={paper.id}
                  id={`paper-card-${paper.id}`}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: isHighlighted ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    boxShadow: isHighlighted 
                      ? '0 6px 18px rgba(2, 132, 199, 0.12)' 
                      : '0 4px 10px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isHighlighted 
                      ? '0 6px 18px rgba(2, 132, 199, 0.12)' 
                      : '0 4px 10px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Top Ribbon */}
                  <div style={{
                    backgroundColor: ribbonBg,
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
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {paper.isNew && <Sparkles size={12} />}
                      {paper.badge}
                    </span>
                    <span>{paper.session}</span>
                  </div>

                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Paper Title & Subject */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: paper.isNew ? '#f0fdf4' : '#eff6ff',
                        border: paper.isNew ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: paper.isNew ? '#16a34a' : '#0284c7',
                        flexShrink: 0
                      }}>
                        <BookOpen size={22} />
                      </div>

                      <div>
                        <h3 style={{
                          fontSize: '17px',
                          fontWeight: 800,
                          color: '#0f172a',
                          margin: '0 0 3px 0',
                          fontFamily: 'var(--font-heading)',
                          lineHeight: 1.3
                        }}>
                          {paper.title}
                        </h3>
                        <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 600 }}>
                          {paper.subject}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '13px',
                      color: '#475569',
                      lineHeight: 1.55,
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {paper.description}
                    </p>

                    {/* Topics covered chips */}
                    {paper.topics && paper.topics.length > 0 && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginBottom: '18px'
                      }}>
                        {paper.topics.slice(0, 4).map((topic, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              border: '1px solid #e2e8f0'
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                        {paper.topics.length > 4 && (
                          <span style={{
                            fontSize: '11px',
                            color: '#64748b',
                            padding: '3px 6px',
                            fontWeight: 600
                          }}>
                            +{paper.topics.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Key Stats Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                      marginBottom: '20px',
                      fontSize: '12px'
                    }}>
                      <div style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#334155'
                      }}>
                        <Clock size={14} color="#0284c7" />
                        <span><strong>Time:</strong> 2 Hours (120m)</span>
                      </div>

                      <div style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#334155'
                      }}>
                        <Award size={14} color="#16a34a" />
                        <span><strong>Questions:</strong> {paper.totalQuestions}</span>
                      </div>

                      <div style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#334155'
                      }}>
                        <Zap size={14} color="#f59e0b" />
                        <span><strong>Marks:</strong> {paper.totalMarks} (+2 / 0)</span>
                      </div>

                      <div style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#334155'
                      }}>
                        <CheckCircle2 size={14} color="#7c3aed" />
                        <span><strong>Feedback:</strong> Verified</span>
                      </div>
                    </div>

                    {/* Start Test Button */}
                    <div style={{ marginTop: 'auto' }}>
                      <button
                        id={`btn-start-${paper.id}`}
                        onClick={() => onSelectPaper(paper)}
                        style={{
                          width: '100%',
                          padding: '11px 18px',
                          borderRadius: '8px',
                          backgroundColor: '#16a34a',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 3px 6px rgba(22, 163, 74, 0.28)',
                          cursor: 'pointer',
                          border: 'none',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                      >
                        <Play size={16} fill="#ffffff" />
                        <span>Attempt {paper.shortTitle}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Testing Simulation Guidelines Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#004d73',
          margin: 0,
          fontFamily: 'var(--font-heading)'
        }}>
          Authentic NTA CBT Simulator & Unit Practice Highlights
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px',
          fontSize: '13px',
          color: '#475569',
          lineHeight: 1.55
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '16px' }}>✓</div>
            <div>
              <strong style={{ color: '#0f172a' }}>Standard NTA CBT Layout:</strong> Question panel with full options on the left, 5-status Question Palette on the right with countdown clock.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '16px' }}>✓</div>
            <div>
              <strong style={{ color: '#0f172a' }}>Official Actions:</strong> Save & Next, Save & Mark For Review, Clear Response, and Mark For Review & Next with authentic colors.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '16px' }}>✓</div>
            <div>
              <strong style={{ color: '#0f172a' }}>Topic-wise Instant Solution Mode:</strong> Click any option to immediately see right or wrong, view the step-by-step mathematical reasoning, and pull next questions continuously.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '16px' }}>✓</div>
            <div>
              <strong style={{ color: '#0f172a' }}>All 10 Computer Science Units:</strong> Over 1,100 questions aggregated across official UGC NET papers from 2020 to 2025.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
