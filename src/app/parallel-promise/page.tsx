"use client";
import { useState } from "react";

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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Promise 응답 순서 시뮬레이터
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <label className="w-full sm:w-auto">
            <span className="block mb-1 font-medium">API 호출 수 (1~5)</span>
            <input
              type="number"
              min={1}
              max={5}
              value={inputCount}
              onChange={(e) => setInputCount(Number(e.target.value))}
              className="w-full sm:w-32 px-3 py-2 border rounded"
            />
          </label>

          <button
            onClick={startSimulation}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "실행 중..." : "시뮬레이션 시작"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* 호출 상태 박스 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">호출 상태</h2>
            <ul className="space-y-2">
              {statuses.map((api) => (
                <li
                  key={api.id}
                  className={`p-3 rounded border ${
                    api.status === "Pending"
                      ? "bg-yellow-100 border-yellow-400"
                      : "bg-green-100 border-green-400"
                  }`}
                >
                  <strong>API {api.id}</strong> - {api.status}
                  {api.status === "Done" && ` (${api.delay}ms)`}
                </li>
              ))}
            </ul>
          </div>

          {/* 응답 순서 테이블 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">응답 로그</h2>
            {logs.length === 0 ? (
              <p className="text-gray-500">응답 대기 중...</p>
            ) : (
              <table className="w-full text-sm border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">응답 순서</th>
                    <th className="border px-2 py-1">호출 결과</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={idx} className="even:bg-gray-50">
                      <td className="border px-2 py-1 text-center">
                        {idx + 1}
                      </td>
                      <td className="border px-2 py-1">{log}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* 학습 섹션 */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
            📚 학습 가이드: 병렬 Promise 응답 순서 처리
          </h2>

          {/* 작동 원리 설명 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🔍 작동 원리
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  <strong>Promise 생성:</strong> 각 API 호출은 서로 다른 지연
                  시간(1~5초)을 가진 Promise로 생성됩니다.
                </li>
                <li>
                  <strong>병렬 실행:</strong> 모든 Promise가 동시에 시작되어
                  병렬로 실행됩니다.
                </li>
                <li>
                  <strong>비동기 응답:</strong> 각 Promise는 지연 시간에 따라
                  완료 순서가 달라집니다.
                </li>
                <li>
                  <strong>상태 업데이트:</strong> 각 Promise가 완료될 때마다 UI
                  상태가 실시간으로 업데이트됩니다.
                </li>
                <li>
                  <strong>순서대로 처리:</strong> 각 Promise가 완료되는 순서대로
                  결과를 받아 UI에 반영합니다.
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
              <div>
                <h4 className="text-lg font-medium mb-2 text-blue-600">
                  1. Promise 생성 함수
                </h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`const fakeApi = (id: number, delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(\`API \${id} 완료 (\${delay}ms)\`);
    }, delay);
  });
};`}</code>
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  각 API 호출을 시뮬레이션하는 Promise를 생성합니다.
                  setTimeout을 사용해 지연 시간을 구현합니다.
                </p>
              </div>

              {/* Promise 배열 생성 */}
              <div>
                <h4 className="text-lg font-medium mb-2 text-blue-600">
                  2. 병렬 Promise 실행 및 응답 순서 처리
                </h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`const promises = newStatuses.map((api) => {
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
});`}</code>
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  각 Promise에 .then() 핸들러를 추가하여 완료되는 순서대로
                  상태를 업데이트하고 로그에 기록합니다.
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
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  🔄 비동기 처리
                </h4>
                <p className="text-sm text-yellow-700">
                  Promise는 비동기 작업을 처리하며, 각각 독립적으로 실행됩니다.
                  호출 순서와 완료 순서가 다를 수 있습니다.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  ⚡ 병렬 실행
                </h4>
                <p className="text-sm text-green-700">
                  여러 Promise를 동시에 실행하여 전체 처리 시간을 단축할 수
                  있습니다. 순차 실행보다 효율적입니다.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  📊 상태 관리
                </h4>
                <p className="text-sm text-blue-700">
                  React의 useState를 사용하여 각 Promise의 상태를 추적하고 UI에
                  실시간으로 반영합니다.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
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
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">
              🏃‍♂️ 실습 가이드
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <p>API 호출 수를 변경하여 다양한 시나리오를 테스트해보세요.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <p>여러 번 실행하여 응답 순서가 매번 다른 것을 확인해보세요.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <p>브라우저 개발자 도구에서 네트워크 탭을 확인해보세요.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <p>코드를 수정하여 다른 비동기 처리 방식을 실험해보세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
