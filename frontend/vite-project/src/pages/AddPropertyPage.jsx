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

    const clearSelectedAddress = (e) => {

        setAddressInput('');
        setSuggestions('')
    }

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
        <div className=" w-3/4 flex flex-col items-center mr-10 pr-10 h-screen bg-blue-500">
            <div className="flex justify-center mt-5 w-full">
                <div className="pl-10">
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
                <div className="pr-10">
                    <button type='submit' onClick={clearSelectedAddress}>Clear</button>
                </div>
            </div>
            <div className="h-1/4 w-full text-center">
                {addressInput &&  (
                    <ul className="suggestions">
                        {suggestions.map((suggestion) => (
                        <li
                        key={suggestion.place_id}
                        onClick={() => handleAddressSelect(suggestion.description)}
                        >
                        {suggestion.description}
                        </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex flex-row justify-around mb-5">
           
                  
                        <div className="ml-10 pl-10 text-left">
                            <label  htmlFor="beds">Beds: </label>
                        </div>
                        <div className="mr-12 ml-3 text-right">
                            <input className="border border-black rounded " onChange={(e) => setBeds(e.target.value)} type="text"/>
                        </div>
       
                    <div className="mr-3">
                        <label htmlFor="baths">Baths:</label>
                    </div>
                    <div>
                        <select className="border border-black rounded mr-12" onChange={(e) => setBaths(e.target.value)} >
                            <option value=''>Select</option>
                            <option value={1}>1</option>
                            <option value={1.5}>1.5+</option>
                        </select>
                    </div>
                    
        
  
                    <div className="mr-4">
                        <label htmlFor="sqft">sqft: </label>
                    </div>
                    <div>
                        <input className="border border-black rounded" onChange={(e) => setSqft(e.target.value)} type="sqft"/>
                    </div>
         
    
     
            </div>
         
            <div className="flex justify-center ">
                <div>
                <div className="mr-5 mb-3">
                    <label htmlFor="details">Details:</label>
                </div>
                <div>
                    <textarea className="border border-black rounded" onChange={(e) => setDetails(e.target.value)} cols="30" rows="8"></textarea>
                </div>
                </div>
            </div>
           <button className="border border-black rounded bg-gray-300" onClick={addNewProperty}>Add Property</button>
           </div>
    
        </>
    );
}
