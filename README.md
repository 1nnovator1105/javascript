# JavaScript 학습 센터

JavaScript의 핵심 개념을 인터랙티브하게 학습할 수 있는 웹 애플리케이션입니다.

## 📚 프로젝트 소개

JavaScript 학습 센터는 JavaScript의 복잡한 개념들을 시각화하고 상호작용할 수 있는 학습 도구입니다. Promise, Closure, Event Loop, Prototype 등 JavaScript의 핵심 개념들을 실제로 체험하며 학습할 수 있습니다.

### 주요 기능

- **Promise 시뮬레이터**: Promise의 생명주기와 체이닝 동작 시각화
- **Closure 실습**: 클로저의 작동 원리를 실시간으로 확인
- **Event Loop 시각화**: JavaScript의 비동기 처리 메커니즘 이해
- **Variable Scope 탐색**: 변수 스코프와 호이스팅 이해
- **Event Delegation 패턴**: 이벤트 위임 패턴 실습
- **Prototype Chain**: 프로토타입 체인 시각화
- **Execution Context**: 실행 컨텍스트 스택 추적
- **Virtual DOM**: Virtual DOM의 작동 원리 시뮬레이션
- **Rendering Strategies**: CSR, SSR, SSG, ISR 렌더링 전략 비교

## 🚀 시작하기

### 필수 조건

- Node.js 18.17 이상
- Yarn 패키지 매니저

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 프로젝트 디렉토리로 이동
cd javascript

# 의존성 설치
yarn install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (Turbopack 사용)
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 프로덕션 빌드

```bash
# 프로덕션 빌드
yarn build

# 프로덕션 서버 시작
yarn start
```

### 기타 명령어

```bash
# 코드 린팅
yarn lint

# 타입 체크
yarn type-check
```

## 🛠 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **UI 라이브러리**: React 19
- **코드 품질**: ESLint
- **분석**: Vercel Analytics
- **배포**: Vercel

## 📂 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── closure/           # 각 개념별 라우트
│   ├── event-loop/
│   └── ...
├── components/            # React 컴포넌트
│   ├── closure/          # 각 개념별 컴포넌트
│   │   └── ui/
│   ├── share/            # 공통 컴포넌트
│   │   └── ui/
│   └── ...
└── public/               # 정적 파일
    └── images/
```

## 🌐 배포

프로젝트는 Vercel에 배포되어 있습니다:
- URL: https://1nnovator-js-study.vercel.app

## 🤝 기여

이 프로젝트는 학습 목적으로 만들어졌습니다. 개선 사항이나 버그 리포트는 언제든 환영합니다.

## 📝 라이선스

MIT License

## 🙏 감사의 말

이 프로젝트의 코드 상당 부분은 생성형 AI의 도움을 받아 작성되었습니다. AI 기술이 개발 생산성과 학습 콘텐츠의 품질 향상에 기여하였음을 명시합니다.

## 👨‍💻 개발자

- GitHub: [@1nnovator1105](https://github.com/1nnovator1105)

---

*JavaScript의 복잡한 개념들을 쉽고 재미있게 학습하세요!*