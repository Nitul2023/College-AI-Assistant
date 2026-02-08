export class TamboService {
  
  async decideComponent(userMessage, chatHistory = []) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const message = userMessage.toLowerCase();

    // Keyword matching for component selection
    if (message.includes('attendance') || message.includes('present') || message.includes('absent')) {
      return {
        component: 'attendance',
        reasoning: 'Showing your attendance records based on your query about attendance.'
      };
    }

    if (message.includes('marks') || message.includes('grades') || message.includes('score')) {
      return {
        component: 'marks',
        reasoning: 'Displaying your marks and grades as you requested.'
      };
    }

    if (message.includes('weak') || message.includes('struggling') || message.includes('difficult')) {
      return {
        component: 'weak',
        reasoning: 'Analyzing subjects where you need improvement based on your performance.'
      };
    }

    if (message.includes('study plan') || message.includes('study') || message.includes('plan')) {
      return {
        component: 'study',
        reasoning: 'Creating a personalized study plan to help you improve.'
      };
    }

    if (message.includes('timetable') || message.includes('schedule') || message.includes('classes')) {
      return {
        component: 'timetable',
        reasoning: 'Showing your class timetable and schedule.'
      };
    }

    if (message.includes('performance') || message.includes('summary') || message.includes('overview')) {
      return {
        component: 'summary',
        reasoning: 'Displaying your overall academic performance summary.'
      };
    }

    // Default to summary
    return {
      component: 'summary',
      reasoning: 'Showing your overall performance summary. You can ask about specific topics like attendance, marks, or study plans.'
    };
  }
}

