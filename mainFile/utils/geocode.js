const axios = require("axios");

async function geocodeLocation(location) {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: location,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "YourAppName/1.0 (your@email.com)"
      }
    });

    if (response.data.length === 0) return null;

    const { lat, lon } = response.data[0];

    // ✅ Return in GeoJSON format for MongoDB
    return {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)] // [longitude, latitude]
    };
  } catch (err) {
    console.error("Geocoding error:", err.message);
    return null;
  }
}

module.exports = geocodeLocation;
