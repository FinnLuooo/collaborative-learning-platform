"use client";
import { useState, useEffect, use } from "react";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import WeeklyTabs from "@/components/WeeklyTabs";
import StepNavigation from "@/components/StepNavigation";
import QuestionNavigation from "@/components/QuestionNavigation";
import HeatmapViewer from "@/components/HeatmapViewer";
import AIFeedback from "@/components/AIFeedback";
import CommentSection from "@/components/CommentSection";

export default function ParentGroupPage({ params }) {
  // 使用 use() 解包 params
  const unwrappedParams = use(params);
  const { classId, groupId } = unwrappedParams;

  const classData = mockData.classes.find((c) => c.id === classId);
  const groupData = classData?.groups.find((g) => g.id === groupId);

  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [selectedWeekData, setSelectedWeekData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

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
  };

  const handleQuestionChange = (questionId) => {
    setCurrentQuestion(questionId);
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
    <div>
      <Header userRole="parent" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {classData.name} - {groupData.name}
        </h1>
        <p className="text-gray-600 mb-2">
          組員: {groupData.students.join("、")}
        </p>

        {/* 任務類型標籤 */}
        {classData.taskType && (
          <div className="mb-6">
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
                  (第{currentQuestion}題/共{selectedWeekData.totalQuestions}題)
                </span>
              )}
            </span>
          </div>
        )}

        {groupData.weeks.length > 0 && selectedWeekData && (
          <>
            <WeeklyTabs
              weeks={groupData.weeks}
              onSelectWeek={handleSelectWeek}
            />

            {/* 動態任務步驟導航 - 家長只能查看，不能切換到未完成的步驟 */}
            {isDynamicTask && (
              <div className="mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1-1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-yellow-700">
                      家長查看模式：您可以查看孩子已完成的學習步驟
                    </p>
                  </div>
                </div>
                <StepNavigation
                  steps={selectedWeekData.steps}
                  currentStep={currentStep}
                  onStepChange={handleStepChange}
                />
              </div>
            )}

            {/* 多題模式題目導航 - 家長可以查看所有題目 */}
            {isMultiQuestion && (
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-blue-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-blue-700">
                      家長查看模式：您可以查看孩子各題目的學習狀況和協作表現
                    </p>
                  </div>
                </div>
                <QuestionNavigation
                  questions={selectedWeekData.questions}
                  currentQuestion={currentQuestion}
                  onQuestionChange={handleQuestionChange}
                />
              </div>
            )}

            <HeatmapViewer
              weekData={{
                ...selectedWeekData,
                currentStep: currentStep,
                currentQuestion: currentQuestion,
              }}
              classData={classData}
              userRole="parent"
            />
            <AIFeedback
              weekData={{
                ...selectedWeekData,
                currentStep: currentStep,
                currentQuestion: currentQuestion,
              }}
              classData={classData}
              isParent={true}
            />
            <CommentSection
              comments={getCurrentComments()}
              isReadOnly={true}
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
      </main>
    </div>
  );
}
