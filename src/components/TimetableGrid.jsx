import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';

export function TimetableGrid({ data }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const getClassesForDay = (day) => {
    return data.filter(item => item.day === day).sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]);
      const timeB = parseInt(b.time.split(':')[0]);
      return timeA - timeB;
    });
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'DSA': 'bg-blue-100 border-blue-300 text-blue-800',
      'DBMS': 'bg-green-100 border-green-300 text-green-800',
      'OS': 'bg-purple-100 border-purple-300 text-purple-800',
      'CN': 'bg-orange-100 border-orange-300 text-orange-800',
      'SE': 'bg-pink-100 border-pink-300 text-pink-800',
      'DSA Lab': 'bg-indigo-100 border-indigo-300 text-indigo-800',
      'DBMS Lab': 'bg-teal-100 border-teal-300 text-teal-800',
    };
    return colors[subject] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  return (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🗓️ Weekly Timetable</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map(day => (
          <div key={day} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 text-center font-bold">
              {day}
            </div>
            <div className="p-2 space-y-2">
              {getClassesForDay(day).map((classItem, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded border-l-4 ${getSubjectColor(classItem.subject)}`}
                >
                  <p className="font-bold text-sm mb-1">{classItem.subject}</p>
                  <p className="text-xs flex items-center gap-1 mb-1">
                    <Clock size={12} />
                    {classItem.time}
                  </p>
                  <p className="text-xs flex items-center gap-1 mb-1">
                    <MapPin size={12} />
                    {classItem.room}
                  </p>
                  <p className="text-xs flex items-center gap-1">
                    <User size={12} />
                    {classItem.faculty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}