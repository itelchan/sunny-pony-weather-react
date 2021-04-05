import React, { useState } from "react";
import axios from 'axios';

import bannerImage from "../src/images/BannerSunnyPony.png";
import pooImage from "../src/images/poo-storm-solid.png";
import horseImage from "../src/images/horse_pink.png";
import windImage from "../src/images/wind_pink.png";
import humidityImage from "../src/images/humidity_pink.png";




function App() {

  const [searchedCity, setSearchedCity] = useState("Mexico City");
  const [weatherResult, setWeatherResult] = useState({});
  const [globalTempDisplay, setGlobalTempDisplay] = useState("");
  const [globalWindDisplay, setGlobalWindDisplay] = useState("");
  const [globalCurrentDateDisplay, setGlobalCurrentDateDisplay] =  useState("");
  const [globalUnitsDisplay, setglobalUnitsDisplay] = useState("metric");

  const[metricImperialVars, setMetricImperialVars] = useState({});

  const[updateDisplay, setUpdateDisplay] = useState(false);

  const [globalForecastMinDisplay0, setGlobalForecastMinDisplay0] = useState('14 °C');
  const [globalForecastMinDisplay1, setGlobalForecastMinDisplay1] = useState('14 °C');
  const [globalForecastMinDisplay2, setGlobalForecastMinDisplay2] = useState('14 °C');
  const [globalForecastMinDisplay3, setGlobalForecastMinDisplay3] = useState('14 °C');
  const [globalForecastMinDisplay4, setGlobalForecastMinDisplay4] = useState('14 °C');

  const [globalForecastMaxDisplay0, setGlobalForecastMaxDisplay0] = useState('25 °C');
  const [globalForecastMaxDisplay1, setGlobalForecastMaxDisplay1] = useState('25 °C');
  const [globalForecastMaxDisplay2, setGlobalForecastMaxDisplay2] = useState('25 °C');
  const [globalForecastMaxDisplay3, setGlobalForecastMaxDisplay3] = useState('25 °C');
  const [globalForecastMaxDisplay4, setGlobalForecastMaxDisplay4] = useState('25 °C');

  let apiKey = "51856297f45d5f846d74fb84ab553047";

  let globalUnits = "metric";
  
  let globalWindSpeedms ;
  let globalWindSpeedMH ;
  
  let globalCityTempC ;
  let globalCityTempF ;
  // TODO 
  //let globalHour = 0;
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  //TODO
  //let littleDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  
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
  //////////// DATE CALCULATION //////////////////////
  function formatTime(timeNumber) {
    if (timeNumber < 10) {
      return `0${timeNumber}`;
    } else {
      return `${timeNumber}`;
    }
  }
  
  function calculateCurrentDate() {
    let now = new Date();
    let month = months[now.getMonth()];
    let day = days[now.getDay()];
    let hours = Number(now.getHours());
    let minutes = Number(now.getMinutes());
    //For the week forecast we need the current hour to find the optimal position of the next day
    //globalHour = hours; TODO
  
    return `${day} ${now.getDate()} ${month} ${formatTime(hours)}:${formatTime(
      minutes
    )}`;
  }


  ///////////////////////      TEMP CALCULATION      ////////////////////////////

  
  function changetoMetric(event) {
     event.preventDefault();
     globalUnits = "metric";

     if(globalUnitsDisplay !== globalUnits ){
     setglobalUnitsDisplay(globalUnits);

     setGlobalTempDisplay(`${Math.round(metricImperialVars.cityTempC)} °C`);
     setGlobalWindDisplay(`${Math.round(metricImperialVars.windSpeedms)} m/s`);
     }
   }

   function changetoImperial(event) {
    event.preventDefault();
    globalUnits = "imperial";

    if(globalUnitsDisplay !== globalUnits ){
    setglobalUnitsDisplay(globalUnits);

    setGlobalTempDisplay(`${Math.round(metricImperialVars.cityTempF)} °F`);
    setGlobalWindDisplay(`${Math.round(metricImperialVars.windSpeedMH)} Miles/H`);
    }
  }

  function updateGlobalUnitsMetricImperial(response){

    console.log(`updateGlobalUnitsMetricImperial gloabalUnit= ${globalUnits}`);
    if(globalUnits === "metric")
    {
      globalWindSpeedms =response.data.wind.speed;
      globalWindSpeedMH = calculateMilesPerHour(globalWindSpeedms);

      globalCityTempC = response.data.main.temp;
      globalCityTempF = calculateFahrenheit(globalCityTempC);

      setGlobalTempDisplay(`${Math.round(globalCityTempC)} °C`);
      setGlobalWindDisplay(`${Math.round(globalWindSpeedms)} m/s`);
      
    }
    else
    {

      globalWindSpeedMH = response.data.wind.speed;
      globalWindSpeedms = calculateMeterPerSecond(globalWindSpeedMH);

      globalCityTempF = response.data.main.temp;
      globalCityTempC = calculateCentigrades(globalCityTempF);

      setGlobalTempDisplay(`${Math.round(globalCityTempF)} °F`);
      setGlobalWindDisplay(`${Math.round(globalCityTempC)} Miles/H`);

    }

    setMetricImperialVars({
      windSpeedms: globalWindSpeedms,
      windSpeedMH: globalWindSpeedMH,
      cityTempC: globalCityTempC,
      cityTempF:globalCityTempF
    });


  }


  function displayWeatherIcon() {
      return `${weatherResult.wImage}.png`;
  }

  function updateInputCity1(event) {
    setSearchedCity(event.target.value);
  }

  const handleChange = (event) => {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${globalUnits}`;
    axios.get(apiUrl).then(handleWeatherResponse);
  };

  function handleWeatherResponse(response) {
    console.log(response.data);

    setWeatherResult({
      cityName: response.data.name,
      countryName: response.data.sys.country,
      temper: response.data.main.temp,
      desc: response.data.weather[0].description,
      hum: response.data.main.humidity,
      wind: response.data.wind.speed,
      wImage: response.data.weather[0].icon
    });


    console.log(`weatherResult.temp ${weatherResult.temper}`);
    updateGlobalUnitsMetricImperial(response);
    setGlobalCurrentDateDisplay(calculateCurrentDate());
    setUpdateDisplay(true);
  }

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

  let currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${globalUnits}`;
  axios.get(currenturl).then(handleWeatherResponse);

  let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${globalUnits}`;
  console.log(forecasturl);
  //axios.get(forecasturl).then(displayForecastFromResponse);
  displayMinMax();
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(calculateURLWithCurrentPosition);
}



  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ////////////////////// visible ///////////////////////////////////////////


  return (
    <div className="App">
      <div className="mainContainer">
        <div
          className="card mb-3 thecentralcard"
          style={{
            alignSelf: "flex-start"
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
                <form className="col-sm-12 searchingForm" id="sunnyPonyForm" autoComplete="off" onSubmit={handleChange } >
                  <div className="form-row justify-content-center searchingFormRow">
                    <div className="col-5  searchingColumn">
                      <input
                        type="search"
                        className="form-control"
                        id="inputCity1"
                        placeholder="City Name"
                        autoComplete="off"
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
                    <div className="col-2 gradesColumn" >
                      <button
                        type="button"
                        onClick={changetoMetric}
                        className="btn btn-info mx-sm-2 mb-2 shadow gradesButton"
                      >
                        °C
                      </button>
                      <button
                        type="button"
                        onClick={changetoImperial}
                        className="btn btn-info mx-sm-2 mb-2 shadow gradesButton"
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

              <div className="row displayRow justify-content-center">
                <div className="col-md-5 currentWeatherColumn">
                  <div className="row currentWeatherRow">
                    <div className="col-md-12 cityNameText">
                      <section id="displayCity">{weatherResult.cityName}</section>
                    </div>
                  </div>
                  <div className="row currentWeatherRow">
                    <div className="col-md-12 countryNameText">
                      <section id="displayCountry">{weatherResult.countryName}</section>
                    </div>
                  </div>
                  <div className="row currentWeatherRow">
                    <div className="col-md-12 temperatureCityText">
                      <section id="globalCityTemp">{globalTempDisplay}</section>
                    </div>
                  </div>
                  <div className="row currentWeatherRow">
                    <div className="col-md-12 descriptionWeatherText">
                      <section id="displayWeatherConditions">
                      {weatherResult.desc}
                      </section>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 mx-auto imageColumn ">
                  <img
                    id="displayCurrentWeatherImage"
                    alt="CurrentWeather"
                    src={updateDisplay ? displayWeatherIcon(): "poo-storm-solid.png"} 
                    className="rounded mx-auto currentWeatherImage"
                  />
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
                      <section id="currentDate">{globalCurrentDateDisplay}</section>
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
                        Wind:<span id="displayCurrentWindSpeed"> {globalWindDisplay}</span>
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
                        Humidity:<span id="displayCurrentHumidity"> {weatherResult.hum} %</span>
                      </section>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row forecastdaysRow justify-content-center">
                <div className="col-sm-2 daycard">
                  <div className="card text-center forecastDay">
                    <div
                      className="card-header cardHeaderText"
                      id="forecastNameDay0"
                    >
                      Mon
                    </div>
                    <img
                      src = {pooImage}
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
                    <div
                      className="card-header cardHeaderText"
                      id="forecastNameDay1"
                    >
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
                    <div
                      className="card-header cardHeaderText "
                      id="forecastNameDay2"
                    >
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
                    <div
                      className="card-header cardHeaderText"
                      id="forecastNameDay3"
                    >
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
                    <div
                      className="card-header cardHeaderText"
                      id="forecastNameDay4"
                    >
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
}

export default App;
