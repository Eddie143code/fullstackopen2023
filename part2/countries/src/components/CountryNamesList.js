import React from "react";
import SingleCountry from "./SingleCountry";

const CountryNamesList = ({ searchFilter, showCountry, showCountryClick }) => {
  if (searchFilter && searchFilter.length == 1) {
    return (
      <div>
        {searchFilter.map((country) => {
          return <SingleCountry country={country} />;
        })}
      </div>
    );
  }

  if (searchFilter) {
    return (
      <div>
        {searchFilter.length < 9 ? (
          searchFilter.map((country) => {
            return (
              <>
                <div key={country.tld}>
                  {country.name.common}
                  <button onClick={() => showCountryClick(country.name.common)}>
                    show
                  </button>
                </div>
                {showCountry == country.name.common && (
                  <SingleCountry country={country} />
                )}
              </>
            );
          })
        ) : (
          <div>too many matches</div>
        )}
      </div>
    );
  }
};

export default CountryNamesList;
