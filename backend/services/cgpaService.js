class CGPAService {
  
  // Calculate CGPA from marks (out of 100)
  calculateCGPA(marks) {
    if (!marks || marks.length === 0) return 0;

    // Convert marks to grade points (10-point scale)
    const gradePoints = marks.map(mark => {
      const percentage = (mark.total / mark.maxMarks) * 100;
      return this.percentageToGradePoint(percentage);
    });

    // Calculate average
    const totalGradePoints = gradePoints.reduce((sum, gp) => sum + gp, 0);
    const cgpa = totalGradePoints / gradePoints.length;

    return Math.round(cgpa * 100) / 100; // Round to 2 decimal places
  }

  // Convert percentage to grade point (10-point scale)
  percentageToGradePoint(percentage) {
    if (percentage >= 90) return 10;
    if (percentage >= 80) return 9;
    if (percentage >= 70) return 8;
    if (percentage >= 60) return 7;
    if (percentage >= 50) return 6;
    if (percentage >= 40) return 5;
    if (percentage >= 35) return 4;
    return 0;
  }

  // Calculate semester GPA
  calculateSemesterGPA(subjects) {
    if (!subjects || subjects.length === 0) return 0;

    const totalCredits = subjects.reduce((sum, sub) => sum + (sub.credits || 3), 0);
    const weightedGradePoints = subjects.reduce((sum, sub) => {
      const credits = sub.credits || 3;
      const gradePoint = this.percentageToGradePoint(sub.percentage);
      return sum + (gradePoint * credits);
    }, 0);

    return Math.round((weightedGradePoints / totalCredits) * 100) / 100;
  }

  // Get letter grade from percentage
  getLetterGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    if (percentage >= 35) return 'D';
    return 'F';
  }

  // Get grade description
  getGradeDescription(cgpa) {
    if (cgpa >= 9.0) return 'Outstanding';
    if (cgpa >= 8.0) return 'Excellent';
    if (cgpa >= 7.0) return 'Very Good';
    if (cgpa >= 6.0) return 'Good';
    if (cgpa >= 5.0) return 'Average';
    if (cgpa >= 4.0) return 'Pass';
    return 'Fail';
  }
}

module.exports = new CGPAService();