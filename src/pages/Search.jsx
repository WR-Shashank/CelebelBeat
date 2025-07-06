import React, { useState, useEffect, useCallback } from 'react';
import { Search as SearchIcon, X, TrendingUp, Clock } from 'lucide-react';
import Header from '../components/Layout/Header';
import TrackCard from '../components/Cards/TrackCard';
import useAudiusStore from '../stores/useAudiusStore';

const Search = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Electronic', 'Hip Hop', 'House', 'Techno', 'Ambient'
  ]);
  
  const { 
    searchResults, 
    trendingTracks,
    isLoading, 
    searchTracks, 
    fetchTrendingTracks,
    setSearchQuery 
  } = useAudiusStore();

  useEffect(() => {
    if (trendingTracks.length === 0) {
      fetchTrendingTracks(20);
    }
  }, [fetchTrendingTracks, trendingTracks.length]);

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim()) {
        searchTracks(searchQuery);
        setSearchQuery(searchQuery);
      }
    }, 300),
    [searchTracks, setSearchQuery]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchQuery('');
  };

  const genres = [
    { name: 'Electronic', color: 'from-purple-500 to-pink-500' },
    { name: 'Hip Hop', color: 'from-green-500 to-blue-500' },
    { name: 'House', color: 'from-orange-500 to-red-500' },
    { name: 'Techno', color: 'from-blue-500 to-purple-500' },
    { name: 'Ambient', color: 'from-teal-500 to-cyan-500' },
    { name: 'Trap', color: 'from-red-500 to-pink-500' },
    { name: 'Dubstep', color: 'from-yellow-500 to-orange-500' },
    { name: 'Future Bass', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black">
      <Header title="Search" subtitle="Find your next favorite track" />
      
      <div className="px-6 pb-32">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-12 pr-12 py-4 rounded-full border-2 border-transparent focus:border-purple-500 focus:outline-none transition-all duration-200"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Search Results for "{query}"
            </h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((track, index) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    playlist={searchResults}
                    showIndex={true}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try searching for something else
                </p>
              </div>
            )}
          </div>
        )}

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-white">Recent Searches</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Browse Genres */}
        {!query && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Browse Genres</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => handleSearch(genre.name)}
                  className={`bg-gradient-to-br ${genre.color} p-6 rounded-lg text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending */}
        {!query && trendingTracks.length > 0 && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Search;