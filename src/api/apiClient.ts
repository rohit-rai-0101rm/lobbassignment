// src/api/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ Dynamically sets Authorization header in axios instance
export const setAuthToken = (token: string) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default apiClient;
