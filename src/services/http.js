import axios from 'axios';

const http = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        "access-control-allow-origin": "*"
    }
});

export default http;