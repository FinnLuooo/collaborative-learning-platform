import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";
import Link from "next/link";

export default function ParentPage() {
  const classes = mockData.classes;

  return (
    <div>
      <Header userRole="parent" />
      <main className="container mx-auto px-4 py-8">
        {/* 工具連結區域 */}
        <div className="mb-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/platform-background?role=parent"
              className="inline-flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
              href="/assessment-tool?role=parent"
              className="inline-flex items-center space-x-2 bg-violet-100 hover:bg-violet-200 text-violet-800 px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>孩子能力評估</span>
            </Link>
          </div>

          {/* 提示文字 */}
          <p className="mt-4 text-gray-600 text-sm">
            👨‍👩‍👧‍👦 透過「孩子能力評估」了解孩子對圖表理解的程度，更好地協助孩子學習
          </p>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          查看孩子的班級
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} classData={classItem} role="parent" />
          ))}
        </div>
      </main>
    </div>
  );
}
