"use client";

import Header from "@/components/Header";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* 返回首頁按鈕 */}
        <div className="mb-6">
          <Link
            href="/"
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
            <span>返回首頁</span>
          </Link>
        </div>

        {/* 頁面標題 */}
        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-8 h-8 text-blue-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.065.31c.446.05.835.41.925.856.069.35-.015.69-.256.978L16 17l-2-2 2-2zm-1.64-5.29c-.7-.7-1.835-.7-2.535 0l-1.115 1.115a.5.5 0 00-.146.354v.707c0 .266.105.52.293.707l1.647 1.647c.187.188.441.293.707.293h.707a.5.5 0 00.354-.146l1.115-1.115c.7-.7.7-1.835 0-2.535l-1.03-1.03z"
              />
            </svg>
            隱私權政策
          </h1>
          <p className="text-gray-600 text-lg">
            保障使用者隱私權益，確保學術研究的倫理規範
          </p>
        </div>

        {/* 政策內容 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* 前言 */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                歡迎使用本平台。本平台係為學術研究目的所設計，旨在模擬小學生於協作學習情境下的互動行為，並透過視覺化數據與AI分析輔助學習與教學。為保障所有使用者的隱私權益，特訂定以下政策：
              </p>
            </div>

            {/* 政策條款 */}
            <div className="space-y-8">
              {/* 第一條 */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mr-3">
                    一
                  </span>
                  資料蒐集與使用目的
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  本平台所收集之所有資料（包含但不限於學生互動行為紀錄、任務完成狀況、AI視覺分析圖、表現評分與教師講評等），僅作為學術研究與教育改善之用途使用。不作為任何商業用途，亦不會對外公開或作為個別識別依據。
                </p>
              </div>

              {/* 第二條 */}
              <div className="border-l-4 border-green-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 text-sm font-bold mr-3">
                    二
                  </span>
                  角色專屬顯示與資料保護設計
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  平台依據角色（學生、老師、家長）提供不同等級的資料瀏覽權限：
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex-shrink-0 mt-0.5">
                      學
                    </span>
                    <p className="text-gray-700">
                      學生僅能查看自己的任務表現與反饋。
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-bold flex-shrink-0 mt-0.5">
                      師
                    </span>
                    <p className="text-gray-700">
                      老師可檢視所屬班級學生整體與個別表現，作為教學調整之參考。
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-bold flex-shrink-0 mt-0.5">
                      長
                    </span>
                    <p className="text-gray-700">
                      家長僅能查看孩子已完成任務的狀況摘要與總體學習進度。
                    </p>
                  </div>
                </div>
              </div>

              {/* 第三條 */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-800 text-sm font-bold mr-3">
                    三
                  </span>
                  資料去識別化處理
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  為確保參與者個人資訊之安全與匿名性，本平台所有研究資料將進行去識別化處理。任何涉及學生或教師的視覺資料與表現記錄均不包含可辨識姓名、學校或個人聯絡資訊。
                </p>
              </div>

              {/* 第四條 */}
              <div className="border-l-4 border-orange-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800 text-sm font-bold mr-3">
                    四
                  </span>
                  資料儲存與保護機制
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  所有使用紀錄與分析資料均儲存於受保護的研究伺服器中，僅限研究團隊成員存取，並採用加密技術防止未經授權的存取與外洩。
                </p>
              </div>

              {/* 第五條 */}
              <div className="border-l-4 border-red-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-800 text-sm font-bold mr-3">
                    五
                  </span>
                  研究倫理與告知原則
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  平台於資料蒐集過程中皆遵守教育與研究倫理規範，並提供使用者（或其監護人）必要之使用說明與告知。任何需要公開之資料，皆需經過額外授權與同意後，方能進行。
                </p>
              </div>

              {/* 第六條 */}
              <div className="border-l-4 border-indigo-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold mr-3">
                    六
                  </span>
                  使用者權利
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  使用者（或法定代理人）可隨時要求查詢、閱覽、複製或刪除相關個人紀錄，並保有撤回參與之權利，不影響其後續學習或研究參與權益。
                </p>
              </div>

              {/* 第七條 */}
              <div className="border-l-4 border-gray-500 pl-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 text-sm font-bold mr-3">
                    七
                  </span>
                  聯絡方式
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  若您對本隱私政策有任何疑問或需進一步協助，請聯絡平台管理團隊：
                  <br />
                  <span className="inline-flex items-center mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    [研究團隊電子郵件或聯絡方式可加於此處]
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 最後更新時間 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            最後更新時間：
            {new Date().toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* 返回頂部按鈕 */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>返回頂部</span>
          </button>
        </div>
      </main>
    </div>
  );
}
