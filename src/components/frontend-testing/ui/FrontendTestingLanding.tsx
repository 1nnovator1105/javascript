"use client";

import React, { useState } from "react";

interface TestExample {
  name: string;
  description: string;
  testCode: string;
  componentCode?: string;
  category: "unit" | "integration" | "e2e";
}

const FrontendTestingLanding = () => {
  const [selectedCategory, setSelectedCategory] = useState<"unit" | "integration" | "e2e">("unit");
  const [showTestResult, setShowTestResult] = useState(false);
  const [testRunning, setTestRunning] = useState(false);

  const testExamples: TestExample[] = [
    {
      name: "컴포넌트 렌더링 테스트",
      description: "컴포넌트가 올바르게 렌더링되는지 확인",
      category: "unit",
      componentCode: `// Button.tsx
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
};`,
      testCode: `// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button 컴포넌트', () => {
  test('버튼이 올바르게 렌더링되어야 한다', () => {
    render(<Button onClick={() => {}}>클릭하세요</Button>);
    
    const button = screen.getByText('클릭하세요');
    expect(button).toBeInTheDocument();
  });

  test('disabled 상태일 때 버튼이 비활성화되어야 한다', () => {
    render(<Button onClick={() => {}} disabled>클릭하세요</Button>);
    
    const button = screen.getByText('클릭하세요');
    expect(button).toBeDisabled();
  });
});`
    },
    {
      name: "사용자 상호작용 테스트",
      description: "클릭, 입력 등 사용자 이벤트 테스트",
      category: "unit",
      componentCode: `// Counter.tsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </div>
  );
};`,
      testCode: `// Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter 컴포넌트', () => {
  test('증가 버튼 클릭 시 카운트가 증가해야 한다', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const increaseButton = screen.getByText('증가');
    const count = screen.getByText(/현재 카운트:/);
    
    expect(count).toHaveTextContent('현재 카운트: 0');
    
    await user.click(increaseButton);
    expect(count).toHaveTextContent('현재 카운트: 1');
    
    await user.click(increaseButton);
    expect(count).toHaveTextContent('현재 카운트: 2');
  });

  test('리셋 버튼 클릭 시 카운트가 0이 되어야 한다', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const increaseButton = screen.getByText('증가');
    const resetButton = screen.getByText('리셋');
    
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(resetButton);
    
    expect(screen.getByText(/현재 카운트:/)).toHaveTextContent('현재 카운트: 0');
  });
});`
    },
    {
      name: "비동기 동작 테스트",
      description: "API 호출 등 비동기 작업 테스트",
      category: "integration",
      componentCode: `// UserList.tsx
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('사용자를 불러오는 데 실패했습니다');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};`,
      testCode: `// UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from './UserList';

// fetch 모킹
global.fetch = jest.fn();

describe('UserList 컴포넌트', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('사용자 목록을 성공적으로 로드해야 한다', async () => {
    const mockUsers = [
      { id: 1, name: '홍길동', email: 'hong@example.com' },
      { id: 2, name: '김철수', email: 'kim@example.com' }
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers
    });

    render(<UserList />);

    // 로딩 상태 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    // 사용자 목록이 표시될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('홍길동 (hong@example.com)')).toBeInTheDocument();
      expect(screen.getByText('김철수 (kim@example.com)')).toBeInTheDocument();
    });
  });

  test('API 에러 시 에러 메시지를 표시해야 한다', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('에러: 사용자를 불러오는 데 실패했습니다')).toBeInTheDocument();
    });
  });
});`
    },
    {
      name: "폼 입력 테스트",
      description: "폼 입력과 유효성 검사 테스트",
      category: "integration",
      componentCode: `// LoginForm.tsx
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = '이메일을 입력하세요';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    
    if (!password) {
      newErrors.password = '비밀번호를 입력하세요';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="이메일"
        />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="비밀번호"
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};`,
      testCode: `// LoginForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm 컴포넌트', () => {
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('유효한 입력으로 폼을 제출할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const submitButton = screen.getByText('로그인');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('유효하지 않은 이메일 입력 시 에러를 표시해야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText('이메일');
    const submitButton = screen.getByText('로그인');
    
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);
    
    expect(screen.getByText('올바른 이메일 형식이 아닙니다')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});`
    },
    {
      name: "E2E 테스트 예제",
      description: "Cypress를 사용한 엔드투엔드 테스트",
      category: "e2e",
      testCode: `// cypress/e2e/shopping-cart.cy.ts
describe('쇼핑 카트 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('상품을 카트에 추가하고 결제할 수 있어야 한다', () => {
    // 상품 목록 페이지
    cy.contains('상품 목록').should('be.visible');
    
    // 첫 번째 상품 선택
    cy.get('[data-testid="product-item"]').first().click();
    
    // 상품 상세 페이지
    cy.url().should('include', '/product/');
    cy.get('[data-testid="add-to-cart"]').click();
    
    // 카트에 추가 확인
    cy.get('[data-testid="cart-count"]').should('contain', '1');
    
    // 카트 페이지로 이동
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');
    
    // 카트 내용 확인
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
    
    // 결제 진행
    cy.get('[data-testid="checkout-button"]').click();
    
    // 결제 정보 입력
    cy.get('#card-number').type('1234567812345678');
    cy.get('#card-name').type('홍길동');
    cy.get('#expiry').type('12/25');
    cy.get('#cvv').type('123');
    
    // 주문 완료
    cy.get('[data-testid="place-order"]').click();
    
    // 주문 완료 확인
    cy.contains('주문이 완료되었습니다').should('be.visible');
    cy.url().should('include', '/order-complete');
  });

  it('카트에서 상품을 삭제할 수 있어야 한다', () => {
    // 상품을 카트에 추가
    cy.get('[data-testid="product-item"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    
    // 카트로 이동
    cy.get('[data-testid="cart-icon"]').click();
    
    // 삭제 버튼 클릭
    cy.get('[data-testid="remove-item"]').click();
    
    // 빈 카트 메시지 확인
    cy.contains('카트가 비어있습니다').should('be.visible');
  });
});`
    }
  ];

  const testCategories = [
    { key: "unit", name: "단위 테스트", icon: "🧩", description: "개별 컴포넌트/함수 테스트" },
    { key: "integration", name: "통합 테스트", icon: "🔗", description: "여러 컴포넌트 간 상호작용 테스트" },
    { key: "e2e", name: "E2E 테스트", icon: "🌐", description: "전체 사용자 플로우 테스트" }
  ];

  const runTest = () => {
    setTestRunning(true);
    setTimeout(() => {
      setTestRunning(false);
      setShowTestResult(true);
    }, 2000);
  };

  const filteredExamples = testExamples.filter(example => example.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* 테스트 카테고리 선택 */}
      <div className="flex flex-wrap gap-4 justify-center">
        {testCategories.map((category) => (
          <button
            key={category.key}
            onClick={() => {
              setSelectedCategory(category.key as "unit" | "integration" | "e2e");
              setShowTestResult(false);
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedCategory === category.key
                ? "bg-green-500 text-white shadow-lg"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <div>{category.name}</div>
                <div className="text-xs opacity-80">{category.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 테스트 예제 */}
      <div className="space-y-6">
        {filteredExamples.map((example, index) => (
          <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-2">{example.name}</h3>
            <p className="text-green-700 mb-4">{example.description}</p>
            
            {example.componentCode && (
              <div className="mb-4">
                <h4 className="font-semibold text-green-800 mb-2">컴포넌트 코드:</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{example.componentCode}</code>
                </pre>
              </div>
            )}
            
            <div>
              <h4 className="font-semibold text-green-800 mb-2">테스트 코드:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{example.testCode}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* 테스트 실행 시뮬레이션 */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 테스트 실행</h3>
        
        <button
          onClick={runTest}
          disabled={testRunning}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:bg-green-300"
        >
          {testRunning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              테스트 실행 중...
            </span>
          ) : (
            "테스트 실행"
          )}
        </button>

        {showTestResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              모든 테스트 통과!
            </div>
            <pre className="text-sm text-gray-700 font-mono">
{`PASS  src/components/Button.test.tsx
PASS  src/components/Counter.test.tsx
PASS  src/components/UserList.test.tsx
PASS  src/components/LoginForm.test.tsx

Test Suites: 4 passed, 4 total
Tests:       12 passed, 12 total
Time:        3.45s`}
            </pre>
          </div>
        )}
      </div>

      {/* 테스팅 베스트 프랙티스 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">💡 테스팅 베스트 프랙티스</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">좋은 테스트의 특징</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• <strong>빠른 실행</strong>: 빠른 피드백 루프</li>
              <li>• <strong>독립적</strong>: 다른 테스트에 영향받지 않음</li>
              <li>• <strong>반복 가능</strong>: 항상 같은 결과</li>
              <li>• <strong>자체 검증</strong>: 명확한 성공/실패</li>
              <li>• <strong>시기적절</strong>: 코드와 함께 작성</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">테스트 작성 팁</h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• 구현이 아닌 <strong>동작을 테스트</strong></li>
              <li>• <strong>AAA 패턴</strong> 사용 (Arrange-Act-Assert)</li>
              <li>• 테스트 이름은 <strong>명확하고 구체적</strong>으로</li>
              <li>• <strong>엣지 케이스</strong>도 테스트</li>
              <li>• 테스트 코드도 <strong>유지보수</strong> 고려</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 테스팅 도구 소개 */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">🛠️ 주요 테스팅 도구</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Jest</h4>
            <p className="text-sm text-gray-600">JavaScript 테스트 러너, 모킹, 스냅샷 테스트 지원</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">React Testing Library</h4>
            <p className="text-sm text-gray-600">사용자 관점의 React 컴포넌트 테스트</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Cypress</h4>
            <p className="text-sm text-gray-600">브라우저 기반 E2E 테스트 프레임워크</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FrontendTestingLanding };