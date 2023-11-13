import { isAsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios'

const register = async (data) => {
    const response = await axios.post('/api/auth/register', data);
    return response.data;
}

const login = async (data) => {

    const response = await axios.post('/api/auth/login', data)

    const token = response.data.token;

    if (token) {
        localStorage.setItem('user', JSON.stringify(token))
    }
    
    return data
}

const logout = async () => {
    const response = await axios.post('/api/auth/logout')
    localStorage.removeItem('user')
    return response.data
}


export const authService = {
    register,
    logout,
    login,
}
