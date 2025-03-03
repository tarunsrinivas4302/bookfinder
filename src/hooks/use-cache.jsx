import { useCallback } from 'react';

const useCache = () => {
    const CACHE_KEY = import.meta.env.VITE_CACHE_KEY || 'app_cache';
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

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
                return cache[query].data; // Return valid cached data
            } else {
                delete cache[query]; // Remove expired data
                localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
            }
        }
        return null; 
    };

    const fetchBooks = useCallback(async (query) => {
        const cachedData = getCache(query);
        if (cachedData) {
            console.log('Using Cached Data:', cachedData);
            return cachedData;
        }

        console.log('Fetching New Data from OpenAI...');
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: `Find books related to: ${query}` }],
                    max_tokens: 200
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            const books = data.choices?.[0]?.message?.content || 'No results found';

            setCache(query, books); // Cache the response
            return books;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }, []);

    return { fetchBooks };
};

export default useCache;
