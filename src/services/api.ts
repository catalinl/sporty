import axios from 'axios';
import { League, Season } from '../types';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const fetchAllLeagues = async (): Promise<League[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/all_leagues.php`);
    return response.data.leagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

export const fetchLeagueBadge = async (leagueId: string): Promise<Season[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`);
    return response.data.seasons || [];
  } catch (error) {
    console.error('Error fetching badge:', error);
    throw error;
  }
};
