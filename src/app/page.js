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

    const {lat: searchLat, lon: searchLon} = searchLocation || {};
    const {actualLocation, error: locationError} = useUserLocation();
    const {lat: actualLat, lon: actualLon} = actualLocation;


    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleSearch = async () => {
        if (!searchInput || searchInput.trim() === '') {
            return null;
        }
        try {
            const {latitude: lat, longitude: lon} = await getCoordinates({city: searchInput});
            setSearchLocation({lat, lon});
            return searchLocation;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    }

    const handleLocationDisplay = () => {
        let location = null;

        if (searchLocation) {
            location = searchLocation;
        } else if (actualLocation && actualLocation.lat !== null && actualLocation.lon !== null)   {
            location = actualLocation;
        } else {
            console.log('No location detected');
            location = null;
        }
        const {lat: displayLocationLat, lon: displayLocationLon} = location || {};

        return location;
    }


    const locationDisplay = handleLocationDisplay() || { lat: null, lon: null };
    const {lat: locationDisplayLat, lon: locationDisplayLon} = locationDisplay;

    const {currentWeather, error: currentWeatherError, loading: currentWeatherLoading} = useCurrentWeather({currentWeatherLocation: locationDisplay});
    const {forecast, error: forecastError, loading: forecastLoading} = useForecast({forecastWeatherLocation: locationDisplay});

    return (
        <div className='home-page'>
            <SearchBar searchInput={searchInput} handleChangeSearch={handleChangeSearch} handleSearch={handleSearch}/>
            <CurrentWeatherCard currentWeather={currentWeather} loading={currentWeatherLoading}/>
            <ForecastCard forecast={forecast} loading={forecastLoading}></ForecastCard>
            {actualLocation ? <p> {`User's location: ${actualLocation.lat}, ${actualLocation.lon}`} </p> :
                <p> No location detected </p>}
            <p>{`User's Display location: ${locationDisplay.lat}, ${locationDisplay.lon}`}</p>
        </div>
    );
}
