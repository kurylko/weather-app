import {format} from "date-fns";

const parseApiDateResponse = ({dateString}) => {
    const date = new Date (dateString);
    const formattedDate = format(date, 'eeee, MMMM d');

    //const forecastDate = new Date ();
    //const formattedForecastDate = format(forecastDate,'eeee, MMMM d');
    return formattedDate;
}


export default parseApiDateResponse;

