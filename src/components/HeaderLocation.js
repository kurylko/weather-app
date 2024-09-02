import pin from './../../public/icons/pin.png'
import Image from 'next/image'

const HeaderLocation = ({ city, icon, currentWeatherCondition }) => {
  return (
    <div className="header-location-card">
      <Image className="geo-icon" src={pin} alt="geo-icon" />
      <span className="header-city">{city}</span>
      {!!currentWeatherCondition && (
        <Image className="geo-weather-icon" src={icon} alt="weather-icon" />
      )}
    </div>
  )
}

export default HeaderLocation
