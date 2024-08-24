import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const TutorContext = createContext();

export const TutorProvider = ({ children }) => {
    const [tutors, setTutors] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [userLocation, setUserLocation] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [userImage, setUserImage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subjects: '',
        qualifications: '',
        experience: '',
        image: '',
        location: '',
        pincode: '',
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        isTutor: false,
    });
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState(''); // Add state for the user's name
    const [userToken, setUserToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const email = localStorage.getItem('userEmail');
        const name = localStorage.getItem('userName');
        const location = localStorage.getItem('userLocation');
        // const image = localStorage.getItem('userImage'); 

        if (token) {
            setUserToken(token);
            setUserEmail(email);
            setUserName(name);
            setUserLocation(location);
            // setUserImage(image)
            setIsAuthenticated(true);
        }
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tutors', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setTutors(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };


    const onChange = e => {
        const { name, value, type, checked } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addTutor = async (tutorData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/addtutor', tutorData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
            });
            setTutors([...tutors, res.data]);
            alert('Tutor added successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subjects: '',
                qualifications: '',
                experience: '',
                image: '',
                location: '',
                pincode: '',
            });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const searchbyPincode = (pincode) => {
        const results = tutors.filter(tutor => tutor.pincode.toString() === pincode.toString());
        setSearchResults(results);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: loginData.email, password: loginData.password })
            });
            const data = await response.json();
            // console.log("data", data);
            if (!response.ok) {
                setError(data.msg || 'Server error');
            } else {
                setUserToken(data.token);
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('userLocation', data.user.location);
                // localStorage.setItem('userImage', data.image);
                setUserEmail(data.user.email);
                setUserName(data.user.name);
                setUserLocation(data.user.location);
                // setUserImage(data.image);
                setIsAuthenticated(true);
                navigate('/');
                navigate(`/email/${data.user.email}`);

            }
        } catch (err) {
            console.error('Error:', err);
            setError('Server error');
        }
    };

    const handleSignup = async e => {
        e.preventDefault();
        setError('');

        const { email, password, confirmPassword, isTutor } = loginData;

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, confirmPassword, isTutor })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.msg || 'Server error');
            } else {
                setUserToken(data.token);
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userName', data.name);
                localStorage.setItem('userLocation', data.location);
                // localStorage.setItem('userImage', data.image);
                setUserEmail(data.email);
                setUserName(data.name);
                setUserLocation(data.location);
                // setUserImage(data.image);
                setIsAuthenticated(true);
                if (isTutor) {
                    navigate('/tutor-profiles');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Server error');
        }
    };

    const handleLogout = () => {
        setUserToken(null);
        setUserEmail('');
        setUserName('');
        setUserLocation('');
        // setUserImage('');
        setIsAuthenticated(false);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userLocation');
        localStorage.removeItem('userImage');
        navigate('/login');
    };

    return (
        <TutorContext.Provider value={{
            tutors,
            formData,
            searchbyPincode,
            setFormData,
            addTutor,
            searchResults,
            setSearchResults,
            handleLogin,
            onChange,
            error,
            isSignup,
            setIsSignup,
            handleSignup,
            // userImage,
            // setUserImage,
            loginData,
            setLoginData,
            userEmail,
            setUserEmail,
            userName,
            setUserName,
            userToken,
            userLocation,
            setUserLocation,
            isAuthenticated,
            handleLogout
        }}>
            {children}
        </TutorContext.Provider>
    );
};
