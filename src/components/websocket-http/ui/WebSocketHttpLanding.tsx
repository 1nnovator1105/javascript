"use client";

import React, { useState, useRef } from "react";

const WebSocketHttpLanding = () => {
  const [activeTab, setActiveTab] = useState<"concept" | "comparison" | "demo">(
    "concept"
  );
  const [connectionType, setConnectionType] = useState<
    "http" | "websocket" | "sse" | "polling"
  >("http");
  const [wsStatus, setWsStatus] = useState<
    "disconnected" | "connecting" | "connected"
  >("disconnected");
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      text: string;
      sender: "client" | "server";
      timestamp: Date;
    }>
  >([]);
  const messageIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 메시지 시뮬레이션
  const simulateMessage = (sender: "client" | "server", text: string) => {
    const newMessage = {
      id: messageIdRef.current++,
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // "인공지능" 서버 응답 시뮬레이션
  const getSimulatedServerResponse = (clientMessage: string): string => {
    const lowerCaseMessage = clientMessage.toLowerCase();
    if (lowerCaseMessage.includes("안녕")) {
      return "안녕하세요! 만나서 반갑습니다. 웹소켓에 대해 궁금한 점이 있으신가요?";
    }
    if (
      lowerCaseMessage.includes("웹소켓") ||
      lowerCaseMessage.includes("websocket")
    ) {
      return "웹소켓은 실시간 양방향 통신에 아주 유용하죠. HTTP와는 달리 연결을 유지하며 데이터를 주고받을 수 있습니다.";
    }
    if (lowerCaseMessage.includes("http")) {
      return "HTTP는 웹의 근간을 이루는 프로토콜이지만, 실시간 통신에는 웹소켓이나 SSE가 더 적합할 수 있습니다.";
    }
    if (lowerCaseMessage.includes("sse")) {
      return "SSE(Server-Sent Events)는 서버에서 클라이언트로의 단방향 푸시 통신에 좋은 선택입니다. 뉴스 피드나 알림에 유용해요.";
    }
    if (
      lowerCaseMessage.includes("폴링") ||
      lowerCaseMessage.includes("polling")
    ) {
      return "폴링 방식도 실시간 효과를 낼 수 있지만, 주기적인 요청으로 서버와 클라이언트 모두에게 부담을 줄 수 있어요.";
    }
    if (
      lowerCaseMessage.includes("고마워") ||
      lowerCaseMessage.includes("감사")
    ) {
      return "천만에요! 더 도와드릴 것이 있다면 언제든지 말씀해주세요.";
    }

    const randomResponses = [
      `"${clientMessage}"라고 하셨군요. 흥미로운 주제네요!`,
      "그렇군요! 조금 더 자세히 설명해주실 수 있나요?",
      "네, 잘 알겠습니다. 이 데모가 학습에 도움이 되면 좋겠네요.",
      "실시간 통신은 정말 멋진 기술이죠!",
      "웹소켓 연결이 안정적으로 유지되고 있습니다.",
    ];

    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  const handleSendMessage = () => {
    if (wsStatus !== "connected" || !inputRef.current) return;

    const message = inputRef.current.value.trim();
    if (message) {
      simulateMessage("client", message);

      // 서버 응답 시뮬레이션
      setTimeout(() => {
        const serverResponse = getSimulatedServerResponse(message);
        simulateMessage("server", serverResponse);
      }, 600 + Math.random() * 400); // 약간의 지연 추가

      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // WebSocket 연결 시뮬레이션
  const connectWebSocket = () => {
    setWsStatus("connecting");
    setTimeout(() => {
      setWsStatus("connected");
      simulateMessage("server", "WebSocket 연결이 성공적으로 수립되었습니다!");
    }, 1000);
  };

  const disconnectWebSocket = () => {
    setWsStatus("disconnected");
    simulateMessage("server", "WebSocket 연결이 종료되었습니다.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("concept")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "concept"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📚 개념 이해
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "comparison"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔄 통신 방식 비교
        </button>
        <button
          onClick={() => setActiveTab("demo")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "demo"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          💬 실시간 데모
        </button>
      </div>

      {/* 개념 설명 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* HTTP vs WebSocket 기본 비교 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🌐</div>
                <h2 className="text-2xl font-bold text-blue-800">HTTP</h2>
              </div>
              <p className="text-gray-700 mb-4">
                요청-응답 기반의 단방향 통신 프로토콜. 클라이언트가 요청하면
                서버가 응답합니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold">단순하고 안정적</div>
                    <div className="text-sm text-gray-600">
                      널리 사용되는 표준 프로토콜
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold">캐싱 가능</div>
                    <div className="text-sm text-gray-600">
                      리소스를 효율적으로 캐시
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <div className="font-semibold">단방향 통신</div>
                    <div className="text-sm text-gray-600">
                      서버에서 먼저 보낼 수 없음
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <div className="font-semibold">오버헤드</div>
                    <div className="text-sm text-gray-600">
                      매 요청마다 헤더 전송
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🔌</div>
                <h2 className="text-2xl font-bold text-purple-800">
                  WebSocket
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                양방향 실시간 통신 프로토콜. 한 번 연결되면 서버와 클라이언트가
                자유롭게 메시지를 주고받습니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold">양방향 통신</div>
                    <div className="text-sm text-gray-600">서버 푸시 가능</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <div className="font-semibold">낮은 지연시간</div>
                    <div className="text-sm text-gray-600">
                      실시간 통신에 최적
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <div className="font-semibold">복잡한 구현</div>
                    <div className="text-sm text-gray-600">연결 관리 필요</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <div className="font-semibold">프록시/방화벽 이슈</div>
                    <div className="text-sm text-gray-600">
                      일부 환경에서 차단
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 연결 수립 과정 */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🤝 WebSocket 핸드셰이크
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  1. 업그레이드 요청
                </h3>
                <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400">{`// HTTP → WebSocket 업그레이드`}</div>
                  <div>GET /chat HTTP/1.1</div>
                  <div>Host: example.com</div>
                  <div className="text-yellow-400">Upgrade: websocket</div>
                  <div className="text-yellow-400">Connection: Upgrade</div>
                  <div>Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==</div>
                  <div>Sec-WebSocket-Version: 13</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  2. 업그레이드 응답
                </h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="text-blue-400">{`// 서버 응답`}</div>
                  <div>HTTP/1.1 101 Switching Protocols</div>
                  <div className="text-yellow-400">Upgrade: websocket</div>
                  <div className="text-yellow-400">Connection: Upgrade</div>
                  <div>Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=</div>
                  <div className="mt-2 text-gray-400">{`// 이제 WebSocket 연결 수립!`}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 실시간 통신이 필요한 경우 */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">
              💡 언제 WebSocket을 사용할까?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-semibold text-purple-700 mb-2">
                  실시간 채팅
                </h3>
                <p className="text-sm text-gray-600">
                  메시지 즉시 전달, 타이핑 상태 표시, 온라인 상태 업데이트
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="font-semibold text-purple-700 mb-2">
                  실시간 데이터
                </h3>
                <p className="text-sm text-gray-600">
                  주식 시세, 스포츠 중계, 실시간 모니터링 대시보드
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300">
                <div className="text-2xl mb-2">🎮</div>
                <h3 className="font-semibold text-purple-700 mb-2">
                  온라인 게임
                </h3>
                <p className="text-sm text-gray-600">
                  멀티플레이어 게임, 실시간 협업 도구, 화면 공유
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 통신 방식 비교 탭 */}
      {activeTab === "comparison" && (
        <div className="space-y-6">
          {/* 실시간 통신 옵션 비교 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">
              🔄 실시간 통신 방식 비교
            </h2>

            {/* 방식 선택 */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setConnectionType("http")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  connectionType === "http"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                HTTP (일반)
              </button>
              <button
                onClick={() => setConnectionType("polling")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  connectionType === "polling"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Polling
              </button>
              <button
                onClick={() => setConnectionType("sse")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  connectionType === "sse"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                SSE
              </button>
              <button
                onClick={() => setConnectionType("websocket")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  connectionType === "websocket"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                WebSocket
              </button>
            </div>

            {/* 각 방식 설명 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              {connectionType === "http" && (
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    🌐 일반 HTTP
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">동작 방식</h4>
                      <div className="bg-white p-4 rounded border border-gray-300">
                        <div className="space-y-2 text-sm">
                          <div>1. 클라이언트가 요청 전송</div>
                          <div>2. 서버가 응답 반환</div>
                          <div>3. 연결 종료</div>
                          <div className="text-red-600">
                            ❌ 서버에서 먼저 보낼 수 없음
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">사용 예시</h4>
                      <pre className="bg-gray-900 text-blue-400 p-3 rounded text-sm">
                        {`// 클라이언트가 필요할 때만 요청
fetch('/api/data')
  .then(res => res.json())
  .then(data => updateUI(data));`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {connectionType === "polling" && (
                <div>
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">
                    ⏱️ Polling (폴링)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">동작 방식</h4>
                      <div className="bg-white p-4 rounded border border-gray-300">
                        <div className="space-y-2 text-sm">
                          <div>1. 주기적으로 서버에 요청</div>
                          <div>2. 새 데이터 확인</div>
                          <div>3. 변경사항 있으면 업데이트</div>
                          <div className="text-yellow-600">
                            ⚠️ 불필요한 요청 많음
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">구현 예시</h4>
                      <pre className="bg-gray-900 text-yellow-400 p-3 rounded text-sm">
                        {`// 5초마다 서버 확인
setInterval(async () => {
  const res = await fetch('/api/updates');
  const data = await res.json();
  if (data.hasUpdates) {
    updateUI(data);
  }
}, 5000);`}
                      </pre>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                    <p className="text-sm">
                      <strong>장점:</strong> 구현이 간단, 모든 브라우저 지원
                      <br />
                      <strong>단점:</strong> 서버 부하 높음, 실시간성 떨어짐,
                      대역폭 낭비
                    </p>
                  </div>
                </div>
              )}

              {connectionType === "sse" && (
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    📡 Server-Sent Events (SSE)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">동작 방식</h4>
                      <div className="bg-white p-4 rounded border border-gray-300">
                        <div className="space-y-2 text-sm">
                          <div>1. 클라이언트가 연결 요청</div>
                          <div>2. 서버가 연결 유지</div>
                          <div>3. 서버에서 이벤트 푸시</div>
                          <div className="text-green-600">
                            ✅ 서버 → 클라이언트 단방향
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">구현 예시</h4>
                      <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                        {`// 서버에서 이벤트 스트림
const eventSource = new EventSource('/api/stream');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateUI(data);
};

eventSource.onerror = () => {
  console.error('SSE 연결 에러');
};`}
                      </pre>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-300">
                    <p className="text-sm">
                      <strong>장점:</strong> HTTP 기반, 자동 재연결, 간단한 구현
                      <br />
                      <strong>단점:</strong> 단방향 통신만 가능, HTTP/2 필요
                    </p>
                  </div>
                </div>
              )}

              {connectionType === "websocket" && (
                <div>
                  <h3 className="text-xl font-bold text-purple-800 mb-4">
                    🔌 WebSocket
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">동작 방식</h4>
                      <div className="bg-white p-4 rounded border border-gray-300">
                        <div className="space-y-2 text-sm">
                          <div>1. HTTP로 핸드셰이크</div>
                          <div>2. 프로토콜 업그레이드</div>
                          <div>3. 양방향 통신 채널 수립</div>
                          <div className="text-purple-600">
                            ✅ 완전한 양방향 통신
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">구현 예시</h4>
                      <pre className="bg-gray-900 text-purple-400 p-3 rounded text-sm">
                        {`// 양방향 실시간 통신
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('연결됨');
  ws.send(JSON.stringify({ type: 'join' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  handleMessage(data);
};

// 언제든 메시지 전송 가능
ws.send(JSON.stringify({ 
  type: 'chat', 
  message: 'Hello!' 
}));`}
                      </pre>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-purple-100 rounded-lg border border-purple-300">
                    <p className="text-sm">
                      <strong>장점:</strong> 완전한 양방향, 낮은 지연시간,
                      효율적
                      <br />
                      <strong>단점:</strong> 복잡한 구현, 연결 관리 필요, 프록시
                      이슈
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 성능 비교 차트 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">📊 성능 비교</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left">특성</th>
                    <th className="px-4 py-3 text-center">HTTP</th>
                    <th className="px-4 py-3 text-center">Polling</th>
                    <th className="px-4 py-3 text-center">SSE</th>
                    <th className="px-4 py-3 text-center">WebSocket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-medium">통신 방향</td>
                    <td className="px-4 py-3 text-center">단방향</td>
                    <td className="px-4 py-3 text-center">단방향</td>
                    <td className="px-4 py-3 text-center">서버→클라이언트</td>
                    <td className="px-4 py-3 text-center text-green-600">
                      양방향
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">실시간성</td>
                    <td className="px-4 py-3 text-center">❌</td>
                    <td className="px-4 py-3 text-center">⚠️</td>
                    <td className="px-4 py-3 text-center">✅</td>
                    <td className="px-4 py-3 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">서버 부하</td>
                    <td className="px-4 py-3 text-center text-green-600">
                      낮음
                    </td>
                    <td className="px-4 py-3 text-center text-red-600">높음</td>
                    <td className="px-4 py-3 text-center text-yellow-600">
                      중간
                    </td>
                    <td className="px-4 py-3 text-center text-yellow-600">
                      중간
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">구현 복잡도</td>
                    <td className="px-4 py-3 text-center text-green-600">
                      쉬움
                    </td>
                    <td className="px-4 py-3 text-center text-green-600">
                      쉬움
                    </td>
                    <td className="px-4 py-3 text-center text-yellow-600">
                      보통
                    </td>
                    <td className="px-4 py-3 text-center text-red-600">
                      어려움
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">브라우저 지원</td>
                    <td className="px-4 py-3 text-center">100%</td>
                    <td className="px-4 py-3 text-center">100%</td>
                    <td className="px-4 py-3 text-center">95%</td>
                    <td className="px-4 py-3 text-center">98%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 실시간 데모 탭 */}
      {activeTab === "demo" && (
        <div className="space-y-6">
          {/* WebSocket 채팅 데모 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">
              💬 WebSocket 실시간 채팅 데모
            </h2>

            {/* 연결 상태 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      wsStatus === "connected"
                        ? "bg-green-500"
                        : wsStatus === "connecting"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-medium">
                    {wsStatus === "connected"
                      ? "연결됨"
                      : wsStatus === "connecting"
                      ? "연결 중..."
                      : "연결 끊김"}
                  </span>
                </div>
                <button
                  onClick={
                    wsStatus === "disconnected"
                      ? connectWebSocket
                      : disconnectWebSocket
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    wsStatus === "disconnected"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                  disabled={wsStatus === "connecting"}
                >
                  {wsStatus === "disconnected" ? "연결하기" : "연결 끊기"}
                </button>
              </div>
            </div>

            {/* 채팅 메시지 영역 */}
            <div className="mb-4 h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  WebSocket에 연결하여 실시간 메시지를 주고받아보세요!
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "client"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === "client"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="text-sm">{msg.text}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 메시지 입력 */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                disabled={wsStatus !== "connected"}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  wsStatus === "connected"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={wsStatus !== "connected"}
              >
                전송
              </button>
            </div>
          </div>

          {/* 사용 예시 코드 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">💻 WebSocket 구현 예제</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">클라이언트 (JavaScript)</h3>
                <pre className="bg-gray-900 text-purple-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {`class ChatClient {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.ws.onopen = () => {
      console.log('WebSocket 연결 성공');
      this.updateStatus('connected');
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.displayMessage(message);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket 에러:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket 연결 종료');
      this.updateStatus('disconnected');
      // 재연결 로직
      setTimeout(() => this.reconnect(), 5000);
    };
  }

  sendMessage(text) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'message',
        text: text,
        timestamp: new Date()
      }));
    }
  }
}`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-3">서버 (Node.js)</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {`const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('새 클라이언트 연결');
  
  // 연결 메시지
  ws.send(JSON.stringify({
    type: 'system',
    text: '채팅방에 입장하셨습니다.'
  }));

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    // 모든 클라이언트에게 브로드캐스트
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          ...message,
          serverId: generateId()
        }));
      }
    });
  });

  ws.on('close', () => {
    console.log('클라이언트 연결 종료');
  });
});`}
                </pre>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              💡 WebSocket Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-yellow-700 mb-3">
                  ✅ 권장사항
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>자동 재연결 구현</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>하트비트(ping/pong) 구현</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>메시지 큐잉 (오프라인 시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>바이너리 데이터 사용 (대용량)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>연결 수 제한</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-700 mb-3">
                  ❌ 피해야 할 것
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>무한 재연결 시도</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>거대한 메시지 전송</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>동기적 처리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>에러 처리 누락</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>메모리 누수 방치</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { WebSocketHttpLanding };
