const LocationCard = ({ city, region, country }) => (
  <div className="location-card">
    <span className="city-name">{city}</span>
    <span className="divider" style={{ width: '80%' }}></span>
    <span className="region-name">{`${region ? `${region}, ` : ''}${country}`}</span>
  </div>
)
export default LocationCard
