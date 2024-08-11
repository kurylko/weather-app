import React from "react"

const CurrentWeatherCard = ({currentWeather}) => {
    return(
        <div class='flex-col items-center w-400 bg-zinc-200 rounded-lg m-10 p-10'>Current weather card
        <div>{currentWeather}</div>
        </div>
    );
}
export default CurrentWeatherCard;