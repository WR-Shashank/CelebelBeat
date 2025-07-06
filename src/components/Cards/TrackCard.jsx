import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import usePlayerStore from '../../stores/usePlayerStore';

const TrackCard = ({ track, playlist = [], showIndex = false, index }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  
  const handlePlayClick = (e) => {
    e.stopPropagation();
    
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, playlist);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  return (
    <div className={`group flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 ${
      isCurrentTrack ? 'bg-gray-800 bg-opacity-50' : ''
    }`}>
      {/* Index/Play Button */}
      <div className="w-12 flex items-center justify-center">
        {showIndex && !isCurrentTrack ? (
          <span className="text-gray-400 text-sm group-hover:hidden">
            {index + 1}
          </span>
        ) : null}
        
        <button
          onClick={handlePlayClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            showIndex && !isCurrentTrack ? 'hidden group-hover:flex' : 'flex'
          } ${
            isCurrentTrack 
              ? 'bg-purple-500 text-white' 
              : 'bg-white text-black hover:scale-105'
          }`}
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0 ml-3">
        <div className="flex items-center space-x-3">
          <img
            src={track.artwork_url || '/api/placeholder/48/48'}
            alt={track.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          
          <div className="min-w-0 flex-1">
            <h3 className={`font-medium truncate ${
              isCurrentTrack ? 'text-purple-400' : 'text-white'
            }`}>
              {track.title}
            </h3>
            <p className="text-gray-400 text-sm truncate">
              {track.artist}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center space-x-6 text-gray-400 text-sm">
        <span>{formatNumber(track.play_count)} plays</span>
        <span>{formatDuration(track.duration)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 ml-4">
        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all duration-200 p-2">
          <Heart className="w-4 h-4" />
        </button>
        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all duration-200 p-2">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TrackCard;