"use client";

import Image from "next/image";
import styles from "./page.module.css";
import MapMarker from "./component/mapmarker/mapmarker";
import GoogleMap from "google-maps-react-markers";
import { useRef, useState } from "react";

const { REACT_APP_MAPS_KEY } = process.env;
interface ICity {
  name: string;
  lat: number;
  lon: number;
  stId: string;
}

let cities: Array<ICity> = [
  {
    name: "Dease Lake",
    lat: 58.44,
    lon: -130,
    stId: "s0000227",
  },
  {
    name: "Fort Nelson",
    lat: 58.81,
    lon: -122.7,
    stId: "s0000771",
  },
  {
    name: "Terrace",
    lat: 54.52,
    lon: -128.6,
    stId: "s0000757",
  },
  {
    name: "Prince George",
    lat: 53.91,
    lon: -122.78,
    stId: "s0000146",
  },
  {
    name: "Whistler",
    lat: 50.12,
    lon: -122.96,
    stId: "s0000078",
  },
  {
    name: "Revelstoke",
    lat: 51,
    lon: -118.2,
    stId: "s0000679",
  },
  {
    name: "Creston",
    lat: 49.1,
    lon: -116.51,
    stId: "s0000212",
  },
];

export default function Home() {
  const defaultProps = {
    center: {
      lat: 54.6267677,
      lng: -125.1953435,
    },
    zoom: 6,
  };
  const key = process.env.NEXT_PUBLIC_REACT_APP_MAPS_KEY;
  if (!key) {
    throw new Error("Google token is not set");
  }

  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return (
    <main>
      <div>
      </div>
      <GoogleMap
        apiKey={key}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log("Map moved", map)}
      >
        {cities.map((city, index) => (
          <MapMarker
            key={index}
            name={city.name}
            stId={city.stId}
            lat={city.lat}
            lng={city.lon}
          />
        ))}
      </GoogleMap>
    </main>
  );
}
