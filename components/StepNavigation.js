"use client";
import { useState } from "react";

export default function StepNavigation({ steps, currentStep, onStepChange }) {
  const handleStepClick = (stepId) => {
    onStepChange(stepId);
  };

  const getCurrentStepNumber = () => {
    return steps.findIndex((step) => step.id === currentStep) + 1;
  };

  const getTotalSteps = () => {
    return steps.length;
  };

  return (
    <div className="mb-6">
      {/* 步驟進度條 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">任務進度</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            第 {getCurrentStepNumber()} 步 / 共 {getTotalSteps()} 步
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(getCurrentStepNumber() / getTotalSteps()) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 步驟按鈕列表 */}
      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = step.id === currentStep;
          const isCompleted = step.isCompleted;
          const isAccessible = index === 0 || steps[index - 1].isCompleted;

          return (
            <button
              key={step.id}
              onClick={() => isAccessible && handleStepClick(step.id)}
              disabled={!isAccessible}
              className={`
                relative px-4 py-3 rounded-lg font-medium transition-all duration-200 
                flex items-center space-x-2 min-w-[140px] justify-center
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : isCompleted
                    ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
                    : isAccessible
                    ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                    : "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed"
                }
              `}
            >
              {/* 步驟圖標 */}
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-white text-blue-600"
                      : "bg-gray-300 text-gray-600"
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {/* 步驟文字 */}
              <div className="flex flex-col items-start text-left">
                <span className="text-xs opacity-75">Step {stepNumber}</span>
                <span className="text-sm font-medium truncate max-w-[80px]">
                  {step.title}
                </span>
              </div>

              {/* 當前步驟指示器 */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* 步驟說明 */}
      <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">當前步驟：</span>
          {steps.find((step) => step.id === currentStep)?.description}
        </p>
      </div>
    </div>
  );
}
