import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import pooImage from "../src/images/poo-storm-solid.png";
import horseImage from "../src/images/horse_pink.png";
import windImage from "../src/images/wind_pink.png";
import humidityImage from "../src/images/humidity_pink.png";

export default function Weather(props) {
  const [globalForecastMinDisplay0, setGlobalForecastMinDisplay0] = useState(
    "14 °C"
  );
  const [globalForecastMinDisplay1, setGlobalForecastMinDisplay1] = useState(
    "14 °C"
  );
  const [globalForecastMinDisplay2, setGlobalForecastMinDisplay2] = useState(
    "14 °C"
  );
  const [globalForecastMinDisplay3, setGlobalForecastMinDisplay3] = useState(
    "14 °C"
  );
  const [globalForecastMinDisplay4, setGlobalForecastMinDisplay4] = useState(
    "14 °C"
  );

  const [globalForecastMaxDisplay0, setGlobalForecastMaxDisplay0] = useState(
    "25 °C"
  );
  const [globalForecastMaxDisplay1, setGlobalForecastMaxDisplay1] = useState(
    "25 °C"
  );
  const [globalForecastMaxDisplay2, setGlobalForecastMaxDisplay2] = useState(
    "25 °C"
  );
  const [globalForecastMaxDisplay3, setGlobalForecastMaxDisplay3] = useState(
    "25 °C"
  );
  const [globalForecastMaxDisplay4, setGlobalForecastMaxDisplay4] = useState(
    "25 °C"
  );

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

      <div className="row forecastdaysRow justify-content-center">
        <div className="col-sm-2 daycard">
          <div className="card text-center forecastDay">
            <div className="card-header cardHeaderText" id="forecastNameDay0">
              Mon
            </div>
            <img
              src={pooImage}
              className="card-img-top mx-auto dayCardImg"
              id="forecastWeatherImage0"
              alt="poo storm"
            />
            <div className="card-body cardBodyTemp">
              <p className="card-text">
                <span id="forecastMin0">{globalForecastMinDisplay0}</span> |{" "}
                <span id="forecastMax0">{globalForecastMaxDisplay0}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-2 daycard">
          <div className="card text-center forecastDay">
            <div className="card-header cardHeaderText" id="forecastNameDay1">
              Tue
            </div>
            <img
              src={pooImage}
              className="card-img-top mx-auto dayCardImg"
              id="forecastWeatherImage1"
              alt="poo storm"
            />
            <div className="card-body cardBodyTemp">
              <p className="card-text">
                <span id="forecastMin1">{globalForecastMinDisplay1}</span> |{" "}
                <span id="forecastMax1">{globalForecastMaxDisplay1}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-2 daycard">
          <div className="card text-center forecastDay">
            <div className="card-header cardHeaderText " id="forecastNameDay2">
              Wed
            </div>
            <img
              src={pooImage}
              className="card-img-top mx-auto dayCardImg"
              id="forecastWeatherImage2"
              alt="poo storm"
            />
            <div className="card-body cardBodyTemp">
              <p className="card-text">
                <span id="forecastMin2">{globalForecastMinDisplay2}</span> |{" "}
                <span id="forecastMax2">{globalForecastMaxDisplay2}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-2 daycard">
          <div className="card text-center forecastDay">
            <div className="card-header cardHeaderText" id="forecastNameDay3">
              Thu
            </div>
            <img
              src={pooImage}
              className="card-img-top mx-auto dayCardImg"
              id="forecastWeatherImage3"
              alt="poo storm"
            />

            <div className="card-body cardBodyTemp">
              <p className="card-text">
                <span id="forecastMin3">{globalForecastMinDisplay3}</span> |{" "}
                <span id="forecastMax3">{globalForecastMaxDisplay3}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-2 daycard">
          <div className="card text-center forecastDay">
            <div className="card-header cardHeaderText" id="forecastNameDay4">
              Fri
            </div>
            <img
              src={pooImage}
              className="card-img-top mx-auto dayCardImg"
              id="forecastWeatherImage4"
              alt="poo storm"
            />
            <div className="card-body cardBodyTemp">
              <p className="card-text">
                <span id="forecastMin4">{globalForecastMinDisplay4}</span> |{" "}
                <span id="forecastMax4">{globalForecastMaxDisplay4}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
