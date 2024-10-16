
import { EventBilClassifiedReq } from "../types/eventBill/EventBIllClassifiedReq";
import { EventBillCreateReq } from "../types/eventBill/request/EventBillCreateReq";
import axiosHost from "./axios";

type EventBillCreateReqWithParams = {
  body: EventBillCreateReq;
  queryParams?: Record<string, any>;
};

const createEventBill = async ({ body, queryParams }: EventBillCreateReqWithParams): Promise<void> => {
  const config = {
    params: queryParams,
  };
  const { data } = await axiosHost.post('/api/v1/eventBill/input', body, config);

  return data;
};

const classifiedEventBill = async (eventBillId: string, body: EventBilClassifiedReq): Promise<void> => {
    const { data } = await axiosHost.patch(`/api/v1/eventBill/${eventBillId}`, body);
    return data;
};

export { classifiedEventBill, createEventBill };

