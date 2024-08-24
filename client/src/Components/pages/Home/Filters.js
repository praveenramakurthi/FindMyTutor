import React, { useState } from 'react';
import './filters.css';

const Filters = ({ onFilterChange }) => {
    const [codingLanguages, setCodingLanguages] = useState([]);
    const [standard, setStandard] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState('');

    const handleCodingLanguageChange = (e) => {
        const { value, checked } = e.target;
        setCodingLanguages((prev) =>
            checked ? [...prev, value] : prev.filter((lang) => lang !== value)
        );
    };

    const handleStandardChange = (e) => {
        setStandard(e.target.value);
    };

    const handleSubjectsChange = (e) => {
        const { value, checked } = e.target;
        setSubjects((prev) =>
            checked ? [...prev, value] : prev.filter((subj) => subj !== value)
        );
    };

    const handleCoursesChange = (e) => {
        setCourses(e.target.value);
    };

    const applyFilters = () => {
        onFilterChange({
            codingLanguages,
            standard,
            subjects,
            courses,
        });
    };

    return (
        <div className="filters-container">
            <h3>Filters</h3>
            <div className="filter-group">
                <h4>Coding Languages</h4>
                <label>
                    <input
                        type="checkbox"
                        value="JavaScript"
                        onChange={handleCodingLanguageChange}
                    />
                    JavaScript
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Python"
                        onChange={handleCodingLanguageChange}
                    />
                    Python
                </label>
                {/* Add more coding languages as needed */}
            </div>

            <div className="filter-group">
                <h4>Standard</h4>
                <label>
                    <input
                        type="radio"
                        value="6th-10th"
                        name="standard"
                        onChange={handleStandardChange}
                    />
                    6th-10th
                </label>
                <label>
                    <input
                        type="radio"
                        value="Intermediate"
                        name="standard"
                        onChange={handleStandardChange}
                    />
                    Intermediate
                </label>
                {/* Add more standards as needed */}
            </div>

            <div className="filter-group">
                <h4>Subjects</h4>
                <label>
                    <input
                        type="checkbox"
                        value="Math"
                        onChange={handleSubjectsChange}
                    />
                    Math
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Science"
                        onChange={handleSubjectsChange}
                    />
                    Science
                </label>
                {/* Add more subjects as needed */}
            </div>

            <div className="filter-group">
                <h4>Courses</h4>
                <label>
                    <input
                        type="radio"
                        value="Web Development"
                        name="courses"
                        onChange={handleCoursesChange}
                    />
                    Web Development
                </label>
                <label>
                    <input
                        type="radio"
                        value="Data Science"
                        name="courses"
                        onChange={handleCoursesChange}
                    />
                    Data Science
                </label>
                <label>
                    <input
                        type="radio"
                        value="Cloud Computing"
                        name="courses"
                        onChange={handleCoursesChange}
                    />
                    Cloud Computing
                </label>
                <label>
                    <input
                        type="radio"
                        value="Java Full Stack"
                        name="courses"
                        onChange={handleCoursesChange}
                    />
                    Java Full Stack
                </label>
                <label>
                    <input
                        type="radio"
                        value="Machine Learning"
                        name="courses"
                        onChange={handleCoursesChange}
                    />
                    Machine Learning
                </label>
                {/* Add more courses as needed */}
            </div>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default Filters;
