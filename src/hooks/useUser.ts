import { useMutation, useQuery } from "@tanstack/react-query";

import { changePassword, checkIdentifier, getIdentifierWithPhone, getUser } from "../api/user";
import { queryKeys } from "../constants/key";
import { UseMutationCustomOptions } from "../types/common";


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

function useGetIdentifier(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (phoneNo: string) => getIdentifierWithPhone(phoneNo),
    ...mutationOptions
  }
  )
}

function useChangePassword(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => changePassword(oldPassword, newPassword),
    ...mutationOptions
  })
}



export { useGetUser, useCheckIdentifier, useGetIdentifier, useChangePassword };