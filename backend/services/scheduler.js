const cron = require('node-cron');
const StudentData = require('../models/StudentData');
const sendReminderEmail = require('./notificationService');

function convertToMinutes(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

cron.schedule('* * * * *', async () => {
  console.log('Checking timetable reminders...');

  const students = await StudentData.find();
  const currentMinutes = getCurrentMinutes();

  for (const student of students) {
    for (const cls of student.timetable) {
      const classMinutes = convertToMinutes(cls.time);

      // send 10 mins before class
      if (currentMinutes === classMinutes - 10) {
        await sendReminderEmail(
          student.email,
          cls.subject,
          cls.time
        );

        console.log(
          `Reminder sent for ${cls.subject} at ${cls.time}`
        );
      }
    }
  }
});