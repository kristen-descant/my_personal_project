import { Link } from "react-router-dom";


export default function NavbarComp() {
    return (
        <nav>
        <ul>
          <li><Link to="portfolio">Portfolio</Link></li>
          <li><Link to="addproperty">Add Property</Link></li>
          <li><Link to="#">My Lists</Link></li>
          <li><Link to="#">Calculator</Link></li>
        </ul>
      </nav>
    )
}