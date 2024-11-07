import { ClubCreateReq } from "../types/club/request/ClubCreateReq";
import { ClubGetListRes } from "../types/club/response/ClubGetListRes";
import { ClubGetRes } from "../types/club/response/ClubGetRes";
import axiosHost from "./axios";


const createClub = async (body: ClubCreateReq): Promise<ClubGetRes> => {
  const { data } = await axiosHost.post('/api/v1/clubs', body);

  return data;
};

const getClubList = async (): Promise<ClubGetListRes> => {
  const { data } = await axiosHost.get('/api/v1/clubs');

  return data;
};

const getClub = async (clubId: string): Promise<ClubGetRes> => {
  const { data } = await axiosHost.get(`/api/v1/clubs/${clubId}`);

  return data;
};

const deleteClub = async (queryParams: Record<string, any>): Promise<void> => {
  const config = {
		params: queryParams,
	};
  const { data } = await axiosHost.delete('/api/v1/clubs', config);

  return data;
}

export { createClub, getClub, getClubList, deleteClub };