"use client";

import Link from "next/link";
import { useState } from "react";
import LoginButton from "./LoginButton";

export default function Header({ userRole }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("zh"); // 只是用來切換顯示

  // 角色圖標配置
  const roleIcons = {
    student: "/images/student-icon.png", // 假設這些是您的圖標路徑
    teacher: "/images/teacher-icon.png",
    parent: "/images/parent-icon.png",
  };

  // 角色顏色配置
  const roleColors = {
    student: "bg-blue-500",
    teacher: "bg-green-500",
    parent: "bg-purple-500",
  };

  // 角色文字配置
  const roleLabels = {
    student: "學生模式",
    teacher: "老師模式",
    parent: "家長模式",
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <span className="text-xl">📚</span>
            </div>
            <span className="font-bold text-xl text-gray-800">
              小學協作學習平台
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/privacy-policy"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              隱私權政策
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              聯絡方式
            </Link>

            {/* 改進的角色徽章 */}
            {userRole && (
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${roleColors[userRole]} text-white`}
              >
                {/* 使用 img 標籤替換 emoji 圖標 */}
                <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                  {/* 如果有實際圖片路徑，可以使用下面的 img 標籤 */}
                  {/* <img 
                    src={roleIcons[userRole]} 
                    alt={roleLabels[userRole]} 
                    className="w-full h-full object-contain"
                  /> */}

                  {/* 或者使用更大的 emoji 作為臨時替代 */}
                  <span className="text-xl">
                    {userRole === "student"
                      ? "👨‍🎓"
                      : userRole === "teacher"
                      ? "👨‍🏫"
                      : "👨‍👩‍👧‍👦"}
                  </span>
                </div>
                <span className="font-medium">{roleLabels[userRole]}</span>
              </div>
            )}

            {/* 語言切換按鈕 */}
            <button
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span className="font-medium text-gray-700">
                {language === "zh" ? "EN" : "中文"}
              </span>
            </button>

            <LoginButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
              >
                隱私權政策
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
              >
                聯絡方式
              </Link>

              {/* 改進的角色徽章 (移動版) */}
              {userRole && (
                <div
                  className={`self-start flex items-center space-x-2 px-3 py-1 rounded-lg ${roleColors[userRole]} text-white my-2`}
                >
                  {/* 更大的圖標容器 */}
                  <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                    <span className="text-xl">
                      {userRole === "student"
                        ? "👨‍🎓"
                        : userRole === "teacher"
                        ? "👨‍🏫"
                        : "👨‍👩‍👧‍👦"}
                    </span>
                  </div>
                  <span className="font-medium">{roleLabels[userRole]}</span>
                </div>
              )}

              {/* 語言切換按鈕 (移動版) */}
              <button
                onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
                className="self-start flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="font-medium text-gray-700">
                  {language === "zh" ? "EN" : "中文"}
                </span>
              </button>

              <div className="py-2">
                <LoginButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
