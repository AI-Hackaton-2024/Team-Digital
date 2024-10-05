import axios from 'axios';

export const create = async (formData
) => {
    try {
        const response = await axios.post("http://localhost:6001/create-persona", formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("response", response.data);

        return response.data;
    } catch (error) {
        console.error("Error in create function:", error);
        throw new Error(error.response?.data || "An error occurred while creating the persona");
    }
}

export const personaService = { create };
