
import { EventMemberGetListRes } from "../types/eventMember/EventMemberGetListRes";
import axiosHost from "./axios";

const getEventMemberList = async (eventId: string): Promise<EventMemberGetListRes> => {
    const { data } = await axiosHost.get('/api/v1/eventMembers', {
        params: {
            eventId: eventId
        },
    });
    return data;
};

const getEventMemberListNotPaid = async (eventId: string): Promise<EventMemberGetListRes> => {
    const { data } = await axiosHost.get('/api/v1/eventMembers/paid', {
        params: {
            eventId: eventId
        },
    });
    return data;
};



export { getEventMemberList, getEventMemberListNotPaid };

