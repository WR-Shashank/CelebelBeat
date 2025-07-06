import React from 'react';
import { ChevronLeft, ChevronRight, User, Settings, Bell } from 'lucide-react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="bg-gradient-to-b from-gray-900 to-transparent p-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        {subtitle && (
          <p className="text-gray-400 text-lg">{subtitle}</p>
        )}
      </div>
    </header>
  );
};

export default Header;