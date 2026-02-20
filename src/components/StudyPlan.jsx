import React from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';

export function StudyPlan({ marks, attendance }) {
  // Generate study plan based on weak subjects
  const generatePlan = () => {
    const plan = [];

    // Prioritize subjects with low marks
    const weakMarks = marks
      .map(m => ({ ...m, percentage: (m.total / m.maxMarks) * 100 }))
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);

    weakMarks.forEach((subject, index) => {
      plan.push({
        day: `Week ${index + 1}`,
        subject: subject.subject,
        hours: 3,
        topics: [
          'Review previous exam questions',
          'Complete practice problems',
          'Watch video tutorials',
          'Make summary notes'
        ],
        priority: subject.percentage < 50 ? 'High' : subject.percentage < 70 ? 'Medium' : 'Low'
      });
    });

    return plan;
  };

  const studyPlan = generatePlan();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Calendar className="text-blue-500" />
        📅 Personalized Study Plan
      </h2>

      <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
        <p className="text-sm text-blue-800">
          ✨ This plan is generated based on your current performance. Focus on subjects that need the most attention!
        </p>
      </div>

      <div className="space-y-4">
        {studyPlan.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition card-hover scale-in">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.subject}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <Clock size={14} />
                  {item.day} • {item.hours} hours
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(item.priority)}`}>
                {item.priority} Priority
              </span>
            </div>

            <div className="pl-4 border-l-2 border-blue-200">
              <p className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen size={16} />
                Focus Areas:
              </p>
              <ul className="space-y-1">
                {item.topics.map((topic, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}