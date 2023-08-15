import { api } from "./utilities.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function PortfolioPage() {

    const {properties, pageDescip, setPageDescrip } = useOutletContext()
    const [property, setProperty ] = useState(null)

    useEffect(() => {
        //this is where i will ping backend to get all properties in user portfolio
    })

    const handlePropertyClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
      };

    return (
        <>
            <div className="portfolioList">
            <ul>
            {properties.map((property) => {
               return <li key={property.id} onClick={()=> handlePropertyClick(property.id)}>{property.street}</li>
            })}
            </ul>
            </div>
        </>
    )
    
}