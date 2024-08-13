import React from "react";

const ForecastCard = ({forecast}) => {
    if (!forecast || !forecast.forecast) {
        return <div>The weather forecast is not available. Please, try again later. </div>
    }
    return(
        <div>Forecast
            <div>UV-index: {forecast.forecast["forecastday"][1]["day"]["uv"]}</div>
        </div>
    );
}
export default ForecastCard;