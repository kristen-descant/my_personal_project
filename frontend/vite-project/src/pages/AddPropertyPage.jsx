import React, { useState, useEffect } from "react";
import { api } from "./utilities";

export default function AddPropertyPage() {
    const [addressInput, setAddressInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (addressInput.trim() !== "") {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [addressInput]);

    const fetchSuggestions = async () => {
      
            const response = await api.get(`map/autocomplete/${encodeURIComponent(addressInput)}`);
            console.log(response)
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

    return (
        <div className="add-property">
            <h1>Add a Property</h1>
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
          
            {/* <button onClick={addProperty}>Add Property</button> */}
        </div>
    );
}
