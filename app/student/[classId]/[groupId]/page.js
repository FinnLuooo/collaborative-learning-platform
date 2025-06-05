"use client";
import { useState, useEffect } from "react";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import WeeklyTabs from "@/components/WeeklyTabs";
import StepNavigation from "@/components/StepNavigation";
import QuestionNavigation from "@/components/QuestionNavigation";
import HeatmapViewer from "@/components/HeatmapViewer";
import FeedbackSection from "@/components/FeedbackSection"; // 🆕 新的講評區組件

export default function StudentGroupPage({ params }) {
  const [classId, setClassId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [selectedWeekData, setSelectedWeekData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // 處理 params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setClassId(resolvedParams.classId);
      setGroupId(resolvedParams.groupId);
    };
    resolveParams();
  }, [params]);

  const classData = classId
    ? mockData.classes.find((c) => c.id === classId)
    : null;
  const groupData = classData?.groups.find((g) => g.id === groupId);

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

  if (!classData || !groupData) {
    return <div className="container mx-auto px-4 py-8">載入中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {classData.name} - {groupData.name}
        </h1>
        <p className="text-gray-600 mb-6">
          組員: {groupData.students.join("、")}
        </p>

        {groupData.weeks.length > 0 && selectedWeekData && (
          <>
            <WeeklyTabs
              weeks={groupData.weeks}
              selectedWeekId={selectedWeekId}
              onSelectWeek={handleSelectWeek}
            />

            {/* 動態任務步驟導航 */}
            {selectedWeekData.isDynamicTask &&
              classData?.taskType === "dynamic" && (
                <StepNavigation
                  steps={selectedWeekData.steps}
                  currentStep={currentStep}
                  onStepChange={handleStepChange}
                />
              )}

            {/* 多題模式題目導航 */}
            {selectedWeekData.isMultiQuestion &&
              classData?.taskType === "static" && (
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
              userRole="student"
            />

            {/* 🆕 新的整合式講評區 - 替換原本的 AIFeedback 和 CommentSection */}
            <FeedbackSection
              weekData={{
                ...selectedWeekData,
                currentStep: currentStep,
                currentQuestion: currentQuestion,
              }}
              classData={classData}
            />
          </>
        )}
      </main>
    </div>
  );
}
