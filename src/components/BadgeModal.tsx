import React from 'react';
import { Season } from '../types';
import Loader from './Loader';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: Season | null;
  loading: boolean;
  leagueName: string;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ 
  isOpen, 
  onClose, 
  badge, 
  loading, 
  leagueName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{leagueName} Season Badge</h2>
        
        {loading ? (
          <Loader />
        ) : badge ? (
          <div className="badge-container">
            <img 
              src={badge.strBadge} 
              alt={`${leagueName} Season Badge`} 
              className="season-badge" 
            />
            <p>Season: {badge.strSeason}</p>
          </div>
        ) : (
          <p>No badge available for this league.</p>
        )}
      </div>
    </div>
  );
};

export default BadgeModal;
