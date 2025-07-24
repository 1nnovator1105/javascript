"use client";
import React, { useState } from "react";
import { getColorClass } from "@/utils/colorMigration";

const GitWorkflowLanding = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("solo");

  const workflows = {
    solo: {
      title: "혼자 개발할 때",
      description: "개인 프로젝트나 혼자 작업할 때의 Git 워크플로우",
      color: "blue",
      steps: [
        {
          command: "git init",
          description: "새 Git 저장소 초기화",
          example: "git init my-project",
          tip: "프로젝트 폴더에서 한 번만 실행하면 됩니다"
        },
        {
          command: "git add",
          description: "변경사항을 스테이징 영역에 추가",
          example: "git add . \n# 또는 특정 파일만\ngit add src/App.js",
          tip: ". 은 모든 파일, 특정 파일명으로 개별 선택 가능"
        },
        {
          command: "git commit",
          description: "변경사항을 저장소에 기록",
          example: "git commit -m \"첫 번째 커밋: 프로젝트 초기 설정\"",
          tip: "의미있는 메시지로 나중에 찾기 쉽게 작성하세요"
        },
        {
          command: "git remote add",
          description: "원격 저장소 연결",
          example: "git remote add origin https://github.com/username/repo.git",
          tip: "GitHub에서 저장소 생성 후 URL을 복사해서 사용"
        },
        {
          command: "git push",
          description: "로컬 변경사항을 원격 저장소에 업로드",
          example: "git push -u origin main",
          tip: "첫 push는 -u 옵션으로 업스트림 설정"
        }
      ]
    },
    team: {
      title: "팀에서 협업할 때",
      description: "여러 명이 함께 작업할 때의 Git 워크플로우",
      color: "green",
      steps: [
        {
          command: "git clone",
          description: "원격 저장소를 로컬로 복제",
          example: "git clone https://github.com/team/project.git",
          tip: "팀 프로젝트에 처음 참여할 때 사용"
        },
        {
          command: "git checkout -b",
          description: "새 브랜치 생성 및 전환",
          example: "git checkout -b feature/login-page",
          tip: "feature/, bugfix/, hotfix/ 등의 명명 규칙 사용"
        },
        {
          command: "git pull",
          description: "원격 저장소의 최신 변경사항 가져오기",
          example: "git pull origin main",
          tip: "작업 시작 전 항상 최신 상태로 동기화"
        },
        {
          command: "git add & commit",
          description: "작업 내용을 커밋",
          example: "git add .\ngit commit -m \"feat: 로그인 페이지 UI 구현\"",
          tip: "작은 단위로 자주 커밋하는 것이 좋습니다"
        },
        {
          command: "git push",
          description: "브랜치를 원격에 푸시",
          example: "git push origin feature/login-page",
          tip: "PR 생성 전 브랜치를 원격에 올려야 합니다"
        },
        {
          command: "Pull Request",
          description: "GitHub에서 PR 생성 및 코드 리뷰",
          example: "GitHub 웹에서 'New Pull Request' 클릭",
          tip: "제목과 설명을 자세히 작성해서 리뷰어가 이해하기 쉽게"
        }
      ]
    }
  };

  const commonCommands = [
    {
      category: "상태 확인",
      commands: [
        { cmd: "git status", desc: "현재 저장소 상태 확인" },
        { cmd: "git log", desc: "커밋 히스토리 확인" },
        { cmd: "git diff", desc: "변경사항 비교" },
        { cmd: "git branch", desc: "브랜치 목록 확인" }
      ]
    },
    {
      category: "되돌리기",
      commands: [
        { cmd: "git reset HEAD~1", desc: "마지막 커밋 취소 (변경사항 유지)" },
        { cmd: "git checkout -- file", desc: "파일 변경사항 되돌리기" },
        { cmd: "git revert HEAD", desc: "커밋을 안전하게 되돌리기" }
      ]
    },
    {
      category: "브랜치 관리",
      commands: [
        { cmd: "git branch -d branch-name", desc: "브랜치 삭제" },
        { cmd: "git merge branch-name", desc: "브랜치 병합" },
        { cmd: "git checkout main", desc: "메인 브랜치로 전환" }
      ]
    }
  ];

  const getWorkflowColor = (workflow: string) => {
    const colors = {
      solo: `${getColorClass('from-blue-50 to-indigo-50')} ${getColorClass('border-indigo-200')}`,
      team: "from-green-50 to-emerald-50 border-green-200"
    };
    return colors[workflow as keyof typeof colors] || colors.solo;
  };

  const getStepColor = (workflow: string) => {
    const colors = {
      solo: "bg-blue-500",
      team: "bg-green-500"
    };
    return colors[workflow as keyof typeof colors] || colors.solo;
  };

  return (
    <div className="space-y-8">
      {/* 소개 섹션 */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-900 mb-3">
          📁 Git & GitHub 실무 워크플로우
        </h2>
        <p className="text-orange-800 mb-4">
          실제 개발 현장에서 사용하는 Git 명령어와 GitHub 협업 방법을 단계별로 학습하세요.
          혼자 개발할 때와 팀에서 협업할 때의 차이점을 명확히 이해할 수 있습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-orange-900 mb-1">🎯 실무 중심</h3>
            <p className="text-orange-700">현장에서 바로 쓰는 명령어</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-orange-900 mb-1">🤝 협업 필수</h3>
            <p className="text-orange-700">팀 프로젝트 참여 준비</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <h3 className="font-semibold text-orange-900 mb-1">📋 체크리스트</h3>
            <p className="text-orange-700">단계별 가이드 제공</p>
          </div>
        </div>
      </div>

      {/* 워크플로우 선택 탭 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {Object.entries(workflows).map(([key, workflow]) => (
            <button
              key={key}
              onClick={() => setSelectedWorkflow(key)}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                selectedWorkflow === key
                  ? key === 'solo' 
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'bg-green-50 text-green-700 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {workflow.title}
            </button>
          ))}
        </div>

        {/* 선택된 워크플로우 내용 */}
        <div className={`p-6 bg-gradient-to-br ${getWorkflowColor(selectedWorkflow)}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {workflows[selectedWorkflow as keyof typeof workflows].title}
          </h3>
          <p className="text-gray-600 mb-6">
            {workflows[selectedWorkflow as keyof typeof workflows].description}
          </p>

          {/* 단계별 워크플로우 */}
          <div className="space-y-4">
            {workflows[selectedWorkflow as keyof typeof workflows].steps.map((step, index) => (
              <div key={index} className="bg-white/70 rounded-lg p-4 border border-white/50">
                <div className="flex items-start gap-4">
                  <div className={`${getStepColor(selectedWorkflow)} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm font-semibold">
                        {step.command}
                      </code>
                    </div>
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    <div className="bg-gray-800 rounded-lg p-3 mb-2">
                      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                        {step.example}
                      </pre>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      💡 {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 자주 사용하는 명령어 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          🔧 자주 사용하는 Git 명령어
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {commonCommands.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">{category.category}</h4>
              <div className="space-y-2">
                {category.commands.map((cmd, cmdIndex) => (
                  <div key={cmdIndex} className="bg-white rounded p-3 border border-gray-200">
                    <code className="text-sm font-mono text-blue-600 block mb-1">
                      {cmd.cmd}
                    </code>
                    <p className="text-sm text-gray-600">{cmd.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실습 체크리스트 */}
      <div className={`bg-gradient-to-r ${getColorClass('from-purple-50')} ${getColorClass('to-pink-50')} rounded-xl border ${getColorClass('border-purple-200')} p-6`}>
        <h3 className={`text-xl font-bold ${getColorClass('text-purple-900')} mb-4`}>
          ✅ 실습 체크리스트
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`font-semibold ${getColorClass('text-purple-800')} mb-3`}>혼자 개발 연습</h4>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>새 폴더에서 git init 실행해보기</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>파일 수정 후 add → commit 해보기</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>GitHub에 저장소 만들고 push 해보기</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>커밋 메시지 규칙 정하고 적용해보기</span>
              </label>
            </div>
          </div>
          <div>
            <h4 className={`font-semibold ${getColorClass('text-purple-800')} mb-3`}>팀 협업 연습</h4>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>기존 프로젝트 clone 해보기</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>feature 브랜치 만들어 작업해보기</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Pull Request 생성해보기</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>충돌 상황 만들어 해결해보기</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 리소스 */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📚 추가 학습 자료
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🔗 유용한 링크</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• <a href="https://learngitbranching.js.org/?locale=ko" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Learn Git Branching (한국어)</a></li>
              <li>• <a href="https://docs.github.com/ko" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub 공식 문서</a></li>
              <li>• <a href="https://www.atlassian.com/ko/git/tutorials" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Atlassian Git 튜토리얼</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">⚡ 다음 단계</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Git Flow 브랜칭 전략 학습</li>
              <li>• GitHub Actions으로 CI/CD 구축</li>
              <li>• 코드 리뷰 문화와 컨벤션</li>
              <li>• 대규모 프로젝트에서의 Git 관리</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GitWorkflowLanding };