import Link from "next/link";

export default function ClassCard({ classData, role }) {
  // 根據任務類型設置不同的樣式
  const getTaskTypeStyle = (taskType) => {
    switch (taskType) {
      case "static":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "dynamic":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <Link
      href={`/${role}/${classData.id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow w-full md:w-64 relative"
    >
      {/* 任務類型標籤 - 僅在老師角色時顯示 */}
      {role === "teacher" && classData.taskType && (
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTaskTypeStyle(
              classData.taskType
            )}`}
          >
            {classData.taskLabel || classData.taskType}
          </span>
        </div>
      )}

      <h3 className="text-xl font-bold text-blue-600 mb-2 pr-16">
        {classData.name}
      </h3>
      <p className="text-gray-600">{classData.groups.length} 個小組</p>

      {/* 任務類型說明文字 - 僅在老師角色時顯示 */}
      {role === "teacher" && classData.taskType && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {classData.taskType === "static"
              ? "📋 固定題型練習"
              : "🔄 互動探索學習"}
          </p>
        </div>
      )}
    </Link>
  );
}
