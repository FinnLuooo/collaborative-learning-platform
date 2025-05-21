"use client";
import { useState } from "react";

export default function WeeklyTabs({ weeks, onSelectWeek }) {
  const [activeWeek, setActiveWeek] = useState(weeks[0].id);

  const handleWeekClick = (weekId) => {
    setActiveWeek(weekId);
    onSelectWeek(weekId);
  };

  return (
    <div className="mb-6">
      <div className="flex border-b">
        {weeks.map((week) => (
          <button
            key={week.id}
            className={`py-2 px-4 font-medium ${
              activeWeek === week.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => handleWeekClick(week.id)}
          >
            Week {week.id}
          </button>
        ))}
      </div>
    </div>
  );
}
