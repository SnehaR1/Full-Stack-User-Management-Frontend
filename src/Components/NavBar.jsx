import React from 'react'
import { api } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'
function NavBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    const fetchData = async () => {
        try {
            const response = await api.post(
                'http://127.0.0.1:8000/account/api/logout/',
                { refreshToken: refreshToken }, // Send refreshToken as a parameter
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(response)
            dispatch(logout());

            navigate('/login')

        } catch (error) {
            alert(error.message);
        }
    };

    const handleClick = () => {
        fetchData();
    }
    return (
        <div>
            <nav className='bg-purple-950 w-full text-white flex flex-row justify-between p-3'>
                <p className='text-white font-bold text-3xl'>Home</p>
                <button onClick={handleClick} className='text-white border border-white p-2 rounded-sm'>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar