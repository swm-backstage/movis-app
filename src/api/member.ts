import { MemberCreateListReq } from "../types/member/request/MemberCreateReq";
import { MemberGetListRes } from "../types/member/response/MemberGetListRes";
import axiosHost from "./axios";


const getMemberList = async (clubId: string): Promise<MemberGetListRes> => {
  const { data } = await axiosHost.get(`/api/v1/members`, {
    params: {
      clubId: clubId
    }
  });

  return data;
};

const createMemberList = async (body: MemberCreateListReq): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/members', body);

  return data;
};

export { getMemberList, createMemberList };