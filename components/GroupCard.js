import Link from "next/link";

export default function GroupCard({ groupData, classId, role }) {
  return (
    <Link
      href={`/${role}/${classId}/${groupData.id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-bold text-blue-600 mb-2">{groupData.name}</h3>
      <p className="text-gray-600 mb-2">
        學生: {groupData.students.join("、")}
      </p>
      {role === "teacher" && (
        <>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>進度</span>
              <span>{groupData.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${groupData.progress}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-600">留言數: {groupData.commentCount}</p>
        </>
      )}
    </Link>
  );
}
