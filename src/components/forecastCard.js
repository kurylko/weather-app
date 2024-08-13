import React from "react";
import parseApiDateResponse from "@/utils/parseApiDateResponse";

const ForecastCard = ({forecast}) => {
    if (!forecast || !forecast.forecast) {
        return <div>The weather forecast is not available. Please, try again later. </div>
    }
    const forecastWithCurrentDay = forecast.forecast["forecastday"];
    const forecastWithoutCurrentDay = forecastWithCurrentDay.slice(1);
    //const forecastDateString = forecast.forecast["forecastday"]["date"];

    return (
        <div> Weather for next 3 days
            <div class="flex gap-5">
                {forecastWithoutCurrentDay.map((forecastDay) =>
                    <div key={forecastDay.date} class='flex-col'>
                        <div>{parseApiDateResponse({ dateString: forecastDay["date"] })}</div>
                        <div>{forecastDay.day.condition.text}</div>
                        <img src={forecastDay.day.condition.icon}></img>
                        <div>Temperature: {`${forecastDay.day.maxtemp_c} - ${forecastDay.day.mintemp_c} C°`}</div>
                        <div>Humidity: {`${forecastDay.day.avghumidity}%`}</div>
                        <div>Wind: {`${forecastDay.day.maxwind_kph} km/h`}</div>
                        <div>UV-index: {forecastDay.day.uv}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ForecastCard;