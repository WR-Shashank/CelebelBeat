import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import PlayerBar from './components/Player/PlayerBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'library':
        return <Library />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
      
      <PlayerBar />
    </div>
  );
}

export default App;