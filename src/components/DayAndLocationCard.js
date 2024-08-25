const DayAndLocationCard = ({city, region, country, date}) => {
    return (
        <div className='location-card'>
            <span className='city-name'>{city}</span>
            <span className='divider' style={{width: '80%'}}></span>
            <span className='region-name'>{`${region}, ${country}`}</span>
            <div className='location-card-day'>{date}</div>
        </div>
    )
}

export default DayAndLocationCard;