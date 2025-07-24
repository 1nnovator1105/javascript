"use client";

import React, { useState } from "react";
import { getColorClass } from "@/utils/colorMigration";

interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  users?: User[];
  message?: string;
  deleted_at?: string;
  [key: string]: unknown;
}

const RestfulApiLanding = () => {
  const [activeTab, setActiveTab] = useState<"concept" | "methods" | "design">("concept");
  const [selectedMethod, setSelectedMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH">("GET");
  const [statusCode, setStatusCode] = useState<string>("");
  const [apiEndpoint, setApiEndpoint] = useState("/api/users");
  const [apiResponse, setApiResponse] = useState<User | ApiResponse | null>(null);

  // API 테스트 시뮬레이션
  const testApi = () => {
    // 시뮬레이션된 응답
    const responses: Record<string, User | ApiResponse> = {
      "GET": {
        users: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" }
        ]
      },
      "POST": {
        id: 3,
        name: "New User",
        email: "new@example.com",
        created_at: new Date().toISOString()
      },
      "PUT": {
        id: 1,
        name: "John Doe Updated",
        email: "john.updated@example.com",
        updated_at: new Date().toISOString()
      },
      "DELETE": {
        message: "User deleted successfully",
        deleted_at: new Date().toISOString()
      },
      "PATCH": {
        id: 1,
        name: "John Doe",
        email: "john.new@example.com",
        updated_at: new Date().toISOString()
      }
    };

    setApiResponse(responses[selectedMethod]);
  };

  // HTTP 상태 코드 정보
  const statusCodes = {
    "2xx": [
      { code: "200", name: "OK", desc: "요청 성공" },
      { code: "201", name: "Created", desc: "리소스 생성 성공" },
      { code: "204", name: "No Content", desc: "성공했지만 응답 본문 없음" }
    ],
    "3xx": [
      { code: "301", name: "Moved Permanently", desc: "영구 이동" },
      { code: "302", name: "Found", desc: "임시 이동" },
      { code: "304", name: "Not Modified", desc: "변경되지 않음" }
    ],
    "4xx": [
      { code: "400", name: "Bad Request", desc: "잘못된 요청" },
      { code: "401", name: "Unauthorized", desc: "인증 필요" },
      { code: "403", name: "Forbidden", desc: "권한 없음" },
      { code: "404", name: "Not Found", desc: "리소스 없음" }
    ],
    "5xx": [
      { code: "500", name: "Internal Server Error", desc: "서버 내부 오류" },
      { code: "502", name: "Bad Gateway", desc: "게이트웨이 오류" },
      { code: "503", name: "Service Unavailable", desc: "서비스 이용 불가" }
    ]
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
          📚 REST 개념
        </button>
        <button
          onClick={() => setActiveTab("methods")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "methods"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔧 HTTP 메서드
        </button>
        <button
          onClick={() => setActiveTab("design")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "design"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🎨 API 설계
        </button>
      </div>

      {/* REST 개념 탭 */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* REST란? */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">🌐 REST란 무엇인가?</h2>
            <p className="text-gray-700 mb-4">
              REST(Representational State Transfer)는 분산 시스템을 위한 아키텍처 스타일로,
              HTTP를 기반으로 클라이언트와 서버 간의 통신을 위한 규칙을 정의합니다.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-300">
              <h3 className="font-semibold text-blue-700 mb-3">🔑 REST의 6가지 제약 조건</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">1.</span>
                    <div>
                      <div className="font-semibold">Client-Server</div>
                      <div className="text-sm text-gray-600">클라이언트와 서버의 분리</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">2.</span>
                    <div>
                      <div className="font-semibold">Stateless</div>
                      <div className="text-sm text-gray-600">무상태성 - 각 요청은 독립적</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">3.</span>
                    <div>
                      <div className="font-semibold">Cacheable</div>
                      <div className="text-sm text-gray-600">캐시 가능한 응답</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">4.</span>
                    <div>
                      <div className="font-semibold">Uniform Interface</div>
                      <div className="text-sm text-gray-600">일관된 인터페이스</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">5.</span>
                    <div>
                      <div className="font-semibold">Layered System</div>
                      <div className="text-sm text-gray-600">계층화된 시스템</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">6.</span>
                    <div>
                      <div className="font-semibold">Code on Demand</div>
                      <div className="text-sm text-gray-600">선택적 - 실행 코드 전송</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESTful API 특징 */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">✨ RESTful API의 특징</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <div className="text-2xl mb-2">📦</div>
                <h3 className="font-semibold text-green-700 mb-2">리소스 중심</h3>
                <p className="text-sm text-gray-600">
                  모든 것을 리소스로 표현하고 고유한 URI로 식별
                </p>
                <div className="mt-3 bg-gray-100 p-2 rounded text-xs font-mono">
                  /users/123<br/>
                  /products/456<br/>
                  /orders/789
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="font-semibold text-green-700 mb-2">표준 메서드</h3>
                <p className="text-sm text-gray-600">
                  HTTP 메서드를 사용한 일관된 인터페이스
                </p>
                <div className="mt-3 space-y-1 text-xs">
                  <div><span className="font-bold text-blue-600">GET</span> - 조회</div>
                  <div><span className="font-bold text-green-600">POST</span> - 생성</div>
                  <div><span className="font-bold text-orange-600">PUT</span> - 수정</div>
                  <div><span className="font-bold text-red-600">DELETE</span> - 삭제</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-green-700 mb-2">표현 전송</h3>
                <p className="text-sm text-gray-600">
                  JSON, XML 등 다양한 형식으로 리소스 표현
                </p>
                <div className="mt-3 bg-gray-100 p-2 rounded text-xs font-mono">
                  Content-Type: application/json<br/>
                  Accept: application/json
                </div>
              </div>
            </div>
          </div>

          {/* 상태 코드 참조 */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 HTTP 상태 코드</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="상태 코드 검색 (예: 200, 404)"
                value={statusCode}
                onChange={(e) => setStatusCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(statusCodes).map(([category, codes]) => (
                <div key={category} className="space-y-2">
                  <h3 className={`font-semibold text-lg ${
                    category === "2xx" ? "text-green-700" :
                    category === "3xx" ? "text-blue-700" :
                    category === "4xx" ? "text-yellow-700" :
                    "text-red-700"
                  }`}>
                    {category} {
                      category === "2xx" ? "성공" :
                      category === "3xx" ? "리다이렉션" :
                      category === "4xx" ? "클라이언트 오류" :
                      "서버 오류"
                    }
                  </h3>
                  {codes
                    .filter(c => !statusCode || c.code.includes(statusCode) || c.name.toLowerCase().includes(statusCode.toLowerCase()))
                    .map(({ code, name, desc }) => (
                      <div
                        key={code}
                        className={`p-3 rounded-lg border ${
                          category === "2xx" ? "bg-green-50 border-green-300" :
                          category === "3xx" ? "bg-blue-50 border-blue-300" :
                          category === "4xx" ? "bg-yellow-50 border-yellow-300" :
                          "bg-red-50 border-red-300"
                        }`}
                      >
                        <div className="font-semibold text-sm">{code} {name}</div>
                        <div className="text-xs text-gray-600">{desc}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HTTP 메서드 탭 */}
      {activeTab === "methods" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔧 HTTP 메서드 가이드</h2>
            
            {/* 메서드 선택 */}
            <div className="flex flex-wrap gap-3 mb-6">
              {(["GET", "POST", "PUT", "DELETE", "PATCH"] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedMethod === method
                      ? method === "GET" ? "bg-blue-500 text-white" :
                        method === "POST" ? "bg-green-500 text-white" :
                        method === "PUT" ? "bg-orange-500 text-white" :
                        method === "DELETE" ? "bg-red-500 text-white" :
                        `${getColorClass('bg-purple-500')} text-white`
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* 메서드 상세 설명 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              {selectedMethod === "GET" && (
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-4">GET - 리소스 조회</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">특징</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• 서버의 리소스를 조회할 때 사용</li>
                        <li>• 요청 본문(body) 없음</li>
                        <li>• 안전(Safe)하고 멱등(Idempotent)함</li>
                        <li>• 캐시 가능</li>
                        <li>• URL에 쿼리 파라미터 포함 가능</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">예제</h4>
                      <pre className="bg-gray-900 text-blue-400 p-3 rounded text-sm">
{`// 모든 사용자 조회
GET /api/users

// 특정 사용자 조회
GET /api/users/123

// 필터링
GET /api/users?role=admin&status=active

// 페이지네이션
GET /api/users?page=2&limit=10`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "POST" && (
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-4">POST - 리소스 생성</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">특징</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• 새로운 리소스를 생성할 때 사용</li>
                        <li>• 요청 본문에 데이터 포함</li>
                        <li>• 멱등하지 않음 (반복 실행 시 다른 결과)</li>
                        <li>• 성공 시 201 Created 반환</li>
                        <li>• Location 헤더로 생성된 리소스 위치 전달</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">예제</h4>
                      <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`// 새 사용자 생성
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

// 응답
201 Created
Location: /api/users/123`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "PUT" && (
                <div>
                  <h3 className="text-xl font-bold text-orange-700 mb-4">PUT - 리소스 전체 수정</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">특징</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• 리소스 전체를 교체할 때 사용</li>
                        <li>• 요청 본문에 전체 데이터 포함</li>
                        <li>• 멱등함 (같은 요청 반복 가능)</li>
                        <li>• 리소스가 없으면 생성 가능</li>
                        <li>• 부분 수정은 PATCH 사용</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">예제</h4>
                      <pre className="bg-gray-900 text-orange-400 p-3 rounded text-sm">
{`// 사용자 정보 전체 수정
PUT /api/users/123
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe Updated",
  "email": "john.new@example.com",
  "role": "admin"
}

// 응답
200 OK`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "DELETE" && (
                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-4">DELETE - 리소스 삭제</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">특징</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• 리소스를 삭제할 때 사용</li>
                        <li>• 일반적으로 요청 본문 없음</li>
                        <li>• 멱등함 (여러 번 호출해도 같은 결과)</li>
                        <li>• 성공 시 204 No Content 반환</li>
                        <li>• 이미 삭제된 리소스도 성공 처리</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">예제</h4>
                      <pre className="bg-gray-900 text-red-400 p-3 rounded text-sm">
{`// 특정 사용자 삭제
DELETE /api/users/123

// 응답
204 No Content

// 또는 삭제 정보 반환
200 OK
{
  "message": "User deleted successfully",
  "deletedAt": "2024-01-15T10:30:00Z"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "PATCH" && (
                <div>
                  <h3 className={`text-xl font-bold ${getColorClass('text-purple-700')} mb-4`}>PATCH - 리소스 부분 수정</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">특징</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• 리소스의 일부만 수정할 때 사용</li>
                        <li>• 변경할 필드만 전송</li>
                        <li>• 멱등할 수도, 아닐 수도 있음</li>
                        <li>• PUT보다 효율적</li>
                        <li>• JSON Patch 형식 사용 가능</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">예제</h4>
                      <pre className={`bg-gray-900 ${getColorClass('text-purple-400')} p-3 rounded text-sm`}>
{`// 이메일만 수정
PATCH /api/users/123
Content-Type: application/json

{
  "email": "newemail@example.com"
}

// JSON Patch 형식
PATCH /api/users/123
Content-Type: application/json-patch+json

[
  { "op": "replace", "path": "/email", "value": "new@example.com" },
  { "op": "add", "path": "/phone", "value": "010-1234-5678" }
]`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 메서드 비교표 */}
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <h3 className="text-xl font-bold mb-4">📊 HTTP 메서드 비교</h3>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">메서드</th>
                  <th className="px-4 py-2 text-left">용도</th>
                  <th className="px-4 py-2 text-center">안전성</th>
                  <th className="px-4 py-2 text-center">멱등성</th>
                  <th className="px-4 py-2 text-center">캐시 가능</th>
                  <th className="px-4 py-2 text-center">요청 본문</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-blue-600">GET</td>
                  <td className="px-4 py-2">리소스 조회</td>
                  <td className="px-4 py-2 text-center">✅</td>
                  <td className="px-4 py-2 text-center">✅</td>
                  <td className="px-4 py-2 text-center">✅</td>
                  <td className="px-4 py-2 text-center">❌</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-green-600">POST</td>
                  <td className="px-4 py-2">리소스 생성</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">⚠️</td>
                  <td className="px-4 py-2 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-orange-600">PUT</td>
                  <td className="px-4 py-2">리소스 전체 수정</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">✅</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className={`px-4 py-2 font-medium ${getColorClass('text-purple-600')}`}>PATCH</td>
                  <td className="px-4 py-2">리소스 부분 수정</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">⚠️</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">✅</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-red-600">DELETE</td>
                  <td className="px-4 py-2">리소스 삭제</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">✅</td>
                  <td className="px-4 py-2 text-center">❌</td>
                  <td className="px-4 py-2 text-center">⚠️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* API 설계 탭 */}
      {activeTab === "design" && (
        <div className="space-y-6">
          {/* RESTful URL 설계 원칙 */}
          <div className={`${getColorClass('bg-indigo-50')} rounded-lg p-6 border ${getColorClass('border-indigo-200')}`}>
            <h2 className={`text-2xl font-bold ${getColorClass('text-indigo-800')} mb-4`}>🎨 RESTful URL 설계 원칙</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`bg-white p-4 rounded-lg border ${getColorClass('border-indigo-300')}`}>
                <h3 className="font-semibold text-green-700 mb-3">✅ 좋은 예시</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="p-2 bg-green-50 rounded">GET /users</div>
                  <div className="p-2 bg-green-50 rounded">GET /users/123</div>
                  <div className="p-2 bg-green-50 rounded">POST /users</div>
                  <div className="p-2 bg-green-50 rounded">PUT /users/123</div>
                  <div className="p-2 bg-green-50 rounded">GET /users/123/orders</div>
                  <div className="p-2 bg-green-50 rounded">GET /products?category=electronics</div>
                </div>
              </div>
              <div className={`bg-white p-4 rounded-lg border ${getColorClass('border-indigo-300')}`}>
                <h3 className="font-semibold text-red-700 mb-3">❌ 나쁜 예시</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="p-2 bg-red-50 rounded">GET /getUsers</div>
                  <div className="p-2 bg-red-50 rounded">GET /users/get/123</div>
                  <div className="p-2 bg-red-50 rounded">POST /createUser</div>
                  <div className="p-2 bg-red-50 rounded">GET /users/123/delete</div>
                  <div className="p-2 bg-red-50 rounded">POST /users/123/update</div>
                  <div className="p-2 bg-red-50 rounded">GET /get-products-by-category</div>
                </div>
              </div>
            </div>
            <div className={`mt-4 p-4 ${getColorClass('bg-indigo-100')} rounded-lg`}>
              <h4 className={`font-semibold ${getColorClass('text-indigo-800')} mb-2`}>💡 설계 팁</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 명사를 사용하고 동사는 피하세요 (리소스 중심)</li>
                <li>• 복수형을 사용하세요 (/users, /products)</li>
                <li>• 계층 구조는 슬래시(/)로 표현하세요</li>
                <li>• 필터링은 쿼리 파라미터를 사용하세요</li>
                <li>• 소문자와 하이픈(-)을 사용하세요</li>
              </ul>
            </div>
          </div>

          {/* API 테스터 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🧪 RESTful API 테스터</h2>
            
            <div className="space-y-4">
              {/* 메서드 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTTP 메서드
                </label>
                <div className="flex gap-2">
                  {(["GET", "POST", "PUT", "DELETE", "PATCH"] as const).map(method => (
                    <button
                      key={method}
                      onClick={() => setSelectedMethod(method)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        selectedMethod === method
                          ? method === "GET" ? "bg-blue-500 text-white" :
                            method === "POST" ? "bg-green-500 text-white" :
                            method === "PUT" ? "bg-orange-500 text-white" :
                            method === "DELETE" ? "bg-red-500 text-white" :
                            `${getColorClass('bg-purple-500')} text-white`
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* URL 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  엔드포인트 URL
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2 bg-gray-100 rounded-l-lg text-gray-600">
                    https://api.example.com
                  </span>
                  <input
                    type="text"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg"
                  />
                </div>
              </div>

              {/* 요청 본문 (POST, PUT, PATCH) */}
              {["POST", "PUT", "PATCH"].includes(selectedMethod) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    요청 본문 (JSON)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    rows={6}
                    defaultValue={JSON.stringify(
                      selectedMethod === "POST" ? {
                        name: "New User",
                        email: "new@example.com"
                      } : selectedMethod === "PUT" ? {
                        id: 1,
                        name: "Updated User",
                        email: "updated@example.com"
                      } : {
                        email: "patched@example.com"
                      }, null, 2
                    )}
                  />
                </div>
              )}

              {/* 요청 보내기 버튼 */}
              <button
                onClick={testApi}
                className={`w-full py-3 ${getColorClass('bg-indigo-500')} text-white rounded-lg font-medium ${getColorClass('hover:bg-indigo-600')} transition-colors`}
              >
                요청 보내기
              </button>

              {/* 응답 표시 */}
              {apiResponse && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-gray-700">응답</h3>
                  
                  {/* 상태 코드 */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">상태 코드:</span>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      selectedMethod === "DELETE" ? "bg-green-100 text-green-800" :
                      selectedMethod === "POST" ? "bg-green-100 text-green-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {selectedMethod === "DELETE" ? "204 No Content" :
                       selectedMethod === "POST" ? "201 Created" :
                       "200 OK"}
                    </span>
                  </div>

                  {/* 응답 헤더 */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">응답 헤더</h4>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                      Content-Type: application/json<br/>
                      {selectedMethod === "POST" && "Location: /api/users/3"}
                    </div>
                  </div>

                  {/* 응답 본문 */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">응답 본문</h4>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">💡 RESTful API Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-yellow-700 mb-3">버전 관리</h3>
                <pre className="bg-white p-3 rounded border border-yellow-300 text-sm">
{`// URL 경로에 버전 포함
/api/v1/users
/api/v2/users

// 헤더로 버전 지정
Accept: application/vnd.api+json;version=1`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-700 mb-3">페이지네이션</h3>
                <pre className="bg-white p-3 rounded border border-yellow-300 text-sm">
{`// Offset 기반
/api/users?limit=20&offset=40

// 페이지 기반
/api/users?page=3&per_page=20

// 커서 기반
/api/users?cursor=eyJpZCI6MTAwfQ&limit=20`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-700 mb-3">필터링 & 정렬</h3>
                <pre className="bg-white p-3 rounded border border-yellow-300 text-sm">
{`// 필터링
/api/users?status=active&role=admin

// 정렬
/api/users?sort=created_at&order=desc

// 필드 선택
/api/users?fields=id,name,email`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-700 mb-3">에러 응답 형식</h3>
                <pre className="bg-white p-3 rounded border border-yellow-300 text-sm">
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값이 유효하지 않습니다.",
    "details": [
      {
        "field": "email",
        "message": "올바른 이메일 형식이 아닙니다."
      }
    ]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { RestfulApiLanding };