import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';

const PlaylistCard = ({ playlist, onClick }) => {
  const handlePlayClick = (e) => {
    e.stopPropagation();
    // Handle play playlist
  };

  return (
    <div 
      onClick={onClick}
      className="bg-gray-900 bg-opacity-50 rounded-lg p-4 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative mb-4">
        <img
          src={playlist.artwork_url || '/api/placeholder/200/200'}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        
        <button
          onClick={handlePlayClick}
          className="absolute bottom-2 right-2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Play className="w-5 h-5 ml-0.5" />
        </button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-white font-semibold truncate">
          {playlist.name}
        </h3>
        
        <p className="text-gray-400 text-sm">
          By {playlist.owner}
        </p>
        
        <div className="flex items-center justify-between text-gray-400 text-xs">
          <span>{playlist.track_count} tracks</span>
          <div className="flex items-center space-x-2">
            <Heart className="w-3 h-3" />
            <span>{playlist.favorite_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;