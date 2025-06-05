"use client";
import { useState } from "react";

export default function FeedbackSection({
  weekData,
  classData,
  userRole = "student", // 🆕 新增 userRole 屬性
}) {
  const [activeTab, setActiveTab] = useState("ai"); // "ai", "teacher", "student"
  const [selectedCategory, setSelectedCategory] = useState("pros"); // "pros", "cons"
  const [selectedScope, setSelectedScope] = useState("individual"); // "individual", "group"

  // 🆕 判斷是否為家長模式
  const isParentMode = userRole === "parent";

  // 檢查任務類型
  const isDynamicTask =
    weekData?.isDynamicTask && classData?.taskType === "dynamic";
  const isMultiQuestion =
    weekData?.isMultiQuestion && classData?.taskType === "static";

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

  // 獲取不同標籤頁的配色
  const getTabConfig = (tab) => {
    const configs = {
      ai: {
        name: "AI講評",
        activeColor: "bg-purple-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-700",
        iconColor: "text-purple-500",
        icon: "🤖",
      },
      teacher: {
        name: "老師講評",
        activeColor: "bg-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-700",
        iconColor: "text-blue-500",
        icon: "👨‍🏫",
      },
      student: {
        name: "學生講評",
        activeColor: "bg-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-700",
        iconColor: "text-green-500",
        icon: "👥",
      },
    };
    return configs[tab];
  };

  const currentTabConfig = getTabConfig(activeTab);

  // 獲取分類按鈕配色
  const getCategoryConfig = (category) => {
    if (category === "pros") {
      return {
        name: "優點",
        activeColor: "bg-emerald-500",
        hoverColor: "hover:bg-emerald-100",
        icon: "👍",
        emoji: "😊",
      };
    } else {
      return {
        name: "缺點",
        activeColor: "bg-orange-500",
        hoverColor: "hover:bg-orange-100",
        icon: "👎",
        emoji: "🤔",
      };
    }
  };

  // 獲取範圍按鈕配色
  const getScopeConfig = (scope) => {
    if (scope === "individual") {
      return {
        name: "個人",
        activeColor: "bg-cyan-500",
        hoverColor: "hover:bg-cyan-100",
        icon: "👤",
      };
    } else {
      return {
        name: "小組",
        activeColor: "bg-indigo-500",
        hoverColor: "hover:bg-indigo-100",
        icon: "👥",
      };
    }
  };

  // 防止 weekData 為空的情況
  if (!weekData || !classData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📝 講評區</h3>
        <div className="text-center py-8">
          <div className="text-gray-500">載入中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* 🆕 家長模式提示 */}
      {isParentMode && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-orange-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-orange-700">
              <strong>家長查看模式：</strong>您可以查看孩子的
              AI分析、老師講評和學生自評內容
            </p>
          </div>
        </div>
      )}

      {/* 標題 */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        📝 講評區
        {isParentMode && (
          <span className="text-sm font-normal text-orange-600 ml-2">
            (家長查看模式)
          </span>
        )}
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

      {/* 主要標籤 - AI/老師/學生 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {["ai", "teacher", "student"].map((tab) => {
          const config = getTabConfig(tab);
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                // 重置選擇狀態
                setSelectedCategory("pros");
                setSelectedScope("individual");
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === tab
                  ? `${config.activeColor} text-white shadow-md transform scale-105`
                  : "text-gray-600 hover:bg-white hover:shadow-sm"
              }`}
            >
              <span className="text-lg">{config.icon}</span>
              <span>{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* 內容區域 */}
      <div
        className={`${currentTabConfig.bgColor} ${currentTabConfig.borderColor} border rounded-xl p-6`}
      >
        {/* 分類選擇 - 優點/缺點 */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-gray-600">
              📋 講評類型：
            </span>
          </div>
          <div className="flex space-x-2">
            {["pros", "cons"].map((category) => {
              const config = getCategoryConfig(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedCategory === category
                      ? `${config.activeColor} text-white shadow-md`
                      : `bg-white ${config.hoverColor} text-gray-700 border hover:shadow-sm`
                  }`}
                >
                  <span>{config.icon}</span>
                  <span>{config.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 範圍選擇 - 個人/小組 */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-gray-600">
              🎯 評價範圍：
            </span>
          </div>
          <div className="flex space-x-2">
            {["individual", "group"].map((scope) => {
              const config = getScopeConfig(scope);
              return (
                <button
                  key={scope}
                  onClick={() => setSelectedScope(scope)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedScope === scope
                      ? `${config.activeColor} text-white shadow-md`
                      : `bg-white ${config.hoverColor} text-gray-700 border hover:shadow-sm`
                  }`}
                >
                  <span>{config.icon}</span>
                  <span>{config.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 講評內容顯示區 */}
        <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300 min-h-[120px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3">
              {getCategoryConfig(selectedCategory).emoji}
            </div>
            <div className="text-lg font-medium text-gray-700 mb-2">
              {currentTabConfig.name} -{" "}
              {getCategoryConfig(selectedCategory).name} -{" "}
              {getScopeConfig(selectedScope).name}
            </div>
            <div className="text-sm text-gray-500">
              {activeTab === "ai" && "AI 分析結果將顯示在這裡"}
              {activeTab === "teacher" &&
                userRole === "teacher" &&
                "您可以在此區域給予學生專業的指導建議"}
              {activeTab === "teacher" &&
                userRole === "student" &&
                "老師講評內容將顯示在這裡"}
              {activeTab === "student" &&
                userRole === "teacher" &&
                "學生的自評和互評內容將顯示在這裡"}
              {activeTab === "student" &&
                userRole === "student" &&
                "學生自評或互評內容將顯示在這裡"}
            </div>

            {/* 🆕 功能按鈕區 - 根據角色顯示不同按鈕 */}
            {!isParentMode && (
              <div className="mt-4 flex items-center justify-center space-x-3">
                {activeTab === "ai" && (
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                    <span>🔄</span>
                    <span>重新分析</span>
                  </button>
                )}

                {activeTab === "teacher" && (
                  <>
                    {userRole === "teacher" ? (
                      // 老師專用按鈕
                      <>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>✏️</span>
                          <span>給予評論</span>
                        </button>
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>📊</span>
                          <span>評分管理</span>
                        </button>
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>📋</span>
                          <span>編輯講評</span>
                        </button>
                      </>
                    ) : (
                      // 學生查看老師講評的按鈕
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                        <span>📝</span>
                        <span>檢視詳細</span>
                      </button>
                    )}
                  </>
                )}

                {activeTab === "student" && (
                  <>
                    {userRole === "teacher" ? (
                      // 老師查看學生講評的按鈕
                      <>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>👀</span>
                          <span>查看全部自評</span>
                        </button>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>📈</span>
                          <span>自評統計</span>
                        </button>
                        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>💬</span>
                          <span>回應學生</span>
                        </button>
                      </>
                    ) : (
                      // 學生專用按鈕
                      <>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>✍️</span>
                          <span>新增自評</span>
                        </button>
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                          <span>🤝</span>
                          <span>同儕互評</span>
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* 🆕 家長模式的只讀提示 */}
            {isParentMode && (
              <div className="mt-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>家長查看模式：此為只讀檢視，無法進行編輯操作</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部統計資訊 */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>
              📊 當前選擇：{currentTabConfig.name} {"->"}{" "}
              {getCategoryConfig(selectedCategory).name} {"->"}{" "}
              {getScopeConfig(selectedScope).name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⏰ 最後更新：剛剛</span>
            {isParentMode && (
              <span className="text-orange-500">👁️ 只讀模式</span>
            )}
          </div>
        </div>
      </div>

      {/* 快速導航提示 */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>💡</span>
            <span>
              {isParentMode
                ? "提示：點擊不同標籤可查看多角度講評（只讀模式）"
                : "提示：點擊不同標籤可查看多角度講評"}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>AI講評</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>老師講評</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>學生講評</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
