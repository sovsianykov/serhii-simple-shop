
import axios from 'axios';

export  const httpService = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
});
