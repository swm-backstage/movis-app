import { EventBilClassifiedReq } from "../types/eventBill/EventBIllClassifiedReq";
import axiosHost from "./axios";

const classifiedEventBill = async (eventBillId: string, body: EventBilClassifiedReq): Promise<void> => {
    const { data } = await axiosHost.patch(`/api/v1/eventBill/${eventBillId}`, body);
    return data;
};

export { classifiedEventBill };