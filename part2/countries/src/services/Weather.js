import axios from "axios";

const fetchWeather = (name) => {
  const api = process.env.REACT_APP_API_KEY;
  const request = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api}`
    )
    .then((response) => {
      return {
        temp: Number(response.data.main.temp) - 273,
        icon: response.data.weather[0].icon,
        wind: response.data.wind.speed,
      };
    });
  return request.then((response) => response);
};

export default fetchWeather;
