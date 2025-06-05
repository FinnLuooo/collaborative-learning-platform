"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";

// 內容組件
function PlatformBackgroundContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "teacher"; // 默認顯示老師版本

  return (
    <div>
      <Header userRole={role} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          平台背景介紹
        </h1>

        <div className="space-y-12">
          {/* 第一段：問題背景 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-lg shadow-lg p-6">
            {/* 圖片區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4">
                <img
                  src="https://images.plurk.com/hP89uOT3b5dtYdGQEKkbD.jpg"
                  alt="教室學習情況"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* 文字區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  教學現場的挑戰
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  在教室裡，老師難以同時掌握每一組學生的學習情況。當老師指導其中一組時，其他學生常會分心、說話甚至搗蛋。我們打造這個平台，搭配視覺追蹤眼鏡，讓學生在協作時更能專注學習，也讓老師和家長透過熱區圖與軌跡圖，更直觀了解每位孩子的上課專注度與互動情況，提升整體學習成效。
                </p>
              </div>
            </div>
          </div>

          {/* 第二段：技術原理 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 bg-white rounded-lg shadow-lg p-6">
            {/* 圖片區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4">
                <img
                  src="https://images.plurk.com/vWq5869wec6SHt2gi0Jrb.jpg"
                  alt="眼動追蹤技術"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* 文字區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  視覺追蹤技術
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  學生戴上視覺追蹤眼鏡，透過網站進行靜態與動態題目操作，系統即時記錄學生的視線路徑與停留位置，產出視覺熱區圖與注意力軌跡圖。這些資料能清楚呈現學生在協作過程中的互動方式、理解卡關點與注意力分布，協助教師調整教學，也幫助學生進行自我檢視。
                </p>
              </div>
            </div>
          </div>

          {/* 第三段：老師應用 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-lg shadow-lg p-6">
            {/* 圖片區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4">
                <img
                  src="https://images.plurk.com/2mAbIsuaSZCS5e614onkv7.jpg"
                  alt="老師使用情況"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* 文字區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">👨‍🏫</span>
                  <h2 className="text-xl font-semibold text-green-800">
                    老師的應用
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  透過視覺追蹤數據與 AI
                  分析，老師能快速發現學生學習上的盲點，比起傳統評量更具即時性與細緻度。也能觀察學生協作互動的方式，進一步給予具體輔導與引導策略。
                </p>
              </div>
            </div>
          </div>

          {/* 第四段：學生應用 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 bg-white rounded-lg shadow-lg p-6">
            {/* 圖片區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4">
                <img
                  src="https://images.plurk.com/3WEUfG1OTLC1NzinxtFf7P.jpg"
                  alt="學生使用情況"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* 文字區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">👨‍🎓</span>
                  <h2 className="text-xl font-semibold text-blue-800">
                    學生的應用
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  學生在活動後能檢視自己的學習表現，包括注意力熱區、軌跡分析與表情評分。透過三角色講評系統（AI分析、老師指導、學生自評），選擇自己想看的優點或建議講評，培養自我反思能力與學習動機，有助於自我調整與進步。
                </p>
              </div>
            </div>
          </div>

          {/* 第五段：家長應用 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-lg shadow-lg p-6">
            {/* 圖片區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4">
                <img
                  src="https://images.plurk.com/2rbaL2Cw4akdmeArHRTQ3g.jpg"
                  alt="家長使用情況"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* 文字區域 */}
            <div className="w-full lg:w-1/2">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">👨‍👩‍👧‍👦</span>
                  <h2 className="text-xl font-semibold text-purple-800">
                    家長的應用
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  家長能透過平台圖像化資料了解孩子在學校的學習狀況，不再僅依賴成績單或老師的描述。從視覺圖表中，看見孩子在課堂上的專注程度、解題策略與同儕互動模式，更加全面認識孩子的學習歷程，並在家庭教育中給予適當的支持與鼓勵。
                </p>
              </div>
            </div>
          </div>

          {/* 平台特色總結 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold text-center mb-6">
              平台核心特色
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">視覺化數據</h3>
                <p className="text-sm opacity-90">熱區圖與軌跡圖呈現學習行為</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-2">協作學習</h3>
                <p className="text-sm opacity-90">促進學生間的有效互動</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">個人化回饋</h3>
                <p className="text-sm opacity-90">AI分析提供精準學習建議</p>
              </div>
            </div>
          </div>
        </div>

        {/* 返回按鈕 */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-lg"
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
