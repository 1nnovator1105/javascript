"use client";

import React, { useState } from "react";

interface FlexItem {
  id: number;
  flex: string;
  order: number;
  alignSelf: string;
  content: string;
}

interface FlexboxPlaygroundProps {
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  onFlexDirectionChange?: (direction: "row" | "row-reverse" | "column" | "column-reverse") => void;
  justifyContent?: string;
  onJustifyContentChange?: (value: string) => void;
  alignItems?: string;
  onAlignItemsChange?: (value: string) => void;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  onFlexWrapChange?: (value: "nowrap" | "wrap" | "wrap-reverse") => void;
  gap?: number;
  onGapChange?: (value: number) => void;
}

export const FlexboxPlayground: React.FC<FlexboxPlaygroundProps> = ({ 
  flexDirection: externalFlexDirection,
  onFlexDirectionChange,
  justifyContent: externalJustifyContent,
  onJustifyContentChange,
  alignItems: externalAlignItems,
  onAlignItemsChange,
  flexWrap: externalFlexWrap,
  onFlexWrapChange,
  gap: externalGap,
  onGapChange
}) => {
  // Container properties
  const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">(externalFlexDirection || "row");
  const [justifyContent, setJustifyContent] = useState<string>(externalJustifyContent || "flex-start");
  const [alignItems, setAlignItems] = useState<string>(externalAlignItems || "stretch");
  const [flexWrap, setFlexWrap] = useState<"nowrap" | "wrap" | "wrap-reverse">(externalFlexWrap || "nowrap");
  const [gap, setGap] = useState<number>(externalGap ?? 8);
  const [containerWidth, setContainerWidth] = useState<number>(100);

  // Flex items
  const [items, setItems] = useState<FlexItem[]>([
    { id: 1, flex: "0 1 auto", order: 0, alignSelf: "auto", content: "Item 1" },
    { id: 2, flex: "0 1 auto", order: 0, alignSelf: "auto", content: "Item 2" },
    { id: 3, flex: "0 1 auto", order: 0, alignSelf: "auto", content: "Item 3" },
  ]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // Update external props when they change
  React.useEffect(() => {
    if (externalFlexDirection && externalFlexDirection !== flexDirection) {
      setFlexDirection(externalFlexDirection);
    }
  }, [externalFlexDirection, flexDirection]);

  React.useEffect(() => {
    if (externalJustifyContent && externalJustifyContent !== justifyContent) {
      setJustifyContent(externalJustifyContent);
    }
  }, [externalJustifyContent, justifyContent]);

  React.useEffect(() => {
    if (externalAlignItems && externalAlignItems !== alignItems) {
      setAlignItems(externalAlignItems);
    }
  }, [externalAlignItems, alignItems]);

  React.useEffect(() => {
    if (externalFlexWrap && externalFlexWrap !== flexWrap) {
      setFlexWrap(externalFlexWrap);
    }
  }, [externalFlexWrap, flexWrap]);

  React.useEffect(() => {
    if (externalGap !== undefined && externalGap !== gap) {
      setGap(externalGap);
    }
  }, [externalGap, gap]);

  const handleFlexDirectionChange = (newDirection: "row" | "row-reverse" | "column" | "column-reverse") => {
    setFlexDirection(newDirection);
    onFlexDirectionChange?.(newDirection);
  };

  const handleJustifyContentChange = (newValue: string) => {
    setJustifyContent(newValue);
    onJustifyContentChange?.(newValue);
  };

  const handleAlignItemsChange = (newValue: string) => {
    setAlignItems(newValue);
    onAlignItemsChange?.(newValue);
  };

  const handleFlexWrapChange = (newValue: "nowrap" | "wrap" | "wrap-reverse") => {
    setFlexWrap(newValue);
    onFlexWrapChange?.(newValue);
  };

  const handleGapChange = (newValue: number) => {
    setGap(newValue);
    onGapChange?.(newValue);
  };

  const justifyContentOptions = [
    { value: "flex-start", label: "flex-start", icon: "⬅️" },
    { value: "flex-end", label: "flex-end", icon: "➡️" },
    { value: "center", label: "center", icon: "↔️" },
    { value: "space-between", label: "space-between", icon: "↔️" },
    { value: "space-around", label: "space-around", icon: "↔️" },
    { value: "space-evenly", label: "space-evenly", icon: "↔️" },
  ];

  const alignItemsOptions = [
    { value: "stretch", label: "stretch" },
    { value: "flex-start", label: "flex-start" },
    { value: "flex-end", label: "flex-end" },
    { value: "center", label: "center" },
    { value: "baseline", label: "baseline" },
  ];

  const updateItem = (id: number, updates: Partial<FlexItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems([...items, {
      id: newId,
      flex: "0 1 auto",
      order: 0,
      alignSelf: "auto",
      content: `Item ${newId}`
    }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
      if (selectedItemId === id) {
        setSelectedItemId(null);
      }
    }
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <div className="space-y-6">
      {/* Container Controls */}
      <div className="bg-white rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-bold text-blue-900 mb-4">Container Properties</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Flex Direction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              flex-direction
            </label>
            <select
              value={flexDirection}
              onChange={(e) => handleFlexDirectionChange(e.target.value as "row" | "row-reverse" | "column" | "column-reverse")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          {/* Justify Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              justify-content
            </label>
            <select
              value={justifyContent}
              onChange={(e) => handleJustifyContentChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {justifyContentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Align Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              align-items
            </label>
            <select
              value={alignItems}
              onChange={(e) => handleAlignItemsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {alignItemsOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Flex Wrap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              flex-wrap
            </label>
            <select
              value={flexWrap}
              onChange={(e) => handleFlexWrapChange(e.target.value as "nowrap" | "wrap" | "wrap-reverse")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          {/* Gap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              gap: {gap}px
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={gap}
              onChange={(e) => handleGapChange(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Container Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              container width: {containerWidth}%
            </label>
            <input
              type="range"
              min="30"
              max="100"
              value={containerWidth}
              onChange={(e) => setContainerWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-blue-900">Live Preview</h4>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add Item
          </button>
        </div>

        {/* Preview Container */}
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <div
            className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-4 min-h-[300px] transition-all duration-300"
            style={{
              width: `${containerWidth}%`,
              margin: "0 auto",
              display: "flex",
              flexDirection,
              justifyContent,
              alignItems,
              flexWrap,
              gap: `${gap}px`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedItemId === item.id ? "ring-4 ring-yellow-400" : ""
                }`}
                style={{
                  flex: item.flex,
                  order: item.order,
                  alignSelf: item.alignSelf,
                  minWidth: "80px",
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-center">
                  <div className="font-bold">{item.content}</div>
                  <div className="text-xs opacity-75 mt-1">
                    flex: {item.flex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated CSS */}
        <div className="mt-4">
          <h5 className="font-semibold text-gray-700 mb-2">Generated CSS:</h5>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`}
          </pre>
        </div>
      </div>

      {/* Item Properties */}
      {selectedItem && (
        <div className="bg-white rounded-lg p-6 border border-yellow-400">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-yellow-900">
              Item Properties - {selectedItem.content}
            </h4>
            <button
              onClick={() => removeItem(selectedItem.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Flex Grow */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                flex-grow
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={selectedItem.flex.split(" ")[0]}
                onChange={(e) => {
                  const parts = selectedItem.flex.split(" ");
                  parts[0] = e.target.value;
                  updateItem(selectedItem.id, { flex: parts.join(" ") });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Flex Shrink */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                flex-shrink
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={selectedItem.flex.split(" ")[1]}
                onChange={(e) => {
                  const parts = selectedItem.flex.split(" ");
                  parts[1] = e.target.value;
                  updateItem(selectedItem.id, { flex: parts.join(" ") });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Flex Basis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                flex-basis
              </label>
              <input
                type="text"
                value={selectedItem.flex.split(" ")[2]}
                onChange={(e) => {
                  const parts = selectedItem.flex.split(" ");
                  parts[2] = e.target.value;
                  updateItem(selectedItem.id, { flex: parts.join(" ") });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                order
              </label>
              <input
                type="number"
                value={selectedItem.order}
                onChange={(e) => updateItem(selectedItem.id, { order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Align Self */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                align-self
              </label>
              <select
                value={selectedItem.alignSelf}
                onChange={(e) => updateItem(selectedItem.id, { alignSelf: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="auto">auto</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="baseline">baseline</option>
                <option value="stretch">stretch</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <input
                type="text"
                value={selectedItem.content}
                onChange={(e) => updateItem(selectedItem.id, { content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <h5 className="font-semibold text-gray-700 mb-2">Item CSS:</h5>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`.flex-item {
  flex: ${selectedItem.flex};
  order: ${selectedItem.order};
  align-self: ${selectedItem.alignSelf};
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Common Patterns */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
        <h4 className="text-lg font-bold text-indigo-900 mb-4">자주 사용하는 Flexbox 패턴</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              handleFlexDirectionChange("row");
              handleJustifyContentChange("space-between");
              handleAlignItemsChange("center");
              handleFlexWrapChange("nowrap");
            }}
            className="p-4 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-left"
          >
            <h5 className="font-semibold text-indigo-800 mb-1">네비게이션 바</h5>
            <p className="text-sm text-gray-600">space-between을 사용한 가로 레이아웃</p>
          </button>

          <button
            onClick={() => {
              handleFlexDirectionChange("row");
              handleJustifyContentChange("center");
              handleAlignItemsChange("center");
              handleFlexWrapChange("wrap");
              handleGapChange(16);
            }}
            className="p-4 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-left"
          >
            <h5 className="font-semibold text-indigo-800 mb-1">카드 그리드</h5>
            <p className="text-sm text-gray-600">wrap과 가운데 정렬</p>
          </button>

          <button
            onClick={() => {
              handleFlexDirectionChange("column");
              handleJustifyContentChange("flex-start");
              handleAlignItemsChange("stretch");
              handleFlexWrapChange("nowrap");
            }}
            className="p-4 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-left"
          >
            <h5 className="font-semibold text-indigo-800 mb-1">사이드바 레이아웃</h5>
            <p className="text-sm text-gray-600">stretch를 사용한 세로 레이아웃</p>
          </button>

          <button
            onClick={() => {
              handleFlexDirectionChange("row");
              handleJustifyContentChange("center");
              handleAlignItemsChange("center");
              handleFlexWrapChange("nowrap");
              // Set first item to grow
              if (items.length > 0) {
                updateItem(items[0].id, { flex: "1 1 auto" });
              }
            }}
            className="p-4 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-left"
          >
            <h5 className="font-semibold text-indigo-800 mb-1">Holy Grail 레이아웃</h5>
            <p className="text-sm text-gray-600">메인 콘텐츠와 사이드바</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlexboxPlayground;