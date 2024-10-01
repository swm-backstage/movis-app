import { ClubGetListRes } from "../types/club/response/ClubGetListRes";
import { EventMemberGetListRes } from "../types/eventMember/response/EventMemberGetListRes";
import axiosHost from "./axios";

const getEventMemberList = async (queryParams: Record<string, any>): Promise<EventMemberGetListRes> => {
	const config = {
		params: queryParams,
	};
  const { data } = await axiosHost.get('/api/v1/eventMembers', config);

  return data;
};


export { getEventMemberList };
