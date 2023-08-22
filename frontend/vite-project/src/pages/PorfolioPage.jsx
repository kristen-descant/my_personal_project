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
        <div className=" w-screen flex flex-row min-h-screen justify-center ">
          <div className="w-3/4 ">
            {properties && (properties.length > 0 ?
              (<ListComp setProperties={setProperties} properties={properties} listId={listId}/>) :
          
              (
              <div className="w-full flex flex-col justify-around items-center h-full text-white">
                <div className="w-1/2 text-center">
                  <p className="text-xl">Your portfolio is empty. Add properties to your portfolio to see them here. </p>
                </div>
                <div className="text-center">
                <Link className=" rounded pl-1 pr-1 hover:bg-sky-900 bg-sky-700 border border-white" to='/addproperty'>Add a property</Link> to your portfolio.
                </div>
              </div>
              ))
            }
          </div>
        
        </div>
        </>
      );   
}