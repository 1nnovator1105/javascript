"use client";

import React from "react";

const MemoryManagementLanding = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl p-8 border border-lime-200">
        <h2 className="text-2xl font-bold text-lime-900 mb-4">
          📊 JavaScript 메모리 관리
        </h2>
        <p className="text-lime-700 text-lg mb-6">
          가비지 컬렉션, 메모리 누수, WeakMap/WeakSet의 동작을 시각적으로 학습합니다.
        </p>
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
          <p className="text-yellow-800">
            🚧 이 페이지는 현재 개발 중입니다. 곧 완성될 예정입니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export { MemoryManagementLanding };