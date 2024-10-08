'use client'
import crescentMoon from '@public/icons/crescent-moon.png'
import fullMoon from '@public/icons/full-moon.png'
import newMoon from '@public/icons/new-moon.png'
import { useSelector } from 'react-redux'

import AirQualityCard from '@/components/AirQualityCard'
import AstroCard from '@/components/AstroCard'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import ForecastCard from '@/components/ForecastCard'
import HourlyWeatherCard from '@/components/HourlyWeatherCard'
import Loader from '@/components/Loader'
import LocationCard from '@/components/LocationCard'
import UvAlertCard from '@/components/UvAlertCard'
import useCurrentWeather from '@/hooks/useCurrentWeather'
import useForecast from '@/hooks/useForecast'
import useUserLocation from '@/hooks/useUserLocation'
import { selectPlaceFromSearch } from '@/state/selectors'
import { getAirQualityDescription } from '@/utils/getAirQualityDescription'
import { getBigWeatherIcon } from '@/utils/getBigWeatherIcon'
import { getUvAlert } from '@/utils/getUvAlert'
import { getUvIcon } from '@/utils/getUvIcon'
import parseApiDateResponse from '@/utils/parseApiDateResponse'

export default function WeatherPage() {
  const { geoLocationData, geoLocationLoading } = useUserLocation()
  const placeFromSearch = useSelector(selectPlaceFromSearch)

  const activeLocation = placeFromSearch || geoLocationData

  const {
    currentWeather,
    error: currentWeatherError,
    loading: currentWeatherLoading,
  } = useCurrentWeather({ currentWeatherLocation: activeLocation })
  const { forecast, loading: forecastLoading } = useForecast({
    forecastWeatherLocation: activeLocation,
  })

  const hourlyWeatherData = forecast?.forecast['forecastday'][0]['hour'] || []
  const hourlyWeatherDataForSpecificHours = hourlyWeatherData.length
    ? [0, 6, 12, 18].map((hourIndex) => hourlyWeatherData[hourIndex])
    : null

  const currentDay = forecast?.forecast['forecastday'][0]
  const currentDayAndDateString = currentDay?.date
    ? parseApiDateResponse(currentDay?.date, 'dayAndDate')
    : null

  const currentDateString = currentDay?.date
    ? parseApiDateResponse(currentDay?.date, 'dateAndMonth')
    : null

  const currentDayString = currentDay?.date
    ? parseApiDateResponse(currentDay?.date, 'dayOnly')
    : null

  const getInteger = (number) => Math.round(number)

  function getCloudDescription(cloudPercentage) {
    if (cloudPercentage >= 91) {
      return 'The sky is completely overcast with dense clouds'
    } else if (cloudPercentage >= 76) {
      return 'The sky is mostly covered with clouds'
    } else if (cloudPercentage >= 51) {
      return 'The sky is mostly cloudy with some clear spots'
    } else if (cloudPercentage >= 26) {
      return 'The sky is partly cloudy with significant clear patches'
    } else if (cloudPercentage >= 11) {
      return 'The sky is partly cloudy with occasional clouds'
    } else if (cloudPercentage >= 1) {
      return 'The sky is mostly clear with a few clouds'
    } else {
      return 'The sky is completely clear with no clouds.'
    }
  }

  const forecastWithCurrentDay = forecast?.forecast['forecastday']
  const noForecastMessage =
    'The weather forecast is not available. Please, try again later.'
  const forecastLoaderText = 'Loading weather forecast...'

  const astroOfCurrentDay = forecast?.forecast['forecastday'][0]['astro']

  function getMoonIcon(moonPhase) {
    const moonIcons = {
      'New Moon': newMoon,
      'Waning Crescent': newMoon,
      'Full Moon': fullMoon,
    }

    return moonIcons[moonPhase] || crescentMoon
  }

  const { co, defraIndex, no2, o3, pm2_5, pm10, so2, epaIndex } =
    forecast?.current?.air_quality || {}
  const airQualityDescription = getAirQualityDescription({
    co,
    defraIndex,
    no2,
    o3,
    pm2_5,
    pm10,
    so2,
    epaIndex,
  })
  const { uVlevel, alertMessage } = getUvAlert({
    uVIndex: currentWeather?.current?.uv,
  })

  return (
    <div className="weather-page">
      <div className="location-and-current">
        <CurrentWeatherCard
          currentWeather={currentWeather}
          error={currentWeatherError}
          loading={currentWeatherLoading || geoLocationLoading}
          date={currentDayAndDateString}
          city={currentWeather?.location?.name}
          region={currentWeather?.location?.region}
          country={currentWeather?.location?.country}
          condition={getBigWeatherIcon({
            weatherCondition: currentWeather?.current?.condition.text,
          })}
          temperature={currentWeather?.current?.temp_c}
          feelsLike={currentWeather?.current?.feelslike_c}
          cloud={getCloudDescription(currentWeather?.current?.cloud)}
          humidityN={currentWeather?.current?.humidity}
          windDir={currentWeather?.current?.wind_dir}
          windKph={currentWeather?.current?.wind_kph}
          pressureN={currentWeather?.current?.pressure_mb}
          uvIndexIcon={getUvIcon({ uvIndex: currentWeather?.current?.uv })}
          uvIndex={currentWeather?.current?.uv}
        />
        {currentWeather && (
          <div className="location-and-alerts-container">
            <div className="location-and-alerts-top">
              <LocationCard
                city={currentWeather?.location?.name}
                region={currentWeather?.location?.region}
                country={currentWeather?.location?.country}
              />
              <div className="date-and-air">
                <div className="date">
                  <p style={{ fontWeight: 'bold' }}>{currentDayString}</p>
                  <p>{currentDateString}</p>
                </div>
                <AirQualityCard
                  airQualityDescription={
                    airQualityDescription?.overallAirDescription
                  }
                />
              </div>
            </div>
            <UvAlertCard uVlevel={uVlevel} alertMessage={alertMessage} />
          </div>
        )}
      </div>

      <div className="forecast-and-hourly-container">
        <div className="forecast-cards-container">
          {!!forecast && (
            <h1 className="forecast-title-mob">Forecast for 3 days</h1>
          )}
          {!!forecast && (
            <span className="forecast-title-desk">
              <h1>Forecast</h1>
              <h2> for 3 days</h2>
            </span>
          )}
          {forecastLoading ? (
            <div className="current-weather-card no-weather-card">
              <Loader loaderText={forecastLoaderText} />
            </div>
          ) : (
            <div className="forecast-cards">
              {forecastWithCurrentDay ? (
                forecastWithCurrentDay.map((forecastDay) => (
                  <ForecastCard
                    key={forecastDay.date}
                    forecast={forecast}
                    loading={forecastLoading}
                    day={parseApiDateResponse(forecastDay?.date, 'dayOnly')}
                    condition={getBigWeatherIcon({
                      weatherCondition: forecastDay.day.condition.text,
                    })}
                    maxTemp={getInteger(forecastDay.day.maxtemp_c)}
                    minTemp={getInteger(forecastDay.day.mintemp_c)}
                    humidityN={forecastDay.day.avghumidity}
                    windN={getInteger(forecastDay.day.maxwind_kph)}
                    uvIcon={getUvIcon({ uvIndex: forecastDay.day.uv })}
                    uvIndex={forecastDay.day.uv}
                  />
                ))
              ) : (
                <span>{noForecastMessage} </span>
              )}
            </div>
          )}
        </div>

        <div className="hourly-weather-cards-container">
          {!!currentDayAndDateString && (
            <h1 className="current-day-hourly">{`Weather on ${currentDayAndDateString}`}</h1>
          )}
          <div className="hourly-weather-cards">
            {hourlyWeatherDataForSpecificHours?.map((hourly) => (
              <HourlyWeatherCard
                key={hourly.time}
                time={parseApiDateResponse(hourly.time, 'hourOnly')}
                temp={getInteger(hourly.temp_c)}
                humidity={hourly.humidity}
                wind={getInteger(hourly.wind_kph)}
                rain={hourly.chance_of_rain}
                condition={hourly.condition.text}
                uv={hourly.uv}
              />
            ))}
          </div>
        </div>
      </div>

      {!!forecast && (
        <div>
          <h1 className="current-day-hourly">Sun and Moon forecast</h1>
          <AstroCard
            forecast={forecast}
            sunriseTime={astroOfCurrentDay?.sunrise}
            sunsetTime={astroOfCurrentDay?.sunset}
            moonPhase={astroOfCurrentDay?.moon_phase}
            moonIcon={getMoonIcon(astroOfCurrentDay?.moon_phase)}
          />
        </div>
      )}
    </div>
  )
}
