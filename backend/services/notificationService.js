const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (email, subject, time) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Class Reminder',
      text: `Reminder: Your ${subject} class starts at ${time}`,
    });

    console.log('Reminder email sent');
  } catch (error) {
    console.error('Email error:', error);
  }
};

// module.exports = sendReminderEmail;

// sendReminderEmail(
//   "nitulbora349@gmail.com",
//   "DBMS",
//   "12:13Am"
// );

module.exports = sendReminderEmail;