import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import Link from "next/link";

export default function StudentPage() {
  const classes = mockData.classes;

  return (
    <div>
      <Header userRole="student" />
      <main className="container mx-auto px-4 py-8">
        {/* 工具連結區域 */}
        <div className="mb-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/platform-background?role=student"
              className="inline-flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>了解平台背景</span>
            </Link>

            <Link
              href="/assessment-tool?role=student"
              className="inline-flex items-center space-x-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>能力評估工具</span>
            </Link>
          </div>

          {/* 提示文字 */}
          <p className="mt-4 text-gray-600 text-sm">
            💡
            建議先完成「能力評估工具」，了解自己的學習準備度，再開始使用平台學習
          </p>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 mb-6">選擇您的班級</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classData={classItem}
              role="student"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
