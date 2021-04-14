import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherForecastsDaily from "./WeatherForecastsDaily";

import horseImage from "../src/images/horse_pink.png";
import windImage from "../src/images/wind_pink.png";
import humidityImage from "../src/images/humidity_pink.png";

export default function Weather(props) {
  console.log(`Weather`);
  console.log(props.uResult);
  return (
    <div className="weatherInfo">
      <div className="row displayRow justify-content-center">
        <div className="col-md-5 currentWeatherColumn">
          <div className="row currentWeatherRow">
            <div className="col-md-12 cityNameText">
              <section id="displayCity">{props.wResult.cityName}</section>
            </div>
          </div>
          <div className="row currentWeatherRow">
            <div className="col-md-12 countryNameText">
              <section id="displayCountry">{props.wResult.countryName}</section>
            </div>
          </div>
          <div className="row currentWeatherRow">
            <div className="col-md-12 temperatureCityText">
              <section id="globalCityTemp">
                {props.uResult.globalTempDisplay}
              </section>
            </div>
          </div>
          <div className="row currentWeatherRow">
            <div className="col-md-12 descriptionWeatherText">
              <section id="displayWeatherConditions">
                {props.wResult.desc}
              </section>
            </div>
          </div>
        </div>
        <div className="col-md-2 mx-auto imageColumn ">
          <WeatherIcon code={props.wResult.wImage} />
        </div>
        <div className="col-md-4 detailsColumn">
          <div className="row">
            <div className="col-md-3">
              <img
                alt="DayImage"
                src={horseImage}
                className="rounded detailImage"
              />
            </div>
            <div className="col-md-9 detailText ">
              <section id="currentDate">
                <FormattedDate date={props.wResult.date} />
              </section>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <img
                alt="WindImage"
                src={windImage}
                className="rounded detailImage"
              />
            </div>
            <div className="col-md-9 detailText">
              <section>
                Wind:
                <span id="displayCurrentWindSpeed">
                  {" "}
                  {props.uResult.globalWindDisplay}
                </span>
              </section>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <img
                alt="HumidityImg"
                src={humidityImage}
                className="rounded detailImage"
              />
            </div>
            <div className="col-md-9 detailText">
              <section>
                Humidity:
                <span id="displayCurrentHumidity"> {props.wResult.hum} %</span>
              </section>
            </div>
          </div>
        </div>
      </div>
      <WeatherForecastsDaily
        weatherResult={props.wResult}
        globalUnit={props.uResult}
      />
    </div>
  );
}
