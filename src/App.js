import React, { useState } from "react";

import Weather from "./Weather";
import axios from "axios";
import "./App.css";

import bannerImage from "../src/images/BannerSunnyPony.png";
import { Ellipsis } from "react-css-spinners";

export default function App() {
  const [searchedCity, setSearchedCity] = useState("Mexico City");
  const [weatherResult, setWeatherResult] = useState({ updateDisplay: false });
  const [unitsResult, setUnitsResult] = useState({});
  const [globalUnitsDisplay, setglobalUnitsDisplay] = useState("metric");
  const [metricImperialVars, setMetricImperialVars] = useState({});

  const apiKey = "51856297f45d5f846d74fb84ab553047";

  let globalUnits = "metric";

  let globalWindSpeedms;
  let globalWindSpeedMH;

  let globalCityTempC;
  let globalCityTempF;

  function calculateFahrenheit(centigrades) {
    return Number(centigrades) * (9 / 5) + 32;
  }

  function calculateCentigrades(fahrenheit) {
    return (Number(fahrenheit) - 32) * (5 / 9);
  }

  function calculateMilesPerHour(speedMetersPerSecond) {
    return speedMetersPerSecond * 2.237;
  }

  function calculateMeterPerSecond(speedMilesPerHour) {
    return speedMilesPerHour / 2.237;
  }

  ///////////////////////      TEMP CALCULATION      ////////////////////////////
  function changetoMetric(event) {
    event.preventDefault();
    globalUnits = "metric";
    console.log(`changedtoMetric gloabalUnit= ${globalUnits}`);
    setglobalUnitsDisplay(globalUnits);

    setUnitsResult({
      globalTempDisplay: `${Math.round(metricImperialVars.cityTempC)} °C`,
      globalWindDisplay: `${Math.round(metricImperialVars.windSpeedms)} m/s`,
    });
  }

  function changetoImperial(event) {
    event.preventDefault();
    globalUnits = "imperial";

    console.log(`changedtoImperial gloabalUnit= ${globalUnits}`);
    setglobalUnitsDisplay(globalUnits);

    setUnitsResult({
      globalTempDisplay: `${Math.round(metricImperialVars.cityTempF)} °F`,
      globalWindDisplay: `${Math.round(
        metricImperialVars.windSpeedMH
      )} Miles/H`,
    });
  }

  function updateGlobalUnitsMetricImperial(response) {
    console.log(
      `updateGlobalUnitsMetricImperial gloabalUnit= ${globalUnitsDisplay}`
    );
    if (globalUnitsDisplay === "metric") {
      globalWindSpeedms = response.data.wind.speed;
      globalWindSpeedMH = calculateMilesPerHour(globalWindSpeedms);

      globalCityTempC = response.data.main.temp;
      globalCityTempF = calculateFahrenheit(globalCityTempC);

      setUnitsResult({
        globalTempDisplay: `${Math.round(globalCityTempC)} °C`,
        globalWindDisplay: `${Math.round(globalWindSpeedms)} m/s`,
      });
    } else {
      globalWindSpeedMH = response.data.wind.speed;
      globalWindSpeedms = calculateMeterPerSecond(globalWindSpeedMH);

      globalCityTempF = response.data.main.temp;
      globalCityTempC = calculateCentigrades(globalCityTempF);

      setUnitsResult({
        globalTempDisplay: `${Math.round(globalCityTempF)} °F`,
        globalWindDisplay: `${Math.round(globalCityTempC)} Miles/H`,
      });
    }

    setMetricImperialVars({
      windSpeedms: globalWindSpeedms,
      windSpeedMH: globalWindSpeedMH,
      cityTempC: globalCityTempC,
      cityTempF: globalCityTempF,
    });
  }

  function updateInputCity1(event) {
    setSearchedCity(event.target.value);
  }

  const handleChange = (event) => {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${globalUnitsDisplay}`;
    axios.get(apiUrl).then(handleWeatherResponse);
  };

  function handleWeatherResponse(response) {
    console.log(response.data);

    setWeatherResult({
      cityName: response.data.name,
      countryName: response.data.sys.country,
      temper: response.data.main.temp,
      date: new Date(response.data.dt * 1000),
      desc: response.data.weather[0].description,
      hum: response.data.main.humidity,
      wind: response.data.wind.speed,
      wImage: response.data.weather[0].icon,
      updateDisplay: true,
    });

    updateGlobalUnitsMetricImperial(response);
    // setGlobalCurrentDateDisplay(calculateCurrentDate());
  }

  /*
  function displayMinMax()
  {

    setGlobalForecastMinDisplay0('13 °C');
    setGlobalForecastMinDisplay1('13 °C');
    setGlobalForecastMinDisplay2('13 °C');
    setGlobalForecastMinDisplay3('13 °C');
    setGlobalForecastMinDisplay4('13 °C');

    setGlobalForecastMaxDisplay0('27 °C');
    setGlobalForecastMaxDisplay1('27 °C');
    setGlobalForecastMaxDisplay2('27 °C');
    setGlobalForecastMaxDisplay3('27 °C');
    setGlobalForecastMaxDisplay4('27 °C');

  }
  */
  /* function displayForecastDayName(dayNumberToForecast, timestamp) {
    //Calculate the day to be updated
   // let idName = "#forecastNameDay" + dayNumberToForecast;
   // let dayName = document.querySelector(idName);
  
    //Get the number of the corresponding name
    let dateD = new Date(timestamp * 1000);
    let dayD = dateD.getDay();
  
    // seach fo the day abbreviation in the array
    let calcShortName = littleDays[dayD];
    
    //dayName.innerHTML = calcShortName;
  }

  function calculateForecastPositionForTomorrow() {
    // Move 1 position to be sure we are in the next day
    let position = Math.round((24 - globalHour) / 3) + 1;
    return position;
  }
  */
  /*
function displayForecastFromResponse(response) {
  console.log(response.data);
  let forecastedDay = 0;
  let calculatedDay = 0;
  let i = 0;
  let offsetToNextDay = 8;
  let midDayOffset = 3; // change to 2 or 3 , depending whats more interesting
  for (
    i = calculateForecastPositionForTomorrow();
    i < (40 - midDayOffset);
    i = i + offsetToNextDay
  ) {
    console.log(`i: ${i}, forecastedDay: ${forecastedDay} `);
       let timestamp = response.data.list[i].dt;
    displayForecastDayName(forecastedDay, timestamp);
    displayForecastMinMax(forecastedDay, i, response);
    console.log(response.data.list[i + midDayOffset]);
    displayForcastedWheatherIcon(
      forecastedDay,
      response.data.list[i + midDayOffset].weather[0].icon
    ); 
    forecastedDay++;
  }
}
*/
  ////////////////// Current Position calculations ///////////

  function calculateURLWithCurrentPosition(position) {
    let currentLat = position.coords.latitude;
    let currentLon = position.coords.longitude;

    let currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${globalUnitsDisplay}`;
    axios.get(currenturl).then(handleWeatherResponse);

    let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${globalUnitsDisplay}`;
    console.log(forecasturl);
    //axios.get(forecasturl).then(displayForecastFromResponse);
    //displayMinMax();
  }

  function getCurrentCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(calculateURLWithCurrentPosition);
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ////////////////////// visible ///////////////////////////////////////////

  if (weatherResult.updateDisplay) {
    return (
      <div className="App">
        <div className="mainContainer">
          <div
            className="card mb-3 thecentralcard"
            style={{
              alignSelf: "flex-start",
            }}
          >
            <img
              src={bannerImage}
              className="card-img-top embed-responsive-16by9 bannerImage"
              alt="TheSunnyPonyImage"
            />
            <div className="card-body">
              <p className="card-text">
                <div className="row searchingRow">
                  <form
                    className="col-sm-12 searchingForm"
                    id="sunnyPonyForm"
                    onSubmit={handleChange}
                  >
                    <div className="form-row justify-content-center searchingFormRow">
                      <div className="col-5  searchingColumn">
                        <input
                          type="search"
                          className="form-control"
                          id="inputCity1"
                          placeholder="City Name"
                          autoComplete="off"
                          autoFocus="on"
                          onChange={updateInputCity1}
                        />
                      </div>
                      <div className="col-2 buttonColumn">
                        <button
                          type="submit"
                          className="btn btn-info mx-sm-2 mb-2 shadow searchButton"
                        >
                          I'll search{" "}
                          <span role="img" aria-label="unicorn">
                            🦄
                          </span>
                        </button>
                      </div>
                      <div className="col-2 gradesColumn">
                        <button
                          type="button"
                          onClick={changetoMetric}
                          className="btn btn-info mx-sm-2 mb-1 shadow gradesButton"
                        >
                          °C
                        </button>
                        <button
                          type="button"
                          onClick={changetoImperial}
                          className="btn btn-info mx-sm-2 mb-1 shadow gradesButton"
                        >
                          °F
                        </button>
                      </div>
                      <div className="col-1 currentLocColumn">
                        <button
                          className="btn btn-info mx-sm-2 mb-2 shadow currentLocButton"
                          id="currentLocButton"
                          onClick={getCurrentCity}
                        >
                          <span role="img" aria-label="here">
                            📍
                          </span>
                          Current <br /> Location
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <Weather wResult={weatherResult} uResult={unitsResult} />
              </p>
            </div>
            <h4 className="footer">
              &nbsp;
              <a
                href="https://github.com/itelchan/sunny-pony-weather-react"
                target="_blank"
                rel="noreferrer"
              >
                Open-source code by:
              </a>
              <a
                href="https://commons.wikimedia.org/wiki/User:Itelchan"
                target="_blank"
                rel="noreferrer"
              >
                Leticia Garcia &nbsp;
              </a>
              <a
                href="https://de.linkedin.com/in/leticia-garcia-herrera-698554b3"
                target="_blank"
                rel="noreferrer"
              >
                *LinkedIn &nbsp;
              </a>
            </h4>
          </div>
        </div>
      </div>
    );
  } else {
    let defaultCity = "Mexico City";
    let defaultApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${globalUnits}`;
    axios.get(defaultApiUrl).then(handleWeatherResponse);
    return (
      <div className="App loading">
        <Ellipsis color="#554971" size={90} />
        Loading...
        <Ellipsis color="#554971" size={90} />
      </div>
    );
  }
}
