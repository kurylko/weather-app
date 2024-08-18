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
    let [usersLocation, setUsersLocation] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const {location, error: locationError} = useUserLocation();
    const {latitude, longitude} = location;
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
            usersLocation = await getCoordinates({city: searchInput});
            return usersLocation;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    }

    console.log("searchinput:", searchInput);
    console.log("userslocation:", usersLocation);
    //console.log("forecast", forecast);

    return (
        <main className='main-page'>
            <SearchBar searchInput={searchInput} handleChangeSearch={handleChangeSearch} handleSearch={handleSearch}/>
            {!location ? null : <CurrentWeatherCard currentWeather={currentWeather}/>}
            <ForecastCard forecast={forecast}/>
            {location ? <p> {`User's location: ${location.latitude}, ${location.longitude}`} </p> :
                <p> No location detected </p>}
        </main>
    );
}
