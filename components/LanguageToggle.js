// components/LanguageToggle.js
"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      aria-label="Toggle language"
    >
      {/* 語言圖標 */}
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

      {/* 語言文字 */}
      <span className="font-medium text-gray-700">
        {language === "zh" ? "EN" : "中文"}
      </span>
    </button>
  );
}
