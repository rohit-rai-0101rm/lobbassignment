// src/api/contentApi.ts
import { Content } from '../types/content';
import apiClient from './apiClient';


export const getContent = async (): Promise<Content> => {
    try {
        const response = await apiClient.get<{ content: Content }>('/getContent');

        console.log("response", response)
        return response.data.content;
    } catch (error) {
        console.error('[ContentAPI] Failed to fetch content:', error);
        throw error;
    }
};

