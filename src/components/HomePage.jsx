import React from 'react';

function HomePage({ onGetStarted, onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <h1 className="text-4xl font-bold text-white mb-4">Code Compass</h1>
      <p className="text-lg text-gray-300 mb-8">
        Interactive learning tool for beginner coders to build full coding projects with guided structure and explanations.
      </p>
      <div className="space-x-4">
        <button
          onClick={onGetStarted}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </button>
        <button
          onClick={onLogin}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default HomePage;