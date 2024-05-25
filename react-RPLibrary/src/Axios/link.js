import axios from 'axios';

const url = 'http://127.0.0.1:8000/api';
const token = sessionStorage.getItem('auth_token');

export const link = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
    },
})