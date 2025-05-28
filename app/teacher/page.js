import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import Link from "next/link";

export default function TeacherPage() {
  const classes = mockData.classes;

  return (
    <div>
      <Header userRole="teacher" />
      <main className="container mx-auto px-4 py-8">
        {/* 工具連結區域 */}
        <div className="mb-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/platform-background?role=teacher"
              className="inline-flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
              href="/assessment-tool?role=teacher"
              className="inline-flex items-center space-x-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M9 5H7a2 2 0 00-2 2v1M9 5a2 2 0 012 2v1M9 5V3a2 2 0 012-2h1m0 0h1a2 2 0 012 2v1M13 7a2 2 0 012 2v1m-4 0V9a2 2 0 00-2-2H7m0 0v2a2 2 0 002 2h1m0-4a2 2 0 012 2v1m-2-1h2m-2 0h-2"
                />
              </svg>
              <span>專業能力評估</span>
            </Link>
          </div>

          {/* 提示文字 */}
          <p className="mt-4 text-gray-600 text-sm">
            📋
            透過「專業能力評估」了解您對眼動視覺化的掌握程度，制定更有效的教學策略
          </p>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 mb-6">管理您的班級</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classData={classItem}
              role="teacher"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
