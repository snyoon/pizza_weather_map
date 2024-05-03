import Image from "next/image";
import styles from "./mapmarker.module.css";

interface ICity {
  name: string;
  lat: number;
  lon: number;
  stId: string;
}
const cities: { [id: string]: ICity } = {
  DL: {
    name: "Dease Lake",
    lat: 58.44,
    lon: -130,
    stId: "s0000227",
  },
  FN: {
    name: "Fort Nelson",
    lat: 58.81,
    lon: -122.7,
    stId: "s0000771",
  },
  T: {
    name: "Terrace",
    lat: 54.52,
    lon: -128.6,
    stId: "s0000757",
  },
  PG: {
    name: "Prince George",
    lat: 53.91,
    lon: -122.78,
    stId: "s0000146",
  },
  W: {
    name: "Whistler",
    lat: 50.12,
    lon: -122.96,
    stId: "s0000078",
  },
  R: {
    name: "Revelstoke",
    lat: 51,
    lon: -118.2,
    stId: "s0000679",
  },
  C: {
    name: "Creston",
    lat: 49.1,
    lon: -116.51,
    stId: "s0000212",
  },
};

export default function MapMarker({
  name,
  stId,
  lat,
  lng,
}: {
  name: string;
  stId: string;
  lat: number;
  lng: number;
}) {
  return (
    <div
      style={{
        color: "white",
        background: "grey",
        padding: "15px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      {name}
    </div>
  );
}
