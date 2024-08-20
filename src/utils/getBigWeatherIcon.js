import sunny from './../../public/icons/sunny.png';
import rain from './../../public/icons/rain.png';
import cloudyrain from './../../public/icons/cloudy.png';
import snowy from './../../public/icons/snowy.png';
import storm from './../../public/icons/storm.png';
import cloudysun from './../../public/icons/cloudy-1.png';
import cloudy from './../../public/icons/cloud.png';
import mist from './../../public/icons/mist.png';
import blowingsnow from './../../public/icons/blowingsnow.png';
import blizzard from './../../public/icons/blizzard.png';
import drizzle from './../../public/icons/drizzle.png';
import freezyrain from './../../public/icons/freezingrain.png';
import thundersnow from './../../public/icons/thundersnow.png';
import hail from './../../public/icons/hail.png';

const getBigWeatherIcon = (weatherCondition) => {
    let bigWeatherIcon;

    if (weatherCondition === 'Sunny' || weatherCondition === 'Clear ') {
        bigWeatherIcon = sunny;
    } else if (weatherCondition === 'Patchy rain nearby') {
        bigWeatherIcon = cloudyrain;
    } else if (weatherCondition === 'Partly Cloudy') {
        bigWeatherIcon = cloudysun;
    } else if (weatherCondition === 'Overcast' || weatherCondition === 'Cloudy') {
        bigWeatherIcon = cloudy;
    } else if (weatherCondition === 'Mist' || weatherCondition === 'Fog' || weatherCondition === 'Freezing fog') {
        bigWeatherIcon = mist;
    } else if (weatherCondition === 'Blowing snow') {
        bigWeatherIcon = blowingsnow;
    } else if (weatherCondition === 'Blizzard') {
        bigWeatherIcon = blizzard;
    } else if (weatherCondition === 'Patchy light drizzle' || weatherCondition === 'Light drizzle' || weatherCondition === 'Light freezing rain' || weatherCondition === 'Freezing drizzle' || weatherCondition === 'Patchy light rain' || weatherCondition === 'Light rain' || weatherCondition === 'Moderate rain at times' || weatherCondition === 'Moderate rain' || weatherCondition === 'Light freezing rain') {
        bigWeatherIcon = drizzle;
    } else if (weatherCondition === 'Heavy rain at times' || weatherCondition === 'Heavy rain'|| weatherCondition === 'Moderate or heavy rain shower') {
        bigWeatherIcon = rain;
    } else if (weatherCondition === 'Moderate or heavy freezing rain' || weatherCondition === 'Heavy freezing drizzle' ){
        bigWeatherIcon = freezyrain;
    } else if (weatherCondition === 'Light sleet' || weatherCondition === 'Moderate or heavy sleet' || weatherCondition === 'Patchy light snow' || weatherCondition === 'Light snow' || weatherCondition === 'Patchy moderate snow' || weatherCondition === 'Moderate snow' || weatherCondition === 'Patchy heavy snow' || weatherCondition === 'Heavy snow' || weatherCondition === 'Moderate or heavy sleet showers' || weatherCondition === 'Light snow showers' || weatherCondition === 'Moderate or heavy snow showers'){
        bigWeatherIcon = snowy;
    } else if (weatherCondition === 'Patchy light snow with thunder' || weatherCondition === 'Moderate or heavy snow with thunder'){
        bigWeatherIcon = thundersnow;
    } else if (weatherCondition === 'Moderate or heavy rain with thunder' || weatherCondition === 'Patchy light rain with thunder' || weatherCondition === 'Torrential rain shower' || weatherCondition === 'Thundery outbreaks possible'){
        bigWeatherIcon = storm;
    } else if (weatherCondition === 'Heavy freezing drizzle' || weatherCondition === 'Freezing drizzle' || weatherCondition === 'Ice pellets' || weatherCondition === 'Light showers of ice pellets' || weatherCondition === 'Moderate or heavy showers of ice pellets'){
        bigWeatherIcon = hail;
    }
    else {
        bigWeatherIcon = cloudy;
    }

    return bigWeatherIcon;
}

export default getBigWeatherIcon;