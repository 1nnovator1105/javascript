"use client";

import React, { useState } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";

interface APIRequest {
  id: string;
  type: "REST" | "GraphQL";
  endpoint: string;
  method: string;
  body?: string;
  response: any;
  size: number;
  time: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
  followers: User[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
}

interface Comment {
  id: string;
  text: string;
  author: User;
}

const GraphQLRestLanding = () => {
  const [selectedScenario, setSelectedScenario] = useState<
    "user-posts" | "post-details" | "user-network"
  >("user-posts");
  const [apiRequests, setApiRequests] = useState<APIRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    user: ["id", "name", "email"],
    posts: ["id", "title"],
    comments: ["id", "text"],
  });

  // 모의 데이터
  const mockData = {
    users: [
      {
        id: "1",
        name: "김철수",
        email: "kim@example.com",
        age: 28,
        address: "서울시 강남구",
        phone: "010-1234-5678",
        posts: ["1", "2"],
        followers: ["2", "3"],
      },
    ],
    posts: [
      {
        id: "1",
        title: "GraphQL의 이점",
        content: "GraphQL은 클라이언트가 필요한 데이터를 정확히 요청할 수 있습니다...",
        authorId: "1",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-02",
        tags: ["graphql", "api"],
        comments: ["1", "2"],
      },
      {
        id: "2",
        title: "REST API 설계 원칙",
        content: "RESTful API를 설계할 때는 다음과 같은 원칙을 따라야 합니다...",
        authorId: "1",
        createdAt: "2024-01-03",
        updatedAt: "2024-01-04",
        tags: ["rest", "api"],
        comments: ["3"],
      },
    ],
    comments: [
      {
        id: "1",
        text: "좋은 글이네요!",
        authorId: "2",
        postId: "1",
        createdAt: "2024-01-02",
      },
      {
        id: "2",
        text: "도움이 많이 되었습니다.",
        authorId: "3",
        postId: "1",
        createdAt: "2024-01-02",
      },
    ],
  };

  // REST API 시뮬레이션
  const simulateRestAPI = async (scenario: string) => {
    setIsLoading(true);
    const requests: APIRequest[] = [];

    switch (scenario) {
      case "user-posts":
        // 1. 사용자 정보 가져오기
        requests.push({
          id: Date.now().toString(),
          type: "REST",
          endpoint: "/api/users/1",
          method: "GET",
          response: mockData.users[0],
          size: JSON.stringify(mockData.users[0]).length,
          time: 150,
        });

        // 2. 사용자의 게시글 가져오기
        await new Promise((resolve) => setTimeout(resolve, 150));
        requests.push({
          id: (Date.now() + 1).toString(),
          type: "REST",
          endpoint: "/api/users/1/posts",
          method: "GET",
          response: mockData.posts,
          size: JSON.stringify(mockData.posts).length,
          time: 200,
        });
        break;

      case "post-details":
        // 1. 게시글 정보
        requests.push({
          id: Date.now().toString(),
          type: "REST",
          endpoint: "/api/posts/1",
          method: "GET",
          response: mockData.posts[0],
          size: JSON.stringify(mockData.posts[0]).length,
          time: 100,
        });

        // 2. 작성자 정보
        await new Promise((resolve) => setTimeout(resolve, 100));
        requests.push({
          id: (Date.now() + 1).toString(),
          type: "REST",
          endpoint: "/api/users/1",
          method: "GET",
          response: mockData.users[0],
          size: JSON.stringify(mockData.users[0]).length,
          time: 150,
        });

        // 3. 댓글 목록
        await new Promise((resolve) => setTimeout(resolve, 150));
        requests.push({
          id: (Date.now() + 2).toString(),
          type: "REST",
          endpoint: "/api/posts/1/comments",
          method: "GET",
          response: mockData.comments.filter((c) => c.postId === "1"),
          size: JSON.stringify(
            mockData.comments.filter((c) => c.postId === "1")
          ).length,
          time: 180,
        });
        break;
    }

    setApiRequests(requests);
    setIsLoading(false);
  };

  // GraphQL 시뮬레이션
  const simulateGraphQL = async (scenario: string) => {
    setIsLoading(true);
    const requests: APIRequest[] = [];

    const graphqlQueries = {
      "user-posts": `query GetUserWithPosts {
  user(id: "1") {
    id
    name
    email
    posts {
      id
      title
    }
  }
}`,
      "post-details": `query GetPostDetails {
  post(id: "1") {
    id
    title
    content
    author {
      id
      name
    }
    comments {
      id
      text
      author {
        name
      }
    }
  }
}`,
    };

    const graphqlResponses = {
      "user-posts": {
        data: {
          user: {
            id: "1",
            name: "김철수",
            email: "kim@example.com",
            posts: [
              { id: "1", title: "GraphQL의 이점" },
              { id: "2", title: "REST API 설계 원칙" },
            ],
          },
        },
      },
      "post-details": {
        data: {
          post: {
            id: "1",
            title: "GraphQL의 이점",
            content:
              "GraphQL은 클라이언트가 필요한 데이터를 정확히 요청할 수 있습니다...",
            author: {
              id: "1",
              name: "김철수",
            },
            comments: [
              {
                id: "1",
                text: "좋은 글이네요!",
                author: { name: "이영희" },
              },
              {
                id: "2",
                text: "도움이 많이 되었습니다.",
                author: { name: "박민수" },
              },
            ],
          },
        },
      },
    };

    await new Promise((resolve) => setTimeout(resolve, 200));

    requests.push({
      id: Date.now().toString(),
      type: "GraphQL",
      endpoint: "/graphql",
      method: "POST",
      body: graphqlQueries[scenario as keyof typeof graphqlQueries],
      response: graphqlResponses[scenario as keyof typeof graphqlResponses],
      size: JSON.stringify(
        graphqlResponses[scenario as keyof typeof graphqlResponses]
      ).length,
      time: 200,
    });

    setApiRequests(requests);
    setIsLoading(false);
  };

  // 시나리오 설명
  const scenarios = {
    "user-posts": {
      title: "사용자와 게시글 조회",
      description: "특정 사용자의 정보와 그가 작성한 게시글 목록을 가져옵니다",
      restCalls: 2,
      graphqlCalls: 1,
    },
    "post-details": {
      title: "게시글 상세 조회",
      description:
        "게시글의 상세 정보, 작성자 정보, 댓글 목록을 모두 가져옵니다",
      restCalls: 3,
      graphqlCalls: 1,
    },
    "user-network": {
      title: "사용자 네트워크 조회",
      description: "사용자와 팔로워, 팔로워의 게시글까지 조회합니다",
      restCalls: 5,
      graphqlCalls: 1,
    },
  };

  // 총 요청 통계 계산
  const calculateStats = () => {
    const totalRequests = apiRequests.length;
    const totalSize = apiRequests.reduce((sum, req) => sum + req.size, 0);
    const totalTime = Math.max(...apiRequests.map((req) => req.time), 0);
    const type = apiRequests[0]?.type || "N/A";

    return { totalRequests, totalSize, totalTime, type };
  };

  const stats = calculateStats();

  return (
    <StudyPageLayout
      title="GraphQL vs REST"
      subtitle="REST API와 GraphQL의 차이점을 실제 요청/응답 비교로 학습합니다"
      showBackButton
    >
      <div className="space-y-8">
        {/* 시나리오 선택 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">시나리오 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedScenario(
                    key as "user-posts" | "post-details" | "user-network"
                  );
                  setApiRequests([]);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedScenario === key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="font-semibold mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {scenario.description}
                </p>
                <div className="flex justify-between text-xs">
                  <span className="text-red-600">
                    REST: {scenario.restCalls}회
                  </span>
                  <span className="text-green-600">
                    GraphQL: {scenario.graphqlCalls}회
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* API 호출 시뮬레이션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* REST API */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-600">REST API</h3>
              <button
                onClick={() => simulateRestAPI(selectedScenario)}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                REST 요청 실행
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {apiRequests
                .filter((req) => req.type === "REST")
                .map((request, index) => (
                  <div
                    key={request.id}
                    className="p-3 bg-red-50 rounded border border-red-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-mono text-sm font-semibold">
                          {request.method} {request.endpoint}
                        </span>
                        <div className="text-xs text-gray-600 mt-1">
                          요청 #{index + 1}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {request.time}ms
                        </div>
                        <div className="text-xs text-gray-600">
                          {request.size} bytes
                        </div>
                      </div>
                    </div>
                    <details className="cursor-pointer">
                      <summary className="text-xs text-gray-600 hover:text-gray-800">
                        응답 데이터 보기
                      </summary>
                      <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
                        {JSON.stringify(request.response, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              {apiRequests.filter((req) => req.type === "REST").length ===
                0 && (
                <div className="text-center py-8 text-gray-400">
                  REST 요청을 실행해보세요
                </div>
              )}
            </div>
          </div>

          {/* GraphQL */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-green-600">GraphQL</h3>
              <button
                onClick={() => simulateGraphQL(selectedScenario)}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                GraphQL 요청 실행
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {apiRequests
                .filter((req) => req.type === "GraphQL")
                .map((request) => (
                  <div
                    key={request.id}
                    className="p-3 bg-green-50 rounded border border-green-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-mono text-sm font-semibold">
                          {request.method} {request.endpoint}
                        </span>
                        <div className="text-xs text-gray-600 mt-1">
                          단일 요청
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {request.time}ms
                        </div>
                        <div className="text-xs text-gray-600">
                          {request.size} bytes
                        </div>
                      </div>
                    </div>
                    {request.body && (
                      <details className="cursor-pointer mb-2">
                        <summary className="text-xs text-gray-600 hover:text-gray-800">
                          쿼리 보기
                        </summary>
                        <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
                          {request.body}
                        </pre>
                      </details>
                    )}
                    <details className="cursor-pointer">
                      <summary className="text-xs text-gray-600 hover:text-gray-800">
                        응답 데이터 보기
                      </summary>
                      <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
                        {JSON.stringify(request.response, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              {apiRequests.filter((req) => req.type === "GraphQL").length ===
                0 && (
                <div className="text-center py-8 text-gray-400">
                  GraphQL 요청을 실행해보세요
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 비교 통계 */}
        {apiRequests.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">요청 비교 분석</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-3xl font-bold text-blue-600">
                  {stats.totalRequests}
                </div>
                <div className="text-sm text-gray-600 mt-1">총 요청 횟수</div>
                <div className="text-xs text-gray-500 mt-1">{stats.type}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.totalSize}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  총 데이터 크기 (bytes)
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.totalTime}ms
                </div>
                <div className="text-sm text-gray-600 mt-1">총 소요 시간</div>
              </div>
            </div>
          </div>
        )}

        {/* 개념 설명 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Over-fetching & Under-fetching */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">
              Over-fetching & Under-fetching
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded">
                <h4 className="font-semibold text-red-700 mb-2">
                  Over-fetching (REST)
                </h4>
                <p className="text-sm text-gray-700">
                  필요하지 않은 데이터까지 모두 받아오는 문제
                </p>
                <div className="mt-2 p-2 bg-white rounded">
                  <code className="text-xs">
                    GET /users/1 → 모든 사용자 정보 (이름만 필요한데...)
                  </code>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded">
                <h4 className="font-semibold text-yellow-700 mb-2">
                  Under-fetching (REST)
                </h4>
                <p className="text-sm text-gray-700">
                  필요한 데이터를 얻기 위해 여러 번 요청해야 하는 문제
                </p>
                <div className="mt-2 p-2 bg-white rounded">
                  <code className="text-xs">
                    GET /posts/1 → GET /users/1 → GET /comments
                  </code>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-semibold text-green-700 mb-2">
                  GraphQL 해결책
                </h4>
                <p className="text-sm text-gray-700">
                  필요한 데이터만 정확히 요청하여 단일 쿼리로 해결
                </p>
              </div>
            </div>
          </div>

          {/* 장단점 비교 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">장단점 비교</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">REST</h4>
                <div className="text-sm space-y-1">
                  <p className="text-green-600">✅ 간단하고 직관적</p>
                  <p className="text-green-600">✅ 캐싱이 쉬움</p>
                  <p className="text-green-600">✅ 파일 업/다운로드 용이</p>
                  <p className="text-red-600">❌ Over/Under-fetching</p>
                  <p className="text-red-600">❌ 버전 관리 복잡</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">GraphQL</h4>
                <div className="text-sm space-y-1">
                  <p className="text-green-600">✅ 정확한 데이터 요청</p>
                  <p className="text-green-600">✅ 단일 엔드포인트</p>
                  <p className="text-green-600">✅ 강력한 타입 시스템</p>
                  <p className="text-red-600">❌ 학습 곡선이 가파름</p>
                  <p className="text-red-600">❌ 캐싱이 복잡함</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GraphQL 스키마 예제 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">GraphQL 스키마 예제</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  followers: [User!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
}

type Query {
  user(id: ID!): User
  post(id: ID!): Post
  users: [User!]!
}

type Mutation {
  createPost(title: String!, content: String!): Post!
  updateUser(id: ID!, name: String, email: String): User!
}`}</pre>
          </div>
        </div>

        {/* 사용 사례 */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">언제 무엇을 사용할까?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 rounded">
              <h4 className="font-semibold text-red-700 mb-2">
                REST가 적합한 경우
              </h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 간단한 CRUD 작업</li>
                <li>• 파일 업로드/다운로드</li>
                <li>• 캐싱이 중요한 경우</li>
                <li>• 팀의 GraphQL 경험이 없는 경우</li>
                <li>• 공개 API (더 보편적)</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold text-green-700 mb-2">
                GraphQL이 적합한 경우
              </h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 복잡한 데이터 관계</li>
                <li>• 모바일 앱 (데이터 최적화 중요)</li>
                <li>• 마이크로서비스 아키텍처</li>
                <li>• 빠른 프로토타이핑</li>
                <li>• 실시간 업데이트 (Subscriptions)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
};

export default GraphQLRestLanding;