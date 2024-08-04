import { QueryKey, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseError = AxiosError<{
    statusCode: string;
    message: string;
    error: string;
}>

type UseMutationCustomOptions<TData = unknown, TVariavles = unknown> = Omit<UseMutationOptions<TData, ResponseError, TVariavles, unknown>, 'mutationFn'>;

type UseQueryCustomOptions<TQueryFnData=unknown, TData = TQueryFnData> = 
Omit<UseQueryOptions<TQueryFnData, ResponseError,TData, QueryKey>,'queryKey'>

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions}