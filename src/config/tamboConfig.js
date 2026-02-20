export const tamboConfig = {
  components: {
    attendance: {
      name: "AttendanceTable",
      description: "Shows student attendance with percentages, present/total counts. Use when user asks about attendance, classes attended, or attendance percentage.",
      keywords: ["attendance", "classes", "present", "absent", "percentage"]
    },
    marks: {
      name: "MarksChart",
      description: "Displays marks in bar chart format with mid-term, assignment scores. Use when user asks about marks, scores, grades, performance chart, or academic results.",
      keywords: ["marks", "scores", "grades", "chart", "performance", "results"]
    },
    weak: {
      name: "WeakSubjects",
      description: "Highlights subjects with low attendance (<75%) or low marks (<60%). Use when user asks about weak subjects, struggling areas, subjects needing attention, or improvement areas.",
      keywords: ["weak", "struggling", "low", "attention", "improve", "failing"]
    },
    study: {
      name: "StudyPlan",
      description: "Generates personalized study plan based on weak subjects. Use when user asks for study plan, preparation strategy, how to improve, or exam preparation.",
      keywords: ["study", "plan", "prepare", "strategy", "improve", "exam"]
    },
    timetable: {
      name: "TimetableGrid",
      description: "Shows weekly class schedule with timings, rooms, faculty. Use when user asks about timetable, schedule, classes today/tomorrow, or when is specific subject.",
      keywords: ["timetable", "schedule", "classes", "timing", "when", "today", "tomorrow"]
    },
    summary: {
      name: "PerformanceSummary",
      description: "Complete overview with CGPA, average attendance, average marks, top subjects. Use when user asks for overall performance, summary, dashboard, or general academic status.",
      keywords: ["summary", "performance", "overall", "dashboard", "status", "overview"]
    }
  },

  systemPrompt: `You are an AI college assistant helping students navigate their academic data.

Available components:
- AttendanceTable: Show attendance records
- MarksChart: Display marks in chart form
- WeakSubjects: Highlight subjects needing attention
- StudyPlan: Generate study recommendations
- TimetableGrid: Show weekly schedule
- PerformanceSummary: Overall academic overview

Based on the user's question, decide which component to display. Return ONLY a JSON object in this format:
{
  "component": "componentName",
  "reasoning": "brief explanation"
}

Examples:
User: "Show my attendance"
Response: {"component": "attendance", "reasoning": "User wants to see attendance records"}

User: "Which subjects am I weak in?"
Response: {"component": "weak", "reasoning": "User wants to identify struggling subjects"}

User: "Create a study plan"
Response: {"component": "study", "reasoning": "User needs study recommendations"}

Always return valid JSON. Only use component names from the list above.`
};