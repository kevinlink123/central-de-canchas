import React, { Component, ChangeEvent } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import provinceAndCitiesDataJSON from '../../public/province-and-cities-data.json';

import { NewMarkerFormDataInterface } from '../../types/Map.interface';
import { ProvinceDataInterface } from '../../types/MarkerForm.interface';

interface MarkerFormProps {
    addMarkerToMap: (newMarkerData: NewMarkerFormDataInterface) => void;
    registeringNewCourt: boolean;
}

interface MarkerFormState {
    courtName: string;
    address: string;
    municipality: string;
    province: string;
    surfaceType: string;
    numberOfHoops: string;
    numberOfCourts: string;
    rimHeight: string;
    rimCondition: string;
}

class MarkerForm extends Component<MarkerFormProps, MarkerFormState> {
    provinceAndCitiesData: ProvinceDataInterface[] = provinceAndCitiesDataJSON;
    static contextType = AuthContext;
    context!: React.ContextType<typeof AuthContext>;

    constructor(props: MarkerFormProps) {
        super(props);
        this.state = {
            courtName: '',
            address: '',
            municipality: 'Villa Devoto',
            province: 'Buenos Aires',
            surfaceType: 'Cemento',
            numberOfHoops: '1',
            numberOfCourts: '1',
            rimHeight: 'Alto',
            rimCondition: 'Excelente'
        }
        this.addMarker = this.addMarker.bind(this);
        this.handleCourtNameChange = this.handleCourtNameChange.bind(this);
        this.handleaddressChange = this.handleaddressChange.bind(this);
        this.handleSurfaceTypeChange = this.handleSurfaceTypeChange.bind(this);
        this.handleNumberOfHoopsChange = this.handleNumberOfHoopsChange.bind(this);
        this.handleNumberOfCourtsChange = this.handleNumberOfCourtsChange.bind(this);
        this.handleRimHeightChange = this.handleRimHeightChange.bind(this);
        this.handleRimConditionChange = this.handleRimConditionChange.bind(this);
        this.handleMunicipalityChange = this.handleMunicipalityChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
    }

    handleCourtNameChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            courtName: e.target.value
        })
    }

    handleaddressChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            address: e.target.value
        })
    }

    handleSurfaceTypeChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            surfaceType: e.target.value
        });
    }

    handleNumberOfHoopsChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            numberOfHoops: e.target.value
        });
    }

    handleNumberOfCourtsChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            numberOfCourts: e.target.value
        });
    }

    handleRimHeightChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            rimHeight: e.target.value
        });
    }

    handleRimConditionChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            rimCondition: e.target.value
        });
    }

    handleMunicipalityChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            municipality: e.target.value
        });
    }

    handleProvinceChange(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({
            province: e.target.value
        });
    }

    renderProvincies() {
        const provincies = this.provinceAndCitiesData.map((province) => {
            return (<option key={province.id} value={`${province.nombre}`}>{province.nombre}</option>)
        });
        return (provincies);
    }

    renderMunicipalities() {
        const provinceIndex = this.provinceAndCitiesData.findIndex((province) => { return province.nombre === this.state.province })

        const cities = this.provinceAndCitiesData[provinceIndex].ciudades.map((city) => {
            return (<option key={city.id} value={`${city.nombre}`}>{city.nombre}</option>)
        });
        return (cities)
    }

    addMarker(e: any) {
        e.preventDefault();

        const { courtName, address, municipality, province, surfaceType, numberOfHoops, numberOfCourts, rimHeight, rimCondition } = this.state;

        const newMarkerData = {
            visits: 0,
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

        this.props.addMarkerToMap(newMarkerData);
    }

    render() {
        return (
            <div className="add-marker-form-container block lg:flex lg:flex-col lg:w-1/4 w-5/6 h-screen m-auto justify-center items-center">
                <form className='border-2 rounded-lg border-gray-200 p-4 h-5/6 overflow-scroll'>
                    <div className="name-and-address-container m-auto flex flex-col justify-center items-center mb-8">
                        <div className="flex mb-4 text-center font-bold font-mono tracking-tight">Nombre y ubicacion</div>
                        <input
                            name="name"
                            className="relative rounded-lg border-b-4 my-1 px-3 py-1 lg:w-full transition-border-bottom-width focus:border-b-8"
                            type="text"
                            placeholder="Nombre"
                            value={this.state.courtName}
                            onChange={this.handleCourtNameChange}
                        />
                        <input
                            name="address"
                            className="relative rounded-lg border-b-4 my-1 px-3 py-1 lg:w-full transition-border-bottom-width focus:border-b-8"
                            type="text"
                            placeholder="Direccion"
                            value={this.state.address}
                            onChange={this.handleaddressChange}
                        />
                        <label className='lg:w-full text-center mt-4'>
                            Provincia:
                            <select value={this.state.province} onChange={this.handleProvinceChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                {this.renderProvincies()}
                            </select>
                        </label>
                        <label className='lg:w-full text-center'>
                            Partido / Barrio:
                            <select value={this.state.municipality} onChange={this.handleMunicipalityChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                {this.renderMunicipalities()}
                            </select>
                        </label>
                    </div>
                    <div className='court-characteristics m-auto flex flex-col justify-center items-center my-4'>
                        <div className='flex mb-4 text-center font-bold font-mono tracking-tight'>Caracteristicas de la cancha</div>
                        <label className='lg:w-full text-center'>
                            Material del Suelo:
                            <select value={this.state.surfaceType} onChange={this.handleSurfaceTypeChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                <option value="Cemento">Cemento</option>
                                <option value="Pavimento">Pavimento</option>
                            </select>
                        </label>

                        <label className='lg:w-full text-center'>
                            Cantidad de Canchas disponibles:
                            <select value={this.state.numberOfCourts} onChange={this.handleNumberOfCourtsChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </label>

                        <label className='lg:w-full text-center'>
                            Cantidad de Aros:
                            <select value={this.state.numberOfHoops} onChange={this.handleNumberOfHoopsChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </label>

                        <label className='lg:w-full text-center'>
                            Altura de los Aros:
                            <select value={this.state.rimHeight} onChange={this.handleRimHeightChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                <option value="Alto">Alto</option>
                                <option value="Ligeramente Alto">Ligeramente Alto</option>
                                <option value="Altura Oficial">Altura Oficial</option>
                                <option value="Ligeramente Bajo">Ligeramente Bajo</option>
                                <option value="Bajo">Bajo</option>
                            </select>
                        </label>

                        <label className='lg:w-full text-center'>
                            Condicion de los Aros:
                            <select value={this.state.rimCondition} onChange={this.handleRimConditionChange} className='px-2 py-1 mb-4 rounded-lg text-center w-full'>
                                <option value="Excelente">Excelente</option>
                                <option value="Jugable">Jugable</option>
                                <option value="Mal Cuidados">Mal Cuidados</option>
                                <option value="Algunos Aros Rotos">Rotos</option>
                                <option value="Todos los Aros Rotos">Rotos</option>
                            </select>
                        </label>
                    </div>

                    <div className="submit-button-container flex justify-center items-center -mt-4">
                        <button
                            disabled={this.props.registeringNewCourt}
                            className="flex px-6 py-2 text-slate-800 font-semibold rounded-xl shadow shadow-slate-600 cursor-pointer bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:opacity-50"
                            onClick={this.addMarker}
                        >
                            {this.props.registeringNewCourt ?
                                <img
                                    src="/loading.png"
                                    alt="loading spinner"
                                    width={20}
                                    height={20}
                                    className='animate-spin mx-10'
                                /> :
                                'Agregar Marcador'
                            }
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MarkerForm;