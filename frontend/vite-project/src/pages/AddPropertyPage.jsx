import React, { useState, useEffect } from "react";
import { api } from "./utilities";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function AddPropertyPage() {
    const [addressInput, setAddressInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [beds, setBeds] = useState(null);
    const [baths, setBaths] = useState(null);
    const [sqft, setSqft] = useState(null);
    const [details, setDetails] = useState(null);
    const { setPageDescrip } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        setPageDescrip('Add a Property');
    }, []);

    useEffect(() => {
        if (addressInput.trim() !== "") {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [addressInput]);

    const fetchSuggestions = async () => {
      
        const response = await api.get(`map/autocomplete/${encodeURIComponent(addressInput)}`);
        const data = response.data;
        setSuggestions(data.predictions); 
    };

    const handleAddressSelect = (selectedAddress) => {

        setAddressInput(selectedAddress);
        setSuggestions([]);
    };

    const addNewProperty = async () => {

        try {
            const response = await api.post('properties/', {
                address: addressInput,
                beds: beds,
                baths: baths,
                sqft: sqft,
                details:details
            })
            const newPropertyId = response.data.id;
            navigate(`/property/${newPropertyId}`); 
            
        } catch(error) {
            console.log(error)
        }
        
    };
    
    return (
        <>
        <div className=" w-full mt-8 mb-8 flex flex-no-wrap flex-col items-center justify-evenly h-3/4 bg-white relative rounded">
            <div className="flex flex-no-wrap overflow-hidden justify-center mt-0 w-full">
                <div className="">
                    <label>Address:</label>
                </div>
                <div>
                    <input
                        className="border ml-3 mr-3 border-black rounded"
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="Enter address..."
                    />
                </div>
            
            </div>
            <div className=" text-center absolute top-12 w-1/2">
                {addressInput &&  (
                    <ul className="suggestions">
                        {suggestions.map((suggestion) => (
                        <li
                        className="bg-white border border-black rounded hover:bg-gray-300"
                        key={suggestion.place_id}
                        onClick={() => handleAddressSelect(suggestion.description)}
                        >
                        {suggestion.description}
                        </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-col items-around h-1/4 justify-between mb-5">
           
                  <div className="flex flex-row">
                        <div className="mr-4">
                            <label  htmlFor="beds">Beds: </label>
                        </div>
                        <div className="">
                            <input className="border border-black rounded " onChange={(e) => setBeds(e.target.value)} type="text"/>
                        </div>
                      
                    </div>
                <div className="flex flex-row">
                    <div className="mr-4">
                        <label htmlFor="baths">Baths:</label>
                    </div>
                    <div>
                        <select className="border border-black rounded mr-12" onChange={(e) => setBaths(e.target.value)} >
                            <option value=''>Select</option>
                            <option value={1}>1</option>
                            <option value={1.5}>1.5+</option>
                        </select>
                    </div>
                </div>
        
                <div className="flex flex-row">
                    <div className="mr-6">
                        <label htmlFor="sqft">sqft: </label>
                    </div>
                    <div>
                        <input className="border border-black rounded" onChange={(e) => setSqft(e.target.value)} type="sqft"/>
                    </div>
                </div>
    
     
            </div>
         
            <div className="flex justify-start flex-row">
               
                <div className="mr-5 mb-3">
                    <label htmlFor="details">Details:</label>
                </div>
                <div>
                    <textarea className="border border-black rounded" onChange={(e) => setDetails(e.target.value)} cols="30" rows="6"></textarea>
                </div>
                
            </div>
           <button className="border border-black rounded bg-gray-300" onClick={addNewProperty}>Add Property</button>
           </div>
    
        </>
    );
}
