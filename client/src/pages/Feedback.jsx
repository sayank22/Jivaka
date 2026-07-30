import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    concern: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', formData);
    // You can replace this with an API call to save feedback
    toast.success("Thank you for your feedback!");
    setFormData({ name: '', profession: '', concern: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-muted flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Submit Your Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g., Doctor, Patient, Hospital Admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Concern / Message</label>
            <textarea
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Write your message here..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-surface-foreground py-2 px-4 rounded-md hover:bg-primary transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
