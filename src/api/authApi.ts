// src/api/authService.ts
import axios from 'axios';

const AUTH_URL = 'https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod';

export const generateToken = async (): Promise<string> => {
    try {

        console.log("jhjhjjh")
        const response = await axios.post<{ token: string }>(
            `${AUTH_URL}/generateToken`,
            { email: 'tushar.saini@lobb.in' }
        );

        console.log('✅ Token generated:', response);
        return response.data.token;
    } catch (error) {
        console.error('❌ Error generating token:', error);
        throw error;
    }
};
