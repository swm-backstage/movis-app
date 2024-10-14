import { EventCreateReq } from "../types/event/request/EventCreateReq";
import { EventGetListRes } from "../types/event/response/EventGetListRes";
import axiosHost from "./axios";


const createEvent = async (body: EventCreateReq): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/events', body);

  return data;
};

const getEventList = async (clubId: string, lastId: string, size: number): Promise<EventGetListRes> => {
  const { data } = await axiosHost.get('/api/v1/events', {
    params: {
      clubId: clubId,
      lastId: lastId,
      size: size
    }
  })
  return data;
}



export { createEvent, getEventList };
