import { Star } from 'lucide-react';
import React, { useState } from 'react'

const StarRatingComponent = ({ length = 5, callback = () => { }, defaultColor = "white", filledColor = "#ffb900" }) => {
    const [activeStars, setActiveStars] = useState([]);
    const [rating, setRating] = useState([]);

    const handleMouseOver = (index) => {
        if (index > 0 && index <= length) {
            setActiveStars(Array.from({ length: index }, (_, i) => i + 1));
        }
    };

    const handleMouseLeave = () => {
        setActiveStars([]);
    };

    const handleClick = (index) => {
        setRating(Array.from({ length: index }, (_, i) => i + 1));
        callback(index);
    };

    return (
        <div onMouseLeave={handleMouseLeave} className='flex ml-2 gap-2'>
            {Array.from({ length }).map((_, i) => {
                const starIndex = i + 1;
                return (
                    <Star key={starIndex} className="text-amber-400"
                        fill={
                            activeStars.includes(starIndex) || rating.includes(starIndex)
                                ? filledColor
                                : defaultColor
                        }
                        onMouseOver={() => handleMouseOver(starIndex)}
                        onClick={() => handleClick(starIndex)}
                    />
                )
            })}


        </div>
    )
}

export default StarRatingComponent
