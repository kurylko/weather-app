export function getAirQualityDescription({ co, no2, o3, pm2_5, pm10, so2 }) {
  const thresholds = {
    pm2_5: {
      good: 12,
      mediocre: 35,
      bad: 55,
    },
    pm10: {
      good: 54,
      mediocre: 154,
      bad: 254,
    },
    no2: {
      good: 40,
      mediocre: 80,
      bad: 180,
    },
    o3: {
      good: 180,
      mediocre: 240,
      bad: 340,
    },
    so2: {
      good: 75,
      mediocre: 185,
      bad: 304,
    },
    co: {
      good: 4000,
      mediocre: 10000,
      bad: 20000,
    },
  }

  const isDataAvailable = [co, no2, o3, pm2_5, pm10, so2].every(
    (param) => param !== null && param !== undefined
  )
  if (!isDataAvailable) {
    return 'Air quality data is not available yet.'
  }

  const evaluateParameter = (value, param) => {
    const paramThresholds = thresholds[param]
    if (!paramThresholds) return 'unknown'

    if (value <= thresholds[param].good) {
      return 'good'
    } else if (value <= thresholds[param].mediocre) {
      return 'mediocre'
    } else if (value <= thresholds[param].bad) {
      return 'bad'
    } else {
      return 'very bad'
    }
  }

  const pm25Description = evaluateParameter(pm2_5, 'pm2_5')
  const pm10Description = evaluateParameter(pm10, 'pm10')
  const no2Description = evaluateParameter(no2, 'no2')
  const o3Description = evaluateParameter(o3, 'o3')
  const so2Description = evaluateParameter(so2, 'so2')
  const coDescription = evaluateParameter(co, 'co')

  const descriptions = [
    pm25Description,
    pm10Description,
    no2Description,
    o3Description,
    so2Description,
    coDescription,
  ]

  const overallQuality = descriptions.includes('very bad')
    ? 'very bad'
    : descriptions.includes('bad')
      ? 'bad'
      : descriptions.includes('mediocre')
        ? 'mediocre'
        : 'good'

  let overallAirDescription = `Overall air quality is ${overallQuality}.`
  let detailedAirDescription = `Detailed descriptions: PM2.5: ${pm25Description}, PM10: ${pm10Description}, NO2: ${no2Description}, O3: ${o3Description}, SO2: ${so2Description}, CO: ${coDescription}.`

  return { overallAirDescription, detailedAirDescription }
}
