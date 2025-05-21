"use client";
import { useState, useEffect } from "react";
import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import WeeklyTabs from "@/components/WeeklyTabs";
import HeatmapViewer from "@/components/HeatmapViewer";
import AIFeedback from "@/components/AIFeedback";
import CommentSection from "@/components/CommentSection";

export default function StudentGroupPage({ params }) {
  const { classId, groupId } = params;

  const classData = mockData.classes.find((c) => c.id === classId);
  const groupData = classData?.groups.find((g) => g.id === groupId);

  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [selectedWeekData, setSelectedWeekData] = useState(null);

  useEffect(() => {
    if (groupData && groupData.weeks.length > 0) {
      setSelectedWeekId(groupData.weeks[0].id);
      setSelectedWeekData(groupData.weeks[0]);
    }
  }, [groupData]);

  const handleSelectWeek = (weekId) => {
    const weekData = groupData.weeks.find((w) => w.id === weekId);
    setSelectedWeekId(weekId);
    setSelectedWeekData(weekData);
  };

  if (!classData || !groupData) {
    return <div className="container mx-auto px-4 py-8">小組不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {classData.name} - {groupData.name}
        </h1>
        <p className="text-gray-600 mb-6">
          組員: {groupData.students.join("、")}
        </p>

        {groupData.weeks.length > 0 && selectedWeekData && (
          <>
            <WeeklyTabs
              weeks={groupData.weeks}
              selectedWeekId={selectedWeekId}
              onSelectWeek={handleSelectWeek}
            />
            <HeatmapViewer weekData={selectedWeekData} />
            <AIFeedback weekData={selectedWeekData} />
            <CommentSection comments={selectedWeekData.comments} />
          </>
        )}
      </main>
    </div>
  );
}
