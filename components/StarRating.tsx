import Image from "next/image";
import React, { useState } from "react";

export default function StarRating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    
    return (
        <div className="star-rating">
            {
                [...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={'mx-0.5'}
                        >
                        <span className="">
                            <Image
                                src={'/icons/basketball.svg'}
                                width={30}
                                height={30}
                                className={index <= (rating || hover) ? '' : 'filter brightness-0'}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(index)}
                            />
                        </span>
                        </button>
                    )
                })
            }
        </div>
    )
}
