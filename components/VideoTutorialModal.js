"use client";

import { useState, useEffect } from "react";

const VideoTutorialModal = ({ userRole, isOpen, onComplete, onClose }) => {
  const [isWatching, setIsWatching] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const startWatching = () => {
    setIsWatching(true);

    // 模擬影片播放進度
    const interval = setInterval(() => {
      setWatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        return prev + 10; // 每次增加10%
      });
    }, 500); // 每0.5秒更新一次，總共5秒完成
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const roleConfig = {
    student: {
      title: "學習影片教學",
      subtitle: "讓我們一起學習如何看懂圖表！",
      color: "blue",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      headerColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    teacher: {
      title: "專業影片教學",
      subtitle: "提升您的圖表解讀專業能力",
      color: "green",
      bgColor: "bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      headerColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    parent: {
      title: "家長影片教學",
      subtitle: "了解如何運用圖表資訊協助孩子",
      color: "purple",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      headerColor: "bg-gradient-to-r from-purple-500 to-violet-600",
    },
  };

  const config = roleConfig[userRole] || roleConfig.student;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 頭部區域 */}
        <div className={`${config.headerColor} text-white p-6 rounded-t-2xl`}>
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M18 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
          {/* 重要提示 */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0"
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
                <h4 className="font-semibold text-orange-800 mb-1">
                  📚 需要觀看教學影片
                </h4>
                <p className="text-sm text-orange-700">
                  評估結果顯示您需要先觀看圖表解讀教學影片，增強基礎能力後再使用平台功能。
                </p>
              </div>
            </div>
          </div>

          {/* 影片說明 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📽️ 眼動視覺化圖表解讀教學
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-3">
                <strong>影片內容包括：</strong>
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
                  <span>熱區圖（Heatmap）的基本概念和解讀方法</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
                  <span>注意力軌跡圖（Gaze Plot）的意義和分析技巧</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
                  <span>如何運用視覺化資料改善學習效果</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
                  <span>實際案例分析和應用示範</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 影片播放區域 */}
          <div className="mb-6">
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
              {!isWatching ? (
                // 影片封面
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4 inline-block">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M18 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">
                    眼動視覺化圖表解讀教學
                  </h4>
                  <p className="text-white text-opacity-80 text-sm">
                    影片時長：約 5 分鐘
                  </p>
                </div>
              ) : (
                // 播放中畫面
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-white text-center mb-6">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mb-4 inline-block animate-pulse">
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
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">正在播放教學影片...</p>
                    <p className="text-sm text-white text-opacity-80">
                      請專心觀看以獲得最佳學習效果
                    </p>
                  </div>

                  {/* 進度條 */}
                  <div className="w-4/5 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${watchProgress}%` }}
                    />
                  </div>
                  <p className="text-white text-sm mt-2">
                    {watchProgress}% 完成
                  </p>
                </div>
              )}

              {/* 播放按鈕 */}
              {!isWatching && (
                <button
                  onClick={startWatching}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="bg-white bg-opacity-80 group-hover:bg-opacity-100 rounded-full p-4 transition-all">
                    <svg
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* 行動按鈕 */}
          <div className="text-center">
            {!isWatching && (
              <button
                onClick={startWatching}
                className={`${config.buttonColor} text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-lg hover:shadow-xl`}
              >
                🎬 開始觀看影片
              </button>
            )}

            {isWatching && !isCompleted && (
              <div className="text-gray-600">
                <p className="mb-2">⏳ 影片播放中，請耐心等待...</p>
                <p className="text-sm">影片結束後即可進入班級頁面</p>
              </div>
            )}

            {isCompleted && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 text-green-600 mr-2"
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
                    <span className="text-green-800 font-medium">
                      🎉 影片觀看完成！
                    </span>
                  </div>
                  <p className="text-green-700 text-sm text-center">
                    您已完成基礎圖表解讀教學，現在可以開始使用平台功能了。
                  </p>
                </div>

                <button
                  onClick={handleComplete}
                  className={`${config.buttonColor} text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-lg hover:shadow-xl`}
                >
                  ✅ 完成學習，進入班級頁面
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTutorialModal;
