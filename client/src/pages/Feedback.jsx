import React, { useState } from 'react';

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
    alert("Thank you for your feedback!");
    setFormData({ name: '', profession: '', concern: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Submit Your Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g., Doctor, Patient, Hospital Admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Concern / Message</label>
            <textarea
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Write your message here..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
