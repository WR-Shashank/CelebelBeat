import { create } from 'zustand';

const AUDIUS_API_BASE = 'https://api.audius.co';

const useAudiusStore = create((set, get) => ({
  // State
  trendingTracks: [],
  searchResults: [],
  playlists: [],
  artists: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Fetch trending tracks
  fetchTrendingTracks: async (limit = 50) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${AUDIUS_API_BASE}/v1/tracks/trending?limit=${limit}`);
      const data = await response.json();
      
      if (data.data) {
        const tracks = data.data.map(track => ({
          id: track.id,
          title: track.title,
          artist: track.user.name,
          artist_id: track.user.id,
          duration: track.duration,
          artwork_url: track.artwork ? track.artwork['480x480'] || track.artwork['150x150'] : null,
          stream_url: `${AUDIUS_API_BASE}/v1/tracks/${track.id}/stream`,
          play_count: track.play_count,
          favorite_count: track.favorite_count,
          repost_count: track.repost_count,
          genre: track.genre,
          mood: track.mood,
          release_date: track.release_date,
          tags: track.tags
        }));
        
        set({ trendingTracks: tracks, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  // Search tracks
  searchTracks: async (query, limit = 20) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${AUDIUS_API_BASE}/v1/tracks/search?query=${encodeURIComponent(query)}&limit=${limit}`);
      const data = await response.json();
      
      if (data.data) {
        const tracks = data.data.map(track => ({
          id: track.id,
          title: track.title,
          artist: track.user.name,
          artist_id: track.user.id,
          duration: track.duration,
          artwork_url: track.artwork ? track.artwork['480x480'] || track.artwork['150x150'] : null,
          stream_url: `${AUDIUS_API_BASE}/v1/tracks/${track.id}/stream`,
          play_count: track.play_count,
          favorite_count: track.favorite_count,
          repost_count: track.repost_count,
          genre: track.genre,
          mood: track.mood,
          release_date: track.release_date,
          tags: track.tags
        }));
        
        set({ searchResults: tracks, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  // Fetch playlists
  fetchTrendingPlaylists: async (limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${AUDIUS_API_BASE}/v1/playlists/trending?limit=${limit}`);
      const data = await response.json();
      
      if (data.data) {
        const playlists = data.data.map(playlist => ({
          id: playlist.id,
          name: playlist.playlist_name,
          description: playlist.description,
          artwork_url: playlist.artwork ? playlist.artwork['480x480'] || playlist.artwork['150x150'] : null,
          owner: playlist.user.name,
          owner_id: playlist.user.id,
          track_count: playlist.track_count,
          favorite_count: playlist.favorite_count,
          repost_count: playlist.repost_count,
          is_album: playlist.is_album
        }));
        
        set({ playlists, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  // Fetch artists
  fetchTrendingArtists: async (limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${AUDIUS_API_BASE}/v1/users/trending?limit=${limit}`);
      const data = await response.json();
      
      if (data.data) {
        const artists = data.data.map(user => ({
          id: user.id,
          name: user.name,
          handle: user.handle,
          bio: user.bio,
          profile_picture: user.profile_picture ? user.profile_picture['480x480'] || user.profile_picture['150x150'] : null,
          cover_photo: user.cover_photo ? user.cover_photo['2000x'] || user.cover_photo['640x'] : null,
          follower_count: user.follower_count,
          followee_count: user.followee_count,
          track_count: user.track_count,
          playlist_count: user.playlist_count,
          is_verified: user.is_verified
        }));
        
        set({ artists, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  // Get playlist tracks
  getPlaylistTracks: async (playlistId) => {
    try {
      const response = await fetch(`${AUDIUS_API_BASE}/v1/playlists/${playlistId}/tracks`);
      const data = await response.json();
      
      if (data.data) {
        return data.data.map(track => ({
          id: track.id,
          title: track.title,
          artist: track.user.name,
          artist_id: track.user.id,
          duration: track.duration,
          artwork_url: track.artwork ? track.artwork['480x480'] || track.artwork['150x150'] : null,
          stream_url: `${AUDIUS_API_BASE}/v1/tracks/${track.id}/stream`,
          play_count: track.play_count,
          favorite_count: track.favorite_count,
          repost_count: track.repost_count,
          genre: track.genre,
          mood: track.mood,
          release_date: track.release_date,
          tags: track.tags
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
      return [];
    }
  }
}));

export default useAudiusStore;
