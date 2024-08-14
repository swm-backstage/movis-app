import {  useMutation, useQuery } from "@tanstack/react-query";
import { getAccessToken, logout, postLogin, postSingup } from "../api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "../types/common";
import { removeEncryptStorage, setEncryptStorage } from "../utils/encryptStorage";
import { removeHeader, setHeader } from "../utils/header";
import { useEffect } from "react";
import queryClient from '../api/queryClient';
import { useNavigation } from "@react-navigation/native";



function useSignup(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postSingup,
        ...mutationOptions
    });
}

function useLogin(mutationOptions?: UseMutationCustomOptions){
    return useMutation({
        mutationFn: postLogin,
        onSuccess:({accessToken, refreshToken})=>{
            setEncryptStorage('refreshToken', refreshToken);
            setHeader('Authorization', `Bearer ${accessToken}`)
        },
        onError:(error)=>{
            console.log("Login Failed", error.response?.data);
        },
        onSettled: ()=>{
            queryClient.refetchQueries({queryKey:['auth','getAccessToken']})
        },
        ...mutationOptions,
    })
}


function useGetRefreshToken(){
    const {data, isSuccess, isError} = useQuery({
        queryKey: ['auth','getAccessToken'],
        queryFn: getAccessToken,
        staleTime: 1000*60*28,
        refetchInterval: 1000*60*28,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true, // 앱이 백그라운드일 때도 다시 가져옴
    })

    useEffect(()=>{
        if(isSuccess){
            setHeader('Authorization', `Bearer ${data.accessToken}`),
            setEncryptStorage('refresthToken', data.refreshToken)
        }
    }, [isSuccess]);
    useEffect(()=>{
        if(isError){
            removeHeader('Authorization'),
            removeEncryptStorage('refreshToken')
        }
    }, [isError]);
    return {isSuccess, isError};
}

function useLogout(mutationOptions?: UseMutationCustomOptions){
    const navigation = useNavigation();

    return useMutation({
        mutationFn: logout,
        onSuccess:()=>{
            removeHeader('Authorization');
            removeEncryptStorage('refreshToken');
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:['auth']})
        },
        ...mutationOptions
    });
}

function useAuth(){
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const isLogin = refreshTokenQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {signupMutation, loginMutation, isLogin,logoutMutation};
}

export default useAuth;