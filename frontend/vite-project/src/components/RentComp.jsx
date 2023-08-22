import React from "react";

export default function RentComp(props) {
    const { max, min, mean, median } = props;

    return (
        <>
            <h4 className="font-bold">Rent Data:</h4>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Max: ${max}</p>
                        
                    </div>
                    <div>
                        <p>Min: ${min}</p>
                        
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Mean: ${mean}</p>
                        
                    </div>
                    <div>
                        <p>Median: ${median}</p>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
