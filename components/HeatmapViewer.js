"use client";
import { useState } from "react";
import AIExplanationModal from "./AIExplanationModal"; // 🆕 引入新的 AI 解說彈窗

export default function HeatmapViewer({ weekData, classData, userRole }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedView, setSelectedView] = useState("trace"); // "trace" 或 "heatmap" 或 "video"
  const [selectedImageType, setSelectedImageType] = useState("original"); // "original", "explanation", "ai"
  const [showAIExplanation, setShowAIExplanation] = useState(false); // 🆕 控制 AI 解說彈窗

  // 檢查任務類型
  const isDynamicTask =
    weekData.isDynamicTask && classData?.taskType === "dynamic";
  const isMultiQuestion =
    weekData.isMultiQuestion && classData?.taskType === "static";

  // 獲取當前資料（動態任務步驟或多題模式）
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

  // 模擬 AI 分析過程
  const handleAnalyze = () => {
    setAnalyzing(true);

    // 模擬 API 請求延遲
    setTimeout(() => {
      // 根據當前選擇的視圖提供不同的分析結果
      const result =
        selectedView === "trace"
          ? currentData.aiTraceAnalysis ||
            "AI 分析結果：聯合視覺注意力軌跡圖顯示學生們的注意力主要集中在問題的圖像區域，顯示良好的協作模式。"
          : currentData.aiHeatmapAnalysis ||
            "AI 分析結果：熱區圖顯示學生們的共同注意力主要集中在中央區域，這裡包含了解決問題的關鍵信息。";

      setAnalysisResult(result);
      setAnalyzing(false);
    }, 1500);
  };

  // 🆕 處理 AI 解說按鈕點擊
  const handleAIExplanation = () => {
    setShowAIExplanation(true);
  };

  // 獲取表現評分的表情符號
  const getPerformanceEmoji = (score) => {
    if (score >= 80) return "😊";
    if (score >= 60) return "😐";
    return "😢";
  };

  // 獲取按鈕文字（根據角色）
  const getButtonText = (buttonType) => {
    const isStudent = userRole === "student";

    switch (buttonType) {
      case "original":
        return "原始圖";
      case "explanation":
        return isStudent ? "看文字答案" : "文字說明";
      case "ai":
        return isStudent ? "AI幫你看圖" : "AI解說";
      default:
        return "原始圖";
    }
  };

  // 🆕 處理 AI 解說按鈕的特殊邏輯
  const handleImageTypeChange = (type) => {
    if (type === "ai") {
      // 點擊 AI 解說按鈕時，打開新的彈窗而不是切換圖片
      handleAIExplanation();
    } else {
      // 其他按鈕正常切換圖片
      setSelectedImageType(type);
    }
  };

  // 獲取當前圖片URL
  const getCurrentImageUrl = () => {
    const currentTraceUrl =
      currentData.traceImage ||
      "https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg";
    const currentHeatmapUrl =
      currentData.heatmapImage ||
      "https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg";

    // 文字說明圖URL
    const explanationImageUrl =
      currentData.explanationImage ||
      "https://images.plurk.com/7cOlkvdUXXzCe6GCYQf8f0.jpg";

    if (selectedImageType === "explanation") {
      return explanationImageUrl;
    } else {
      // 原始圖 (AI解說按鈕不再切換圖片，而是打開彈窗)
      return selectedView === "trace" ? currentTraceUrl : currentHeatmapUrl;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">
        {isDynamicTask ? "學習任務" : "學習問題"}
      </h3>

      {/* 任務標題（動態任務專用） */}
      {isDynamicTask && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {weekData.taskTitle}
          </h4>
          <div className="flex items-center space-x-4 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {currentData.title}
            </span>
            <span className="text-sm text-gray-500">
              Step {weekData.currentStep} / {weekData.totalSteps}
            </span>
          </div>
        </div>
      )}

      {/* 多題模式標題（靜態任務專用） */}
      {isMultiQuestion && (
        <div className="mb-4">
          <div className="flex items-center space-x-4 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              數學練習
            </span>
            <span className="text-sm text-gray-500">
              第 {weekData.currentQuestion} 題 / 共 {weekData.totalQuestions} 題
            </span>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <p className="text-lg">{currentData.question}</p>
      </div>

      {/* 🆕 視覺分析圖區塊標題和按鈕 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-600">視覺分析圖</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedView("trace")}
            className={`px-3 py-1 rounded transition-colors ${
              selectedView === "trace"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            注意力軌跡圖
          </button>
          <button
            onClick={() => setSelectedView("heatmap")}
            className={`px-3 py-1 rounded transition-colors ${
              selectedView === "heatmap"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            熱區圖
          </button>
          {/* 🆕 錄影紀錄按鈕 */}
          <button
            onClick={() => setSelectedView("video")}
            className={`px-3 py-1 rounded transition-colors ${
              selectedView === "video"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            📹 錄影紀錄
          </button>
        </div>
      </div>

      {/* 🆕 錄影紀錄顯示區域 */}
      {selectedView === "video" && (
        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              穿戴式眼動追蹤裝置錄影
            </h4>
            <p className="text-gray-600 mb-4">
              此功能將顯示學習過程中穿戴式眼動追蹤裝置所錄製的影片，
              <br />
              可以回放實際的學習情況和眼球移動軌跡。
            </p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                🚧 錄影播放功能開發中，敬請期待！
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 雙欄對比顯示區域 - 只在非錄影模式顯示 */}
      {selectedView !== "video" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {/* 實作圖（左欄） */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-800 text-center">
                實作{selectedView === "trace" ? "注意力軌跡圖" : "熱區圖"}
              </h4>

              {/* 🆕 修改圖片切換按鈕邏輯 */}
              <div className="flex justify-center space-x-2 mb-3">
                <button
                  onClick={() => handleImageTypeChange("original")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    selectedImageType === "original"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {getButtonText("original")}
                </button>
                <button
                  onClick={() => handleImageTypeChange("explanation")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    selectedImageType === "explanation"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  {getButtonText("explanation")}
                </button>
                {/* 🆕 AI解說按鈕 - 現在點擊會打開彈窗 */}
                <button
                  onClick={() => handleImageTypeChange("ai")}
                  className="px-3 py-1 text-sm rounded transition-colors bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {getButtonText("ai")}
                </button>
              </div>

              <div
                className="relative w-full rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-200"
                style={{ height: "300px", marginTop: "12px" }}
              >
                <img
                  src={getCurrentImageUrl()}
                  alt={`實作${
                    selectedView === "trace" ? "注意力軌跡圖" : "熱區圖"
                  }`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* 理想圖（右欄） */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-800 text-center">
                理想{selectedView === "trace" ? "注意力軌跡圖" : "熱區圖"}
              </h4>

              {/* 右欄增加相同高度的佔位空間，確保兩欄高度一致 */}
              <div
                className="flex justify-center space-x-2 mb-3"
                style={{ height: "32px" }}
              >
                {/* 透明佔位元素，保持與左欄按鈕相同的高度 */}
                <div className="invisible px-3 py-1 text-sm">佔位</div>
              </div>

              <div
                className="relative w-full rounded-lg overflow-hidden bg-gray-100 border-2 border-green-200"
                style={{ height: "300px" }}
              >
                {selectedView === "trace" ? (
                  <img
                    src={
                      currentData.idealTraceImage ||
                      "https://images.plurk.com/12Q8yTDRmSBDaTPy2CcKTf.jpg"
                    }
                    alt="理想注意力軌跡圖"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={
                      currentData.idealHeatmapImage ||
                      "https://images.plurk.com/6OgcTXdJR7GLWcZ4RgGk9u.jpg"
                    }
                    alt="理想熱區圖"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 對比說明文字 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1-1v3a1 1 0 002 0V4a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm text-yellow-700 font-medium">
                  對比分析說明
                </p>
                <p className="text-sm text-yellow-600 mt-1">
                  左側顯示學生實際的
                  {selectedView === "trace" ? "注意力軌跡" : "注意力熱區"}，
                  右側顯示理想的學習模式。透過對比可以了解學習效果和改進方向。
                  {selectedImageType === "explanation" &&
                    "目前顯示文字說明版本，"}
                  可使用按鈕切換不同的圖片視圖或打開 AI 解說功能。
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI 分析按鈕 - 只在非錄影模式顯示 */}
      {selectedView !== "video" && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center transition-colors"
          >
            {analyzing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                正在分析中...
              </>
            ) : (
              "AI 分析"
            )}
          </button>
        </div>
      )}

      {/* AI 分析結果 */}
      {analysisResult && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <h4 className="font-bold text-blue-700 mb-2">AI 分析報告</h4>
          <p>{analysisResult}</p>
        </div>
      )}

      {/* 🆕 今天我表現得怎麼樣區塊 - 移到 AI 分析下面 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-purple-800">
            今天我表現得怎麼樣？
          </h4>
          <div className="text-4xl">
            {getPerformanceEmoji(currentData.performanceScore || 75)}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">😊</span>
            <span className="text-2xl">😐</span>
            <span className="text-2xl">😢</span>
          </div>
        </div>
      </div>

      {/* 🆕 AI 解說彈窗 */}
      <AIExplanationModal
        isOpen={showAIExplanation}
        onClose={() => setShowAIExplanation(false)}
        userRole={userRole}
        selectedView={selectedView}
        currentData={currentData}
      />
    </div>
  );
}
