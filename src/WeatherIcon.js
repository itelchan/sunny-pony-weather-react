import React from "react";

///// An other option would be to use icons imported from npm, acter installing it.
// import ReactAnimationWeather from "react-animated-weather";

export default function WeatherIcon(props) {
  function displayWeatherIcon() {
    return `${props.code}.png`;
  }

  return (
    <img
      id="displayCurrentWeatherImage"
      alt="CurrentWeather"
      src={displayWeatherIcon()}
      className="rounded mx-auto currentWeatherImage"
    />
  );
}
