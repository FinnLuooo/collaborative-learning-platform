import Link from "next/link";

export default function RoleButton({ role, label, color, icon }) {
  return (
    <Link
      href={`/${role}`}
      className={`flex flex-col items-center justify-center p-8 rounded-xl transition-transform transform hover:scale-105 ${color} text-white text-center w-full md:w-64 h-64`}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold">{label}</h3>
    </Link>
  );
}
