"use client";
import { useState } from "react";
import StudyPageLayout from "../../components/StudyPageLayout";

type ApiStatus = {
  id: number;
  status: "Pending" | "Done";
  delay: number;
  result?: string;
};

const getRandomDelay = () => Math.floor(Math.random() * 4000) + 1000;

const fakeApi = (id: number, delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`API ${id} 완료 (${delay}ms)`);
    }, delay);
  });
};

export default function Home() {
  const [inputCount, setInputCount] = useState(3);
  const [statuses, setStatuses] = useState<ApiStatus[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startSimulation = () => {
    const count = Math.min(Math.max(1, inputCount), 5);
    setLogs([]);
    setLoading(true);

    const newStatuses: ApiStatus[] = Array.from({ length: count }, (_, i) => {
      return {
        id: i + 1,
        status: "Pending",
        delay: getRandomDelay(),
      };
    });

    setStatuses(newStatuses);

    const promises = newStatuses.map((api) => {
      return fakeApi(api.id, api.delay).then((result) => {
        // 응답 왔을 때 상태 업데이트
        setStatuses((prev) =>
          prev.map((s) =>
            s.id === api.id ? { ...s, status: "Done", result } : s
          )
        );
        // 응답 순서대로 로그 추가
        setLogs((prev) => [...prev, result]);
        return result;
      });
    });

    Promise.all(promises).then(() => {
      setLoading(false);
    });
  };

  return (
    <StudyPageLayout
      title="🚀 Promise 응답 순서 시뮬레이터"
      subtitle="병렬 Promise에서 응답 받는 순서를 시각적으로 학습해보세요"
      maxWidth="full"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <label className="w-full sm:w-auto">
          <span className="block mb-1 font-medium text-gray-700">
            API 호출 수 (1~5)
          </span>
          <input
            type="number"
            min={1}
            max={5}
            value={inputCount}
            onChange={(e) => setInputCount(Number(e.target.value))}
            className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </label>

        <button
          onClick={startSimulation}
          disabled={loading}
          className="px-6 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 border bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
        >
          {loading ? "⏳ 실행 중..." : "▶ 시뮬레이션 시작"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 호출 상태 박스 */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            📊 호출 상태
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {statuses.length}개
            </span>
          </h2>
          <div className="space-y-3">
            {statuses.length === 0 ? (
              <div className="text-gray-400 italic text-center p-8">
                시뮬레이션을 시작하면 API 호출 상태가 여기에 표시됩니다
              </div>
            ) : (
              statuses.map((api) => (
                <div
                  key={api.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    api.status === "Pending"
                      ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 animate-pulse"
                      : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-gray-800">API {api.id}</strong>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          api.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {api.status}
                      </span>
                    </div>
                    {api.status === "Done" && (
                      <span className="text-sm text-gray-600 font-mono">
                        {api.delay}ms
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 응답 순서 테이블 */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            📋 응답 로그
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {logs.length}개
            </span>
          </h2>
          {logs.length === 0 ? (
            <div className="text-gray-400 italic text-center p-8">
              응답 대기 중...
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      응답 순서
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      호출 결과
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {logs.map((log, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-center font-mono font-semibold text-indigo-600">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-mono text-gray-700">
                        {log}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 학습 섹션 */}
      <div className="border-t border-gray-200 pt-8">
        <div className="text-center mb-8">
          <h2 className="font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-2 text-2xl md:text-3xl">
            📚 학습 가이드: 병렬 Promise 응답 순서 처리
          </h2>
          <p className="text-gray-500 font-normal m-0 text-sm md:text-base">
            실제 코드와 함께 병렬 Promise의 작동 원리를 이해해보세요
          </p>
        </div>

        {/* 작동 원리 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🔍 작동 원리
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <ol className="list-decimal list-inside space-y-3 text-sm">
              <li>
                <strong className="text-blue-800">Promise 생성:</strong> 각 API
                호출은 서로 다른 지연 시간(1~5초)을 가진 Promise로 생성됩니다.
              </li>
              <li>
                <strong className="text-blue-800">병렬 실행:</strong> 모든
                Promise가 동시에 시작되어 병렬로 실행됩니다.
              </li>
              <li>
                <strong className="text-blue-800">비동기 응답:</strong> 각
                Promise는 지연 시간에 따라 완료 순서가 달라집니다.
              </li>
              <li>
                <strong className="text-blue-800">상태 업데이트:</strong> 각
                Promise가 완료될 때마다 UI 상태가 실시간으로 업데이트됩니다.
              </li>
              <li>
                <strong className="text-blue-800">순서대로 처리:</strong> 각
                Promise가 완료되는 순서대로 결과를 받아 UI에 반영합니다.
              </li>
            </ol>
          </div>
        </div>

        {/* 핵심 코드 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            💻 핵심 코드 분석
          </h3>

          <div className="space-y-6">
            {/* fakeApi 함수 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h4 className="text-lg font-medium mb-4 text-indigo-600">
                1. Promise 생성 함수
              </h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
                <code>{`const fakeApi = (id: number, delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(\`API \${id} 완료 (\${delay}ms)\`);
    }, delay);
  });
};`}</code>
              </pre>
              <p className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded-lg">
                각 API 호출을 시뮬레이션하는 Promise를 생성합니다. setTimeout을
                사용해 지연 시간을 구현합니다.
              </p>
            </div>

            {/* API 설정 생성 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h4 className="text-lg font-medium mb-4 text-indigo-600">
                2. 병렬 실행할 API 설정
              </h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
                <code>{`// 각각 다른 지연 시간을 가진 API 설정
const apiConfigs = [
  { id: 1, delay: 2000 },  // 2초
  { id: 2, delay: 1000 },  // 1초  
  { id: 3, delay: 3000 },  // 3초
];`}</code>
              </pre>
              <p className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded-lg">
                각 API마다 서로 다른 지연 시간을 설정합니다. 실제로는 네트워크
                속도나 서버 처리 시간에 따라 달라집니다.
              </p>
            </div>

            {/* 병렬 Promise 실행 */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h4 className="text-lg font-medium mb-4 text-indigo-600">
                3. 병렬 Promise 실행 및 응답 순서 처리
              </h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
                <code>{`// 모든 Promise를 병렬로 실행
const promises = apiConfigs.map((config) => {
  return fakeApi(config.id, config.delay).then((result) => {
    // 각 Promise가 완료되는 순서대로 출력
    console.log(\`응답 받음: \${result}\`);
    return result;
  });
});
});`}</code>
              </pre>
              <p className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded-lg">
                <strong>핵심:</strong> 모든 Promise가 동시에 시작되지만, 각각의
                지연 시간에 따라 완료 순서가 달라집니다. 위 예제에서는 API 2 →
                API 1 → API 3 순서로 완료됩니다.
              </p>
            </div>

            {/* 실행 결과 예시 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h4 className="text-lg font-medium mb-4 text-orange-600">
                💡 실행 결과 예시
              </h4>
              <pre className="bg-gray-800 text-amber-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
                <code>{`// 1초 후: 응답 받음: API 2 완료 (1000ms)
// 2초 후: 응답 받음: API 1 완료 (2000ms)  
// 3초 후: 응답 받음: API 3 완료 (3000ms)
// 3초 후: 모든 API 호출 완료`}</code>
              </pre>
              <p className="text-sm text-orange-700 mt-4 p-3 bg-orange-100 rounded-lg">
                호출 순서(1→2→3)와 응답 순서(2→1→3)가 다른 것을 확인할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 주요 개념 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🎯 주요 개념
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 shadow-sm">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                🔄 비동기 처리
              </h4>
              <p className="text-sm text-yellow-700">
                Promise는 비동기 작업을 처리하며, 각각 독립적으로 실행됩니다.
                호출 순서와 완료 순서가 다를 수 있습니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                ⚡ 병렬 실행
              </h4>
              <p className="text-sm text-green-700">
                여러 Promise를 동시에 실행하여 전체 처리 시간을 단축할 수
                있습니다. 순차 실행보다 효율적입니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200 shadow-sm">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                🎯 응답 순서 처리
              </h4>
              <p className="text-sm text-purple-700">
                각 Promise가 완료되는 순서대로 결과를 받아 로그에 순차적으로
                기록하여 응답 순서를 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 실습 가이드 */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">
            🏃‍♂️ 실습 가이드
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-3">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <p className="text-indigo-800">
                API 호출 수를 변경하여 다양한 시나리오를 테스트해보세요.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <p className="text-indigo-800">
                여러 번 실행하여 응답 순서가 매번 다른 것을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
}
