import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState({});

  const [name, setName] = useState("kudachi");

  const [wdata, setWdata] = useState({});
  const [fcast, setFcast] = useState([]);
  const [edata, setEdata] = useState({});

  useEffect(() => {
    getcityData();
  }, []);

  const getcityData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.main.temp) {
          setWdata(data.main);
          setEdata(data);
          forecast();
        }
      });
    // console.log(wdata.main.temp)
  };

  const forecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=7&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric`
    )
      .then((response) => response.json())
      .then((fcast) => {
        setFcast(fcast.list);
      });
  };

  const getname = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="inp">
        <input type="text" onChange={getname} placeholder=" Enter city name" />
        <button onClick={getcityData}>Search</button>
      </div>
      <div className="main-div">
        <div className="display">
        <p className="name">{edata.name}</p>
          <div className="temp">
            <p> {wdata.temp}°C</p>
          </div>
         
          <div className="ph">
            <h2>Humidity : {wdata.humidity} %</h2>
            <h2>Pressure : {wdata.pressure} hPa</h2>
          </div>
        </div>
        <div className="forecast-div">
          {fcast.map((elem) => {
            return (
              <div className="day">
                <p>{elem.weather[0].main}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`}
                />
                <p>{elem.main.temp}°C</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
