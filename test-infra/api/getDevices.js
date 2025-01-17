import axiosClient from './axiosClient.js';

export const getDevices = async () => {
    try {
        return await axiosClient.get();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
