// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
}

// 공통 유틸리티 함수
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ko-KR");
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 공통 상수
export const APP_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  APP_NAME: "Monorepo App",
} as const;
