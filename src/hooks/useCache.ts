import { useState } from 'react';
import { CacheItem } from '../types';

export const useCache = () => {
  const [cache, setCache] = useState<CacheItem>({});

  const getCachedData = <T>(key: string): T | null => {
    return cache[key] as T || null;
  };

  const setCachedData = <T>(key: string, data: T): void => {
    setCache((prevCache) => ({
      ...prevCache,
      [key]: data,
    }));
  };

  const isCached = (key: string): boolean => {
    return !!cache[key];
  };

  return { getCachedData, setCachedData, isCached };
};
