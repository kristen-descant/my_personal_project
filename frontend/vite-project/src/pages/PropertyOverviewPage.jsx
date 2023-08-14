import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

export default function PropertyOverviewPage() {

    const { propertyId } = useParams();
    const [propertyDetails, setPropertyDetails] = useState(null);
    const { properties, getPropertyById } = useOutletContext();

    const property = getPropertyById(propertyId);

    // useEffect(() => {
    //     // Fetch property details using propertyId from your backend
    //     // Update the propertyDetails state with the fetched data
    //   }, [propertyId]);
      
    //   if (!propertyDetails) {
    //     return <div>Loading...</div>;
    //   }

      return (
        <div className="aProperty">
          <p>Property ID: {property.id}</p>
          <p>Street: {property.street}</p>
          {/* Display other property details here */}
        </div>
      );

    
}