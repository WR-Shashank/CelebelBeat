import React, { useState } from 'react';
import { Heart, Music, Clock, Download, MoreHorizontal } from 'lucide-react';
import Header from '../components/Layout/Header';
import TrackCard from '../components/Cards/TrackCard';

const Library = () => {
  const [activeTab, setActiveTab] = useState('liked');
  
  // Mock data for demonstration
  const likedSongs = [
    {
      id: 'liked-1',
      title: 'Midnight Dreams',
      artist: 'Electronic Artist',
      duration: 245,
      artwork_url: '/api/placeholder/48/48',
      stream_url: '#',
      play_count: 15420,
      favorite_count: 892,
      genre: 'Electronic'
    },
    {
      id: 'liked-2',
      title: 'Neon Lights',
      artist: 'Synthwave Producer',
      duration: 198,
      artwork_url: '/api/placeholder/48/48',
      stream_url: '#',
      play_count: 8765,
      favorite_count: 543,
      genre: 'Synthwave'
    }
  ];

  const playlists = [
    {
      id: 'playlist-1',
      name: 'My Favorites',
      description: 'All my favorite tracks',
      track_count: 25,
      artwork_url: '/api/placeholder/200/200',
      created_at: '2024-01-15'
    },
    {
      id: 'playlist-2',
      name: 'Workout Mix',
      description: 'High energy tracks for workouts',
      track_count: 18,
      artwork_url: '/api/placeholder/200/200',
      created_at: '2024-01-10'
    }
  ];

  const tabs = [
    { id: 'liked', label: 'Liked Songs', icon: Heart },
    { id: 'playlists', label: 'Playlists', icon: Music },
    { id: 'recent', label: 'Recently Played', icon: Clock },
    { id: 'downloads', label: 'Downloads', icon: Download },
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black">
      <Header title="Your Library" subtitle="Your music collection" />
      
      <div className="px-6 pb-32">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 bg-opacity-50 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'liked' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Liked Songs</h2>
                  <p className="text-gray-400">{likedSongs.length} songs</p>
                </div>
              </div>
              
              <button className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                Play All
              </button>
            </div>
            
            <div className="space-y-2">
              {likedSongs.map((track, index) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={likedSongs}
                  showIndex={true}
                  index={index}
                />
              ))}
            </div>
            
            {likedSongs.length === 0 && (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No liked songs yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Songs you like will appear here
                </p>
                <button className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                  Find Music
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                Create Playlist
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-900 bg-opacity-50 rounded-lg p-4 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative mb-4">
                    <img
                      src={playlist.artwork_url}
                      alt={playlist.name}
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    
                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-lg">
                      <Music className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold truncate">
                      {playlist.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {playlist.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                      <span>{playlist.track_count} tracks</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {playlists.length === 0 && (
              <div className="text-center py-16">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No playlists yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first playlist to get started
                </p>
                <button className="bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                  Create Playlist
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No recent activity
            </h3>
            <p className="text-gray-500">
              Your recently played tracks will appear here
            </p>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="text-center py-16">
            <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No downloads
            </h3>
            <p className="text-gray-500">
              Downloaded tracks will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;