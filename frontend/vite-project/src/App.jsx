import { useState } from 'react'
import './App.css'
import { Outlet, Link } from "react-router-dom";
import propertiesIntialValue from "./data/properties.json"
import NavbarComp from './components/NavbarComp';

function App() {

  const [properties, setProperties] = useState(propertiesIntialValue)
  const [pageDescrip, setPageDescript] = useState('pagedescrip')

  const getPropertyById = (id) => {
    return properties.find((property) => property.id === id)
  }

  return (
    <>
      <NavbarComp/>
      <div className='header'>
      <header>
        <p>logo</p>
        <p>{pageDescrip}</p>
        <p>sttings,logout</p>
      </header>
      </div>
      
      <Outlet/>
    </>
  )
}

export default App
