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

const getIdentifierWithPhone = async (phoneNo: string): Promise<{ identifier: string }> => {
  const { data } = await axiosHost.post('/api/v1/users/identifier', {
    phoneNo: phoneNo
  });

  return data;
};

const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  const { data } = await axiosHost.patch('/api/v1/users/password', {
    oldPassword: oldPassword,
    newPassword: newPassword
  });

  return data;
};


const resetPassword = async (phoneNo: string): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/users/password/reset', {
    phoneNo: phoneNo
  });

  return data;
};



const deleteUser = async (password: string): Promise<void> => {
  const { data } = await axiosHost.patch('/api/v1/users/me', { password: password });

  return data;
}

export { getUser, checkIdentifier, getIdentifierWithPhone, changePassword,resetPassword, deleteUser };

