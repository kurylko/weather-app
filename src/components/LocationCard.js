const LocationCard = ({city, region, country}) => {
    return (
        <div className='location-card'>Location:
            <div>{city}</div>
            <div>{region}</div>
            <div>{country}</div>
        </div>
    )
}

export default LocationCard;