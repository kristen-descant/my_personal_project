import { useState } from 'react'
import './App.css'
import { Outlet } from "react-router-dom";
import propertiesIntialValue from "./data/properties.json"
import NavbarComp from './components/NavbarComp';

function App() {

  const [properties, setProperties] = useState(propertiesIntialValue)
  const [pageDescrip, setPageDescrip] = useState('pagedescrip')
  const [selectedPoperty, setSelectedPropety] = useState(null)

  const getPropertyById = (id) => {
    const numericId = parseInt(id, 10);
    return properties.find((property) => property.id === numericId);
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
      
      <Outlet
      context={
        {properties, 
        setProperties,
        pageDescrip,
        setPageDescrip,
        selectedPoperty,
        setSelectedPropety,
        getPropertyById}
      }/>
    </>
  )
}

export default App
