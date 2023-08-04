import React, { useState, createRef } from "react";
import Weather from "./components/Weather";

const App = () => {
  const locationInput = createRef();
  const [location, setLocation] = useState("Bengaluru");
  return (
    <div className="weather-app">
      <input
        type="text"
        placeholder="Type a location..."
        ref={locationInput}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            setLocation(e.target.value);
            locationInput.current.value = "";
          }
        }}
      />
      <Weather
        flocation={location}
        render={({ error, isLoading, icon, place, tempture, conditions }) =>
          !error ? (
            isLoading ? (
              <div className="loading">Please wait..</div>
            ) : (
              <div className="result">
                <div className="place">{place}, India</div>
                <div className="temperature">{tempture}&deg;C</div>
                <div className="conditions">{conditions.join(",")}</div>
                <img src={icon} alt={conditions.join(",")} className="icon" />
              </div>
            )
          ) : (
            <div className="error">There is some error fetching the data</div>
          )
        }
      />
    </div>
  );
};

export default App;
