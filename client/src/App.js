import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home/Home';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login/Login';
import Tutors from './Components/Tutors';
import AddTutors from './Components/AddTutor/AddTutors';
import UserProfiles from './Components/Profiles/UserProfiles';
import About from './Components/About/About';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/tutors" element={<Tutors />} /> */}
        <Route path="/tutor_register" element={<AddTutors />} />
        <Route path="/email/:email" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
