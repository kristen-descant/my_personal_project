import { useState } from 'react'
import './App.css'
import { Outlet, Link } from "react-router-dom";

function App() {

  const [pageDescrip, setPageDescript] = useState('pagedescrip')

  return (
    <>
      <div className='header'>
      <header>
        <p>logo</p>
        <p>{pageDescrip}</p>
        <p>sttings,logout</p>
      </header>
      </div>
      <nav>
        <ul>
          <li><Link to="#">Portfolio</Link></li>
          <li><Link to="#">Add Property</Link></li>
          <li><Link to="#">My Lists</Link></li>
          <li><Link to="#">Cities</Link></li>
          <li><Link to="#">Calculator</Link></li>
        </ul>
      </nav>
      <Outlet/>
    </>
  )
}

export default App
