import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await axios.get('http://localhost:5000/api/feedback');
    setFeedbacks(res.data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/feedback', form);
    setForm({ name: '', email: '', message: '' });
    fetchFeedbacks();
  };

  return (
    <div className="container">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Feedback List</h2>
      <ul>
        {feedbacks.map((f) => (
          <li key={f._id}>
            <strong>{f.name}</strong>: {f.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
