# 색상 마이그레이션 계획서

## 🎯 목표
보라색 기반의 현재 디자인을 JavaScript, Frontend, Interactive 테마에 맞는 Yellow-Blue 색상 체계로 안전하게 전환

## 🎨 새로운 색상 체계

### Primary Colors
- **JavaScript Yellow**: `#f59e0b` (yellow-500) - JavaScript 공식 색상
- **Modern Blue**: `#3b82f6` (blue-500) - 신뢰성과 모던함
- **Interactive Green**: `#10b981` (green-500) - 활성화와 성공

### 색상 매핑
| 기존 색상 | 새로운 색상 | 용도 |
|---------|-----------|------|
| indigo-500 | yellow-500 | Primary accent |
| purple-600 | blue-500 | Secondary accent |
| indigo-50 | yellow-50 | Light backgrounds |
| purple-50 | blue-50 | Alternative backgrounds |
| indigo-600 | blue-600 | Text colors |
| purple-700 | blue-700 | Dark text |

## 📋 구현 단계

### Phase 1: 준비 (0 에러 보장)
1. ✅ Tailwind 설정 파일 생성 (완료)
   - Legacy 색상 보존으로 점진적 마이그레이션 가능
   - 새로운 색상 시스템 추가

2. 색상 유틸리티 컴포넌트 생성
3. 테스트 환경 구축

### Phase 2: 점진적 마이그레이션
1. **공통 컴포넌트부터 시작**
   - StudyPageLayout (메인 레이아웃)
   - 네비게이션 컴포넌트
   
2. **페이지별 순차 적용**
   - 홈페이지
   - 각 학습 페이지 (우선순위 순)

3. **인터랙티브 요소 업데이트**
   - 버튼, 카드, 배지
   - 호버/포커스 상태

### Phase 3: 마무리
1. Legacy 색상 제거
2. 성능 최적화
3. 접근성 검증

## 🛡️ 안전 장치

### Build 에러 방지
```typescript
// 1. TypeScript 타입 안전성
type ColorScheme = 'legacy' | 'modern';

// 2. 점진적 마이그레이션 헬퍼
const getColor = (legacy: string, modern: string, useModern = false) => {
  return useModern ? modern : legacy;
};

// 3. 컴포넌트별 색상 플래그
interface ComponentProps {
  colorScheme?: ColorScheme;
}
```

### Lint 에러 방지
1. **ESLint 규칙 임시 완화**
   ```json
   {
     "rules": {
       "tailwindcss/no-custom-classname": "warn"
     }
   }
   ```

2. **단계별 검증**
   - 각 컴포넌트 수정 후 `yarn lint` 실행
   - `yarn type-check` 로 타입 안전성 확인
   - `yarn build` 로 빌드 성공 확인

### 롤백 계획
1. Git 브랜치 전략
   ```bash
   git checkout -b feature/color-rebrand
   # 각 Phase별 커밋
   git commit -m "feat: Phase 1 - Tailwind config setup"
   ```

2. 색상 토글 기능
   ```typescript
   // 환경 변수로 제어
   const USE_MODERN_COLORS = process.env.NEXT_PUBLIC_USE_MODERN_COLORS === 'true';
   ```

## 🔄 마이그레이션 순서

### 우선순위 1 (공통 컴포넌트)
1. StudyPageLayout.tsx
2. HomeLanding.tsx
3. Navigation components

### 우선순위 2 (인기 페이지)
1. PromiseLanding.tsx
2. EventLoopLanding.tsx
3. ClosureLanding.tsx

### 우선순위 3 (나머지 페이지)
- 알파벳 순으로 진행

## 📊 검증 체크리스트

각 단계 후 확인:
- [ ] `yarn lint` 통과
- [ ] `yarn type-check` 통과
- [ ] `yarn build` 성공
- [ ] 브라우저에서 시각적 확인
- [ ] 다크모드 호환성
- [ ] 접근성 (색상 대비) 확인

## 🚀 예상 결과

### Before (Purple Theme)
- 차분하고 우아한 느낌
- 일반적인 SaaS 느낌

### After (JavaScript Theme)
- 활력있고 인터랙티브한 느낌
- JavaScript 커뮤니티와의 시각적 연결
- 더 모던하고 기술적인 이미지