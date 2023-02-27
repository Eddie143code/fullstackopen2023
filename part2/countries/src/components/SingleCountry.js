import { useEffect, useState } from "react";
import fetchWeather from "../services/Weather";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    fetchWeather(country.name.common).then((response) => setWeather(response));
  }, []);
  return (
    <div>
      <h1 key={country.tld}>{country.name.common}</h1>
      <p> capital {country.capital}</p>
      <p>{country.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).length > 1 ? (
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))
        ) : (
          <li>{country.languages}</li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag" width="160px" />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.temperatre} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="icon"
      />
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default SingleCountry;
