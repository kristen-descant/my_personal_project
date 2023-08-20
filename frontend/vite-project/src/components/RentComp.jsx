import React from "react";

export default function RentComp(props) {
  
    const {max, min, mean, median} = props;

    return (
       <>
          <h4>Rent Data:</h4>
          <div>
            <p>Max Rent:</p>
            {max}
          </div>
          <div>
            <h4>Min Rent:</h4>
            {min}
          </div>
          <div>
            <h4>Mean Rent:</h4>
            {mean}
          </div>
          <div>
            <h4>Median Rent:</h4>
            {median}
          </div>
        </>
    )
}