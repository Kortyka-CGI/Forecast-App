import './App.scss';
import React, { FormEvent } from 'react';
//import { WeatherDay } from './Component/WeatherDay';
import axios  from 'axios';
import { WeatherDay } from './Component/WeatherDay/WeatherDay';
export interface WeatherType {
  Temperature: {
    min: number,
    max: number,
    Unit: string
  },
  Day: {
    icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean,
    PrecipitationIntensity: string,
    PrecipitationType: string
  },
  Night: {
    HasPrecipitation: boolean,
    icon: number,
    IconPhrase: boolean,
    PrecipitationIntensity: string,
    PrecipitationType: string
  }, 
  Time: {
    day: string,
    month: string,
    time: string,
    date:string
  }
}

const App = () =>{
  const [city, setCity] = React.useState("douala");
  const [localizationKey, setLocalizationKey] = React.useState<string>("48810");
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherType[]>();
  const [cityName, setCityName] = React.useState<string>("Douala");
  const [localizationArea, setLocalizationArea ] = React.useState<string>("LT");
  const API_KEY = "2TZZmkPaQkapTbWJ2HniwjGpNi5bVTAE";
  const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const month = ["January", "February", "March", "April", "May", "June", "july", "August", "October", "November", "December"];
  //const attributeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  //const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  //const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${localizationKey}?apikey=${API_KEY}`;
  //const attributeUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`;

  const fetchAttribute = async (city: string) =>{
    const responseAtt =  await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`);

    setLocalizationKey(responseAtt.data[0].Key)
    setCityName(responseAtt.data[0].EnglishName);
    setLocalizationArea(responseAtt.data[0].AdministrativeArea.ID)
    if(!Error){
      console.log("in It "+responseAtt);
    } 
  }
  const fetchData = async (localizationKey: string) =>{
    const weather = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${localizationKey}?apikey=${API_KEY}`);
    //setWeatherInfo(weather.data.DailyForecasts) 
    console.log(weather.data)
     setWeatherInfo(weather.data.DailyForecasts.map((dayliF: { Temperature: { Minimum: { Value: any; Unit: any; }; Maximum: { Value: any; }; }; Day: { Icon: any; IconPhrase: any; HasPrecipitation: any; PrecipitationIntensity: any; PrecipitationType: any; }; Night: { Icon: any; IconPhrase: any; HasPrecipitation: any; PrecipitationIntensity: any; PrecipitationType: any; }; Date: string | number | Date; })=>{
      return{
        Temperature: {
          min: dayliF.Temperature.Minimum.Value,
          max: dayliF.Temperature.Maximum.Value,
          Unit: dayliF.Temperature.Minimum.Unit
        },
        Day: {
          icon: dayliF.Day.Icon,
          IconPhrase: dayliF.Day.IconPhrase,
          HasPrecipitation: dayliF.Day.HasPrecipitation,
          PrecipitationIntensity: dayliF.Day.PrecipitationIntensity,
          PrecipitationType: dayliF.Day.PrecipitationType
        },
        Night: {
          icon:dayliF.Night.Icon,
          IconPhrase: dayliF.Night.IconPhrase,
          HasPrecipitation: dayliF.Night.HasPrecipitation,
          PrecipitationIntensity: dayliF.Night.PrecipitationIntensity,
          PrecipitationType: dayliF.Night.PrecipitationType
        },
        Time: {
          day: weekDay[new Date(dayliF.Date).getDay()],
          month: month[new Date(dayliF.Date).getMinutes()],
          time: new Date().toLocaleString('en-us', { hour: '2-digit', minute: '2-digit'}),
          date: new Date(dayliF.Date).getDate()
        },
      }
    }));   
  }
  
  React.useEffect(() =>{
    fetchData(localizationKey);
  },[localizationKey])


  return (<div className='container'>
    <div className='header'>
      <h1>5-Day Forecast.</h1>
    </div>
    <div className='search-input'>
      <input type="text" onChange={e =>setCity(e.target.value)} value={city}/>
      <button onClick={() =>fetchAttribute(city)}>search</button>
    </div>
    <h3>{`${cityName}, ${localizationArea}`}</h3>
    <div className='weather-container'>
      {weatherInfo?.map((i, index) => (
        <div key={index}>
          <WeatherDay Time={i.Time} Day={i.Day} Night={i.Night} Temperature ={i.Temperature}/>
        </div>
      ))}
    </div>

  </div>)
}

export default React.memo(App);



