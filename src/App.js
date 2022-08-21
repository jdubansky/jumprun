import React from "react";
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//{"lat": 1.606518333, "lon": -3.85963, "track": 159.96, "magtrack": 160.726, "magvar": 0.8, "speed": 0.797, "climb": 0.1}
function App() {
  let [lat, setLat] = React.useState(0.0);
  let [lon, setLon] = React.useState(0.0);
  let [track, setTrack] = React.useState(0.0);
  let [speed, setSpeed] = React.useState(0.0);
  let [alt, setAlt] = React.useState(0.0);
  let [seperation, setSeperation] = React.useState("15 Seconds");
  let [direction, setDirection] = React.useState("North");
  

  function fetchDataFromApi(){
    axios.get(`http://127.0.0.1:5000/`)
      .then(res => {
        console.log(res.data);
        if(res.data['lat'] != 0.0){
          let info = (Math.round(res.data['lat'] * 100) / 100).toFixed(2);
          setLat(info);
        }

        if(res.data['track'] != 0.0){
          let info = (Math.round(res.data['track'] * 100) / 100).toFixed(2);
          setTrack(info);
        }

        if(res.data['alt'] != 0.0){
          let info = (Math.round(res.data['alt'] * 100) / 100).toFixed(2);
          setAlt(info);
        }

        if(res.data['speed'] != 0.0){
          let info = (Math.round(res.data['speed'] * 100) / 100).toFixed(2);
          setSpeed(info * 2.2369); // multiple by 2.2369 since m/s
        }

      })
  }

  function figureSeperation(){
    if(track < 90){
      setDirection("North");
    }
    else{
      setDirection("South");
    }
  }

  function figureDirection(){
    if(track > .6){
      setSeperation("2 Seconds");
    }
    else if(track > .4){
      setSeperation("4 Seconds");
    }
    else if(track > .2){
      setSeperation("6 Seconds");
    }
    else{
      setSeperation("15 Seconds");
    }
  }

  React.useEffect(() => {
    fetchDataFromApi();
    setInterval(() => {
      fetchDataFromApi()
    }, 1000);
  }, []);

  return (
    <div className="App">
      <section className="py-5"><div className="container">
  <div className="row pt-2">
    <div className="col-lg-6 mt-3">
      <h2>Direction</h2>
      <h2> {track} </h2>
    </div>
    <div className="col-lg-6 mt-3">
      <h2>Direction</h2>
      <h2>{direction}</h2>
    </div>
    <div className="col-lg-6 mt-3">
      <h2>Airspeed</h2>
      <h2> {speed} </h2>
    </div>
    <div className="col-lg-6 mt-3">
      <h2>Seperation</h2>
      <h2>{seperation}</h2>
    </div>
    <div className="col-lg-6 mt-3">
      <h2>Altitude</h2>
      <h2>{alt}</h2>
    </div>
  </div>
  </div>
</section>
    </div>
  );
}

export default App;
