import { useState, useEffect } from 'react'
import './index.css'
import { Outlet, Link } from "react-router-dom";
import { api } from './pages/utilities';
import NavbarComp from './components/NavbarComp';
import { useNavigate} from "react-router-dom";
import { useRef } from 'react';
import { useLocation } from "react-router-dom";
import logo from './media/houseLogo.png'



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
      setIsDropdownOpen(false);
      navigate('/login');
    };

    return (
      <div className='min-h-screen bg-zinc-800'>
        {user ? (
          <div className=''>
            <header className='container min-w-screen max-w-none flex h-16 justify-between items-center pl-5 pr-5 border-b bg-sky-900 shadow-md'>
              <div className='ml-5'>
                <img src={logo} alt="house" className="w-10 h-10"/>
              </div>
              <p className='text-2xl font-bold text-white' >{pageDescrip}</p>
              <div className="dropdown-container">
                {/* Button that can toggle between open and close */}
                
                <button className="dropdown-button w-10 h-10 text-white mb-2 text-lg" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                  |||
                </button>
              </div>
            </header>
            {/* If open show options for logout and settings */}
            {isDropdownOpen && (
                  <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} className="dropdown-content container mx-auto flex flex-col h-16 w-16 items-end ml-5 mr-1 pl-5 pr-0 absolute right-0 top-10">
                    <div className="h-15 w-20 shadow-md mb-2 hover:bg-sky-900 bg-sky-700 rounded text-center mt-6">
                      <button onClick={handleLogout}>Logout</button><br />
                    </div>
                    <div className="h-15 w-20 shadow-md mb-2 hover:bg-sky-900 rounded text-center bg-sky-700">
                      <Link to="settings">Settings</Link>
                    </div>
                  </div>
                )}
            <div className='grid grid-cols-5 gap-3'>
              <NavbarComp className='col-span-1' />
              <div className='col-span-3 flex ml-8'>
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
                    isSignUp,
                    setIsSignUp
                  }}
                />
              </div>
            </div>
          </div>
        ) :
         (
          <div className='h-screen flex flex-col justify-center items-center bg-sky-900'>
          
        <Outlet 
            context={{
              user,
              setUser,
              userId,
              setUserId,
              isSignUp,
              setIsSignUp,
              pageDescrip,
              setPageDescrip,
            }}
          />
          </div>
        )}

        
      </div>
    );
}

export default App
