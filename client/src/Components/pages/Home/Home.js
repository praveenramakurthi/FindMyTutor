import React, { useContext, useEffect, useState } from 'react';
import { TutorContext } from '../../Context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './home.css';

const Home = () => {
    const { tutors, searchResults, email, setUserEmail, userEmail } = useContext(TutorContext);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedStandard, setSelectedStandard] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        if (email && email !== userEmail) {
            setUserEmail(email);
        }
    }, [email, userEmail, setUserEmail]);

    const handleFilterChange = (e, type) => {
        const value = e.target.value;
        if (type === 'language') {
            setSelectedLanguages(
                e.target.checked
                    ? [...selectedLanguages, value]
                    : selectedLanguages.filter(lang => lang !== value)
            );
        } else if (type === 'standard') {
            setSelectedStandard(value);
        } else if (type === 'course') {
            setSelectedCourses(
                e.target.checked
                    ? [...selectedCourses, value]
                    : selectedCourses.filter(course => course !== value)
            );
        }
    };

    const filteredTutors = tutors.filter(tutor => {
        const tutorSubjects = tutor.subjects || []; // Handle case where subjects might be undefined
        const tutorCourses = tutor.courses || []; // Handle case where courses might be undefined

        // Check if any of the selected languages are in the tutor's subjects
        const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.some(lang => (tutorSubjects && tutorSubjects.includes(lang)));

        // Check if the tutor's standard matches the selected standard
        const matchesStandard = selectedStandard === '' || tutor.standard === selectedStandard;

        // Check if any of the selected courses are in the tutor's courses
        const matchesCourse = selectedCourses.length === 0 || selectedCourses.some(course => (tutorCourses && tutorCourses.includes(course)));

        return matchesLanguage && matchesStandard && matchesCourse;
    });

    const displayedTutors = searchResults.length > 0 ? searchResults : filteredTutors;

    const handleRegister = () => {
        // Handle registration logic
    };

    return (
        <div className="home-container">
            <div className="filter-sidebar">
                <h3>Find your courses, subjects</h3>
                <div>
                    <h3>Languages</h3>
                    <label><input type="checkbox" value="JavaScript" onChange={(e) => handleFilterChange(e, 'language')} /> JavaScript</label>
                    <label><input type="checkbox" value="Python" onChange={(e) => handleFilterChange(e, 'language')} /> Python</label>
                    <label><input type="checkbox" value="Java" onChange={(e) => handleFilterChange(e, 'language')} /> Java</label>
                </div>
                <div className="standard">
                    <h3>Standard</h3>
                    <select value={selectedStandard} onChange={(e) => handleFilterChange(e, 'standard')}>
                        <option value="">All</option>
                        <option value="class6">Class 6</option>
                        <option value="class7">Class 7</option>
                        <option value="class8">Class 8</option>
                        <option value="class9">Class 9</option>
                        <option value="class10">Class 10</option>
                        <option value="Intermediate1">Intermediate-I</option>
                        <option value="Intermediate2">Intermediate-II</option>
                    </select>
                </div>
                <div>
                    <h3>Courses</h3>
                    <label><input type="checkbox" value="Web Development" onChange={(e) => handleFilterChange(e, 'course')} /> Web Development</label>
                    <label><input type="checkbox" value="Data Science" onChange={(e) => handleFilterChange(e, 'course')} /> Data Science</label>
                    <label><input type="checkbox" value="Cloud Computing" onChange={(e) => handleFilterChange(e, 'course')} /> Cloud Computing</label>
                    <label><input type="checkbox" value="Java Full Stack" onChange={(e) => handleFilterChange(e, 'course')} /> Java Full Stack</label>
                    <label><input type="checkbox" value="MERN Stack Full Stack" onChange={(e) => handleFilterChange(e, 'course')} /> MERN Stack Full Stack</label>
                    <label><input type="checkbox" value="Ui/UX Design" onChange={(e) => handleFilterChange(e, 'course')} /> Ui/UX Design</label>
                    <label><input type="checkbox" value="RedHat Linux" onChange={(e) => handleFilterChange(e, 'course')} /> RedHat Linux</label>
                </div>
            </div>
            <div className="content">
                <h1>Welcome to MyPrivateTutor</h1>
                <p>Find the best tutors for your needs.</p>
                {displayedTutors.length > 0 ? (
                    <div className="tutor-grid">
                        {displayedTutors.map((tutor) => (
                            <div key={tutor._id} className="tutor-card">
                                <img src={tutor.image} alt={`${tutor.name}'s profile`} />
                                <p>{tutor.name}</p>
                                <p><strong>Expertise in </strong> {tutor.subjects ? tutor.subjects.join(', ') : 'N/A'}</p>
                                <p><strong>With an experience of</strong> {tutor.experience} years</p>
                                <p><FontAwesomeIcon icon={faLocationDot} /> {tutor.location}</p>
                                <div>
                                    <button onClick={handleRegister}>Register Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-tutors">No tutors found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
