import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { api } from "./utilities";
import PropertyComp from "../components/PropertyComp";

export default function PropertyOverviewPage() {

  const { propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const { getPropertyById, setPageDescrip, user, selectedProperty } = useOutletContext();
  const [address, setAddress] = useState(null);
  const [beds, setBeds] = useState(null);
  const [baths, setBaths] = useState(null);
  const [sqft, setSqft] = useState(null);
  const [max, setMax] = useState(null);
  const [mean, setMean] = useState(null);
  const [median, setMedian] = useState(null);
  const [min, setMin] = useState(null);
  const [purchaseWorksheet, setPurchaseWorksheet] = useState(null)
  const [details, setDetails] = useState("");
  const [tempDetails, setTempDetails] = useState();
  const [property, setProperty] = useState(null);
  const [newPropertyImage, setNewPropertyImage] = useState(null);
  const [isInPortfolio, setIsInPortfolio] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [userLists, setUserLists] = useState([]);
  const [isNewList, setIsNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      setPageDescrip('Property');
  }, []);

  const getProperty = async () => {

    const response = await api.get(`properties/property/${propertyId}/`);
    const {address, beds, baths, details, purchase_worksheet, sqft, portfolio, list_of_properties} = response.data
    setAddress(address);
    setBeds(beds);
    setBaths(baths);
    setDetails(details);
    setSqft(sqft);
    setPurchaseWorksheet(purchase_worksheet);
    setProperty(response.data)
    if (portfolio) {
      setIsInPortfolio(true)
    };
    if (list_of_properties) {
      setIsInList(true)
    };
  };

  const getRents = async () => {
    const response = await api.get(`rent/${propertyId}/`)

    const {max, mean, median, min} = response.data;
    console.log(response)
    setMax(max);
    setMean(mean);
    setMedian(median);
    setMin(min);
    console.log(propertyId)
    console.log(max)
  }

  const handlePortfolioToggle = async () => {
    if (isInPortfolio) {
      try {
        const response = await api.put(`properties/remove/property/${propertyId}/portfolio/`);
        setIsInPortfolio(false);
      } catch(error) {
        console.log(error)
      }
    } else {
      try {
        const response = await api.put(`properties/add/property/${propertyId}/portfolio/`);
        setIsInPortfolio(true)
      } catch(error) {
        console.log(error)
      }
    }
  };

  const getUserLists = async () => {

    try {
      const response = await api.get('properties/lists/')
      setUserLists(response.data)
    } catch(error) {
      console.log(error)
    }

  }
  
  useEffect(() => {
    getUserLists();
  }, [user]);
    
  const handleListSelection = (selectedValue) => {
    if (selectedValue === "new-list") {
      setIsNewList(true);
    } else {
      setSelectedListId(selectedValue);
      setIsNewList(false);
    }
  };
  

  const handleAddToList = async () => {
    if (isNewList && newListName !== '') {
      try {
        const response = await api.post('properties/lists/', {
          list_name: newListName,
        });
        
        const listId = response.data.id
        const addProperty = await api.put(`properties/add/property/${propertyId}/lists/${listId}/`)

        setIsNewList(false)

        getUserLists();
        console.log(addProperty)
        if (addProperty.response === 200) {
          window.alert('added to list')
        }

      } catch(error) {
        console.log(error)
      }
    }
    else if (selectedListId) {
      try {
        const response = await api.put(`properties/add/property/${propertyId}/lists/${selectedListId}/`)

      } catch(error) {
        console.log(error)
      }
    }
  }


  const getImage = async () => {
    if (property !== null){
      try {
        const response = await api.get(`map/propertyimage/${encodeURIComponent(address)}/200x200/`, {
            responseType: 'blob', // Set response type to 'blob'
        });
        
        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);

        setNewPropertyImage(imageUrl);
      } catch (error) {
          console.error("Error fetching property image:", error);
      }
    }
  }

  useEffect(() => {
    getProperty();
  }, [user]);

  useEffect(() => {
    getImage();
    getRents();
  }, [property]);

  return (
    <div className=" w-full mt-8 mb-8 flex flex-no-wrap flex-col items-center justify-evenly h-3/4 bg-white relative rounded">
      <div className="w-full">
        <PropertyComp address={address} newPropertyImage={newPropertyImage} propertId={propertyId}
        beds={beds} baths={baths} sqft={sqft} max={max} mean={mean} median={median} tempDetails={tempDetails}
          min={min} details={details} setDetails={setDetails} setTempDetails={setTempDetails} propertyId={propertyId} />
      </div>
    <div className="flex flex-row justify-between w-full pl-3 pr-3">
      <div className="shadow-md mb-5 bg-slate-400 rounded-md text-center">
        <button className="bg-sky-700 hover:bg-sky-900 rounded pl-1 pr-1 text-white" onClick={handlePortfolioToggle}>
                {isInPortfolio ? "Remove from Portfolio" : "Add to Portfolio"}
        </button>
      </div>
      <div className="flex flex-row h-1/2">
        {selectedListId && 
        <button className="bg-sky-700 text-white hover:bg-sky-900 rounded pl-1 pr-1" onClick={handleAddToList}>Add</button>}
        {isNewList ? (
          <>
          <input
            type="text"
            placeholder="New List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button className="ml-3 hover:bg-blue-200 rounded" onClick={() => setIsNewList(false)}>X</button>
          </>
        ) : (
        <select
          className="border border-black"
          value={selectedListId ? selectedListId : ""}
          onChange={(e) => handleListSelection(e.target.value)}
        >
          <option value="">Add to List</option>
          {userLists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.list_name}
            </option>
          ))}
          <option value="new-list">Create New List</option>
        </select>
        )}

      </div>
      <div>
      <button
          className="shadow-md mb-2 bg-sky-700 text-white hover:bg-sky-900 rounded pl-1 pr-1"
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            navigate(`/purchaseworksheet/${property.id}`);
          }}
        >
          Purchase Worksheet
        </button>
      </div>
    </div>
  </div>
  );

    
}