"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

interface Variable {
  id: string;
  name: string;
  value: string;
  type: "var" | "const" | "let";
  scope: "global" | "function" | "block";
  canReassign: boolean;
  canRedeclare: boolean;
  isHoisted: boolean;
  createdAt: number;
}

interface LogEntry {
  timestamp: string;
  action: string;
  variable: string;
  type: "var" | "const" | "let";
  success: boolean;
  error?: string;
  result?: string;
}

interface ScopeLevel {
  id: string;
  name: string;
  type: "global" | "function" | "block";
  variables: Variable[];
  level: number;
}

const VariableLanding = () => {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedType, setSelectedType] = useState<"var" | "const" | "let">(
    "let"
  );
  const [newVarName, setNewVarName] = useState("");
  const [newVarValue, setNewVarValue] = useState("");
  const [currentScope, setCurrentScope] = useState<
    "global" | "function" | "block"
  >("global");
  const [showHoisting, setShowHoisting] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);
  const [reassignValue, setReassignValue] = useState("");

  const scopeLevels: ScopeLevel[] = [
    {
      id: "global",
      name: "Global Scope",
      type: "global",
      variables: variables.filter((v) => v.scope === "global"),
      level: 0,
    },
    {
      id: "function",
      name: "Function Scope",
      type: "function",
      variables: variables.filter((v) => v.scope === "function"),
      level: 1,
    },
    {
      id: "block",
      name: "Block Scope",
      type: "block",
      variables: variables.filter((v) => v.scope === "block"),
      level: 2,
    },
  ];

  const addLog = useCallback((entry: Omit<LogEntry, "timestamp">) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ ...entry, timestamp }, ...prev].slice(0, 15));
  }, []);

  const createVariable = useCallback(() => {
    if (!newVarName.trim()) {
      addLog({
        action: "변수 생성 실패",
        variable: newVarName,
        type: selectedType,
        success: false,
        error: "변수명을 입력해주세요",
      });
      return;
    }

    // 같은 스코프에서 같은 이름의 변수 존재 확인
    const existingVar = variables.find(
      (v) => v.name === newVarName && v.scope === currentScope
    );

    if (existingVar) {
      // 크로스 타입 재선언 체크 (실제 JavaScript 규칙)
      if (existingVar.type === "let" || existingVar.type === "const") {
        // let이나 const로 선언된 변수는 어떤 타입으로도 재선언 불가
        addLog({
          action: "변수 생성 실패",
          variable: newVarName,
          type: selectedType,
          success: false,
          error: `${existingVar.type}로 선언된 변수는 재선언할 수 없습니다`,
        });
        return;
      }

      if (existingVar.type === "var" && selectedType !== "var") {
        // var로 선언된 변수는 let/const로 재선언 불가
        addLog({
          action: "변수 생성 실패",
          variable: newVarName,
          type: selectedType,
          success: false,
          error: `var로 선언된 변수는 ${selectedType}로 재선언할 수 없습니다`,
        });
        return;
      }

      // var → var 재선언만 허용
      if (existingVar.type === "var" && selectedType === "var") {
        setVariables((prev) =>
          prev.map((v) =>
            v.id === existingVar.id ? { ...v, value: newVarValue } : v
          )
        );
        addLog({
          action: "변수 재선언",
          variable: newVarName,
          type: selectedType,
          success: true,
          result: `var ${newVarName} = "${newVarValue}" (재선언됨)`,
        });
        setNewVarName("");
        setNewVarValue("");
        return;
      }
    }

    // const는 초기값 필수
    if (selectedType === "const" && !newVarValue.trim()) {
      addLog({
        action: "변수 생성 실패",
        variable: newVarName,
        type: selectedType,
        success: false,
        error: "const는 선언과 동시에 초기화해야 합니다",
      });
      return;
    }

    const newVariable: Variable = {
      id: Date.now().toString(),
      name: newVarName,
      value: newVarValue || "undefined",
      type: selectedType,
      scope: currentScope,
      canReassign: selectedType !== "const",
      canRedeclare: selectedType === "var",
      isHoisted: selectedType === "var",
      createdAt: Date.now(),
    };

    setVariables((prev) => [...prev, newVariable]);
    addLog({
      action: "변수 생성",
      variable: newVarName,
      type: selectedType,
      success: true,
      result: `${selectedType} ${newVarName} = "${newVarValue || "undefined"}"`,
    });

    setNewVarName("");
    setNewVarValue("");
  }, [newVarName, newVarValue, selectedType, currentScope, variables, addLog]);

  const reassignVariable = useCallback(
    (variableId: string) => {
      const variable = variables.find((v) => v.id === variableId);
      if (!variable) return;

      if (!variable.canReassign) {
        addLog({
          action: "재할당 실패",
          variable: variable.name,
          type: variable.type,
          success: false,
          error: "const는 재할당할 수 없습니다",
        });
        return;
      }

      setVariables((prev) =>
        prev.map((v) =>
          v.id === variableId ? { ...v, value: reassignValue } : v
        )
      );

      addLog({
        action: "변수 재할당",
        variable: variable.name,
        type: variable.type,
        success: true,
        result: `${variable.name} = "${reassignValue}"`,
      });

      setSelectedVariable(null);
      setReassignValue("");
    },
    [variables, reassignValue, addLog]
  );

  const deleteVariable = useCallback(
    (variableId: string) => {
      const variable = variables.find((v) => v.id === variableId);
      if (!variable) return;

      setVariables((prev) => prev.filter((v) => v.id !== variableId));
      addLog({
        action: "변수 삭제",
        variable: variable.name,
        type: variable.type,
        success: true,
        result: `${variable.name} 변수가 삭제되었습니다`,
      });
    },
    [variables, addLog]
  );

  const resetDemo = useCallback(() => {
    setVariables([]);
    setLogs([]);
    setNewVarName("");
    setNewVarValue("");
    setSelectedVariable(null);
    setReassignValue("");
  }, []);

  const runHoistingDemo = useCallback(() => {
    setShowHoisting(true);
    setLogs([]);

    // 호이스팅 시뮬레이션
    setTimeout(() => {
      addLog({
        action: "호이스팅 시뮬레이션",
        variable: "hoistedVar",
        type: "var",
        success: true,
        result: "var hoistedVar는 undefined로 호이스팅됨",
      });
    }, 500);

    setTimeout(() => {
      addLog({
        action: "호이스팅 시뮬레이션",
        variable: "letVar",
        type: "let",
        success: false,
        error: "let letVar는 Temporal Dead Zone에 있음",
      });
    }, 1000);

    setTimeout(() => {
      addLog({
        action: "호이스팅 시뮬레이션",
        variable: "constVar",
        type: "const",
        success: false,
        error: "const constVar는 Temporal Dead Zone에 있음",
      });
    }, 1500);

    setTimeout(() => {
      setShowHoisting(false);
    }, 3000);
  }, [addLog]);

  const getTypeColor = (type: "var" | "const" | "let") => {
    switch (type) {
      case "var":
        return "bg-red-100 text-red-800 border-red-200";
      case "const":
        return "bg-green-100 text-green-800 border-green-200";
      case "let":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getScopeColor = (scope: "global" | "function" | "block") => {
    switch (scope) {
      case "global":
        return "bg-purple-50 border-purple-200";
      case "function":
        return "bg-yellow-50 border-yellow-200";
      case "block":
        return "bg-green-50 border-green-200";
    }
  };

  const getScopeColorText = (scope: "global" | "function" | "block") => {
    switch (scope) {
      case "global":
        return "text-purple-700";
      case "function":
        return "text-yellow-700";
      case "block":
        return "text-green-700";
    }
  };

  return (
    <div>
      {/* 변수 생성 컨트롤 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-8">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">
          🎯 변수 선언 시뮬레이터
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 변수 생성 폼 */}
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-700 mb-3">
              새 변수 만들기
            </h4>

            {/* 변수 타입 선택 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                변수 타입
              </label>
              <div className="flex gap-2">
                {(["var", "let", "const"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${
                      selectedType === type
                        ? type === "var"
                          ? "bg-red-500 text-white border-red-500"
                          : type === "let"
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-green-500 text-white border-green-500"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 스코프 선택 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                스코프
              </label>
              <select
                value={currentScope}
                onChange={(e) => setCurrentScope(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="global">Global Scope</option>
                <option value="function">Function Scope</option>
                <option value="block">Block Scope</option>
              </select>
            </div>

            {/* 변수명 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                변수명
              </label>
              <input
                type="text"
                value={newVarName}
                onChange={(e) => setNewVarName(e.target.value)}
                placeholder="변수명을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* 초기값 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                초기값{" "}
                {selectedType === "const" && (
                  <span className="text-red-500">(필수)</span>
                )}
              </label>
              <input
                type="text"
                value={newVarValue}
                onChange={(e) => setNewVarValue(e.target.value)}
                placeholder="초기값을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={createVariable}
                className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
              >
                🚀 변수 생성
              </button>
              <button
                onClick={resetDemo}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                🔄 리셋
              </button>
            </div>
          </div>

          {/* 호이스팅 데모 */}
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-700 mb-3">
              호이스팅 데모
            </h4>
            <div className="text-sm text-gray-600 mb-4">
              var, let, const의 호이스팅 차이를 확인해보세요
            </div>

            <div className="bg-gray-100 p-3 rounded-lg mb-4 font-mono text-sm">
              <div className="text-gray-600">// 코드 실행 전 상태</div>
              <div className="text-red-600">console.log(hoistedVar); // ?</div>
              <div className="text-blue-600">console.log(letVar); // ?</div>
              <div className="text-green-600">console.log(constVar); // ?</div>
              <div className="mt-2 text-gray-600">// 선언부</div>
              <div className="text-red-600">
                var hoistedVar = &quot;I&apos;m var&quot;;
              </div>
              <div className="text-blue-600">
                let letVar = &quot;I&apos;m let&quot;;
              </div>
              <div className="text-green-600">
                const constVar = &quot;I&apos;m const&quot;;
              </div>
            </div>

            <button
              onClick={runHoistingDemo}
              disabled={showHoisting}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-400"
            >
              {showHoisting ? "🔄 실행 중..." : "⚡ 호이스팅 시뮬레이션"}
            </button>

            {showHoisting && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-yellow-800 font-medium mb-2">
                  🔍 호이스팅 분석 중...
                </div>
                <div className="text-sm text-yellow-700">
                  각 변수 타입의 호이스팅 동작을 확인하고 있습니다
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 스코프 시각화 및 변수 관리 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 스코프 시각화 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border-2 border-purple-200 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">
            🌐 스코프 시각화
          </h3>

          <div className="space-y-4">
            {scopeLevels.map((scope) => (
              <div
                key={scope.id}
                className={`p-4 rounded-lg border-2 ${getScopeColor(
                  scope.type
                )} transition-all duration-200`}
                style={{ marginLeft: `${scope.level * 20}px` }}
              >
                <div
                  className={`font-semibold mb-2 ${getScopeColorText(
                    scope.type
                  )}`}
                >
                  {scope.name} ({scope.variables.length}개 변수)
                </div>

                {scope.variables.length === 0 ? (
                  <div className="text-gray-400 italic text-sm">변수 없음</div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {scope.variables.map((variable) => (
                      <div
                        key={variable.id}
                        className={`p-3 rounded border text-sm ${
                          variable.type === "var"
                            ? "bg-red-50 border-red-200"
                            : variable.type === "let"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(
                                variable.type
                              )}`}
                            >
                              {variable.type}
                            </span>
                            <span className="font-mono font-medium">
                              {variable.name}
                            </span>
                            <span className="text-gray-500">=</span>
                            <span className="font-mono text-gray-700">
                              &quot;{variable.value}&quot;
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {variable.canReassign && (
                              <button
                                onClick={() => setSelectedVariable(variable.id)}
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                재할당
                              </button>
                            )}
                            <button
                              onClick={() => deleteVariable(variable.id)}
                              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              삭제
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-gray-500 flex gap-4">
                          <span>
                            재할당: {variable.canReassign ? "✅" : "❌"}
                          </span>
                          <span>
                            재선언: {variable.canRedeclare ? "✅" : "❌"}
                          </span>
                          <span>
                            호이스팅: {variable.isHoisted ? "✅" : "❌"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 실시간 로그 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border-2 border-green-200 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
            📝 실행 로그
            <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
              {logs.length}개
            </span>
          </h3>

          {logs.length === 0 ? (
            <div className="text-gray-400 italic text-center p-8">
              변수를 생성하거나 조작해보세요!
            </div>
          ) : (
            <div className="space-y-2 overflow-y-auto">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-sm ${
                    log.success
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`font-medium ${
                        log.success ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className="text-xs text-gray-500">
                      {log.timestamp}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(
                          log.type
                        )}`}
                      >
                        {log.type}
                      </span>
                      <span className="font-mono">{log.variable}</span>
                    </div>

                    {log.success && log.result && (
                      <div className="text-green-700 font-mono text-xs bg-green-100 p-2 rounded">
                        {log.result}
                      </div>
                    )}

                    {!log.success && log.error && (
                      <div className="text-red-700 font-medium text-xs bg-red-100 p-2 rounded">
                        ❌ {log.error}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 재할당 모달 */}
      {selectedVariable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              변수 재할당
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                새로운 값
              </label>
              <input
                type="text"
                value={reassignValue}
                onChange={(e) => setReassignValue(e.target.value)}
                placeholder="새로운 값을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => reassignVariable(selectedVariable)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                재할당
              </button>
              <button
                onClick={() => {
                  setSelectedVariable(null);
                  setReassignValue("");
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 빠른 테스트 가이드 */}
      <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border-2 border-orange-200 shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-800 flex items-center gap-2">
          🧪 빠른 테스트 가이드
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">
              🔬 실험 1: 크로스 타입 재선언
            </h4>
            <ol className="text-sm text-orange-700 space-y-1 list-decimal list-inside">
              <li>var로 &quot;test&quot; 생성 → var로 재선언 (성공)</li>
              <li>let으로 &quot;test2&quot; 생성 → var로 재선언 (실패)</li>
              <li>var로 &quot;test3&quot; 생성 → let으로 재선언 (실패)</li>
              <li>const로 &quot;test4&quot; 생성 → var로 재선언 (실패)</li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">
              ⚡ 실험 2: 재할당 차이
            </h4>
            <ol className="text-sm text-orange-700 space-y-1 list-decimal list-inside">
              <li>const로 &quot;myConst&quot; 생성</li>
              <li>myConst를 재할당 시도 (실패 확인)</li>
              <li>let으로 &quot;myLet&quot; 생성</li>
              <li>myLet을 재할당 시도 (성공 확인)</li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">
              🔄 실험 3: 호이스팅
            </h4>
            <ol className="text-sm text-orange-700 space-y-1 list-decimal list-inside">
              <li>&quot;호이스팅 시뮬레이션&quot; 실행</li>
              <li>var의 undefined 호이스팅 확인</li>
              <li>let/const의 TDZ 에러 확인</li>
              <li>로그에서 차이점 분석</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 학습 가이드 섹션 */}
      <div className="border-t border-gray-200 pt-8">
        <div className="text-center mb-8">
          <h2 className="font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl md:text-3xl">
            📚 학습 가이드: var, let, const
          </h2>
          <p className="text-gray-500 font-normal m-0 text-sm md:text-base">
            JavaScript 변수 선언의 차이점과 올바른 사용법을 알아보세요
          </p>
        </div>

        {/* 호이스팅과 TDZ 개념 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🔍 호이스팅과 TDZ 완벽 이해하기
          </h3>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-6 border-2 border-yellow-200 shadow-lg mb-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-4">
              ⬆️ 호이스팅 (Hoisting)이란?
            </h4>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-2">🧠 개념</h5>
                <p className="text-sm text-yellow-700 mb-3">
                  호이스팅은 JavaScript 엔진이 코드를 실행하기 전에 변수와 함수
                  선언을 스코프의 최상단으로 끌어올리는 것처럼 동작하는
                  현상입니다. 실제로는 메모리에 먼저 할당되는 것입니다.
                </p>

                <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                  <div className="text-gray-600 mb-2">
                    // 우리가 작성한 코드
                  </div>
                  <div className="text-blue-600">
                    console.log(myVar); // undefined
                  </div>
                  <div className="text-red-600">
                    var myVar = &quot;Hello&quot;;
                  </div>
                  <div className="text-blue-600">
                    console.log(myVar); // &quot;Hello&quot;
                  </div>

                  <div className="text-gray-600 mt-4 mb-2">
                    // JavaScript 엔진이 해석하는 방식
                  </div>
                  <div className="text-red-600">
                    var myVar; // undefined로 초기화
                  </div>
                  <div className="text-blue-600">
                    console.log(myVar); // undefined
                  </div>
                  <div className="text-red-600">
                    myVar = &quot;Hello&quot;; // 값 할당
                  </div>
                  <div className="text-blue-600">
                    console.log(myVar); // &quot;Hello&quot;
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-2">
                  📋 호이스팅 동작 방식
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <div className="font-semibold text-red-800 mb-2">var</div>
                    <ul className="text-red-700 space-y-1 list-disc list-inside">
                      <li>선언 + 초기화 (undefined)</li>
                      <li>함수 스코프 최상단으로 이동</li>
                      <li>선언 전에 접근 가능</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <div className="font-semibold text-blue-800 mb-2">let</div>
                    <ul className="text-blue-700 space-y-1 list-disc list-inside">
                      <li>선언만 (초기화 안 됨)</li>
                      <li>블록 스코프 최상단으로 이동</li>
                      <li>TDZ에 머무름 (접근 불가)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <div className="font-semibold text-green-800 mb-2">
                      const
                    </div>
                    <ul className="text-green-700 space-y-1 list-disc list-inside">
                      <li>선언만 (초기화 안 됨)</li>
                      <li>블록 스코프 최상단으로 이동</li>
                      <li>TDZ에 머무름 (접근 불가)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-6 border-2 border-red-200 shadow-lg">
            <h4 className="text-lg font-semibold text-red-800 mb-4">
              ⚠️ TDZ (Temporal Dead Zone)란?
            </h4>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h5 className="font-semibold text-red-800 mb-2">🧠 개념</h5>
                <p className="text-sm text-red-700 mb-3">
                  TDZ는 let과 const로 선언된 변수가 호이스팅은 되지만, 실제
                  선언문에 도달할 때까지 접근할 수 없는 일시적 사각지대입니다.
                  이는 변수의 안전한 사용을 보장합니다.
                </p>

                <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                  <div className="text-gray-600 mb-2">// TDZ 예시</div>
                  <div className="text-green-600">function example() {`{`}</div>
                  <div className="text-red-600 ml-4"> // TDZ 시작 지점</div>
                  <div className="text-red-600 ml-4">
                    {" "}
                    console.log(myLet); // ReferenceError!
                  </div>
                  <div className="text-red-600 ml-4">
                    {" "}
                    console.log(myConst); // ReferenceError!
                  </div>
                  <div className="text-gray-600 ml-4"> </div>
                  <div className="text-blue-600 ml-4">
                    {" "}
                    let myLet = &quot;Hello&quot;; // TDZ 끝
                  </div>
                  <div className="text-blue-600 ml-4">
                    {" "}
                    const myConst = &quot;World&quot;; // TDZ 끝
                  </div>
                  <div className="text-gray-600 ml-4"> </div>
                  <div className="text-green-600 ml-4">
                    {" "}
                    console.log(myLet); // &quot;Hello&quot; ✅
                  </div>
                  <div className="text-green-600 ml-4">
                    {" "}
                    console.log(myConst); // &quot;World&quot; ✅
                  </div>
                  <div className="text-green-600">{`}`}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h5 className="font-semibold text-red-800 mb-2">
                  🎯 TDZ의 목적
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-red-700 mb-2">
                      🛡️ 안전성 보장
                    </div>
                    <ul className="text-red-600 space-y-1 list-disc list-inside">
                      <li>초기화 전 접근 방지</li>
                      <li>의도치 않은 undefined 사용 방지</li>
                      <li>더 예측 가능한 코드 작성</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-red-700 mb-2">
                      🔍 디버깅 도움
                    </div>
                    <ul className="text-red-600 space-y-1 list-disc list-inside">
                      <li>명확한 에러 메시지</li>
                      <li>변수 사용 실수 조기 발견</li>
                      <li>코드의 실행 순서 강제</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h5 className="font-semibold text-red-800 mb-2">
                  📊 TDZ 시각화
                </h5>
                <div className="bg-gray-100 p-3 rounded">
                  <div className="text-xs font-mono space-y-1">
                    <div className="text-gray-600">
                      스코프 시작 ────────────────────────────────
                    </div>
                    <div className="text-red-600">
                      │ ⚠️ TDZ: let/const 변수 접근 불가
                    </div>
                    <div className="text-red-600">
                      │ ⚠️ TDZ: let/const 변수 접근 불가
                    </div>
                    <div className="text-red-600">
                      │ ⚠️ TDZ: let/const 변수 접근 불가
                    </div>
                    <div className="text-blue-600">
                      │ 📍 let/const 선언문 도달 (TDZ 끝)
                    </div>
                    <div className="text-green-600">│ ✅ 변수 사용 가능</div>
                    <div className="text-green-600">│ ✅ 변수 사용 가능</div>
                    <div className="text-gray-600">
                      스코프 끝 ──────────────────────────────────
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기본 개념 설명 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🔍 기본 개념과 차이점
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  🔴 var (ES5)
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>✅ var끼리 재선언 가능</li>
                  <li>✅ 재할당 가능</li>
                  <li>📍 함수 스코프</li>
                  <li>⬆️ 호이스팅 (undefined)</li>
                  <li>🌍 전역 객체 속성</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  🔵 let (ES6)
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>❌ 재선언 불가</li>
                  <li>✅ 재할당 가능</li>
                  <li>📦 블록 스코프</li>
                  <li>⚠️ TDZ (일시적 사각지대)</li>
                  <li>🔒 전역 객체 독립</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  🟢 const (ES6)
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>❌ 재선언 불가</li>
                  <li>❌ 재할당 불가</li>
                  <li>📦 블록 스코프</li>
                  <li>⚠️ TDZ (일시적 사각지대)</li>
                  <li>🔒 전역 객체 독립</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 코드 예제 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            💻 핵심 코드 예제
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 스코프 차이 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-yellow-800 mb-4">
                📍 스코프 차이
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{`function scopeExample() {
  if (true) {
    var varVariable = "함수 스코프";
    let letVariable = "블록 스코프";
    const constVariable = "블록 스코프";
  }
  
  console.log(varVariable);    // "함수 스코프" ✅
  console.log(letVariable);    // ReferenceError ❌
  console.log(constVariable);  // ReferenceError ❌
}`}</pre>
              </div>
            </div>

            {/* 호이스팅 차이 */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-purple-800 mb-4">
                ⬆️ 호이스팅 차이
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{`console.log(varVar);    // undefined ✅
console.log(letVar);    // ReferenceError ❌
console.log(constVar);  // ReferenceError ❌

var varVar = "var";
let letVar = "let";
const constVar = "const";

// 실제 동작 (var 호이스팅)
var varVar;             // undefined로 초기화
console.log(varVar);    // undefined
varVar = "var";         // 값 할당`}</pre>
              </div>
            </div>

            {/* 재선언과 재할당 */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4">
                🔄 재선언과 재할당
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{`// var - 재선언과 재할당 모두 가능
var name = "Alice";
var name = "Bob";       // ✅ 재선언 가능
name = "Charlie";       // ✅ 재할당 가능

// let - 재할당만 가능
let age = 25;
let age = 30;          // ❌ SyntaxError
age = 30;              // ✅ 재할당 가능

// const - 둘 다 불가능
const PI = 3.14;
const PI = 3.14159;    // ❌ SyntaxError
PI = 3.14159;          // ❌ TypeError

// ❌ 크로스 타입 재선언 (모두 에러)
var x = 1;
let x = 2;             // ❌ SyntaxError

let y = 1;
var y = 2;             // ❌ SyntaxError

const z = 1;
var z = 2;             // ❌ SyntaxError`}</pre>
              </div>
            </div>

            {/* TDZ 설명 */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-red-800 mb-4">
                ⚠️ Temporal Dead Zone
              </h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <pre>{`function example() {
  // TDZ 시작
  console.log(letVar);    // ReferenceError
  console.log(constVar);  // ReferenceError
  
  let letVar = "let";     // TDZ 끝
  const constVar = "const"; // TDZ 끝
  
  console.log(letVar);    // "let" ✅
  console.log(constVar);  // "const" ✅
}

// TDZ = 호이스팅은 되지만 초기화 전까지 접근 불가`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 실제 사용 가이드 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🌟 실제 사용 가이드
          </h3>
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 border-2 border-emerald-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    ✅ 권장 사용법
                  </h4>
                  <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                    <li>
                      <strong>const</strong>: 기본적으로 사용 (불변 참조)
                    </li>
                    <li>
                      <strong>let</strong>: 재할당이 필요한 경우
                    </li>
                    <li>
                      <strong>var</strong>: 레거시 코드 호환성
                    </li>
                    <li>현대 JavaScript에서는 const &gt; let &gt; var 순서</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    🎯 const 사용 예시
                  </h4>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    <pre>{`const config = { api: "url" };
const users = [];
const element = document.getElementById('app');

// 객체/배열 내용은 변경 가능
users.push('Alice');
config.timeout = 5000;`}</pre>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    🚨 피해야 할 패턴
                  </h4>
                  <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                    <li>전역 스코프에서 var 남용</li>
                    <li>반복문에서 var 사용 (클로저 문제)</li>
                    <li>불필요한 재할당을 위한 let 사용</li>
                    <li>초기화 없는 const 선언</li>
                    <li>크로스 타입 재선언 시도 (항상 에러 발생)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    🔧 일반적인 패턴
                  </h4>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    <pre>{`// 반복문
for (let i = 0; i < 10; i++) {
  // let 사용으로 클로저 문제 해결
}

// 조건부 할당
let result;
if (condition) {
  result = "A";
} else {
  result = "B";
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 성능과 최적화 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            🚀 성능과 최적화 팁
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">⚡ 성능 관점</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>const: 컴파일러 최적화에 유리</li>
                <li>let/const: 블록 스코프로 메모리 효율적</li>
                <li>var: 함수 스코프로 메모리 오래 점유</li>
                <li>TDZ 검사는 미미한 성능 비용</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🛡️ 안전성 관점</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>const: 의도치 않은 재할당 방지</li>
                <li>let: 블록 스코프로 변수 충돌 방지</li>
                <li>TDZ: 초기화 전 사용 오류 방지</li>
                <li>크로스 타입 재선언 방지로 실수 예방</li>
                <li>명시적 스코프로 코드 가독성 향상</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VariableLanding };
