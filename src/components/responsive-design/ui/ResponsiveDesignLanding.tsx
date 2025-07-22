"use client";

import React, { useState, useEffect } from "react";
import { FlexboxPlayground } from "./FlexboxPlayground";
import { FlexboxVisualizer } from "./FlexboxVisualizer";

interface ViewportSize {
  width: number;
  height: number;
  device: string;
}

const ResponsiveDesignLanding = () => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: 1200,
    height: 800,
    device: "desktop"
  });
  const [showGrid, setShowGrid] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<"flexbox" | "grid" | "media">("flexbox");
  
  // Shared flexbox state for connecting components
  const [sharedFlexDirection, setSharedFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">("row");
  const [sharedJustifyContent, setSharedJustifyContent] = useState<string>("flex-start");
  const [sharedAlignItems, setSharedAlignItems] = useState<string>("stretch");
  const [sharedFlexWrap, setSharedFlexWrap] = useState<"nowrap" | "wrap" | "wrap-reverse">("nowrap");
  const [sharedGap, setSharedGap] = useState<number>(8);

  const devicePresets = [
    { name: "Mobile", width: 375, height: 667, icon: "📱" },
    { name: "Tablet", width: 768, height: 1024, icon: "📱" },
    { name: "Desktop", width: 1200, height: 800, icon: "💻" },
    { name: "Wide", width: 1920, height: 1080, icon: "🖥️" }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewportSize({ width: window.innerWidth, height: window.innerHeight, device: "mobile" });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDeviceType = (width: number): string => {
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    if (width < 1920) return "desktop";
    return "wide";
  };

  return (
    <div className="space-y-8">
      {/* 뷰포트 시뮬레이터 */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
        <h2 className="text-2xl font-bold text-pink-900 mb-4">뷰포트 시뮬레이터</h2>
        
        {/* 디바이스 프리셋 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {devicePresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setViewportSize({
                width: preset.width,
                height: preset.height,
                device: preset.name.toLowerCase()
              })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewportSize.width === preset.width
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-pink-700 hover:bg-pink-200"
              }`}
            >
              {preset.icon} {preset.name}
            </button>
          ))}
        </div>

        {/* 커스텀 사이즈 입력 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-pink-700">Width:</label>
            <input
              type="range"
              min="320"
              max="1920"
              value={viewportSize.width}
              onChange={(e) => setViewportSize({
                ...viewportSize,
                width: parseInt(e.target.value),
                device: getDeviceType(parseInt(e.target.value))
              })}
              className="w-32"
            />
            <span className="text-pink-900 font-mono">{viewportSize.width}px</span>
          </div>
        </div>

        {/* 미리보기 영역 */}
        <div className="bg-white rounded-lg border-2 border-pink-200 overflow-hidden"
             style={{ maxWidth: "100%", height: "400px" }}>
          <div className="bg-gray-100 p-2 flex items-center gap-2 border-b">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-xs text-gray-600 font-mono">
              {viewportSize.width} x {viewportSize.height} ({getDeviceType(viewportSize.width)})
            </span>
          </div>
          
          <div className="h-full overflow-auto p-4" style={{ maxHeight: "350px" }}>
            <div className={`transition-all duration-300 mx-auto`} 
                 style={{ width: `${Math.min(viewportSize.width, 1200)}px` }}>
              {/* 반응형 데모 컨텐츠 */}
              <div className={`grid gap-4 ${
                viewportSize.width < 640 ? "grid-cols-1" :
                viewportSize.width < 1024 ? "grid-cols-2" : "grid-cols-3"
              }`}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-4 border border-blue-200">
                    <div className="h-24 bg-blue-200 rounded mb-2"></div>
                    <div className="h-4 bg-blue-300 rounded mb-1"></div>
                    <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 학습 섹션 선택 */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedDemo("flexbox")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedDemo === "flexbox"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Flexbox 레이아웃
        </button>
        <button
          onClick={() => setSelectedDemo("grid")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedDemo === "grid"
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          CSS Grid
        </button>
        <button
          onClick={() => setSelectedDemo("media")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedDemo === "media"
              ? "bg-purple-500 text-white"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          미디어 쿼리
        </button>
      </div>

      {/* Flexbox 데모 */}
      {selectedDemo === "flexbox" && (
        <div className="space-y-8">
          {/* 기존 정적 예제를 인터랙티브 컴포넌트로 교체 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Interactive Flexbox Playground</h3>
            <FlexboxPlayground 
              flexDirection={sharedFlexDirection}
              onFlexDirectionChange={setSharedFlexDirection}
              justifyContent={sharedJustifyContent}
              onJustifyContentChange={setSharedJustifyContent}
              alignItems={sharedAlignItems}
              onAlignItemsChange={setSharedAlignItems}
              flexWrap={sharedFlexWrap}
              onFlexWrapChange={setSharedFlexWrap}
              gap={sharedGap}
              onGapChange={setSharedGap}
            />
          </div>

          {/* Flexbox 축 시각화 */}
          <FlexboxVisualizer 
            flexDirection={sharedFlexDirection}
            justifyContent={sharedJustifyContent}
            alignItems={sharedAlignItems}
          />
        </div>
      )}

      {/* Grid 데모 */}
      {selectedDemo === "grid" && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-900 mb-4">CSS Grid 레이아웃</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-3">Grid Template Areas</p>
              <div className="grid grid-cols-3 gap-2" style={{ gridTemplateRows: "auto auto auto" }}>
                <div className="col-span-3 bg-green-400 text-white p-4 rounded text-center">Header</div>
                <div className="bg-green-300 text-white p-8 rounded text-center">Sidebar</div>
                <div className="col-span-2 bg-green-500 text-white p-8 rounded text-center">Main Content</div>
                <div className="col-span-3 bg-green-400 text-white p-4 rounded text-center">Footer</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="rounded"
                />
                <span className="text-green-700">Show Grid Lines</span>
              </label>
              
              <div className={`grid grid-cols-4 gap-2 ${showGrid ? "relative" : ""}`}>
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="grid grid-cols-4 gap-2 h-full">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-2 border-dashed border-green-300"></div>
                      ))}
                    </div>
                  </div>
                )}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className={`bg-emerald-400 text-white p-4 rounded text-center ${
                    i === 1 ? "col-span-2" : i === 5 ? "col-span-3" : ""
                  }`}>
                    {i}
                  </div>
                ))}
              </div>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Grid Areas */
