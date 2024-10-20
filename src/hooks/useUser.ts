import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api/user";
import { queryKeys } from "../constants/key";


function useGetUser() {
  return useQuery({
    queryFn: () => getUser(),
    queryKey: [queryKeys.USER]
  })
}

export { useGetUser };