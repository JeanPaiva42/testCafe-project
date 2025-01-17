import axiosClient from './axiosClient.js';

export const putDevice = async (deviceBody) => {
    try {
        return await axiosClient.put(`/${deviceBody.id}`, deviceBody);
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