.grid-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

/* 반응형 Grid */
@media (max-width: 768px) {
  .grid-layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}`}</pre>
          </div>
        </div>
      )}

      {/* 미디어 쿼리 데모 */}
      {selectedDemo === "media" && (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-purple-900 mb-4">미디어 쿼리 브레이크포인트</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3">일반적인 브레이크포인트</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <span className="text-purple-700">Mobile</span>
                  <code className="text-sm bg-purple-200 px-2 py-1 rounded">320px - 768px</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <span className="text-purple-700">Tablet</span>
                  <code className="text-sm bg-purple-200 px-2 py-1 rounded">768px - 1024px</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <span className="text-purple-700">Desktop</span>
                  <code className="text-sm bg-purple-200 px-2 py-1 rounded">1024px - 1920px</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <span className="text-purple-700">Wide Screen</span>
                  <code className="text-sm bg-purple-200 px-2 py-1 rounded">1920px+</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3">모바일 퍼스트 vs 데스크톱 퍼스트</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-purple-700 mb-2">📱 모바일 퍼스트 (권장)</h5>
                  <pre className="bg-gray-100 p-3 rounded text-sm">
{`/* Base styles for mobile */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}`}</pre>
                </div>
                <div>
                  <h5 className="font-medium text-purple-700 mb-2">💻 데스크톱 퍼스트</h5>
                  <pre className="bg-gray-100 p-3 rounded text-sm">
{`/* Base styles for desktop */
.container {
  max-width: 1200px;
  padding: 2rem;
}

/* Tablet and down */
@media (max-width: 1024px) {
  .container {
    max-width: 750px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 1rem;
  }
}`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-purple-100 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">💡 미디어 쿼리 팁</h4>
              <ul className="space-y-1 text-purple-700 text-sm">
                <li>• rem 단위 사용으로 접근성 향상</li>
                <li>• 논리적 브레이크포인트 선택 (콘텐츠 기반)</li>
                <li>• orientation, hover 등 다양한 미디어 특성 활용</li>
                <li>• 컨테이너 쿼리 고려 (최신 CSS)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 실습 과제 */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">🎯 실습 과제</h3>
        <ol className="space-y-2 text-gray-700">
          <li>1. Flexbox를 사용해 반응형 네비게이션 바 만들기</li>
          <li>2. CSS Grid로 반응형 갤러리 레이아웃 구현하기</li>
          <li>3. 미디어 쿼리로 모바일/태블릿/데스크톱 레이아웃 전환하기</li>
          <li>4. 터치 친화적인 모바일 인터페이스 설계하기</li>
        </ol>
      </div>
    </div>
  );
};

export { ResponsiveDesignLanding };