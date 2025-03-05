import { useState } from 'react';
import useCache from './use-cache';

const useFetch = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setCache, getCache } = useCache();

    const fetchBooks = async (query, cacheKey) => {
        setLoading(true);
        setData({});
        const cachedData = getCache(cacheKey);
        if (cachedData) {
            console.log("Getting Cached Data", cachedData);
            setData(cachedData);
            setLoading(false);
            return;
        }
        try {

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes${query}`);

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            const { totalItems } = data;
            let books;

            if (data?.items) {
                books = data.items;
            } else {
                books = data
            }

            setData({ totalItems, books })
            setCache(cacheKey, { books });


        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return { fetchBooks, data, error, loading };
};

export default useFetch;
