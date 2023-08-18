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
        <div className="add-property">
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Enter address..."
                />
                <button type='submit' onClick={clearSelectedAddress}>Clear</button>
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
            <div>
                <label htmlFor="beds">beds</label>
                <input onChange={(e) => setBeds(e.target.value)} type="text"/>
            </div>
            <div>
                <label htmlFor="baths">baths</label>
                <select onChange={(e) => setBaths(e.target.value)} >
                    <option value=''>Select</option>
                    <option value={1}>1</option>
                    <option value={1.5}>1.5+</option>
                </select>
            </div>
            <div>
                <label htmlFor="sqft">sqft</label>
                <input onChange={(e) => setSqft(e.target.value)} type="sqft"/>
            </div>
            <div>
                <label htmlFor="details">details</label>
                <textarea onChange={(e) => setDetails(e.target.value)} cols="30" rows="10"></textarea>
            </div>
           <button onClick={addNewProperty}>Add Property</button>
        </div>
        </>
    );
}
