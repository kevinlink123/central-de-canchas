import Image from "next/image";
import React, { useState } from "react";

interface AverageStarRatingProps {
    rating: number;
}

export default function AverageStarRating(props: AverageStarRatingProps) {
    return (
        <div className="star-rating">
            <div className="">Calificación promedio</div>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span>
                        <span className="mx-0.5 lg:hidden">
                            <Image
                                src={"/icons/basketball.svg"}
                                width={13}
                                height={13}
                                className={index <= props.rating ? "" : "filter brightness-0"}
                            />
                        </span>
                        <span className="mx-0.5 hidden lg:inline-block">
                            <Image
                                src={"/icons/basketball.svg"}
                                width={18}
                                height={18}
                                className={index <= props.rating ? "" : "filter brightness-0"}
                            />
                        </span>
                    </span>
                    
                );
            })}
        </div>
    );
}
