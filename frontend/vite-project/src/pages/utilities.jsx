import axios from "axios";

// Shortcut base url for api calls
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Provides flexibility in image size received from google map api
export const getListImages = async (properties, imageSize) => {
  try {
    for (const property of properties) {
      const response = await api.get(`map/propertyimage/${encodeURIComponent(property.address)}/${imageSize}}`, {
        responseType: 'blob', // Set response type to 'blob'
      });

      const imageBlob = response.data;
      const imageUrl = URL.createObjectURL(imageBlob);

      setPropertyImages(prevPropertyImages => ({
        ...prevPropertyImages,
        [property.id]: imageUrl,
      }));
    }
  } catch (error) {
    console.error("Error fetching property image:", error);
  }
};
