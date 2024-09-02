import Image from 'next/image'

import dust from './../../public/icons/dust.png'

const AirQualityCard = ({ airQuialityDescription }) => {
  return (
    <div className="air-quality-card">
      <Image className="air-quality-icon" src={dust} alt="dust-icon" />
      <span>{airQuialityDescription}</span>
    </div>
  )
}

export default AirQualityCard
