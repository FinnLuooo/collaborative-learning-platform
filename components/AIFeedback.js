"use client";
import { useState } from "react";

export default function AIFeedback({ weekData, isParent = false }) {
  const [showPositive, setShowPositive] = useState(true);

  if (isParent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">AI 學習摘要</h3>
        <p className="p-4 bg-gray-100 rounded-lg">{weekData.parentSummary}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">AI 講評區</h3>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            showPositive
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setShowPositive(true)}
        >
          看優點
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            !showPositive
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setShowPositive(false)}
        >
          看改進建議
        </button>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg">
        <p>{showPositive ? weekData.aiPositive : weekData.aiNegative}</p>
      </div>
    </div>
  );
}
