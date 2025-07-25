# JavaScript 학습 로드맵

> JavaScript와 웹 프론트엔드 개발의 핵심 개념들을 인터랙티브 시뮬레이터로 학습할 수 있는 체계적인 로드맵입니다.

**범례:**

- **O**: 구현 완료 
- **X**: 미구현

---

## **Phase 0: 실무 워크플로우 재정비**

**설명:** 매일 사용하는 도구와 기술을 더 깊이 이해하고, 협업과 생산성을 극대화하는 실무 워크플로우를 완성합니다.

| 구현 여부 | 아이콘 | 제목                           | 경로              | 설명                                                                                                       | 난이도    | 주요 토픽                                   |
| :-------: | :----: | :----------------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------- | :-------- | :------------------------------------------ |
|     O     |   📁   | **Git & GitHub 실무 워크플로우** | /git-workflow     | 혼자 개발할 때와 팀에서 협업할 때 꼭 알아야 할 Git 명령어와 GitHub 사용법을 학습합니다                      | 기초 실무 | 브랜치 전략, 충돌 해결, PR 작성, 이슈 관리   |
|     O     |   🐛   | **에러 핸들링 & 고급 디버깅**    | /error-handling   | 비동기 에러 처리, 소스맵 분석 등 복잡한 버그를 체계적으로 추적하고 해결하는 전략을 익힙니다                 | 실무 필수 | 에러 바운더리, 소스맵 분석, 비동기 에러, 디버깅 전략 |
|     O     |   🛡️   | **웹 보안 기초 (XSS & CSRF)**    | /web-security     | 가장 흔한 웹 취약점의 원리를 이해하고, 프론트엔드 관점에서 효과적인 방어 기법을 적용합니다                   | 실무 필수 | XSS 방어, CSRF 토큰, 보안 헤더, 입력 검증    |
|     X     |   ♿   | **웹 접근성(A11y) 기초**         | /accessibility    | 시맨틱 마크업과 WAI-ARIA를 활용하여 모두를 위한 웹 서비스를 만드는 실용적인 방법을 학습합니다               | 실무 필수 | 시맨틱 HTML, WAI-ARIA, 키보드 탐색, 스크린 리더 |

---

## **Phase 1: 웹 프론트엔드 기초**

**설명:** 웹 개발자라면 반드시 알아야 할 핵심적인 CS 기초 지식을 학습합니다.

| 구현 여부 | 아이콘 | 제목                                          | 경로               | 설명                                                                                                        | 난이도    | 주요 토픽                                          |
| :-------: | :----: | :-------------------------------------------- | :----------------- | :---------------------------------------------------------------------------------------------------------- | :-------- | :------------------------------------------------- |
|     O     |   ⏱️   | **동기 vs 비동기 프로그래밍**                   | /sync-async        | JavaScript의 핵심인 동기/비동기 처리 방식을 시각적 타임라인으로 완벽 이해                                     | 기초 필수 | 콜백, Promise, async/await                         |
|     O     |   🔒   | **HTTP vs HTTPS**                             | /http-https        | 웹 보안의 기초인 HTTP와 HTTPS의 차이점, SSL/TLS 동작 원리를 시각적으로 학습합니다                             | 기초 필수 | 암호화, SSL/TLS, 인증서                            |
|     O     |   🌐   | **CORS (Cross-Origin Resource Sharing)**      | /cors              | 브라우저의 보안 정책과 CORS 동작 원리를 시각적으로 학습하고, 실무에서 자주 마주치는 에러 해결법을 익혀보세요    | 기초 필수 | Same-Origin Policy, Preflight Request, CORS Headers |
|     O     |   🔐   | **인증 방식 비교 (Cookie vs Session vs JWT)** | /auth-methods      | 웹 인증의 핵심 방식들을 비교하고, 각각의 장단점과 적합한 사용 사례를 학습합니다                               | 기초 필수 | Cookie, Session, JWT                               |
|     O     |   🔌   | **웹소켓 vs HTTP 통신**                        | /websocket-http    | 실시간 통신을 위한 WebSocket과 전통적인 HTTP 통신의 차이점을 시각적으로 학습합니다                            | 기초 필수 | 실시간 통신, 양방향 통신, Polling/SSE              |
|     O     |   🔄   | **RESTful API 설계 원칙**                      | /restful-api       | REST 아키텍처 스타일과 API 설계 모범 사례를 시각적으로 학습하고 실습합니다                                    | 기초 필수 | HTTP Methods, Status Codes, Best Practices         |
|     O     |   💾   | **웹 스토리지 완벽 가이드**                     | /web-storage       | LocalStorage, SessionStorage, Cookie, IndexedDB의 차이점과 활용법을 실습으로 학습합니다                       | 기초 필수 | LocalStorage, Cookie, IndexedDB                    |
|     O     |   🗄️   | **브라우저 캐싱 전략**                          | /browser-caching   | HTTP 캐싱, 브라우저 캐시, CDN 캐싱의 작동 원리를 시각적으로 학습하고 성능을 최적화합니다                      | 기초 필수 | Cache-Control, ETag, CDN, Service Worker Cache     |
|     O     |   📡   | **GraphQL vs REST**                           | /graphql-rest      | REST API와 GraphQL의 차이점을 실제 요청/응답 비교로 학습하고 각각의 장단점을 이해합니다                       | 기초 필수 | Over-fetching, Under-fetching, Schema, Resolver    |

---

## **Phase 2: JavaScript 핵심 마스터리**

**설명:** JavaScript의 내부 동작 원리를 깊이 있게 파고들어 고급 개발자로 거듭납니다.

| 구현 여부 | 아이콘 | 제목                                     | 경로                     | 설명                                                                                                        | 난이도     | 주요 토픽                                              |
| :-------: | :----: | :--------------------------------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------- |
|     O     |   📋   | **JavaScript 변수 선언 & 호이스팅**       | /variable                | var, let, const의 차이점과 스코프, 호이스팅, TDZ를 인터랙티브 시뮬레이터로 학습                               | 초급       | var, let, const, 스코프, 호이스팅, TDZ                 |
|     O     |   ⚖️   | **JavaScript 동등 연산자 (== vs ===)**    | /equality-operators      | 동등 연산자와 일치 연산자의 차이점을 실습과 예제로 명확하게 학습                                             | 초급       | 동등 연산자, 일치 연산자, 타입 변환, 비교              |
|     O     |   🔄   | **병렬 Promise 응답 순서**                | /parallel-promise        | 여러 Promise가 병렬로 실행될 때 응답 받는 순서를 시각적으로 학습                                             | 초급       | Promise, 비동기 처리, 병렬 실행                        |
|     O     |   🧠   | **JavaScript 실행 컨텍스트**              | /execution-context       | 실행 컨텍스트와 스택, 스코프 체인의 작동 원리를 단계별 시각화로 학습                                         | 중급       | 실행 컨텍스트, 스택, 스코프 체인, 호이스팅, 변수 환경   |
|     O     |   🎯   | **JavaScript Scope & Closure**           | /closure                 | 클로저와 스코프 체인을 통한 변수 캡처 메커니즘을 시각적 시뮬레이터로 학습                                    | 중급       | Closure, Scope, Variable Capture, React State          |
|     O     |   🧬   | **JavaScript Prototype & 상속**          | /prototype               | 프로토타입 체인과 상속 메커니즘을 시각적 시뮬레이터로 학습                                                   | 중급       | Prototype, 상속, 생성자 함수, 클래스, 프로토타입 체인   |
|     O     |   🎪   | **Event Delegation & 이벤트 위임**        | /event-delegation        | 효율적인 이벤트 처리와 DOM 이벤트 전파 메커니즘을 인터랙티브 시뮬레이터로 학습                               | 중급       | Event Delegation, Event Bubbling, Performance, DOM Management |
|     O     |   ⚡   | **JavaScript 이벤트 루프**                | /event-loop              | Call Stack, Task Queue, Microtask Queue의 작동 원리를 시뮬레이션으로 학습                                   | 중급       | Event Loop, Call Stack, Queue                          |
|     O     |   🎯   | **this 바인딩의 모든 것**                 | /this-binding            | JavaScript의 this 키워드가 결정되는 4가지 규칙을 인터랙티브 예제로 완벽 학습                                 | 중급       | 암시적 바인딩, 명시적 바인딩, new 바인딩, 화살표 함수   |
|     O     |   🔄   | **JavaScript 모듈 시스템**                | /module-systems          | CommonJS, ES Modules, AMD의 차이점과 번들러가 처리하는 과정을 시각화로 학습                                  | 중급       | import/export, require, 동적 import, 순환 참조         |
|     O     |   🎯   | **JavaScript 배열 메서드 완전 정복**       | /array-methods-mastery   | map, filter, reduce부터 최신 메서드까지 배열 조작의 모든 것을 실습으로 학습                                  | 초급       | 고차함수, 메서드 체이닝, 성능 비교, 실무 패턴          |
|     O     |   📊   | **JavaScript 메모리 관리**                | /memory-management       | 가비지 컬렉션, 메모리 누수, WeakMap/WeakSet의 동작을 시각적으로 학습합니다                                   | 중급       | 가비지 컬렉션, 메모리 누수, 힙/스택, WeakMap           |

---

## **Phase 3: React & 웹 심화**

**설명:** 모던 웹 개발의 핵심인 React와 브라우저 렌더링에 대한 심도 있는 내용을 학습합니다.

| 구현 여부 | 아이콘 | 제목                                  | 경로                  | 설명                                                                                                        | 난이도      | 주요 토픽                                              |
| :-------: | :----: | :------------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------- | :---------- | :----------------------------------------------------- |
|     O     |   ⚛️   | **React Virtual DOM**                 | /virtual-dom          | Virtual DOM의 작동 원리와 Diffing 알고리즘을 시각적 시뮬레이터로 학습                                        | 중급        | Virtual DOM, Diffing, Reconciliation, React, 성능 최적화 |
|     O     |   🌐   | **웹 렌더링 전략 시뮬레이터**           | /rendering-strategies | CSR, SSR, ISR, SSG의 차이점과 특징을 시각적 시뮬레이터로 학습                                               | 중급        | CSR, SSR, ISR, SSG, 렌더링, 성능 최적화                |
|     O     |   🎨   | **브라우저 렌더링 과정**                | /browser-rendering    | HTML과 CSS가 화면에 그려지는 전체 과정을 시각적으로 학습하고 성능 최적화 기법 마스터                         | 중급        | DOM, CSSOM, Critical Rendering Path, 성능 최적화, 리플로우, 리페인트 |
|     O     |   🔧   | **브라우저별 CSS 호환성 해결**          | /css-compatibility    | 개발자가 자주 마주하는 CSS 호환성 이슈 해결 방법과 실무 사례를 체계적으로 학습                               | 중급        | Vendor Prefix, Progressive Enhancement, Feature Detection, Cross Browser, Polyfill |
|     O     |   ⏱️   | **JavaScript Debounce & Throttle**    | /debounce-throttle    | 이벤트 호출 빈도 제어 기법과 성능 최적화를 인터랙티브 시뮬레이터로 학습                                      | 중급        | Debounce, Throttle, 성능 최적화, 이벤트 제어, 사용자 경험 |
|     O     |   🎛️   | **React 상태 관리 완전 가이드**         | /react-state          | useState부터 Context API까지 React의 모든 상태 관리 패턴을 초보자도 쉽게 이해할 수 있도록 단계별로 학습합니다 | 초급-중급   | useState, useEffect, useReducer, Context API, 커스텀 훅 |
|     O     |   📱   | **반응형 웹 디자인 실전**               | /responsive-design    | 미디어 쿼리, 플렉스박스, 그리드를 활용한 반응형 레이아웃을 실습으로 구현합니다                               | 초급-중급   | 미디어 쿼리, 모바일 퍼스트, 터치 이벤트, 뷰포트        |
|     O     |   ⚡   | **웹 성능 측정과 개선**                 | /web-performance      | Lighthouse, Web Vitals를 활용한 성능 측정과 실제 개선 방법을 학습합니다                                      | 중급        | Core Web Vitals, 번들 최적화, 이미지 최적화, 로딩 전략  |
|     O     |   🧪   | **프론트엔드 테스팅 입문**              | /frontend-testing     | Jest와 React Testing Library를 활용한 컴포넌트 테스트 작성법을 학습합니다                                    | 중급        | 단위 테스트, 통합 테스트, 모킹, 테스트 주도 개발        |

---

## **더 많은 학습 주제 준비 중**

### 🔐 보안 & 성능
- 브라우저 보안 정책 (CSP, SOP)
- 웹 성능 최적화 기법
- 모던 웹 보안 (XSS, CSRF)

### ⚡ 고급 개념
- JavaScript 엔진 동작 원리
- 웹 워커 & 서비스 워커
- WebAssembly 기초
