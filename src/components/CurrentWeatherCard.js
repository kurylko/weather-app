import Image from 'next/image'
import React from 'react'

import Loader from '@/components/Loader'

import humidity2 from './../../public/icons/humidity-2.png'
import mist from './../../public/icons/mist.png'
import pressure from './../../public/icons/pressure.png'
import wind from './../../public/icons/wind.png'

const CurrentWeatherCard = ({
  currentWeather,
  error,
  loading,
  date,
  city,
  region,
  country,
  condition,
  temperature,
  feelsLike,
  cloud,
  humidityN,
  windDir,
  windKph,
  pressureN,
  uvIndex,
  uvIndexIcon,
}) => {
  const noWeatherDataMessage =
    'Sorry. The weather data is not available. Please, try again later.'
  const currentWeatherLoaderText = 'Loading current weather data...'

  if (loading) {
    return (
      <div className="no-weather-card">
        <Loader loaderText={currentWeatherLoaderText} />
      </div>
    )
  } else if (!currentWeather || !currentWeather.current) {
    return (
      <div className="current-weather-card">
        <Image
          src={mist}
          alt="no weather data"
          priority
          style={{ width: '100px', height: '100px', marginBottom: '10px' }}
        ></Image>
        {noWeatherDataMessage}
      </div>
    )
  }

  return (
    <div className="current-weather-card">
      <span className="current-location">{`${city}, ${region} (${country})`}</span>
      <span className="current-date">{date}</span>
      <div>
        <Image
          className="current-weather-image"
          src={condition}
          priority
          alt="big-weather-icon"
        ></Image>
      </div>
      <div className="current-temperature-container">
        <h1 className="current-temperature">{`${temperature} C°`}</h1>
        <span className="feels-like-temp">Feels like: {`${feelsLike} C°`}</span>
      </div>
      <span className="cloud-desc-text">{cloud}</span>
      <div className="current-weather-numbers">
        <div className="current-icon-number">
          <Image
            className="current-card-icon"
            src={humidity2}
            alt="humidity-icon"
          ></Image>
          <span className="current-card-icon-text">{`${humidityN}%`}</span>
        </div>
        <div className="current-icon-number">
          <Image
            className="current-card-icon"
            src={wind}
            alt="windy-icon"
          ></Image>
          <span className="current-card-icon-text">{`${windDir}, ${windKph} km/h`}</span>
        </div>
        <div className="current-icon-number">
          <Image
            className="current-card-icon"
            src={pressure}
            alt="pressure-icon"
          ></Image>
          <span className="current-card-icon-text">{`${pressureN} mb`}</span>
        </div>
        <div className="current-icon-number">
          <Image
            className="current-card-icon"
            src={uvIndexIcon}
            alt="uv-icon"
          ></Image>
          <span className="current-card-icon-text">{uvIndex}</span>
        </div>
      </div>
    </div>
  )
}
export default CurrentWeatherCard
