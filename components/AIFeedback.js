"use client";
import { useState } from "react";

export default function AIFeedback({ weekData, classData, isParent = false }) {
  const [selectedFeedback, setSelectedFeedback] = useState("aiPositive"); // "aiPositive", "aiNegative", "teacher"

  // 檢查任務類型
  const isDynamicTask =
    weekData.isDynamicTask && classData?.taskType === "dynamic";
  const isMultiQuestion =
    weekData.isMultiQuestion && classData?.taskType === "static";

  // 獲取當前資料
  const getCurrentData = () => {
    if (isDynamicTask) {
      return (
        weekData.steps?.find((step) => step.id === weekData.currentStep) ||
        weekData
      );
    } else if (isMultiQuestion) {
      return (
        weekData.questions?.find(
          (question) => question.id === weekData.currentQuestion
        ) || weekData
      );
    }
    return weekData;
  };

  const currentData = getCurrentData();

  // 家長查看模式顯示總結
  if (isParent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-purple-600 mb-4">家長總結</h3>
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-purple-800">
            {weekData.parentSummary ||
              "本週學習表現良好，請持續鼓勵孩子的學習積極性。"}
          </p>
        </div>
      </div>
    );
  }

  // 獲取顯示內容
  const getDisplayContent = () => {
    switch (selectedFeedback) {
      case "aiPositive":
        return {
          title: "AI優點講評",
          content:
            currentData.aiPositive ||
            "學生在此題目中展現出良好的學習態度和協作能力。",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700",
          iconColor: "text-green-400",
          icon: (
            <svg
              className="h-5 w-5 text-green-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "aiNegative":
        return {
          title: "AI缺點講評",
          content:
            currentData.aiNegative || "建議在解題過程中加強討論和驗證步驟。",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-700",
          iconColor: "text-yellow-400",
          icon: (
            <svg
              className="h-5 w-5 text-yellow-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "teacher":
        return {
          title: "老師講評",
          content:
            currentData.teacherFeedback || "老師還沒有新增講評，請耐心等候。",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-700",
          iconColor: "text-blue-400",
          icon: (
            <svg
              className="h-5 w-5 text-blue-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      default:
        return null;
    }
  };

  const displayContent = getDisplayContent();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">
        講評區
        {isMultiQuestion && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            (第{weekData.currentQuestion}題)
          </span>
        )}
        {isDynamicTask && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Step {weekData.currentStep})
          </span>
        )}
      </h3>

      {/* 三個切換按鈕 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedFeedback("aiPositive")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedFeedback === "aiPositive"
              ? "bg-green-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          AI優點講評
        </button>
        <button
          onClick={() => setSelectedFeedback("aiNegative")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedFeedback === "aiNegative"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          AI缺點講評
        </button>
        <button
          onClick={() => setSelectedFeedback("teacher")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedFeedback === "teacher"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          老師講評
        </button>
      </div>

      {/* 顯示選中的講評內容 */}
      {displayContent && (
        <div
          className={`p-4 ${displayContent.bgColor} ${displayContent.borderColor} border rounded-lg`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">{displayContent.icon}</div>
            <div className="ml-3">
              <h4
                className={`text-sm font-medium ${displayContent.textColor.replace(
                  "700",
                  "800"
                )}`}
              >
                {displayContent.title}
              </h4>
              <p className={`mt-1 text-sm ${displayContent.textColor}`}>
                {displayContent.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
