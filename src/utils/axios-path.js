import axios from 'axios';
import baseUrl from './baseURL';

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: {
            toString () {
              return localStorage.getItem('token')
            }
    }
}});

export default instance;
