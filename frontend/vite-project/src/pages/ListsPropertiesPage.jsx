import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FaRegTrashAlt } from 'react-icons/fa';
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

    const handleListDelete = async (listId) => {
        try {
            const response = await api.delete(`properties/lists/${listId}`)
            getUserLists();
        } catch(error) {
            console.log(error)
        }
    };

    return (
        <>
        <div className="w-full flex justify-center">
            <div className="overflow-scroll w-1/2 mt-8 mb-8 flex flex-no-wrap flex-col items-center  h-3/4 bg-white rounded">
                <div className="mt-5 mb-5 flex flex-row flex-nowrap overflow-hidden">
                    <input className="border border-black rounded mr-3" type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="New List Name"/>
                    <button className="border border-black rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" onClick={handleAddList}>Add List</button>
                </div>
                {usersLists && 
                <div className="  w-3/4 flex justify-center sm:w-1/2">
                   
                        <ul className="w-full">
                            {usersLists.map((list) => (
                            <li className="border flex flex-row justify-between h-full bg-sky-700 text-white hover:bg-sky-900 rounded w-full text-center mb-1"  key={list.id}>
                            
                            <Link className="pl-2" to={`${list.id}`}>  {list.list_name}</Link> 
                            <div className="h-full flex items-center pr-2">
                                <FaRegTrashAlt
                                onClick={() => handleListDelete(list.id)}
                                />
                            </div>
                            </li>
                            ))}
                        </ul>
                   
                </div>
                }
            </div>
        </div>
        </>
    )
}