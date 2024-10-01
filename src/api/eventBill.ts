import { EventBillCreateReq } from "../types/eventBill/request/EventBillCreateReq";
import axiosHost from "./axios";

type EventBillCreateReqWithParams = {
  body: EventBillCreateReq;
  queryParams?: Record<string, any>;
};

const createEvenBill = async ({ body, queryParams }: EventBillCreateReqWithParams): Promise<void> => {
  const config = {
    params: queryParams,
  };
  const { data } = await axiosHost.post('/api/v1/eventBill/input', body, config);

  return data;
};

export { createEvenBill };