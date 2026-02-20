import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export function WeakSubjects({ attendance, marks }) {
  const weakAttendance = attendance.filter(s => s.percentage < 75);
  const weakMarks = marks.filter(m => (m.total / m.maxMarks) * 100 < 60);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <AlertTriangle className="text-red-500" />
        ⚠️ Subjects Needing Attention
      </h2>

      {/* Attendance Issues */}
      {weakAttendance.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-red-700">Low Attendance</h3>
          <div className="space-y-3">
            {weakAttendance.map((subject, index) => (
              <div key={index} className="p-4 bg-red-50 border border-red-200 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{subject.subject}</p>
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                    {subject.percentage}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-red-800">
                  📌 Attend the next <strong>{Math.ceil((0.75 * subject.total - subject.present) / 0.25)}</strong> classes to reach 75%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marks Issues */}
      {weakMarks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-700 flex items-center gap-2">
            <TrendingDown size={20} />
            Low Performance
          </h3>
          <div className="space-y-3">
            {weakMarks.map((subject, index) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-800">{subject.subject}</p>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                    {subject.total}/{subject.maxMarks}
                  </span>
                </div>
                <p className="mt-2 text-sm text-yellow-800">
                  📚 Focus on improving scores in upcoming assessments
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {weakAttendance.length === 0 && weakMarks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-green-600 text-lg font-semibold">🎉 Great job! All subjects are on track!</p>
        </div>
      )}
    </div>
  );
}