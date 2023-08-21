import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/utilities";

export default function ListComp(prop) {
  const navigate = useNavigate();
  const { properties } = prop;
  const [propertyImages, setPropertyImages] = useState({});

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
  }, [properties]);

  return (
    <div className="">
      <ul>
        {properties &&
          properties.map((property) => (
            <li className="shadow-md m-2 flex flex-row justify-between" key={property.id} onClick={() => handlePropertyClick(property.id)}>
              <img src={propertyImages[property.id]} alt="property" />
              <div className="flex flex-col justify-between ml-2 mr-2">
              <div>
              {property.address}
              </div>
              <div>

              </div>
              <div className="flex justify-end">
              {/* Navigate to the property's purchase worksheet page */}
              <button
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
    </div>
  );
}
