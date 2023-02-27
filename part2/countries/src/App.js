import { all } from "axios";
import { useState, useEffect } from "react";
import countryService from "./services/Country";
import CountryNamesList from "./components/CountryNamesList";

function App() {
  const [allCountries, setAllCountries] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [showCountry, setCountry] = useState("");

  const searchCountry = (e) => {
    const filterWord = e.target.value.toLowerCase();
    const countryList = [];
    const filteredList = allCountries.filter((country) => {
      if (country.name.common.toLowerCase().includes(filterWord)) {
        return country.name.common;
      }
    });
    setSearchFilter(filteredList);
  };

  const showCountryClick = (name) => {
    if (name == showCountry) {
      return setCountry("");
    }
    setCountry(name);
  };

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setAllCountries(response);
    });
  }, [searchFilter]);

  return (
    <>
      <div>
        find countries <input onChange={searchCountry} />
      </div>
      {searchFilter.length < 250 && (
        <CountryNamesList
          searchFilter={searchFilter}
          showCountry={showCountry}
          showCountryClick={showCountryClick}
        />
      )}
    </>
  );
}

export default App;
