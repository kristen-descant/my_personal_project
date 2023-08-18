import { Link } from "react-router-dom";
import React from "react";


export default function NavbarComp() {
    return (
        <nav>
        <ul>
          <li><Link to="portfolio">Portfolio</Link></li>
          <li><Link to="addproperty">Add Property</Link></li>
          <li><Link to="lists">My Lists</Link></li>
          <li><Link to="calculator">Calculator</Link></li>
        </ul>
      </nav>
    )
}