import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Clock, BookOpen, ExternalLink, ChevronDown, ChevronUp, Target, Award } from 'lucide-react';
import skillsService from '../services/skillsService';

export function RoadmapView() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSteps, setExpandedSteps] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const loadRoadmaps = async () => {
    try {
      const data = await skillsService.getRoadmaps();
      setRoadmaps(data.roadmaps || []);
    } catch (error) {
      console.error('Failed to load roadmaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (roadmapIndex, stepIndex) => {
    const key = `${roadmapIndex}-${stepIndex}`;
    setExpandedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleStepComplete = async (roadmapId, stepIndex, currentStatus) => {
    try {
      await skillsService.updateStepCompletion(roadmapId, stepIndex, !currentStatus);
      await loadRoadmaps(); // Reload to show updated status
    } catch (error) {
      console.error('Failed to update step:', error);
    }
  };

  const calculateProgress = (roadmap) => {
    const completedSteps = roadmap.steps.filter(s => s.completed).length;
    return Math.round((completedSteps / roadmap.steps.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-xl shadow-lg p-12 max-w-md">
          <Target className="w-24 h-24 text-purple-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Roadmap Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't created a learning roadmap yet. Let's build one together!
          </p>
          <button
            onClick={() => navigate('/skills')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Create My Roadmap
          </button>
        </div>
      </div>
    );
  }

  const latestRoadmap = roadmaps[roadmaps.length - 1];
  const progress = calculateProgress(latestRoadmap);
  const completedSteps = latestRoadmap.steps.filter(s => s.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">🗺️ Your Learning Roadmap</h1>
              <p className="text-purple-100 text-lg">Goal: {latestRoadmap.goal}</p>
            </div>
            <button
              onClick={() => navigate('/skills')}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Create New Roadmap
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Overall Progress</span>
              <span className="text-sm font-semibold">{completedSteps} / {latestRoadmap.steps.length} Steps</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
              >
                <span className="text-xs font-bold text-purple-600">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Skills Badge */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-purple-100">Your skills:</span>
            {latestRoadmap.skills.slice(0, 5).map((skill, i) => (
              <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
            {latestRoadmap.skills.length > 5 && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                +{latestRoadmap.skills.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-4">
          {latestRoadmap.steps.map((step, index) => {
            const isExpanded = expandedSteps[`0-${index}`];
            const isCompleted = step.completed;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
                  isCompleted ? 'border-2 border-green-200' : 'border-2 border-transparent'
                }`}
              >
                {/* Step Header */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Completion Checkbox */}
                    <button
                      onClick={() => handleStepComplete(latestRoadmap._id, index, isCompleted)}
                      className="flex-shrink-0 mt-1"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-300 hover:text-purple-600 transition" />
                      )}
                    </button>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-2 ${
                            isCompleted ? 'text-green-700 line-through' : 'text-gray-800'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-purple-600">
                              <Clock size={16} />
                              <span className="font-medium">{step.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-blue-600">
                              <BookOpen size={16} />
                              <span className="font-medium">{step.resources.length} Resources</span>
                            </div>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => toggleStep(0, index)}
                          className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-6 h-6 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Resources */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4 animate-fade-in">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <BookOpen size={18} className="text-purple-600" />
                      Learning Resources
                    </h4>
                    <ul className="space-y-2">
                      {step.resources.map((resource, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ExternalLink size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Badge */}
        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg p-8 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
            <p className="text-lg">You've completed your {latestRoadmap.goal} roadmap!</p>
            <button
              onClick={() => navigate('/skills')}
              className="mt-6 bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Start Another Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}