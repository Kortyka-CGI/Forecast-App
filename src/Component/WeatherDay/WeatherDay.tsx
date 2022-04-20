import React from "react";
import './WeatherDay.scss';
import { WeatherType } from "../../App";
export const WeatherDay: React.FC<WeatherType> = (props) =>{
    const setImageNumber = (iconNr: number): string | number =>{
       return iconNr < 10 ? "0"+ iconNr: iconNr 
    }
    const setDate = (date: string): string =>{
        switch(date){
            case "1":
                return date+"st";
            case "2":
                return date+"nd";
            case "3":
                return date+"rd";
            default:
                return date+"th"
        }
    }
      console.log(props.Time.month)
    return (<>
    <div className="weather-day">
        <div className="header">
           <h5>{props.Time.day}</h5>
           <div className="header-text">
               {`${props.Time.month} ${setDate(props.Time.date)}, ${props.Time.time}`}
           </div>
        </div>
       <img src ={`https://developer.accuweather.com/sites/default/files/${setImageNumber(props.Day.icon)}-s.png`} 
       alt="Image representing the weather"/>
       <div className="temperature">{`${props.Temperature.min} - ${props.Temperature.max} °${props.Temperature.Unit}`}</div>
       {props.Day.IconPhrase && <div className="description"> <span>Description: </span>{props.Day.IconPhrase}</div>}
       {props.Day.PrecipitationIntensity && <div className="description"><span>Precipitation: </span>{props.Day.PrecipitationIntensity}</div> }
    </div>
    </>)
}