import React, { useEffect, useRef, useState } from 'react'

import './Weather.css'
import { use } from 'react'

// import all images

import cloud_icon from '../assets/cloud.png'

import clear_icon from '../assets/clear.png'

import drizzle_icon from '../assets/drizzle.png'

import rain_icon from '../assets/rain.png'

import snow_icon from '../assets/snow.png'





const Weather = () => {

    // add useref

    const inputRef =useRef()

    // create state for store api details
    
    const [weatherData, setWeatherData] =useState(false)

    // object for icons

    const allIcons ={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon

    }

  


    // function for api call

    const search  =async (city)=>{

        if(city ==""){
            alert("Enter city name!!!")
            return
        }
        try {
            
            // url . use api key from .env

            // &units=metric for get in degree cel

            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            // fetch the api to get the url
            const response = await fetch(url)

            // convert the response usin json method
            const data= await response.json()


            if(!response.ok){
                alert(data.message)
                return
            }
            console.log(data);

            // save the icons
            const icon =allIcons[data.weather[0].icon] || clear_icon

            // store the api data using object
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                minTemp:Math.floor(data.main.temp_min),
                maxTemp:Math.floor(data.main.temp_max),
                location:data.name,
                country:data.sys.country,
                icon:icon,
                descrip: data.weather[0]?.description,
                pressure:data.main.pressure
            })
            

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
            
            
        }
    }


  


  return (



    <div className='main'>
      
    <div className="container">

      {/* search bar  */}
      <div className="search-container">

        
        <div className="search-box">
        <h1 className='head' style={{fontSize:"24px",fontWeight:"600", marginBottom:"18px",textAlign:"center"}}>Weather Forecast</h1>
          <form action="" className='search-form'>

            {/* add useref */}
            <input className='input' ref={inputRef} type="text" placeholder='Enter city name...' />
            {/* whatever you type in the input field that is passed in the search through onclick */}
            <button className='btn' onClick={(e)=>{
                e.preventDefault();
                search(inputRef.current.value)
            }} ><i class="fa-solid fa-magnifying-glass" ></i></button>
          </form>
        </div>
      </div>

     {/* function for if any error in api */}
      {weatherData && (

        //    card to display details

    <div className="weather-card">
      <div className="text-center" style={{marginBottom:"24px"}}>
        
        {/* location */}
        <div className="loacation d-flex justify-content-center align-items-center" style={{gap:"8px", fontSize:"18px"}}>
          <span className='city'>{weatherData.location}</span>
          <span className='country'>{weatherData.country}</span>
        </div>
      </div>

       {/* temperature details */}
      <div className="weather-info " style={{borderRadius:"16px", padding:"24px", margin:"24px 0"}}>
      
        <div className="temperature" style={{fontSize:"64px", fontWeight:"600"}}>
          <h1>{weatherData.temperature}°c</h1>
           <div><img src={weatherData.icon} className='img-fluid w-50'  alt="" /></div>
        </div>
        
           <div className='weather-condition'>
              <div className="condition">{weatherData.descrip}</div>
              <div className="high-low">H: {weatherData.maxTemp} °c L: {weatherData.minTemp}°c</div>
           </div>
           
        </div>

        
    

    {/* other details */}

    <div className="weather-details">

      <div className="detail-item">
        <span className='label'>Humidity</span>
        <span className='value ms-1'>{weatherData.humidity}%</span>
      </div>

      <div className="detail-item">
        <span className='label'>Wind</span>
        <span className='value ms-1'>{weatherData.windSpeed} km/h</span>
      </div>

      <div className="detail-item">
        <span className='label'>Pressure</span>
        <span className='value ms-1'>{weatherData.pressure} hPa</span>
      </div>
    </div>

    </div>

      )}


   

  </div>
  
    </div>
  )
}

export default Weather