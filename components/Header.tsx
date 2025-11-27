
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-4">
        <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Academic AI Assistant</h1>
          <p className="text-sm text-gray-400">Your Partner in Data Science & Machine Learning Research</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
