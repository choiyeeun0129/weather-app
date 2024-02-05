import "./App.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재위치기반의 날씨가보임
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태
//3. 다섯개의 버튼 (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때마다 도시별 날씨가 나온다
//5. 현재위치 버튼을 누르면 다시현재위치기반의 날씨가 나온다
//6. 데이터를 들고오는동안 로딩스피너가 돈다
function App() {
  const [weather, setWeather] = useState(null); //박스에담길 날씨 세팅
  const [city, setCity] = useState(""); //여러국가 날씨 세팅
  const cities = ["paris", "new york", "tokyo", "seoul"]; //버튼에 적용시킬 국가들
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1a2edd2c30d6fe66e66bf7f78f768507&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a2edd2c30d6fe66e66bf7f78f768507&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("Data", data);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    // useEffect는 Ui렌더링후에 실행되어서 weather값이 널값임
    if (city === "") {
      getCurrentLocation(); //city에 빈값이면 현재날씨함수실행
    } else {
      getWeatherByCity(); //아니면 국가에따른 날씨함수실행
    }
  }, [city]); //배열있으면 적어줌 , 배열의 값들이 변경될때마다 useEffect실행

  const CurrentChange = (selectedCity) => {
    console.log("selectedCity", selectedCity);
    console.log("currentCity", city);
    if (selectedCity === "current") {
      setCity("");
    } else {
      setCity(selectedCity);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities} //국가배열을 button에 전달
            CurrentChange={CurrentChange} // 현재날씨 클릭시 버튼에 전달
            selectedCity={city} // 선택한 국가 전달
          />
        </div>
      )}
    </div>
  );
}

export default App;
