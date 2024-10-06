import axios from 'axios';

const sendPrompt = async (threadId) => {
    try {
        const response = await axios.get(`http://localhost:6001/chat/${threadId}`);
        
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const chatService = { sendPrompt };