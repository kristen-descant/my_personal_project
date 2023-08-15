import { Link } from "react-router-dom";


export default function NavbarComp() {
    return (
        <nav>
        <ul>
          <li><Link to="#">Portfolio</Link></li>
          <li><Link to="#">Add Property</Link></li>
          <li><Link to="#">My Lists</Link></li>
          <li><Link to="#">Cities</Link></li>
          <li><Link to="#">Calculator</Link></li>
        </ul>
      </nav>
    )
}