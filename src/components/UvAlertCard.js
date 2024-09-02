import uv from '@public/icons/uv-warn.png'
import Image from 'next/image'

const UvAlertCard = ({ uVlevel, alertMessage }) => {
  return (
    <div className="uv-alert-card">
      <Image className="uv-alert-icon" src={uv} alt="uv-icon" />
      <span>{uVlevel}</span>
      <span>{alertMessage}</span>
    </div>
  )
}

export default UvAlertCard
