export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
}

export interface Season {
  idSeason: string;
  strSeason: string;
  strBadge: string;
}

export interface CacheItem {
  [key: string]: any;
}
