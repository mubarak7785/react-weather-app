import { useState, useEffect } from "react";
import GetUserLocation from "./components/Location";
import Charts from "./components/Charts"

import "./App.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  // linearGradient,
  CartesianGrid,
} from "recharts";

function App() {
  const [data, setData] = useState({});
  

  const [name, setName] = useState("kudachi");

  const [wdata, setWdata] = useState({});
  const [fcast, setFcast] = useState([]);
  const [edata, setEdata] = useState({});
  const [cordData, setCordData] = useState([]);
  const local = GetUserLocation();

  useEffect(() => {
    getcityData(); 
  }, []);

  const convertString = (d) => {
    return new Date(d * 1000).getHours();
  };

  const getcityData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric&exclude=hourly,minutely`
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
    console.log(edata)
  };

  const forecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=7&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric`
    )
      .then((response) => response.json())
      .then((fcast) => {
        setFcast(fcast.list);
      });
      console.log(fcast)
  };

  const getname = (e) => {
    setName(e.target.value);
  };
  

  return (
    <div className="App">
       
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
          <br />
          <Charts data={fcast}/>
          
          <div className="ph">
            <h2>Humidity : {wdata.humidity} %</h2>
            <h2>Pressure : {wdata.pressure} hPa</h2>
          </div>
          <div className="ph">
          <h2>Sunrise :  {`${convertString(edata.sys?.sunrise)}:${new Date(
                    edata.sys?.sunrise
                  ).getMinutes()} am`}</h2>
            <h2>Sunset : {`${convertString(edata.sys?.sunset)-12}:${new Date(
                    edata.sys?.sunset
                  ).getMinutes()} pm`}</h2>
          </div>
          
          
          
        </div>
        <div className="forecast-div">
          {fcast.map((el) => {
            return (
              <div className="day">
                <p>{el.weather[0].main}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                />
                <p>{el.main.temp}°C</p>
              </div>
            );
          })}
        </div>
        <h2 className="gm">Google-map</h2>
        <div className="iframe">
          <iframe
            src={`https://maps.google.com/maps?q=${name}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
