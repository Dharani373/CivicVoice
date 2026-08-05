export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log("BigDataCloud Response:", data);

    return {
      city: data.city || data.locality || "Unknown",
      state: data.principalSubdivision || "Unknown",
      address:
        [
          data.locality || data.city,
          data.principalSubdivision,
          data.countryName,
        ]
          .filter(Boolean)
          .join(", ") || "Unknown Location",
    };
  } catch (error) {
    console.error("Reverse Geocoding Error:", error.message);

    return {
      city: "Unknown",
      state: "Unknown",
      address: "Unknown Location",
    };
  }
};
