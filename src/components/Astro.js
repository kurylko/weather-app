import Image from "next/image";
import sunrise from './../../public/icons/sunrise.png';
import sunset from './../../public/icons/sunset.png';
import newMoon from './../../public/icons/new-moon.png';
import crescentMoon from './../../public/icons/crescent-moon.png';
import fullMoon from './../../public/icons/full-moon.png';

const Astro = ({forecast}) => {

    if (!forecast?.forecast) {
        return;
    }

    const astroOfCurrentDay = forecast.forecast['forecastday'][0]['astro'];

    function handleMoonIcon(moonPhase) {
        const moonIcons = {
            'New Moon': newMoon,
            'Waning Crescent': newMoon,
            'Full Moon': fullMoon,
        };

        return moonIcons[moonPhase] || crescentMoon;
    }


    return (
        <div className='astro-card'>
            <div className='astro-item'>
                <Image className='astro-icon' src={sunrise} alt='sunrise-icon'></Image>
                <span className='astro-text'>{astroOfCurrentDay.sunrise}</span>
                </div>
            <div className='astro-item'>
                <Image className='astro-icon' src={sunset} alt='sunset-icon'></Image>
                <span className='astro-text'>{astroOfCurrentDay.sunset}</span>
                </div>
            <div className='astro-item'>
                <Image className='astro-icon' src={handleMoonIcon(astroOfCurrentDay.moon_phase)}
                       alt='moon-icon'></Image>
                <span className='astro-text'>{astroOfCurrentDay.moon_phase}</span>
                </div>
        </div>
    );
}

export default Astro;