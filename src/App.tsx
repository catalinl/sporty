
import React, { useState, useEffect } from 'react';
import { fetchAllLeagues } from './services/api';
import { League } from './types';
import './styles/App.scss';
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import LeagueList from './components/LeagueList';

const App: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [sportTypes, setSportTypes] = useState<string[]>([]);

  useEffect(() => {
    const loadLeagues = async (): Promise<void> => {
      try {
        const data = await fetchAllLeagues();
        setLeagues(data);
        setFilteredLeagues(data);
        
        // Extract unique sport types for the dropdown
        const uniqueSports = Array.from(new Set(data.map(league => league.strSport))).sort();
        setSportTypes(uniqueSports);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load leagues. Please try again later.');
        setLoading(false);
      }
    };

    loadLeagues();
  }, []);

  useEffect(() => {
    // Filter leagues based on search term and selected sport
    const filtered = leagues.filter(league => {
      const matchesSearch = league.strLeague.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = selectedSport === '' || league.strSport === selectedSport;
      return matchesSearch && matchesSport;
    });
    
    setFilteredLeagues(filtered);
  }, [searchTerm, selectedSport, leagues]);

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  const handleSportChange = (sport: string): void => {
    setSelectedSport(sport);
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sporty League Explorer</h1>
      </header>
      
      <div className="filters-container">
        <SearchBar onSearch={handleSearch} />
        <SportFilter 
          sportTypes={sportTypes} 
          selectedSport={selectedSport} 
          onSportChange={handleSportChange} 
        />
      </div>
      
      <main>
        <LeagueList leagues={filteredLeagues} />
      </main>
    </div>
  );
};

export default App;
