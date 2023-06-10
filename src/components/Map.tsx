"use client";
import { useEffect, useRef } from "react";

type MapProps = {
  apiKey: string;
  latitude: number;
  longitude: number;
};

const Map: React.FC<MapProps> = ({ apiKey, latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener("load", () => {
        if (mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: latitude, lng: longitude },
            zoom: 20,
          });

          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            label: {
              text: "Jacoseg",
              fontWeight: "bold",
              fontSize: "14px",
            },
          });
        }
      });
    };

    initializeMap();
  }, [apiKey, latitude, longitude]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
