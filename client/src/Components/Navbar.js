import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TutorContext } from './Context/Context';
import UserProfiles from './Profiles/UserProfiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
    const { isAuthenticated, userEmail, handleLogout, searchbyPincode } = useContext(TutorContext);
    const [pincode, setPincode] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfileBox = () => {
        if (isAuthenticated) {
            setIsProfileOpen(!isProfileOpen);
        }
    };

    const handleSearch = () => {
        searchbyPincode(pincode);
    };

    return (
        <nav className='navbar'>
            <Link to="/about">About Page</Link>
            <Link to="/">Tutors</Link>
            <Link to="/tutor_register" className="tutor-reg">Register a Tutor</Link>
            {!isAuthenticated && <Link to="/login">Login/Signup</Link>}
            <div className="search-container">
                <input 
                    type="search" 
                    placeholder="Search Your Tutor" 
                    value={pincode} 
                    onChange={(e) => setPincode(e.target.value)} 
                    className="pincode-input"
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {isAuthenticated && (
                <>
                    <div className="logout-btn">
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>
                    <div className="profile-container">
                        <Link to="#" className="profile-link" onClick={toggleProfileBox}>
                            Profile <FontAwesomeIcon icon={faUserCircle} className="fa-user" />
                        </Link>
                    </div>
                    {isProfileOpen && (
                        <UserProfiles email={userEmail} onClose={toggleProfileBox} />
                    )}
                </>
            )}
        </nav>
    );
};

export default Navbar;
