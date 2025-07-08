"use client";

import React, { useState } from "react";
import StudyPageLayout from "../../components/StudyPageLayout";

interface Block {
  type: "sync" | "task" | "microtask" | "await";
  label: string;
  actualOutput?: string;
}

interface VisualizationState {
  callStack: string[];
  taskQueue: string[];
  microtaskQueue: string[];
  webApis: string[];
  currentStep: string;
  isRunning: boolean;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

const blockOptions: Block[] = [
  { type: "sync", label: 'console.log("A")', actualOutput: "A" },
  {
    type: "task",
    label: 'setTimeout(() => console.log("B"), 0)',
    actualOutput: "B",
  },
  {
    type: "microtask",
    label: 'Promise.resolve().then(() => console.log("C"))',
    actualOutput: "C",
  },
  { type: "sync", label: 'console.log("D")', actualOutput: "D" },
  {
    type: "await",
    label:
      'await new Promise(resolve => setTimeout(resolve, 500)); console.log("E")',
    actualOutput: "E",
  },
];

// 이벤트 루프 시각화 컴포넌트
const EventLoopVisualizer: React.FC<{
  visualState: VisualizationState;
}> = ({ visualState }) => {
  return (
    <div>
      <div className="bg-gray-800 text-gray-50 p-4 rounded-lg mb-4 text-center text-base font-semibold">
        🎯 현재 단계: {visualState.currentStep}
      </div>

      <div className="grid gap-3 md:gap-4 my-4 md:my-5 grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 h-auto md:h-[700px]">
        {/* Call Stack */}
        <div
          className={`
          bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl p-4 border-2 border-slate-300 relative overflow-hidden
          ${
            visualState.callStack.length > 0
              ? "bg-gradient-to-br from-amber-100 to-amber-400 border-amber-500 animate-pulse shadow-lg shadow-amber-500/30"
              : ""
          }
        `}
        >
          <div className="text-base font-semibold mb-3 flex items-center gap-2 text-amber-800">
            📚 Call Stack
            <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded">
              {visualState.callStack.length}
            </span>
          </div>
          {visualState.callStack.length === 0 ? (
            <div className="text-gray-400 italic text-center p-5 text-sm">
              비어있음
            </div>
          ) : (
            visualState.callStack.map((item, idx) => (
              <div
                key={idx}
                className={`
                  bg-amber-500 text-white font-semibold px-3 py-2 rounded-md my-1 border border-slate-200 text-sm font-mono shadow-sm
                  ${
                    visualState.isRunning
                      ? "animate-[slideIn_0.3s_ease-out]"
                      : ""
                  }
                `}
              >
                {item}
              </div>
            ))
          )}
        </div>

        {/* Web APIs */}
        <div
          className={`
          bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl p-4 border-2 border-slate-300 relative overflow-hidden
          ${
            visualState.webApis.length > 0
              ? "bg-gradient-to-br from-violet-100 to-violet-500 border-violet-500 animate-pulse shadow-lg shadow-violet-500/30"
              : ""
          }
        `}
        >
          <div className="text-base font-semibold mb-3 flex items-center gap-2 text-violet-800">
            🌐 Web APIs
            <span className="text-xs bg-violet-500 text-white px-2 py-1 rounded">
              {visualState.webApis.length}
            </span>
          </div>
          {visualState.webApis.length === 0 ? (
            <div className="text-gray-400 italic text-center p-5 text-sm">
              비어있음
            </div>
          ) : (
            visualState.webApis.map((item, idx) => (
              <div
                key={idx}
                className={`
                  bg-violet-500 text-white px-3 py-2 rounded-md my-1 border border-slate-200 text-sm font-mono shadow-sm
                  ${
                    visualState.isRunning
                      ? "animate-[slideIn_0.3s_ease-out]"
                      : ""
                  }
                `}
              >
                {item}
              </div>
            ))
          )}
        </div>

        {/* Microtask Queue */}
        <div
          className={`
          bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl p-4 border-2 border-slate-300 relative overflow-hidden
          ${
            visualState.microtaskQueue.length > 0
              ? "bg-gradient-to-br from-emerald-100 to-emerald-500 border-emerald-500 animate-pulse shadow-lg shadow-emerald-500/30"
              : ""
          }
        `}
        >
          <div className="text-base font-semibold mb-3 flex items-center gap-2 text-emerald-800">
            🟢 Microtask Queue
            <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded">
              {visualState.microtaskQueue.length}
            </span>
            <span className="text-xs text-emerald-600">(높은 우선순위)</span>
          </div>
          {visualState.microtaskQueue.length === 0 ? (
            <div className="text-gray-400 italic text-center p-5 text-sm">
              비어있음
            </div>
          ) : (
            visualState.microtaskQueue.map((item, idx) => (
              <div
                key={idx}
                className={`
                  bg-emerald-500 text-white px-3 py-2 rounded-md my-1 border border-slate-200 text-sm font-mono shadow-sm
                  ${
                    visualState.isRunning
                      ? "animate-[slideIn_0.3s_ease-out]"
                      : ""
                  }
                `}
              >
                {item}
              </div>
            ))
          )}
        </div>

        {/* Task Queue */}
        <div
          className={`
          bg-gradient-to-br from-slate-50 to-slate-200 rounded-xl p-4 border-2 border-slate-300 relative overflow-hidden
          ${
            visualState.taskQueue.length > 0
              ? "bg-gradient-to-br from-blue-100 to-blue-500 border-blue-500 animate-pulse shadow-lg shadow-blue-500/30"
              : ""
          }
        `}
        >
          <div className="text-base font-semibold mb-3 flex items-center gap-2 text-blue-800">
            🔵 Task Queue
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
              {visualState.taskQueue.length}
            </span>
            <span className="text-xs text-blue-600">(낮은 우선순위)</span>
          </div>
          {visualState.taskQueue.length === 0 ? (
            <div className="text-gray-400 italic text-center p-5 text-sm">
              비어있음
            </div>
          ) : (
            visualState.taskQueue.map((item, idx) => (
              <div
                key={idx}
                className={`
                  bg-blue-500 text-white px-3 py-2 rounded-md my-1 border border-slate-200 text-sm font-mono shadow-sm
                  ${
                    visualState.isRunning
                      ? "animate-[slideIn_0.3s_ease-out]"
                      : ""
                  }
                `}
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Event Loop 화살표 */}
      <div className="text-center my-5 p-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg border-2 border-dashed border-gray-400">
        <div className="text-lg font-semibold mb-2">🔄 Event Loop</div>
        <div className="text-sm text-gray-500">
          Call Stack이 비면 → Microtask Queue 우선 처리 → Task Queue 처리
        </div>
      </div>
    </div>
  );
};

const BlockEventLoopSimulator: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<Block[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [actualConsoleOutput, setActualConsoleOutput] = useState<string[]>([]);
  const [visualState, setVisualState] = useState<VisualizationState>({
    callStack: [],
    taskQueue: [],
    microtaskQueue: [],
    webApis: [],
    currentStep: "대기 중",
    isRunning: false,
  });

  const addBlock = (block: Block): void => {
    setCodeBlocks((prev) => [...prev, block]);
  };

  const logLine = (msg: string): void => {
    setLog((prev) => [...prev, msg]);
  };

  const addConsoleOutput = (output: string): void => {
    setActualConsoleOutput((prev) => [...prev, output]);
  };

  const updateVisualization = (updates: Partial<VisualizationState>): void => {
    setVisualState((prev) => ({ ...prev, ...updates }));
  };

  const reset = (): void => {
    setCodeBlocks([]);
    setLog([]);
    setActualConsoleOutput([]);
    setVisualState({
      callStack: [],
      taskQueue: [],
      microtaskQueue: [],
      webApis: [],
      currentStep: "대기 중",
      isRunning: false,
    });
  };

  const runSimulation = async (): Promise<void> => {
    setLog([]);
    setActualConsoleOutput([]);
    updateVisualization({
      callStack: [],
      taskQueue: [],
      microtaskQueue: [],
      webApis: [],
      currentStep: "시뮬레이션 시작",
      isRunning: true,
    });

    await sleep(800);

    // 로컬 변수로 microtasks와 tasks 추적
    const localMicrotasks: Block[] = [];
    const localTasks: Block[] = [];
    const awaitBlocks: Block[] = [];

    // 1단계: 동기 코드 실행 및 비동기 작업 등록
    updateVisualization({ currentStep: "동기 코드 실행 단계" });
    await sleep(500);

    for (const block of codeBlocks) {
      switch (block.type) {
        case "sync":
          updateVisualization({
            callStack: [block.label],
            currentStep: "동기 함수 실행 중",
          });
          logLine(`🔸 즉시 실행: ${block.actualOutput || block.label}`);
          if (block.actualOutput) {
            addConsoleOutput(block.actualOutput);
          }
          await sleep(800);
          updateVisualization({ callStack: [] });
          await sleep(300);
          break;

        case "microtask":
          updateVisualization({
            callStack: [block.label],
            currentStep: "Promise 등록 중",
          });
          logLine(
            `🟢 Promise 대기열에 추가: "${block.actualOutput}" 출력 예약`
          );
          localMicrotasks.push(block);
          await sleep(500);
          updateVisualization({
            callStack: [],
            microtaskQueue: localMicrotasks.map(
              (b) => `Promise: ${b.actualOutput}`
            ),
          });
          await sleep(500);
          break;

        case "task":
          updateVisualization({
            callStack: [block.label],
            currentStep: "Timer 등록 중",
          });
          logLine(`🔵 타이머 대기열에 추가: "${block.actualOutput}" 출력 예약`);
          localTasks.push(block);
          await sleep(500);
          updateVisualization({
            callStack: [],
            webApis: [...visualState.webApis, `Timer: ${block.actualOutput}`],
          });
          await sleep(300);
          updateVisualization({
            taskQueue: localTasks.map((b) => `Timer: ${b.actualOutput}`),
            webApis: [],
          });
          await sleep(500);
          break;

        case "await":
          updateVisualization({
            callStack: [block.label],
            currentStep: "Async 함수 대기 시작",
          });
          logLine(`⏳ 비동기 대기 시작: 함수 실행이 일시 정지됩니다`);
          awaitBlocks.push(block);
          await sleep(800);

          updateVisualization({
            callStack: [],
            webApis: [
              ...visualState.webApis,
              `Async Wait: ${block.actualOutput}`,
            ],
            currentStep: "대기 중 이벤트 루프 동작",
          });
          logLine(`🔄 대기 중 이벤트 루프 동작: 예약된 작업들을 처리합니다`);
          await sleep(800);

          // 2단계: Microtasks 먼저 처리
          if (localMicrotasks.length > 0) {
            updateVisualization({ currentStep: "Microtask Queue 처리 중" });
            logLine("▶ Promise 대기열 처리 (우선순위 높음)");
            await sleep(500);

            for (const m of localMicrotasks) {
              updateVisualization({
                callStack: [`Promise callback: ${m.actualOutput}`],
                microtaskQueue: localMicrotasks
                  .slice(1)
                  .map((b) => `Promise: ${b.actualOutput}`),
              });
              logLine(`→ Promise 실행: "${m.actualOutput}" 출력`);
              if (m.actualOutput) {
                addConsoleOutput(m.actualOutput);
              }
              await sleep(800);
              updateVisualization({ callStack: [] });
              await sleep(300);
            }
            localMicrotasks.length = 0;
            updateVisualization({ microtaskQueue: [] });
          }

          // 3단계: Tasks 처리
          if (localTasks.length > 0) {
            updateVisualization({ currentStep: "Task Queue 처리 중" });
            logLine("▶ 타이머 대기열 처리 (우선순위 낮음)");
            await sleep(500);

            for (const t of localTasks) {
              updateVisualization({
                callStack: [`Timer callback: ${t.actualOutput}`],
                taskQueue: localTasks
                  .slice(1)
                  .map((b) => `Timer: ${b.actualOutput}`),
              });
              logLine(`→ 타이머 실행: "${t.actualOutput}" 출력`);
              if (t.actualOutput) {
                addConsoleOutput(t.actualOutput);
              }
              await sleep(800);
              updateVisualization({ callStack: [] });
              await sleep(300);
            }
            localTasks.length = 0;
            updateVisualization({ taskQueue: [] });
          }

          // 4단계: await 완료
          updateVisualization({
            callStack: [`Async resume: ${block.actualOutput}`],
            webApis: [],
            currentStep: "Async 함수 재개",
          });
          logLine(`🟡 비동기 대기 완료: "${block.actualOutput}" 출력`);
          if (block.actualOutput) {
            addConsoleOutput(block.actualOutput);
          }
          await sleep(800);
          updateVisualization({ callStack: [] });
          await sleep(300);
          break;

        default:
          break;
      }
    }

    // await가 없었던 경우를 위한 남은 microtask/task 처리
    if (localMicrotasks.length > 0) {
      updateVisualization({ currentStep: "남은 Microtask 처리" });
      logLine("▶ 남은 Promise 대기열 처리");
      await sleep(500);

      for (const m of localMicrotasks) {
        updateVisualization({
          callStack: [`Promise callback: ${m.actualOutput}`],
          microtaskQueue: localMicrotasks
            .slice(1)
            .map((b) => `Promise: ${b.actualOutput}`),
        });
        logLine(`→ Promise 실행: "${m.actualOutput}" 출력`);
        if (m.actualOutput) {
          addConsoleOutput(m.actualOutput);
        }
        await sleep(800);
        updateVisualization({ callStack: [] });
        await sleep(300);
      }
      updateVisualization({ microtaskQueue: [] });
    }

    if (localTasks.length > 0) {
      updateVisualization({ currentStep: "남은 Task 처리" });
      logLine("▶ 남은 타이머 대기열 처리");
      await sleep(500);

      for (const t of localTasks) {
        updateVisualization({
          callStack: [`Timer callback: ${t.actualOutput}`],
          taskQueue: localTasks.slice(1).map((b) => `Timer: ${b.actualOutput}`),
        });
        logLine(`→ 타이머 실행: "${t.actualOutput}" 출력`);
        if (t.actualOutput) {
          addConsoleOutput(t.actualOutput);
        }
        await sleep(800);
        updateVisualization({ callStack: [] });
        await sleep(300);
      }
      updateVisualization({ taskQueue: [] });
    }

    updateVisualization({
      currentStep: "시뮬레이션 완료",
      isRunning: false,
    });
    logLine("✅ 시뮬레이션 완료");
  };

  const runActualCode = () => {
    // 실제 JavaScript 코드 실행 (교육 목적)
    console.clear();
    console.log("=== 실제 코드 실행 시작 ===");

    // 실제 코드 순서대로 실행
    codeBlocks.forEach((block) => {
      if (block.type === "sync" && block.actualOutput) {
        console.log(block.actualOutput);
      } else if (block.type === "microtask" && block.actualOutput) {
        Promise.resolve().then(() => console.log(block.actualOutput));
      } else if (block.type === "task" && block.actualOutput) {
        setTimeout(() => console.log(block.actualOutput), 0);
      } else if (block.type === "await" && block.actualOutput) {
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          console.log(block.actualOutput);
        })();
      }
    });

    console.log("=== 실제 코드 실행 완료 (결과는 위에서 확인) ===");
  };

  // Tailwind 버튼 클래스들
  const buttonClasses = {
    base: "px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 border",
    codeBlock:
      "bg-slate-50 text-gray-700 border-2 border-slate-200 font-mono hover:bg-slate-100 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-lg",
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40",
    success:
      "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40",
    secondary:
      "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300 hover:-translate-y-0.5",
    disabled:
      "opacity-60 cursor-not-allowed hover:transform-none hover:shadow-none",
  };

  return (
    <StudyPageLayout
      title="🧱 JavaScript 이벤트 루프 시뮬레이터"
      subtitle="비동기 처리 순서를 시각적으로 학습해보세요"
      maxWidth="full"
      showBackButton={true}
    >
      <div className="mb-6">
        <h3 className="text-gray-700 mb-4 text-lg font-semibold">
          📦 코드 블록 추가
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {blockOptions.map((block, idx) => (
            <button
              key={idx}
              onClick={() => addBlock(block)}
              className={`${buttonClasses.base} ${buttonClasses.codeBlock}`}
            >
              {block.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-700 mb-4 text-lg font-semibold">
          📝 구성된 코드 블록
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[60px]">
          {codeBlocks.length === 0 ? (
            <div className="text-gray-400 italic text-center p-5">
              위에서 코드 블록을 선택해서 추가해보세요
            </div>
          ) : (
            codeBlocks.map((block, i) => (
              <div
                key={i}
                className="mb-2 px-3 py-2 bg-white rounded-md border border-gray-200 font-mono text-sm"
              >
                <span className="text-gray-500">{i + 1}.</span> {block.label}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-gray-700 mb-4 text-lg font-semibold">
          🎮 실행 제어
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={runSimulation}
            disabled={visualState.isRunning}
            className={`
                ${buttonClasses.base} ${buttonClasses.primary}
                ${visualState.isRunning ? buttonClasses.disabled : ""}
              `}
          >
            ▶ 시각화 시뮬레이션 실행
          </button>
          <button
            onClick={runActualCode}
            className={`${buttonClasses.base} ${buttonClasses.success}`}
          >
            🚀 실제 코드 실행 (콘솔 확인)
          </button>
          <button
            onClick={reset}
            className={`${buttonClasses.base} ${buttonClasses.secondary}`}
          >
            🔄 초기화
          </button>
        </div>
      </div>

      {/* 메인 레이아웃: 좌측 시각화, 우측 로그 */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
        {/* 좌측: 이벤트 루프 시각화 */}
        <div className="w-full md:flex-[1.2] md:min-w-[650px]">
          <h3 className="text-gray-700 mb-4 text-lg font-semibold">
            🎭 이벤트 루프 실시간 시각화
          </h3>
          <EventLoopVisualizer visualState={visualState} />
        </div>

        {/* 우측: 로그 영역 */}
        <div className="flex flex-col w-full md:flex-1 md:min-w-[450px] gap-3 md:gap-5">
          {/* 시뮬레이션 로그 */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-gray-700 mb-3 text-base font-semibold">
              🖥 시뮬레이션 로그
            </h4>
            <div className="bg-gray-900 text-green-400 rounded-lg border-2 border-green-500 overflow-y-auto font-mono leading-tight flex-1 flex flex-col p-3 md:p-4 h-[200px] md:h-[280px] text-xs md:text-sm">
              {log.length === 0 ? (
                <div className="text-green-300 italic text-center pt-10">
                  시뮬레이션을 실행하면 단계별 로그가 여기에 표시됩니다
                </div>
              ) : (
                log.map((line, idx) => (
                  <div key={idx} className="mb-1">
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Console 출력 */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-gray-700 mb-3 text-base font-semibold">
              📄 실제 Console 출력 순서
            </h4>
            <div className="bg-gray-700 text-gray-200 rounded-lg border-2 border-blue-500 overflow-y-auto font-mono leading-tight flex-1 flex flex-col p-3 md:p-4 h-[200px] md:h-[280px] text-xs md:text-sm">
              {actualConsoleOutput.length === 0 ? (
                <div className="text-gray-400 italic text-center pt-10">
                  시뮬레이션을 실행하면 실제 출력 순서가 여기에 표시됩니다
                </div>
              ) : (
                actualConsoleOutput.map((output, idx) => (
                  <div key={idx} className="mb-1">
                    <span className="text-sky-300">console.log:</span>{" "}
                    <span className="text-green-300">&quot;{output}&quot;</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-sky-50 rounded-xl border border-sky-200">
        <h5 className="m-0 mb-3 text-sky-900 text-base font-semibold">
          💡 사용법
        </h5>
        <ul className="m-0 mb-4 pl-5 text-sky-800">
          <li className="mb-2">
            <strong>시각화 시뮬레이션:</strong> 이벤트 루프의 Call Stack,
            Queue들의 실시간 동작을 확인
          </li>
          <li className="mb-2">
            <strong>실제 코드 실행:</strong> 브라우저 콘솔(F12)에서 진짜 실행
            결과와 비교
          </li>
          <li className="mb-2">
            <strong>큐 우선순위:</strong> Microtask Queue가 Task Queue보다 높은
            우선순위를 가짐
          </li>
          <li className="mb-2">
            <strong>시각적 피드백:</strong> 활성화된 큐는 하이라이트와
            애니메이션으로 표시
          </li>
        </ul>
        <div className="p-3 bg-blue-200 rounded-md text-sm text-blue-800 font-medium">
          🎯 핵심: Call Stack → Microtask Queue → Task Queue 순서로 처리됩니다
        </div>
      </div>
    </StudyPageLayout>
  );
};

export default function PromisePage() {
  return <BlockEventLoopSimulator />;
}
