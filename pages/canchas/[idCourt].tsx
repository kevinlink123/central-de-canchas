import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import markerService from "../../firebase/marker.service";
import { MarkerDataInterface } from "../../types/Map.interface";
import authService from "../../firebase/auth.service";
import { UserData } from "../../types/UserData.interface";
import Card from "../../components/Card";
import { HEADERS, COURTDATATITLES, ICONS } from "../../constans/court.constants";
import basketBallIconSVG from './../../public/icons/basketball.svg';
import Image from "next/image";
import AverageStarRating from "../../components/AverageStarRating";
import GenericModal from "../../components/GenericModal";
import StarRating from "../../components/StarRating";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/AuthContext";

const mapPinIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-12 lg:h-12 w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
)

const heartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"lg:w-12 lg:h-12 w-10 h-10"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>  
)

const loadingIcon = (
    <svg
        className="asd animate-custom-spin "
        width="36"
        height="36"
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
);

export default function () {
    const [courtData, setCourtData] = useState<MarkerDataInterface>();
    const [courtCreator, setCourtCreator] = useState<UserData>();
    const [isFavorite, setIsFavorite] = useState<boolean>();
    
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [averageRating, setAverageRating] = useState<{averageRating: number, totalRatings: number}>();

    const [favoriteCourtModalOpen, setFavoriteCourtModalOpen] = useState(false);
    const [markingAsFavorite, setMarkingAsFavorite] = useState(false);
    const [message, setMessage] = useState('');

    const { user, loading } = useContext(AuthContext);

    const router = useRouter();
    const { idCourt } = router.query;

    useEffect(() => {
        if (!idCourt || loading) {
            return;
        }

        const fetchCourtData = async () => {
            const fetchCourtData = await markerService.getCourt(idCourt as string);
            const courtCreator = await authService.getProfile(fetchCourtData.uid);
            const fetchAverageRating = await markerService.getCourtRating(idCourt as string);
            const isUserAlreadyFavoriteCourt = await markerService.isUserAlreadyFavoriteCourt(user?.uid as string, idCourt as string);

            setIsFavorite(isUserAlreadyFavoriteCourt);
            setAverageRating(fetchAverageRating);
            setCourtData(fetchCourtData);
            setCourtCreator(courtCreator);
        };
        fetchCourtData();
    }, [idCourt, loading]);

    async function favoriteCourt() {
        setMarkingAsFavorite(true);
        const res = await markerService.saveFavoriteCourt(user?.uid as string, idCourt as string);
        setFavoriteCourtModalOpen(true);
        setMessage(res.message);
        setMarkingAsFavorite(false);
        setIsFavorite(true);
    }

    async function unFavoriteCourt() {
        setMarkingAsFavorite(true);
        const res = await markerService.unFavoriteCourt(user?.uid as string, idCourt as string);
        setFavoriteCourtModalOpen(true);
        setMessage(res.message);
        setMarkingAsFavorite(false);
        setIsFavorite(false);
    }

    return (
        <div className="w-full min-h-full">
            {!courtData ? (
                <div>Loading...</div>
            ) : (
                <div className="court-data-container flex flex-col justify-center items-center">
                    <div className="name-address">
                        <div className="my-4 text-6xl font-bold text-center">{courtData.courtName}</div>
                        <div className="text-lg">{courtData.address},{" "}<span className="font-medium">{courtData.municipality}</span>,{" "}<span className="font-medium">{courtData.province}</span></div>
                    </div>

                    <div className="info-cards-container flex justify-center items-stretch w-full lg:w-3/4 min-h-60 my-4">
                        <Card
                            logo={<div><span className="star text-4xl lg:text-5xl text-yellow-300">&#9733;</span></div>}
                            infoName={<AverageStarRating rating={averageRating!.averageRating} />}
                            data={
                                <div>
                                    <div className="">{`${averageRating?.totalRatings} jugadores calificaron`}</div>
                                    <Button name="CALIFICAR" dark={false} onClick={() => setRatingModalOpen(true)}/>
                                </div>
                            }
                        />

                        <Card
                            logo={mapPinIcon}
                            infoName={'Visitas a la pagina de cancha'}
                            data={`${courtData.visits} vieron la cancha`}
                        />
                        <Card
                            logo={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"lg:w-12 lg:h-12 w-10 h-10" + (isFavorite ? ' fill-red-600 stroke-red-600' : '')}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            }
                            infoName={<div><b>{courtData.favoritesCount ? courtData.favoritesCount : 0} jugadores ya la guardaron</b></div>}
                            data={
                                !markingAsFavorite ? 
                                ( !isFavorite ?
                                <div><Button name="MARCAR COMO FAVORITO" dark={false} onClick={() => favoriteCourt()}/></div>
                                : 
                                <div><Button name="DESMARCAR COMO FAVORITO" dark={false} onClick={() => unFavoriteCourt()}/></div>)
                                :
                                <>{loadingIcon}</>
                            }
                        />
                    </div>

                    <div className="border-t-4 h-1 w-2/4 my-20"></div>

                    <h2 className="text-4xl mb-8 mx-2 font-bold uppercase text-center">Datos de la cancha</h2>

                    <div className="info-cards-container block lg:grid lg:grid-cols-6 lg:gap-8 lg:w-3/4 w-4/5 min-h-52 my-10 mb-28 items-stretch">
                        {COURTDATATITLES.map((title) => {
                            const logoElement = (
                                <Image 
                                    src={ICONS[title as keyof typeof ICONS]}
                                    height={72}
                                    width={72}
                                    alt={`${title} icon`}
                                />
                            )
                            return (
                                <Card
                                    logo={logoElement}
                                    infoName={HEADERS[title as keyof typeof HEADERS]}
                                    data={courtData[title as keyof MarkerDataInterface]}
                                />
                            );
                        })}
                        <Card
                            logo={
                                <Image 
                                    src={basketBallIconSVG}
                                    height={72}
                                    width={72}
                                    alt='Created for icon'
                                />
                            }
                            infoName="Cancha registrada por"
                            data={courtCreator?.username || ""}
                        />
                    </div>

                    {ratingModalOpen && <GenericModal closeModal={() => setRatingModalOpen(false)} message={<StarRating uid={user?.uid as string} courtId={idCourt as string} courtName={courtData.courtName} closeModal={() => setRatingModalOpen(false)} />} />}
                    {favoriteCourtModalOpen && <GenericModal closeModal={() => setFavoriteCourtModalOpen(false)} message={message} />}
                </div>
            )}
        </div>
    );
}
