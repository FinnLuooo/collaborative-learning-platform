"use client";
import { useState } from "react";

export default function EyeTrackingAssessment({
  isOpen,
  onClose,
  onComplete,
  userRole,
}) {
  // 評量項目的選擇狀態
  const [selections, setSelections] = useState({
    知識面向: { level: null },
    後設認知: { level: null },
    批判評估: { level: null },
    元視覺策略: { level: null },
    AI輔助意識: { level: null },
    FATE原則: { level: null },
  });

  // 是否顯示結果
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // 評量表格數據
  const assessmentData = [
    {
      aspect: "展現對視覺化的認識論知識",
      key: "知識面向",
      levels: [
        "無發展視覺化的認識論知識；無法思考視覺化本身的功能或限制。",
        "能指出視覺化的功能，例如促進學習、幫助記憶、以更易理解或不同於文字的方式表達想法；但無法思考視覺化本身的限制（將視覺化視為學習或表達的工具）。",
        "能指出視覺化有助於簡化現象或概念、將抽象具體化，或呈現整體結構；能理解視覺化並非目標物的精確複製——某些細節可能在再現中遺漏（靜態地看待表徵與對象的關係）。",
        "理解視覺化有助於重建知識的功能；理解多種表徵（文字、符號、圖表）依目的互補構成視覺化；能指出當創作者與讀者在目的與表徵慣例不一致時可能產生誤解（動態地看待視覺化目的與知識建構之間的關係）。",
      ],
    },
    {
      aspect: "在視覺化歷程中展現後設認知",
      key: "後設認知",
      levels: [
        "未展現後設認知。",
        "能覺察自身在理解視覺化時的困難與優勢。",
        "能覺察自身在理解視覺化時的困難與優勢；能調節理解歷程，例如掃描圖像、辨識或注意關鍵特徵（如顏色、凝視路徑、注意區域），但未嘗試解釋其意涵。",
        "能覺察自身在理解視覺化時的困難與優勢；能解釋視覺模式的意涵，並說明其與學生注意力、行為或任務投入的關聯；能批判性地反思視覺化的公平性、倫理與教學意涵，包括可能的偏誤、過度詮釋或資料誤用。",
      ],
    },
    {
      aspect: "批判性評估視覺化的品質與適切性",
      key: "批判評估",
      levels: [
        "無法評價視覺化是否合宜。",
        "基於個人對外觀的喜好來評價視覺化（屬於個人觀點）。",
        "依據認識論判準來評價視覺化，涵蓋下列一項或多項：1. 傳達性判準－使用者與視覺化之間的互動（例如：此視覺化是否容易理解並有效傳遞資訊？）2. 表徵性判準－視覺化與其所代表資料之間的關係（例如：是否準確且完整呈現主要變項與資料特徵？）3. 目的與功能性判準－視覺化達成目標與功能的效能（例如：是否提供足夠證據來回答問題或支持決策？）",
        "依據全部認識論判準來評價視覺化（如上三項皆包含），能系統性且全面地評估視覺化的適切性與意圖是否達成。",
      ],
    },
    {
      aspect: "運用元視覺策略以理解視覺化",
      key: "元視覺策略",
      levels: [
        "未使用任何元視覺策略。",
        "使用基本策略，例如「回憶策略」協助視覺化理解。",
        "使用適當的元視覺策略，如推論、轉化、比較等，有助於投入有意識的認知。",
        "使用高層次元視覺策略，如聚焦、歸納、判斷、修正或解釋策略，能整合認識論知識與後設認知進行深入理解。",
      ],
    },
    {
      aspect: "AI輔助的視覺理解意識",
      key: "AI輔助意識",
      levels: [
        "不使用AI工具進行視覺化解讀，也不具備相關潛在意涵或風險的認知。",
        "使用AI工具（如ChatGPT）協助解讀視覺內容，但批判意識有限。",
        "能評估AI生成解釋的相關性與合理性，並意識到其中可能的不準確性或偏誤。",
        "能結合AI工具提供的洞見與先備知識或任務目標，有效解釋視覺化內容，並清楚認知AI的限制與適當使用情境。",
      ],
    },
    {
      aspect: "眼動資料視覺化理解中的FATE原則意識",
      key: "FATE原則",
      subtitle:
        "Fairness（公平）、Accountability（責任）、Transparency（透明）、Ethics（倫理）",
      levels: [
        "個人對眼動視覺化的倫理、社會或詮釋意涵毫無意識，亦未採取任何質疑、驗證或保護的行動。\n- 被動接受視覺化，未質疑其公平性、隱私或目的\n- 無意識辨識關於同意或個資的問題\n- 對誰負責詮釋或潛在傷害毫無概念\n- 毫無查核資料來源或方法的行動",
        "個人對倫理議題有所意識，但未採取實質行動。\n- 能辨識潛在誤解或過度詮釋\n- 理解掌握視覺化目的或來源的重要性\n- 注意到問題，但未進行驗證或應對",
        "個人主動反思倫理考量，並採取行動以驗證與保護資料的使用。\n- 主動查核資料來源、目的與生成方式\n- 反思視覺化是否促進學習而非評價\n- 確認取得使用者同意並查驗資料隱私\n- 承認詮釋責任的共享性",
        "個人對視覺化的倫理使用與詮釋負完全責任，積極確保其公平性、隱私性與透明性。\n- 積極確保視覺化公平呈現學習者行為\n- 避免身分標籤化或刻板印象\n- 建立透明的詮釋流程\n- 持續監控並修正偏誤",
      ],
    },
  ];

  // 處理選擇
  const handleSelection = (aspectKey, level) => {
    setSelections((prev) => ({
      ...prev,
      [aspectKey]: { level },
    }));
  };

  // 檢查是否通過評量（所有項目都必須選擇等級3）
  const checkPassed = () => {
    return Object.values(selections).every(
      (selection) => selection.level === 3
    );
  };

  // 提交評量
  const handleSubmit = () => {
    setIsSubmitting(true);

    // 模擬提交延遲
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResult(true);

      if (checkPassed()) {
        // 通過評量，等待用戶確認後關閉彈窗並允許查看講評
        setTimeout(() => {
          onComplete(true);
          onClose();
        }, 3000);
      }
    }, 1500);
  };

  // 檢查是否可以提交（所有項目都需要選擇）
  const canSubmit = () => {
    return Object.values(selections).every(
      (selection) => selection.level !== null
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* 標題欄 */}
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-800">
                眼動資料視覺化理解能力評量
              </h2>
              <p className="text-blue-600 mt-1">
                請根據您的能力水準，在每個面向中選擇最符合您現況的等級
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* 評量說明 */}
        <div className="p-6 bg-yellow-50 border-b border-yellow-200">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1-1v3a1 1 0 002 0V4a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-yellow-800 font-semibold">重要說明</p>
              <p className="text-yellow-700 text-sm mt-1">
                • 必須在所有面向都達到<strong>等級 3</strong>
                才能通過評量並查看講評區
                <br />
                • 請誠實評估自己的能力水準，這將有助於提升您的學習效果
                <br />• 如未通過評量，將需要專員協助指導後才能查看講評內容
              </p>
            </div>
          </div>
        </div>

        {/* 評量表格 */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showResult ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-4 text-left font-bold text-gray-700 w-1/6">
                      面向
                    </th>
                    <th className="border border-gray-300 p-4 text-center font-bold text-red-600 w-1/5">
                      等級 0
                    </th>
                    <th className="border border-gray-300 p-4 text-center font-bold text-orange-600 w-1/5">
                      等級 1
                    </th>
                    <th className="border border-gray-300 p-4 text-center font-bold text-yellow-600 w-1/5">
                      等級 2
                    </th>
                    <th className="border border-gray-300 p-4 text-center font-bold text-green-600 w-1/5">
                      等級 3
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-4 font-semibold text-gray-700 bg-gray-50">
                        <div>
                          {item.aspect}
                          {item.subtitle && (
                            <div className="text-sm text-gray-500 mt-1 font-normal">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </td>
                      {item.levels.map((description, levelIndex) => (
                        <td
                          key={levelIndex}
                          className="border border-gray-300 p-4 text-sm"
                        >
                          <div className="space-y-2">
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {description}
                            </div>
                            <div className="flex justify-center">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={item.key}
                                  checked={
                                    selections[item.key]?.level === levelIndex
                                  }
                                  onChange={() =>
                                    handleSelection(item.key, levelIndex)
                                  }
                                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  選擇此等級
                                </span>
                              </label>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // 結果顯示區域
            <div className="text-center py-12">
              {checkPassed() ? (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-green-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="h-12 w-12 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-green-600 mb-4">
                    🎉 評量通過！
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    恭喜您在所有面向都達到等級 3！
                    <br />
                    您現在可以查看完整的講評內容了。
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 text-sm">
                      系統將在 3 秒後自動返回，並開放講評區查看權限...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-red-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="h-12 w-12 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-red-600 mb-4">
                    評量未通過
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    您需要在所有面向都達到等級 3 才能查看講評內容。
                    <br />
                    建議您聯繫專員進行進一步的指導。
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      需要提升的面向：
                    </h4>
                    <ul className="text-left text-blue-700 text-sm space-y-1">
                      {Object.entries(selections)
                        .filter(([key, selection]) => selection.level !== 3)
                        .map(([key, selection]) => (
                          <li key={key}>
                            • {key}：目前等級 {selection.level}，需達到等級 3
                          </li>
                        ))}
                    </ul>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                  >
                    返回並聯繫專員
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 底部按鈕 */}
        {!showResult && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                已完成：
                {
                  Object.values(selections).filter((s) => s.level !== null)
                    .length
                }{" "}
                / {assessmentData.length} 項
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit() || isSubmitting}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      評量中...
                    </>
                  ) : (
                    "提交評量"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
