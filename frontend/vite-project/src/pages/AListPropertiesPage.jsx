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
        <div className="mt-4 w-screen flex flex-row mr-5 h-screen">
          <div className="w-3/4 pl-8 mt-5">
            {properties && (properties.length > 0 ?
              (<ListComp setProperties={setProperties} properties={properties} listId={listId}/>) :
              (<p className="text-center">There are no properties in this list.  <Link className="h-6 w-20 shadow-lg rounded mb-2 hover:bg-blue-500 border p-1 border-black" to="/addproperty">Add a property</Link></p>))
            }
          </div>
        
        </div>
      );
}