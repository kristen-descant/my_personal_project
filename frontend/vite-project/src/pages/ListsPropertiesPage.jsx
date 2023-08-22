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
            <div className=" w-full mt-8 mb-8 flex flex-no-wrap flex-col items-center  h-3/4 bg-white rounded">
                <div className="mt-5 mb-5">
                    <input className="border border-black rounded mr-3" type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="New List Name"/>
                    <button className="border border-black rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" onClick={handleAddList}>Add List</button>
                </div>
                {usersLists && 
                <div className="  w-3/4 flex justify-center">
                   
                        <ul className="w-1/3">
                            {usersLists.map((list) => (
                            <li className="border bg-sky-700 text-white hover:bg-sky-900 rounded w-full text-center mb-1"  key={list.id}>
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