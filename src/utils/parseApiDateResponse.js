import {format} from "date-fns";

const parseApiDateResponse = (currentDateString, forecastDateString) => {
    const currentDate = new Date (currentDateString);
    const formattedCurrentDate = format(currentDate, 'eeee, MMMM d, h:mm a');

    const forecastDate = new Date (forecastDateString);
    const formattedForecastDate = format(forecastDate,'eeee, MMMM d');

    return {formattedCurrentDate, formattedForecastDate};
}

export default parseApiDateResponse;

