import { useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
                localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
            }
        }
        return null;
    };

    const fetchBooks = async (query, offset = 20, limit = 0) => {
        console.log({ query })
        setLoading(true);
        setData({});

        const cachedData = getCache(query);

        if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
        }

        try {

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${limit}&maxResults=${offset}`);

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            const { totalItems, items: books } = data;

            setData({ totalItems, books })

            setCache(query, books);


        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchBooks, data, error, loading };
};

export default useFetch;
