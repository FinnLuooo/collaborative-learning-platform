"use client";
import { useState, useEffect } from "react";
import FeedbackSection from "./FeedbackSection";
import EyeTrackingAssessment from "./EyeTrackingAssessment";

export default function ProtectedFeedbackSection({
  weekData,
  classData,
  userRole = "student",
}) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [hasPassedAssessment, setHasPassedAssessment] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);

  // 生成唯一的儲存鍵值（基於用戶角色、班級、小組、週次等）
  const getStorageKey = () => {
    const baseKey = `eyeTracking_assessment_${userRole}_${classData?.id}_${weekData?.id}`;

    // 如果是動態任務，加上步驟ID
    if (weekData?.isDynamicTask && weekData?.currentStep) {
      return `${baseKey}_step_${weekData.currentStep}`;
    }

    // 如果是多題模式，加上題目ID
    if (weekData?.isMultiQuestion && weekData?.currentQuestion) {
      return `${baseKey}_question_${weekData.currentQuestion}`;
    }

    return baseKey;
  };

  // 檢查用戶是否已通過評量
  useEffect(() => {
    setIsCheckingPermission(true);

    try {
      const storageKey = getStorageKey();
      const savedStatus = localStorage.getItem(storageKey);

      if (savedStatus) {
        const assessmentData = JSON.parse(savedStatus);
        // 檢查是否在24小時內通過評量（可選的時效性檢查）
        const passedTime = new Date(assessmentData.passedAt);
        const now = new Date();
        const hoursDiff = (now - passedTime) / (1000 * 60 * 60);

        // 如果在24小時內通過評量，則認為有效
        if (assessmentData.passed && hoursDiff < 24) {
          setHasPassedAssessment(true);
        } else {
          // 超過時效，清除舊記錄
          localStorage.removeItem(storageKey);
          setHasPassedAssessment(false);
        }
      } else {
        setHasPassedAssessment(false);
      }
    } catch (error) {
      console.error("檢查評量狀態時發生錯誤:", error);
      setHasPassedAssessment(false);
    }

    setIsCheckingPermission(false);
  }, [weekData, classData, userRole]);

  // 處理評量完成
  const handleAssessmentComplete = (passed) => {
    if (passed) {
      const storageKey = getStorageKey();
      const assessmentData = {
        passed: true,
        passedAt: new Date().toISOString(),
        userRole,
        classId: classData?.id,
        weekId: weekData?.id,
        stepId: weekData?.currentStep,
        questionId: weekData?.currentQuestion,
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify(assessmentData));
        setHasPassedAssessment(true);
      } catch (error) {
        console.error("儲存評量狀態時發生錯誤:", error);
      }
    }
  };

  // 開始評量
  const handleStartAssessment = () => {
    setIsAssessmentOpen(true);
  };

  // 如果正在檢查權限，顯示載入狀態
  if (isCheckingPermission) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
          <span className="text-gray-600">檢查查看權限中...</span>
        </div>
      </div>
    );
  }

  // 如果已通過評量，直接顯示講評區
  if (hasPassedAssessment) {
    return (
      <div className="relative">
        {/* 通過評量的標記 */}
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>已通過評量</span>
          </div>
        </div>

        <FeedbackSection
          weekData={weekData}
          classData={classData}
          userRole={userRole}
        />
      </div>
    );
  }

  // 如果未通過評量，顯示模糊遮罩的講評區
  return (
    <div className="relative">
      {/* 模糊的講評區背景 */}
      <div className="filter blur-sm pointer-events-none select-none">
        <FeedbackSection
          weekData={weekData}
          classData={classData}
          userRole={userRole}
        />
      </div>

      {/* 遮罩層和評量提示 */}
      <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
        <div className="text-center max-w-md mx-auto p-8">
          {/* 鎖定圖標 */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* 標題和說明 */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🔒 講評區已鎖定
          </h3>

          <div className="text-gray-600 mb-6 space-y-3">
            <p className="text-lg">
              需要完成
              <strong className="text-blue-600">
                眼動資料視覺化理解能力評量
              </strong>
              才能查看講評內容
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <p className="font-semibold text-blue-800 mb-1">評量要求：</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• 共6個評量面向，每個面向有4個等級</li>
                    <li>
                      • 需要在<strong>所有面向都達到等級3</strong>才能通過
                    </li>
                    <li>• 未通過評量需要專員協助指導</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 開始評量按鈕 */}
          <button
            onClick={handleStartAssessment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
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
            <span>開始進行評量</span>
          </button>

          {/* 額外說明 */}
          <div className="mt-6 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p>
              💡 <strong>提示：</strong>評量通過後24小時內無需重複評量。
              此評量旨在確保您具備理解眼動視覺化資料的基礎能力。
            </p>
          </div>

          {/* 聯繫專員按鈕 */}
          <div className="mt-4">
            <button className="text-sm text-gray-500 hover:text-gray-700 underline flex items-center space-x-1 mx-auto">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>需要協助？聯繫專員</span>
            </button>
          </div>
        </div>
      </div>

      {/* 評量彈窗 */}
      <EyeTrackingAssessment
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onComplete={handleAssessmentComplete}
        userRole={userRole}
      />
    </div>
  );
}
