import axios from 'axios';
import baseUrl from './baseURL';

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: {
            toString () {
              return 'Bearer ' + localStorage.getItem('token')
            }
    }
}});

export default instance;
