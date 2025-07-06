import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  // Player state
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 0,
  isLoading: false,
  queue: [],
  currentIndex: 0,
  isShuffled: false,
  repeatMode: 'none', // 'none', 'one', 'all'
  
  // Audio element
  audioElement: null,
  
  // Actions
  setAudioElement: (element) => set({ audioElement: element }),
  
  playTrack: (track, playlist = []) => {
    const { audioElement } = get();
    if (!audioElement) return;
    
    set({ 
      currentTrack: track, 
      isLoading: true,
      queue: playlist.length > 0 ? playlist : [track],
      currentIndex: playlist.findIndex(t => t.id === track.id) || 0
    });
    
    audioElement.src = track.stream_url;
    audioElement.load();
    
    const playPromise = audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          set({ isPlaying: true, isLoading: false });
        })
        .catch(() => {
          set({ isLoading: false });
        });
    }
  },
  
  togglePlay: () => {
    const { audioElement, isPlaying } = get();
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      set({ isPlaying: false });
    } else {
      audioElement.play();
      set({ isPlaying: true });
    }
  },
  
  setVolume: (volume) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume;
    }
    set({ volume });
  },
  
  setCurrentTime: (time) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.currentTime = time;
    }
    set({ currentTime: time });
  },
  
  updateTime: (currentTime, duration) => {
    set({ currentTime, duration });
  },
  
  nextTrack: () => {
    const { queue, currentIndex, repeatMode } = get();
    if (queue.length === 0) return;
    
    let nextIndex;
    if (repeatMode === 'one') {
      nextIndex = currentIndex;
    } else if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (repeatMode === 'all') {
      nextIndex = 0;
    } else {
      return;
    }
    
    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      set({ currentIndex: nextIndex });
      get().playTrack(nextTrack, queue);
    }
  },
  
  previousTrack: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) return;
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
    const prevTrack = queue[prevIndex];
    
    if (prevTrack) {
      set({ currentIndex: prevIndex });
      get().playTrack(prevTrack, queue);
    }
  },
  
  toggleShuffle: () => {
    set((state) => ({ isShuffled: !state.isShuffled }));
  },
  
  toggleRepeat: () => {
    set((state) => {
      const modes = ['none', 'all', 'one'];
      const currentIndex = modes.indexOf(state.repeatMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      return { repeatMode: modes[nextIndex] };
    });
  },
  
  addToQueue: (track) => {
    set((state) => ({
      queue: [...state.queue, track]
    }));
  },
  
  removeFromQueue: (index) => {
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index)
    }));
  }
}));

export default usePlayerStore;