import { useEffect, useState } from "react";

const Weather = ({ flocation, render }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tempture, setTempture] = useState(0);
  const [conditions, setConditions] = useState([]);
  const [icon, setIcon] = useState("");
  const [place, setPlace] = useState("");
  const fetchWeather = async (flocation) => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${flocation}`
      );
      console.log(data);
      const weatherData = await data.json();
      console.log(weatherData);
      const { current, location } = weatherData;
      const { temperature, weather_icons, weather_descriptions } = current;
      const { name, country } = location;
      setTempture(temperature);
      setConditions(weather_descriptions);
      setIcon(weather_icons);
      setPlace(`${name} ${country}`);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (flocation) {
      fetchWeather(flocation);
    }
  }, [flocation]);
  return render({ error, isLoading, tempture, conditions, icon, place });
};

export default Weather;
