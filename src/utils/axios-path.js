import axios from 'axios';
const uri = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: uri,
    headers: {
        Authorization: {
            toString () {
              return 'Bearer ' + localStorage.getItem('token')
            }
    }
}});

export default instance;
