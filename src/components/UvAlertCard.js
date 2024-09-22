import uv from '@public/icons/uv-warn.png'
import Image from 'next/image'

const UvAlertCard = ({ uVlevel, alertMessage }) => {
  return (
    <div className="uv-alert-card">
      <Image className="uv-alert-icon" src={uv} alt="uv-icon" />
      <div className="uv-alert-text">
        <span>{uVlevel}</span>
        <span className="uv-alert-desc">{alertMessage}</span>
      </div>
    </div>
  )
}

export default UvAlertCard
