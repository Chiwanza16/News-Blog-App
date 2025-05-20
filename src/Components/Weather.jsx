import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  useEffect (() => {
    async function fetchDefaultLocation () {
      const defaultLocation = "Johannesburg"

       const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=5b0fe3b392444acebb56aa3733ab7c74`

       const response = await axios.get(url);
       setData(response.data)
    }
    fetchDefaultLocation()
  }, []);

async function search() {
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=5b0fe3b392444acebb56aa3733ab7c74`

 try {
  const response = await axios.get(url)
  if(response.data.cod !== 200) {
    setData({notFound: true})
  }else {    
    setData(response.data)
    setLocation('')
  }
  }
  catch (error) {
    if(error.response && error.response.status === 404) {
      setData({notFound: true})
    }else {
      console.error('An unexpected error occured', error)
    }
 }

}  

function handleInputChange (e) {
  setLocation(e.target.value)
}

function handleKeyDown (e) {
  if(e.key == 'Enter') {
    search()
  }
}

function getWeatherIcon (weatherType) {
  switch (weatherType){
    case 'Clear':
      return <i className="bx bxs-sun"></i>
    case 'Clouds':
      return <i className="bx bxs-cloud"></i>
    case 'Rain':
      return <i className="bx bxs-cloud-rain"></i>
    case 'Thunderstorm':
      return <i className="bx bxs-cloud-lightning"></i>
    case 'Snow':
      return <i className="bx bx-cloud-snow"></i>
    case 'Haze':
    case "Mist":
      return <i className="bx bxs-cloud"></i>
    default:
      return <i className="bx bxs-cloud"></i>
  }

}

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input type="text" placeholder="Enter Location" value={location} 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}/>
          <i className="fa-solid fa-magnifying-glass" onClick={search} ></i>
        </div>
      </div>
      {data.notFound ? (
        <div className="not-found"> Not Found ⛔</div>
        ) : (
        <div className="weather-data">
         {data.weather && data.weather[0] && getWeatherIcon (data.weather[0].main)}
         <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
         <div className="temp">{data.main ? `${Math.floor(data.main.temp)}` : null} &deg;</div>
        </div>
      )} 
    </div>
   
  )
  
}

export default Weather
