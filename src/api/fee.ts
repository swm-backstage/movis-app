import { FeeClassifiedReq } from "../types/fee/FeeClassifiedReq";
import { FeeCreateReq } from "../types/fee/request/feeCreateReq";
import axiosHost from "./axios";

type FeeCreateReqWithParams = {
  body: FeeCreateReq;
  queryParams?: Record<string, any>;
};

const classifiedFee = async (feeId: string, body: FeeClassifiedReq): Promise<void> => {
    const { data } = await axiosHost.patch('/api/v1/fees', body,
        {
            params: {
                feeId: feeId
            }
        },
    );

    return data;
};

const createFee = async ({body, queryParams }: FeeCreateReqWithParams): Promise<void> => {
  const config = {
    params: queryParams,
  };
  const { data } = await axiosHost.post('/api/v1/fees/input', body, config);

  return data;
};

export { classifiedFee, createFee };
