// src/components/LeagueItem.tsx
import React, { useState } from 'react';
import { fetchLeagueBadge } from '../services/api';
import { useCache } from '../hooks/useCache';
import { League, Season } from '../types';
import BadgeModal from './BadgeModal';

interface LeagueItemProps {
  league: League;
}

const LeagueItem: React.FC<LeagueItemProps> = ({ league }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [badge, setBadge] = useState<Season | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { getCachedData, setCachedData, isCached } = useCache();

  const handleClick = async (): Promise<void> => {
    setShowModal(true);
    
    if (isCached(`badge-${league.idLeague}`)) {
      // Use cached data if available
      setBadge(getCachedData<Season>(`badge-${league.idLeague}`));
      return;
    }
    
    setLoading(true);
    try {
      const seasons = await fetchLeagueBadge(league.idLeague);
      if (seasons && seasons.length > 0) {
        // Get the first season badge
        const badgeData = seasons[0];
        setBadge(badgeData);
        setCachedData<Season>(`badge-${league.idLeague}`, badgeData);
      } else {
        setBadge(null);
      }
    } catch (error) {
      console.error('Error fetching badge:', error);
      setBadge(null);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <div className="league-item" onClick={handleClick}>
        <h3>{league.strLeague}</h3>
        <div className="league-details">
          <p><strong>Sport:</strong> {league.strSport}</p>
          {league.strLeagueAlternate && (
            <p><strong>Alternative Name:</strong> {league.strLeagueAlternate}</p>
          )}
        </div>
      </div>
      
      {showModal && (
        <BadgeModal 
          isOpen={showModal} 
          onClose={closeModal} 
          badge={badge} 
          loading={loading}
          leagueName={league.strLeague}
        />
      )}
    </>
  );
};

export default LeagueItem;
