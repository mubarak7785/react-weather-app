import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState({});

  const [name, setName] = useState("");

  const [wdata,setWdata]=useState({});
  const [fcast,setFcast]=useState([])

  const getcityData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {if(data.main.temp){setWdata(data.main);forecast()} })
  };

  const forecast=()=>{
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=7&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric`
    ).then((response)=>response.json())
    .then((fcast)=>{setFcast(fcast.list);})
  }

  const getname = (e) => {
    setName(e.target.value);
  };
 
  return (
    
    <div className="App">
      <h1>Weather App</h1>
      <div className="main-div">
        <div className="inp">
        <input type="text" onChange={getname} placeholder=" Enter city name" />
        <button onClick={getcityData}>Search</button>
        </div>
        <div className="display">
       <p>Tempratur : {wdata.temp}</p>
        </div>
        <div>
          {fcast.map((elem)=>{
              return(
                <div>
                  <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} />
                  <p>Tempmax: {elem.main.temp_max}</p>
                  <p>Tempmin: {elem.main.temp_min}</p>
                </div>
              )
          })}
        </div>
       
      </div>
    </div>
  );
}

export default App;
