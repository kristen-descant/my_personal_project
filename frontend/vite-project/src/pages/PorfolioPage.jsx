import { api } from "./utilities.jsx";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ListComp from "../components/ListComp.jsx";


export default function PortfolioPage() {

  const {properties, setProperties, setPageDescrip, user} = useOutletContext()
  const navigate = useNavigate();
  const [listId, setListId] = useState(null);

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
        <>
        <div className="mt-4 w-screen flex flex-row mr-5 h-screen">
          <div className="w-3/4 pl-8">
            {properties && (properties.length > 0 ?
              (<ListComp setProperties={setProperties} properties={properties} listId={listId}/>) :
              (<p className="text-center"><Link className="h-6 w-20 shadow-lg rounded mb-2 hover:bg-blue-200 border-b-2 border-black" to='/addproperty'>Add a property</Link> to your portfolio.</p>))
            }
          </div>
        
        </div>
        </>
      );   
}