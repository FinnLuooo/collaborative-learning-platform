import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import GroupCard from "@/components/GroupCard";

export default function StudentClassPage({ params }) {
  const { classId } = params;
  const classData = mockData.classes.find((c) => c.id === classId);

  if (!classData) {
    return <div>班級不存在</div>;
  }

  return (
    <div>
      <Header userRole="student" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {classData.name}
        </h1>
        <p className="text-gray-600 mb-6">請選擇您的小組</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classData.groups.map((group) => (
            <GroupCard
              key={group.id}
              groupData={group}
              classId={classId}
              role="student"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
