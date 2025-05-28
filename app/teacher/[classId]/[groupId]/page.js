"use client";
import { useState, useEffect } from "react";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import WeeklyTabs from "@/components/WeeklyTabs";
import StepNavigation from "@/components/StepNavigation";
import QuestionNavigation from "@/components/QuestionNavigation";
import HeatmapViewer from "@/components/HeatmapViewer";
import AIFeedback from "@/components/AIFeedback";
import CommentSection from "@/components/CommentSection";

export default function TeacherGroupPage({ params }) {
  const { classId, groupId } = params;
  const classData = mockData.classes.find((c) => c.id === classId);
  const groupData = classData?.groups.find((g) => g.id === groupId);

  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [selectedWeekData, setSelectedWeekData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState("");
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    if (groupData && groupData.weeks.length > 0) {
      const firstWeek = groupData.weeks[0];
      setSelectedWeekId(firstWeek.id);
      setSelectedWeekData(firstWeek);

      // 如果是動態任務，設置當前步驟
      if (firstWeek.isDynamicTask) {
        setCurrentStep(firstWeek.currentStep || 1);
      }

      // 如果是多題模式，設置當前題目
      if (firstWeek.isMultiQuestion) {
        setCurrentQuestion(firstWeek.currentQuestion || 1);
      }
    }
  }, [groupData]);

  const handleSelectWeek = (weekId) => {
    const weekData = groupData.weeks.find((w) => w.id === weekId);
    setSelectedWeekId(weekId);
    setSelectedWeekData(weekData);

    // 重置步驟或題目
    if (weekData.isDynamicTask) {
      setCurrentStep(weekData.currentStep || 1);
    } else if (weekData.isMultiQuestion) {
      setCurrentQuestion(weekData.currentQuestion || 1);
    }
  };

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
    // 這裡可以添加更新後端數據的邏輯
  };

  const handleQuestionChange = (questionId) => {
    setCurrentQuestion(questionId);
    // 這裡可以添加更新後端數據的邏輯
  };

  // 模擬匯出功能
  const handleExport = (type) => {
    setExportType(type);
    setExportLoading(true);
    setShowExportModal(true);

    // 模擬匯出延遲
    setTimeout(() => {
      setExportLoading(false);
    }, 1500);
  };

  // 關閉匯出成功模態框
  const closeExportModal = () => {
    setShowExportModal(false);
    setExportType("");
  };

  if (!classData || !groupData) {
    return <div>小組不存在</div>;
  }

  // 檢查任務類型
  const isDynamicTask =
    selectedWeekData?.isDynamicTask && classData?.taskType === "dynamic";
  const isMultiQuestion =
    selectedWeekData?.isMultiQuestion && classData?.taskType === "static";

  // 獲取當前的留言
  const getCurrentComments = () => {
    if (isDynamicTask) {
      const currentStepData = selectedWeekData.steps?.find(
        (step) => step.id === currentStep
      );
      return currentStepData?.comments || [];
    } else if (isMultiQuestion) {
      const currentQuestionData = selectedWeekData.questions?.find(
        (question) => question.id === currentQuestion
      );
      return currentQuestionData?.comments || [];
    }
    return selectedWeekData?.comments || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="teacher" />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 mb-2">
              {classData.name} - {groupData.name}
            </h1>
            <p className="text-gray-600">
              組員: {groupData.students.join("、")}
            </p>
            {/* 任務類型標籤 */}
            {classData.taskType && (
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    classData.taskType === "static"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {classData.taskLabel}
                  {isDynamicTask && (
                    <span className="ml-2 text-xs">
                      (Step {currentStep}/{selectedWeekData.totalSteps})
                    </span>
                  )}
                  {isMultiQuestion && (
                    <span className="ml-2 text-xs">
                      (第{currentQuestion}題/共{selectedWeekData.totalQuestions}
                      題)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* 匯出按鈕區 */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => handleExport("trace")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              匯出注意力軌跡圖
            </button>
            <button
              onClick={() => handleExport("heatmap")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              匯出熱區圖
            </button>
            <button
              onClick={() => handleExport("analysis")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              匯出AI分析表格
            </button>
          </div>
        </div>

        {groupData.weeks.length > 0 && selectedWeekData && (
          <>
            <WeeklyTabs
              weeks={groupData.weeks}
              selectedWeekId={selectedWeekId}
              onSelectWeek={handleSelectWeek}
            />

            {/* 動態任務步驟導航 */}
            {isDynamicTask && (
              <StepNavigation
                steps={selectedWeekData.steps}
                currentStep={currentStep}
                onStepChange={handleStepChange}
              />
            )}

            {/* 多題模式題目導航 */}
            {isMultiQuestion && (
              <QuestionNavigation
                questions={selectedWeekData.questions}
                currentQuestion={currentQuestion}
                onQuestionChange={handleQuestionChange}
              />
            )}

            <HeatmapViewer
              weekData={{
                ...selectedWeekData,
                currentStep: currentStep,
                currentQuestion: currentQuestion,
              }}
              classData={classData}
              userRole="teacher"
            />
            <AIFeedback
              weekData={{
                ...selectedWeekData,
                currentStep: currentStep,
                currentQuestion: currentQuestion,
              }}
              classData={classData}
            />
            <CommentSection
              comments={getCurrentComments()}
              stepId={
                isDynamicTask
                  ? currentStep
                  : isMultiQuestion
                  ? currentQuestion
                  : undefined
              }
            />
          </>
        )}

        {/* 匯出成功模態框 */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="text-center">
                {exportLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      正在匯出中...
                    </h3>
                    <p className="text-gray-500">請稍候，正在處理您的請求</p>
                  </>
                ) : (
                  <>
                    <div className="bg-green-100 rounded-full p-2 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="h-10 w-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      匯出成功！
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {exportType === "trace" && "注意力軌跡圖已匯出"}
                      {exportType === "heatmap" && "熱區圖已匯出"}
                      {exportType === "analysis" && "AI分析表格已匯出"}
                    </p>
                    <button
                      onClick={closeExportModal}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                      關閉
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
