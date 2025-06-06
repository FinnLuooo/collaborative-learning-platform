"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // 🔧 處理角色按鈕點擊，清除評估狀態並導向角色頁面
  const handleRoleClick = (role) => {
    // 清除該角色的評估完成狀態，強制重新評估
    sessionStorage.removeItem(`${role}_completed_flow`);
    // 導向角色頁面
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 使用共用的 Header 組件 */}
      <Header />

      {/* 主要內容 - 三欄卡片設計 */}
      <main className="flex-grow flex items-center py-16 px-4">
        <div className="max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 學生卡片 */}
            <button
              onClick={() => handleRoleClick("student")}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left w-full"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3"></div>
              <div className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 mb-6">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="30" r="20" fill="#3B82F6" />
                    <path
                      d="M25,90 V60 A25,25 0 0,1 75,60 V90"
                      fill="#93C5FD"
                    />
                    <path
                      d="M35,40 L40,35 M60,35 L65,40"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <path
                      d="M40,45 C45,50 55,50 60,45"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  我是學生
                </h2>
                <p className="text-blue-600 font-medium text-sm mt-2">
                  點擊進入 →
                </p>
              </div>
            </button>

            {/* 老師卡片 */}
            <button
              onClick={() => handleRoleClick("teacher")}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left w-full"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-3"></div>
              <div className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 mb-6">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="25" r="18" fill="#10B981" />
                    <rect
                      x="30"
                      y="10"
                      width="40"
                      height="10"
                      rx="5"
                      fill="#059669"
                    />
                    <rect
                      x="25"
                      y="43"
                      width="50"
                      height="30"
                      rx="4"
                      fill="#D1FAE5"
                    />
                    <rect x="35" y="73" width="10" height="20" fill="#D1FAE5" />
                    <rect x="55" y="73" width="10" height="20" fill="#D1FAE5" />
                    <circle cx="42" cy="25" r="3" fill="white" />
                    <circle cx="58" cy="25" r="3" fill="white" />
                    <path
                      d="M42,35 Q50,40 58,35"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  我是老師
                </h2>
                <p className="text-green-600 font-medium text-sm mt-2">
                  點擊進入 →
                </p>
              </div>
            </button>

            {/* 家長卡片 */}
            <button
              onClick={() => handleRoleClick("parent")}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left w-full"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3"></div>
              <div className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 mb-6">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="65" cy="30" r="15" fill="#8B5CF6" />
                    <circle cx="35" cy="30" r="15" fill="#A78BFA" />
                    <path
                      d="M15,90 V55 A20,15 0 0,1 55,55 V90"
                      fill="#A78BFA"
                    />
                    <path
                      d="M45,90 V55 A20,15 0 0,1 85,55 V90"
                      fill="#8B5CF6"
                    />
                    <circle cx="35" cy="30" r="3" fill="white" />
                    <circle cx="65" cy="30" r="3" fill="white" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  我是家長
                </h2>
                <p className="text-purple-600 font-medium text-sm mt-2">
                  點擊進入 →
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
