import React from "react";

export default function RentComp(props) {
    const { max, min, mean, median } = props;

    return (
        <>
            <h4 className="font-bold">Rent Data:</h4>
            <div>
                <p>Max Rent:</p>
                {max}
            </div>
            <div>
                <p>Min Rent:</p>
                {min}
            </div>
            <div>
                <p>Mean Rent:</p>
                {mean}
            </div>
            <div>
                <p>Median Rent:</p>
                {median}
            </div>
        </>
    );
}
