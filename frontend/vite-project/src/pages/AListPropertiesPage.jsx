import React, { useEffect, useState } from "react";
import { api } from "./utilities";
import { useOutletContext, useParams } from "react-router-dom";
import ListComp from "../components/ListComp";
import { Link } from "react-router-dom";

export default function AListPropertiesPage() {
    const [myList, setMyList] = useState(null);
    const [myListName, setMyListName] = useState('');
    const {listId} = useParams();
    const [properties, setProperties] = useState(null);
    const {setPageDescrip} = useOutletContext();

    const getList = async () => {

        try {
            const response = await api.get(`properties/lists/${listId}`)
            setMyList(response)
            setMyListName(response.data.list_name)
            setProperties(response.data.properties)
           
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getList();
    }, [])

    useEffect(() => {
        setPageDescrip(myListName);
      }, [myList]);

      return (
        <>
        <div className=" w-screen flex flex-row min-h-screen justify-center ">
          <div className="w-3/4 ">
            {properties && (properties.length > 0 ?
              (<ListComp setProperties={setProperties} properties={properties} listId={listId}/>) :
          
              (
              <div className="w-full flex flex-col justify-around items-center h-full text-white">
                <div className="w-1/2 text-center">
                  <p className="text-xl">This list is empty. Add properties to see them here. </p>
                </div>
                <div className="text-center">
                <Link className=" rounded mb-2 hover:bg-sky-900 bg-sky-700 border pl-1 pr-1 border-white" to='/addproperty'>Add a property</Link>
                </div>
              </div>
              ))
            }
          </div>
        
        </div>
        </>
      );   
}
// (<p className="text-center">There are no properties in this list.  <Link className="h-6 w-20 shadow-lg rounded mb-2 hover:bg-blue-500 border p-1 border-black" to="/addproperty">Add a property</Link></p>))