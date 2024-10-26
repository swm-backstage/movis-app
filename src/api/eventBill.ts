
import { EventBilClassifiedReq } from "../types/eventBill/EventBIllClassifiedReq";
import { EventBillCreateRes } from "../types/eventBill/EventBillCreateRes";
import { EventBillCreateReq } from "../types/eventBill/EventBillCreateReq";
import axiosHost from "./axios";
import { EventBillUpdateReq } from "../types/eventBill/EventBillUpdateReq";

type EventBillCreateReqWithParams = {
  body: EventBillCreateReq;
  queryParams?: Record<string, any>;
};

const createEventBill = async ({ body, queryParams }: EventBillCreateReqWithParams): Promise<EventBillCreateRes> => {
  const config = {
    params: queryParams,
  };
  const { data } = await axiosHost.post('/api/v1/eventBill/input', body, config);

  return data;
};

type EventBillUpdateReqWithParams = {
  body: EventBillUpdateReq;
  queryParams?: Record<string, any>;
};
const updateEventBill = async ({body, queryParams}: EventBillUpdateReqWithParams): Promise<void> => {
  const config = {
    params: queryParams,
  };
  const { data } = await axiosHost.patch(`/api/v1/eventBill/content`, body, config);
  return data;
};

const classifiedEventBill = async (eventBillId: string, body: EventBilClassifiedReq): Promise<void> => {
    const { data } = await axiosHost.patch(`/api/v1/eventBill/${eventBillId}`, body);
    return data;
};

export { classifiedEventBill, updateEventBill, createEventBill };