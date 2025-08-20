import React from 'react';
import { League } from '../types';
import LeagueItem from './LeagueItem';

interface LeagueListProps {
  leagues: League[];
}

const LeagueList: React.FC<LeagueListProps> = ({ leagues }) => {
  if (leagues.length === 0) {
    return <div className="no-results">No leagues found matching your criteria.</div>;
  }

  return (
    <div className="league-list">
      {leagues.map((league) => (
        <LeagueItem key={league.idLeague} league={league} />
      ))}
    </div>
  );
};

export default LeagueList;
