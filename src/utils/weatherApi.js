export const getCoordinates = async (city) => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  )
  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    return null
  }

  const result = data.results[0]
  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude
  }
}

export const getWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
  )
  const data = await response.json()

  return data.current
}