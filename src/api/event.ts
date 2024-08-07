import { EventCreateReq } from "../types/event/request/EventCreateReq";
import axiosHost from "./axios";


const createEvent = async (body: EventCreateReq): Promise<void> => {
  const { data } = await axiosHost.post('/api/v1/events', body);

  return data;
};



export { createEvent };
