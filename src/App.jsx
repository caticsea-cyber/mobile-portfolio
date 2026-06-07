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
    { id: 'c1', title: '경영정보시각화능력(Tableau)', desc: '태블로(Tableau)를 활용한 비즈니스 데이터 시각화 및 인사이트 도출 역량 인증.', image: './public/1-1.png', tags: ['Tableau', 'BI'] },
    { id: 'c2', title: '빅데이터분석기사(Python)', desc: '파이썬(Python) 기반의 데이터 수집, 전처리, 모델링 및 분석을 아우르는 국가 공인 자격증.', image: './public/1-2.png', tags: ['Python', 'Big Data'] },
    { id: 'c3', title: 'AI-POT(AI 프롬프트 활용능력)', desc: '생성형 AI를 실무에 효과적으로 적용하기 위한 프롬프트 엔지니어링 및 활용 자격증.', image: './public/1-3.png', tags: ['AI', 'Prompt'] }
  ],
  canva: [
    { id: 'cv1', title: '광명시립도서관 전시실 이용현황 분석', desc: '5개 시립도서관의 전시실 이용에 대한 테마별 관람자 현황 분석결과를 시각화.', image: './public/2-1.png', tags: ['Design', 'Infographic'] },
    { id: 'cv2', title: '동태찌개 요리법 마인드맵', desc: '음식 조리법을 한 눈에 볼 수 있는 마인드맵 형태로 표현.', image: './public/2-2.png', tags: ['Mindmap', 'Canva'] }
  ],
  tableau: [
    { id: 't1', title: '광명시 ESG 대시보드', desc: '환경(E)·사회(S)·지배구조(G) 성과와 지표를 한눈에 확인할 수 있는 인터랙티브 대시보드.', image: './public/3-1.png', tags: ['Dashboard', 'ESG'] },
    { id: 't2', title: '광명시 권역별 주거·자산·대출 분석', desc: 'GIS 기반의 광명시 권역별 아파트 시세·소유주 자산/소득/대출(전세금 포함) 연관성 분석.', image: './public/3-2.png', tags: ['GIS', 'Analysis'] }
  ],
  work: [
    { id: 'w1', title: 'YouTube Long Form: 나는, 루비!', desc: 'Adobe Premiere Pro 활용. 원본 동영상, 이미지는 동생이 제공.', image: 'https://img.youtube.com/vi/dbiK49gFEHM/hqdefault.jpg', youtubeId: 'dbiK49gFEHM', tags: ['Long Form', 'Premiere'] },
    { id: 'w2', title: 'YouTube Short Form: 기차는 8시에 떠나네', desc: 'Google Storybook, Gemini, ChatGPT, vStory, YTCreate 활용.', image: 'https://img.youtube.com/vi/qIDVGYM35P4/hqdefault.jpg', youtubeId: 'qIDVGYM35P4', tags: ['Shorts', 'YouTube'] },
    { id: 'w3', title: '3D Modeling&Printing: 불의 정령 살라만다', desc: '생성형 AI, Bamboo Studio, Autodesk Fusion 활용. Bamboo Lab 출력.', image: './public/4-3.jpg', tags: ['3D Modeling', '3D Printing'] }
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
          {item.youtubeId ? (
            <div className="sheet-video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', marginBottom: '16px' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img src={item.image} alt={item.title} className="sheet-image" />
          )}
          <div className="sheet-meta">
            {item.tags?.map(tag => (
              <span key={tag} className="sheet-tag">{tag}</span>
            ))}
          </div>
          <h2 className="sheet-title">{item.title}</h2>
          <p className="sheet-desc">
            {item.desc}
            <br /><br /><br /><br />
            {/* PHS 주석처리 : 이 프로젝트를 통해 얻은 인사이트와 성과를 중심으로 상세한 내용을 확인할 수 있습니다. 시각적으로 깔끔하고 모바일 환경에서 읽기 쉽도록 최적화된 콘텐츠 영역입니다.*/}
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
          {activeCategory ? activeCategory.title : 'My day is .today'}
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
                    {/*PHS: 아이콘 안보이게 주석처리 */}
                    {/*Icon && cat.id !== 'work' && (
                      <div className="category-icon">
                        <Icon size={24} />
                      </div>
                    )*/}
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
