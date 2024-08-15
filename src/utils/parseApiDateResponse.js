import {format} from "date-fns";

const parseApiDateResponse = (dateString, formatType = 'dayAndDate') => {
    const date = new Date (dateString);
    let formattedDate;

    switch (formatType) {
        case 'dayAndDate':
            formattedDate = format(date, 'eeee, MMMM d'); // Monday, August 15
            break;
        case 'dayOnly':
            formattedDate = format(date, 'eeee'); // Monday
            break;
        case 'dateOnly':
            formattedDate = format(date, 'MMMM d'); // August 15
            break;
        default: formattedDate = format(date, 'eeee, MMMM d'); // Monday, August 15
    }

    return formattedDate;
}


export default parseApiDateResponse;

