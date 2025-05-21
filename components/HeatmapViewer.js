"use client";
import { useState } from "react";

export default function HeatmapViewer({ weekData }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedView, setSelectedView] = useState("trace"); // "trace" 或 "heatmap"

  // 模擬 AI 分析過程
  const handleAnalyze = () => {
    setAnalyzing(true);

    // 模擬 API 請求延遲
    setTimeout(() => {
      // 根據當前選擇的視圖提供不同的分析結果
      const result =
        selectedView === "trace"
          ? "AI 分析結果：聯合視覺注意力軌跡圖顯示學生們的注意力主要集中在問題的圖像區域，顯示良好的協作模式。學生 A 的注意重點(藍色)主要在問題的左側部分，而學生 B 的注意重點(紅色)則分布在右側，這表明他們採取了有效的分工策略。"
          : "AI 分析結果：熱區圖顯示學生們的共同注意力主要集中在中央區域，這裡包含了解決問題的關鍵信息。邊緣區域的注意力較少，建議教師可以引導學生更全面地關注問題的所有要素，特別是左下角的相關數據。";

      setAnalysisResult(result);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">學習問題</h3>
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <p className="text-lg">{weekData.question}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-600">視覺分析圖</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedView("trace")}
            className={`px-3 py-1 rounded ${
              selectedView === "trace"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            注意力軌跡圖
          </button>
          <button
            onClick={() => setSelectedView("heatmap")}
            className={`px-3 py-1 rounded ${
              selectedView === "heatmap"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            熱區圖
          </button>
        </div>
      </div>

      <div
        className="relative w-full rounded-lg overflow-hidden mb-4"
        style={{ height: "400px" }}
      >
        {selectedView === "trace" ? (
          <img
            src="https://images.plurk.com/50yfR8MexfoMvuIxZc5jXw.jpg"
            alt="聯合視覺注意力軌跡圖"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src="https://images.plurk.com/1uRiMHPFdFDcqqhyrzkbbO.jpg"
            alt="熱區圖"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg flex items-center justify-center"
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

      {analysisResult && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-bold text-blue-700 mb-2">AI 分析報告</h4>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
}
