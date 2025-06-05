"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import AssessmentModal from "@/components/AssessmentModal";
import VideoTutorialModal from "@/components/VideoTutorialModal";
import Link from "next/link";

// 🆕 主要內容組件 - 處理所有需要 useSearchParams 的邏輯
function ParentPageContent() {
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
        const completedFlow = sessionStorage.getItem("parent_completed_flow");

        console.log(
          "Parent page - showVideo:",
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
          // 已完成評估，直接導向小孩組別
          router.push("/parent/classA/group1");
          return;
        }
      } catch (error) {
        console.error("Error checking flow:", error);
        setShowAssessmentModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkFlow();
  }, [searchParams, router]);

  const handleCloseModal = () => {
    console.log("Assessment modal close attempt blocked");
  };

  const handleVideoComplete = () => {
    setShowVideoModal(false);
    // 🔧 完成評估後設定完成狀態，下次非從首頁進入就不會再彈窗
    sessionStorage.setItem("parent_completed_flow", "true");
    router.push("/parent/classA/group1");
  };

  const handleVideoClose = () => {
    setShowVideoModal(false);
    if (searchParams.get("showVideo") === "true") {
      router.push("/parent");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AssessmentModal
        userRole="parent"
        isOpen={showAssessmentModal}
        onClose={handleCloseModal}
      />

      <VideoTutorialModal
        userRole="parent"
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
              href="/platform-background?role=parent"
              className="inline-flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>了解平台背景</span>
            </Link>

            <Link
              href="/assessment-tool?role=parent"
              className="inline-flex items-center space-x-2 bg-violet-100 hover:bg-violet-200 text-violet-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>家長自我評估</span>
            </Link>
          </div>

          <p className="mt-4 text-gray-600 text-sm">
            👨‍👩‍👧‍👦
            透過「家長自我評估」了解您對眼動技術的理解程度，更好地協助孩子學習
          </p>
        </div>

        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
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
            </div>
            <h2 className="text-xl font-bold text-yellow-800 mb-2">
              請先完成能力評估
            </h2>
            <p className="text-yellow-700 mb-4">
              為了提供您最佳的使用體驗，請先完成家長自我評估。
              <br />
              評估完成後，您將直接進入小明、小美的學習小組。
            </p>
            <Link
              href="/assessment-tool?role=parent"
              className="inline-flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
            >
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
              立即開始評估
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

// 🆕 載入組件
function ParentPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">載入中...</p>
      </div>
    </div>
  );
}

// 🆕 主頁面組件 - 使用 Suspense 包裝
export default function ParentPage() {
  return (
    <div>
      <Header userRole="parent" />
      <Suspense fallback={<ParentPageLoading />}>
        <ParentPageContent />
      </Suspense>
    </div>
  );
}
