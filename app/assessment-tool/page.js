"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Link from "next/link";

// 評估內容數據
const assessmentData = {
  teacher: {
    title: "教師版｜理解眼動資料視覺化的後設視覺能力評估表",
    subtitle: "請根據您目前的理解程度，為每個面向選擇最符合的等級",
    color: "green",
    bgColor: "bg-green-50",
    buttonColor: "bg-green-600 hover:bg-green-700",
    cardBorder: "border-green-200",
    badgeColor: "bg-green-100 text-green-800",
    aspects: [
      {
        title: "視覺化知識理解",
        levels: [
          "未展現對視覺化的認識；無法辨識功能與限制。",
          "知道視覺化可協助記憶、表達與學習，但尚未意識其本身限制。",
          "理解視覺化可簡化與建構抽象內容，並非目標的完整複製。",
          "能釐清視覺化與知識建構間的關係，了解多重表徵系統與可能誤解來源。",
        ],
      },
      {
        title: "後設認知表現",
        levels: [
          "無後設認知展現。",
          "可覺察自身理解上的強弱點。",
          "能規劃視覺化過程（如選擇合適形式與設計）。",
          "能監控、解釋、反思視覺化理解與品質。",
        ],
      },
      {
        title: "批判視覺化表徵",
        levels: [
          "無能力評價視覺化。",
          "基於個人主觀偏好進行評價。",
          "使用單一或多個知識判準（傳達性、表徵性、目的性）進行分析。",
          "能綜合三大判準系統性評價視覺化品質。",
        ],
      },
      {
        title: "後設視覺策略運用",
        levels: [
          "未使用任何策略。",
          "主要依靠回憶等初階策略。",
          "採用比較、轉換等中階策略協助理解。",
          "可運用聚焦、歸納、解釋等高階策略，結合知識與後設思考。",
        ],
      },
      {
        title: "FATE 原則應用",
        levels: [
          "忽視倫理，圖像可能具偏誤或洩漏隱私。",
          "意識到資料敏感，但未充分處理偏誤與責任問題。",
          "採取更審慎的設計與說明，減少風險與誤導。",
          "完整實踐公平性、責任歸屬、方法透明與倫理保障。",
        ],
      },
    ],
  },
  student: {
    title: "學生版｜理解眼動資料視覺化的後設視覺能力評估表",
    subtitle: "想想看，你現在的程度是哪一個等級呢？",
    color: "blue",
    bgColor: "bg-blue-50",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    cardBorder: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-800",
    aspects: [
      {
        title: "我懂這張圖的意思嗎？",
        levels: [
          "完全看不懂，不知道圖有什麼幫助。",
          "覺得圖能幫助學習、記憶、表達，但想不到它有什麼壞處。",
          "知道圖能讓抽象變得清楚，也知道圖不是100%的真實再現。",
          "明白圖是為了某個學習目的被設計出來的，有可能會被誤解。",
        ],
      },
      {
        title: "我知道我哪裡看不懂嗎？",
        levels: [
          "沒有注意到看圖時的問題。",
          "能發現自己看得懂／看不懂的地方。",
          "會想要先想清楚怎麼畫、選什麼圖，幫助理解。",
          "除了規劃，還會邊看邊檢查，或之後再反思圖對不對。",
        ],
      },
      {
        title: "我怎麼知道這張圖好不好？",
        levels: [
          "沒想過圖好不好。",
          "覺得圖好看或喜歡就是好。",
          "會想圖是否說得清楚、內容正確、幫助了解問題。",
          "從多方面來評價圖的內容、表現和幫助程度。",
        ],
      },
      {
        title: "我有用什麼方法來看懂圖嗎？",
        levels: [
          "沒用方法。",
          "只用回想課堂內容。",
          "會比較、推理或轉換方式幫自己理解。",
          "會用像聚焦重點、解釋內容或自己修正圖的方法幫助學習。",
        ],
      },
      {
        title: "這張圖會不會有問題？會不會不公平？",
        levels: [
          "沒想過圖可能有問題。",
          "感覺資料敏感但不知道怎麼處理。",
          "知道圖可能誤導別人，會說明圖有什麼限制。",
          "會思考圖有沒有尊重他人、保護隱私、說明清楚、對每個人都公平。",
        ],
      },
    ],
  },
  parent: {
    title: "家長版｜理解眼動資料視覺化的後設視覺能力評估表",
    subtitle: "請評估您的孩子在以下各面向的表現程度",
    color: "purple",
    bgColor: "bg-purple-50",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    cardBorder: "border-purple-200",
    badgeColor: "bg-purple-100 text-purple-800",
    aspects: [
      {
        title: "孩子理解圖表的能力",
        levels: [
          "孩子不太能從圖表中獲得資訊，也不知道圖的意義。",
          "孩子知道圖可以幫助學習和記憶，但未想到圖可能有誤差。",
          "孩子知道圖表能夠簡化複雜內容，也能意識到它不是百分百的實物呈現。",
          "孩子了解圖是為幫助學習而設計的，有可能會產生誤解，並懂得用圖來建立知識。",
        ],
      },
      {
        title: "孩子的自我察覺",
        levels: [
          "孩子沒意識到看不懂的地方。",
          "孩子知道哪些地方不懂。",
          "孩子會事前想清楚要怎麼看圖／選圖。",
          "孩子會邊看邊檢查是否看懂，也會之後再反思圖是否有幫助。",
        ],
      },
      {
        title: "孩子評價圖表的方式",
        levels: [
          "不會判斷圖表是否好用。",
          "根據圖表好不好看來判斷。",
          "孩子會依據內容是否正確、是否易懂來做出評價。",
          "孩子能全面性地評估圖是否適合學習目的、內容準確、清楚表達。",
        ],
      },
      {
        title: "孩子是否有看圖的策略",
        levels: [
          "看圖時沒什麼特別方法。",
          "會用課堂記憶幫忙理解。",
          "會用比對、推理等方式幫助自己看懂。",
          "會用高階策略來看圖，例如集中注意力、自己解釋、發現錯誤並修正。",
        ],
      },
      {
        title: "孩子是否意識到圖表的風險與倫理問題",
        levels: [
          "完全忽略圖可能帶來的問題。",
          "注意到資料敏感性但不清楚怎麼處理。",
          "能辨識圖表中的偏誤或風險，並會說明其限制。",
          "能全面考慮隱私、同意、責任與公平性，並採取保護措施。",
        ],
      },
    ],
  },
};

function AssessmentContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "student";
  const data = assessmentData[role] || assessmentData.student;

  return (
    <div>
      <Header userRole={role} />
      <main className="container mx-auto px-4 py-8">
        {/* 返回按鈕 */}
        <div className="mb-6">
          <Link
            href={`/${role}`}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>返回</span>
          </Link>
        </div>

        {/* 頁面標題 */}
        <div className={`${data.bgColor} rounded-xl p-6 mb-8`}>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {data.title}
          </h1>
          <p className="text-gray-600 text-lg">{data.subtitle}</p>

          {/* 評估說明 */}
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-gray-400">
            <h3 className="font-semibold text-gray-800 mb-2">評估說明：</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>等級 0</strong>：初步接觸，尚在探索階段
              </li>
              <li>
                • <strong>等級 1</strong>：基礎理解，開始有所認識
              </li>
              <li>
                • <strong>等級 2</strong>：進階應用，能夠靈活運用
              </li>
              <li>
                • <strong>等級 3</strong>：專精掌握，具備深度理解
              </li>
            </ul>
          </div>
        </div>

        {/* 評估內容 */}
        <div className="space-y-6">
          {data.aspects.map((aspect, aspectIndex) => (
            <div
              key={aspectIndex}
              className={`bg-white rounded-xl shadow-sm border ${data.cardBorder} overflow-hidden`}
            >
              {/* 面向標題 */}
              <div
                className={`${data.bgColor} px-6 py-4 border-b ${data.cardBorder}`}
              >
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${data.badgeColor} text-sm font-bold mr-3`}
                  >
                    {aspectIndex + 1}
                  </span>
                  {aspect.title}
                </h2>
              </div>

              {/* 等級選項 */}
              <div className="p-6">
                <div className="grid gap-4">
                  {aspect.levels.map((level, levelIndex) => (
                    <label key={levelIndex} className="cursor-pointer">
                      <div className="flex items-start space-x-4 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                        <input
                          type="radio"
                          name={`aspect-${aspectIndex}`}
                          value={levelIndex}
                          className={`mt-1 h-4 w-4 text-${data.color}-600 focus:ring-${data.color}-500 border-gray-300`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.badgeColor} mr-2`}
                            >
                              等級 {levelIndex}
                            </span>
                            {levelIndex === 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                進階
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {level}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 提交按鈕 */}
        <div className="mt-8 text-center">
          <button
            className={`${data.buttonColor} text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors duration-200 shadow-lg hover:shadow-xl`}
          >
            完成評估
          </button>
        </div>

        {/* 評估結果說明 */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            評估結果運用建議：
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                如果您的等級主要在 0-1：
              </h4>
              <p>
                建議先從平台背景介紹開始，了解眼動追蹤技術的基本概念和應用。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                如果您的等級主要在 2-3：
              </h4>
              <p>
                您已具備良好的基礎，可以直接開始使用平台進行深度學習和分析。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
