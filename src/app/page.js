'use client';

import {useState} from "react";
import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import CurrentWeatherCard from "@/components/currentWeatherCard";
import SearchBar from "@/components/searchBar";
import ForecastCard from "@/components/forecastCard";
import useForecast from "@/hooks/useForecast";
import './global.css';
import {getCoordinates} from "@/utils/getCoordinates";

export default function Home() {
    const [searchLocation, setSearchLocation] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const {actualLocation, error: locationError} = useUserLocation();
    const {latitude, longitude} = actualLocation;
    const {currentWeather, error: currentWeatherError} = useCurrentWeather(latitude, longitude);
    const {forecast, error: forecastError} = useForecast(latitude, longitude);

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleSearch = async () => {
        if (!searchInput || searchInput.trim() === '') {
            return null;
        }
        try {
            const coordinates = await getCoordinates({city: searchInput});
            setSearchLocation(coordinates);
            return searchLocation;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    }

    const handleLocationDisplay = () => {
        let displayLocation;

        if (searchLocation) {
            console.log("Search Location:", searchLocation);
            displayLocation = searchLocation;
        } else if (actualLocation && !searchLocation){
            console.log("Actual Location:", actualLocation);
            displayLocation = actualLocation;
        } else {
            console.log('No location');
            displayLocation = null;
        }
        return displayLocation;
    }

    const locationDisplay = handleLocationDisplay();


    console.log("searchinput:", searchInput);
    console.log("searchlocation:", searchLocation);

    return (
        <main className='main-page'>
            <SearchBar searchInput={searchInput} handleChangeSearch={handleChangeSearch} handleSearch={handleSearch}/>
            {!actualLocation ? null : <CurrentWeatherCard currentWeather={currentWeather}/>}
            <ForecastCard forecast={forecast}/>
            {actualLocation ? <p> {`User's location: ${actualLocation.latitude}, ${actualLocation.longitude}`} </p> :
                <p> No location detected </p>}
            <p>{`User's Display location: ${locationDisplay.latitude}, ${locationDisplay.longitude}`}</p>
        </main>
    );
}
