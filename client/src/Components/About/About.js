// About.js
import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.body1}>
            <div className={styles.about_container}>
                <h1 className={styles.fade_in}>About Our Company</h1>
                <p className={styles.slide_in}>
                    Welcome to MyPrivateTutor, where we connect students with the best tutors in the industry.
                    Our mission is to provide personalized and high-quality education to help students achieve their academic goals.
                </p>
                <p className={styles.slide_in_delay_1}>
                    We offer a wide range of subjects and courses, tailored to meet the needs of each student.
                    Our tutors are experienced professionals who are passionate about teaching and committed to student success.
                </p>
                <p className={styles.slide_in_delay_2}>
                    Join us today and take the first step towards a brighter future with MyPrivateTutor.
                </p>
            </div>
        </div>
    );
};

export default About;
