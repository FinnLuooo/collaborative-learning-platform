import { mockData } from "@/data/mockData";
import Header from "@/components/Header";
import ClassCard from "@/components/ClassCard";

export default function StudentPage() {
  const classes = mockData.classes;

  return (
    <div>
      <Header userRole="student" />
      <main className="container mx-auto px-4 py-8">
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
