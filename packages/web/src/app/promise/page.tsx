"use client";

import React, { useState } from "react";

interface Block {
  type: "sync" | "task" | "microtask" | "await";
  label: string;
  actualOutput?: string;
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

const BlockEventLoopSimulator: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<Block[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [actualConsoleOutput, setActualConsoleOutput] = useState<string[]>([]);

  const addBlock = (block: Block): void => {
    setCodeBlocks((prev) => [...prev, block]);
  };

  const logLine = (msg: string): void => {
    setLog((prev) => [...prev, msg]);
  };

  const addConsoleOutput = (output: string): void => {
    setActualConsoleOutput((prev) => [...prev, output]);
  };

  const reset = (): void => {
    setCodeBlocks([]);
    setLog([]);
    setActualConsoleOutput([]);
  };

  const runSimulation = async (): Promise<void> => {
    setLog([]);
    setActualConsoleOutput([]);

    // 로컬 변수로 microtasks와 tasks 추적
    const localMicrotasks: Block[] = [];
    const localTasks: Block[] = [];
    const awaitBlocks: Block[] = [];

    // 1단계: 동기 코드 실행 및 비동기 작업 등록
    for (const block of codeBlocks) {
      switch (block.type) {
        case "sync":
          logLine(`🔸 즉시 실행: ${block.actualOutput || block.label}`);
          if (block.actualOutput) {
            addConsoleOutput(block.actualOutput);
          }
          await sleep(500);
          break;
        case "microtask":
          logLine(
            `🟢 Promise 대기열에 추가: "${block.actualOutput}" 출력 예약`
          );
          localMicrotasks.push(block);
          await sleep(300);
          break;
        case "task":
          logLine(`🔵 타이머 대기열에 추가: "${block.actualOutput}" 출력 예약`);
          localTasks.push(block);
          await sleep(300);
          break;
        case "await":
          logLine(`⏳ 비동기 대기 시작: 함수 실행이 일시 정지됩니다`);
          awaitBlocks.push(block);
          await sleep(500);

          // await에서 suspend되는 동안 이벤트 루프가 동작
          logLine(`🔄 대기 중 이벤트 루프 동작: 예약된 작업들을 처리합니다`);
          await sleep(300);

          // 2단계: Microtasks 먼저 처리 (await 중에 실행)
          if (localMicrotasks.length > 0) {
            logLine("▶ Promise 대기열 처리 (우선순위 높음)");
            for (const m of localMicrotasks) {
              logLine(`→ Promise 실행: "${m.actualOutput}" 출력`);
              if (m.actualOutput) {
                addConsoleOutput(m.actualOutput);
              }
              await sleep(500);
            }
            // microtask 실행 후 배열 비우기
            localMicrotasks.length = 0;
          }

          // 3단계: Tasks 처리 (await 중에 실행)
          if (localTasks.length > 0) {
            logLine("▶ 타이머 대기열 처리 (우선순위 낮음)");
            for (const t of localTasks) {
              logLine(`→ 타이머 실행: "${t.actualOutput}" 출력`);
              if (t.actualOutput) {
                addConsoleOutput(t.actualOutput);
              }
              await sleep(500);
            }
            // task 실행 후 배열 비우기
            localTasks.length = 0;
          }

          // 4단계: await 완료
          logLine(`🟡 비동기 대기 완료: "${block.actualOutput}" 출력`);
          if (block.actualOutput) {
            addConsoleOutput(block.actualOutput);
          }
          await sleep(500);
          break;
        default:
          break;
      }
    }

    // await가 없었던 경우를 위한 남은 microtask/task 처리
    if (localMicrotasks.length > 0) {
      logLine("▶ 남은 Promise 대기열 처리");
      for (const m of localMicrotasks) {
        logLine(`→ Promise 실행: "${m.actualOutput}" 출력`);
        if (m.actualOutput) {
          addConsoleOutput(m.actualOutput);
        }
        await sleep(500);
      }
    }

    if (localTasks.length > 0) {
      logLine("▶ 남은 타이머 대기열 처리");
      for (const t of localTasks) {
        logLine(`→ 타이머 실행: "${t.actualOutput}" 출력`);
        if (t.actualOutput) {
          addConsoleOutput(t.actualOutput);
        }
        await sleep(500);
      }
    }

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

  const buttonStyles = {
    base: {
      padding: "12px 16px",
      borderRadius: "8px",
      cursor: "pointer" as const,
      fontSize: "14px",
      fontWeight: "500" as const,
      transition: "all 0.2s ease",
      border: "none",
    },
    codeBlock: {
      background: "#f8fafc",
      color: "#374151",
      border: "2px solid #e2e8f0",
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    },
    primary: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    },
    success: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    },
    secondary: {
      background: "#f3f4f6",
      color: "#374151",
      border: "2px solid #e5e7eb",
    },
  };

