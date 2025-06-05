"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import AssessmentModal from "@/components/AssessmentModal";
import VideoTutorialModal from "@/components/VideoTutorialModal";
import Link from "next/link";

// 🆕 主要內容組件
function TeacherPageContent() {
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
        const completedFlow = sessionStorage.getItem("teacher_completed_flow");

        console.log(
          "Teacher page - showVideo:",
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
    console.log("Assessment modal close attempt blocked");
  };

  const handleVideoComplete = () => {
    setShowVideoModal(false);
    // 🔧 完成評估後設定完成狀態，下次非從首頁進入就不會再彈窗
    sessionStorage.setItem("teacher_completed_flow", "true");
    router.push("/teacher");
  };

  const handleVideoClose = () => {
    setShowVideoModal(false);
    if (searchParams.get("showVideo") === "true") {
      router.push("/teacher");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AssessmentModal
        userRole="teacher"
        isOpen={showAssessmentModal}
        onClose={handleCloseModal}
      />

      <VideoTutorialModal
        userRole="teacher"
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
              href="/assessment-tool?role=teacher"
              className="inline-flex items-center space-x-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M9 5H7a2 2 0 00-2 2v1M9 5a2 2 0 012 2v1M9 5V3a2 2 0 012-2h1m0 0h1a2 2 0 012 2v1M13 7a2 2 0 012 2v1m-4 0V9a2 2 0 00-2-2H7m0 0v2a2 2 0 002 2h1m0-4a2 2 0 012 2v1m-2-1h2m-2 0h-2"
                />
              </svg>
              <span>專業能力評估</span>
            </Link>
          </div>

          <p className="mt-4 text-gray-600 text-sm">
            📋
            透過「專業能力評估」了解您對眼動視覺化的掌握程度，制定更有效的教學策略
            <br />
            <span className="text-green-600 font-medium">
              📚 想了解平台背景？請點擊導航欄上的「了解平台背景」
            </span>
          </p>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 mb-6">管理您的班級</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classData={classItem}
              role="teacher"
            />
          ))}
        </div>
      </main>
    </>
  );
}

// 🆕 載入組件
function TeacherPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">載入中...</p>
      </div>
    </div>
  );
}

// 🆕 主頁面組件
export default function TeacherPage() {
  return (
    <div>
      <Header userRole="teacher" />
      <Suspense fallback={<TeacherPageLoading />}>
        <TeacherPageContent />
      </Suspense>
    </div>
  );
}
