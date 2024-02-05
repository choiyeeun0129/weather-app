import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);

  const celsius = weather?.main.temp; //섭씨온도

  function toFahrenheit(celsius) {
    //화씨온도로 바꾸는 함수만들기
    return (celsius * 9) / 5 + 32;
  }

  const fahrenheitTemperature = toFahrenheit(celsius); //화씨온도
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp}°C / {fahrenheitTemperature.toFixed(2)}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
