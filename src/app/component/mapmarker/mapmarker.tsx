import Image from "next/image";
import styles from "./mapmarker.module.css";
import { useEffect, useState } from "react";

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
  const [condition, setCondition] = useState<string>("");
  const [temperature, setTemperatur] = useState<string>("");
  const [updatedTime, setUpdatedTime] = useState<string>("");
  useEffect(() => {
    /**
   * @description This function is to fetch the current weather information from the EC Database. 
   * uses a cors proxy to circumvent SOP. Checks to see if temperature and condition exist in the XML 
   * document and updates the states. 
   */
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere-j1ls.onrender.com/https://dd.weather.gc.ca/citypage_weather/xml/BC/${stId}_e.xml`
        );
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const tempDoc = xmlDoc.getElementsByTagName("dateTime")[1];
        console.log(tempDoc.querySelector("textSummary")?.textContent);
        if (
            tempDoc.querySelector("textSummary")?.textContent !== null &&
            tempDoc.querySelector("textSummary")?.textContent !== undefined
          ) {
            setUpdatedTime(
                tempDoc.querySelector("textSummary")?.textContent!
            );
          }
        if (
          xmlDoc.querySelector("currentConditions > temperature")
            ?.textContent !== null &&
          xmlDoc.querySelector("currentConditions > temperature")
            ?.textContent !== undefined
        ) {
          setTemperatur(
            xmlDoc.querySelector("currentConditions > temperature")?.textContent!
          );
        }
        if (
          xmlDoc.querySelector("currentConditions > condition")?.textContent !==
            null &&
          xmlDoc.querySelector("currentConditions > condition")?.textContent !==
            undefined
        ) {
          setCondition(
            xmlDoc.querySelector("currentConditions > condition")?.textContent!
          );
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();

    // Sets an interval to check every minute if its XX:10 and if it is it calls fetchWeatherData to update
    // the states.
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getMinutes() % 10 === 0) {
        fetchWeatherData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        color: "white",
        background: 'grey',
        padding: "15px 10px",
        // display: "inline-flex",
        // textAlign: "center",
        alignItems: "center",
        width: 200,
      }}
    >
      <p style={{ fontSize: 20, textAlign: "center" }}>{name}</p>
      <p style={{ fontSize: 18, textAlign: "center" }}>
        {temperature}°C {condition}
      </p>
      <p style={{ fontSize: 10, textAlign: "center" }}>
        {updatedTime}
      </p>
    </div>
  );
}
