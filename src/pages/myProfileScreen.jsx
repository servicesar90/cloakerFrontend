import React, { useState, useEffect } from "react";

const MyProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://your-api-url.com/user/123");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle edit toggle
  const handleEditToggle = () => setIsEditing(!isEditing);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle save (PUT/PATCH request)
  const handleSave = async () => {
    try {
      const res = await fetch("https://your-api-url.com/user/123", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6 md:p-8 transition-all">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          User Profile
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Country</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {!isEditing ? (
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileScreen();
