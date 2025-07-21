"use client";

import React, { useState, useEffect, useRef } from "react";

interface CodeState {
  html: string;
  css: string;
  javascript: string;
}

interface RenderingMetrics {
  domNodes: number;
  cssRules: number;
  renderTime: number;
  layoutTime: number;
  paintTime: number;
}

const defaultCode: CodeState = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>렌더링 테스트</title>
</head>
<body>
  <div class="container">
    <h1 id="title">안녕하세요!</h1>
    <p class="description">이것은 렌더링 테스트입니다.</p>
    <button onclick="changeColor()">색상 변경</button>
  </div>
</body>
</html>`,
  css: `.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

#title {
  color: #1e40af;
  text-align: center;
  transition: color 0.3s ease;
}

.description {
  color: #6b7280;
  line-height: 1.6;
  margin: 16px 0;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #2563eb;
}`,
  javascript: `function changeColor() {
  const title = document.getElementById('title');
  const colors = ['#e11d48', '#059669', '#7c3aed', '#dc2626', '#0891b2'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  title.style.color = randomColor;
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('페이지 렌더링 완료!');
});`,
};

const InteractiveCodeEditor = () => {
  const [code, setCode] = useState<CodeState>(defaultCode);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "javascript">(
    "html"
  );
  const [isRendering, setIsRendering] = useState(false);
  const [renderingMetrics, setRenderingMetrics] = useState<RenderingMetrics>({
    domNodes: 0,
    cssRules: 0,
    renderTime: 0,
    layoutTime: 0,
    paintTime: 0,
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 코드 변경 시 자동 렌더링 (디바운스)
  useEffect(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    renderTimeoutRef.current = setTimeout(() => {
      renderPreview();
    }, 500);

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const calculateMetrics = (
    htmlContent: string,
    cssContent: string
  ): RenderingMetrics => {
    // DOM 노드 수 추정 (태그 수)
    const domNodes = (htmlContent.match(/<[^/>]+>/g) || []).length;

    // CSS 규칙 수 추정
    const cssRules = (cssContent.match(/[^}]+{[^}]*}/g) || []).length;

    // 렌더링 시간 시뮬레이션 (복잡도 기반)
    const baseTime = 10;
    const renderTime = baseTime + domNodes * 2 + cssRules * 3;
    const layoutTime = domNodes * 1.5 + cssRules * 1;
    const paintTime = domNodes * 1 + cssRules * 0.5;

    return {
      domNodes,
      cssRules,
      renderTime: Math.round(renderTime),
      layoutTime: Math.round(layoutTime),
      paintTime: Math.round(paintTime),
    };
  };

  const renderPreview = () => {
    if (!iframeRef.current) return;

    setIsRendering(true);

    // 메트릭 계산
    const metrics = calculateMetrics(code.html, code.css);
    setRenderingMetrics(metrics);

    // iframe에 코드 렌더링
    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 20px; }
          ${code.css}
        </style>
      </head>
      <body>
        ${code.html.replace(
          /<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>|<!DOCTYPE[^>]*>/gi,
          ""
        )}
        <script>
          ${code.javascript}
        </script>
      </body>
      </html>
    `;

    const iframe = iframeRef.current;
    iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(fullHTML);

    // 렌더링 완료 시뮬레이션
    setTimeout(() => {
      setIsRendering(false);
    }, metrics.renderTime);
  };

  const handleCodeChange = (type: keyof CodeState, value: string) => {
    setCode((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const resetCode = () => {
    setCode(defaultCode);
  };

  const loadExample = (exampleType: "simple" | "complex" | "animation") => {
    switch (exampleType) {
      case "simple":
        setCode({
          html: "<h1>Simple Page</h1><p>This is a simple page.</p>",
          css: "h1 { color: blue; } p { color: gray; }",
          javascript: 'console.log("Simple page loaded");',
        });
        break;
      case "complex":
        setCode({
          html: `<div class="grid">
  ${Array.from(
    { length: 12 },
    (_, i) => `<div class="card">Card ${i + 1}</div>`
  ).join("\n  ")}
</div>`,
          css: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}`,
          javascript: `document.querySelectorAll('.card').forEach((card, index) => {
  card.addEventListener('click', () => {
    card.style.background = \`hsl(\${index * 30}, 70%, 60%)\`;
  });
});`,
        });
        break;
      case "animation":
        setCode({
          html: `<div class="animation-container">
  <div class="box" id="animatedBox">Click me!</div>
  <button onclick="startAnimation()">Start Animation</button>
</div>`,
          css: `.animation-container {
  text-align: center;
  padding: 40px;
}

.box {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  margin: 20px auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.box:hover {
  transform: scale(1.1);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 2s linear infinite;
}`,
          javascript: `function startAnimation() {
  const box = document.getElementById('animatedBox');
  box.classList.toggle('spinning');
}

document.getElementById('animatedBox').addEventListener('click', startAnimation);`,
        });
        break;
    }
  };

  const tabs = [
    { id: "html", label: "HTML", icon: "📄" },
    { id: "css", label: "CSS", icon: "🎨" },
    { id: "javascript", label: "JavaScript", icon: "⚡" },
  ] as const;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ⚡ 인터랙티브 코드 에디터
        </h2>
        <p className="text-gray-600">
          실시간으로 HTML, CSS, JavaScript를 편집하며 브라우저 렌더링 과정을
          체험해보세요.
        </p>
      </div>

      {/* Example Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => loadExample("simple")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          🟢 간단한 예제
        </button>
        <button
          onClick={() => loadExample("complex")}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          🟠 복잡한 예제
        </button>
        <button
          onClick={() => loadExample("animation")}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          🟣 애니메이션 예제
        </button>
        <button
          onClick={resetCode}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          🔄 초기화
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            코드 에디터
          </h3>

          {/* Tab Navigation */}
          <div className="flex mb-4 bg-white rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }
                `}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Code Textarea */}
          <div className="relative">
            <textarea
              value={code[activeTab]}
              onChange={(e) => handleCodeChange(activeTab, e.target.value)}
              className="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`${activeTab.toUpperCase()} 코드를 입력하세요...`}
            />
            {isRendering && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                렌더링 중...
              </div>
            )}
          </div>

          {/* Rendering Metrics */}
          <div className="mt-4 bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              📊 렌더링 메트릭
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">DOM 노드:</span>
                <span className="font-semibold ml-2">
                  {renderingMetrics.domNodes}
                </span>
              </div>
              <div>
                <span className="text-gray-600">CSS 규칙:</span>
                <span className="font-semibold ml-2">
                  {renderingMetrics.cssRules}
                </span>
              </div>
              <div>
                <span className="text-gray-600">렌더링 시간:</span>
                <span className="font-semibold ml-2">
                  {renderingMetrics.renderTime}ms
                </span>
              </div>
              <div>
                <span className="text-gray-600">레이아웃:</span>
                <span className="font-semibold ml-2">
                  {renderingMetrics.layoutTime}ms
                </span>
              </div>
              <div>
                <span className="text-gray-600">페인트:</span>
                <span className="font-semibold ml-2">
                  {renderingMetrics.paintTime}ms
                </span>
              </div>
              <div>
                <span className="text-gray-600">총 시간:</span>
                <span className="font-semibold ml-2">
                  {renderingMetrics.renderTime +
                    renderingMetrics.layoutTime +
                    renderingMetrics.paintTime}
                  ms
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              실시간 미리보기
            </h3>
            {isRendering && (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">렌더링 중...</span>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              className="w-full h-96 border-none"
              title="Code Preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-4">
          💡 렌더링 최적화 실험
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              CSS 최적화 실험
            </h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• 복잡한 선택자 vs 간단한 선택자</li>
              <li>• CSS 애니메이션 vs JavaScript 애니메이션</li>
              <li>• Flexbox vs Grid vs Float</li>
              <li>• Inline 스타일 vs 외부 CSS</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              DOM 최적화 실험
            </h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• DOM 깊이가 렌더링에 미치는 영향</li>
              <li>• 요소 수 증가에 따른 성능 변화</li>
              <li>• 동적 요소 추가 vs 정적 HTML</li>
              <li>• 이미지 로딩과 레이아웃 시프트</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InteractiveCodeEditor };
