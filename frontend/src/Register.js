import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const { first_name, last_name, username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/register/', formData);
      console.log('Registration successful:', res.data);
      navigate('/login');
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error('Error request:', err.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', err.message);
      }
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="first_name" value={first_name} onChange={onChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={last_name} onChange={onChange} placeholder="Last Name" required />
        <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
