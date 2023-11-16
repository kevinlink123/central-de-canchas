import Image from "next/image";
import React, { useState } from "react";
import markerService from "../firebase/marker.service";
import { useRouter } from "next/router";

interface StarRatingProps {
    uid: string;
    courtId: string;
    courtName: string;
    closeModal: () => void;
}

export default function StarRating(props: StarRatingProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    async function rateCourt(rate: number) {
        setRating(rate);
        setLoading(true);
        const res = await markerService.rateCourt(props.uid, props.courtId, rate);
        setMessage(res.message);
        if (!res.error) {
            await delay(2000);
            router.reload();
        }
    }

    return (
        <div>
            {message ? (
                <div>{message}</div>
            ) : (
                <div>
                    <div className="text-2xl mb-8">{props.courtName}</div>
                    <div className="my-10">
                        Calificá como fue tu experiencia en la cancha!
                    </div>
                </div>
            )}

            {!message && (
                <div className="star-rating">
                    {!loading ? (
                        [...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={"mx-0.5"}
                                >
                                    <span className="">
                                        <Image
                                            src={"/icons/basketball.svg"}
                                            width={30}
                                            height={30}
                                            className={
                                                index <= (rating || hover)
                                                    ? ""
                                                    : "filter brightness-0"
                                            }
                                            onClick={() => rateCourt(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(index)}
                                        />
                                    </span>
                                </button>
                            );
                        })
                    ) : (
                        <div className="w-full flex justify-center items-center">
                            <svg
                                className="asd animate-custom-spin mx-16"
                                width="42"
                                height="42"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.2"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
