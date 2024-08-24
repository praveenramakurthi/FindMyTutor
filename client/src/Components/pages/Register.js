import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isTutor: false,
    });

    const { name, email, password, isTutor } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={e => onSubmit(e)}>
            <input type="text" name="name" value={name} onChange={e => onChange(e)} placeholder="Name" />
            <input type="email" name="email" value={email} onChange={e => onChange(e)} placeholder="Email" />
            <input type="password" name="password" value={password} onChange={e => onChange(e)} placeholder="Password" />
            <label>
                <input type="checkbox" name="isTutor" checked={isTutor} onChange={e => setFormData({ ...formData, isTutor: e.target.checked })} />
                Are you a tutor?
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
