import { Link } from "react-router-dom";
import React from "react";


export default function NavbarComp() {
    return (
        <nav className="ml-0 pl-7 mt-0 pt-5 border-r bg-gray-300 w-1/2 ">
        <ul>
          <li className="h-6 w-20 shadow mb-2 bg-white rounded-md text-center hover:bg-blue-500"><Link to="portfolio">Portfolio</Link></li>
          <li className="h-6 w-20 bg-white rounded text-center shadow-md mb-2 hover:bg-blue-500"><Link to="lists">My Lists</Link></li>
          <li className="h-6 w-20 bg-white rounded text-center shadow-md mb-2 hover:bg-blue-500"><Link to="calculator">Calculator</Link></li>
          <li className="h-15 w-20 shadow-md mb-2 bg-white rounded text-center hover:bg-blue-500"><Link to="addproperty">Add Property</Link></li>
        </ul>
      </nav>
    )
}