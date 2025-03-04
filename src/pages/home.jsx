import BookCard from '@/components/book-card';
import { ModeToggle } from '@/components/model-toggle';
import PaginationComponent from '@/components/pagination';
import useFetch from '@/hooks/use-fetch';
import {  BookOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Home = () => {

    const [searchTxt, setSearchTxt] = useState("");
    const [cleanedData, setCleanedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { fetchBooks, data, error, loading } = useFetch();

    const { totalItems, books } = data;
    const ItemsPerPage = 20;
    const offset = (currentPage - 1) * ItemsPerPage;

    useEffect(() => {
        let timer;
        if (searchTxt.trim() === '') {
            setCleanedData([])
        }
        if (searchTxt) {
            const cacheKey = searchTxt + "_" + offset;
            timer = setTimeout(() => fetchBooks(`?q=${searchTxt}&startIndex=${offset}&maxResults=${ItemsPerPage}`, cacheKey), 200);
        }
        return () => clearTimeout(timer);
    }, [searchTxt, currentPage]);

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

    if (loading) return <BarLoader color='oklch(0.777 0.152 181.912)' width="100%" height="4px" />

    if (error) return <div className='text-red-600'>Error fetching data. Please try again later.</div>


    return (
        <div className='container mx-auto relative'>
            <h1 className='text-3xl font-mono text-center text-bold mt-2 '><BookOpen className='inline' /> Book Finder</h1>
            <div className='absolute top-0 right-3'>
                <ModeToggle />
            </div>
            <input
                className='border-2 px-4 py-2 rounded-md focus:outline-none focus:ring-primary-500 mt-8  mb-6 w-full'
                type='text'
                autoFocus
                placeholder='Search for books'
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    cleanedData.length > 0 && cleanedData.map((book) => (
                        <BookCard data={book} key={book.id} />
                    ))
                }
            </div>
            {
                cleanedData.length > 0 && <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={ItemsPerPage} totalItems={totalItems} />
            }
        </div>
    )
}

export default Home
