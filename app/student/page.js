"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import AssessmentModal from "@/components/AssessmentModal";
import VideoTutorialModal from "@/components/VideoTutorialModal";
import Link from "next/link";

export default function StudentPage() {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const classes = mockData.classes;
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkFlow = () => {
      try {
        const showVideo = searchParams.get("showVideo");
        const completedFlow = sessionStorage.getItem("student_completed_flow");

        console.log(
          "Student page - showVideo:",
          showVideo,
          "completedFlow:",
          completedFlow
        );

        if (showVideo === "true") {
          setShowVideoModal(true);
          setShowAssessmentModal(false);
        } else if (!completedFlow) {
          // 🔧 只有未完成評估時才顯示評估彈窗
          setShowAssessmentModal(true);
          setShowVideoModal(false);
        } else {
          // 已完成評估，不顯示任何彈窗
          setShowAssessmentModal(false);
          setShowVideoModal(false);
        }
      } catch (error) {
        console.error("Error checking flow:", error);
        setShowAssessmentModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkFlow();
  }, [searchParams]);

  const handleCloseModal = () => {
    // 強制評估，不允許關閉
    console.log("Assessment modal close attempt blocked");
  };

  const handleVideoComplete = () => {
    setShowVideoModal(false);
    // 🔧 完成評估後設定完成狀態，下次非從首頁進入就不會再彈窗
    sessionStorage.setItem("student_completed_flow", "true");
    router.push("/student");
  };

  const handleVideoClose = () => {
    setShowVideoModal(false);
    if (searchParams.get("showVideo") === "true") {
      router.push("/student");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header userRole="student" />

      <AssessmentModal
        userRole="student"
        isOpen={showAssessmentModal}
        onClose={handleCloseModal}
      />

      <VideoTutorialModal
        userRole="student"
        isOpen={showVideoModal}
        onComplete={handleVideoComplete}
        onClose={handleVideoClose}
      />

      <main className="container mx-auto px-4 py-8">
        {showAssessmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
        )}

        <div className="mb-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/assessment-tool?role=student"
              className="inline-flex items-center space-x-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
              <span>能力評估工具</span>
            </Link>
          </div>

          <p className="mt-4 text-gray-600 text-sm">
            💡
            建議先完成「能力評估工具」，了解自己的學習準備度，再開始使用平台學習
            <br />
            <span className="text-blue-600 font-medium">
              📚 想了解平台背景？請點擊導航欄上的「了解平台背景」
            </span>
          </p>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 mb-6">選擇您的班級</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classData={classItem}
              role="student"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
