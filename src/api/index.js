import axios from "axios";
import { useAuth } from "../hooks/useAuth";

import History from '../History'

import { logout, mustLogin } from '../store/utils'
import {  useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL?.trimEnd('/'),
    /* other custom settings */
});

 // Set the AUTH token for any request
 axiosInstance.interceptors.request.use(function (config) {
    const user = useAuth();
    config.headers.Authorization =  user && user.token ? `Bearer ${user.token}` : '';
    return config;
});

export const login = async (username, password) => {
    return axiosInstance.post("/login", {'email':username, password}).then(data => data.data);
}

export const getProfileInfo = async () => {

    return axiosInstance.get("/profile").then(data => data.data).catch(unAuthorizeRedirect);
}
export const editProfileInfo = async (params) => {
    return axiosInstance.post("/update", params).then(data => data.data).catch(unAuthorizeRedirect);
}

/*
export const getList = async () => {
    return axiosInstance.get("/list").then(data => data.data).catch(unAuthorizeRedirect);
}
*/


export const unAuthorizeRedirect = (error) => {

    if(error?.response?.status == 401){
        mustLogin(true);
    }
   
    throw error;
}