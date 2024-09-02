import dust from '@public/icons/dust.png'
import Image from 'next/image'

const AirQualityCard = ({ airQualityDescription }) => {
  return (
    <div className="air-quality-card">
      <Image className="air-quality-icon" src={dust} alt="dust-icon" />
      <span>{airQualityDescription}</span>
    </div>
  )
}

export default AirQualityCard
