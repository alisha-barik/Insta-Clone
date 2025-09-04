import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "300px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India

export default function VisitedPlacesMap({
  places = [],
  onMapClick,
  onMarkerRightClick,
  zoom,
  height = 300,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCPRX5_P5F6sV_4a_J7T34MZ6bSR40L4bM",
  });

  const center =
    places.length > 0
      ? { lat: Number(places[0].lat), lng: Number(places[0].lng) }
      : defaultCenter;

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="w-full h-64 sm:h-80 md:h-96">
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, height }}
      center={center}
      zoom={zoom ?? (places.length ? 5 : 3)}
      onClick={(e) =>
        onMapClick?.({ lat: e.latLng.lat(), lng: e.latLng.lng() })
      }
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {places.map((p, idx) => (
        <Marker
          key={`${p.lat}-${p.lng}-${idx}`}
          position={{ lat: Number(p.lat), lng: Number(p.lng) }}
          onRightClick={() => onMarkerRightClick?.(idx)}
        />
      ))}
    </GoogleMap></div>
  );
}
