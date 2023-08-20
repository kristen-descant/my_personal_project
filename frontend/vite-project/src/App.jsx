import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, Link } from "react-router-dom";
import { api } from './pages/utilities';
import NavbarComp from './components/NavbarComp';
import { useNavigate} from "react-router-dom";
import { useRef } from 'react';
import { useLocation } from "react-router-dom";
import DropdownButton from './components/DropdownButtonComp';


function App() {

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [properties, setProperties] = useState(null);
  const [pageDescrip, setPageDescrip] = useState('pagedescrip');
  const [selectedPoperty, setSelectedPropety] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const lastVisited = useRef();
  const location = useLocation();

  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("users/");
      // Check if the response contains the user data (email field exists)
      if (response.data.email) {
        setUser(response.data);
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/");
        }
      }
    } else {
      // If no token is found, navigate to the login page
      navigate("/login");
    }
  };

    useEffect(() => {
      whoAmI();
    }, []);

    useEffect(() => {
      if (!user) {
        // If the user is not authenticated, update the lastVisited ref with the current location pathname
        lastVisited.current = location.pathname;
      }
    }, [location]);

  return (
    <>
      {user ? (
    <>
      <NavbarComp/>
      <div className='header'>
      <header>
        <p>logo</p>
        <p>{pageDescrip}</p>
        <DropdownButton setUser={setUser} />
      </header>
      </div>
    </>
    ) : (
      <>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </>
    )}
      <Outlet
      context={
        {properties, 
        setProperties,
        pageDescrip,
        setPageDescrip,
        selectedPoperty,
        setSelectedPropety,
        user,
        setUser,
        userId,
        setUserId,
        isDropdownOpen, 
        setIsDropdownOpen}
      }/>
    </>
  )
}

export default App
