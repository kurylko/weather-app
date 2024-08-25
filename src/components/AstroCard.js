import Image from "next/image";
import sunrise from './../../public/icons/sunrise.png';
import sunset from './../../public/icons/sunset.png';

const AstroCard = ({sunriseTime, sunsetTime, moonPhase, moonIcon}) => {


    return (
        <div className='astro-card'>
            <div className='astro-item'>
                <Image className='astro-icon' src={sunrise} alt='sunrise-icon'></Image>
                <span className='astro-text'>{sunriseTime}</span>
            </div>
            <div className='astro-item'>
                <Image className='astro-icon' src={sunset} alt='sunset-icon'></Image>
                <span className='astro-text'>{sunsetTime}</span>
            </div>
            <div className='astro-item'>
                <Image className='astro-icon' src={moonIcon}
                       alt='moon-icon'></Image>
                <span className='astro-text'>{moonPhase}</span>
            </div>
        </div>
    );
}

export default AstroCard;