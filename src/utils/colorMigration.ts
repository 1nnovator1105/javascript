/**
 * Color Migration Utilities
 * 안전한 색상 마이그레이션을 위한 유틸리티 함수들
 */

// 색상 스키마 타입
export type ColorScheme = "legacy" | "modern";

// 환경 변수로 색상 모드 결정
export const COLOR_SCHEME: ColorScheme =
  process.env.NEXT_PUBLIC_COLOR_SCHEME === "modern" ? "modern" : "legacy";

// 색상 매핑 테이블
const colorMappings = {
  // Gradients
  "from-indigo-500 to-purple-600": {
    legacy: "from-indigo-500 to-purple-600",
    modern: "from-yellow-400 to-blue-500",
  },
  "from-blue-50 to-indigo-100": {
    legacy: "from-blue-50 to-indigo-100",
    modern: "from-blue-50 to-yellow-100",
  },
  "to-indigo-50": { legacy: "to-indigo-50", modern: "to-yellow-50" },
  "from-purple-50": { legacy: "from-purple-50", modern: "from-blue-50" },
  "from-indigo-50": { legacy: "from-indigo-50", modern: "from-yellow-50" },
  "to-purple-50": { legacy: "to-purple-50", modern: "to-blue-50" },
  "to-pink-50": { legacy: "to-pink-50", modern: "to-red-50" },
  "from-purple-100": { legacy: "from-purple-100", modern: "from-blue-100" },
  "from-violet-100": { legacy: "from-violet-100", modern: "from-green-100" },
  "to-purple-500": { legacy: "to-purple-500", modern: "to-blue-500" },
  "from-blue-100": { legacy: "from-blue-100", modern: "from-blue-100" },
  "to-indigo-100": { legacy: "to-indigo-100", modern: "to-yellow-100" },
  "from-blue-50": { legacy: "from-blue-50", modern: "from-blue-50" },
  "to-violet-50": { legacy: "to-violet-50", modern: "to-green-50" },
  "from-purple-50 to-pink-100": {
    legacy: "from-purple-50 to-pink-100",
    modern: "from-blue-50 to-red-100",
  },
  "from-slate-50 to-gray-100": {
    legacy: "from-slate-50 to-gray-100",
    modern: "from-gray-50 to-gray-100",
  },
  "from-indigo-50 to-purple-50": {
    legacy: "from-indigo-50 to-purple-50",
    modern: "from-yellow-50 to-blue-50",
  },
  "from-blue-50 to-indigo-50": {
    legacy: "from-blue-50 to-indigo-50",
    modern: "from-blue-50 to-yellow-50",
  },
  "from-purple-50 to-pink-50": {
    legacy: "from-purple-50 to-pink-50",
    modern: "from-blue-50 to-green-50",
  },
  "from-violet-50 to-purple-50": {
    legacy: "from-violet-50 to-purple-50",
    modern: "from-green-50 to-blue-50",
  },
  "from-violet-100 to-violet-500": {
    legacy: "from-violet-100 to-violet-500",
    modern: "from-green-100 to-green-500",
  },
  "from-violet-50 to-violet-100": {
    legacy: "from-violet-50 to-violet-100",
    modern: "from-green-50 to-green-100",
  },
  "from-indigo-50 via-purple-50 to-pink-50": {
    legacy: "from-indigo-50 via-purple-50 to-pink-50",
    modern: "from-yellow-50 via-blue-50 to-red-50",
  },
  "from-blue-100 via-purple-100 to-pink-100": {
    legacy: "from-blue-100 via-purple-100 to-pink-100",
    modern: "from-blue-100 via-blue-100 to-red-100",
  },
  "from-blue-50 via-indigo-50 to-purple-50": {
    legacy: "from-blue-50 via-indigo-50 to-purple-50",
    modern: "from-blue-50 via-yellow-50 to-blue-50",
  },
  "from-slate-50 to-slate-100": {
    legacy: "from-slate-50 to-slate-100",
    modern: "from-gray-50 to-gray-100",
  },
  "from-purple-50 to-blue-50": {
    legacy: "from-purple-50 to-blue-50",
    modern: "from-blue-50 to-blue-50",
  },
  "from-indigo-50 to-blue-50": {
    legacy: "from-indigo-50 to-blue-50",
    modern: "from-yellow-50 to-blue-50",
  },
  "from-blue-50 to-purple-50": {
    legacy: "from-blue-50 to-purple-50",
    modern: "from-blue-50 to-blue-50",
  },
  "from-gray-50 to-indigo-50": {
    legacy: "from-gray-50 to-indigo-50",
    modern: "from-gray-50 to-yellow-50",
  },
  "from-indigo-50 to-purple-100": {
    legacy: "from-indigo-50 to-purple-100",
    modern: "from-yellow-50 to-blue-100",
  },
  "from-purple-50 to-violet-50": {
    legacy: "from-purple-50 to-violet-50",
    modern: "from-blue-50 to-green-50",
  },

  // Background colors
  "bg-indigo-50": { legacy: "bg-indigo-50", modern: "bg-yellow-50" },
  "bg-indigo-100": { legacy: "bg-indigo-100", modern: "bg-yellow-100" },
  "bg-indigo-500": { legacy: "bg-indigo-500", modern: "bg-yellow-500" },
  "bg-indigo-600": { legacy: "bg-indigo-600", modern: "bg-blue-600" },
  "bg-purple-50": { legacy: "bg-purple-50", modern: "bg-blue-50" },
  "bg-purple-100": { legacy: "bg-purple-100", modern: "bg-blue-100" },
  "bg-purple-500": { legacy: "bg-purple-500", modern: "bg-blue-500" },
  "bg-purple-600": { legacy: "bg-purple-600", modern: "bg-blue-600" },
  "bg-violet-50": { legacy: "bg-violet-50", modern: "bg-green-50" },
  "bg-violet-100": { legacy: "bg-violet-100", modern: "bg-green-100" },
  "bg-violet-500": { legacy: "bg-violet-500", modern: "bg-green-500" },
  "bg-purple-200": { legacy: "bg-purple-200", modern: "bg-blue-200" },
  "bg-indigo-200": { legacy: "bg-indigo-200", modern: "bg-yellow-200" },
  "bg-indigo-300": { legacy: "bg-indigo-300", modern: "bg-yellow-300" },
  "bg-purple-400": { legacy: "bg-purple-400", modern: "bg-blue-400" },
  "bg-violet-400": { legacy: "bg-violet-400", modern: "bg-green-400" },
  "bg-purple-300": { legacy: "bg-purple-300", modern: "bg-blue-300" },

  // Text colors
  "text-indigo-500": { legacy: "text-indigo-500", modern: "text-yellow-500" },
  "text-indigo-600": { legacy: "text-indigo-600", modern: "text-blue-600" },
  "text-indigo-700": { legacy: "text-indigo-700", modern: "text-blue-700" },
  "text-indigo-800": { legacy: "text-indigo-800", modern: "text-blue-800" },
  "text-indigo-900": { legacy: "text-indigo-900", modern: "text-blue-900" },
  "text-purple-600": { legacy: "text-purple-600", modern: "text-blue-600" },
  "text-purple-700": { legacy: "text-purple-700", modern: "text-blue-700" },
  "text-purple-800": { legacy: "text-purple-800", modern: "text-blue-800" },
  "text-purple-900": { legacy: "text-purple-900", modern: "text-blue-900" },
  "text-purple-400": { legacy: "text-purple-400", modern: "text-blue-400" },
  "group-hover:text-purple-900": {
    legacy: "group-hover:text-purple-900",
    modern: "group-hover:text-blue-900",
  },
  "text-violet-700": { legacy: "text-violet-700", modern: "text-green-700" },
  "text-violet-800": { legacy: "text-violet-800", modern: "text-green-800" },
  "text-violet-600": { legacy: "text-violet-600", modern: "text-green-600" },
  "hover:text-indigo-600": {
    legacy: "hover:text-indigo-600",
    modern: "hover:text-blue-600",
  },
  "hover:text-indigo-700": {
    legacy: "hover:text-indigo-700",
    modern: "hover:text-blue-700",
  },
  "group-hover:text-indigo-600": {
    legacy: "group-hover:text-indigo-600",
    modern: "group-hover:text-blue-600",
  },
  "group-hover:text-indigo-700": {
    legacy: "group-hover:text-indigo-700",
    modern: "group-hover:text-blue-700",
  },

  // Border colors
  "border-indigo-100": {
    legacy: "border-indigo-100",
    modern: "border-yellow-100",
  },
  "border-indigo-200": {
    legacy: "border-indigo-200",
    modern: "border-yellow-200",
  },
  "border-indigo-300": {
    legacy: "border-indigo-300",
    modern: "border-yellow-300",
  },
  "border-purple-200": {
    legacy: "border-purple-200",
    modern: "border-blue-200",
  },
  "border-purple-300": {
    legacy: "border-purple-300",
    modern: "border-blue-300",
  },
  "border-purple-400": {
    legacy: "border-purple-400",
    modern: "border-blue-400",
  },
  "border-purple-500": {
    legacy: "border-purple-500",
    modern: "border-blue-500",
  },
  "border-violet-200": {
    legacy: "border-violet-200",
    modern: "border-green-200",
  },
  "border-indigo-500": {
    legacy: "border-indigo-500",
    modern: "border-yellow-500",
  },
  "border-violet-500": {
    legacy: "border-violet-500",
    modern: "border-green-500",
  },
  "border-violet-300": {
    legacy: "border-violet-300",
    modern: "border-green-300",
  },
  "hover:border-violet-300": {
    legacy: "hover:border-violet-300",
    modern: "hover:border-green-300",
  },
  "border-purple-600": {
    legacy: "border-purple-600",
    modern: "border-blue-600",
  },
  "border-violet-600": {
    legacy: "border-violet-600",
    modern: "border-green-600",
  },
  "border-purple-100": {
    legacy: "border-purple-100",
    modern: "border-blue-100",
  },

  // Hover states
  "hover:bg-indigo-100": {
    legacy: "hover:bg-indigo-100",
    modern: "hover:bg-yellow-100",
  },
  "hover:bg-indigo-600": {
    legacy: "hover:bg-indigo-600",
    modern: "hover:bg-blue-600",
  },
  "hover:bg-indigo-700": {
    legacy: "hover:bg-indigo-700",
    modern: "hover:bg-blue-700",
  },
  "hover:bg-purple-700": {
    legacy: "hover:bg-purple-700",
    modern: "hover:bg-blue-700",
  },
  "hover:bg-purple-200": {
    legacy: "hover:bg-purple-200",
    modern: "hover:bg-blue-200",
  },
  "hover:border-indigo-300": {
    legacy: "hover:border-indigo-300",
    modern: "hover:border-yellow-300",
  },
  "hover:border-purple-300": {
    legacy: "hover:border-purple-300",
    modern: "hover:border-blue-300",
  },
  "hover:border-purple-400": {
    legacy: "hover:border-purple-400",
    modern: "hover:border-blue-400",
  },
  "hover:bg-purple-600": {
    legacy: "hover:bg-purple-600",
    modern: "hover:bg-blue-600",
  },
  "hover:bg-indigo-200": {
    legacy: "hover:bg-indigo-200",
    modern: "hover:bg-yellow-200",
  },
  "hover:bg-violet-600": {
    legacy: "hover:bg-violet-600",
    modern: "hover:bg-green-600",
  },
  "hover:bg-indigo-50": {
    legacy: "hover:bg-indigo-50",
    modern: "hover:bg-yellow-50",
  },

  // Focus states
  "focus:ring-indigo-500": {
    legacy: "focus:ring-indigo-500",
    modern: "focus:ring-yellow-500",
  },
  "focus:ring-purple-500": {
    legacy: "focus:ring-purple-500",
    modern: "focus:ring-blue-500",
  },
  "focus:border-transparent": {
    legacy: "focus:border-transparent",
    modern: "focus:border-transparent",
  },
  "focus:border-indigo-500": {
    legacy: "focus:border-indigo-500",
    modern: "focus:border-yellow-500",
  },
  "focus:ring-violet-500": {
    legacy: "focus:ring-violet-500",
    modern: "focus:ring-green-500",
  },

  // Shadow colors
  "shadow-indigo-500/30": {
    legacy: "shadow-indigo-500/30",
    modern: "shadow-yellow-500/30",
  },
  "shadow-indigo-500/40": {
    legacy: "shadow-indigo-500/40",
    modern: "shadow-yellow-500/40",
  },
  "hover:shadow-indigo-500/40": {
    legacy: "hover:shadow-indigo-500/40",
    modern: "hover:shadow-yellow-500/40",
  },
  "shadow-violet-500/30": {
    legacy: "shadow-violet-500/30",
    modern: "shadow-green-500/30",
  },
  
  // Additional colors for consistency
  "ring-indigo-500": {
    legacy: "ring-indigo-500",
    modern: "ring-yellow-500",
  },
  "ring-red-500": {
    legacy: "ring-red-500",
    modern: "ring-red-500",
  },
  "bg-red-500": {
    legacy: "bg-red-500",
    modern: "bg-red-500",
  },
  "text-red-600": {
    legacy: "text-red-600",
    modern: "text-red-600",
  },
  
  // Gray gradients (neutral, not migrated)
  "from-gray-50 to-gray-100": {
    legacy: "from-gray-50 to-gray-100",
    modern: "from-gray-50 to-gray-100",
  },
  
  // Additional colors for InputValidationPlayground
  "bg-green-100": {
    legacy: "bg-green-100",
    modern: "bg-green-100",
  },
  "border-green-300": {
    legacy: "border-green-300",
    modern: "border-green-300",
  },
  "bg-red-100": {
    legacy: "bg-red-100",
    modern: "bg-red-100",
  },
  "border-red-300": {
    legacy: "border-red-300",
    modern: "border-red-300",
  },
  "text-white": {
    legacy: "text-white",
    modern: "text-white",
  },
  "hover:bg-red-600": {
    legacy: "hover:bg-red-600",
    modern: "hover:bg-red-600",
  },
  "bg-green-500": {
    legacy: "bg-green-500",
    modern: "bg-green-500",
  },
  "hover:bg-green-600": {
    legacy: "hover:bg-green-600",
    modern: "hover:bg-green-600",
  },
  "bg-blue-500": {
    legacy: "bg-blue-500",
    modern: "bg-blue-500",
  },
  "hover:bg-blue-600": {
    legacy: "hover:bg-blue-600",
    modern: "hover:bg-blue-600",
  },
  "bg-green-50": {
    legacy: "bg-green-50",
    modern: "bg-green-50",
  },
  "text-green-800": {
    legacy: "text-green-800",
    modern: "text-green-800",
  },
  "bg-red-50": {
    legacy: "bg-red-50",
    modern: "bg-red-50",
  },
  "text-red-800": {
    legacy: "text-red-800",
    modern: "text-red-800",
  },
  
  // Additional missing colors
  "active:scale-95": {
    legacy: "active:scale-95",
    modern: "active:scale-95",
  },
  "from-yellow-50 to-orange-50": {
    legacy: "from-yellow-50 to-orange-50",
    modern: "from-purple-50 to-pink-50",
  },
  "border-blue-500": {
    legacy: "border-blue-500",
    modern: "border-blue-500",
  },
  "from-orange-50 to-yellow-50": {
    legacy: "from-orange-50 to-yellow-50",
    modern: "from-purple-50 to-pink-50",
  },
  "from-gray-800 to-gray-900": {
    legacy: "from-gray-800 to-gray-900",
    modern: "from-gray-800 to-gray-900",
  },
  "border-red-500": {
    legacy: "border-red-500",
    modern: "border-red-500",
  },
  "border-green-500": {
    legacy: "border-green-500",
    modern: "border-green-500",
  },
  "bg-gray-500": {
    legacy: "bg-gray-500",
    modern: "bg-gray-500",
  },
  "from-purple-50 to-indigo-50": {
    legacy: "from-purple-50 to-indigo-50",
    modern: "from-indigo-50 to-purple-50",
  },
  "from-blue-50 to-cyan-50": {
    legacy: "from-blue-50 to-cyan-50",
    modern: "from-blue-50 to-indigo-50",
  },
  "border-yellow-200": {
    legacy: "border-yellow-200",
    modern: "border-purple-200",
  },
  "bg-blue-50": {
    legacy: "bg-blue-50",
    modern: "bg-blue-50",
  },
  "border-orange-200": {
    legacy: "border-orange-200",
    modern: "border-purple-200",
  },
  "text-red-700": {
    legacy: "text-red-700",
    modern: "text-red-700",
  },
  "text-green-700": {
    legacy: "text-green-700",
    modern: "text-green-700",
  },
  "hover:bg-gray-600": {
    legacy: "hover:bg-gray-600",
    modern: "hover:bg-gray-600",
  },
  "text-blue-700": {
    legacy: "text-blue-700",
    modern: "text-blue-700",
  },
  "from-green-50": {
    legacy: "from-green-50",
    modern: "from-green-50",
  },
  "from-red-50": {
    legacy: "from-red-50",
    modern: "from-red-50",
  },
} as const;

