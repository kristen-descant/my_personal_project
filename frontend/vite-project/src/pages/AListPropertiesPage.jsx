import React, { useEffect, useState } from "react";
import { api } from "./utilities";
import { useOutletContext, useParams } from "react-router-dom";
import ListComp from "../components/ListComp";

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
          <ListComp properties={properties}/>
        </>
      );
}