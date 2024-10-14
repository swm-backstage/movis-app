import { FeeClassifiedReq } from "../types/fee/FeeClassifiedReq";
import axiosHost from "./axios";

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

export { classifiedFee };