import React, { useState, useEffect } from 'react';
import { Award, PenTool, BarChart2, Briefcase, ChevronLeft, X } from 'lucide-react';
import './index.css';


// Mock Data
const categories = [
  { id: 'certs', title: 'Certifications', icon: Award, desc: 'Certifications' },
  { id: 'canva', title: 'Infographics with Canva', icon: PenTool, desc: 'Canva Designs' },
  { id: 'tableau', title: 'Data Analysis', icon: BarChart2, desc: 'Tableau Data Analysis' },
  { id: 'work', title: 'for Fun', icon: Briefcase, desc: 'Work Experience' },
];

const mockItems = {
  certs: [
    { id: 'c1', title: '경영정보시각화능력(Tableau)', desc: '태블로(Tableau)를 활용한 비즈니스 데이터 시각화 및 인사이트 도출 역량 인증.', image: 'https://images.unsplash.com/photo-1546410531-bea5aadcb6ce?auto=format&fit=crop&w=400&q=80', tags: ['Tableau', 'BI'] },
    { id: 'c2', title: '빅데이터분석기사(Python)', desc: '파이썬(Python) 기반의 데이터 수집, 전처리, 모델링 및 분석을 아우르는 국가 공인 자격증.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80', tags: ['Python', 'Big Data'] },
    { id: 'c3', title: 'AI-POT(AI 프롬프트 활용능력)', desc: '생성형 AI를 실무에 효과적으로 적용하기 위한 프롬프트 엔지니어링 및 활용 자격증.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80', tags: ['AI', 'Prompt'] }
  ],
  canva: [
    { id: 'cv1', title: '브랜드 리뉴얼 캠페인', desc: '소셜 미디어 홍보를 위한 브랜드 리뉴얼 포스터 및 배너 디자인.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80', tags: ['Design', 'Social Media'] },
    { id: 'cv2', title: '사내 워크샵 인포그래픽', desc: '사내 행사 요약 및 실적 공유를 위한 깔끔한 인포그래픽 제작.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80', tags: ['Infographic', 'Canva'] }
  ],
  tableau: [
    { id: 't1', title: '분기별 매출 대시보드', desc: '지역별, 카테고리별 분기 매출 트렌드를 시각화한 인터랙티브 대시보드.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', tags: ['Dashboard', 'Sales'] },
    { id: 't2', title: '고객 이탈율 분석', desc: '코호트 분석을 통한 고객 유지율 및 이탈 요인 시각화.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80', tags: ['Analysis', 'Churn'] }
  ],
  work: [
    { id: 'w1', title: '마케팅 자동화 파이프라인 구축', desc: '업무 효율성을 30% 향상시킨 마케팅 데이터 수집 자동화 프로젝트.', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80', tags: ['Automation', 'Project'] },
    { id: 'w2', title: '신규 서비스 런칭 성공', desc: '런칭 1개월 만에 가입자 1만 명을 달성한 신규 서비스 기획 및 운영.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', tags: ['Planning', 'Launch'] }
  ]
};

function BottomSheet({ isOpen, item, onClose }) {
  if (!item) return null;

  return (
    <>
      <div 
        className={`bottom-sheet-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
        <div className="sheet-handle-container" onClick={onClose}>
          <div className="sheet-handle"></div>
        </div>
        <div className="sheet-content fade-enter">
          <img src={item.image} alt={item.title} className="sheet-image" />
          <div className="sheet-meta">
            {item.tags?.map(tag => (
              <span key={tag} className="sheet-tag">{tag}</span>
            ))}
          </div>
          <h2 className="sheet-title">{item.title}</h2>
          <p className="sheet-desc">
            {item.desc}
            <br/><br/>
            이 프로젝트를 통해 얻은 인사이트와 성과를 중심으로 상세한 내용을 확인할 수 있습니다. 시각적으로 깔끔하고 모바일 환경에서 읽기 쉽도록 최적화된 콘텐츠 영역입니다.
          </p>
        </div>
      </div>
    </>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Prevent background scrolling when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isSheetOpen]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Slight delay to ensure content renders before animation starts
    setTimeout(() => setIsSheetOpen(true), 10);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    // Wait for transition to finish before removing item
    setTimeout(() => setActiveItem(null), 400);
  };

  const currentItems = activeCategory ? mockItems[activeCategory.id] : [];

  return (
    <div className="container">
      {/* Header */}
      <header className="app-header">
        {activeCategory && (
          <button className="back-button" onClick={() => setActiveCategory(null)} aria-label="Back">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="app-title">
          {activeCategory ? activeCategory.title : 'Portfolio'}
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="fade-enter" style={{ marginTop: '20px' }}>
        {!activeCategory ? (
          // Main Screen
          <>
            <div className="category-grid">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className={`category-card${cat.id === 'work' ? ' work' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {Icon && cat.id !== 'work' && (
                      <div className="category-icon">
                        <Icon size={24} />
                      </div>
                    )}
                    <h3 className="category-title">{cat.title}</h3>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '30px', textAlign: 'center', padding: '0 20px' }}>
              <img src="/portfolio-logo.png" alt="Portfolio Logo" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </div>
          </>
        ) : (
          // Gallery View
          <div className="gallery-list">
            {currentItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="gallery-item fade-enter"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => handleItemClick(item)}
              >
                <img src={item.image} alt={item.title} className="gallery-image" />
                <div className="gallery-content">
                  <h4 className="gallery-title">{item.title}</h4>
                  <p className="gallery-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Bottom Sheet */}
      <BottomSheet 
        isOpen={isSheetOpen} 
        item={activeItem} 
        onClose={handleCloseSheet} 
      />
    </div>
  );
}

export default App;
