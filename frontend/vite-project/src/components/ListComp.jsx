import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../pages/utilities";

export default function ListComp(prop) {
  const navigate = useNavigate();
  const {setProperties, properties, listId } = prop;
  const [propertyImages, setPropertyImages] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const {pageDescrip} = useOutletContext();

  console.log(listId)

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

  const handleRemoveFromPortfolio = async (propertyId) => {
   
    try {
      const response = await api.put(`properties/remove/property/${propertyId}/portfolio/`);
      // Update properties state by removing the property with the given propertyId
      const updatedProperties = properties.filter(property => property.id !== propertyId);
      setProperties(updatedProperties);
      
    } catch (error) {
      console.error("Error removing property from portfolio:", error);
    }
  };

  const handleRemoveFromList = async (propertyId, e) => {
  
    try {
      const response = await api.put(`properties/remove/property/${propertyId}/lists/${listId}/`);
      // Update properties state by removing the property with the given propertyId
      const updatedProperties = properties.filter(property => property.id !== propertyId);
      setProperties(updatedProperties);
    } catch (error) {
      console.error("Error removing property from list:", error);
    }
  };

  return (
      <ul>
        {properties &&
          properties.map((property) => (
            <li className="m-2 flex flex-row justify-between border-black border bg-white rounded-md shadow-lg" key={property.id} onClick={() => handlePropertyClick(property.id)}>
              <div className="overflow-hidden">
                {propertyImages[property.id] ? ( // Check if the image has loaded
                  <img src={propertyImages[property.id]} alt="property" className="object-cover w-full h-full rounded-md" onLoad={handleImageLoad} />
                ) : (
                  <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                )}
              </div>
              <div className="flex flex-col justify-between ml-2 mr-8 w-3/4">
                <div className="text-center text-lg">
                {property.address}
                </div>
                <div className="flex justify-between">
                    <div><span className="font-bold">Cash Flow:</span> <span className="text-blue-700">{property.purchase_worksheet.property_analysis.cash_flow}</span> </div>  
                    <div><span className="font-bold">COC:</span> <span className="text-blue-700">{property.purchase_worksheet.property_analysis.coc}</span> </div> 
                    <div><span className="font-bold">Cap Rate:</span> <span className="text-blue-700">{property.purchase_worksheet.property_analysis.cap_rate}</span></div>
                </div>
                <div className="flex justify-end justify-evenly">
                  <div onClick={(e) => {e.stopPropagation()}}>
                    {pageDescrip === 'Portfolio' ? 
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromPortfolio(property.id)}} className="shadow-md mb-2 bg-gray-300 hover:bg-blue-400 rounded">
                    Remove from Portfolio
                    </button> :
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromList(property.id)}} className="shadow-md mb-2 bg-gray-300 hover:bg-blue-400 rounded">
                    Remove From List
                    </button>
                }
                  </div>
                {/* Navigate to the property's purchase worksheet page */}
                <button
                className="shadow-md mb-2 bg-gray-300 hover:bg-blue-400 rounded "
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
