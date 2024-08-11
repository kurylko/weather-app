'use client';

import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";

export default function Home() {

    const  {location, error: locationError} = useUserLocation();
    const { latitude, longitude } = location;
    const {currentWeather, error: currentWeatherError} = useCurrentWeather();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
        {location ? <p> {location.latitude} </p> : <p> No location detected </p>}
        {location ? <p> {currentWeather} </p> : <p> No weather detected </p>}
    </main>
  );
}
