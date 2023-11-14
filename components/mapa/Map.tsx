import React from "react";
import ReactDOMServer from "react-dom/server";
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import Tippy from '@tippyjs/react';
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";

import actualPostionIcon from '../../public/position.png';
import markerIcon from '../../public/marker-basketball-icon.png';
import newMarkerIcon from '../../public/new-marker-basketball-icon.png';

//Tippy.js styles imports
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/scale.css'


import { MarkerDataInterface, NewMarkerFormDataInterface } from "../../types/Map.interface";
import MarkerForm from './MarkerForm';
import NewMarkerWithPopup from "./NewMarkerWithPopup";
import MarkerPopup from "./MarkerPopup";
import CourtInfo from "./CourtInfo";
import Modal from "../Modal";
import markerService from "../../firebase/marker.service";

interface MapProps { }
interface MapState {
    markers: MarkerDataInterface[] | [];
    selectedMarker: MarkerDataInterface;
    isUserAbleToAddNewMarker: boolean;
    isNewMarkerOnTheMap: boolean;
    isModalOpen: boolean;
    message: string;
    registeringNewCourt: boolean;
}

class Map extends React.Component<MapProps, MapState> {
    map!: L.Map;
    newMarker!: L.Marker;
    static contextType = AuthContext;
    context!: React.ContextType<typeof AuthContext>;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            markers: [],
            selectedMarker: {} as MarkerDataInterface,
            isUserAbleToAddNewMarker: true,
            isNewMarkerOnTheMap: false,
            isModalOpen: false,
            message: '',
            registeringNewCourt: false

        }
        this.initializeMarkers = this.initializeMarkers.bind(this);
        this.addMarkerOnClick = this.addMarkerOnClick.bind(this);
        this.enableAddMarkerOnClick = this.enableAddMarkerOnClick.bind(this);
        this.markerFollowsCursor = this.markerFollowsCursor.bind(this);
        this.cancelNewMarker = this.cancelNewMarker.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    async componentDidMount() {
        this.map = L.map('mapid', {
            center: [-34.55045538399154, -58.479947608725034],
            zoom: 16,
            doubleClickZoom: false,
            layers: [
                L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const actualPositionObject = L.icon({
                    iconUrl: actualPostionIcon.src,
                    iconSize: [28, 28],
                    iconAnchor: [8, 27]
                })
                try {
                    this.map.setView([pos.coords.latitude, pos.coords.longitude])
                    L.marker([pos.coords.latitude, pos.coords.longitude], { icon: actualPositionObject }).addTo(this.map);
                } catch (e) { }
            }
        )

        this.setState({
            markers: await markerService.getAllMarkers()
        }, () => this.initializeMarkers());
    }

    componentWillUnmount(): void {
        this.map.remove();
    }

    initializeMarkers() {
        const markerCustomIcon = L.icon({
            iconUrl: markerIcon.src,
            iconSize: [45, 45],
            iconAnchor: [25, 55],
            popupAnchor: [-1, -50]
        });

        console.log('inicializando...');

        const markers = this.state.markers;
        markers.forEach(markerData => {
            const { coordinates, courtName, address, municipality, province } = markerData;
            const newMarker = L.marker(coordinates, { icon: markerCustomIcon }).addTo(this.map).bindPopup(ReactDOMServer.renderToString(<MarkerPopup courtName={courtName} address={address} municipality={municipality} province={province} />));
            newMarker.on('popupclose', (e) => {
                this.setState({
                    selectedMarker: {} as MarkerDataInterface
                })
            });
            newMarker.on('popupopen', (e) => {
                this.setState({
                    selectedMarker: markerData
                });
            });
        })
    }

    cancelNewMarker() {
        console.log("CANCEL");
        this.setState({
            isNewMarkerOnTheMap: false,
            isUserAbleToAddNewMarker: true
        });
        this.newMarker.closePopup().removeFrom(this.map);
    }

    enableAddMarkerOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!this.context.user) {
            this.openModal('Tenés que estar logueado para registrar nuevas canchas');
            return;
        }

        if (!this.state.isUserAbleToAddNewMarker) { return }
        this.map.on('mousemove', this.markerFollowsCursor);
        this.map.once('click', this.addMarkerOnClick);
        this.setState({
            isNewMarkerOnTheMap: false,
            isUserAbleToAddNewMarker: false
        });
    }

    addMarkerOnClick(e: LeafletMouseEvent) {
        this.newMarker.addTo(this.map).bindPopup(ReactDOMServer.renderToString(<NewMarkerWithPopup />))
            .on('popupopen', (e) => {
                const popUp = e.target.getPopup();
                popUp.getElement().querySelector('.action-button').addEventListener('click', (e: any) => {
                    this.cancelNewMarker();
                });
            }).openPopup();

        this.map.off('mousemove', this.markerFollowsCursor)
        this.setState({
            isNewMarkerOnTheMap: true
        });
    }

    markerFollowsCursor(e: LeafletMouseEvent) {
        const newMarkerCustomIcon = L.icon({
            iconUrl: newMarkerIcon.src,
            iconSize: [45, 45],
            iconAnchor: [25, 55],
            popupAnchor: [-1, -50]
        });

        this.newMarker = this.newMarker ? this.newMarker.addTo(this.map) : L.marker([e.latlng.lat, e.latlng.lng], { draggable: true, icon: newMarkerCustomIcon }).addTo(this.map);
        this.newMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
    }

    async addMarkerToMap(newMarkerData: NewMarkerFormDataInterface) {
        const { courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition } = newMarkerData;
        
        const nameOrAddressIsEmpty = courtName === '' || address === '';

        if (!this.context.user) {
            this.openModal('Tenés que estar logueado para registrar nuevas canchas');
            return;
        } else if(nameOrAddressIsEmpty) {
            this.openModal('Tenés que ingresar un nombre y/o dirección de la cancha!');
            console.log('sd');
            return;
        }

        const coordinates: LatLngTuple = [this.newMarker.getLatLng().lat, this.newMarker.getLatLng().lng];

        const newMarkerDataToDatabase: MarkerDataInterface = {
            id: '',
            uid: this.context.user.uid,
            visits: 0,
            coordinates: coordinates,
            courtName: courtName,
            address: address,
            municipality,
            province,
            surfaceType: surfaceType,
            numberOfHoops: numberOfHoops,
            numberOfCourts: numberOfCourts,
            rimHeight: rimHeight,
            rimCondition: rimCondition
        }

        try {
            this.setState({
                registeringNewCourt: true
            });
            //First register the marker on the database, then update the UI
            await markerService.registerNewMarker(newMarkerDataToDatabase);

            this.setState({
                markers: [...this.state.markers, newMarkerDataToDatabase],
                selectedMarker: newMarkerDataToDatabase,
                isNewMarkerOnTheMap: false,
                isUserAbleToAddNewMarker: true,
            });

            this.openModal('Marcador agregado con éxito');

            this.setState({
                registeringNewCourt: false
            });

            const markerCustomIcon = L.icon({
                iconUrl: markerIcon.src,
                iconSize: [45, 45],
                iconAnchor: [25, 55],
                popupAnchor: [-1, -50]
            });

            const newMarker = L.marker(coordinates, { icon: markerCustomIcon }).bindPopup(ReactDOMServer.renderToString(<MarkerPopup courtName={courtName} address={address} municipality={municipality} province={province} />)).addTo(this.map).openPopup();
            newMarker.on('popupclose', (e) => {
                this.setState({
                    selectedMarker: {} as MarkerDataInterface
                })
            });
            newMarker.on('popupopen', (e) => {
                this.setState({
                    selectedMarker: newMarkerDataToDatabase
                });
            });
            this.newMarker.removeFrom(this.map);
            this.map.setView(coordinates);
        } catch (e: any) {
            this.setState({
                registeringNewCourt: false
            });
            this.openModal('Error al registrar el nuevo marcador');
        }

    }

    openModal(message: string) {
        this.setState({
            isModalOpen: true,
            message: message
        });
    }

    closeModal() {
        this.setState({
            isModalOpen: false
        })
    }

    render(): React.ReactNode {
        return (
            <div className="map-and-side-section-container m-auto">
                <div className="lg:flex lg:justify-center lg:items-center h-5/6 transition-all">
                    <div className="map-container lg:w-3/4 lg:h-screen h-screen mx-4 lg:mx-2">
                        <div className="relative flex justify-center items-center lg:h-full h-5/6">
                            <Tippy content={'Agregar Cancha'} theme={'material'} animation={'scale'} placement={'bottom'}>
                                <div onClick={(e) => this.enableAddMarkerOnClick(e)} className="absolute z-10 top-16 right-0 m-2 hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 bg-black rounded-full" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </Tippy>
                            <div id="mapid" className="m-auto lg:flex justify-center items-center h-5/6 w-full z-0 border-4"></div>
                        </div>

                    </div>
                    {this.state.isNewMarkerOnTheMap ?
                        <MarkerForm registeringNewCourt={this.state.registeringNewCourt} addMarkerToMap={(markerData: NewMarkerFormDataInterface) => { this.addMarkerToMap(markerData) }} />
                        :
                        <CourtInfo selectedMarker={this.state.selectedMarker} />
                    }
                    <AnimatePresence
                        initial={false}
                        mode='wait'
                    >
                        {this.state.isModalOpen && <Modal message={this.state.message} closeModal={() => this.closeModal()} />}
                    </AnimatePresence>
                </div>
            </div>
        )
    }
}

export default Map;