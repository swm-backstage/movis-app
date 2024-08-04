import { ClubCreateReq } from "../types/club/request/ClubCreateReq";
import { ClubGetListRes } from "../types/club/response/ClubGetListRes";
import { ClubGetRes } from "../types/club/response/ClubGetRes";
import axiosHost from "./axios";


const createClub = async (body: ClubCreateReq): Promise<void> => {
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




export { createClub, getClub, getClubList };