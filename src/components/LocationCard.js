const LocationCard = ({city, region, country}) => {
    return (
        <div className='location-card'>
            <span className='city-name'>{city}</span>
            <span className='divider' style={{width: '80%'}}></span>
            <span>{`${region}, ${country}`}</span>
        </div>
    )
}

export default LocationCard;