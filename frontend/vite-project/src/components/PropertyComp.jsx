import React, { useEffect } from "react";
import RentComp from "./RentComp";
import { api } from "../pages/utilities";

export default function PropertyComp(props) {
  
    const {address, newPropertyImage, beds, baths, sqft, propertyId,
    max, mean, median, min, details, setDetails, tempDetails, setTempDetails} = props;

    const handleAddDetails = async () => {
      try {
        setDetails(tempDetails)
        console.log(tempDetails)
        const response = await api.put(`properties/property/${propertyId}/`, {
          details: tempDetails
        });
        console.log(response)
      } catch(error) {
        console.log(error)
      };
    };
    console.log(details)
    useEffect(() => {
      console.log(tempDetails)
    }, [tempDetails])
  
    const handleEditDetails = () => {
      setDetails("")
    }

    return (
      <>
      <div className="flex flex-row ml-10 mr-10">
        <div className="w-1/2" >
            <div className="text-center mb-3 font-bold mr-5 w-1/2">
              <p>{address}</p>
            </div>
            <div className="">
              <p>Beds: {beds} </p>
              <p>Baths: {baths} </p>
              <p>Sqft: {sqft}</p>
            </div>
            <div className="font-bold mb-2">
              Details:
            </div>
            <div className="pr-3 overflow-scroll">
              {!details ? 
              <textarea className="border border-black" onChange={(e) => (setTempDetails(e.target.value))} value={tempDetails} cols="25" rows="5"></textarea> :
              details
              }
            </div>
            <div className="flex flex-row">
              <div>
                <button className=" hover:bg-sky-900 bg-sky-700 pl-1 pr-1 rounded mr-3 text-white" onClick={handleAddDetails}>Save Details</button>
              </div>
              <div>
                <button className="hover:bg-sky-900 bg-sky-700 pl-1 pr-1 rounded text-white" onClick={handleEditDetails}>Edit Details</button>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div className="">
              <img src={newPropertyImage} alt="" />
            </div>
            <div className=" mt-3 w-3/4">
              <RentComp max={max} mean={mean} median={median} min={min} />
            </div>
          </div>
        </div>
      </>
    )
}