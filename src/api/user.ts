import { ClubGetListRes } from "../types/club/response/ClubGetListRes";
import { UserGetRes } from "../types/user/UserGetRes";
import axiosHost from "./axios";

const getUser = async (): Promise<UserGetRes> => {
  const { data } = await axiosHost.get('/api/v1/users/me');

  return data;
};

export { getUser };