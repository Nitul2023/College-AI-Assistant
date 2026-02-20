export class TamboService {
  
  // Smart keyword-based AI decision (works offline)
  async decideComponent(userMessage, chatHistory = []) {
    return new Promise((resolve) => {
      // Simulate AI thinking (makes it feel real)
      setTimeout(() => {
        const decision = this.analyzeMessage(userMessage);
        resolve(decision);
      }, 800); // 800ms delay to simulate AI processing
    });
  }

  analyzeMessage(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Attendance keywords
    if (this.matchesKeywords(msg, [
      'attendance', 'present', 'absent', 'classes attended', 
      'how many classes', 'class percentage', 'attended'
    ])) {
      return {
        component: 'attendance',
        reasoning: 'Showing your attendance records across all subjects'
      };
    }
    
    // Marks keywords
    if (this.matchesKeywords(msg, [
      'marks', 'score', 'grades', 'chart', 'performance',
      'exam', 'test', 'results', 'academic'
    ])) {
      return {
        component: 'marks',
        reasoning: 'Displaying your marks in visual chart format'
      };
    }
    
    // Weak subjects keywords
    if (this.matchesKeywords(msg, [
      'weak', 'struggling', 'low', 'failing', 'bad',
      'need attention', 'improve', 'problem', 'issue'
    ])) {
      return {
        component: 'weak',
        reasoning: 'Identifying subjects that need your attention'
      };
    }
    
    // Study plan keywords
    if (this.matchesKeywords(msg, [
      'study', 'plan', 'prepare', 'strategy', 'exam prep',
      'how to study', 'preparation', 'schedule'
    ])) {
      return {
        component: 'study',
        reasoning: 'Creating a personalized study plan for you'
      };
    }
    
    // Timetable keywords
    if (this.matchesKeywords(msg, [
      'timetable', 'schedule', 'classes', 'timing', 'when',
      'today', 'tomorrow', 'weekly', 'calendar'
    ])) {
      return {
        component: 'timetable',
        reasoning: 'Showing your weekly class timetable'
      };
    }
    
    // Summary/Overall keywords
    if (this.matchesKeywords(msg, [
      'summary', 'overall', 'performance', 'dashboard',
      'status', 'overview', 'everything', 'complete'
    ])) {
      return {
        component: 'summary',
        reasoning: 'Displaying your complete academic overview'
      };
    }
    
    // Default fallback
    return {
      component: 'summary',
      reasoning: 'Here\'s your academic dashboard. Try asking about attendance, marks, or study plans!'
    };
  }

  // Helper function to match keywords
  matchesKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  // Advanced: Analyze intent based on question structure
  analyzeIntent(message) {
    const msg = message.toLowerCase();
    
    // Question patterns
    if (msg.startsWith('show') || msg.startsWith('display')) {
      if (msg.includes('attendance')) return 'attendance';
      if (msg.includes('marks') || msg.includes('grades')) return 'marks';
      if (msg.includes('timetable') || msg.includes('schedule')) return 'timetable';
    }
    
    if (msg.startsWith('what') || msg.startsWith('which')) {
      if (msg.includes('weak') || msg.includes('struggling')) return 'weak';
    }
    
    if (msg.startsWith('create') || msg.startsWith('make') || msg.startsWith('help')) {
      if (msg.includes('study') || msg.includes('plan')) return 'study';
    }
    
    return null;
  }
}