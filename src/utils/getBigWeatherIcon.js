import sunny from './../../public/icons/sunny.png';
import windy from './../../public/icons/windy.png';
import rain from './../../public/icons/rain.png';
import cloudyrain from './../../public/icons/cloudy.png';
import snowy from './../../public/icons/snowy.png';
import storm from './../../public/icons/storm.png';
import cloudysun from './../../public/icons/cloudy-1.png';
import cloudy from './../../public/icons/cloud.png';

const getBigWeatherIcon = (weatherCondition) => {
    let bigWeatherIcon;

    if (weatherCondition === 'Sunny' || 'Clear ') {
        bigWeatherIcon = sunny;
    } else {
        bigWeatherIcon = cloudy;
    }

    return bigWeatherIcon;
}

export default bigWeatherIcon;