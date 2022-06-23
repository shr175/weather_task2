// import day from './day.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import moment from 'moment';



function App() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [temp, setTemp] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [timezone, setTimezone] = useState(null);

  const appid ="fdb23322e4cc55a4014aaa3ea6e145e7"

  const failureCallback = error => {
    console.log('position', error);
    setError("Error");
  }
  const successCallback = (position) => {
    console.log("position", position);
    setLatitude(position?.coords?.latitude);
    setLongitude(position?.coords?.longitude);
  }

  useEffect(()=>{
    if (window.navigator.geolocation) {
      // Geolocation available
      window.navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
      // getCurrentPosition(successCallback, failureCallback);
     } 
  }, [])
  useEffect(() => {
    if (latitude && longitude) {
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`
    
    // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=12.9716&lon=77.5946&appid=fdb23322e4cc55a4014aaa3ea6e145e7`
    fetch(weatherUrl)
      .then(results => results.json())
      .then(data => {
        console.log("data",data);
        setTemp(parseInt(data?.main?.temp - 273.15));
        setName(data?.name);
        setSunrise(new Date(data?.sys?.sunrise * 1000).toLocaleTimeString('en-IN'));
        setSunset(new Date(data?.sys?.sunset * 1000).toLocaleTimeString('en-IN'));
        setDescription(data?.weather[0]?.description);
        setHumidity(data?.main?.humidity);
        setTimezone(data?.timezone);
        
      });
    }
  }, [latitude, longitude]); // <-- Have to pass in [] here!

  // console.log("temp", temp)
  // console.log("sunrise",sunrise.getHours());

  return (
    <div className='weather'>
 {/* <div>{temperature}</div> */}
      <header>
      {/* <h1>Weather Web Application</h1> */}
      
      <h1>{name}</h1>
      <h5> {moment().format('dddd')}{ " "}{moment().format('LL')} </h5>
      </header>

      <p><strong>Sunrise: {sunrise}</strong></p> 
      <p><strong>Sunset:   {sunset}</strong></p>
      <p><strong>Humidity: {humidity}%</strong></p>
      <p><strong>Timezone: {timezone}</strong></p>
 

      <h2>{temp}&deg;C</h2>
      <h3>{description}</h3>

        
      
      {/* if()
      {
        <div>
         <img src="./Day.png"/>
         </div>
      }
      else
      {
        <div>
          <img src="./night.png"/>
        </div>
      } */}
  
    
    </div>
  );
}

export default App;


