import axios from 'axios'
import axiosHost from './axios';
import { getEncryptStorage } from '../utils/encryptStorage';

type RequestCreateUser = {
    identifier: string;
    password: string;
    name: string;
    phoneNo: string;
}

type RequestLogin ={
    identifier: string;
    password: string;
}

const postSingup = async ({ identifier, password, name, phoneNo }: RequestCreateUser): Promise<void> => {
    const { data } = await axiosHost.post('/api/v1/auth/test/register', {
        identifier,
        password,
        name,
        phoneNo,
    });

    return data;
};

type ResponseToken={
    accessToken: string;
    refreshToken: string;
}

const postLogin = async ({ identifier, password }: RequestLogin) :Promise<ResponseToken> => {
    const { data } = await axiosHost.post('/api/v1/auth/test/login ', {
        identifier,
        password,
    });
    return data;
}

const getAccessToken = async ():Promise<ResponseToken> =>{
    const refreshToken = await getEncryptStorage('refreshToken');
    const {data} = await axiosHost.patch('/api/v1/auth/reissue',{
        refreshToken
    })

    return data; 
}

const logout = async () => {
    await axiosHost.post('/api/v1/auth/logout');
    
}

export {postSingup, postLogin, getAccessToken, logout}
export type {RequestCreateUser,RequestLogin, ResponseToken, }