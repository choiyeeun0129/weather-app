import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, CurrentChange }) => {
  return (
    <div>
      <Button variant="light" onClick={() => CurrentChange("current")}>
        Current Location
      </Button>{" "}
      {cities.map((item, index) => (
        <Button variant="light" key={index} onClick={() => CurrentChange(item)}>
          {item}
        </Button> //cities 배열의 각 요소에 대해 반복하여 버튼 컴포넌트를 생성
      ))}
    </div>
  );
};

export default WeatherButton;
