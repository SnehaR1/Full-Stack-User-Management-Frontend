import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddUser() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/account/api/register/', formData)
            console.log('User registered:', response.data);
            navigate("/dashboard")

        } catch (error) {
            if (error.response) {

                console.error('Error response:', error.response);


                let errorMessage = '';

                if (error.response.data.email) {
                    errorMessage += 'Email: ' + error.response.data.email.join(' ') + ' ';
                }
                if (error.response.data.name) {
                    errorMessage += 'Name: ' + error.response.data.name.join(' ') + ' ';
                }
                if (formData.password !== formData.confirm_password) {
                    alert('Passwords do not match.');
                    return;
                }


                if (!errorMessage) {
                    errorMessage = 'Registration failed. Please try again.';
                }


                alert(errorMessage.trim());
            } else {

                alert('Registration failed. Please try again.');
            }
            console.error('Registration error:', error);
        }
    }
    return (

        <div className='flex justify-center items-center'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-3xl'>Add User</h1>
                <form className='flex flex-col mt-3' onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input onChange={handleChange} value={formData.name} name='name' className='border border-black p-3' type="text" placeholder='Name' />
                    <label>Email</label>
                    <input onChange={handleChange} value={formData.email} name='email' className='border border-black p-3' type="email" placeholder='Email' />
                    <label>Password</label>
                    <input onChange={handleChange} value={formData.password} name='password' className='border border-black p-3' type="password" placeholder='password' />
                    <label>Confirm Password</label>
                    <input onChange={handleChange} value={formData.confirm_password} name='confirm_password' className='border border-black p-3' type="password" placeholder='Confirm password' />
                    <button type='submit' className='border border-black rounded p-3 mt-3'>Add</button>
                </form>
            </div>
        </div>

    )
}

export default AddUser