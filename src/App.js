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

  function fetchDataFromApi(){
    axios.get(`localhost:5000`)
      .then(res => {
        console.log(res.data);
        setLat(res.data['lat']);
        setTrack(res.data['track']);
        setSpeed(res.data['speed']);
      })
  }

  React.useEffect(() => {
    fetchDataFromApi();
    setInterval(fetchDataFromApi(), 1000);
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
      <h2>NORTHWEST</h2>
    </div>
    <div className="col-lg-6 mt-3">
      <h2>Airspeed</h2>
      <h2> {speed} </h2>
    </div>
    <div className="col-lg-6 mt-3">
      <h2>Seperation</h2>
      <h2>99 Seconds</h2>
    </div>
  </div>
  </div>
</section>
    </div>
  );
}

export default App;
