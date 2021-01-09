import React, { useRef, useState, useEffect } from 'react';
import { StationType } from '../../types';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import StationMarker from '../../assets/images/bus-stop-pointer.svg';

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  stations: Array<StationType> | null;
}


const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false, stations = null }: IMap) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const startMap = (): void => {
    if (!map) {
      initMap();
    }
  }
  const initMap = (): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          center: { lat: 53.9026082632717, lng: 27.561423680539768 },
          zoom: 18,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          zoomControl: true,
          mapTypeId: mapType,
          draggableCursor: 'pointer',
        }),
      );
    }
  }

  useEffect(startMap);

  if (map && stations) {
    const markers = stations.map((stat, i) => {
      return new google.maps.Marker({
        position: { lat: stat.lat, lng: stat.lng },
        map: map,
        icon: StationMarker,
      })
    })

    const infoWindows = stations.map((station, i) => {
      const contentString =
        '<div id="content">' +
        '<div id="bodyContent">' +
        `<p><b>Остановка:</b> ${station.name}</p>` +
        "</div>" +
        "</div>";

      return new google.maps.InfoWindow({
        content: contentString,
      })
    })

    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      minimumClusterSize: 3,
    });

    markers.forEach((marker, index) => marker.addListener("click", () => infoWindows[index].open(map, marker)));
  }

  return (
    <div className="wrapper">
      <div ref={ref} className="map" id="map"></div>
    </div>
  )
};

export default Map;