import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecastsDaily(props) {
  const [loaded, setLoaded] = useState(false);
  const [globalUnitsDisplay, setGlobalUnitsDisplay] = useState("metric");
  const [globalForecast, setGlobalForecast] = useState({});

  let currentLat = props.weatherResult.coordinates.lat;
  let currentLon = props.weatherResult.coordinates.lon;

  const apiKey = "51856297f45d5f846d74fb84ab553047";
  // let globalUnitsDisplay = props.globalUnit;

  function displayForecastFromResponse(response) {
    setGlobalForecast(response.data.daily);
    setGlobalUnitsDisplay(props.globalUnit.globalUnitsDisplay);
    setLoaded(true);
  }

  useEffect(() => {
    setLoaded(false);
  }, [props.globalUnit]);

  useEffect(() => {
    setLoaded(false);
  }, [props.weatherResult.coordinates]);

  ////////////////////////////////////////////////////////////////////////////////////////

  if (loaded) {
    return (
      <div className="row forecastdaysRow justify-content-center">
        {globalForecast.map(function (dailyForecastDisplay, index) {
          if (index > 0 && index < 6) {
            //console.log(`index: ${index}`);
            return (
              <div className="col-sm-2 daycard" key={index}>
                <WeatherForecastDay
                  data={dailyForecastDisplay}
                  units={globalUnitsDisplay}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    let forecasturl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${globalUnitsDisplay}`;
    console.log(`forecasturl: ${forecasturl}`);
    axios.get(forecasturl).then(displayForecastFromResponse);
    return null;
  }
}
