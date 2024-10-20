import { useQuery } from "@tanstack/react-query";

import { checkIdentifier, getUser } from "../api/user";
import { queryKeys } from "../constants/key";


function useGetUser() {
  return useQuery({
    queryFn: () => getUser(),
    queryKey: [queryKeys.USER]
  })
}

function useCheckIdentifier(identifier: string) {
  return useQuery({
    queryFn: () => checkIdentifier(identifier),
    queryKey: ['checkIdentifier', identifier],
    enabled: !!identifier,
  })
}

export { useGetUser, useCheckIdentifier };