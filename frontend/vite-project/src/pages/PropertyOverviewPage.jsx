import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
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
    const [details, setDetails] = useState(null);
    const [property, setProperty] = useState(null);
    const [newPropertyImage, setNewPropertyImage] = useState(null);
    const [isInPortfolio, setIsInPortfolio] = useState(false);
    const [isInList, setIsInList] = useState(false);
    const [selectedListId, setSelectedListId] = useState(null);
    const [userLists, setUserLists] = useState([]);
    const [isNewList, setIsNewList] = useState(false);
    const [newListName, setNewListName] = useState("");

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
      // const response = await api.get(`rent/${propertyId}/`)

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
        <div className="aProperty">
          <div>
        <PropertyComp address={address} newPropertyImage={newPropertyImage}
        beds={beds} baths={baths} sqft={sqft} max={max} mean={mean} median={median}
         min={min} details={details} />
         </div>
        <div>
            <button onClick={handlePortfolioToggle}>
                    {isInPortfolio ? "Remove from Portfolio" : "Add to Portfolio"}
            </button>
  
              <div>
                <button onClick={handleAddToList}>Add to List</button>
                {isNewList ? (
                  <>
                  <input
                    type="text"
                    placeholder="New List Name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                  <button onClick={() => setIsNewList(false)}>Existing List</button>
                  </>
                ) : (
                <select
                  value={selectedListId ? selectedListId : ""}
                  onChange={(e) => handleListSelection(e.target.value)}
                >
                  <option value="">Select a List</option>
                  {userLists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.list_name}
                    </option>
                  ))}
                  <option value="new-list">Create New List</option>
                </select>
                )}

              </div>

          </div>
        </div>
      );

    
}