"use client";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import GroupCard from "@/components/GroupCard";

export default function TeacherClassPage({ params }) {
  const { classId } = params;
  const classData = mockData.classes.find((c) => c.id === classId);

  const handleBatchDownload = () => {
    alert("視覺圖批量下載功能 (模擬)");
    // In a real app, this would trigger a ZIP download
  };

  const handleAIAnalysis = () => {
    alert(
      "AI 分析結果：班級整體表現良好，小組間合作均衡。第2週作業相比第1週，學生注意力更為集中，留言互動增加25%。"
    );
  };

  if (!classData) {
    return <div>班級不存在</div>;
  }

  return (
    <div>
      <Header userRole="teacher" />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-4 md:mb-0">
            {classData.name}
          </h1>
          <div className="space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
            <button
              onClick={handleBatchDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              批量下載視覺圖
            </button>
            <button
              onClick={handleAIAnalysis}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              一鍵 AI 分析班級視覺圖
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classData.groups.map((group) => (
            <GroupCard
              key={group.id}
              groupData={group}
              classId={classId}
              role="teacher"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
