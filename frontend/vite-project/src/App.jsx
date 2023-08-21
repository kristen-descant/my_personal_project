import { useState, useEffect } from 'react'
import './index.css'
import { Outlet, Link } from "react-router-dom";
import { api } from './pages/utilities';
import NavbarComp from './components/NavbarComp';
import { useNavigate} from "react-router-dom";
import { useRef } from 'react';
import { useLocation } from "react-router-dom";
import logo from './media/houselogo.png'


function App() {

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [properties, setProperties] = useState(null);
  const [pageDescrip, setPageDescrip] = useState('pagedescrip');
  const [selectedPoperty, setSelectedPropety] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false)
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

    const handleLogout = () => {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    };

    return (
      <div className='bg-gray-300 min-h-screen'>
        {user ? (
          <div className='relative'>
            <header className='container mx-auto flex h-16 justify-between items-center ml-5 mr-5 pl-5 pr-5'>
              <img src={logo} alt="house" className="w-10 h-10"/>
              <p className='text-lg font-bold' >{pageDescrip}</p>
              <div className="dropdown-container">
                {/* Button that can toggle between open and close */}
                
                <button className="dropdown-button w-10 h-10" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                  |||
                </button>
              </div>
            </header>
            {/* If open show options for logout and settings */}
            {isDropdownOpen && (
                  <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} className="dropdown-content container mx-auto flex flex-col h-16 w-16 items-end ml-5 mr-1 pl-5 pr-0 absolute right-0 top-10">
                    <div>
                      <button onClick={handleLogout}>Logout</button><br />
                    </div>
                    <div>
                      <Link to="settings">Settings</Link>
                    </div>
                  </div>
                )}
            <div className='grid grid-cols-5 gap-3'>
              <NavbarComp className='col-span-1' />
              <div className='col-span-4 flex ml-8'>
                <Outlet 
                  context={{
                    properties,
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
                    setIsDropdownOpen,
                  }}
                />
              </div>
            </div>
          </div>
        ) :
         (
          <div className='h-screen flex flex-col justify-center items-center'>
          <div className='mb-3 '>
            {isSignUp ? 
            <div>Create an account or <Link className="border-b border-gray-500" to="login">Log In</Link></div> :
            <div>Enter credentials or <Link className="border-b border-gray-500" to="signup">Sign Up</Link></div> }
          </div>
        <Outlet 
            context={{
              user,
              setUser,
              userId,
              setUserId,
              isSignUp,
              setIsSignUp
            }}
          />
          </div>
        )}

        
      </div>
    );
}

export default App
