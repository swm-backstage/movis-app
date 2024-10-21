import { UserGetRes } from "../types/user/UserGetRes";
import axiosHost from "./axios";

const getUser = async (): Promise<UserGetRes> => {
  const { data } = await axiosHost.get('/api/v1/users/me');

  return data;
};

const checkIdentifier = async (identifier: string): Promise<{ exists: boolean }> => {
  const { data } = await axiosHost.get(`/api/v1/auth/${identifier}/exists`);

  return data;
};

export { getUser, checkIdentifier };