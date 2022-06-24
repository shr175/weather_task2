import React, {useState, useEffect} from 'react';
import './App.css';
import moment from 'moment';
// import Day from './Day.png';
// import night from './night.png';
import pcloudy from './pcloudy.svg';
import mcloudy from './mcloudy.svg';
import fog from './fog.svg';
// import clear from './clear.svg';
import drizzle from './drizzle.svg';
import snow from './snow.svg';
import rain from './rain.svg';
import storm from './storm.svg';


function WeatherImage({id}) {
  let weatherImage = ""
  switch (true) {
    case id < 300:
      weatherImage = <img className="forecast-img" src={storm} alt="storm icon" />;
      break;
    case id >= 300 && id < 500:
      weatherImage = <img className="forecast-img" src={drizzle} alt="drizzle icon" />;
      break;
    case id >= 500 && id < 600:
      weatherImage = <img className="forecast-img" src={rain} alt="rain icon" />;
      break;
    case id >= 600 && id < 700:
      weatherImage = <img className="forecast-img" src={snow} alt="snow icon" />;
      break;
    case id >= 700 && id < 800:
      weatherImage = <img className="forecast-img" src={fog} alt="fog icon" />;
      break;
    // case id === 800:
    //   id = <img className="forecast-img" src={clear} alt="clear icon" />;
    //   break;
    case id === 801:
      weatherImage = <img className="forecast-img" src={pcloudy} alt="particularly cloudy icon" />;
      break;
    case id > 800 && id < 806:
      weatherImage = <img className="forecast-img" src={mcloudy} alt="mostly cloudy icon" />;
      break;
    default:
      weatherImage = 'missing id';
  }
  return weatherImage;
}


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
  const [id, setId] = useState(null);

 
  var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
var current= time.toString();
  
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
        setDescription(data?.weather[0]?.main);
        setHumidity(data?.main?.humidity);
        setId(data?.weather[0]?.id);
        
        
      });
    }
  }, [latitude, longitude]); // <-- Have to pass in [] here!


  return (
    <div className='weather'>
    
      <header>
      <h1>Weather Web Application</h1>
      
      <h2>{name}</h2>
      <h3> {moment().format('dddd')}{ " "}{moment().format('LL')} </h3>
      

      <h2>{temp}&deg;C</h2>
      <h3>{description}</h3>
 
      </header>

      <div className='weatherStyle'>
      <WeatherImage id={id}/>
      </div>

<div className='bottom'>

  <div className='sunrise'>
    <p><strong>Sunrise</strong></p>
  <p><strong>{sunrise}</strong></p> 
  </div>
 
  <div className='sunset'>
    <p><strong>Sunset</strong></p>
  <p><strong>{sunset}</strong></p> 
  </div>
 
  <div className='humidity'>
    <p><strong>Humidity</strong></p>
  <p><strong>{humidity}%</strong></p> 
  </div>
  
  <div className='timezone'>
    <p><strong>Time</strong></p>
  <p><strong>{current}</strong></p> 
  </div>

    </div>

    

     </div>

    
  );
}

export default App;


