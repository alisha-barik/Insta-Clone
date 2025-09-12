import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Upload,
  MapPin,
  Star,
  Calendar,
  Hash,
  Image as ImageIcon,
  X,
  Users,
  Clock,
  Plus,
  Share,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const categories = ["Adventure", "Food", "Culture", "Nature", "Relaxation"];
const tripTypes = [
  "Budget Trip",
  "Luxury Stay",
  "Adventure Trek",
  "Cultural Tour",
  "Backpacking",
];

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
const imageRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    image: "",
    location: {
      city: "",
      country: "",
    },
    category: "",
    tags: [],
    date: "",
    rating: undefined,
    isCompanionPost: false,
    companionDetails: {
      tripTitle: "",
      travelDuration: "",
      destinations: [],
      companionsNeeded: 1,
      tripType: "",
      expiresAt: "",
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleImageUpload = (url) => {
  setFormData({ ...formData, image: url });
  setImagePreview(url);
};


  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim().toLowerCase()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addDestination = () => {
    if (
      destinationInput.trim() &&
      formData.companionDetails &&
      !formData.companionDetails.destinations.includes(destinationInput.trim())
    ) {
      setFormData({
        ...formData,
        companionDetails: {
          ...formData.companionDetails,
          destinations: [
            ...formData.companionDetails.destinations,
            destinationInput.trim(),
          ],
        },
      });
      setDestinationInput("");
    }
  };

  const removeDestination = (destToRemove) => {
    if (formData.companionDetails) {
      setFormData({
        ...formData,
        companionDetails: {
          ...formData.companionDetails,
          destinations: formData.companionDetails.destinations.filter(
            (dest) => dest !== destToRemove
          ),
        },
      });
    }
  };

  // Handle file change
const fileChangeHandler = async (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setFile(file);
    setFormData({ ...formData, image: file.name }); // ✅ mark image as set
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};


  const createPostHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      console.log("Form Data:", formData);
      data.append("title", formData.title);
      data.append("caption", formData.caption);
      data.append("city", formData.location.city);
      data.append("country", formData.location.country);
      data.append("category", formData.category);
      data.append("travelDate", formData.date || "");
      data.append("isCompanionPost", formData.isCompanionPost);

      if (formData.rating) data.append("rating", formData.rating);
console.log("Form Data:", formData, data);
      // ✅ Tags (array)
      formData.tags.forEach((tag, index) => {
        data.append(`tags[${index}]`, tag);
      });

      // ✅ Image (file)
      if (file) data.append("image", file);

      // ✅ Companion post
      if (formData.isCompanionPost) {
        data.append(
          "companionDetails[tripTitle]",
          formData.companionDetails.tripTitle
        );
        data.append(
          "companionDetails[travelDuration]",
          formData.companionDetails.travelDuration
        );
        data.append(
          "companionDetails[companionsNeeded]",
          formData.companionDetails.companionsNeeded
        );
        data.append(
          "companionDetails[tripType]",
          formData.companionDetails.tripType
        );
        data.append(
          "companionDetails[expiresAt]",
          formData.companionDetails.expiresAt
        );
        formData.companionDetails.destinations.forEach((dest, index) => {
          data.append(`companionDetails[destinations][${index}]`, dest);
        });
      }
      console.log("Form Data:s", formData, data);

      // Debug log
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setFormData({

          title: "", 
          caption: "",
    image: "",
    location: {
      city: "",
      country: "",
    },
    category: "",
    tags: [],
    date: "",
    rating: undefined,
    isCompanionPost: false,
    companionDetails: {
      tripTitle: "",
      travelDuration: "",
      destinations: [],
      companionsNeeded: 1,
      tripType: "",
      expiresAt: "",
    }
    })
    setImagePreview("");
    setFile(null);

        toast.success(res.data.message);
        // reset if needed
      }
    } catch (error) {
      console.error("Post creation error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const isFormValid =
    formData.title.trim() &&
    formData.caption.trim() &&
    formData.image &&
    formData.location.city &&
    formData.location.country &&
    formData.category &&
    (!formData.isCompanionPost ||
      (formData.companionDetails?.tripTitle.trim() &&
        formData.companionDetails?.travelDuration.trim() &&
        formData.companionDetails?.destinations.length > 0 &&
        formData.companionDetails?.tripType) &&
        formData.companionDetails?.expiresAt)&&
        formData.companionDetails?.companionsNeeded > 0
  console.log("Form valid:", isFormValid);

  return (
    <div className="flex-1 bg-gray-50 pt-20 pb-20 md:pt-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Share Your Travel Experience
            </h2>
            <p className="text-gray-600">
              Tell the world about your amazing journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={createPostHandler} className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Photo *
              </label>

              {imagePreview && (
                <div className="w-full h-48 sm:h-64 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="preview_img"
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
              )}

              <input
                ref={imageRef}
                type="file"
                className="hidden"
                onChange={fileChangeHandler}
                accept="image/*"
              />
              <Button
                type="button"
                onClick={() => imageRef.current.click()}
                className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]"
              >
                Select from computer
              </Button>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Title *
              </label>
              <input
                type="text"
                placeholder="Give your post a catchy title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                maxLength={100}
              />
              <p className="text-xs text-gray-500">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Caption */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Caption *
              </label>
              <textarea
                placeholder="Share your travel experience in detail..."
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500">
                {formData.caption.length}/500 characters
              </p>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  City *
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Tokyo"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          city: e.target.value,
                        },
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Country *
                </label>
                <input
                  type="text"
                  placeholder="Japan"
                  value={formData.location.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        country: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Companion Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">
                      Looking for a travel companion?
                    </h3>
                    <p className="text-sm text-green-600">
                      Share your trip plan and find like-minded travelers
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCompanionPost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isCompanionPost: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Companion Details */}
              {formData.isCompanionPost && (
                <div className="space-y-4 p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">
                    Trip Details
                  </h4>

                  {/* Trip Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-green-700">
                      Trip Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Leh Ladakh Bike Trip 🚴"
                      value={formData.companionDetails?.tripTitle || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companionDetails: {
                            ...(formData.companionDetails || {}),
                            tripTitle: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Duration & Companions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-green-700">
                        Duration *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 7 days"
                        value={formData.companionDetails?.travelDuration || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companionDetails: {
                              ...(formData.companionDetails || {}),
                              travelDuration: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-green-700">
                        Companions Needed *
                      </label>
                      <select
                        value={formData.companionDetails?.companionsNeeded || 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companionDetails: {
                              ...(formData.companionDetails || {}),
                              companionsNeeded: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-full px-4 py-3 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "person" : "people"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Trip Type */}
                  <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-green-700">
                      Trip Type *
                    </label>
                    <select
                      value={formData.companionDetails?.tripType || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companionDetails: {
                            ...(formData.companionDetails || {}),
                            tripType: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                    >
                      <option value="">Select trip type</option>
                      {tripTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                                <div className="space-y-2">
                <label className="block text-sm font-semibold text-green-700">
                  Expire Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                    size={18}
                  />
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) =>
                      setFormData({ ...formData,                           companionDetails: {
                            ...(formData.companionDetails || {}),
                            expiresAt: e.target.value,
                          }, })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  />
                </div>
              </div>
                  </div>

                  {/* Destinations */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-green-700">
                      Destinations *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add destination"
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addDestination();
                          }
                        }}
                        className="flex-1 px-4 py-3 border border-green-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={addDestination}
                        className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {formData.companionDetails &&
                      formData.companionDetails.destinations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {formData.companionDetails.destinations.map(
                            (dest) => (
                              <span
                                key={dest}
                                className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                              >
                                <span>📍 {dest}</span>
                                <button
                                  type="button"
                                  onClick={() => removeDestination(dest)}
                                  className="hover:bg-green-200 rounded-full p-1 transition-colors duration-200"
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Your Rating (Optional)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        rating: formData.rating === star ? undefined : star,
                      })
                    }
                    className={`p-1 rounded transition-colors duration-200 ${
                      formData.rating && formData.rating >= star
                        ? "text-yellow-500"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    <Star
                      size={24}
                      className={
                        formData.rating && formData.rating >= star
                          ? "fill-current"
                          : ""
                      }
                    />
                  </button>
                ))}
                {formData.rating && (
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating}/5 stars
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Tags
              </label>
              <div className="relative">
                <Hash
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                />
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-blue-200 rounded-full p-1 transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isFormValid && !isSubmitting
                    ? formData.isCompanionPost
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Post...</span>
                  </>
                ) : (
                  <>
                    {formData?.isCompanionPost ? (
                      <Users size={20} />
                    ) : (
                      <Share size={20} />
                    )}
                    <span>
                      {formData?.isCompanionPost
                        ? "Find Travel Companions"
                        : "Share Your Experience"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">
            💡 Tips for{" "}
            {formData.isCompanionPost ? "Companion Posts" : "Great Posts"}
          </h3>
          {formData.isCompanionPost ? (
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be specific about your travel dates and duration</li>
              <li>
                • Clearly describe the type of trip and what you're looking for
              </li>
              <li>• Include your budget range and travel style preferences</li>
              <li>• Add safety verification details to build trust</li>
            </ul>
          ) : (
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • Use descriptive titles that capture the essence of your
                experience
              </li>
              <li>
                • Share detailed captions with helpful tips for other travelers
              </li>
              <li>
                • Add specific locations to help others find these amazing
                places
              </li>
              <li>• Include relevant tags to make your post discoverable</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
