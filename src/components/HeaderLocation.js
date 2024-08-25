import pin from './../../public/icons/pin.png'
import Image from "next/image";

const HeaderLocation = ({city}) => {
    return (
        <div className='header-location-card'>
            <Image className='geo-icon' src={pin} alt='geo-icon'/>
            <span className='header-city'>{city}</span>
        </div>
    )
}

export default HeaderLocation;