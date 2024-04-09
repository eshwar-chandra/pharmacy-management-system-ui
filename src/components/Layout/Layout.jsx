import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from './profile.svg';

const Layout = ({ username, onLogout, children }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const menuRef = useRef(null);
    const profileRef = useRef(null);

    const toggleMenu = (event) => {
        event.stopPropagation();
        setMenuOpen(!isMenuOpen);
    };
      
    const toggleProfile = (event) => {
        event.stopPropagation();
        setProfileOpen(!isProfileOpen);
    };
      
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setProfileOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <nav className="flex items-center justify-between p-2 bg-custom-green">
                <div>
                    <button className="text-white text-xl" onClick={toggleMenu}>☰</button>
                    {isMenuOpen && (
                        <div ref={menuRef} className="absolute top-12 left-1 mt-2 w-48 bg-white rounded-md shadow-lg p-4">
                            <Link to="/medicine-details" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Medicine details</Link>
                            <div className="bg-gray-300 h-px my-2"></div>

                            <Link to="/stock-entry" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Stock Entry</Link>
                            <div className="bg-gray-300 h-px my-2"></div> 

                            <Link to="/stock-returns" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Stock Returns</Link>
                            <div className="bg-gray-300 h-px my-2"></div> 

                            <Link to="/sales" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Sales</Link>
                            <div className="bg-gray-300 h-px my-2"></div> 

                            <Link to="/sales-return" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Sales Return</Link>
                            <div className="bg-gray-300 h-px my-2"></div> 

                            <Link to="/taxes" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Taxes</Link>
                            <div className="bg-gray-300 h-px my-2"></div>

                            <Link to="/reports" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Reports</Link> 
                        </div>
                    )}    
                </div>
                <div>
                    <button ref={profileRef} onClick={toggleProfile} className="text-white">
                        <ProfileIcon />
                    </button>
                    {isProfileOpen && (
                        <div ref={profileRef} className="absolute top-12 right-1 mt-2 w-48 bg-white rounded-md shadow-lg p-4">
                            <h2 className='mb-4 text-sm'>Welcome, {username}!</h2>
                            <Link to="/edit-profile" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Edit Profile</Link>
                            <div className="bg-gray-300 h-px my-2"></div>
                            <Link to="/add-user" className="block text-sm hover:underline hover:text-base hover:text-custom-green">Add User</Link>
                            <div className="bg-gray-300 h-px my-2"></div> 
                            <Link to="/logout" onClick={onLogout} className="block text-sm hover:underline hover:text-base hover:text-custom-green">Logout</Link>
                        </div>
                    )}
                </div>
            </nav>
            <div style={{background: 'linear-gradient(to right, #CCE7E5, #e3ebeb, #FAF0ED)'}} className="min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default Layout;