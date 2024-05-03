'use client'

import Image from "next/image";
import styles from "./page.module.css";
import GoogleMapReact from 'google-map-react';

const {REACT_APP_MAPS_KEY} = process.env;

export default function Home() {
  const defaultProps = {
    center: {
      lat: 54.6267677,
      lng: -125.1953435
    },
    zoom: 6
  };
  const key = process.env.NEXT_PUBLIC_REACT_APP_MAPS_KEY;
  console.log(key)
  if(!key){
    // you can throw error here and 
    // let [Error Boundary](https://reactjs.org/docs/error-boundaries.html)
    // handle it
    // or return an component that says "Google Token is not set"
    throw new Error('Google token is not set');
  }
  return (
    <main>
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
      </div>
    </main>
  );
}
