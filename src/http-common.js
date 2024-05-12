import axios from "axios";

const apiUrl = 'http://localhost/api'

const config = {
    baseURL: apiUrl,
    headers: { "Content-type": "application/json" },
}

const token = localStorage.getItem('token');
if(token) config.headers['authorization'] = `Bearer ${token}`;

const publicApiInstance = axios.create(config);
const privateApiInstance = axios.create(config);

privateApiInstance.interceptors.response.use(
    response => response,
    error => {
        console.warn('error', error)
        return Promise.reject(error);
    }
)

export {publicApiInstance, privateApiInstance}