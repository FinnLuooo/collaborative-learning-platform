"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";

// 內容數據配置
const contentData = {
  teacher: {
    title: "平台背景 - 老師",
    sections: [
      {
        image: "https://images.plurk.com/hP89uOT3b5dtYdGQEKkbD.jpg",
        content:
          "在教室裡，老師難以同時掌握每一組學生的學習情況。當老師指導其中一組時，其他學生常會分心、說話甚至搗蛋。我們打造這個平台，搭配視覺追蹤眼鏡，讓學生在協作時更能專注學習，也讓老師和家長透過熱區圖與軌跡圖，更直觀了解每位孩子的上課專注度與互動情況，提升整體學習成效。",
      },
      {
        image: "https://images.plurk.com/vWq5869wec6SHt2gi0Jrb.jpg",
        content:
          "學生戴上視覺追蹤眼鏡，透過網站進行靜態與動態題目操作，系統即時記錄學生的視線路徑與停留位置，產出視覺熱區圖與注意力軌跡圖。這些資料能清楚呈現學生在協作過程中的互動方式、理解卡關點與注意力分布，協助教師調整教學，也幫助學生進行自我檢視。",
      },
      {
        image: "https://images.plurk.com/2mAbIsuaSZCS5e614onkv7.jpg",
        content:
          "透過視覺追蹤數據與 AI 分析，老師能快速發現學生學習上的盲點，比起傳統評量更具即時性與細緻度。也能觀察學生協作互動的方式，進一步給予具體輔導與引導策略。",
      },
    ],
  },
  student: {
    title: "平台背景 - 學生",
    sections: [
      {
        image: "https://images.plurk.com/hP89uOT3b5dtYdGQEKkbD.jpg",
        content:
          "在教室裡，老師難以同時掌握每一組學生的學習情況。當老師指導其中一組時，其他學生常會分心、說話甚至搗蛋。我們打造這個平台，搭配視覺追蹤眼鏡，讓學生在協作時更能專注學習，也讓老師和家長透過熱區圖與軌跡圖，更直觀了解每位孩子的上課專注度與互動情況，提升整體學習成效。",
      },
      {
        image: "https://images.plurk.com/vWq5869wec6SHt2gi0Jrb.jpg",
        content:
          "學生戴上視覺追蹤眼鏡，透過網站進行靜態與動態題目操作，系統即時記錄學生的視線路徑與停留位置，產出視覺熱區圖與注意力軌跡圖。這些資料能清楚呈現學生在協作過程中的互動方式、理解卡關點與注意力分布，協助教師調整教學，也幫助學生進行自我檢視。",
      },
      {
        image: "https://images.plurk.com/3WEUfG1OTLC1NzinxtFf7P.jpg",
        content:
          "學生在活動後能檢視自己的學習表現，包括注意力熱區、軌跡分析與表情評分。透過三按鈕講評切換系統，選擇自己想看的優點或建議講評，有助於自我調整與進步。",
      },
    ],
  },
  parent: {
    title: "平台背景 - 家長",
    sections: [
      {
        image: "https://images.plurk.com/hP89uOT3b5dtYdGQEKkbD.jpg",
        content:
          "在教室裡，老師難以同時掌握每一組學生的學習情況。當老師指導其中一組時，其他學生常會分心、說話甚至搗蛋。我們打造這個平台，搭配視覺追蹤眼鏡，讓學生在協作時更能專注學習，也讓老師和家長透過熱區圖與軌跡圖，更直觀了解每位孩子的上課專注度與互動情況，提升整體學習成效。",
      },
      {
        image: "https://images.plurk.com/vWq5869wec6SHt2gi0Jrb.jpg",
        content:
          "學生戴上視覺追蹤眼鏡，透過網站進行靜態與動態題目操作，系統即時記錄學生的視線路徑與停留位置，產出視覺熱區圖與注意力軌跡圖。這些資料能清楚呈現學生在協作過程中的互動方式、理解卡關點與注意力分布，協助教師調整教學，也幫助學生進行自我檢視。",
      },
      {
        image: "https://images.plurk.com/2rbaL2Cw4akdmeArHRTQ3g.jpg",
        content:
          "家長能透過平台圖像化資料了解孩子在學校的學習狀況，不再僅依賴成績單或老師的描述。從視覺圖表中，看見孩子在課堂上的專注程度與解題策略，更加全面認識學習過程。",
      },
    ],
  },
};

// 內容組件
function PlatformBackgroundContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "teacher"; // 默認顯示老師版本

  const content = contentData[role] || contentData.teacher;

  return (
    <div>
      <Header userRole={role} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {content.title}
        </h1>

        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 bg-white rounded-lg shadow-lg p-6`}
            >
              {/* 圖片區域 */}
              <div className="w-full lg:w-1/2">
                <div className="bg-gray-100 rounded-lg p-4">
                  <img
                    src={section.image}
                    alt={`平台介紹圖片 ${index + 1}`}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* 文字區域 */}
              <div className="w-full lg:w-1/2">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 返回按鈕 */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            ← 返回上一頁
          </button>
        </div>
      </main>
    </div>
  );
}

// 主要組件使用 Suspense 包裝
export default function PlatformBackgroundPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">載入中...</p>
          </div>
        </div>
      }
    >
      <PlatformBackgroundContent />
    </Suspense>
  );
}
