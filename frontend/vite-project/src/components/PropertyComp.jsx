import React from "react";
import RentComp from "./RentComp";

export default function PropertyComp(props) {
  
    const {address, newPropertyImage, beds, baths, sqft,
    max, mean, median, min, details} = props;

    console.log(max)

    return (
       <>
       <div className="propertyCard"> 
          <p>{address}</p><br />
          <div>
            <img src={newPropertyImage} alt="" />
          </div>
          <div>
            <p>Beds: {beds} Baths: {baths} Sqft: {sqft}</p>
          </div>
          <div>
            <RentComp max={max} mean={mean} median={median} min={min} />
          </div>
          <div>
            {details}
          </div>
        </div>
        </>
    )
}