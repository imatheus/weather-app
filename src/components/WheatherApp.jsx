import { useState } from 'react'
import sunny from '../assets/images/sunny.png'
import './WheatherApp.css'
import { getCoordinates, getWeather } from '../utils/weatherApi'

const WheatherApp = () => {
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChanges = (e) => {
    setLocation(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(location)
    }
  }

  const search = async (city) => {
    const normalizedCity = city.trim()

    if (!normalizedCity) {
      setError('Enter a city name')
      return
    }

    try {
      setLoading(true)
      setError('')

      const coordinates = await getCoordinates(normalizedCity)

      if (!coordinates) {
        setError('City not found')
        setData(null)
        return
      }

      const currentWeather = await getWeather(
        coordinates.latitude,
        coordinates.longitude
      )

      setData({
        city: coordinates.name,
        country: coordinates.country,
        temperature: currentWeather.temperature_2m,
        humidity: currentWeather.relative_humidity_2m,
        windSpeed: currentWeather.wind_speed_10m,
        weatherCode: currentWeather.weather_code,
        time: currentWeather.time
      })

      setLocation('')
    } catch (err) {
      console.error(err)
      setError('Unable to load weather data')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  console.log(location)

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">London</div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChanges}
              onKeyDown={handleKeyDown}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => search(location)}
            ></i>
          </div>
        </div>

        {loading && <div>Loading...</div>}

        {error && (
          <div className="not-found">{error}</div>
        )}

        {data && (
          <div className="weather">
            <img src={sunny} alt="Clear sky" />
            <div className="weather-type">{data.city}</div>
            <div className="temp">{data.temperature}°</div>
          </div>
        )}

        <div className="weather-date">
          <p>Sat, 15 Ago</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">{data ? data.humidity + '%' : '35%'}</div>
          </div>

          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">{data ? data.windSpeed + ' km/h' : '3 km/h'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheatherApp