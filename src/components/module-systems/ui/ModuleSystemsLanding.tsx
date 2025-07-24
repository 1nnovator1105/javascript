"use client";

import React, { useState } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";
import { getColorClass } from "@/utils/colorMigration";

interface Module {
  id: string;
  name: string;
  type: "CommonJS" | "ESM" | "AMD";
  dependencies: string[];
  exports: string[];
  code: string;
}

interface DependencyNode {
  id: string;
  name: string;
  x: number;
  y: number;
  dependencies: string[];
}

const ModuleSystemsLanding = () => {
  const [selectedSystem, setSelectedSystem] = useState<
    "CommonJS" | "ESM" | "AMD"
  >("ESM");
  const [showDependencyGraph, setShowDependencyGraph] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>("main");

  // 모듈 시스템 설명
  const moduleSystems = {
    CommonJS: {
      name: "CommonJS",
      description: "Node.js의 기본 모듈 시스템",
      year: "2009",
      environment: "서버 (Node.js)",
      syntax: "require() / module.exports",
      loading: "동기적",
      color: "green",
    },
    ESM: {
      name: "ES Modules (ESM)",
      description: "JavaScript의 공식 표준 모듈 시스템",
      year: "2015 (ES6)",
      environment: "브라우저 & Node.js",
      syntax: "import / export",
      loading: "비동기적",
      color: "blue",
    },
    AMD: {
      name: "Asynchronous Module Definition",
      description: "브라우저 환경을 위한 비동기 모듈 시스템",
      year: "2010",
      environment: "브라우저 (RequireJS)",
      syntax: "define() / require()",
      loading: "비동기적",
      color: "purple",
    },
  };

  // 예제 모듈들
  const modules: Record<string, Module> = {
    main: {
      id: "main",
      name: "main.js",
      type: selectedSystem,
      dependencies: ["utils", "api"],
      exports: [],
      code:
        selectedSystem === "CommonJS"
          ? `// CommonJS
const utils = require('./utils');
const api = require('./api');

function main() {
  const data = api.fetchData();
  const result = utils.process(data);
  console.log(result);
}

module.exports = main;`
          : selectedSystem === "ESM"
          ? `// ES Modules
import { process } from './utils.js';
import { fetchData } from './api.js';

function main() {
  const data = fetchData();
  const result = process(data);
  console.log(result);
}

export default main;`
          : `// AMD
define(['./utils', './api'], function(utils, api) {
  function main() {
    const data = api.fetchData();
    const result = utils.process(data);
    console.log(result);
  }
  
  return main;
});`,
    },
    utils: {
      id: "utils",
      name: "utils.js",
      type: selectedSystem,
      dependencies: ["constants"],
      exports: ["process", "format"],
      code:
        selectedSystem === "CommonJS"
          ? `// CommonJS
const { MAX_SIZE } = require('./constants');

function process(data) {
  return data.slice(0, MAX_SIZE);
}

function format(text) {
  return text.toUpperCase();
}

module.exports = { process, format };`
          : selectedSystem === "ESM"
          ? `// ES Modules
import { MAX_SIZE } from './constants.js';

export function process(data) {
  return data.slice(0, MAX_SIZE);
}

export function format(text) {
  return text.toUpperCase();
}`
          : `// AMD
define(['./constants'], function(constants) {
  function process(data) {
    return data.slice(0, constants.MAX_SIZE);
  }
  
  function format(text) {
    return text.toUpperCase();
  }
  
  return { process, format };
});`,
    },
    api: {
      id: "api",
      name: "api.js",
      type: selectedSystem,
      dependencies: ["config"],
      exports: ["fetchData", "postData"],
      code:
        selectedSystem === "CommonJS"
          ? `// CommonJS
const config = require('./config');

async function fetchData() {
  const response = await fetch(config.API_URL);
  return response.json();
}

function postData(data) {
  // API call implementation
}

module.exports = { fetchData, postData };`
          : selectedSystem === "ESM"
          ? `// ES Modules
import config from './config.js';

export async function fetchData() {
  const response = await fetch(config.API_URL);
  return response.json();
}

export function postData(data) {
  // API call implementation
}`
          : `// AMD
define(['./config'], function(config) {
  async function fetchData() {
    const response = await fetch(config.API_URL);
    return response.json();
  }
  
  function postData(data) {
    // API call implementation
  }
  
  return { fetchData, postData };
});`,
    },
    constants: {
      id: "constants",
      name: "constants.js",
      type: selectedSystem,
      dependencies: [],
      exports: ["MAX_SIZE", "MIN_SIZE"],
      code:
        selectedSystem === "CommonJS"
          ? `// CommonJS
module.exports = {
  MAX_SIZE: 100,
  MIN_SIZE: 10,
  DEFAULT_TIMEOUT: 5000
};`
          : selectedSystem === "ESM"
          ? `// ES Modules
export const MAX_SIZE = 100;
export const MIN_SIZE = 10;
export const DEFAULT_TIMEOUT = 5000;`
          : `// AMD
define([], function() {
  return {
    MAX_SIZE: 100,
    MIN_SIZE: 10,
    DEFAULT_TIMEOUT: 5000
  };
});`,
    },
    config: {
      id: "config",
      name: "config.js",
      type: selectedSystem,
      dependencies: [],
      exports: ["default"],
      code:
        selectedSystem === "CommonJS"
          ? `// CommonJS
module.exports = {
  API_URL: 'https://api.example.com',
  API_KEY: process.env.API_KEY,
  DEBUG: true
};`
          : selectedSystem === "ESM"
          ? `// ES Modules
export default {
  API_URL: 'https://api.example.com',
  API_KEY: process.env.API_KEY,
  DEBUG: true
};`
          : `// AMD
define([], function() {
  return {
    API_URL: 'https://api.example.com',
    API_KEY: process.env.API_KEY,
    DEBUG: true
  };
});`,
    },
  };

  // 의존성 그래프 노드 위치 계산
  const calculateNodePositions = (): DependencyNode[] => {
    const nodes: DependencyNode[] = [
      { id: "main", name: "main.js", x: 200, y: 50, dependencies: ["utils", "api"] },
      { id: "utils", name: "utils.js", x: 100, y: 150, dependencies: ["constants"] },
      { id: "api", name: "api.js", x: 300, y: 150, dependencies: ["config"] },
      { id: "constants", name: "constants.js", x: 100, y: 250, dependencies: [] },
      { id: "config", name: "config.js", x: 300, y: 250, dependencies: [] },
    ];
    return nodes;
  };

  const dependencyNodes = calculateNodePositions();

  // import/export 문법 비교
  const syntaxComparison = {
    export: {
      CommonJS: [
        { desc: "단일 내보내기", code: "module.exports = myFunction;" },
        { desc: "여러 내보내기", code: "module.exports = { func1, func2 };" },
        { desc: "개별 추가", code: "exports.myFunc = myFunction;" },
      ],
      ESM: [
        { desc: "기본 내보내기", code: "export default myFunction;" },
        { desc: "명명된 내보내기", code: "export { func1, func2 };" },
        { desc: "인라인 내보내기", code: "export const myFunc = () => {};" },
      ],
      AMD: [
        { desc: "객체 반환", code: "return { func1, func2 };" },
        { desc: "함수 반환", code: "return myFunction;" },
        { desc: "의존성과 함께", code: "define(['dep'], function(dep) { return {}; });" },
      ],
    },
    import: {
      CommonJS: [
        { desc: "전체 가져오기", code: "const module = require('./module');" },
        { desc: "구조 분해", code: "const { func1, func2 } = require('./module');" },
        { desc: "조건부 가져오기", code: "if (condition) require('./module');" },
      ],
      ESM: [
        { desc: "기본 가져오기", code: "import module from './module.js';" },
        { desc: "명명된 가져오기", code: "import { func1, func2 } from './module.js';" },
        { desc: "동적 가져오기", code: "const module = await import('./module.js');" },
      ],
      AMD: [
        { desc: "의존성 정의", code: "require(['module'], function(module) {});" },
        { desc: "설정과 함께", code: "requirejs.config({ paths: {} });" },
        { desc: "조건부 로드", code: "require(['module'], callback, errorCallback);" },
      ],
    },
  };

  // 순환 참조 예제
  const circularDependencyExample = {
    moduleA: `// moduleA.js
${selectedSystem === "CommonJS" ? `const moduleB = require('./moduleB');
console.log('moduleA loading');
exports.a = 'A';
console.log('moduleB.b:', moduleB.b); // undefined!` 
: selectedSystem === "ESM" ? `import { b } from './moduleB.js';
console.log('moduleA loading');
export const a = 'A';
console.log('moduleB.b:', b); // ReferenceError!`
: `define(['moduleB'], function(moduleB) {
  console.log('moduleA loading');
  console.log('moduleB.b:', moduleB.b);
  return { a: 'A' };
});`}`,
    moduleB: `// moduleB.js
${selectedSystem === "CommonJS" ? `const moduleA = require('./moduleA');
console.log('moduleB loading');
exports.b = 'B';
console.log('moduleA.a:', moduleA.a); // 'A'`
: selectedSystem === "ESM" ? `import { a } from './moduleA.js';
console.log('moduleB loading');
export const b = 'B';
console.log('moduleA.a:', a);`
: `define(['moduleA'], function(moduleA) {
  console.log('moduleB loading');
  console.log('moduleA.a:', moduleA.a);
  return { b: 'B' };
});`}`,
  };

  return (
    <StudyPageLayout
      title="JavaScript 모듈 시스템"
      subtitle="CommonJS, ES Modules, AMD의 차이점과 번들러가 처리하는 과정을 학습합니다"
      showBackButton
    >
      <div className="space-y-8">
        {/* 모듈 시스템 선택 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">모듈 시스템 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(moduleSystems).map(([key, system]) => (
              <button
                key={key}
                onClick={() =>
                  setSelectedSystem(key as "CommonJS" | "ESM" | "AMD")
                }
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedSystem === key
                    ? `border-${system.color}-500 bg-${system.color}-50`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="font-bold text-lg mb-1">{system.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {system.description}
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>📅 {system.year}</div>
                  <div>🌍 {system.environment}</div>
                  <div>💻 {system.syntax}</div>
                  <div>⚡ {system.loading}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 모듈 코드 예제 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 모듈 선택 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">모듈 구조</h3>
            <div className="space-y-2">
              {Object.entries(modules).map(([key, module]) => (
                <button
                  key={key}
                  onClick={() => setSelectedModule(key)}
                  className={`w-full text-left p-3 rounded border transition-all ${
                    selectedModule === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-mono font-semibold">
                        {module.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        의존성: {module.dependencies.join(", ") || "없음"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {module.exports.length > 0 && (
                        <span>exports: {module.exports.length}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 의존성 그래프 토글 */}
            <button
              onClick={() => setShowDependencyGraph(!showDependencyGraph)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {showDependencyGraph ? "코드 보기" : "의존성 그래프 보기"}
            </button>
          </div>

          {/* 코드 표시 또는 의존성 그래프 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {showDependencyGraph ? (
              <div>
                <h3 className="text-lg font-bold mb-4">의존성 그래프</h3>
                <div className="relative h-80 bg-gray-50 rounded overflow-hidden">
                  <svg className="w-full h-full">
                    {/* 연결선 그리기 */}
                    {dependencyNodes.map((node) =>
                      node.dependencies.map((dep) => {
                        const targetNode = dependencyNodes.find(
                          (n) => n.id === dep
                        );
                        if (!targetNode) return null;
                        return (
                          <line
                            key={`${node.id}-${dep}`}
                            x1={node.x}
                            y1={node.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            stroke="#94a3b8"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                        );
                      })
                    )}
                    {/* 화살표 정의 */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3, 0 6"
                          fill="#94a3b8"
                        />
                      </marker>
                    </defs>
                    {/* 노드 그리기 */}
                    {dependencyNodes.map((node) => (
                      <g key={node.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="30"
                          fill={
                            selectedModule === node.id
                              ? "#3b82f6"
                              : "#e2e8f0"
                          }
                          stroke={
                            selectedModule === node.id
                              ? "#1e40af"
                              : "#94a3b8"
                          }
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedModule(node.id)}
                        />
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          className="text-xs font-mono fill-gray-700 pointer-events-none"
                        >
                          {node.name}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {modules[selectedModule].name}
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{modules[selectedModule].code}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* import/export 문법 비교 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Import/Export 문법 비교</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export 문법 */}
            <div>
              <h4 className="font-semibold mb-3">Export 문법</h4>
              <div className="space-y-4">
                {Object.entries(syntaxComparison.export).map(
                  ([system, examples]) => (
                    <div
                      key={system}
                      className={`p-3 rounded border ${
                        selectedSystem === system
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <h5 className="font-semibold text-sm mb-2">{system}</h5>
                      <div className="space-y-2">
                        {examples.map((ex, index) => (
                          <div key={index}>
                            <div className="text-xs text-gray-600">
                              {ex.desc}
                            </div>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded block mt-1">
                              {ex.code}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Import 문법 */}
            <div>
              <h4 className="font-semibold mb-3">Import 문법</h4>
              <div className="space-y-4">
                {Object.entries(syntaxComparison.import).map(
                  ([system, examples]) => (
                    <div
                      key={system}
                      className={`p-3 rounded border ${
                        selectedSystem === system
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <h5 className="font-semibold text-sm mb-2">{system}</h5>
                      <div className="space-y-2">
                        {examples.map((ex, index) => (
                          <div key={index}>
                            <div className="text-xs text-gray-600">
                              {ex.desc}
                            </div>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded block mt-1">
                              {ex.code}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 동적 import */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">동적 Import</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">ES Modules (권장)</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                <pre>{`// 조건부 로딩
if (condition) {
  const module = await import('./heavy-module.js');
  module.doSomething();
}

// 지연 로딩
button.addEventListener('click', async () => {
  const { Modal } = await import('./modal.js');
  new Modal().show();
});

// 경로 동적 결정
const locale = getUserLocale();
const messages = await import(\`./i18n/\${locale}.js\`);`}</pre>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">번들러 최적화</h4>
              <div className="p-4 bg-yellow-50 rounded">
                <h5 className="font-semibold text-yellow-800 mb-2">
                  Code Splitting
                </h5>
                <p className="text-sm text-gray-700 mb-2">
                  동적 import는 번들러가 코드를 분할하는 지점이 됩니다.
                </p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Webpack: 자동으로 청크 생성</li>
                  <li>• Vite: ES 모듈 기반 최적화</li>
                  <li>• Rollup: 수동 청크 설정 가능</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 순환 참조 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">순환 참조 (Circular Dependencies)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-mono text-sm font-semibold mb-2">moduleA.js</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                <pre>{circularDependencyExample.moduleA}</pre>
              </div>
            </div>
            <div>
              <h4 className="font-mono text-sm font-semibold mb-2">moduleB.js</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                <pre>{circularDependencyExample.moduleB}</pre>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded">
            <h4 className="font-semibold text-red-700 mb-2">⚠️ 순환 참조 문제</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• CommonJS: 부분적으로 내보낸 객체 반환 (undefined 가능)</li>
              <li>• ES Modules: ReferenceError 발생 가능</li>
              <li>• AMD: 의존성 해결 실패</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              <strong>해결책:</strong> 의존성 구조 재설계, 지연 로딩, 또는 의존성 주입 패턴 사용
            </p>
          </div>
        </div>

        {/* 모듈 시스템 비교표 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">모듈 시스템 상세 비교</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">특징</th>
                  <th className="text-left py-2 px-4">CommonJS</th>
                  <th className="text-left py-2 px-4">ES Modules</th>
                  <th className="text-left py-2 px-4">AMD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold">로딩 방식</td>
                  <td className="py-2 px-4">동기적</td>
                  <td className="py-2 px-4">비동기적</td>
                  <td className="py-2 px-4">비동기적</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold">주 사용처</td>
                  <td className="py-2 px-4">Node.js</td>
                  <td className="py-2 px-4">브라우저 & Node.js</td>
                  <td className="py-2 px-4">브라우저 (레거시)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold">Tree Shaking</td>
                  <td className="py-2 px-4 text-red-600">❌ 불가능</td>
                  <td className="py-2 px-4 text-green-600">✅ 가능</td>
                  <td className="py-2 px-4 text-red-600">❌ 불가능</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold">정적 분석</td>
                  <td className="py-2 px-4 text-orange-600">△ 제한적</td>
                  <td className="py-2 px-4 text-green-600">✅ 가능</td>
                  <td className="py-2 px-4 text-orange-600">△ 제한적</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold">순환 참조</td>
                  <td className="py-2 px-4">부분 지원</td>
                  <td className="py-2 px-4">에러 발생</td>
                  <td className="py-2 px-4">처리 어려움</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">브라우저 지원</td>
                  <td className="py-2 px-4">번들러 필요</td>
                  <td className="py-2 px-4">모던 브라우저</td>
                  <td className="py-2 px-4">라이브러리 필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 마이그레이션 가이드 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">CommonJS → ES Modules 마이그레이션</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded">
                <h4 className="font-semibold text-red-700 mb-2">❌ Before (CommonJS)</h4>
                <pre className="text-xs bg-white p-2 rounded">
{`const fs = require('fs');
const { readFile } = require('fs/promises');

class MyClass {
  // ...
}

module.exports = MyClass;
module.exports.helper = () => {};`}
                </pre>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-semibold text-green-700 mb-2">✅ After (ES Modules)</h4>
                <pre className="text-xs bg-white p-2 rounded">
{`import fs from 'fs';
import { readFile } from 'fs/promises';

export default class MyClass {
  // ...
}

export const helper = () => {};`}
                </pre>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold text-blue-700 mb-2">
                💡 마이그레이션 팁
              </h4>
              <ul className="text-sm space-y-1">
                <li>• package.json에 &quot;type&quot;: &quot;module&quot; 추가</li>
                <li>• .js 확장자를 명시적으로 포함</li>
                <li>• __dirname, __filename 대신 import.meta.url 사용</li>
                <li>• require() 대신 동적 import() 사용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
};

export default ModuleSystemsLanding;