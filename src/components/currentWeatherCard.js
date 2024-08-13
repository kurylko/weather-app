import React from "react"
import {format} from "date-fns";

const CurrentWeatherCard = ({currentWeather}) => {
    if (!currentWeather || !currentWeather.current) {
        return (
            <div>The weather forecast is not available. Please, try again later. </div>
        )
    } else {

        const dateString = currentWeather.location.localtime;
        const date = new Date (dateString);
        const formattedDate = format(date, 'eeee, MMMM d, yyyy h:mm a');

        console.log(formattedDate);

        return (
            <div class='flex-col items-center w-400 bg-zinc-200 rounded-lg m-10 p-10'>Current weather card
                <div>{`${currentWeather.location.name}, ${currentWeather.location.region} (${currentWeather.location.country})`}</div>
                <div>{currentWeather.current.condition.text}</div>
                <div>{formattedDate}</div>
            </div>
        );
    }
}
export default CurrentWeatherCard;