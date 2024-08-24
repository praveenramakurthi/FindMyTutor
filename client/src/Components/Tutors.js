import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Card, CardContent, Typography } from '@mui/material';

const Tutors = () => {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/tutors');
                setTutors(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTutors();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Tutors
            </Typography>
            {tutors.map((tutor) => (
                <Card key={tutor._id} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {tutor.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {tutor.email}
                        </Typography>
                        <Typography color="textSecondary">
                            {tutor.qualifications}
                        </Typography>
                        <Typography color="textSecondary">
                            Subjects: {tutor.subjects.join(', ')}
                        </Typography>
                        <Typography color="textSecondary">
                            Experience: {tutor.experience} years
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default Tutors;
