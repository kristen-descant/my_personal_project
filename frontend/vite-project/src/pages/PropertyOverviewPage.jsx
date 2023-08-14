import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import PropertyComp from "../components/PropertyComp";

export default function PropertyOverviewPage() {

    const { propertyId } = useParams();
    const [propertyDetails, setPropertyDetails] = useState(null);
    const { getPropertyById, setPageDescrip } = useOutletContext();

    const property = getPropertyById(propertyId);
    useEffect(() => {
        setPageDescrip('Property');
    }, []);

    // useEffect(() => {
    //     // Fetch property details using propertyId from your backend
    //     // Update the propertyDetails state with the fetched data
    //   }, [propertyId]);
      
    //   if (!propertyDetails) {
    //     return <div>Loading...</div>;
    //   }

      return (
        <div className="aProperty">
          <PropertyComp property={property}/>
        </div>
      );

    
}