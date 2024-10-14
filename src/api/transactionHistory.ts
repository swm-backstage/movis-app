import { TransactionHistoryGetListRes } from "../types/transactionHisotry/TransactionHistoryGetListRes";
import axiosHost from "./axios";


const getUnclassifiedTransaction = async (clubId: string): Promise<TransactionHistoryGetListRes> => {
    const { data } = await axiosHost.get(`/api/v1/transactionHistories/unClassification`, {
      params: {
        clubId: clubId
      }
    });
  
    return data;
  };

  export { getUnclassifiedTransaction };