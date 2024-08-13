'use client';

import {useState} from "react";
import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import CurrentWeatherCard from "@/components/currentWeatherCard";
import SearchBar from "@/components/searchBar";
import ForecastCard from "@/components/forecastCard";
import useForecast from "@/hooks/useForecast";

export default function Home() {
    let [usersLocation, setUsersLocation] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const { location, error: locationError} = useUserLocation();
    const { latitude, longitude } = location;
    const {currentWeather, error: currentWeatherError} = useCurrentWeather(latitude, longitude);
    const {forecast, error: forecastError} = useForecast();

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


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SearchBar searchInput={searchInput} handleChangeSearch={handleChangeSearch} handleSearch={handleSearch}/>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"/>
        {location ? <p> {`User's location: ${location.latitude}, ${location.longitude}`} </p> : <p> No location detected </p>}
        {!location ? null : <CurrentWeatherCard currentWeather={currentWeather}/>}
        <ForecastCard forecast={forecast}/>
    </main>
  );
}
