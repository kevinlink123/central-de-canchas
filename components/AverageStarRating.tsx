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
                    <span className="mx-0.5">
                        <Image
                            src={"/icons/basketball.svg"}
                            width={18}
                            height={18}
                            className={index <= props.rating ? "" : "filter brightness-0"}
                        />
                    </span>
                );
            })}
        </div>
    );
}
