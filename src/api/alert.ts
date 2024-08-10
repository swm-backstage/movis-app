import { FeeCreateReq } from "../types/alert/request/FeeCreateReq";
import axiosHost from "./axios";


const createFee = async (body: FeeCreateReq): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/alerts', body);

  return data;
};

type ClubGetUidRes = {
  clubId: string
}

const getClubUid = async (accountNumber: string): Promise<ClubGetUidRes> => {
  const { data } = await axiosHost.get('/api/v1/clubs/forAlert', {
    params: {
      accountNumber: accountNumber
    },
  });
  return data;
};


export { createFee, getClubUid}