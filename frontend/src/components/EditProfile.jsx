import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import VisitedPlacesMap from "./VisitedPlacesMap";

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    profilePic: user?.profilePic,
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

// Store both name + coords
const [places, setPlaces] = useState(
  Array.isArray(user?.places) ? user.places : []
);

const [placeInput, setPlaceInput] = useState(""); // input field value

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput((prev) => ({ ...prev, profilePic: file }));
  };

  const selectChangeHandler = (value) => {
    setInput((prev) => ({ ...prev, gender: value }));
  };

const handleMapClick = async ({ lat, lng }) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const name = res.data.results[0]?.formatted_address || "Unknown place";
    setPlaces((prev) => [...prev, { name, lat, lng }]);
  } catch {
    setPlaces((prev) => [...prev, { name: "Unknown place", lat, lng }]);
  }
};


  const handleMarkerRightClick = (index) => {
    setPlaces((prev) => prev.filter((_, i) => i !== index));
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender || "");
    formData.append("places", JSON.stringify(places));
    if (input.profilePic && input.profilePic !== user?.profilePic) {
      formData.append("profilePic", input.profilePic);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/edit",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePic: res.data.user?.profilePic,
          gender: res.data.user?.gender,
          places: res.data.user?.places || [],
        };
        dispatch(setAuthUser(updatedUserData));
        toast.success(res.data.message);
        navigate(`/profile/${user?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  const addPlaceByName = async () => {
  if (!placeInput.trim()) return;

  try {
    // Google Maps Geocoding API (replace with your API key)
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: placeInput,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (res.data.results.length > 0) {
      const result = res.data.results[0];
      const newPlace = {
        name: result.formatted_address,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      };

      // prevent duplicates (case insensitive)
      setPlaces((prev) => {
        const exists = prev.some(
          (p) => p.name.toLowerCase() === newPlace.name.toLowerCase()
        );
        if (exists) return prev;
        return [...prev, newPlace];
      });

      setPlaceInput(""); // clear box
    } else {
      toast.error("Place not found");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to find place");
  }
};


  return (
    <div className="flex max-w-2xl mx-auto px-4">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl">Edit Profile</h1>

        {/* Header */}
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePic} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600">{user?.bio || "Bio here..."}</span>
            </div>
          </div>

          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current?.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
          >
            Change photo
          </Button>
        </div>

        {/* Bio */}
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>

        {/* Gender */}
        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Visited Places (restored simple behavior) */}
{/* Manual input */}
<div className="flex gap-2 mb-3">
  <input
    type="text"
    value={placeInput}
    onChange={(e) => setPlaceInput(e.target.value)}
    placeholder="Type a place..."
    className="border rounded px-3 py-1 w-full"
  />
  <Button onClick={addPlaceByName} className="bg-[#0095F6] hover:bg-[#2a8ccd]">
    Add
  </Button>
</div>

{/* Map stays same */}
<VisitedPlacesMap
  places={places}
  onMapClick={handleMapClick}
  onMarkerRightClick={handleMarkerRightClick}
  height={300}
/>

{/* Show place names with remove option */}
{places.length > 0 && (
  <ul className="mt-3 text-sm space-y-2">
    {places.map((p, i) => (
      <li
        key={`${p.lat}-${p.lng}-${i}`}
        className="flex items-center justify-between border p-2 rounded"
      >
        <span className="text-gray-700">
          {p.name} ({p.lat.toFixed(3)}, {p.lng.toFixed(3)})
        </span>
        <Button
          variant="destructive"
          size="sm"
          onClick={() =>
            setPlaces((prev) => prev.filter((_, idx) => idx !== i))
          }
        >
          Remove
        </Button>
      </li>
    ))}
  </ul>
)}

        {/* Submit */}
        <div className="flex justify-end">
          {loading ? (
            <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
