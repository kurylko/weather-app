import React from "react"

const CurrentWeatherCard = ({currentWeather}) => {
    if (!currentWeather || !currentWeather.current) {
        return (
            <div>The weather forecast is not available. Please, try again later. </div>
        )
    } else {

        return (
            <div class='flex-col items-center w-400 bg-zinc-200 rounded-lg m-10 p-10'>Current weather card
                <div>{`${currentWeather.location.name}, ${currentWeather.location.region}`}</div>
                <div>{currentWeather.current.condition.text}</div>
            </div>
        );
    }
}
export default CurrentWeatherCard;