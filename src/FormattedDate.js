import React from "react";

export default function FormattedDate(props) {
  // TODO
  //let globalHour = 0;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "Dec",
  ];

  //////////// DATE CALCULATION //////////////////////
  function formatTime(timeNumber) {
    if (timeNumber < 10) {
      return `0${timeNumber}`;
    } else {
      return `${timeNumber}`;
    }
  }

  function calculateCurrentDate(responseDate) {
    // Do not use the current time, use the time of the response.
    //let now = new Date();
    let month = months[responseDate.getMonth()];
    let day = days[responseDate.getDay()];
    let dayNumber = responseDate.getDate();
    let hours = Number(responseDate.getHours());
    let minutes = Number(responseDate.getMinutes());
    //For the week forecast we need the current hour to find the optimal position of the next day
    //globalHour = hours; TODO

    return `${day} ${dayNumber} ${month} ${formatTime(hours)}:${formatTime(
      minutes
    )}`;
  }

  //////////// DATE DISPLAY //////////////////////
  //console.log(` date is : ${props.date}`);
  return calculateCurrentDate(props.date);
}
