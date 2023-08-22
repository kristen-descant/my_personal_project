import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { api } from "./utilities";

export default function ListsPropertiesPage() {
    const {setPageDescrip, user} = useOutletContext();
    const [usersLists, setUserLists] = useState(null);
    const [newListName, setNewListName] = useState('');

    useEffect(() => {
        setPageDescrip('My Lists')
    }, []);

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
    }, []);

    const handleAddList = async () => {
        try {
            const response = await api.post('properties/lists/', {
                list_name: newListName
            })

            setNewListName('');
            getUserLists();

        } catch(error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="h-screen">
                <div>
                    <input type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="New List Name"/>
                    <button onClick={handleAddList}>Add List</button>
                </div>
                {usersLists && 
                <div>
                    <ul>
                        {usersLists.map((list) => (
                        <li  key={list.id}>
                        <Link to={`${list.id}`}>  {list.list_name}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
                }
            </div>
        </>
    )
}