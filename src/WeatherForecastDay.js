import React from "react";

export default function WeatherForecastsDay(props) {
  let littleDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function maxTemperature() {
    let temp = Math.round(props.data.temp.max);
    if (props.units === "metric") {
      return `${Math.round(temp)} °C`;
    } else {
      return `${Math.round(temp)} °F`;
    }
  }

  function minTemperature() {
    let temp = Math.round(props.data.temp.min);
    if (props.units === "metric") {
      return `${Math.round(temp)} °C`;
    } else {
      return `${Math.round(temp)} °F`;
    }
  }

  function day() {
    //  console.log(props.data.dt);
    let date = new Date(props.data.dt * 1000);
    return littleDays[date.getDay()];
  }

  function displayWeatherIcon() {
    return `${props.data.weather[0].icon}.png`;
  }

  return (
    <div className="card text-center forecastDay">
      <div className="card-header cardHeaderText" id="forecastNameDay0">
        {day()}
      </div>
      <img
        id="forecastWeatherImage"
        alt="Daily Forecast Weather"
        src={displayWeatherIcon()}
        className="card-img-top mx-auto dayCardImg"
      />
      <div className="card-body cardBodyTemp">
        <p className="card-text">
          <span id="forecastMin0">{minTemperature()}</span> |{" "}
          <span id="forecastMax0">{maxTemperature()}</span>
        </p>
      </div>
    </div>
  );
}
