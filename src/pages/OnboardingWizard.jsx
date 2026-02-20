import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, ArrowRight, ArrowLeft, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import apiService from '../services/apiService';

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Subjects
  const [subjects, setSubjects] = useState([
    { name: '', code: '', faculty: '' }
  ]);

  // Step 2: Attendance
  const [attendance, setAttendance] = useState([]);

  // Step 3: Marks
  const [marks, setMarks] = useState([]);

  // Step 4: Timetable
  const [timetable, setTimetable] = useState([]);

  // Add subject
  const addSubject = () => {
    setSubjects([...subjects, { name: '', code: '', faculty: '' }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  // Generate attendance & marks from subjects
  const generateAttendanceAndMarks = () => {
    const attendanceData = subjects
      .filter(s => s.name && s.code)
      .map(s => ({
        subject: s.name,
        code: s.code,
        present: 0,
        total: 0,
        percentage: 0,
        lastClass: new Date()
      }));

    const marksData = subjects
      .filter(s => s.name && s.code)
      .map(s => ({
        subject: s.code,
        mid1: 0,
        mid2: 0,
        assignment: 0,
        total: 0,
        maxMarks: 100
      }));

    setAttendance(attendanceData);
    setMarks(marksData);
  };

  // Update attendance
  const updateAttendance = (index, field, value) => {
    const updated = [...attendance];
    updated[index][field] = parseInt(value) || 0;
    updated[index].percentage = updated[index].total > 0 
      ? Math.round((updated[index].present / updated[index].total) * 100) 
      : 0;
    setAttendance(updated);
  };

  // Update marks
  const updateMarks = (index, field, value) => {
    const updated = [...marks];
    updated[index][field] = parseInt(value) || 0;
    updated[index].total = (updated[index].mid1 || 0) + (updated[index].mid2 || 0) + (updated[index].assignment || 0);
    setMarks(updated);
  };

  // Add timetable entry
  const addTimetableEntry = () => {
    setTimetable([
      ...timetable,
      { day: 'Monday', time: '', subject: '', room: '', faculty: '' }
    ]);
  };

  const removeTimetableEntry = (index) => {
    setTimetable(timetable.filter((_, i) => i !== index));
  };

  const updateTimetableEntry = (index, field, value) => {
    const updated = [...timetable];
    updated[index][field] = value;
    setTimetable(updated);
  };

  // Handle next step
  const handleNext = () => {
    if (step === 1) {
      generateAttendanceAndMarks();
    }
    setStep(step + 1);
  };

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const validSubjects = subjects.filter(s => s.name && s.code);
      
      await apiService.bulkSetup({
        subjects: validSubjects,
        attendance: attendance,
        marks: marks,
        timetable: timetable
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Setup error:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s < step ? <CheckCircle size={20} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-1 w-16 md:w-32 mx-2 transition-all ${
                      s < step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Step {step} of 4: {
                step === 1 ? 'Add Subjects' :
                step === 2 ? 'Set Attendance' :
                step === 3 ? 'Enter Marks' :
                'Create Timetable (Optional)'
              }
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Step 1: Subjects */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Add Your Subjects</h2>
                  <p className="text-gray-600">Enter details for all your subjects this semester</p>
                </div>
              </div>

              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <input
                      type="text"
                      placeholder="Subject Name (e.g., Data Structures)"
                      value={subject.name}
                      onChange={(e) => updateSubject(index, 'name', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Code (e.g., CSE201)"
                      value={subject.code}
                      onChange={(e) => updateSubject(index, 'code', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Faculty Name"
                      value={subject.faculty}
                      onChange={(e) => updateSubject(index, 'faculty', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeSubject(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addSubject}
                className="mt-4 bg-purple-100 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-200 transition flex items-center gap-2 font-semibold"
              >
                <Plus size={20} />
                Add Another Subject
              </button>
            </div>
          )}

          {/* Step 2: Attendance */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Set Current Attendance</h2>
                  <p className="text-gray-600">Enter your attendance data for each subject</p>
                </div>
              </div>

              <div className="space-y-4">
                {attendance.map((att, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">{att.subject}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Classes Attended
                        </label>
                        <input
                          type="number"
                          value={att.present}
                          onChange={(e) => updateAttendance(index, 'present', e.target.value)}
                          min="0"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Total Classes
                        </label>
                        <input
                          type="number"
                          value={att.total}
                          onChange={(e) => updateAttendance(index, 'total', e.target.value)}
                          min="0"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Percentage
                        </label>
                        <div className={`px-4 py-2 rounded-lg font-bold text-center ${
                          att.percentage >= 75 ? 'bg-green-100 text-green-700' :
                          att.percentage >= 65 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {att.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Marks */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Enter Your Marks</h2>
                  <p className="text-gray-600">Add marks for Mid-terms and Assignments</p>
                </div>
              </div>

              <div className="space-y-4">
                {marks.map((mark, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">
                      {attendance[index]?.subject || mark.subject}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mid-Term 1 (out of 30)
                        </label>
                        <input
                          type="number"
                          value={mark.mid1}
                          onChange={(e) => updateMarks(index, 'mid1', e.target.value)}
                          min="0"
                          max="30"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mid-Term 2 (out of 30)
                        </label>
                        <input
                          type="number"
                          value={mark.mid2}
                          onChange={(e) => updateMarks(index, 'mid2', e.target.value)}
                          min="0"
                          max="30"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Assignments (out of 40)
                        </label>
                        <input
                          type="number"
                          value={mark.assignment}
                          onChange={(e) => updateMarks(index, 'assignment', e.target.value)}
                          min="0"
                          max="40"
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Total
                        </label>
                        <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-center">
                          {mark.total}/100
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Timetable */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Create Timetable (Optional)</h2>
                  <p className="text-gray-600">Add your weekly class schedule</p>
                </div>
              </div>

              <div className="space-y-4">
                {timetable.map((entry, index) => (
                  <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <select
                      value={entry.day}
                      onChange={(e) => updateTimetableEntry(index, 'day', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    >
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Time (9:00-10:00)"
                      value={entry.time}
                      onChange={(e) => updateTimetableEntry(index, 'time', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      value={entry.subject}
                      onChange={(e) => updateTimetableEntry(index, 'subject', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Room"
                      value={entry.room}
                      onChange={(e) => updateTimetableEntry(index, 'room', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Faculty"
                      value={entry.faculty}
                      onChange={(e) => updateTimetableEntry(index, 'faculty', e.target.value)}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeTimetableEntry(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addTimetableEntry}
                className="mt-4 bg-purple-100 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-200 transition flex items-center gap-2 font-semibold"
              >
                <Plus size={20} />
                Add Class
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 font-semibold"
              >
                <ArrowLeft size={20} />
                Previous
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && subjects.filter(s => s.name && s.code).length === 0}
                className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="ml-auto bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition flex items-center gap-2 font-semibold disabled:opacity-50"
              >
                {loading ? 'Saving...' : (
                  <>
                    <CheckCircle size={20} />
                    Complete Setup
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}