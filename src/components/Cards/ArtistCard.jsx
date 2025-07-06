import React from 'react';
import { Play, UserPlus, Check } from 'lucide-react';

const ArtistCard = ({ artist, onClick }) => {
  const [isFollowing, setIsFollowing] = React.useState(false);

  const handleFollowClick = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
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
    <div 
      onClick={onClick}
      className="bg-gray-900 bg-opacity-50 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 cursor-pointer group text-center"
    >
      <div className="relative mb-4">
        <img
          src={artist.profile_picture || '/api/placeholder/150/150'}
          alt={artist.name}
          className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
        />
        
        <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-lg">
          <Play className="w-5 h-5 ml-0.5" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-white font-semibold text-lg flex items-center justify-center space-x-2">
            <span>{artist.name}</span>
            {artist.is_verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </h3>
          
          <p className="text-gray-400 text-sm">
            @{artist.handle}
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 text-gray-400 text-sm">
          <div className="text-center">
            <div className="text-white font-semibold">
              {formatNumber(artist.follower_count)}
            </div>
            <div>Followers</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">
              {formatNumber(artist.track_count)}
            </div>
            <div>Tracks</div>
          </div>
        </div>
        
        <button
          onClick={handleFollowClick}
          className={`w-full py-2 px-4 rounded-full font-medium transition-all duration-200 ${
            isFollowing
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          {isFollowing ? (
            <span className="flex items-center justify-center space-x-2">
              <Check className="w-4 h-4" />
              <span>Following</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Follow</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;