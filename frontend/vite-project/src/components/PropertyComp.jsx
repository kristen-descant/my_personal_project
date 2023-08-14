import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PropertyComp({property}){

    const {getPropertyById, setSelectedProperty, pageDescip, setPageDescrip} = useOutletContext();
    
    const {id, street} = property

    return (
        <>
        <p>Property ID: {id}</p>
        <p>Street: {street}</p>
        </>
    )

}