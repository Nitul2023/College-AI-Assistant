import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, Loader2, LogOut, User, Settings, Target, Map } from 'lucide-react';
import { AttendanceTable } from '../components/AttendanceTable';
import { MarksChart } from '../components/MarksChart';
import { WeakSubjects } from '../components/WeakSubjects';
import { StudyPlan } from '../components/StudyPlan';
import { TimetableGrid } from '../components/TimetableGrid';
import { PerformanceSummary } from '../components/PerformanceSummary';
import { TamboService } from '../services/tamboService';
import authService from '../services/authService';
import apiService from '../services/apiService';

const tamboService = new TamboService();

export function Dashboard() {
  const [input, setInput] = useState('');
  const [currentView, setCurrentView] = useState('summary');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  // Load student data on mount
  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const data = await apiService.getStudentData();
      setStudentData(data);
    } catch (error) {
      console.error('Failed to load data:', error);
      if (error.response?.status === 401) {
        authService.logout();
        navigate('/login');
      }
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setChatHistory([...chatHistory, { type: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if user is asking about roadmap
      const roadmapKeywords = ['roadmap', 'learning path', 'career', 'skills', 'how to become'];
      const isRoadmapQuery = roadmapKeywords.some(keyword => 
        userMessage.toLowerCase().includes(keyword)
      );

      if (isRoadmapQuery) {
        setAiReasoning('Navigating to your personalized roadmap');
        setChatHistory(prev => [...prev, { 
          type: 'ai', 
          text: 'Let me show you your personalized learning roadmap! 🗺️',
          component: 'roadmap'
        }]);
        setTimeout(() => navigate('/roadmap'), 1500);
        setIsLoading(false);
        return;
      }

      const decision = await tamboService.decideComponent(userMessage, chatHistory);
      
      console.log('AI Decision:', decision);

      setCurrentView(decision.component);
      setAiReasoning(decision.reasoning);
      
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: decision.reasoning,
        component: decision.component
      }]);

    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComponent = () => {
    if (!studentData) return null;

    const profile = {
      name: currentUser?.name || 'Student',
      rollNo: currentUser?.rollNo || 'N/A',
      branch: currentUser?.branch || 'N/A',
      semester: currentUser?.semester || 'N/A',
      // cgpa: currentUser?.cgpa || 0
    };

    switch(currentView) {
      case 'attendance':
        return <AttendanceTable data={studentData.attendance} />;
      case 'marks':
        return <MarksChart data={studentData.marks} />;
      case 'weak':
        return <WeakSubjects attendance={studentData.attendance} marks={studentData.marks} />;
      case 'study':
        return <StudyPlan marks={studentData.marks} attendance={studentData.attendance} />;
      case 'timetable':
        return <TimetableGrid data={studentData.timetable} />;
      case 'summary':
      default:
        return <PerformanceSummary attendance={studentData.attendance} marks={studentData.marks} profile={profile} />;
    }
  };

  const quickActions = [
    'Show my attendance',
    'Show marks chart',
    'What subjects am I weak in?',
    'Create study plan',
    'Show timetable',
    'Overall performance'
  ];

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Sparkles className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  AI College Assistant
                </h1>
                <p className="text-purple-100 text-sm mt-1">
                  Welcome back, {currentUser?.name}!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {aiReasoning && (
                <div className="hidden md:block bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                  <p className="text-xs text-purple-100 font-semibold">AI Reasoning:</p>
                  <p className="text-sm text-white mt-1">{aiReasoning}</p>
                </div>
              )}

              {/* Roadmap Button */}
              <button
                onClick={() => navigate('/roadmap')}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Map size={18} />
                <span className="hidden md:inline font-semibold">My Roadmap</span>
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold hidden md:inline">{currentUser?.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/skills');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                    >
                      <Target size={18} />
                      Career Roadmap
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/settings');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                    >
                      <Settings size={18} />
                      Settings
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chat Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-purple-500 w-5 h-5" />
                <h3 className="font-bold text-lg text-gray-800">Chat with AI</h3>
              </div>
              
              {/* Chat History */}
              <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-gray-50 rounded-lg p-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Sparkles className="mx-auto text-purple-300 mb-3 w-12 h-12" />
                    <p className="text-gray-500 text-sm">
                      Ask me anything about your academics!
                    </p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg text-sm animate-slide-in ${
                        msg.type === 'user' 
                          ? 'bg-blue-500 text-white ml-8' 
                          : 'bg-purple-100 text-purple-900 mr-8'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-5 py-3 hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>

              {/* AI Status */}
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-purple-600 mb-4 bg-purple-50 p-3 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI is thinking...</span>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">
                  Quick actions
                </p>
                <div className="space-y-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(action)}
                      disabled={isLoading}
                      className="w-full text-left text-xs bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 disabled:opacity-50 transform hover:translate-x-1"
                    >
                      {action}
                    </button>
                  ))}
                  
                  {/* Roadmap Quick Action */}
                  <button
                    onClick={() => navigate('/roadmap')}
                    disabled={isLoading}
                    className="w-full text-left text-xs bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-500 hover:to-blue-500 hover:text-white rounded-lg px-4 py-3 text-green-700 transition-all duration-200 disabled:opacity-50 transform hover:translate-x-1 font-semibold"
                  >
                    🗺️ View My Learning Roadmap
                  </button>
                </div>
              </div>

              {/* Tambo Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white text-center shadow-lg">
                <p className="text-xs font-semibold">⚡ Powered by Tambo AI</p>
                <p className="text-xs opacity-90 mt-1">True Generative UI</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-600">
                Currently showing: <span className="font-semibold text-purple-600">{currentView}</span>
              </p>
            </div>
            
            <div className="animate-fade-in">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* About */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI College Assistant
              </h3>
              <p className="text-gray-600 text-sm">
                Your intelligent companion for academic success. Track attendance, marks, get study plans, and personalized learning roadmaps.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-purple-600 transition">
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/roadmap')} className="text-gray-600 hover:text-purple-600 transition">
                    Learning Roadmap
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/skills')} className="text-gray-600 hover:text-purple-600 transition">
                    Career Planning
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/onboarding')} className="text-gray-600 hover:text-purple-600 transition">
                    Update My Data
                  </button>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Your Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subjects:</span>
                  <span className="font-semibold text-gray-800">{studentData?.subjects?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendance Records:</span>
                  <span className="font-semibold text-gray-800">{studentData?.attendance?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marks Records:</span>
                  <span className="font-semibold text-gray-800">{studentData?.marks?.length || 0}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">CGPA:</span>
                  <span className="font-semibold text-purple-600">{currentUser?.cgpa || '0.00'}</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Built with React, MongoDB, Tambo AI, and ❤️
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Multi-User AI-Powered Platform •  2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}