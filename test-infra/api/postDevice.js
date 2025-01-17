import axiosClient from './axiosClient.js';

export const postDevice = async (deviceBody) => {
    try {
        return await axiosClient.post('/', deviceBody);
    } catch (error) {
        console.error('Error posting data:', error);
    }
};
