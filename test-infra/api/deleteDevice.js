import axiosClient from './axiosClient.js';

export const deleteDevice = async (deviceId) => {
    try {
        return await axiosClient.delete(deviceId);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
