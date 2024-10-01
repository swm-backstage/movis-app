import { FeeCreateReq } from "../types/fee/request/feeCreateReq";
import axiosHost from "./axios";

type FeeCreateReqWithParams = {
  body: FeeCreateReq;
  queryParams?: Record<string, any>;
};

const createFee = async ({body, queryParams }: FeeCreateReqWithParams): Promise<void> => {
  const config = {
    params: queryParams,
  };
  const { data } = await axiosHost.post('/api/v1/fees/input', body, config);

  return data;
};

export { createFee }