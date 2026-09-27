import React from 'react';
import { TrendingUp, Award, Target, AlertCircle } from 'lucide-react';

export function PerformanceSummary({ attendance, marks, profile }) {
  const avgAttendance = (attendance.reduce((sum, item) => sum + item.percentage, 0) / attendance.length).toFixed(1);
  const avgMarks = (marks.reduce((sum, item) => sum + (item.total / item.maxMarks) * 100, 0) / marks.length).toFixed(1);
  const subjectsAtRisk = attendance.filter(s => s.percentage < 75).length;
  const topSubject = marks.reduce((max, item) =>
    (item.total / item.maxMarks) > (max.total / max.maxMarks) ? item : max
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Performance Summary</h2>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
        <h3 className="text-2xl font-bold">{profile.name}</h3>
        <p className="text-blue-100">{profile.rollNo} • {profile.branch}</p>
        <p className="text-blue-100">{profile.semester}</p>
        {/* <div className="mt-4 flex items-center gap-2">
          <Award size={24} />
          <span className="text-3xl font-bold">CGPA: {profile.cgpa}</span>
        </div> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg stat-card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <h4 className="font-semibold text-gray-700">Average Attendance</h4>
          </div>
          <p className="text-3xl font-bold text-green-600">{avgAttendance}%</p>
          <p className="text-sm text-gray-600 mt-1">
            {avgAttendance >= 75 ? '✅ On track!' : '⚠️ Needs improvement'}
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-blue-600" size={24} />
            <h4 className="font-semibold text-gray-700">Average Marks</h4>
          </div>
          <p className="text-3xl font-bold text-blue-600">{avgMarks}%</p>
          <p className="text-sm text-gray-600 mt-1">
            Across all subjects
          </p>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-yellow-600" size={24} />
            <h4 className="font-semibold text-gray-700">Subjects at Risk</h4>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{subjectsAtRisk}</p>
          <p className="text-sm text-gray-600 mt-1">
            Below 75% attendance
          </p>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Award className="text-purple-600" size={24} />
            <h4 className="font-semibold text-gray-700">Top Performer</h4>
          </div>
          <p className="text-xl font-bold text-purple-600">{topSubject.subject}</p>
          <p className="text-sm text-gray-600 mt-1">
            {topSubject.total}/{topSubject.maxMarks} ({((topSubject.total / topSubject.maxMarks) * 100).toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">💡 Quick Insights</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {avgAttendance >= 75 ? (
            <li>✅ Your attendance is good across all subjects!</li>
          ) : (
            <li>⚠️ Focus on improving attendance to stay eligible for exams</li>
          )}
          {avgMarks >= 70 ? (
            <li>✅ You're performing well academically!</li>
          ) : (
            <li>📚 Consider dedicating more time to studies</li>
          )}
          <li>🎯 Your strongest subject is {topSubject.subject}</li>
          {subjectsAtRisk > 0 && (
            <li>🚨 {subjectsAtRisk} subject(s) need immediate attention</li>
          )}
        </ul>
      </div>
    </div>
  );
}