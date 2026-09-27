import React, { useState } from 'react';

export default function TimetableForm() {
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        required
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        required
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        required
        onChange={handleChange}
      />

      <button type="submit">Save Timetable</button>
    </form>
  );
}