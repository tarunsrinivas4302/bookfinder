import React from 'react'

const useCache = () => {
    const CACHE_KEY = import.meta.env.VITE_CACHE_KEY || 'app_cache';

    const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};

    const setCache = (query, value, ttl = 86400 * 1000) => {
        cache[query] = {
            data: value,
            timestamp: Date.now() + ttl
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    };

    const getCache = (query) => {
        if (cache[query]) {
            if (Date.now() < cache[query].timestamp) {
                return cache[query].data;
            } else {
                delete cache[query];
            }
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        return null;
    };


    return {setCache , getCache}

}

export default useCache
