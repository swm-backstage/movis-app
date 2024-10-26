import { useQuery } from "@tanstack/react-query";

import { getPresignedUrl } from "../api/aws";
import { queryKeys } from "../constants/key";
import { UrlGetReq } from "../types/aws/UrlGetReq";


function useGetPresignedUrl(req: UrlGetReq) {
	return useQuery({
		queryFn: () => getPresignedUrl(req),
		queryKey: [queryKeys.AWS]
	})
}

export { useGetPresignedUrl };
