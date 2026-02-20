import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function MarksChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📈 Marks Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="mid1" fill="#3b82f6" name="Mid-1" />
          <Bar dataKey="mid2" fill="#10b981" name="Mid-2" />
          <Bar dataKey="assignment" fill="#f59e0b" name="Assignment" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded border">
            <p className="font-semibold text-gray-700">{item.subject}</p>
            <p className="text-2xl font-bold text-blue-600">{item.total}/{item.maxMarks}</p>
            <p className="text-sm text-gray-500">
              {((item.total / item.maxMarks) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}