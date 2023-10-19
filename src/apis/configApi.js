import axios from "axios";

export const configApi = axios.create({
    baseURL: 'https://cubecheck.onrender.com'
});

