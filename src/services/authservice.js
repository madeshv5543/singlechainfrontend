
import axios from 'axios';
import config from './config.js';
const API_URL = config.API_URL;
const EndPoints = config.END_POINTS;



const RegisterUser = function(data) {
    return axios.post(`${API_URL}${EndPoints.SIGN_UP}`, data).then(res =>  res.data)
}

const Login = function(data) {
    return axios.post(`${API_URL}${EndPoints.SIGN_IN}`, data).then(res => res.data)
}

export  default {
    RegisterUser,
    Login
}