import { Link } from "react-router-dom";
import React from "react";


export default function NavbarComp() {
    return (
        <nav className="ml-0 pl-5 mt-0 pt-5 overflow-hidden border-r bg-sky-900  w-1/2 min-h-screen ">
          <ul className="flex flex-col">
            <li className="flex-shrink-0 lg:h-6 lg:w-20 shadow mb-2 bg-white rounded-md text-center hover:bg-sky-700 hover:text-white"><Link className="" to="portfolio">Portfolio</Link></li>
            <li className="flex-shrink-0 lg:h-6 lg:w-20 bg-white rounded text-center shadow-md mb-2 hover:bg-sky-700 hover:text-white"><Link to="lists">My Lists</Link></li>
            <li className="flex-shrink-0 lg:h-6 lg:w-20 bg-white rounded text-center shadow-md mb-2 hover:bg-sky-700 hover:text-white"><Link to="calculator">Calculator</Link></li>
            <li className="flex-shrink-0 lg:h-12 lg:w-20 shadow-md mb-2 bg-white rounded text-center hover:bg-sky-700 hover:text-white"><Link to="addproperty">Add Property</Link></li>
          </ul>
      </nav>
    )
}