  return (
    <div
      style={{
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 8px 0",
            }}
          >
            🧱 JavaScript 이벤트 루프 시뮬레이터
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              margin: 0,
              fontWeight: "400",
            }}
          >
            비동기 처리 순서를 시각적으로 학습해보세요
          </p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              color: "#374151",
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            📦 코드 블록 추가
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {blockOptions.map((block, idx) => (
              <button
                key={idx}
                onClick={() => addBlock(block)}
                style={{
                  ...buttonStyles.base,
                  ...buttonStyles.codeBlock,
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.background = "#e2e8f0";
                  target.style.borderColor = "#9ca3af";
                  target.style.transform = "translateY(-2px)";
                  target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.background = "#f8fafc";
                  target.style.borderColor = "#e2e8f0";
                  target.style.transform = "translateY(0)";
                  target.style.boxShadow = "none";
                }}
              >
                {block.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              color: "#374151",
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            📝 구성된 코드 블록
          </h3>
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "8px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              minHeight: "60px",
            }}
          >
            {codeBlocks.length === 0 ? (
              <div
                style={{
                  color: "#9ca3af",
                  fontStyle: "italic",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                위에서 코드 블록을 선택해서 추가해보세요
              </div>
            ) : (
              codeBlocks.map((block, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    padding: "8px 12px",
                    background: "#ffffff",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>{i + 1}.</span>{" "}
                  {block.label}
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              color: "#374151",
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            🎮 실행 제어
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={runSimulation}
              style={{ ...buttonStyles.base, ...buttonStyles.primary }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(-2px)";
                target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
              }}
            >
              ▶ 시뮬레이션 실행
            </button>
            <button
              onClick={runActualCode}
              style={{ ...buttonStyles.base, ...buttonStyles.success }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(-2px)";
                target.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
              }}
            >
              🚀 실제 코드 실행 (콘솔 확인)
            </button>
            <button
              onClick={reset}
              style={{ ...buttonStyles.base, ...buttonStyles.secondary }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.background = "#e5e7eb";
                target.style.borderColor = "#d1d5db";
                target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.background = "#f3f4f6";
                target.style.borderColor = "#e5e7eb";
                target.style.transform = "translateY(0)";
              }}
            >
              🔄 초기화
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <h4
              style={{
                color: "#374151",
                marginBottom: "12px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              🖥 시뮬레이션 로그
            </h4>
            <div
              style={{
                background: "#111",
                color: "#0f0",
                padding: "16px",
                minHeight: "200px",
                maxHeight: "300px",
                overflowY: "auto",
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {log.map((line, idx) => (
                <div key={idx} style={{ marginBottom: "4px" }}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h4
              style={{
                color: "#374151",
                marginBottom: "12px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              📄 실제 Console 출력 순서
            </h4>
            <div
              style={{
                background: "#2d3748",
                color: "#e2e8f0",
                padding: "16px",
                minHeight: "200px",
                maxHeight: "300px",
                overflowY: "auto",
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {actualConsoleOutput.length === 0 ? (
                <div style={{ color: "#a0aec0", fontStyle: "italic" }}>
                  시뮬레이션을 실행하면 실제 출력 순서가 여기에 표시됩니다
                </div>
              ) : (
                actualConsoleOutput.map((output, idx) => (
                  <div key={idx} style={{ marginBottom: "4px" }}>
                    <span style={{ color: "#90cdf4" }}>console.log:</span>{" "}
                    <span style={{ color: "#68d391" }}>
                      &quot;{output}&quot;
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#f0f9ff",
            borderRadius: "12px",
            border: "1px solid #e0f2fe",
          }}
        >
          <h5
            style={{
              margin: "0 0 12px 0",
              color: "#0c4a6e",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            💡 사용법
          </h5>
          <ul
            style={{
              margin: "0 0 16px 0",
              paddingLeft: "20px",
              color: "#075985",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <strong>시뮬레이션 실행:</strong> JavaScript 이벤트 루프가 어떻게
              동작하는지 단계별로 확인
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>실제 코드 실행:</strong> 브라우저 콘솔(F12)에서 진짜 실행
              결과와 비교
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>출력 순서 예측:</strong> 오른쪽 패널에서 최종 console.log
              결과를 미리 확인
            </li>
          </ul>
          <div
            style={{
              padding: "12px",
              background: "#bfdbfe",
              borderRadius: "6px",
              fontSize: "14px",
              color: "#1e40af",
              fontWeight: "500",
            }}
          >
            🎯 핵심: 동기 코드 → await 대기 중 Promise 처리 → 타이머 처리 →
            await 완료
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PromisePage() {
  return <BlockEventLoopSimulator />;
}
