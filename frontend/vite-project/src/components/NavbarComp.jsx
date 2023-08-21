import { Link } from "react-router-dom";
import React from "react";


export default function NavbarComp() {
    return (
        <nav className="ml-5 pl-2 mt-5">
        <ul>
          <li className="h-6 w-20 shadow-md mb-2 hover:bg-blue-200"><Link to="portfolio">Portfolio</Link></li>
          <li className="h-15 w-20 shadow-md mb-2 hover:bg-blue-200"><Link to="addproperty">Add Property</Link></li>
          <li className="h-6 w-20 shadow-md mb-2 hover:bg-blue-200"><Link to="lists">My Lists</Link></li>
          <li className="h-6 w-20 shadow-md mb-2 hover:bg-blue-200"><Link to="calculator">Calculator</Link></li>
        </ul>
      </nav>
    )
}