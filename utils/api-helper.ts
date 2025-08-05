import superagent from "superagent";
import dotenv from 'dotenv'
dotenv.config()

const API_BASE_URL = process.env.API_BASE_URL;

export const api = {
    get: (endpoint: string) => {
        return superagent.get(`${API_BASE_URL}${endpoint}`);
    },
    post: (endpoint: string) => {
        return superagent.post(`${API_BASE_URL}${endpoint}`)
    },
    put: (endpoint: string) => {
        return superagent.put(`${API_BASE_URL}${endpoint}`)
    },
    patch: (endpoint: string) => {
        return superagent.patch(`${API_BASE_URL}${endpoint}`)
    },
    delete: (endpoint: string) => {
        return superagent.delete(`${API_BASE_URL}${endpoint}`);
    },
};