import React from 'react';
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  Plus,
  Music,
  TrendingUp,
  Radio,
  Mic2,
  Headphones
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const discoverItems = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'genres', label: 'Genres', icon: Music },
    { id: 'radio', label: 'Radio', icon: Radio },
    { id: 'artists', label: 'Artists', icon: Mic2 },
  ];

  const libraryItems = [
    { id: 'liked', label: 'Liked Songs', icon: Heart },
    { id: 'playlists', label: 'Playlists', icon: Headphones },
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CelbelBeat 
          </h1>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Discover Section */}
        <div className="mt-8">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider px-3 mb-3">
            Discover
          </h3>
          <div className="space-y-1">
            {discoverItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Library Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-3 mb-3">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
              Your Library
            </h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {libraryItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4">
          <h4 className="text-white font-semibold text-sm mb-1">
            Discover New Music
          </h4>
          <p className="text-purple-100 text-xs mb-3">
            Explore trending tracks and artists on Audius
          </p>
          <button className="bg-white text-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;