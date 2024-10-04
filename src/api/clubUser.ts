import { ClubCreateReq } from "../types/club/request/ClubCreateReq";
import { ClubGetListRes } from "../types/club/response/ClubGetListRes";
import { ClubGetRes } from "../types/club/response/ClubGetRes";
import { ClubUserCreateReq } from "../types/clubUser/request/ClubUserCreateReq";
import axiosHost from "./axios";

const createClubUser = async (body: ClubUserCreateReq): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/clubUsers', body);

  return data;
};

const getClubUserList = async (queryParams: Record<string, any>): Promise<ClubGetListRes> => {
	const config = {
		params: queryParams,
	};
  const { data } = await axiosHost.get('/api/v1/clubUsers', config);

  return data;
};

const delegateClubUser = async (queryParams: Record<string, any>, toIdentifier: string): Promise<ClubGetRes> => {
	const config = {
		params: queryParams,
	};
  const { data } = await axiosHost.patch(`/api/v1/clubUsers/${toIdentifier}`, config);

  return data;
};




export { createClubUser, getClubUserList, delegateClubUser };