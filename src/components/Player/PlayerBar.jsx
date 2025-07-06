import React, { useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  MoreHorizontal
} from 'lucide-react';
import usePlayerStore from '../../stores/usePlayerStore';

const PlayerBar = () => {
  const audioRef = useRef(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading,
    repeatMode,
    isShuffled,
    setAudioElement,
    togglePlay,
    setVolume,
    setCurrentTime,
    updateTime,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
    }
  }, [setAudioElement]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      updateTime(audio.currentTime, audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handleLoadedMetadata = () => {
      updateTime(audio.currentTime, audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [updateTime, nextTrack]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    setCurrentTime(newTime);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="w-4 h-4" />;
      case 'all':
        return <Repeat className="w-4 h-4 text-purple-400" />;
      default:
        return <Repeat className="w-4 h-4" />;
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-t border-gray-800 backdrop-blur-lg bg-opacity-95">
      <audio ref={audioRef} />
      
      <div className="flex items-center justify-between px-4 py-3">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="relative group">
            <img
              src={currentTrack.artwork_url || '/api/placeholder/64/64'}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg object-cover shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-semibold truncate text-sm">
              {currentTrack.title}
            </h3>
            <p className="text-gray-400 truncate text-xs">
              {currentTrack.artist}
            </p>
          </div>
          
          <button className="text-gray-400 hover:text-white transition-colors p-2">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full transition-all duration-200 ${
                isShuffled 
                  ? 'text-purple-400 bg-purple-400 bg-opacity-20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            
            <button
              onClick={previousTrack}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="bg-white text-black rounded-full p-3 hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-full transition-all duration-200 ${
                repeatMode !== 'none' 
                  ? 'text-purple-400 bg-purple-400 bg-opacity-20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {getRepeatIcon()}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3 w-full">
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            
            <div
              className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative group-hover:h-1.5 transition-all duration-200"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg" />
              </div>
            </div>
            
            <span className="text-xs text-gray-400 min-w-[35px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          
          <div className="w-24 h-1 bg-gray-700 rounded-full cursor-pointer group">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative group-hover:h-1.5 transition-all duration-200"
              style={{ width: `${volume * 100}%` }}
              onClick={(e) => {
                const rect = e.currentTarget.parentElement.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                setVolume(Math.max(0, Math.min(1, percent)));
              }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;