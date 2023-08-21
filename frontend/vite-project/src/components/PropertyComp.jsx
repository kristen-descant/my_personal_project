import React from "react";
import RentComp from "./RentComp";

export default function PropertyComp(props) {
  
    const {address, newPropertyImage, beds, baths, sqft,
    max, mean, median, min, details} = props;

    console.log(max)

    return (
       <>
       <div className=" flex flex-col justify-center "> 
        <div className="flex flex-row justify-start">
          <div className="flex flex-col mr-5 pt-8 mt-8 h-100">
            <div className="">
              <p>Beds: {beds} Baths: {baths} Sqft: {sqft}</p>
            </div>
          <div>
            <div className="font-bold">
              Details:
            </div>
            <div className="bg-white h-full">
              {details ? details : "Add details about this property."}
            </div>
          </div>
        </div>
          <div className="flex-col">
            <div className="text-center mb-3 font-bold mr-5">
              <p>{address}</p>
            </div>
              <div className="flex justify-center mb-3">
                <img src={newPropertyImage} alt="" />
              </div>
            </div>
            <div className=" pt-8 mt-8">
              <RentComp max={max} mean={mean} median={median} min={min} />
            </div>
          </div>  
        </div>
        </>
    )
}