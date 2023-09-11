import React, { useState, useEffect } from "react";
const api = {
  key: "d89de10aaaab50f70ac6716d0d16fd5d",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchinput] = useState("");
  const [searchCity, setSearchcity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setWeatherInfo(`${data.name}, ${data.sys.country} ${data.weather[0].description}, ${data.main.temp}`);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchcity(searchInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchinput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
