"use client";

import React, { useState } from "react";
import { getColorClass } from "@/utils/colorMigration";

interface FlexboxVisualizerProps {
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: string;
  alignItems?: string;
}

export const FlexboxVisualizer: React.FC<FlexboxVisualizerProps> = ({ 
  flexDirection: externalFlexDirection,
  justifyContent: externalJustifyContent,
  alignItems: externalAlignItems 
}) => {
  const [showMainAxis, setShowMainAxis] = useState(true);
  const [showCrossAxis, setShowCrossAxis] = useState(true);
  const [flexDirection, setFlexDirection] = useState<"row" | "column">(
    externalFlexDirection?.includes("row") ? "row" : "column"
  );

  // Update when external flexDirection changes
  React.useEffect(() => {
    if (externalFlexDirection) {
      setFlexDirection(externalFlexDirection.includes("row") ? "row" : "column");
    }
  }, [externalFlexDirection]);

  const getAxisStyles = () => {
    if (flexDirection === "row") {
      return {
        mainAxis: "absolute top-1/2 left-0 right-0 h-0.5 bg-blue-500 -translate-y-1/2",
        mainAxisArrow: "absolute right-0 top-1/2 -translate-y-1/2",
        crossAxis: "absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-500 -translate-x-1/2",
        crossAxisArrow: "absolute left-1/2 bottom-0 -translate-x-1/2",
      };
    } else {
      return {
        mainAxis: "absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 -translate-x-1/2",
        mainAxisArrow: "absolute left-1/2 bottom-0 -translate-x-1/2",
        crossAxis: "absolute top-1/2 left-0 right-0 h-0.5 bg-green-500 -translate-y-1/2",
        crossAxisArrow: "absolute right-0 top-1/2 -translate-y-1/2",
      };
    }
  };

  const axisStyles = getAxisStyles();

  return (
    <div className={`bg-white rounded-lg p-6 border ${getColorClass('border-purple-200')}`}>
      <h4 className={`text-lg font-bold ${getColorClass('text-purple-900')} mb-4`}>Flexbox 축 시각화</h4>
      
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showMainAxis}
              onChange={(e) => setShowMainAxis(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium text-blue-700">주축 표시</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showCrossAxis}
              onChange={(e) => setShowCrossAxis(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium text-green-700">교차축 표시</span>
          </label>

          <select
            value={flexDirection}
            onChange={(e) => setFlexDirection(e.target.value as "row" | "column")}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="row">flex-direction: row</option>
            <option value="column">flex-direction: column</option>
          </select>
        </div>

        {/* Visualization */}
        <div className="relative bg-gray-50 rounded-lg p-8 h-64 overflow-hidden">
          {/* Axes */}
          {showMainAxis && (
            <>
              <div className={axisStyles.mainAxis}>
                <div className="absolute -top-6 left-2 text-xs font-medium text-blue-700">
                  주축 (Main Axis)
                </div>
              </div>
              <div className={axisStyles.mainAxisArrow}>
                <svg width="20" height="20" viewBox="0 0 20 20" className="text-blue-500">
                  {flexDirection === "row" ? (
                    <path d="M10 5 L15 10 L10 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                  ) : (
                    <path d="M5 10 L10 15 L15 10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  )}
                </svg>
              </div>
            </>
          )}
          
          {showCrossAxis && (
            <>
              <div className={axisStyles.crossAxis}>
                <div className="absolute -left-16 top-2 text-xs font-medium text-green-700 -rotate-90 origin-left">
                  교차축 (Cross Axis)
                </div>
              </div>
              <div className={axisStyles.crossAxisArrow}>
                <svg width="20" height="20" viewBox="0 0 20 20" className="text-green-500">
                  {flexDirection === "row" ? (
                    <path d="M5 10 L10 15 L15 10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  ) : (
                    <path d="M10 5 L15 10 L10 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                  )}
                </svg>
              </div>
            </>
          )}

          {/* Flex Container */}
          <div 
            className={`absolute inset-8 border-2 border-dashed border-gray-400 rounded-lg flex p-4`}
            style={{
              flexDirection: externalFlexDirection || flexDirection,
              justifyContent: externalJustifyContent || "flex-start",
              alignItems: externalAlignItems || "stretch",
              gap: "16px",
              minHeight: "200px"
            }}
          >
            <div className={`${getColorClass('bg-purple-400')} text-white p-4 rounded flex-shrink-0 relative`}>
              <div className="text-center">
                아이템 1
              </div>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs ${getColorClass('bg-purple-600')} text-white px-1 rounded`}>
                1
              </div>
            </div>
            <div className={`${getColorClass('bg-purple-500')} text-white p-4 rounded flex-shrink-0 relative`}>
              <div className="text-center">
                아이템 2
              </div>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs ${getColorClass('bg-purple-600')} text-white px-1 rounded`}>
                2
              </div>
            </div>
            <div className={`${getColorClass('bg-purple-600')} text-white p-4 rounded flex-shrink-0 relative`}>
              <div className="text-center">
                아이템 3
              </div>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs ${getColorClass('bg-purple-600')} text-white px-1 rounded`}>
                3
              </div>
            </div>
          </div>
        </div>

        {/* Current Settings Display */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h5 className="font-semibold text-blue-800 mb-2">현재 설정값</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div>
              <span className="font-medium">flex-direction:</span>
              <span className="ml-1 font-mono text-blue-700">{externalFlexDirection || flexDirection}</span>
            </div>
            {externalJustifyContent && (
              <div>
                <span className="font-medium">justify-content:</span>
                <span className="ml-1 font-mono text-blue-700">{externalJustifyContent}</span>
              </div>
            )}
            {externalAlignItems && (
              <div>
                <span className="font-medium">align-items:</span>
                <span className="ml-1 font-mono text-green-700">{externalAlignItems}</span>
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded mt-0.5"></div>
            <div className="text-sm">
              <span className="font-semibold text-blue-700">주축 (Main Axis):</span>
              <span className="text-gray-700 ml-1">
                flex 아이템들이 배치되는 기본 축입니다.
                {flexDirection === "row" ? " (가로 방향)" : " (세로 방향)"}
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-green-500 rounded mt-0.5"></div>
            <div className="text-sm">
              <span className="font-semibold text-green-700">교차축 (Cross Axis):</span>
              <span className="text-gray-700 ml-1">
                주축에 수직인 축입니다.
                {flexDirection === "row" ? " (세로 방향)" : " (가로 방향)"}
              </span>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-2">
              • <strong>justify-content</strong>는 <span className="text-blue-600 font-semibold">주축</span>을 따라 아이템을 정렬합니다
              {externalJustifyContent && (
                <span className="ml-2 text-blue-600 font-mono">({externalJustifyContent})</span>
              )}
            </p>
            <p>
              • <strong>align-items</strong>는 <span className="text-green-600 font-semibold">교차축</span>을 따라 아이템을 정렬합니다
              {externalAlignItems && (
                <span className="ml-2 text-green-600 font-mono">({externalAlignItems})</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexboxVisualizer;