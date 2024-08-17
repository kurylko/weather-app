'use client';

import {useState} from "react";
import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import CurrentWeatherCard from "@/components/currentWeatherCard";
import SearchBar from "@/components/searchBar";
import ForecastCard from "@/components/forecastCard";
import useForecast from "@/hooks/useForecast";
import './global.css';

export default function Home() {
    let [usersLocation, setUsersLocation] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const { location, error: locationError} = useUserLocation();
    const { latitude, longitude } = location;
    const {currentWeather, error: currentWeatherError} = useCurrentWeather(latitude, longitude);
    const {forecast, error: forecastError} = useForecast(latitude, longitude);

    if (!searchInput) {
        usersLocation = location;
    } else {
        usersLocation = searchInput;
    }

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        console.log(searchInput);
    }

    console.log(usersLocation);
    console.log(forecast);


  return (
    <main className='main-page'>
        <SearchBar searchInput={searchInput} handleChangeSearch={handleChangeSearch} handleSearch={handleSearch}/>
        {!location ? null : <CurrentWeatherCard currentWeather={currentWeather}/>}
        <ForecastCard forecast={forecast}/>
        {location ? <p> {`User's location: ${location.latitude}, ${location.longitude}`} </p> : <p> No location detected </p>}
    </main>
  );
}
