"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const AssessmentModal = ({ userRole, isOpen, onClose }) => {
  // 🔧 修正：確保彈窗在應該顯示時不會被意外關閉
  if (!isOpen) return null;

  // 🔧 修正：禁用ESC鍵和背景點擊關閉
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // 禁用背景滾動
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 根據角色設定不同的內容和顏色
  const roleConfig = {
    student: {
      title: "歡迎使用學習平台！",
      subtitle: "開始學習前，讓我們先了解您的學習準備度",
      description: "完成能力評估可以幫助您：",
      benefits: [
        "了解自己對圖表理解的程度",
        "找到適合的學習方式",
        "提升學習效果",
        "更好地使用平台功能",
      ],
      buttonText: "立即進行能力評估",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      headerColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      iconColor: "text-blue-600",
      assessmentUrl: "/assessment-tool?role=student",
    },
    teacher: {
      title: "歡迎使用教學管理平台！",
      subtitle: "開始教學前，讓我們先評估您的專業準備度",
      description: "完成專業能力評估可以幫助您：",
      benefits: [
        "了解對眼動視覺化技術的掌握程度",
        "制定更有效的教學策略",
        "善用平台功能進行教學",
        "提升學生學習成效",
      ],
      buttonText: "立即進行專業評估",
      buttonColor: "bg-green-600 hover:bg-green-700",
      headerColor: "bg-gradient-to-r from-green-500 to-emerald-600",
      iconColor: "text-green-600",
      assessmentUrl: "/assessment-tool?role=teacher",
    },
    parent: {
      title: "歡迎使用家長查看平台！",
      subtitle: "開始查看前，讓我們先了解您的能力準備度",
      description: "完成自我能力評估可以幫助您：",
      benefits: [
        "了解自己對眼動追蹤技術的理解程度",
        "提升眼動視覺化圖表的解讀能力",
        "學會與老師進行有效的溝通協作",
        "更好地支持孩子的學習成長",
      ],
      buttonText: "立即進行自我評估",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      headerColor: "bg-gradient-to-r from-purple-500 to-violet-600",
      iconColor: "text-purple-600",
      assessmentUrl: "/assessment-tool?role=parent",
    },
  };

  const config = roleConfig[userRole] || roleConfig.student;

  // 🔧 修正：防止背景點擊關閉
  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick}
      >
        {/* 頭部區域 - 🔧 移除關閉按鈕 */}
        <div
          className={`${config.headerColor} text-white p-6 rounded-t-2xl relative`}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            {config.title}
          </h2>
          <p className="text-center text-white text-opacity-90">
            {config.subtitle}
          </p>
        </div>

        {/* 內容區域 */}
        <div className="p-6">
          {/* 重要提示 - 🔧 加強強制性說明 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-red-800 mb-1">
                  🚫 必須完成能力評估
                </h4>
                <p className="text-sm text-red-700 mb-2">
                  為了提供您最佳的使用體驗，必須先完成能力評估才能使用平台功能。
                </p>
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ 此彈窗無法關閉，請點擊下方按鈕開始評估
                </p>
              </div>
            </div>
          </div>

          {/* 評估說明 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {config.description}
            </h3>
            <ul className="space-y-2">
              {config.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className={`w-5 h-5 ${config.iconColor} mt-0.5 mr-3 flex-shrink-0`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 評估時間說明 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">預估時間：</span>約 5-10 分鐘
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  評估結果將幫助系統為您提供個人化的學習建議
                </p>
              </div>
            </div>
          </div>

          {/* 行動按鈕 - 🔧 加強視覺效果 */}
          <div className="space-y-3">
            <Link
              href={config.assessmentUrl}
              className={`${config.buttonColor} text-white px-6 py-4 rounded-lg font-medium text-center block transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg`}
            >
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {config.buttonText}
              </div>
            </Link>
          </div>

          {/* 底部說明 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 評估完成後即可開始使用平台，您也可以隨時重新進行評估
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
