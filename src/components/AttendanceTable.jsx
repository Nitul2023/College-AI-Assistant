import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function AttendanceTable({ data }) {
  const getStatusIcon = (percentage) => {
    if (percentage >= 75) return <CheckCircle className="text-green-500" size={20} />;
    if (percentage >= 65) return <AlertCircle className="text-yellow-500" size={20} />;
    return <XCircle className="text-red-500" size={20} />;
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 75) return 'bg-green-50 border-green-200';
    if (percentage >= 65) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📊 Attendance Overview</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Code</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Present</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Percentage</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 ${getStatusColor(item.percentage)}`}
              >
                <td className="py-3 px-4">{item.subject}</td>
                <td className="py-3 px-4 text-gray-600">{item.code}</td>
                <td className="text-center py-3 px-4 font-semibold">{item.present}</td>
                <td className="text-center py-3 px-4">{item.total}</td>
                <td className="text-center py-3 px-4">
                  <span className={`font-bold ${item.percentage >= 75 ? 'text-green-600' :
                    item.percentage >= 65 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                    {item.percentage}%
                  </span>
                </td>
                <td className="text-center py-3 px-4">
                  {getStatusIcon(item.percentage)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Maintain at least 75% attendance to be eligible for exams.
        </p>
      </div>
    </div>
  );
}