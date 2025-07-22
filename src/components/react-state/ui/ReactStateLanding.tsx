"use client";

import React, { useState, useEffect, useRef, useReducer, createContext, useContext } from "react";
import { StudyPageLayout } from "@/components/share/ui/StudyPageLayout";

// 단계별 학습을 위한 레벨 시스템
type LearningLevel = "beginner" | "intermediate" | "advanced";

interface LearningStep {
  id: string;
  title: string;
  level: LearningLevel;
  description: string;
  completed: boolean;
}

// 간단한 Context 예제
const CounterContext = createContext<{
  count: number;
  increment: () => void;
  decrement: () => void;
} | null>(null);

// useReducer 예제용 reducer
interface TodoState {
  todos: Array<{ id: number; text: string; completed: boolean }>;
  filter: "all" | "active" | "completed";
}

type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number }
  | { type: "SET_FILTER"; filter: "all" | "active" | "completed" };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, { 
          id: Date.now(), 
          text: action.text, 
          completed: false 
        }]
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

const ReactStateLanding = () => {
  // 현재 학습 단계 관리
  const [currentStep, setCurrentStep] = useState("useState-basic");
  const [learningLevel, setLearningLevel] = useState<LearningLevel>("beginner");
  
  // useState 기초 예제들
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [selectedColor, setSelectedColor] = useState("blue");
  
  // useState 고급 예제들
  const [user, setUser] = useState({ name: "", age: 0, email: "" });
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  // useEffect 예제들
  const [windowWidth, setWindowWidth] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // useRef 예제들
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);
  const previousCount = useRef(count);
  
  // useReducer 예제
  const [todoState, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: "React 기초 학습하기", completed: false },
      { id: 2, text: "useState 마스터하기", completed: true }
    ],
    filter: "all"
  });
  const [todoInput, setTodoInput] = useState("");
  
  // Context 예제
  const [contextCount, setContextCount] = useState(0);
  
  // 렌더링 횟수 추적
  renderCount.current += 1;
  
  // 학습 단계 정의
  const learningSteps: Record<string, LearningStep> = {
    "useState-basic": {
      id: "useState-basic",
      title: "1. useState 기초",
      level: "beginner",
      description: "가장 기본적인 상태 관리를 배워봅시다",
      completed: false
    },
    "useState-advanced": {
      id: "useState-advanced",
      title: "2. useState 고급",
      level: "beginner", 
      description: "객체와 배열 상태를 다뤄봅시다",
      completed: false
    },
    "useEffect": {
      id: "useEffect",
      title: "3. useEffect",
      level: "intermediate",
      description: "컴포넌트의 생명주기를 관리해봅시다",
      completed: false
    },
    "useRef": {
      id: "useRef",
      title: "4. useRef",
      level: "intermediate",
      description: "DOM 요소에 직접 접근해봅시다",
      completed: false
    },
    "useReducer": {
      id: "useReducer",
      title: "5. useReducer",
      level: "intermediate",
      description: "복잡한 상태 로직을 관리해봅시다",
      completed: false
    },
    "context": {
      id: "context",
      title: "6. Context API",
      level: "advanced",
      description: "전역 상태를 관리해봅시다",
      completed: false
    }
  };

  // useEffect 예제들
  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // 단계 완료 체크
  const completeStep = (stepId: string) => {
    // 실제로는 학습 진행도를 저장하는 로직이 들어갈 수 있음
    console.log(`Step ${stepId} completed!`);
  };

  return (
    <StudyPageLayout
      title="⚛️ React 상태 관리 완전 가이드"
      subtitle="초보자도 쉽게! useState부터 Context API까지 단계별로 배우는 React 상태 관리"
      showBackButton
      maxWidth="wide"
    >
      <div className="space-y-8">
        
        {/* 학습 진행도 및 난이도 선택 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">학습 로드맵</h2>
            <div className="flex gap-2">
              {(["beginner", "intermediate", "advanced"] as LearningLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setLearningLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    learningLevel === level
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {level === "beginner" ? "🟢 기초" : 
                   level === "intermediate" ? "🟡 중급" : "🔴 고급"}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(learningSteps)
              .filter(step => learningLevel === "beginner" ? step.level === "beginner" :
                             learningLevel === "intermediate" ? step.level !== "advanced" : true)
              .map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    currentStep === step.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${
                      step.level === "beginner" ? "bg-green-400" :
                      step.level === "intermediate" ? "bg-yellow-400" : "bg-red-400"
                    }`}></span>
                    <span className="text-xs text-gray-500">
                      {step.level === "beginner" ? "기초" :
                       step.level === "intermediate" ? "중급" : "고급"}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* 1. useState 기초 */}
        {currentStep === "useState-basic" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                🌱 useState 기초 - 첫 번째 상태 만들기
              </h2>
              <p className="text-gray-700 mb-6">
                useState는 React에서 가장 기본적인 상태 관리 도구입니다. 
                컴포넌트에 <span className="bg-green-100 px-2 py-1 rounded font-mono">기억</span>을 만들어주는 마법 같은 함수에요! 🪄
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 숫자 카운터 */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    🔢 숫자 세기 (카운터)
                  </h3>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-600 mb-4">{count}</div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setCount(count - 1)}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg font-semibold"
                      >
                        ➖ 빼기
                      </button>
                      <button
                        onClick={() => setCount(0)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold"
                      >
                        🔄 리셋
                      </button>
                      <button
                        onClick={() => setCount(count + 1)}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
                      >
                        ➕ 더하기
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-green-700">
                      const [count, setCount] = useState(0);
                    </code>
                  </div>
                </div>

                {/* 텍스트 입력 */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    ✏️ 이름 입력하기
                  </h3>
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="여기에 이름을 입력하세요"
                      className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-lg">
                        {name ? (
                          <>안녕하세요, <span className="font-bold text-blue-600">{name}</span>님! 👋</>
                        ) : (
                          <span className="text-gray-500">이름을 입력하면 인사말이 나타납니다</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-blue-700">
                      const [name, setName] = useState("");
                    </code>
                  </div>
                </div>

                {/* 보기/숨기기 토글 */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                    👁️ 보기/숨기기 토글
                  </h3>
                  <div className="text-center">
                    <button
                      onClick={() => setIsVisible(!isVisible)}
                      className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-lg font-semibold mb-4"
                    >
                      {isVisible ? "🙈 숨기기" : "👀 보기"}
                    </button>
                    {isVisible && (
                      <div className="p-4 bg-white rounded-lg border-2 border-purple-300 transition-all">
                        <p className="text-2xl">🎉 짜잔! 나타났어요!</p>
                        <p className="text-purple-600 mt-2">이것이 조건부 렌더링입니다</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-purple-700">
                      const [isVisible, setIsVisible] = useState(true);
                    </code>
                  </div>
                </div>

                {/* 색상 선택 */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    🎨 색상 선택하기
                  </h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {["blue", "red", "green", "purple", "yellow", "pink"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-full h-12 rounded-lg border-4 transition-all ${
                          selectedColor === color ? "border-gray-800 scale-110" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div 
                    className="p-4 rounded-lg text-white text-center font-bold text-xl"
                    style={{ backgroundColor: selectedColor }}
                  >
                    선택된 색상: {selectedColor}
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-yellow-700">
                      const [selectedColor, setSelectedColor] = useState("blue");
                    </code>
                  </div>
                </div>
              </div>

              {/* useState 설명 */}
              <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">🤔 useState는 어떻게 작동하나요?</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <span className="font-bold text-green-600">1. 선언:</span> 
                    <code className="bg-white px-2 py-1 rounded mx-2">const [상태, 설정함수] = useState(초기값)</code>
                  </p>
                  <p>
                    <span className="font-bold text-blue-600">2. 읽기:</span> 
                    상태 변수를 그대로 사용하면 됩니다 (예: <code className="bg-white px-2 py-1 rounded">count</code>)
                  </p>
                  <p>
                    <span className="font-bold text-purple-600">3. 변경:</span> 
                    설정 함수를 호출합니다 (예: <code className="bg-white px-2 py-1 rounded">setCount(5)</code>)
                  </p>
                  <p>
                    <span className="font-bold text-red-600">4. 리렌더링:</span> 
                    상태가 변경되면 컴포넌트가 다시 그려집니다! ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. useState 고급 */}
        {currentStep === "useState-advanced" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                🚀 useState 고급 - 객체와 배열 다루기
              </h2>
              <p className="text-gray-700 mb-6">
                이제 더 복잡한 데이터를 다뤄봅시다! 객체와 배열을 상태로 관리하는 방법을 배워보세요.
                <span className="bg-orange-100 px-2 py-1 rounded font-mono ml-2">불변성</span>이 핵심이에요! 🔑
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 객체 상태 */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                    👤 사용자 정보 (객체)
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                      placeholder="이름"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      value={user.age || ""}
                      onChange={(e) => setUser({...user, age: parseInt(e.target.value) || 0})}
                      placeholder="나이"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      placeholder="이메일"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                    
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold mb-2">입력된 정보:</h4>
                      <p>이름: {user.name || "없음"}</p>
                      <p>나이: {user.age || "없음"}</p>
                      <p>이메일: {user.email || "없음"}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-orange-700">
                      setUser({`{...user, name: value}`})
                    </code>
                    <p className="text-xs text-gray-600 mt-1">
                      ⚠️ 전개 연산자(...)로 불변성 유지!
                    </p>
                  </div>
                </div>

                {/* 배열 상태 */}
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                    📝 할 일 목록 (배열)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && inputValue.trim()) {
                            setItems([...items, inputValue.trim()]);
                            setInputValue("");
                          }
                        }}
                        placeholder="할 일을 입력하세요"
                        className="flex-1 px-3 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        onClick={() => {
                          if (inputValue.trim()) {
                            setItems([...items, inputValue.trim()]);
                            setInputValue("");
                          }
                        }}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        ➕
                      </button>
                    </div>
                    
                    <div className="max-h-48 overflow-y-auto">
                      {items.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">할 일을 추가해보세요!</p>
                      ) : (
                        <ul className="space-y-2">
                          {items.map((item, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center p-3 bg-white rounded-lg border"
                            >
                              <span>{item}</span>
                              <button
                                onClick={() => setItems(items.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700 font-bold"
                              >
                                ❌
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-teal-700">
                      setItems([...items, newItem])
                    </code>
                    <p className="text-xs text-gray-600 mt-1">
                      ⚠️ 새 배열을 만들어서 상태 업데이트!
                    </p>
                  </div>
                </div>
              </div>

              {/* 불변성 설명 */}
              <div className="mt-6 p-6 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">⚠️ 불변성이란 무엇인가요?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-600 mb-2">❌ 잘못된 방법</h4>
                    <code className="text-sm block mb-2">user.name = "새이름"; // 직접 수정</code>
                    <code className="text-sm block mb-2">items.push("새항목"); // 직접 추가</code>
                    <p className="text-sm text-red-600">React가 변화를 감지하지 못해요!</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">✅ 올바른 방법</h4>
                    <code className="text-sm block mb-2">setUser({`{...user, name: "새이름"}`})</code>
                    <code className="text-sm block mb-2">setItems([...items, "새항목"])</code>
                    <p className="text-sm text-green-600">새로운 객체/배열을 만들어요!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. useEffect */}
        {currentStep === "useEffect" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
              <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                ⚡ useEffect - 사이드 이펙트 다루기
              </h2>
              <p className="text-gray-700 mb-6">
                useEffect는 컴포넌트의 <span className="bg-purple-100 px-2 py-1 rounded font-mono">생명주기</span>를 관리합니다.
                데이터를 가져오거나, 타이머를 설정하거나, 이벤트를 듣는 등의 작업을 할 수 있어요! 🎯
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 타이머 예제 */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                    ⏰ 스톱워치
                  </h3>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-purple-600 mb-4">
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isTimerRunning 
                            ? "bg-red-500 hover:bg-red-600 text-white" 
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {isTimerRunning ? "⏸️ 일시정지" : "▶️ 시작"}
                      </button>
                      <button
                        onClick={() => {
                          setTimer(0);
                          setIsTimerRunning(false);
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        🔄 리셋
                      </button>
                    </div>
                  </div>
                </div>

                {/* 윈도우 크기 감지 */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    📱 화면 크기 감지
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">
                      {windowWidth}px
                    </div>
                    <p className="text-indigo-700 mb-4">
                      {windowWidth > 1024 ? "🖥️ 데스크톱" : 
                       windowWidth > 768 ? "📱 태블릿" : "📱 모바일"}
                    </p>
                    <p className="text-sm text-gray-600">
                      브라우저 창 크기를 조절해보세요!
                    </p>
                  </div>
                </div>

                {/* 이전 값 추적 */}
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                    🔄 이전 값 추적
                  </h3>
                  <div className="text-center">
                    <p className="text-lg mb-2">현재 카운트: <span className="font-bold text-pink-600">{count}</span></p>
                    <p className="text-lg mb-4">이전 카운트: <span className="font-bold text-gray-600">{previousCount.current}</span></p>
                    <p className="text-sm text-gray-600">
                      위의 카운터를 변경해보세요!
                    </p>
                  </div>
                </div>

                {/* 렌더링 횟수 */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    🔢 렌더링 횟수
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">
                      {renderCount.current}
                    </div>
                    <p className="text-sm text-gray-600">
                      이 컴포넌트가 렌더링된 횟수입니다
                    </p>
                  </div>
                </div>
              </div>

              {/* useEffect 패턴 설명 */}
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">📚 useEffect 패턴들</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-bold text-purple-600 mb-2">매번 실행</h4>
                    <code className="text-sm block">useEffect(() =&gt; {`{}`})</code>
                    <p className="text-xs text-gray-600 mt-1">의존성 배열 없음</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-bold text-green-600 mb-2">한 번만 실행</h4>
                    <code className="text-sm block">useEffect(() =&gt; {`{}`}, [])</code>
                    <p className="text-xs text-gray-600 mt-1">빈 의존성 배열</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-bold text-blue-600 mb-2">조건부 실행</h4>
                    <code className="text-sm block">useEffect(() =&gt; {`{}`}, [count])</code>
                    <p className="text-xs text-gray-600 mt-1">특정 값 변경 시</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. useRef */}
        {currentStep === "useRef" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-cyan-200">
              <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
                🎯 useRef - DOM 요소에 직접 접근하기
              </h2>
              <p className="text-gray-700 mb-6">
                useRef는 <span className="bg-cyan-100 px-2 py-1 rounded font-mono">DOM 요소</span>에 직접 접근하거나 
                <span className="bg-cyan-100 px-2 py-1 rounded font-mono ml-2">값을 저장</span>할 때 사용합니다.
                리렌더링 없이 값을 기억해야 할 때 유용해요! 🎪
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* DOM 접근 예제 */}
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <h3 className="font-bold text-cyan-800 mb-3 flex items-center gap-2">
                    🎯 입력 필드에 포커스
                  </h3>
                  <div className="space-y-3">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="여기에 텍스트를 입력하세요"
                      className="w-full px-3 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      onClick={() => inputRef.current?.focus()}
                      className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      🎯 입력 필드에 포커스!
                    </button>
                    <button
                      onClick={() => {
                        if (inputRef.current) {
                          inputRef.current.value = "";
                          inputRef.current.focus();
                        }
                      }}
                      className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      🧹 내용 지우고 포커스!
                    </button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <code className="text-sm text-cyan-700">
                      inputRef.current.focus()
                    </code>
                  </div>
                </div>

                {/* 값 저장 예제 */}
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                    💾 값 저장하기 (리렌더링 없음)
                  </h3>
                  <div className="text-center">
                    <p className="text-lg mb-2">
                      현재 렌더링 횟수: <span className="font-bold text-teal-600">{renderCount.current}</span>
                    </p>
                    <p className="text-lg mb-4">
                      이전 카운트: <span className="font-bold text-gray-600">{previousCount.current}</span>
                    </p>
                    <button
                      onClick={() => setCount(count + 1)}
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      카운트 증가 (useRef 테스트)
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      useRef로 이전 값을 기억하고 있어요!
                    </p>
                  </div>
                </div>
              </div>

              {/* useState vs useRef 비교 */}
              <div className="mt-6 p-6 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">🤔 useState vs useRef</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-600 mb-2">useState</h4>
                    <ul className="text-sm space-y-1">
                      <li>✅ 값이 변경되면 리렌더링</li>
                      <li>✅ UI에 반영되는 상태</li>
                      <li>✅ 컴포넌트 상태 관리</li>
                      <li>❌ DOM 직접 접근 어려움</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                    <h4 className="font-bold text-cyan-600 mb-2">useRef</h4>
                    <ul className="text-sm space-y-1">
                      <li>✅ 값이 변경되어도 리렌더링 없음</li>
                      <li>✅ DOM 요소 직접 접근</li>
                      <li>✅ 이전 값 저장</li>
                      <li>❌ UI 업데이트 안됨</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. useReducer */}
        {currentStep === "useReducer" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-violet-200">
              <h2 className="text-2xl font-bold text-violet-800 mb-4 flex items-center gap-2">
                🏗️ useReducer - 복잡한 상태 로직 관리하기
              </h2>
              <p className="text-gray-700 mb-6">
                useReducer는 <span className="bg-violet-100 px-2 py-1 rounded font-mono">복잡한 상태 로직</span>을 관리할 때 사용합니다.
                여러 상태가 서로 연관되어 있거나, 상태 업데이트 규칙이 복잡할 때 유용해요! 🎮
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Todo 앱 */}
                <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                  <h3 className="font-bold text-violet-800 mb-3 flex items-center gap-2">
                    📋 Todo 앱 (useReducer로 관리)
                  </h3>
                  
                  {/* Todo 입력 */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={todoInput}
                      onChange={(e) => setTodoInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && todoInput.trim()) {
                          dispatch({ type: "ADD_TODO", text: todoInput.trim() });
                          setTodoInput("");
                        }
                      }}
                      placeholder="할 일을 입력하세요"
                      className="flex-1 px-3 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                      onClick={() => {
                        if (todoInput.trim()) {
                          dispatch({ type: "ADD_TODO", text: todoInput.trim() });
                          setTodoInput("");
                        }
                      }}
                      className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
                    >
                      ➕
                    </button>
                  </div>

                  {/* 필터 버튼 */}
                  <div className="flex gap-2 mb-4">
                    {(["all", "active", "completed"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => dispatch({ type: "SET_FILTER", filter })}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          todoState.filter === filter
                            ? "bg-violet-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {filter === "all" ? "전체" : filter === "active" ? "진행중" : "완료"}
                      </button>
                    ))}
                  </div>

                  {/* Todo 목록 */}
                  <div className="max-h-64 overflow-y-auto">
                    {todoState.todos
                      .filter((todo) => {
                        if (todoState.filter === "active") return !todo.completed;
                        if (todoState.filter === "completed") return todo.completed;
                        return true;
                      })
                      .map((todo) => (
                        <div
                          key={todo.id}
                          className="flex items-center gap-2 p-3 bg-white rounded-lg border mb-2"
                        >
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
                            className="w-4 h-4"
                          />
                          <span
                            className={`flex-1 ${
                              todo.completed ? "line-through text-gray-500" : ""
                            }`}
                          >
                            {todo.text}
                          </span>
                          <button
                            onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    총 {todoState.todos.length}개 | 
                    완료 {todoState.todos.filter(t => t.completed).length}개 | 
                    진행중 {todoState.todos.filter(t => !t.completed).length}개
                  </div>
                </div>

                {/* Reducer 로직 설명 */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                    ⚙️ Reducer 함수 동작 방식
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded-lg border">
                      <h4 className="font-semibold text-green-600 mb-1">1. Action 발송</h4>
                      <code className="text-sm">dispatch({`{type: "ADD_TODO", text: "새 할일"}`})</code>
                    </div>
                    
                    <div className="text-center text-2xl">⬇️</div>
                    
                    <div className="p-3 bg-white rounded-lg border">
                      <h4 className="font-semibold text-blue-600 mb-1">2. Reducer 실행</h4>
                      <code className="text-sm">function todoReducer(state, action)</code>
                    </div>
                    
                    <div className="text-center text-2xl">⬇️</div>
                    
                    <div className="p-3 bg-white rounded-lg border">
                      <h4 className="font-semibold text-purple-600 mb-1">3. 새 상태 반환</h4>
                      <code className="text-sm">return {`{...state, todos: [...todos, newTodo]}`}</code>
                    </div>
                    
                    <div className="text-center text-2xl">⬇️</div>
                    
                    <div className="p-3 bg-white rounded-lg border">
                      <h4 className="font-semibold text-orange-600 mb-1">4. 컴포넌트 리렌더링</h4>
                      <code className="text-sm">UI 업데이트!</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* useState vs useReducer 비교 */}
              <div className="mt-6 p-6 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">🤷‍♂️ 언제 useReducer를 사용하나요?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-600 mb-2">useState 사용</h4>
                    <ul className="text-sm space-y-1">
                      <li>✅ 단순한 상태 (문자열, 숫자, 불린)</li>
                      <li>✅ 독립적인 상태들</li>
                      <li>✅ 상태 업데이트가 간단함</li>
                      <li>✅ 초보자에게 친숙함</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                    <h4 className="font-bold text-violet-600 mb-2">useReducer 사용</h4>
                    <ul className="text-sm space-y-1">
                      <li>✅ 복잡한 상태 (객체, 배열)</li>
                      <li>✅ 여러 상태가 연관됨</li>
                      <li>✅ 복잡한 업데이트 로직</li>
                      <li>✅ 예측 가능한 상태 변화</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Context API */}
        {currentStep === "context" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                🌐 Context API - 전역 상태 관리
              </h2>
              <p className="text-gray-700 mb-6">
                Context API는 <span className="bg-emerald-100 px-2 py-1 rounded font-mono">컴포넌트 트리 전체</span>에서 
                데이터를 공유할 수 있게 해줍니다. Props를 여러 단계로 전달할 필요가 없어요! 🎁
              </p>

              <CounterContext.Provider value={{
                count: contextCount,
                increment: () => setContextCount(prev => prev + 1),
                decrement: () => setContextCount(prev => prev - 1)
              }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Context Provider */}
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                      🏪 Context Provider (상점)
                    </h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-emerald-600 mb-4">
                        {contextCount}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        이 값이 모든 하위 컴포넌트에서 사용 가능합니다
                      </p>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setContextCount(prev => prev - 1)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          ➖
                        </button>
                        <button
                          onClick={() => setContextCount(0)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          🔄
                        </button>
                        <button
                          onClick={() => setContextCount(prev => prev + 1)}
                          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          ➕
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Context Consumer */}
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                      🛍️ Context Consumer (고객)
                    </h3>
                    <ContextConsumerComponent />
                  </div>
                </div>
              </CounterContext.Provider>

              {/* Context 사용법 */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Context 생성 및 제공 */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-800 mb-3">1. Context 생성 및 제공</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                    <pre>{`// Context 생성
const CounterContext = createContext();

// Provider로 값 제공
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <CounterContext.Provider 
      value={{ count, setCount }}
    >
      <ChildComponent />
    </CounterContext.Provider>
  );
}`}</pre>
                  </div>
                </div>

                {/* Context 사용 */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">2. Context 사용</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded text-sm">
                    <pre>{`// useContext로 값 가져오기
function ChildComponent() {
  const { count, setCount } = useContext(CounterContext);
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}`}</pre>
                  </div>
                </div>
              </div>

              {/* Context 장단점 */}
              <div className="mt-6 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-gray-800">⚖️ Context API 장단점</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-600 mb-2">✅ 장점</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Props drilling 해결</li>
                      <li>• React에 내장된 기능</li>
                      <li>• 타입스크립트 지원 좋음</li>
                      <li>• 작은 앱에 적합</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-bold text-orange-600 mb-2">⚠️ 주의사항</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 과도한 리렌더링 위험</li>
                      <li>• 복잡한 상태 관리 한계</li>
                      <li>• 디버깅이 어려울 수 있음</li>
                      <li>• 값이 자주 변경되면 성능 이슈</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 마무리 및 다음 단계 */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            🎉 축하합니다! React 상태 관리를 배웠어요!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <h3 className="font-bold text-green-600 mb-2">🟢 기초 레벨</h3>
              <ul className="text-sm space-y-1">
                <li>✅ useState (기본)</li>
                <li>✅ useState (객체/배열)</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-600 mb-2">🟡 중급 레벨</h3>
              <ul className="text-sm space-y-1">
                <li>✅ useEffect</li>
                <li>✅ useRef</li>
                <li>✅ useReducer</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg border border-red-200">
              <h3 className="font-bold text-red-600 mb-2">🔴 고급 레벨</h3>
              <ul className="text-sm space-y-1">
                <li>✅ Context API</li>
                <li>📚 다음: 커스텀 훅</li>
                <li>📚 다음: 성능 최적화</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-700 mb-2">🚀 다음 학습 추천</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• <strong>성능 최적화:</strong> React.memo, useMemo, useCallback</li>
              <li>• <strong>커스텀 훅:</strong> 로직 재사용하기</li>
              <li>• <strong>상태 관리 라이브러리:</strong> Redux, Zustand, Jotai</li>
              <li>• <strong>실제 프로젝트:</strong> Todo 앱, 블로그, 쇼핑몰 만들기</li>
            </ul>
          </div>
        </div>
      </div>
    </StudyPageLayout>
  );
};

// Context를 사용하는 하위 컴포넌트
const ContextConsumerComponent = () => {
  const context = useContext(CounterContext);
  
  if (!context) {
    return <div>Context를 찾을 수 없습니다</div>;
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-3">
        이 컴포넌트는 Context에서 값을 받아옵니다
      </p>
      <div className="text-3xl font-bold text-teal-600 mb-4">
        {context.count}
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={context.decrement}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          ➖
        </button>
        <button
          onClick={context.increment}
          className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
        >
          ➕
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Props 없이 상위 컴포넌트의 상태 사용!
      </p>
    </div>
  );
};

export { ReactStateLanding };