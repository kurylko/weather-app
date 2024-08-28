import Image from "next/image";
import dust from './../../public/icons/dust.png'

const UvAlertCard = () => {
    return (
        <div className='uv-alert-card'>
            <Image className='uv-alert-icon' src={dust} alt='uv-icon'/>
            <span>Alert text</span>
        </div>

    );
}

export default UvAlertCard