import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import TrackCard from '../components/Cards/TrackCard';
import PlaylistCard from '../components/Cards/PlaylistCard';
import ArtistCard from '../components/Cards/ArtistCard';
import useAudiusStore from '../stores/useAudiusStore';
import { TrendingUp, Clock, Music } from 'lucide-react';

const Home = () => {
  const { 
    trendingTracks, 
    playlists, 
    artists, 
    isLoading, 
    fetchTrendingTracks, 
    fetchTrendingPlaylists, 
    fetchTrendingArtists 
  } = useAudiusStore();

  useEffect(() => {
    fetchTrendingTracks(20);
    fetchTrendingPlaylists(10);
    fetchTrendingArtists(10);
  }, [fetchTrendingTracks, fetchTrendingPlaylists, fetchTrendingArtists]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (isLoading && trendingTracks.length === 0) {
    
    return (
      <div className="flex-1 bg-gradient-to-b from-purple-900 via-gray-900 to-black">
        <Header title="Loading..." />
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      <Header 
        title={getGreeting()} 
        subtitle="Discover amazing music on CelbelBeat"
      />
      
      <div className="px-6 pb-32 space-y-8">
        {/* Quick Access */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTracks.slice(0, 6).map((track) => (
              <div
                key={track.id}
                className="bg-gray-800 bg-opacity-50 rounded-lg p-3 flex items-center space-x-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group"
              >
                <img
                  src={track.artwork_url || '/api/placeholder/60/60'}
                  alt={track.title}
                  className="w-15 h-15 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate text-sm">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-xs truncate">
                    {track.artist}
                  </p>
                </div>
                <button className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
                  <Music className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Tracks */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
          
          <div className="space-y-2">
            {trendingTracks.slice(0, 10).map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                playlist={trendingTracks}
                showIndex={true}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Trending Playlists */}
        {playlists.length > 0 && (
        
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Popular Playlists</h2>
              <button className="text-gray-400 hover:text-white text-sm font-medium">
                Show all
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {playlists.slice(0, 5).map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onClick={() => console.log('Open playlist:', playlist.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Trending Artists */}
        {artists.length > 0 && (
        
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Popular Artists</h2>
              <button className="text-gray-400 hover:text-white text-sm font-medium">
                Show all
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {artists.slice(0, 5).map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onClick={() => console.log('Open artist:', artist.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recently Played */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Made for You</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingTracks.slice(10, 15).map((track) => (
              <div
                key={track.id}
                className="bg-gray-900 bg-opacity-50 rounded-lg p-4 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative mb-4">
                  <img
                    src={track.artwork_url || '/api/placeholder/200/200'}
                    alt={track.title}
                    className="w-full aspect-square object-cover rounded-lg shadow-lg"
                  />
                  
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Music className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-white font-semibold truncate">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {track.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;