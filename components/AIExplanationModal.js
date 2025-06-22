"use client";
import { useState, useRef, useEffect } from "react";

export default function AIExplanationModal({
  isOpen,
  onClose,
  userRole,
  selectedView,
  currentData,
}) {
  const [selectedMode, setSelectedMode] = useState("passive"); // "passive" 或 "proactive"
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 自動捲動到最底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 當模式切換時，重置對話並發送歡迎訊息
  useEffect(() => {
    if (isOpen) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([
        {
          id: 1,
          type: "ai",
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [selectedMode, isOpen]);

  if (!isOpen) return null;

  // 獲取角色對應的按鈕文字
  const getButtonText = () => {
    return userRole === "student" ? "AI幫你看圖" : "AI解說";
  };

  // 獲取歡迎訊息
  const getWelcomeMessage = () => {
    const viewType = selectedView === "trace" ? "軌跡圖" : "熱區圖";

    if (selectedMode === "passive") {
      return `歡迎！我是被動式 AI 助理。這張${viewType}顯示了學生的注意力分佈情況。我在這裡回答您的問題，請隨時提出您想了解的內容。您可以詢問關於圖表的任何細節或學習行為的分析。`;
    } else {
      return `歡迎！我是主動式 AI 助理。讓我們一起分析這張${viewType}！我注意到學生的注意力模式很有趣。您想先從哪個角度開始分析呢？我可以引導您深入了解學習行為的各個面向。`;
    }
  };

  // 獲取 AI 回應
  const getAIResponse = (userMessage) => {
    const viewType = selectedView === "trace" ? "軌跡圖" : "熱區圖";
    const isTrace = selectedView === "trace";

    if (selectedMode === "passive") {
      // 被動式回應：直接回答問題
      if (userMessage.includes("注意力") || userMessage.includes("專注")) {
        return isTrace
          ? `根據軌跡圖顯示，學生的注意力軌跡主要分佈在問題的關鍵區域。您可以看到不同顏色的線條代表不同學生的視線移動路徑。`
          : `根據熱區圖顯示，紅色區域表示學生注意力最集中的地方，黃色和綠色區域表示中等程度的關注。`;
      } else if (userMessage.includes("合作") || userMessage.includes("協作")) {
        return `從圖中可以看出學生間的協作模式。您想了解哪個特定的協作行為？我可以為您詳細說明。`;
      } else if (
        userMessage.includes("怎麼看") ||
        userMessage.includes("如何")
      ) {
        return `您可以觀察圖中的顏色分佈和形狀來理解學習情況。有什麼特定的部分您想深入了解嗎？`;
      } else {
        return `好的，我了解您的問題。根據這張${viewType}，我可以為您提供相關的解釋。請告訴我您最關心的是哪個部分？`;
      }
    } else {
      // 主動式回應：引導和提問
      if (userMessage.includes("注意力") || userMessage.includes("專注")) {
        return isTrace
          ? `很好的觀察！讓我引導您深入分析：您注意到紅色和藍色軌跡的差異了嗎？這可能反映了兩位學生不同的學習策略。您覺得哪位學生的注意力模式更有效率呢？`
          : `excellent！注意力分析是關鍵。您看到那個最紅的熱點了嗎？這表示學生們共同關注的重點。但我也注意到一些分散的區域，您認為這代表什麼學習行為呢？`;
      } else if (userMessage.includes("合作") || userMessage.includes("協作")) {
        return `太棒了！協作分析是重點。從圖中我們可以看到學生的視線重疊程度。您認為高重疊代表更好的合作，還是分工合作更有效呢？讓我們進一步探討不同合作模式的優缺點。`;
      } else {
        return `很好的問題！讓我引導您從不同角度思考：首先觀察整體模式，然後關注細節差異。您覺得從這張圖可以看出學生的學習困難點在哪裡嗎？這對教學改進有什麼啟示？`;
      }
    }
  };

  // 處理發送訊息
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // 模擬 AI 思考時間
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      const aiMsg = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // 1-2.5秒隨機延遲
  };

  // 處理 Enter 鍵發送
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 獲取建議問題
  const getSuggestedQuestions = () => {
    const isTrace = selectedView === "trace";

    if (selectedMode === "passive") {
      return isTrace
        ? [
            "這張軌跡圖如何解讀？",
            "不同顏色的線條代表什麼？",
            "學生的注意力模式如何？",
          ]
        : [
            "熱區圖的顏色代表什麼？",
            "學生的專注程度如何？",
            "紅色區域說明了什麼？",
          ];
    } else {
      return isTrace
        ? [
            "兩位學生的學習策略有何不同？",
            "軌跡重疊代表什麼意義？",
            "哪種注意力模式更有效？",
          ]
        : [
            "學生的協作模式如何改進？",
            "注意力分散的原因是什麼？",
            "這對教學有什麼啟示？",
          ];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 標題欄 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            {getButtonText()} - {selectedView === "trace" ? "軌跡圖" : "熱區圖"}
            解讀
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 模式選擇器 */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedMode("passive")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                selectedMode === "passive"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              被動式 AI 助理
            </button>
            <button
              onClick={() => setSelectedMode("proactive")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                selectedMode === "proactive"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              主動式 AI 助理
            </button>
          </div>

          {/* 模式說明 */}
          <div className="mt-3 text-sm text-gray-600">
            {selectedMode === "passive" ? (
              <span>
                💭 <strong>被動式特徵：</strong>
                支持性回應，等待您的提問，提供中性解釋
              </span>
            ) : (
              <span>
                🎯 <strong>主動式特徵：</strong>
                引導式提問，主動分析，深度教學指導
              </span>
            )}
          </div>
        </div>

        {/* 對話區域 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 聊天介面 */}
          <div className="flex-1 flex flex-col bg-white">
            {/* 聊天標題 */}
            <div
              className={`p-4 border-b border-gray-200 ${
                selectedMode === "passive" ? "bg-pink-50" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold ${
                    selectedMode === "passive" ? "bg-pink-500" : "bg-blue-500"
                  }`}
                >
                  AI
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {selectedMode === "passive"
                      ? "被動式 AI 助理"
                      : "主動式 AI 助理"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedView === "trace" ? "軌跡圖" : "熱區圖"}分析專家
                  </p>
                </div>
              </div>
            </div>

            {/* 訊息區域 */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ maxHeight: "400px" }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : selectedMode === "passive"
                        ? "bg-pink-100 text-gray-800 rounded-bl-none"
                        : "bg-blue-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* AI 正在輸入指示器 */}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className={`p-3 rounded-lg rounded-bl-none ${
                      selectedMode === "passive" ? "bg-pink-100" : "bg-blue-100"
                    }`}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 建議問題 */}
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">💡 建議問題：</p>
              <div className="flex flex-wrap gap-2">
                {getSuggestedQuestions().map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* 輸入區域 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="輸入您的問題..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                    selectedMode === "passive"
                      ? "bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
                  }`}
                >
                  發送
                </button>
              </div>
            </div>
          </div>

          {/* 右側特徵說明區 */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
            <h4 className="font-bold text-gray-800 mb-3">
              {selectedMode === "passive" ? "被動式" : "主動式"} AI 特徵
            </h4>

            <div className="space-y-3 text-sm">
              {selectedMode === "passive" ? (
                <>
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <h5 className="font-semibold text-pink-800 mb-1">
                      支持性回應
                    </h5>
                    <p className="text-pink-700">
                      回答您的具體問題，提供準確資訊
                    </p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <h5 className="font-semibold text-pink-800 mb-1">
                      等待驅動
                    </h5>
                    <p className="text-pink-700">
                      等待您的提問，不主動引導方向
                    </p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <h5 className="font-semibold text-pink-800 mb-1">
                      中性解釋
                    </h5>
                    <p className="text-pink-700">提供客觀的數據解讀和說明</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-1">
                      引導式提問
                    </h5>
                    <p className="text-blue-700">主動提出問題，引發深度思考</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-1">
                      主動分析
                    </h5>
                    <p className="text-blue-700">主動發現問題，提供改進建議</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-1">
                      教學指導
                    </h5>
                    <p className="text-blue-700">提供教學策略和學習方法建議</p>
                  </div>
                </>
              )}
            </div>

            {/* 圖表類型說明 */}
            <div className="mt-6">
              <h5 className="font-semibold text-gray-700 mb-2">
                當前分析：{selectedView === "trace" ? "軌跡圖" : "熱區圖"}
              </h5>
              <div className="text-xs text-gray-600 bg-white p-3 rounded-lg">
                {selectedView === "trace" ? (
                  <p>
                    軌跡圖顯示學生的視線移動路徑，可以分析學習策略和注意力轉移模式。
                  </p>
                ) : (
                  <p>
                    熱區圖顯示學生注意力的集中程度，紅色表示高關注，藍色表示低關注。
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
