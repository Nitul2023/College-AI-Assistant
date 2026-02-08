import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, ArrowRight, Target, Code, Zap, Star } from 'lucide-react';
import skillsService from '../services/skillsService';

const SKILL_CATEGORIES = {
  'Programming Languages': [
    'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'TypeScript', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ],
  'Web Development': [
    'HTML/CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Next.js', 'Tailwind CSS'
  ],
  'Mobile Development': [
    'React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Ionic', 'Xamarin'
  ],
  'Data Science & ML': [
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'NLP', 'Computer Vision'
  ],
  'Database': [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'SQL', 'Oracle', 'Cassandra'
  ],
  'DevOps & Cloud': [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Jenkins', 'Terraform', 'Ansible'
  ],
  'Other': [
    'Git', 'Linux', 'REST APIs', 'GraphQL', 'Testing', 'Agile', 'UI/UX Design', 'Cybersecurity'
  ]
};

const CAREER_GOALS = [
  { id: 'Full Stack Developer', icon: Code, color: 'blue' },
  { id: 'Data Scientist', icon: Target, color: 'purple' },
  { id: 'Mobile App Developer', icon: Zap, color: 'green' },
  { id: 'Machine Learning Engineer', icon: Star, color: 'orange' },
  { id: 'DevOps Engineer', icon: Code, color: 'red' },
  { id: 'Cybersecurity Specialist', icon: Target, color: 'pink' },
  { id: 'UI/UX Designer', icon: Zap, color: 'indigo' },
  { id: 'Game Developer', icon: Star, color: 'yellow' }
];

export default function SkillSelector() {
  const [step, setStep] = useState(1); // 1: Goal, 2: Skills, 3: Level
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    try {
      // Save skills
      const skillsToSave = selectedSkills.map(name => ({
        name,
        category: Object.keys(SKILL_CATEGORIES).find(cat => 
          SKILL_CATEGORIES[cat].includes(name)
        ),
        level: skillLevel
      }));

      await skillsService.addSkills(skillsToSave);

      // Generate roadmap
      await skillsService.generateRoadmap(selectedGoal, selectedSkills, skillLevel);

      // Navigate to roadmap view
      navigate('/roadmap');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto py-8">
        
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s < step ? <CheckCircle size={24} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      s < step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Step {step} of 3: {
                step === 1 ? 'Choose Your Career Goal' :
                step === 2 ? 'Select Your Current Skills' :
                'Set Your Level'
              }
            </p>
          </div>
        </div>

        {/* Step 1: Career Goal Selection */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                🎯 What's Your Career Goal?
              </h2>
              <p className="text-gray-600">
                Choose the career path you want to pursue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CAREER_GOALS.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoal === goal.id;
                
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      isSelected
                        ? `border-${goal.color}-500 bg-${goal.color}-50 shadow-lg`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-12 h-12 mx-auto mb-3 ${
                      isSelected ? `text-${goal.color}-600` : 'text-gray-400'
                    }`} />
                    <h3 className="font-semibold text-gray-800 text-center">
                      {goal.id}
                    </h3>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedGoal}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 mx-auto"
              >
                Next: Select Skills
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Skill Selection */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                💪 Select Your Current Skills
              </h2>
              <p className="text-gray-600">
                Choose all the skills you already have (we'll build your roadmap based on what you know)
              </p>
              <p className="text-sm text-purple-600 mt-2">
                Selected: {selectedSkills.length} skills
              </p>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                <div key={category} className="border-b border-gray-200 pb-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {skills.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                            isSelected
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected ? (
                              <CheckCircle size={16} className="text-purple-600" />
                            ) : (
                              <Circle size={16} className="text-gray-400" />
                            )}
                            {skill}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
              >
                Next: Set Level
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                📊 What's Your Experience Level?
              </h2>
              <p className="text-gray-600">
                This helps us create a roadmap at the right difficulty for you
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
                const isSelected = skillLevel === level;
                
                return (
                  <button
                    key={level}
                    onClick={() => setSkillLevel(level)}
                    className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{level}</h3>
                        <p className="text-sm text-gray-600">
                          {level === 'Beginner' && 'Just starting out or learning the basics'}
                          {level === 'Intermediate' && 'Comfortable with fundamentals, ready for advanced topics'}
                          {level === 'Advanced' && 'Expert level, looking to specialize or master'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 max-w-2xl mx-auto">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-blue-800 mb-2">📋 Summary</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> {selectedGoal}</p>
                  <p><strong>Skills:</strong> {selectedSkills.length} selected</p>
                  <p><strong>Level:</strong> {skillLevel}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleGenerateRoadmap}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Generate My Roadmap
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillSelector;
