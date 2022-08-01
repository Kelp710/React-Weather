import React, { useState } from 'react';
const api = {
  key: APIKEY,
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState({})


const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`
}

const search = (e) => {
  if (e.key ==="Enter") {
    if(location === ""){
      console.log(weather)
      setLocation("")
    }

      
    else {fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
    .then (res => res.json())
    .then (result => {
      if (result.message === "city not found") {
        setLocation("")
      }
      else {
      setWeather(result);
      setLocation("");
      console.log(result);
    }});
    }}
}
const isEmpty = Object.keys(weather).length === 0;

  return (
    <div className={(isEmpty == false) ? ((weather.main.temp > 17) ? "App-hot": `App-cold`): "App-cold"}>
      <main>
        <div className='search-box'>
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={eve => setLocation(eve.target.value)}
            value={location}
            onKeyPress={search}
          />
        </div>
        {(isEmpty == false) ? (
          <div>
            <div className='lacation-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{weather.main.temp.toFixed(1)}°c</div>
              <div id="icon"><img id="wicon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"/></div>
              <div className='weather'>{weather.weather[0].description}</div>
            </div>
          </div>
        ):("") }
      </main>
    </div>
  );
}


export default App;
