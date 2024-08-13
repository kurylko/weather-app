import React from "react"
import parseApiDateResponse from "@/utils/parseApiDateResponse";

const CurrentWeatherCard = ({currentWeather, formattedCurrentDate}) => {
    if (!currentWeather || !currentWeather.current) {
        return (
            <div>The weather data is not available. Please, try again later. </div>
        )
    } else {

        const currentDateString = currentWeather.location.localtime;
        const date = parseApiDateResponse({dateString:currentDateString});

        //const date = new Date (dateString);
        // const formattedDate = format(date, 'eeee, MMMM d, h:mm a');

        function getCloudDescription(cloudPercentage) {
            if (cloudPercentage >= 91) {
                return 'The sky is completely overcast with dense clouds'
            } else if (cloudPercentage >= 76) {
                return 'The sky is mostly covered with clouds'
            } else if (cloudPercentage >= 51) {
                return 'The sky is mostly cloudy with some clear spots'
            } else if (cloudPercentage >= 26) {
                return 'The sky is partly cloudy with significant clear patches'
            } else if (cloudPercentage >= 11) {
                return 'The sky is partly cloudy with occasional clouds'
            } else if (cloudPercentage >= 1) {
                return 'The sky is mostly clear with a few clouds'
            } else {
                return 'The sky is completely clear with no clouds.'
            }
        }


        return (
            <div class='flex-col items-center w-400 bg-zinc-200 rounded-lg m-10 p-10'>Current weather card
                <div>{`${currentWeather.location.name}, ${currentWeather.location.region} (${currentWeather.location.country})`}</div>
                <div>{date}</div>
                <div>
                    <img src={currentWeather.current.condition.icon}></img>
                    <p>{currentWeather.current.condition.text}</p>
                </div>
                <div>Humidity: {`${currentWeather.current.humidity}%`}</div>
                <div>Current temperature: {`${currentWeather.current.temp_c} C°`}</div>
                <div>Feels like: {`${currentWeather.current.feelslike_c} C°`}</div>
                <div>Wind: {`${currentWeather.current.wind_dir}, ${currentWeather.current.wind_kph} km/h`}</div>
                <div>Pressure: {`${currentWeather.current.pressure_mb} mb`}</div>
                <div>UV-index: {currentWeather.current.uv}</div>
                <div>Clouds: {getCloudDescription(currentWeather.current.cloud)}</div>
            </div>
        );
    }
}
export default CurrentWeatherCard;