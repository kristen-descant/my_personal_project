import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/utilities";

export default function ListComp(prop) {
  const navigate = useNavigate();
  const { properties } = prop;
  const [propertyImages, setPropertyImages] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    const allImagesLoaded = properties.every(property => property.imageLoaded);
    if (allImagesLoaded) {
      setImagesLoaded(true);
    }
  };

  // Navigate to page overview of specific porperty
  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  // Fetch an image for each porperty in the list
  const getListImages = async () => {
    try {
      for (const property of properties) {
        const response = await api.get(`map/propertyimage/${encodeURIComponent(property.address)}/100x100/`, {
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

  useEffect(() => {
    getListImages();
    // console.log(properties)
  }, [properties]);

  return (
      <ul>
        {properties &&
          properties.map((property) => (
            <li className="shadow-md m-2 flex flex-row justify-between hover:bg-slate-400 rounded-md" key={property.id} onClick={() => handlePropertyClick(property.id)}>
              <div className="overflow-hidden">
                {propertyImages[property.id] ? ( // Check if the image has loaded
                  <img src={propertyImages[property.id]} alt="property" className="object-cover w-full h-full rounded-md" onLoad={handleImageLoad} />
                ) : (
                  <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                )}
              </div>
              <div className="flex flex-col justify-between ml-2 mr-2">
              <div className="text-right">
              {property.address}
              </div>
              <div className="flex justify-between">
                  <div>Cash Flow: {property.purchase_worksheet.property_analysis.cash_flow}</div>  
                  <div>COC: {property.purchase_worksheet.property_analysis.coc} </div> 
                  <div>Cap Rate: {property.purchase_worksheet.property_analysis.cap_rate}</div>
              </div>
              <div className="flex justify-end">
              {/* Navigate to the property's purchase worksheet page */}
              <button
              className="shadow-md mb-2 hover:bg-blue-200 rounded "
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                navigate(`/purchaseworksheet/${property.id}`);
              }}
            >
              Purchase Worksheet
            </button>
            </div>
              </div>
            </li>
          ))}
      </ul>

  );
}
