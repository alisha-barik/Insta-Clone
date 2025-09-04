import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const VisitedPlacesInput = ({ places, setPlaces }) => {
  const [placeName, setPlaceName] = useState("");

  const addPlaceByName = () => {
    if (!placeName.trim()) return;

    // check if place already exists (case-insensitive)
    const exists = places.some(
      (p) => p.name.toLowerCase() === placeName.toLowerCase()
    );
    if (exists) {
      alert("Place already added!");
      return;
    }

    // just store name for now, lat/lng will be set from map clicks
    setPlaces([...places, { name: placeName, lat: 0, lng: 0 }]);
    setPlaceName("");
  };

  const removePlace = (index) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  const updateName = (index, newName) => {
    const updated = [...places];
    updated[index].name = newName;
    setPlaces(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a place name..."
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <Button onClick={addPlaceByName} className="bg-[#0095F6]">
          Add
        </Button>
      </div>

      <ul className="space-y-2">
        {places.map((place, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
          >
            <input
              className="bg-transparent w-full mr-2 outline-none"
              value={place.name}
              onChange={(e) => updateName(idx, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removePlace(idx)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitedPlacesInput;
