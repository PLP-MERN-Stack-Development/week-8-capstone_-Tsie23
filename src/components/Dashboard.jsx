import React from 'react';

function Dashboard({ user, onLogout }) {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
      <p className="mb-6">This is your dashboard. Here you can manage your projects, view templates, and more.</p>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;