/**
 * 색상 클래스를 현재 스키마에 맞게 변환
 */
export function getColorClass(key: keyof typeof colorMappings): string {
  const mapping = colorMappings[key];
  return COLOR_SCHEME === "modern" ? mapping.modern : mapping.legacy;
}

/**
 * 여러 색상 클래스를 한번에 변환
 */
export function getColorClasses(
  ...keys: (keyof typeof colorMappings)[]
): string {
  return keys.map((key) => getColorClass(key)).join(" ");
}

/**
 * 조건부 색상 클래스 적용
 */
export function getConditionalColorClass(
  condition: boolean,
  trueKey: keyof typeof colorMappings,
  falseKey?: keyof typeof colorMappings
): string {
  if (condition) {
    return getColorClass(trueKey);
  }
  return falseKey ? getColorClass(falseKey) : "";
}

/**
 * 컴포넌트별 색상 스키마 오버라이드
 */
export function useColorScheme(override?: ColorScheme): ColorScheme {
  return override || COLOR_SCHEME;
}

/**
 * 색상 마이그레이션 진행률 추적
 */
export function getMigrationProgress(): {
  total: number;
  migrated: number;
  percentage: number;
} {
  // 실제 구현에서는 파일 시스템을 스캔하여 진행률 계산
  // 여기서는 예시값 반환
  return {
    total: 36,
    migrated: 0,
    percentage: 0,
  };
}
