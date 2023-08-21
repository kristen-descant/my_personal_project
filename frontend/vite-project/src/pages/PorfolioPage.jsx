import { api } from "./utilities.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ListComp from "../components/ListComp.jsx";

export default function PortfolioPage() {

  const {properties, setProperties, setPageDescrip, user} = useOutletContext()
  const navigate = useNavigate();

  useEffect(() => {
    setPageDescrip('Portfolio');
  }, []);

  const getPortfolio = async () => {
      if (user) {
          try {
              let response = await api.get("properties/portfolio/");

                  setProperties(response.data.properties)

              } catch(error) {
                  console.log(error);
              }
          };
      };

        useEffect(() => {
            getPortfolio();
          }, [user]);

      return (
        <div className="mt-10">
        {properties && (properties.length > 0 ?
          (<ListComp properties={properties}/>) :
          (<p>Add properties to your portfolio.</p>))
        }
        </div>
      );   
}