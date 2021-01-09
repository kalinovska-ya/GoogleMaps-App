import React, { useEffect, useState } from 'react';
import './App.css';
import { LoadMapAPI } from './utils/GoogleMapsUtils';
import MapContainer from './components/Map/MapContainer';


function App() {
  const [googleMapsScriptLoaded, setScriptLoaded] = useState(false);

  useEffect ( () => {
    const googleMapsScript = LoadMapAPI();
    googleMapsScript.addEventListener('load', function() {
      setScriptLoaded(true);
    })
  }, []);

  return (
    <div className="App">
      <h1>Все остановки г.&nbsp;Минска на карте</h1>
      {googleMapsScriptLoaded && <MapContainer mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />}
  </div>
  );
}

export default App;
