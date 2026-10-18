import axios from 'axios';
const serverURL = 'http://localhost:5000/';

const getData = async (url) => {
    try {
        const response = await axios.get(`${serverURL}${url}`);
        return response.data;
    } catch (error) {
        console.error('GET ERROR:', error);
        return {
            status: false,
            message: error.response?.data?.message || error.message || 'Request failed.',
            data: []
        };
    }
};
const postData = async (url, body) => {
    try {
        const response = await axios.post(`${serverURL}${url}`, body);
        return response.data;
    } catch (error) {
        console.error('POST ERROR:', error);
        return {
            result: false,
            status: false,
            message: error.response?.data?.message || error.message || 'Request failed.',
            data: []
        };
    }
};

export { serverURL, getData, postData };
