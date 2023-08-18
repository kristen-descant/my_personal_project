import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../pages/utilities";

export default function ListComp(prop) {
  const navigate = useNavigate();
  const { properties } = prop;
  const [propertyImages, setPropertyImages] = useState({});

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

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

  // console.log(properties[0].purchase_worksheet.property_analysis)

  return (
    <div className="portfolioList">
      <ul>
        {properties &&
          properties.map((property) => (
            <li key={property.id} onClick={() => handlePropertyClick(property.id)}>
              <img src={propertyImages[property.id]} alt="property" />
              <div>
              
              <button
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                navigate(`/purchaseworksheet/${property.id}`);
              }}
            >
              purchase worksheet
            </button>
              </div>
              {property.address}
            </li>
          ))}
      </ul>
    </div>
  );
}
