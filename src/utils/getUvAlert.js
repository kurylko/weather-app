export function getUvAlert({ uVIndex, isNightTime }) {
  let alertMessage
  let uVlevel

  if (uVIndex <= 2 && isNightTime) {
    uVlevel = 'Low UV-index'
    alertMessage = 'No UV protection needed.'
  } else if (uVIndex <= 2) {
    uVlevel = 'Low UV-index'
    alertMessage = 'Wear sunglasses if it`s bright outside.'
  } else if (uVIndex >= 3 && uVIndex <= 5) {
    uVlevel = 'Moderate UV-index'
    alertMessage = 'Wear sunglasses and use sunscreen with at least SPF 30.'
  } else if (uVIndex >= 6 && uVIndex <= 7) {
    uVlevel = 'High UV-index'
    alertMessage =
      'Apply broad-spectrum sunscreen with SPF 30+ generously every two hours.'
  } else if (uVIndex >= 8 && uVIndex <= 10) {
    uVlevel = 'Very high UV-index'
    alertMessage =
      'Seek shade, wear protective clothing, avoid being outdoors. Use SPF 30+ or higher and reapply every two hours.'
  } else {
    uVlevel = 'Extreme high UV-index'
    alertMessage =
      'Wear a wide-brimmed hat, sunglasses, protective clothing. Avoid outdoor activities. Apply SPF 50+ every two hours.'
  }

  return { uVlevel, alertMessage }
}
