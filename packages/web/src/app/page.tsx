"use client";

import { useState } from "react";
import { formatDate, validateEmail, APP_CONFIG, User } from "@monorepo/shared";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleEmailValidation = () => {
    const valid = validateEmail(email);
    setIsValid(valid);
  };

  const currentDate = formatDate(new Date());

  const sampleUser: User = {
    id: "1",
    name: "홍길동",
    email: "hong@example.com",
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {APP_CONFIG.APP_NAME}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monorepo with Next.js, TypeScript, Tailwind CSS
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            오늘 날짜: {currentDate}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Validation Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              이메일 유효성 검사
            </h2>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleEmailValidation}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                유효성 검사
              </button>
              {isValid !== null && (
                <div
                  className={`p-3 rounded-lg ${
                    isValid
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {isValid
                    ? "✅ 유효한 이메일입니다!"
                    : "❌ 유효하지 않은 이메일입니다."}
                </div>
              )}
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              샘플 사용자 정보
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  ID:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {sampleUser.id}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  이름:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {sampleUser.name}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  이메일:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {sampleUser.email}
                </span>
              </div>
            </div>
          </div>

          {/* Config Info Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              애플리케이션 설정
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  API Base URL:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white break-all">
                  {APP_CONFIG.API_BASE_URL}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  앱 이름:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {APP_CONFIG.APP_NAME}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            이 페이지는{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              shared
            </code>{" "}
            패키지의 함수들을 사용합니다.
          </p>
        </div>
      </main>
    </div>
  );
}
