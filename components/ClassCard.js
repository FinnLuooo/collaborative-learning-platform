import Link from "next/link";

export default function ClassCard({ classData, role }) {
  return (
    <Link
      href={`/${role}/${classData.id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow w-full md:w-64"
    >
      <h3 className="text-xl font-bold text-blue-600 mb-2">{classData.name}</h3>
      <p className="text-gray-600">{classData.groups.length} 個小組</p>
    </Link>
  );
}
