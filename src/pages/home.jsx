import BookCard from '@/components/book-card';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Home = () => {

    const [searchTxt, setSearchTxt] = useState("");
    const [cleanedData, setCleanedData] = useState([]);
    const { fetchBooks, data, error, loading } = useFetch();

    const { totalItems, books } = data;

    useEffect(() => {
        let timer;
        if (searchTxt) {
            timer = setTimeout(() => fetchBooks(searchTxt), 200);
        }
        return () => clearTimeout(timer);
    }, [searchTxt]);

    useEffect(() => {
        if (data?.books) {
            const normalizedData = books.map(book => ({
                id: book.id,
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                authors: book.volumeInfo.authors || 'Unknown',
                description: book.volumeInfo.description || 'No description available',
                image: book.volumeInfo.imageLinks?.thumbnail,
                link: book.volumeInfo.infoLink,
                publisher: book.volumeInfo.publisher
            }));
            setCleanedData(normalizedData);
        }
    }, [data])

    return (
        <div className='container mx-auto '>

            <input
                className='border-2 px-4 py-2 rounded-md focus:outline-none focus:ring-primary-500 mt-8  mb-6 w-full'
                type='text'
                autoFocus
                placeholder='Search for books'
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
            />
            {
                loading && <BarLoader color='oklch(0.777 0.152 181.912)' width="100%" height="4px" />
            }

            {
                error && <div className='text-red-600'>Error fetching data. Please try again later.</div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">

                {
                    cleanedData.length > 0 && cleanedData.map((book) => (
                        <BookCard data={book} key={book.id} />
                    ))
                }
            </div>



        </div>
    )
}

export default Home
