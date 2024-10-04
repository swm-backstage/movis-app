import { ClubCreateReq } from "../types/club/request/ClubCreateReq";
import { ClubGetListRes } from "../types/club/response/ClubGetListRes";
import { ClubGetRes } from "../types/club/response/ClubGetRes";
import { ClubUserCreateReq, ClubUserDelegateReq } from "../types/clubUser/request/ClubUserReq";
import axiosHost from "./axios";

const createClubUser = async (body: ClubUserCreateReq): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/clubUsers', body);

  return data;
};

const delegateClubUser = async (values: ClubUserDelegateReq): Promise<void> => {
  const config = {
    params: values.queryParams
  };
  const { data } = await axiosHost.patch(`/api/v1/clubUsers/${values.toIdentifier}`, null, config);
  return data;
};

const getClubUserList = async (queryParams: Record<string, any>): Promise<ClubGetListRes> => {
	const config = {
		params: queryParams,
	};
  const { data } = await axiosHost.get('/api/v1/clubUsers', config);

  return data;
};


export { createClubUser, getClubUserList, delegateClubUser };