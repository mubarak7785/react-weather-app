import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState({});

  const [name, setName] = useState("");

  const getcityData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5b4a06620b73c08aedbbecb0e9e88c25&units=metric`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const getname = (e) => {
    setName(e.target.value);
  };
  console.log(name);
  return (
    <div className="App">
      <div className="main-div">
        <div className="inp">
        <input type="text" onChange={getname} placeholder=" Enter city name" />
        <button onClick={getcityData}>Search</button>
        </div>
       
      </div>
    </div>
  );
}

export default App;
