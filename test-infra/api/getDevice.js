import axiosClient from './axiosClient.js';

export const getDevice = async (deviceId) => {
    try {
        return await axiosClient.get(deviceId);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
