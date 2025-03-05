import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import "react-lazy-load-image-component/src/effects/blur.css";
import StarRatingComponent from "@/components/star-rating-component";
import langData from "@/data/lang.json";
import PublisherBtn from "@/components/publisher-btn";
import { ModeToggle } from "@/components/model-toggle";
import { BookOpen } from "lucide-react";

const BookDetails = () => {
  
    const { fetchBooks, data, loading, error } = useFetch();
    const [singleBook, setSingleBook] = useState({});
    const [randomRating, setRandomRating] = useState(Math.floor(Math.random() * 3) + 3)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id"); 


    useEffect(() => {
        fetchBooks(`/${id}`, id);
    }, [id]);

    useEffect(() => {
        if (data.books) {
            setSingleBook(data.books?.volumeInfo);
        }
    }, [data]);


    const updateRating = (rating) => {
        setRandomRating(rating);
    }

    if (loading)
        return (
            <div className="h-screen flex justify-center items-center w-full">
                <RingLoader
                    color="oklch(0.777 0.152 181.912)"
                    width="100%"
                    height="4px"
                />
            </div>
        );

    if (error) return <div>Error ...</div>;


    return (
        <div className="container mx-auto  relative">
            <h1 className="text-3xl mb-3 font-mono text-center text-bold mt-2 ">
                📚 Book Finder
            </h1>
            <div className="absolute top-0 right-3">
                <ModeToggle />
            </div>
            {Object.keys(singleBook).length > 0 && (
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                    <div className="max-w-1/2 min-w-96 p-4 rounded-lg min-h-70 border shadow-lg">
                        <LazyLoadImage
                            src={
                                singleBook.imageLinks?.smallThumbnail || singleBook.imageLinks?.thumbnail
                            }
                            alt={singleBook.subtitle || "No Subtitle"}
                            className="w-full h-64 object-center transition-transform duration-700 hover:rotate-x-9 hover:-rotate-y-26"
                            effect="black-and-white"
                            wrapperProps={{
                                style: { transitionDelay: "1s", display: "block" },
                            }}
                        />
                        <p className="font-mono my-2 text-gray-500 dark:text-white text-center h-10 text-sm text-ellipsis overflow-hidden">
                            {singleBook.subtitle || "No Subtitle"}
                        </p>

                        <StarRatingComponent length="5" callback={updateRating} />
                        <a
                            href={`https://www.google.com/search?tbo=p&tbm=bks&q=title:"${singleBook.title}"`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="destructive"
                                className="mt-3 flex mx-auto w-full sm:w-fit cursor-pointer"
                            >
                                Preview Book
                            </Button>
                        </a>
                    </div>

                    <div className="w-full lg:w-3/5 p-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                            {singleBook.title || "No Title"}
                        </h2>
                        <p className="text-gray-700 dark:text-white">
                            by{" "}
                            {singleBook.authors
                                ? singleBook.authors.map((author) => (
                                    <a
                                        key={author}
                                        className="text-blue-400 cursor-pointer text-lg underline mx-1 font-mono"
                                        href={`https://en.wikipedia.org/wiki/Special:Search?search=${author}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        title={`Search for ${author} on Google`}
                                    >
                                        {author}
                                    </a>
                                ))
                                : "Unknown"}
                        </p>

                        <div className="my-3 flex items-center">
                            <StarRatingComponent
                                length={randomRating}
                                defaultColor="#ffb900"
                                filledColor="#ffb900"
                            />
                            <span className="text-gray-500 dark:text-white text-sm ml-2">
                                ({randomRating}/5)
                            </span>
                        </div>

                        <div className="my-3 text-sm text-gray-600 dark:text-white font-mono">
                            {singleBook.desscription || "No Description Avaliable For this Book"}   
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full">
                            <PublisherBtn
                                data={singleBook.publishedDate || "N/A"}
                                title="Published Date"
                            />
                            <PublisherBtn
                                data={singleBook.publisher || "N/A"}
                                title="Publisher"
                            />
                            <PublisherBtn
                                data={langData[singleBook.language] || "N/A"}
                                title="Language"
                            />
                            <PublisherBtn
                                data={singleBook.pageCount || "N/A"}
                                title="Total Pages"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;
