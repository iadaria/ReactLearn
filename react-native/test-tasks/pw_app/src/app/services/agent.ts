import axios, { AxiosResponse } from "axios";
import * as Toast from "../common/components/AppToast";
import { IAuthResult, IUser, IUserFormValues } from "../models/user";
import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = 'http://192.168.1.82:3001';
axios.defaults.timeout = 5000;
axios.defaults.timeoutErrorMessage = "Network Error";

axios.interceptors.request.use(async (config) => {
    const id_token = await AsyncStorage.getItem('id_token');
    if (id_token) config.headers.Authorization = `Bearer ${id_token}`
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        Toast.ErrorToast('Network error - make sure API is running!');
    }
    console.log("[agen.ts]", JSON.stringify(error, null, 4));

    const {status, data, config, headers} = error.response;

    if (status === 401 && 
        headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"'
    ) {
        //window.localStorage.removeItem('jwt');
        //history.push('/');
        Toast.InfoToast('Your session has expired, please login again');
    }

    if (status === 400 && 
        config.method === 'get' && 
        data.errors.hasOwnProperty('id')) 
    {
        //history.push('/notfound');
    }

    if (status === 500) {
        Toast.InfoToast('Server error - check the terminal for more info!');
    }

    throw error.response;
})

const responseBody = async (response: AxiosResponse) => {
    console.log("[agent responseBody]", {response});
    return await response.data?.data;
}

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody)
};

const User = {
    register: (user: IUserFormValues): Promise<IAuthResult> => requests.post(`/users`, user),
    login: (user: IUserFormValues): Promise<IAuthResult> => requests.post(`/sessions/create`, user),
    current: (): Promise<IUser> => requests.get(`/api/protected/user-info`),
    list: (user: IUserFormValues): Promise<IUser[]> => requests.post(`/api/protected/users/list`, user)
};

/* const Transactions = {
    get: ()
} */

export { User };