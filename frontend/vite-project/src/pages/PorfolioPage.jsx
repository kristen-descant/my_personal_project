import { api } from "./utilities.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ListComp from "../components/ListComp.jsx";

export default function PortfolioPage() {

    const {properties, setProperties, pageDescip, setPageDescrip, user, setSelectedProperty } = useOutletContext()
    const navigate = useNavigate();

    useEffect(() => {
      setPageDescrip('Portfolio');
    }, []);


    const getPortfolio = async () => {
        if (user) {
            try {
                let response = await api.get("properties/portfolio/");
                    console.log(response)
                    setProperties(response.data.properties)
                    console.log(response.data.properties)
                    
                } catch(error) {
                    console.log(error);
                }
            };
        };


        useEffect(() => {
            getPortfolio();
          }, [user]);
        
        console.log(properties)

    const handlePropertyClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
      };

      return (
        <>
          <ListComp properties={properties}/>
        </>
      );
      
      
    
}