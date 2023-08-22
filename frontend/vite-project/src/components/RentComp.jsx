import React from "react";

export default function RentComp(props) {
    const { max, min, mean, median } = props;

    return (
        <>
            <h4 className="font-bold">Rent Data:</h4>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Max: $</p>
                        {max}
                    </div>
                    <div>
                        <p>Min: $</p>
                        {min}
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Mean: $</p>
                        {mean}
                    </div>
                    <div>
                        <p>Median: $</p>
                        {median}
                    </div>
                </div>
            </div>
        </>
    );
}
