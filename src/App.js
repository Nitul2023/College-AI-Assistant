import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { AttendanceTable } from './components/AttendanceTable';
import { MarksChart } from './components/MarksChart';
import { WeakSubjects } from './components/WeakSubjects';
import { StudyPlan } from './components/StudyPlan';
import { TimetableGrid } from './components/TimetableGrid';
import { PerformanceSummary } from './components/PerformanceSummary';
import { studentData } from './data/studentData';
import { TamboService } from './services/tamboService';
import './App.css';

const tamboService = new TamboService();

function App() {
  const [input, setInput] = useState('');
  const [currentView, setCurrentView] = useState('summary');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState('');

  // 🔥 AI-POWERED COMPONENT DECISION
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return;

  const userMessage = input;
  setChatHistory([...chatHistory, { type: 'user', text: userMessage }]);
  setInput('');
  setIsLoading(true);

  try {
    // Call the local AI service (no external API)
    const decision = await tamboService.decideComponent(userMessage, chatHistory);
    
    console.log('AI Decision:', decision); // For debugging

    setCurrentView(decision.component);
    setAiReasoning(decision.reasoning);
    
    setChatHistory(prev => [...prev, { 
      type: 'ai', 
      text: decision.reasoning,
      component: decision.component
    }]);

  } catch (error) {
    console.error('Error:', error);
    
    // Fallback to summary view with helpful message
    setCurrentView('summary');
    setChatHistory(prev => [...prev, { 
      type: 'ai', 
      text: 'I\'m showing your dashboard. You can ask about: attendance, marks, weak subjects, study plan, or timetable.',
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const renderComponent = () => {
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
        return <PerformanceSummary attendance={studentData.attendance} marks={studentData.marks} profile={studentData.profile} />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="text-purple-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">AI College Assistant</h1>
                <p className="text-gray-600 text-sm">Powered by Tambo AI • Generative UI</p>
              </div>
            </div>
            {aiReasoning && (
              <div className="hidden md:block bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-600 font-semibold">AI Reasoning:</p>
                <p className="text-sm text-purple-800">{aiReasoning}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <Sparkles className="text-purple-500" size={20} />
                Chat with AI
              </h3>
              
              {/* Chat History */}
              <div className="h-64 overflow-y-auto mb-4 space-y-2 bg-gray-50 rounded p-3">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Sparkles className="mx-auto text-purple-300 mb-2" size={32} />
                    <p className="text-gray-500 text-sm">
                      Ask me anything about your academics!
                    </p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div key={idx} className={`p-2 rounded text-sm ${
                      msg.type === 'user' 
                        ? 'bg-blue-100 text-blue-900 ml-4' 
                        : 'bg-purple-100 text-purple-900 mr-4'
                    }`}>
                      {msg.text}
                    </div>
                  ))
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
              </form>

              {/* AI Status Indicator */}
              {isLoading && (
                <div className="mt-2 flex items-center gap-2 text-sm text-purple-600">
                  <Loader2 className="animate-spin" size={16} />
                  <span>AI is thinking...</span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2 font-semibold">Quick actions:</p>
                <div className="space-y-1">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(action)}
                      disabled={isLoading}
                      className="w-full text-left text-xs bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-gray-700 transition disabled:opacity-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tambo Badge */}
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white text-center">
                <p className="text-xs font-semibold">⚡ Powered by Tambo AI</p>
                <p className="text-xs opacity-90">True Generative UI</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-600">
                Currently showing: <span className="font-semibold text-purple-600">{currentView}</span>
              </p>
            </div>
            {renderComponent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Built with React, Tambo AI, Recharts, and ❤️</p>
          <p className="mt-1">AI-Powered Generative UI • Hackathon 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;