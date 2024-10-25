import { UrlGetReq } from "../types/aws/UrlGetReq";
import axiosHost from "./axios";

const getPresignedUrl = async (req: UrlGetReq): Promise<String> => {
  const { billUid, extension } = req;
  const { data } = await axiosHost.get('/api/v1/url-generate', {
    params: {
      billUid,
      extension,
    },
  });

  return data;
};

export { getPresignedUrl };