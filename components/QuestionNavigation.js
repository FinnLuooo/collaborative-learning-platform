"use client";
import { useState } from "react";

export default function QuestionNavigation({
  questions,
  currentQuestion,
  onQuestionChange,
}) {
  const handleQuestionClick = (questionId) => {
    onQuestionChange(questionId);
  };

  const getCurrentQuestionNumber = () => {
    return (
      questions.findIndex((question) => question.id === currentQuestion) + 1
    );
  };

  const getTotalQuestions = () => {
    return questions.length;
  };

  return (
    <div className="mb-6">
      {/* 題目進度條 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">練習進度</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            第 {getCurrentQuestionNumber()} 題 / 共 {getTotalQuestions()} 題
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (getCurrentQuestionNumber() / getTotalQuestions()) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 題目按鈕列表 */}
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => {
          const questionNumber = index + 1;
          const isActive = question.id === currentQuestion;

          return (
            <button
              key={question.id}
              onClick={() => handleQuestionClick(question.id)}
              className={`
                relative px-4 py-3 rounded-lg font-medium transition-all duration-200 
                flex items-center space-x-2 min-w-[120px] justify-center
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }
              `}
            >
              {/* 題目圖標 */}
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${
                    isActive
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white"
                  }
                `}
              >
                {questionNumber}
              </div>

              {/* 題目文字 */}
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">
                  第{questionNumber}題
                </span>
              </div>

              {/* 當前題目指示器 */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* 題目說明 */}
      <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">數學練習：</span>
          點擊上方按鈕切換不同題目，每題都有專門的視覺分析和AI講評
        </p>
      </div>
    </div>
  );
}
