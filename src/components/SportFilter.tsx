import React, { ChangeEvent } from 'react';

interface SportFilterProps {
  sportTypes: string[];
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

const SportFilter: React.FC<SportFilterProps> = ({ 
  sportTypes, 
  selectedSport, 
  onSportChange 
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    onSportChange(e.target.value);
  };

  return (
    <div className="sport-filter">
      <select 
        value={selectedSport} 
        onChange={handleChange}
        className="sport-select"
      >
        <option value="">All Sports</option>
        {sportTypes.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportFilter;
